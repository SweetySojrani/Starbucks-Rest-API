# Project Name: Starbucks Online Orders

#### Team Members:

- Yinghua Qin
- Kody Han
- Lakshmi Maduri
- Sweety Sojrani
- Vera Wang

#### Project Modules:

- Catalog - Lakshmi
- Payment - Sweety
- Login/Signup - Yinghua
- Create order - Vera
- Process Order - Kody
- Frontend: All Members


## Part 1 - Go API for Login (Yinghua)

The Go API  is deployed to my individual project EC2 instance.

It connects to my individual project Mongo NoSQL Database Cluster with Sharding through the Mongo Query Router. 

#### How to use the Login API

Run following curl command to test the login success case

    curl -H "Content-Type: application/x-www-form-urlencoded" -X POST http://13.56.125.192:3000/login \
       -d "name=oliver1" \
       -d "password=a123"
    
    curl -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/login \
    -d "name=oliver&password=a123"

Change the password from a123 to wrong_password to test the login fail case

    curl -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/login \
    -d "name=oliver&password=wrong_password"

![](https://github.com/nguyensjsu/fa18-281-sky/blob/master/GoLoginAPI/TestingCURL.jpg)	

![](https://github.com/nguyensjsu/fa18-281-sky/blob/master/GoLoginAPI/GoLogsDuringLogin.jpg.jpg)		

#### Journal of setting up the Mongo data collection for Go API.

Go to the Mongo Query Router EC2 instance.

    sudo systemctl restart mongodb
    mongo
    use cmpe281
    db.createCollection("cmpe281")

    db.cmpe281.insert( { "user_id":1, "name":"oliver", "password":"123" })
    db.cmpe281.insert( { "user_id":2, "name":"harry", "password":"456" })
    db.cmpe281.insert( { "user_id":3, "name":"emma", "password":"789" })
    db.cmpe281.insert( { "user_id":4, "name":"sophia", "password":"124" })
    db.cmpe281.insert( { "user_id":5, "name":"jack", "password":"125" })
    db.cmpe281.insert( { "user_id":1, "name":"oliver1", "password":"a123" })

![](https://github.com/nguyensjsu/fa18-281-sky/blob/master/GoLoginAPI/CreateDataCollection.jpg)		

#### Journal of setting up the Go at EC2 instance for Go API Application

Go to the Mongo Query Router EC2 instance.

Install go:

    wget https://dl.google.com/go/go1.11.1.linux-amd64.tar.gz 
    tar -C /usr/local -xzf go1.11.1.linux-amd64.tar.gz
    export PATH=$PATH:/usr/local/go/bin
    
    vi ~/.profile
    	export GOPATH=$HOME//goapi
    	export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

    source ~/.profile
    cd ~/goapi
    go build goapi
    ./goapi      //start Go API service

#### Journal of creating the Login API in Go

    Adding the link to github Login API Go folder. 
    
	

