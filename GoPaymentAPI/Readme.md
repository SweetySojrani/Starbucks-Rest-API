GoAPI Payment



Steps Performed:
- Create DataBase for GOAPI in AWS/
- Create GOAPI in local machine and test the create order and create payment functions
- After successful run create docker image of the GOAPI and push on docker hub
- Create a new GOAPI AWS instance and pull the image from Dockerhub
- Perform a test run in postman this time with the IP address of GOAPI AWS instance instead of localhost
- Once successfully tested, create the image of the GOAPI instance and create GOAPI2 instance from the image
- Create Load Balancer for X-Axis scaling of the Microservice. 
- Test the Curl Commands in Postman with LoadBalancer now. 
- Once the API is successfully tested with LoadBalancer, start building the frontend in node.js
- Create the controller, pay.js in views and handelers and perform test on the payment pages.
- Once the front end is ready, perform Integrating testing with front end for all the other APIs.
- Deploy the API on Kong Gateway
- Deploy the front End on Heroku


