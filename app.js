/* global multiparty */
/* global azure */
//Initial draft
var express = require('express');
var app = express();
var azure = require('azure-storage');
var formidable = require('formidable');

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
  var bs = azure.createBlobService('boeingfirstapp1','hY+TNSjo/NvS7C/Z/2uJLMYmyFYVPCyuiRUN6EOUfPlpJk078E9X/CCdErsea/wyRoaNpb4T1STvWvJeRWwnjg==');
  var form = new formidable.IncomingForm();
  form.onPart = function(part){
    bs.createBlockBlobFromStream('taskcontainer', 'task1', part, 11, function(error){
      if(!error){
          // Blob uploaded
      }
    });
  };
  form.parse(req);
  res.send('OK');
});

/*app.post('/upload', function (req, res) {
    var path = req.file.snapshot.path;
    var bs= azure.createBlobService();
    bs.createBlockBlobFromFile('c', 'test.png', path, function (error) { });
    res.send("OK");
});

app.post('/upload', function (req, res) {
    var blobService = azure.createBlobService();
    var form = new multiparty.Form();
    form.on('part', function(part) {
        if (part.filename) {

            var size = part.byteCount - part.byteOffset;
            var name = part.filename;

            blobService.createBlockBlobFromStream('c', name, part, size, function(error) {
                if (error) {
                    res.send({ Grrr: error });
                }
            });
        } else {
            form.handlePart(part);
        }
    });
    form.parse(req);
    res.send('OK');
});*/

var port = process.env.PORT || 1337;

app.listen(port,function(){
	console.log("Server started......");
});
