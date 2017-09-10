//Initial draft
var express = require('express');
var app = express();

app.get('/',function(req,res){
  res.send("Hello Express App");
});

app.listen(3000,function(){
	console.log("Server started......");
});
