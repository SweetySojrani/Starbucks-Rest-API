# Go Login API

## Database setup

Go to the Mongo Query Router EC2 instance.

```

mongo
use cmpe281
db.createCollection("cmpe281")

db.cmpe281.insert( { "name":"oliver", "password":"123" })
db.cmpe281.insert( { "name":"harry", "password":"456" })
db.cmpe281.insert( { "name":"emma", "password":"789" })
db.cmpe281.insert( { "name":"sophia", "password":"124" })
db.cmpe281.insert( { "name":"jack", "password":"125" })
db.cmpe281.insert( { "name":"oliver1", "password":"a123" })
```


## Testing the Go API Sign up with CURL

    curl -H "Content-Type: application/x-www-form-urlencoded" -X POST http://54.176.179.159:3000/signup -d "name=oliver4" -d "password=123"
    {
    "error": "Name Already Existed"
    }
    
    curl -H "Content-Type: application/x-www-form-urlencoded" -X POST http://54.176.179.159:3000/signup -d "name=ol" -d "password=123"
    {
    "error": "length of password and name must larger than 2!"
    }
    
    curl -H "Content-Type: application/x-www-form-urlencoded" -X POST http://54.176.179.159:3000/signup -d "name=oliver4" -d "password=123"
    {
    "_id": "5c084a235e23ff7d7104b9e6",
    "name": "oliver4",
    "password": "123"
    }

## Testing the Go API Login with CURL



    curl -H "Content-Type: application/x-www-form-urlencoded" -X POST http://54.176.179.159:3000/login-d "name=oliver4" -d "password=123"
    {
    "_id": "5c084a235e23ff7d7104b9e6",
    "name": "oliver4",
    "password": "123"
    }
    
    curl -H "Content-Type: application/x-www-form-urlencoded" -X POST http://54.176.179.159:3000/login -d "name=oliver5" -d "password=123"
    {
    "error": "Not found Name"
    }



## Go API and backend database deployment diagram

![1544077214655](./README.assets/1544077214655.png)