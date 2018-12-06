package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

// MongoDB Config
var mongodb_server = "54.176.179.159"
var mongodb_database = "cmpe281"
var mongodb_collection = "gumball"

// RabbitMQ Config
var rabbitmq_server = "rabbitmq"
var rabbitmq_port = "5672"
var rabbitmq_queue = "gumball"
var rabbitmq_user = "guest"
var rabbitmq_pass = "guest"

// NewServer configures and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)
	n.UseHandler(mx)
	return n
}

// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
	mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/gumball", gumballHandler(formatter)).Methods("GET")
	mx.HandleFunc("/gumball", gumballUpdateHandler(formatter)).Methods("PUT")
	mx.HandleFunc("/order", gumballNewOrderHandler(formatter)).Methods("POST")
	mx.HandleFunc("/order/{id}", gumballOrderStatusHandler(formatter)).Methods("GET")
	mx.HandleFunc("/order", gumballOrderStatusHandler(formatter)).Methods("GET")
	mx.HandleFunc("/orders", gumballProcessOrdersHandler(formatter)).Methods("POST")
	mx.HandleFunc("/login", gumballLoginHandler(formatter)).Methods("POST")     
	mx.HandleFunc("/signup", gumballSignupHandler(formatter)).Methods("POST") 
}


// Helper Functions
func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// API Gumball Machine Handler
func gumballHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        var result bson.M
        err = c.Find(bson.M{"SerialNumber" : "1234998871109"}).One(&result)
        if err != nil {
                log.Fatal(err)
        }
        fmt.Println("Gumball Machine:", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}

// API Update Gumball Inventory
func gumballUpdateHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
    	var m gumballMachine
    	_ = json.NewDecoder(req.Body).Decode(&m)		
    	fmt.Println("Update Gumball Inventory To: ", m.CountGumballs)
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)
        query := bson.M{"SerialNumber" : "1234998871109"}
        change := bson.M{"$set": bson.M{ "CountGumballs" : m.CountGumballs}}
        err = c.Update(query, change)
        if err != nil {
                log.Fatal(err)
        }
       	var result bson.M
        err = c.Find(bson.M{"SerialNumber" : "1234998871109"}).One(&result)
        if err != nil {
                log.Fatal(err)
        }        
        fmt.Println("Gumball Machine:", result )
		formatter.JSON(w, http.StatusOK, result)
	}
}

//hnote: API create new users
func gumballSignupHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
 
       var result bson.M


	err := req.ParseForm()
	if err != nil {
		panic(err)
	}
	 
	password:= req.Form.Get("password")
	name := req.Form.Get("name")
       if (len(password)<3) || (len(name)<3) {
		formatter.JSON(w, http.StatusOK, bson.M{"error": "length of password and name must larger than 2!"})
		return
	}

      fmt.Println("New User Name:", name )
      fmt.Println("New User password:", password)

	session, err := mgo.Dial(mongodb_server)
        if err != nil {
		  formatter.JSON(w, http.StatusOK, bson.M{"error": "System DB Error"})
                panic(err)
		  return
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C("cmpe281")

	err = c.Find(bson.M{"name": name , "password":password}).One(&result)  //Select(bson.M{"name": 0})
	if err != nil {
		//panic(err)
              fmt.Println("Not found Name,ok to signup")

		//try insert new user
         
         newId := bson.NewObjectId()
	  toInsert :=bson.M{"_id": newId,"name": name , "password": password}
	  if err := c.Insert(toInsert); err != nil {
                 fmt.Println("Insert error")
		   panic(err)
		   formatter.JSON(w, http.StatusOK, bson.M{"error": "System Insert Error"})
		} else {
			formatter.JSON(w, http.StatusOK, toInsert)
              }
	
	} else {
	 
		fmt.Println("found Name:", result["name"])

	       formatter.JSON(w, http.StatusOK, bson.M{"error": "Name Already Existed"})
       }
   }
}


//hnote: API login post check user name and password
func gumballLoginHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

 
       var result bson.M


	err := req.ParseForm()
	if err != nil {
		panic(err)
	}
	 
	password:= req.Form.Get("password")
	name := req.Form.Get("name")

	fmt.Println("Searching Name:", name )
      fmt.Println("Searching password:", password)

	session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C("cmpe281")

	err = c.Find(bson.M{"name": name , "password":password}).One(&result)  //Select(bson.M{"name": 0})
	if err != nil {
		//panic(err)
           fmt.Println("Not found Name")

              formatter.JSON(w, http.StatusOK, bson.M{"error": "Not found Name"})
	
	} else {
	 
		fmt.Println("found Name:", result["name"])
	 	 
	    formatter.JSON(w, http.StatusOK, result)
       }
   }
}


// API Create New Gumball Order
func gumballNewOrderHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		uuid := uuid.NewV4()
    	var ord = order {
					Id: uuid.String(),            		
					OrderStatus: "Order Placed",
		}
		if orders == nil {
			orders = make(map[string]order)
		}
		orders[uuid.String()] = ord
		fmt.Println( "Orders: ", orders )
		formatter.JSON(w, http.StatusOK, ord)
	}
}

// API Get Order Status
func gumballOrderStatusHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var uuid string = params["id"]
		fmt.Println( "Order ID: ", uuid )
		if uuid == ""  {
			fmt.Println( "Orders:", orders )
			var orders_array [] order
			for key, value := range orders {
    			fmt.Println("Key:", key, "Value:", value)
    			orders_array = append(orders_array, value)
			}
			formatter.JSON(w, http.StatusOK, orders_array)
		} else {
			var ord = orders[uuid]
			fmt.Println( "Order: ", ord )
			formatter.JSON(w, http.StatusOK, ord)
		}
	}
}

// API Process Orders 
func gumballProcessOrdersHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		// Open MongoDB Session
		session, err := mgo.Dial(mongodb_server)
        if err != nil {
                panic(err)
        }
        defer session.Close()
        session.SetMode(mgo.Monotonic, true)
        c := session.DB(mongodb_database).C(mongodb_collection)

       	// Get Gumball Inventory 
        var result bson.M
        err = c.Find(bson.M{"SerialNumber" : "1234998871109"}).One(&result)
        if err != nil {
                log.Fatal(err)
        }

 		var count int = result["CountGumballs"].(int)
        fmt.Println("Current Inventory:", count )


		// Update Gumball Inventory
		query := bson.M{"SerialNumber" : "1234998871109"}
        change := bson.M{"$set": bson.M{ "CountGumballs" : count}}
        err = c.Update(query, change)
        if err != nil {
                log.Fatal(err)
        }

		// Return Order Status
		formatter.JSON(w, http.StatusOK, orders)
	}
}



/*

  	-- Gumball MongoDB Collection (Create Document) --

    db.gumball.insert(
	    { 
	      Id: 1,
	      CountGumballs: NumberInt(202),
	      ModelNumber: 'M102988',
	      SerialNumber: '1234998871109' 
	    }
	) ;

    -- Gumball MongoDB Collection - Find Gumball Document --

    db.gumball.find( { Id: 1 } ) ;

    {
        "_id" : ObjectId("54741c01fa0bd1f1cdf71312"),
        "Id" : 1,
        "CountGumballs" : 202,
        "ModelNumber" : "M102988",
        "SerialNumber" : "1234998871109"
    }

    -- Gumball MongoDB Collection - Update Gumball Document --

    db.gumball.update( 
        { Dd: 1 }, 
        { $set : { CountGumballs : NumberInt(10) } },
        { multi : false } 
    )

    -- Gumball Delete Documents

    db.gumball.remove({})

 */
