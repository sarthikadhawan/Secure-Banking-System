var dust = require('dustjs-linkedin');
var framework = require(__dirname + '/framework/framework.js');
var logger = framework.getLogger();
var express = require('express');
var app = express();
//var http=require('http').Server(app);
//var io = require('socket.io')(http);
var localStorage = require('localStorage')
var expressSanitizer = require('express-sanitizer');
var fs = require('fs'); 


var https = require('https'); 
var options = { 
    key: fs.readFileSync('server-key.pem'), 
    cert: fs.readFileSync('server-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem'), 
}; 

app.use(expressSanitizer());  



app.use(express.static(__dirname + '/public'));

localStorage.setItem('user', 0);


require("./controller/controller.js")(app);

https.createServer(options,app).listen(80);/*

/*http.listen(3000,function(){
    console.log("Node Server is setup and it is listening on 3000");
});*/
