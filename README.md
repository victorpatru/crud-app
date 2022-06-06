# Building a basic CRUD app
An application taking advantage of basic CRUD functionality.

**Link to project:** https://victors-crud-app.herokuapp.com/

<img width="617" alt="CleanShot 2022-06-06 at 17 28 38@2x" src="https://user-images.githubusercontent.com/102596893/172181457-1eb42c80-3922-4176-b9b0-c1e49ade5e8d.png">


## How It's Made:

**Tech used:** HTML, CSS, JavaScript, EJS, Node.js and Express.js

* We created our API using the server.js. It listens for requests from the client side and serves information based on the desired action
* The actions created are: ability to any kind of quote and update/delete the ones involving Yoda as name (replaced by Darth Vader quotes).
* Using the information we get back from our API (server.js), we then dynamically generate the HTML page using Javascript (thanks to the EJS framework)


## Optimizations
* Potentially expand the scope of our update and delete functions to include other quotes besides one from Yoda.

## Lessons Learned:
* How to take advantage of basic CRUD functionality to build a full-stack application
* How to create an API that listens for requests from a client and responds appropriately based on the desired action
* How to serve back to the user dynamically generated HTML using the ejs Javascript framework
* How to write client side Javascript code that takes advantage of our server side API


### Note
* This project is based on the tutorial by Zell Liew https://zellwk.com/blog/crud-express-mongodb/ (all credits go to the author!)

## Examples:
Take a look at these couple examples that I have in my own portfolio:

**Daily Coding Challenges:** https://github.com/victorpatru/Coding-Challenges

**Nokia 1600 version of Snake:** https://github.com/victorpatru/nokia1600-snake

**Jeopardy:** https://github.com/victorpatru/jeopardy
