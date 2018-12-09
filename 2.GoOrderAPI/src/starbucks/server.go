package main

import (
	"encoding/json"
	"fmt"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/satori/go.uuid"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"log"
	"net/http"
)

// MongoDB Config
//var mongodb_server = "mongo-service"
var mongodb_server = "54.183.73.159:27017"
//var mongodb_server = "18.144.31.55:27017"
//var mongodb_server = "localhost:27017"
var mongodb_database = "cmpe281"
var mongodb_collection = "starbucks"

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
	mx.HandleFunc("/user/{user_id}/order", createOrderHandler(formatter)).Methods("POST")
	mx.HandleFunc("/user/{user_id}/order/{id}", getOrderStatusHandler(formatter)).Methods("GET")
	mx.HandleFunc("/user/{user_id}/order/{id}", completeOrderHandler(formatter)).Methods("POST")
	mx.HandleFunc("/user/{user_id}/orders", getHistoryOrderHandler(formatter)).Methods("GET")
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

// API Place New Order
func createOrderHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		params := mux.Vars(req)
		var UserId string = params["user_id"]
		var m order
		_ = json.NewDecoder(req.Body).Decode(&m)

		fmt.Println("User ID ", UserId)
		fmt.Println("Place order: ", m)
		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()

		// Reads may not be entirely up-to-date, but they will always see the
		// history of changes moving forward, the data read will be consistent
		// across sequential queries in the same session, and modifications made
		// within the session will be observed in following queries (read-your-writes).
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)

		uuid, _ := uuid.NewV4()
		m.OrderId = uuid.String()
		m.OrderStatus = "Order Created"

		query := bson.M{"UserId": UserId, "OrderId": m.OrderId, "Items": m.Items, "OrderStatus": m.OrderStatus}

		// Insert order to mongodb
		err = c.Insert(query)

		if err != nil {
			log.Fatal(err)
		}

		var result bson.M
		err = c.Find(bson.M{"OrderId": m.OrderId, "UserId": UserId}).One(&result)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Order created: ", result)

		// Return created order status along with order_id
		formatter.JSON(w, http.StatusOK, result)
	}
}

// API Get Order Status
func getOrderStatusHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		params := mux.Vars(req)
		var OrderId string = params["id"]
		//var m order
		var UserId string = params["user_id"]
		//_ = json.NewDecoder(req.Body).Decode(&m)
		// need to retrieve from the session for user_id

		//var UserId string = m.UserId

		fmt.Println("Order ID ", OrderId)

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)

		var result bson.M
		err = c.Find(bson.M{"UserId": UserId, "OrderId": OrderId}).One(&result)
		if err != nil {
			log.Fatal(err)
		}

		// Return Order Status
		formatter.JSON(w, http.StatusOK, result)

	}
}

// API Get Orders History
func getHistoryOrderHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		//var m order
		//_ = json.NewDecoder(req.Body).Decode(&m)
		//var UserId string = m.UserId
		params := mux.Vars(req)
		var UserId string = params["user_id"]

		fmt.Println("UserId ", UserId)

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)

		var orders []bson.M
		err = c.Find(bson.M{"UserId": UserId}).All(&orders)
		if err != nil {
			log.Fatal(err)
		}

		// Return All Orders Status
		formatter.JSON(w, http.StatusOK, orders)

	}
}

// API Complete an order
func completeOrderHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {

		params := mux.Vars(req)
		var OrderId string = params["id"]
	//	var m order
	//	_ = json.NewDecoder(req.Body).Decode(&m)
	//	var UserId string = m.UserId
		var UserId string = params["user_id"]

		session, err := mgo.Dial(mongodb_server)
		if err != nil {
			panic(err)
		}
		defer session.Close()
		session.SetMode(mgo.Monotonic, true)
		c := session.DB(mongodb_database).C(mongodb_collection)

		query := bson.M{"OrderId": OrderId}
		change := bson.M{"$set": bson.M{"OrderStatus": "Order Completed"}}

		err = c.Update(query, change)
		if err != nil {
			log.Fatal(err)
		}

		var result bson.M
		err = c.Find(bson.M{"UserId": UserId, "OrderId": OrderId}).One(&result)
		if err != nil {
			log.Fatal(err)
		}

		// Return Order Status
		formatter.JSON(w, http.StatusOK, result)

	}
}

/*

-- Starbucks MongoDB Collection (Create Document) --


	use cmpe281
	db.createCollection("starbucks")
	show collections


*/
