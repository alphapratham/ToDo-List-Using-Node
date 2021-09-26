var express = require('express');
var app = express()
var todocontroller = require('./controllers/todocontroller')

//set template engine
app.set("view engine","ejs")

//static files
app.use(express.static('./public'));

//
todocontroller(app);

//server to listen
app.listen(4447);
console.log("Connected Successfully")