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
	mx.HandleFunc("/login", starbucksLoginHandler(formatter)).Methods("POST")     
	mx.HandleFunc("/signup", starbucksSignupHandler(formatter)).Methods("POST") 
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

//hnote: API create new users
func starbucksSignupHandler(formatter *render.Render) http.HandlerFunc {
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
func starbucksLoginHandler(formatter *render.Render) http.HandlerFunc {
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



/*

-- MongoDB Collection (Create Document) --

use cmpe281
db.createCollection("cmpe281")

db.cmpe281.insert( { "name":"oliver", "password":"123" })
db.cmpe281.insert( { "name":"harry", "password":"456" })
db.cmpe281.insert( { "name":"emma", "password":"789" })
db.cmpe281.insert( { "name":"sophia", "password":"124" })
db.cmpe281.insert( { "name":"jack", "password":"125" })
db.cmpe281.insert( { "name":"oliver1", "password":"a123" })



 */
