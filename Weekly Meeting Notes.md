### Week 1

Discuss about the application domain and split microservices to team members.

- Vera
  - Research on Order feature and decide on which NoSQL database to use
  - Research on popular frontend framework
  
- Yinghua
  - Looked into the Go sample code from professor
  
- Sweety
  - Analyzed the Golabs code to understand the design of GO API microservices.
  - Explored the Payment feature of the application and designed the MongoDB database.

- Lakshmi
  - Understand Starbucks Java Code from Professor
  - Go through GOAPI for gumball from Professor

### Week 2


- Yinghua
  - Created the MongoDB data collection "cmpe281"
  - Added some testing login acount into the MongoDB data collection "cmpe281"

- Vera

  - Looked into the Go sample and design order structure
  - Configure Mongodb and Rabbitmq for order Go API
  
- Sweety
  - Created test cases for payment and started creating the Go API.
  
- Lakshmi
  - Come up with Structure for Product Catalog
  - Build Product Catalog and test it locally
  
### Week 3


- Yinghua
  - Created test cases for successful login
  - Created test cases for failed login (wrong password)
  - Created the Go login API by modifying the Go sample code

Notes: 

      I have the first version Go Login API ready. 
      However, it is connecting to my MongoDB cluster.  
      To keep all those EC2 instances up and running will cost too much $.  
      So I plan to refactor the first version to the second version with a "Strategy" pattern.
      The "Strategy" pattern will have two strategies: Production and Dev.  
      For Dev mode, the app would check a list of accounts without connecting to the MongoDB.  
      For production mode,  it will connect to my MongoDB cluster. 

- Vera
  - Tested order API locally and connected with mongodb and rabbitmq
  - Research on possible frontend framework and wow factors
  
- Sweety
  - Tested the GO API created for payment of the application locally.

- Lakshmi
 - Start building GOAPI route for products
 - Complete building /ping and /products routes for GET requests

### Week 4  


- Yinghua
  - To create a strategy pattern on the Go API so that I could switch the production mode and Dev mode
  - For the Dev mode, it will check a fix list of login account without connecting to MongoDB
  - For the production mode, it will check the MongoDB data. 
  - The purpose of this stratey pattern is to say some EC2 instance hours. :)
- Vera
  - Try to discuss with team on integration and possible Kong gateway routes
  - Tested creating and processing order part and deployed to AWS
  - Decided to use NodeJS as frontend framework
- Lakshmi
   - Added Nodejs API routes for Users and Products
   - Next steps:
      - add remaining API routes
      - Integrate with GO API
- Sweety
   - The payment Go API will check the credit card info from the front end and validate it.
   - The front end will route the order details from order API to make the payment in the payment API
   - The APIs will be deployed as docker containers and will be managed by kubernetes as part of the WOW factor.
   - Next steps:
    - Explore different features of Kubernetes and decide how it can be well utilized for the deployment.
    - Test the integration of the APIs with Node js.

## Week 5 (planning)

- Vera
  - Enable sharding on orders collection
  - Run server with Kubernetes and deploy to AWS
  - Start integration with frontend



