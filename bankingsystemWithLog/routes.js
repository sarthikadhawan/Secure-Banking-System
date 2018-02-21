'use strict';
/*Contains Route js*/
var framework = require('./framework/framework.js'),
    transactionsController = require('./controllers/transactions.js'),
    updateController=require('./controllers/updateinfo.js'),
    requestsController=require('./controllers/requests.js'),
    merchantPaymentController=require('./controllers/merchantPayment.js'),
    logger = framework.getLogger(),
    fs = require('fs'),
    bodyParser = require('body-parser');
    var mysql = require('mysql');
var validator = require('validator');
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

    app.get('/modifyphone1', function (req,res) {
        if(req.session.ipadd==req.connection.remoteAddress){
            res.render("../public/modifyphone.ejs",{});
        }
    });
    app.get('/modifypassword1', function (req,res) {
        if(req.session.ipadd==req.connection.remoteAddress){
            res.render("../public/modifypassword.ejs",{});
        }
    });
    app.get('/modifyaddress1', function (req,res) {
        if(req.session.ipadd==req.connection.remoteAddress){
            res.render("../public/modifyaddress.ejs",{});
        }
    });
    app.get('/modifynationality1', function (req,res) {
        if(req.session.ipadd==req.connection.remoteAddress){
            res.render("../public/modifynationality.ejs",{});
        }
    });

    app.get('/merchantTransactionejs', function (req,res) {
        if(req.session.ipadd==req.connection.remoteAddress){
            res.render("../templates/merchantTransaction.ejs",{});
        }

    });
   app.get('/makeTransactionejs',function(req,res){
if(req.session.ipadd==req.connection.remoteAddress){
res.render("../templates/makeTransaction.ejs",{});
}});

    app.post('/transactionsiu', function (req,res) {
              if(req.session.ipadd==req.connection.remoteAddress){

      // console.log(req.body);
      transactionsController.createTransaction(req, res);
}
    });
    app.post('/merchantPayment', function (req,res) {
              if(req.session.ipadd==req.connection.remoteAddress){


      merchantPaymentController.createTransaction(req, res);
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
  app.get('/logoutiu', function (req, res, next) {

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
  var values={IpAddress:req.connection.remoteAddress,Description:'/authorize_requestsiuGet'};
  connection.query('SELECT * from syslog',function(err1, rows1, fields1) {
    if (err1) throw err1;
    if(rows1.length>1000){

      connection.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
        if (err2) throw err2;

        connection.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
            if (err3) throw err3;
          });
        });

    }
    else{
      connection.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
          if (err2) throw err2;
        });

    }

    });
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
  var values={IpAddress:req.connection.remoteAddress,Description:'/authorize_requestsiuPOST'};
  connection.query('SELECT * from syslog',function(err1, rows1, fields1) {
    if (err1) throw err1;
    if(rows1.length>1000){

      connection.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
        if (err2) throw err2;

        connection.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
            if (err3) throw err3;
          });
        });

    }
    else{
      connection.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
          if (err2) throw err2;
        });

    }

    });

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
