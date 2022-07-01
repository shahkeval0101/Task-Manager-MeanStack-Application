# Task-Manager-MeanStack-Application

## Code Reading
1. Initially go to mongodb folder and run mongodb command - .\mongodb\bin\mongod.exe --dbpath=mongodb-data
2. Then go to ./api - npm i and node app.js
3. Then go to ./frontend - npm i and ng serve

# Frontend

## components
Initally Sign up page will come to sign in or login page to login to existing id. <br>
The home page will load task-view.component. <br>
In this initially we will display all the available lists[getLists()] to the left and add list[createList()] button at the bottom. <br>
The right side of the screen displays gear icon which can edit[updateList()] and delete the list[deleteList()].<br>
Below the Icon displays the list of tasks [getTasks()]. <br>
Each task has Update task[updateTask()] and Delete Icon[deleteList()]. <br>
Below there is create task Icon[createTask()] to create new task. <br>

## models
List and Task model are defined for type casting the variable. <br>

## Services
web-request.service.ts - for all the get,patch,post and delete method. <br>
task.service - for all business logic regarding creating,retrieving,updating and deleting tasks and lists. <br> 
auth.service - for login/signup, getting and setting accesstoken, getting refresh token and user id and refreshing access token. <br>

## URL Endpoints
List URLs. <br>
1. getLists() - /lists - GET Method - Fetches all the list 
2. createList() - /lists - POST Method - Creates a List, Body - title 
3. updateList() - lists/:id - Patch Method - Update the list with particular ID, Body - listID and title to update 
4. deleteList() - lists/:id - Delete Method - Deletes the particular list, ListID

Tasks URLs. <br>
1. getTasks() - /lists/:listId/tasks - GET Method - Get all tasks in a particular list, listId
2. createTask() - /lists/:listId/tasks - Post Method - Create Task for particular list, Body - title,listId
3. updateTask() - /lists/:listId/tasks/:taskId - Patch Method - Update task of particular list, Body - listId, taskId, title
4. deleteList() - /lists/:listId/tasks/:taskId - Delete Method - Delete task of particular list, listId, taskId
5. complete() - Patch Method -  lists/${task._listId}/tasks/${task._id} - It is updating the task model complete variable to whatever it is to opposite[lists/:listId/tasks/:taskid]

User URLs. <br>
1. /users - sign up the user
2. /users/login - log in the user
3. /users/me/access-token - Generates and return access token


# Backend
## API
Initially we will start from app.js. <br>
Connect to the database with moongose. <br>
Read user, task, list models. <br>
Read authentication for access token. <br> 
Middlewares. <br>
Route handlers. <br>


# Authorization 
## sign-up
Initially Sign up page will load and we will enter username and password.<br>
It will be passed to /users sign up call in api. <br>
What API will do?. <br>
Create the constructor obj and save it. <br>
createSession() function generate refresh authtoken[generateRefreshAuthToken()] and save it to database[saveSessionToDatabase()].<br> 
                generateRefreshAuthToken() function <br> 
                => Generates 64 byte hex code   <br>
                saveSessionToDatabase() function <br>
                => calculates expiry time of refresh token [generateRefreshTokenExpiryTime() - which calculates time till now + 10 days]. <br>
                => saves refresh token generated and expiry time to the user.sessions object. <br>

generateAccessAuthToken() function - is used to generate access token. <br> 
Finally authtoken and refresh token are response set in the header and returned as json. <br>

What FrontEnd will do. <br>
This returned token will then be set in the localstorage variables with setSession(). <br>

## login
Initially Login page will load and we will enter username and password. <br>
It will be passed to /users/login sign up call in api. <br>
What API will do?<br>
Create the constructor obj for user. <br>
Then it will validate the email and check hash password once both are satisfied in[findByCredentials()]. <br>
Then createSession() function generate refresh authtoken[generateRefreshAuthToken()] and save it to database[saveSessionToDatabase()]. <br>  
                generateRefreshAuthToken() function <br>
                => Generates 64 byte hex code   <br>
                saveSessionToDatabase() function <br>
                => calculates expiry time of refresh token [generateRefreshTokenExpiryTime() - which calculates time till now + 10 days]. <br>
                => saves refresh token generated and expiry time to the user.sessions object. <br>

generateAccessAuthToken() function - is used to generate access token <br>
Finally authtoken and refresh token are set in the response header and returned as json<br>
What FrontEnd will do<br>
This returned token will then be set in the localstorage variables with setSession()<br>

## Generate and return Access token
getNewAccessToken() - is used to get new access token<br>
Initially current refresh token that is local storage along with id is fetched and send to the url /users/me/access-token<br>
Initially the middleware [verifySession()] will verify the session<br>
verifySession() function =><br>
fetch id, refresh token<br>
Find corresponding user with findByIdAndToken() it will return the user<br>
Check if the session is valid - <br>
The refresh token in header is valid or not that we have to check<br>
hasRefreshTokenExpired() tells weather refresh token is expired or not and correspondingly session is valid or not is known<br>
if session is valid middleware is stopped<br>
if session is invalid -  'error': 'Refresh token has expired or the session is invalid'<br>

Then access token is generated[generateAccessAuthToken()] and send to the user <br>
Once the access token is return it is set again to the local storage<br>



## Refreshing access token logic
Now lets say if we get error that session is invalid then<br>
interceptor will take the error<br>
it will call the getNewAccessToken() method<br>

