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

var app = express();

//app.use(fileUpload());

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

/*
app.post('/upload', function (req, res) {
    var blobService = azure.createBlobService('boeingwepapp1','YqMF4F3rl76F/IhcRUXj1Ede1zHlSRHCtly/7BjB1cMAjsMBlksK3O8DPwFlIy0PfU/TiPBEDdvXGahZeeH4tQ==');  
    var form = new multiparty.Form();
    //var path = req.files.snapshot;
       //console.log(path);
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
});*/	    
	  
// Upload route.
app.post('/upload', upload.single('snapshot'), function(req, res) {
	console.log(path.basename(req.file.snapshot));
/*    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        var old_path = files.snapshot.path,
            file_size = files.snapshot.size,
            file_ext = files.snapshot.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);

        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(500);
                        res.json({'success': false});
                    } else {
                        res.status(200);
                        res.json({'success': true});
                    }
                });
            });
        });
    });*/
});
var port = process.env.PORT || 1337;

app.listen(port,function(){
	console.log("Server started......");
});
