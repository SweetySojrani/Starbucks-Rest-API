# Go Login API



Go to the Mongo Query Router EC2 instance.

```

mongo
use cmpe281
db.createCollection("cmpe281")

db.cmpe281.insert( { "user_id":1, "name":"oliver", "password":"123" })
db.cmpe281.insert( { "user_id":2, "name":"harry", "password":"456" })
db.cmpe281.insert( { "user_id":3, "name":"emma", "password":"789" })
db.cmpe281.insert( { "user_id":4, "name":"sophia", "password":"124" })
db.cmpe281.insert( { "user_id":5, "name":"jack", "password":"125" })
db.cmpe281.insert( { "user_id":1, "name":"oliver1", "password":"a123" })
```

