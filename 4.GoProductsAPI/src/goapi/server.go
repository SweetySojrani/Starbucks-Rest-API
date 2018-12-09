package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/codegangsta/negroni"
	//"github.com/streadway/amqp"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	//"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// MongoDB Config
var (
	mongodb_server        string //= "13.52.50.11"
	mongodb_database      = "cmpe281"
	mongodb_collection    = "products"
	mongoAuthenticationDb = "admin"
	mongoUsername         = "admin"
	mongoPassword         = "cmpe281"
)

func getMongoSession() *mgo.Session {
	mongodb_server = os.Getenv("MONGODB_SERVER")
	log.Printf("Connecting to mongo server (%s)", mongodb_server)
	info := &mgo.DialInfo{
		Addrs:    []string{mongodb_server},
		Database: mongoAuthenticationDb,
		Username: mongoUsername,
		Password: mongoPassword,
	}
	session, err := mgo.DialWithInfo(info)
	if err != nil {
		panic(err)
	}
	session.SetMode(mgo.Monotonic, true)
	return session
}

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
	mx.HandleFunc("/products", productHandler(formatter)).Methods("GET")
	mx.HandleFunc("/products/{id}", productUpdateHandler(formatter)).Methods("PUT")
	mx.HandleFunc("/products/{id}", productStatusHandler(formatter)).Methods("GET")
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

//API Products Handler
func productHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		session := getMongoSession()
		defer session.Close()

		c := session.DB(mongodb_database).C(mongodb_collection)
		var result []bson.M
		err := c.Find(nil).All(&result)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("All Products:", result)
		formatter.JSON(w, http.StatusOK, result)
	}
}

// API Update Products Inventory based on given Id
func productUpdateHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var productID string
		productID = params["id"]
		var m product
		_ = json.NewDecoder(req.Body).Decode(&m)
		log.Println("Update Product Inventory To: ", m.Count)
		session := getMongoSession()
		defer session.Close()

		c := session.DB(mongodb_database).C(mongodb_collection)
		fmt.Printf("name is (%s)", m.Name)
		query := bson.M{"_id": bson.ObjectIdHex(productID)}
		change := bson.M{"$set": bson.M{"count": m.Count}}
		err := c.Update(query, change)
		if err != nil {
			log.Fatal(err)
		}
		var result bson.M
		err = c.Find(bson.M{"_id": bson.ObjectIdHex(productID)}).One(&result)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Product:", result)
		formatter.JSON(w, http.StatusOK, result)
	}
}

//API GET each Product
func productStatusHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		var productID string
		productID = params["id"]
		log.Printf("product id requested is (%s)", productID)

		session := getMongoSession()
		defer session.Close()
		var result bson.M
		c := session.DB(mongodb_database).C(mongodb_collection)
		err := c.FindId(bson.ObjectIdHex(productID)).One(&result)
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("Your Product: (%s)", result)
		formatter.JSON(w, http.StatusOK, result)
	}
}

/*

  	-- Products MongoDB Collection (Create Document) --

    db.products.insert([
    {
    "name": "Latte Macchiato",
    "description": "Creamy whole milk with barista",
    "price": 5,
    "image_url": "https://globalassets.starbucks.com/assets/fb9eda922982444ea9871de8cbd29b67.jpg",
    "count": 12
    },
    {
    "name": "Doppio",
    "description": "Two bold shots of expresso with cream",
    "price": 7,
    "image_url": "https://globalassets.starbucks.com/assets/d01fdcb3707c4c98ac575e89f3293b38.jpg",
    "count": 10
    },
    {
    "name": "Cappuccino",
    "description": "Deeply delicious expresso with a light airy foam",
    "price": 8,
    "image_url": "https://globalassets.starbucks.com/assets/2237ef1d9dab486695b8e6269d41ab0a.jpg",
    "count": 3
    }
    ]);

    db.products.insert([
    {
    "name": "Cinnamon Dolce Latte",
    "description": "Steamed milk and cinnamon dolce syrup added to classic expresso",
    "price": 10,
    "image_url": "https://globalassets.starbucks.com/assets/79883bdbd5634757a5ae1c8126f75451.jpg",
    "count": 14
    },
    {
    "name": "Caffe Mocha",
    "description": "Rich expresso with bitter-sweet mocha and steamed milk",
    "price": 9,
    "image_url": "https://globalassets.starbucks.com/assets/bc15a5ca9d744b66bda07254f2f50013.jpg",
    "count": 16
    },
    {
    "name": "Chai Latte",
    "description": "Black tea infused with cinnamon and clove with steamed milk and light foam",
    "price": 4,
    "image_url": "https://globalassets.starbucks.com/assets/f344c66e8de74a4faf5c65f4060cf1f7.jpg",
    "count": 15
    }
    ]);

    db.products.insert([
    {
    "name": "Pumpkin Spice Chai Tea Latte",
    "description": "Pumpkin and spices go great with steamed milk and light foam",
    "price": 6,
    "image_url": "https://globalassets.starbucks.com/assets/727b21c60eec40208098cb94903ebca0.jpg",
    "count": 20
    },
    {
    "name": "Honey Citrus Mint Tea",
    "description": "Herbal tea with steamed lemonade and a touch of honey is perfect for the cold weather!",
    "price": 3,
    "image_url": "https://globalassets.starbucks.com/assets/4bffd5c29ee644a5b810610c322f741a.jpg",
    "count": 30
    },
    {
    "name": "Morning Muffin",
    "description": "This healthy muffin has zucchini, carrots, crunchy nuts and a dash of cane sugar",
    "price": 2,
    "image_url": "https://globalassets.starbucks.com/assets/3f3ff719711d45b2993903a7a8d1549d.jpg",
    "count": 5
    },
    {
    "name": "Iced lemon pond cake",
    "description": "A moist lemon cake with sweet icing",
    "price": 2,
    "image_url": "https://globalassets.starbucks.com/assets/12014fa89261475798a3c3b7dcc54552.jpg",
    "count": 4
    }
    ]);

    -- Products MongoDB Collection - Find Product Document --

    db.products.find( { "name" : "Iced lemon pound cake" } ) ;

    {
    "_id": "5c0249158a65bd82055aa9fb",
    "count": 10000,
    "description": "A moist lemon cake with sweet icing",
    "image_url": "https://globalassets.starbucks.com/assets/12014fa89261475798a3c3b7dcc54552.jpg",
    "name": "Iced lemon pond cake",
    "price": 2
}

    -- Products Delete Documents

    db.products.remove({})

    -- Run the products api locally
    MONGODB_SERVER="localhost:32769" ./goapi.exe

    db.createUser(
    {
      user: "admin",
      pwd: "cmpe281",
      roles: [
      	{ role: "root", db: "admin" },
      	              { role: "userAdminAnyDatabase", db: "admin" },
                  { role: "readWriteAnyDatabase", db: "admin" },
                  { role: "dbAdminAnyDatabase", db: "admin" },
                  { role: "clusterAdmin", db: "admin" }
      ]
      }
     )
    
    curl localhost:3000/products/5c09a7b21b905f4efe8af226
    curl localhost:3000/products
    curl localhost:3000/ping
    curl -XPUT -d '{"_id":"5c09a7b21b905f4efe8af226", "count":999}' localhost:3000/products/5c09a7b21b905f4efe8af226
    docker build -t lakshmimaduri/starbucks-products-goapi .


*/
