/* global multiparty */
/* global azure */
//Initial draft
var express = require('express');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var azure = require('azure-storage');
var multiparty = require('multiparty');
var multer  = require('multer');
var busboy = require('connect-busboy');
var delay = require('express-delay');
var app = express();

app.use(busboy()); 

//var upload = multer({ dest: 'uploads/' });

//app.use(fileUpload());

app.get('/',function(req,res){
  res.send("Hello Express App");
});

app.get('/upload', function (req, res) {
    res.send(
    '<form action="/upload" method="post" enctype="multipart/form-data">' +
    '<input type="file" name="file" />' +
    '<input type="submit" value="Upload" />' +
    '</form>'
    );
});

/*app.post('/upload', function (req, res) {
  var bs = azure.createBlobService('boeingwepapp1','YqMF4F3rl76F/IhcRUXj1Ede1zHlSRHCtly/7BjB1cMAjsMBlksK3O8DPwFlIy0PfU/TiPBEDdvXGahZeeH4tQ==');
  var form = new formidable.IncomingForm();
  form.onPart = function(part){
    bs.createBlockBlobFromStream('mycontainer', 'task1', part, 11, function(error){
      if(!error){
          // Blob uploaded
      }
    });
  };
  form.parse(req);
  res.send('OK');
});*/

/*app.post('/upload', function (req, res) {
    var path = req.file.snapshot.path;
    var bs= azure.createBlobService('boeingwepapp1','YqMF4F3rl76F/IhcRUXj1Ede1zHlSRHCtly/7BjB1cMAjsMBlksK3O8DPwFlIy0PfU/TiPBEDdvXGahZeeH4tQ==');
    
	
    bs.createBlockBlobFromFile('mycontainer', name, path, function (error) { 
                if (error) {
		   console.log(error);
                   return res.send({ Grrr: error });
                }   
    });
    res.send("OK");
});*/

app.post('/upload', function (req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        //fstream = fs.createWriteStream(__dirname + '/files/' + filename);
	fstream = fs.createWriteStream(__dirname + '/' + filename);
	file.pipe(fstream); 
	fstream.on('close', function () {	
	res.redirect('back');
	    '<form action="/uploadAzure" method="post" enctype="multipart/form-data">' +
	    '<input type="submit" value="Confirm" />'
	    '</form>'		
	});	
    });
}

app.post('/uploadAzure', function (req, res) {
    var blobService = azure.createBlobService('boeingwepapp1','YqMF4F3rl76F/IhcRUXj1Ede1zHlSRHCtly/7BjB1cMAjsMBlksK3O8DPwFlIy0PfU/TiPBEDdvXGahZeeH4tQ==');  
    var form = new multiparty.Form();
	form.on('part', function(part) {
        if (part.filename) {
            var size = part.byteCount - part.byteOffset;
            var name = part.filename;
            blobService.createBlockBlobFromLocalFile('mycontainer', name, name, function(error) {
            //blobService.createBlockBlobFromFile('mycontainer', name, '/files/' + name, function(error) {
		if (error) {
		   console.log(error);
                   return res.send({ Grrr: error });
                } 
            });
        } else {
            form.handlePart(part);
        }
    });
    form.parse(req);
    res.setHeader('content-type', 'text/plain');
    res.send('OK');
});

/*app.post('/upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        //fstream = fs.createWriteStream(__dirname + '/files/' + filename);
	fstream = fs.createWriteStream(__dirname + '/' + filename);
	file.pipe(fstream); 
	fstream.on('close', function () {	
         res.redirect('back');
        });
    });
});*/

var port = process.env.PORT || 1337;

app.listen(port,function(){
	console.log("Server started......");
});
