package main

type gumballMachine struct {
	Id            int
	CountGumballs int
	ModelNumber   string
	SerialNumber  string
}

type order struct {
	Id          string
	OrderStatus string
}

var orders map[string]order

type product struct {
	Count       int
	Description string
	ImageUrl    string
	Name        string
	Price       float64
	Id          string
}