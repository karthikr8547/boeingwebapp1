/* global multiparty */
/* global azure */
//Initial draft
var express = require('express');
var app = express();
var azure = require('azure-storage');
var formidable = require('formidable');
var multiparty = require('multiparty');
const fileUpload = require('express-fileupload');

app.use(fileUpload());

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
    var blobService = azure.createBlobService('boeingwepapp1','YqMF4F3rl76F/IhcRUXj1Ede1zHlSRHCtly/7BjB1cMAjsMBlksK3O8DPwFlIy0PfU/TiPBEDdvXGahZeeH4tQ==');  
    var form = new multiparty.Form();
    var path = req.files.snapshot;
       console.log(path);
	form.on('part', function(part) {
        if (part.filename) {
            var size = part.byteCount - part.byteOffset;
            var name = part.filename;
            blobService.createBlockBlobFromLocalFile('mycontainer', name, name, function(error) {
           // blobService.createBlockBlobFromFile('mycontainer', name, path, function(error) {
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
	    
var port = process.env.PORT || 1337;

app.listen(port,function(){
	console.log("Server started......");
});
