GoAPI Payment



Steps Performed:
- Create DataBase for GoAPI in AWS/
- Create GoAPI in local machine and test the create order and create payment functions
- After successful run create docker image of the GoAPI and push on docker hub
- Create a new GoAPI AWS instance and pull the image from Dockerhub
- Perform a test run in postman this time with the IP address of GoAPI AWS instance instead of localhost
- Once successfully tested, create the image of the GoAPI instance and create GoAPI2 instance from the image
- Create Load Balancer for X-Axis scaling of the Microservice. 

![load_balancer](https://user-images.githubusercontent.com/42895383/49684429-c278e800-fa88-11e8-85b8-7d77ed765f5f.png)


- Test the Curl Commands in Postman with LoadBalancer now. 
- Once the API is successfully tested with LoadBalancer, start building the frontend in node.js
- Create the controller, pay.js in views and handelers and perform test on the payment pages.
- Once the front end is ready, perform Integrating testing with front end for all the other APIs.
- Deploy the API on Kong Gateway
- Deploy the front End on Heroku


