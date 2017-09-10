//Initial draft
var express = require('express');
var app = express();

app.get('/',function(req,res){
  res.send("Hello Express App");
});

var port = process.env.PORT || 1337;

app.listen(port,function(){
	console.log("Server started......");
});
