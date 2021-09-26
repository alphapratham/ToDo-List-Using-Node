var bodyParser = require('body-parser');
// var data = [{item : 'go to distribute papers'},{item : 'get milk'},{item : 'study'}]
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose')

//Database connection

mongoose.connect('mongodb://127.0.0.1:27017/AlphaSaitama',(err)=>{
  if(err)
    throw err;
  else
    console.log("Connected Successfully ....");
})

//
var todoSchema = new mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo',todoSchema);


module.exports = function(app){

app.get('/todo',function(req,res){

    // fetch data from database 

    Todo.find({},function(err,data){
        if(err) throw err;
        res.render('todo',{todos : data})
    })
});

app.post('/todo', urlencodedParser , function(req, res){
   
    var newTodo = Todo(req.body).save(function(err,data){
        if (err) throw err;
        res.json({todos: data})
    })  
})
app.delete('/todo/:item',function(req,res){
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if (err) throw err;
        res.json({data});
    })
});

}
