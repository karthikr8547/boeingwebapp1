//var http = require('http');
var express = require('express');
var app = express();

app.get('/',function(req,res)
{
res.send('Hello World!');
});
var server=app.listen(8081,function() {});

//http.createServer(function (req, res) {
    
 //   res.writeHead(200, { 'Content-Type': 'text/html' });
 //   res.end('Hello, world!');
    
//}).listen(process.env.PORT || 8080);
