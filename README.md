## Requirements

- Node.js  and npm .  (Recommended node version 18.20.7, npm version 9.9.4)
- MongoDB  (either local or a cloud URI like MongoDB Atlas)
- Postman
  
## Installation & Running the Project

1. Clone  the project folder to your system.

2. Open terminal and navigate to the project folder:
   ```bash
   cd -project-folder-name
3. install all dependencies using command "npm install"
4. create .env file that includes MONGO_URI and PORT
5. start the server with the command "start.bat"(recommended for the CPU utilization task) or simply "node index.js" or "nodemon index.js"
6. run  the application on browser For eg : http://your-domain:5000

## Properties of APIs

1. To upload the csv file  
   1. URL http://your-domain:5000/api/upload
   2. Method : POST
   3. form-data: csv file

2.  API for find policy info with the help of the username
    1. URL http://your-domain:5000/api/policy-details/John Doe
    2. Method : GET

3. API for provide aggregated policy by each user.
   1. URL http://your-domain:5000/api/aggregated_policy
   2. Method : GET

4. API for post-service that takes the message, day, and time
   1. URL http://your-domain:5000/api/message
   2. Method : POST
   3. body: {"message":"hello", "day":"2025-07-29", time:"12:20"}
   4. headers:  Content-Type:application/json
 

   
