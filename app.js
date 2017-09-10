//Initial draft
var express = require('express');
var app = express();

app.get('/',function(req,res){
  res.send("Hello Express App");
});

app.get('/upload', function (req, res) {
    res.send(
    '<form action="/upload" method="post" enctype="multipart/form-data">' +
    '<input type="file" name="snapshot" />' +
    '<input type="submit" value="Upload" />' +
    '</form>'
    );
});

app.post('/upload', function (req, res) {
    var path = req.files.snapshot.path;
    var bs= azure.createBlobService();
    bs.createBlockBlobFromFile('c', 'test.png', path, function (error) { });
    res.send("OK");
});

var port = process.env.PORT || 1337;

app.listen(port,function(){
	console.log("Server started......");
});
