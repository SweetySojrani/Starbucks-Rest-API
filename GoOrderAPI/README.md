# Go Order API

### Database Setup

1. Start mongo cluster
2. Connect to router

```
mongo
use cmpe281
db.createCollection("starbucks")
```

###Test Order API commands

```
Create order API

    curl -X POST \
      http://localhost:3000/order \
      -H 'Content-Type: application/json' \
      -d '{"UserId": "123",
     "Items": [{
        "Name": "Soy Latte",
        "Price": "$3.5",
        "Quantity": 1
     },
     {
        "Name": "Cappucino",
        "Price": "$4.0",
        "Quantity": 1
     },
     {
        "Name": "Macchiato",
        "Price": "$3.0",
        "Quantity": 1
     }]
    }'

Get Order Status

    curl -X GET \
      http://localhost:3000/order/1fe8d86b-298f-46d9-998a-d80d7713e554 \
      -H 'Content-Type: application/json' \
      -d '{"UserId": "123"}'

Complete Order

    curl -X POST \
      http://localhost:3000/order/1fe8d86b-298f-46d9-998a-d80d7713e554 \
      -H 'Content-Type: application/json' \
      -d '{"UserId": "123"}'

Get orders history

    curl -X GET \
      http://localhost:3000/orders \
      -H 'Content-Type: application/json' \
      -d '{"UserId": "123"}'
```

###Architecture

![Order Deployment Diagram](/Users/Vera/Desktop/Order Deployment Diagram.png)