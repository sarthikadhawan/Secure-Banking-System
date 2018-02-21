'use strict';
/*Contains Route js*/
var framework = require('./framework/framework.js'),
    transactionsController = require('./controllers/transactions.js'),
    updateController=require('./controllers/updateinfo.js'),
    requestsController=require('./controllers/requests.js'),
    logger = framework.getLogger(),
    fs = require('fs'),
    bodyParser = require('body-parser');
    var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a",
  database: "bankingsystem"
});
con.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
});

module.exports = function (app) {


    app.post('/transactionsiu', function (req,res) {
              if(req.session.ipadd==req.connection.remoteAddress){

      // console.log(req.body);
      transactionsController.createTransaction(req, res);
}
    });
    app.get('/getUserInfo', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        console.log("Reached Here1");
        updateController.getUserInfo(req, res);}
    });
    app.post('/updateUserInfo', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        console.log("PostUpdateUserInfo");
        updateController.updateUserInfo(req, res);}
    });
    app.get('/requests', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        requestsController.getRequests(req, res);}
    });
    app.post('/requests/:id/accept', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        requestsController.acceptRequest(req, res);}
    });
    app.post('/requests/:id/reject', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        requestsController.rejectRequest(req, res);}
    });
    app.post('/umail', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        updateController.updateEmail(req, res) ; }    });
    app.post('/upwd', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        updateController.updatePwd(req, res);
    }
    });
    app.post('/uphno', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        updateController.updatePhno(req, res);
    }
    });
    app.post('/uaddr', function (req, res) {
              if(req.session.ipadd==req.connection.remoteAddress){

        updateController.updateAddr(req, res);
    }
    });
  app.post('/logoutiu', function (req, res, next) {

    if(req.session.ipadd==req.connection.remoteAddress){

  
req.session.destroy(function(err) {
 res.render('../public/home.ejs',{ 

          });
    
});
}
});




    app.all('*.html', function (req, res) {
         console.log(req.url);
         var out = fs.readFileSync("templates" + req.url);
         res.set('content-type', 'text/html');
         res.send(out);

     });





app.get('/authorize_requestsiu',function(req,res){
  var query=null;
  var requests=null;
  var aadhar= req.session.useraadhar;
  query="SELECT * FROM authtransaction where Verified=0 and OfUserAadhar="+mysql.escape(aadhar);
  con.query(query, function (err, result, fields){
    if (err)
    console.log(err);
    res.render('../public/authorizereqiu.ejs',{
        requests:result
          });
    });
  });


app.post('/authorize_requestsiu', function (req, res, next) {

  if (req.sanitize(req.body.app=="Approve"))
  {

      for (var i=0;i<req.sanitize(req.body.checkboxreq).length;i++)
      {
        
if(req.body.hidden==1){
          var chsplit=req.body.checkboxreq.split(",");
        }
        else{
        var chsplit=req.body.checkboxreq[i].split(",");
      }        
                query="update authtransaction set Verified=1 where ID="+chsplit[0];
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                   
        });
        

        
      }
res.render('../public/frontpageiu.ejs',{
  userid:req.session.userid,
    usertype:req.session.usertype }); 

    }
    else if(req.sanitize(req.body.app)=="Reject")
    {
     for (var i=0;i<req.sanitize(req.body.checkboxreq).length;i++)
          {
            
if(req.body.hidden==1){
          var chsplit=req.body.checkboxreq.split(",");
        }
        else{
        var chsplit=req.body.checkboxreq[i].split(",");
      }            
                query="update authtransaction set Verified=2 where ID="+chsplit[0];
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                   
            });
            
            
          }
res.render('../public/frontpageiu.ejs',{
  userid:req.session.userid,
    usertype:req.session.usertype, }); 

    }

  
});
};