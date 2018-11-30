package main

type orderItem struct {
	Name     string
	Price    string
	Quantity int
	Size     string
}

type order struct {
	OrderId     string
	Items       []orderItem
	UserId      string
	OrderStatus string
}
