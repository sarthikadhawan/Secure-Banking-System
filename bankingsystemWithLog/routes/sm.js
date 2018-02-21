var express = require('express');
var router = express.Router();
var session = require('express-session');
var unique = require('array-unique');
//var User = require('../models/user');
var mysql = require('mysql');
var crypto = require('crypto');
var User = require('../routes/router');
var moment = require('moment');
let verifyToken = require('../routes/auth');

var trycatch = require('trycatch')

//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded());
//app.set('view engine','ejs');

var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'a',
  database:'bankingsystem'
});


router.get('/approverejecttransactionsm',function(req,res){
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/approverejecttransactionsm'};
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
  query="SELECT * FROM transactionreqsm,transaction where transaction.ID=transactionreqsm.TransactionID and Status=0 ";
  connection.query(query, function (err, result, fields){
    if (err)
    console.log(err);
    res.render('../public/transactionreqsm.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid,
        requests:result
          });
    });
}
  });

router.post('/approverejecttransactionsm',function(req,res){
   if(req.session.ipadd==req.connection.remoteAddress){


      var values={IpAddress:req.connection.remoteAddress,Description:'/approverejecttransactionsmPOST'};
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
    if(req.body.app=="Approve"){
      console.log(req.body.checkboxreq);
      console.log('length='+req.body.hidden);
      connection.beginTransaction(function(err){
        if(err)
        console.log(err);
      for(var i =0;i<req.body.hidden;i++){
        if(req.body.hidden==1){
          var chsplit=req.body.checkboxreq.split(",");
        }
        else{
        var chsplit=req.body.checkboxreq[i].split(",");
      }
        console.log('hi');
        console.log(chsplit[0]);
        console.log(chsplit[1]);
        console.log(chsplit[2]);
        console.log(chsplit[3]);
        console.log(chsplit[4]);
        console.log(chsplit[5]);
        if(chsplit[2]=='-1'){
          var query10="SELECT * FROM account WHERE ID="+chsplit[3];
          connection.query(query10,function(err,result){
            if(err){
            return console.log(err);
            connection.rollback(function(){
              throw err;
            });
          }
            var balance2=result[0].Balance;
          var total=parseInt(balance2)+parseInt(chsplit[6]);
          var query4 = "UPDATE account SET Balance ="+total+" WHERE ID ="+chsplit[3];
          connection.query(query4,function(err,result){
            if(err){
              return console.log(err);
              connection.rollback(function(){
                throw err;
              });
            }
            var query6="INSERT INTO msg SET ?";
            var msg={FromUser:-1,ToUser:chsplit[5],Description:"Transaction with ID= "+chsplit[1]+". Amount ="+chsplit[6]+" transferred to account number = "+chsplit[3]};
            connection.query(query6,msg,function(err,result){
              if(err){
                return console.log(err);
                connection.rollback(function(){
                  throw err;
                });
              }
              connection.query("DELETE FROM transactionreqsm WHERE (ID) IN (?)",chsplit[0],function(err,results){
                if(err){
                  return console.log(err);
                  connection.rollback(function(){
                    throw err;
                  });
                }
              });

            });
          });
          });
        }else if(chsplit[3]=='-1'){
          var query10="SELECT * FROM account WHERE ID="+chsplit[2];
          connection.query(query10,function(err,result){
            if(err){
            return console.log(err);
            connection.rollback(function(){
              throw err;
            });
          }
            var balance2=result[0].Balance;
          var total=parseInt(balance2)+parseInt(chsplit[6]);
          var query4 = "UPDATE account SET Balance ="+total+" WHERE ID ="+chsplit[2];
          connection.query(query4,function(err,result){
            if(err){
              return console.log(err);
              connection.rollback(function(){
                throw err;
              });
            }
            var query6="INSERT INTO msg SET ?";
            var msg={FromUser:-1,ToUser:chsplit[4],Description:"Transaction with ID= "+chsplit[1]+". Amount ="+chsplit[6]+" transferred to account number = "+chsplit[2]};
            connection.query(query6,msg,function(err,result){
              if(err){
                return console.log(err);
                connection.rollback(function(){
                  throw err;
                });
              }
              connection.query("DELETE FROM transactionreqsm WHERE (ID) IN (?)",chsplit[0],function(err,results){
                if(err){
                  return console.log(err);
                  connection.rollback(function(){
                    throw err;
                  });
                }
              });
            });
          });
          });
        }else{
        connection.query("SELECT * FROM account WHERE ID = "+chsplit[2],function(err,result){
          if(err){
          return console.log(err);
          connection.rollback(function(){
            throw err;
          });
        }
          if(result.length>0){
            console.log("debit account exits");
            connection.query("SELECT * FROM account WHERE ID = "+chsplit[3],function(err,results2){
              if(err){
                return console.log(err);
                connection.rollback(function(){
                  throw err;
                });
              }
                if(results2.length>0){
                  console.log("credit account exists");
                  connection.query("DELETE FROM transactionreqsm WHERE (ID) IN (?)",chsplit[0],function(err,results){
                    if(err){
                      return console.log(err);
                      connection.rollback(function() {
                        throw err;
                      });
                    }
                  query="UPDATE transaction SET Status=1 WHERE ID="+chsplit[1];
                  connection.query(query,function(err,result,fields){
                    if(err){
                      return console.log(err);
                      connection.rollback(function() {
                        throw err;
                      });
                    }
                    var query2="SELECT * FROM account WHERE ID="+chsplit[2];
                    connection.query(query2,function(err,result){
                      if(err){
                        return console.log(err);
                        connection.rollback(function() {
                          throw err;
                        });
                      }
                      var balance=result[0].Balance;
                      if(balance-chsplit[6]>=0){
                        balance=balance-chsplit[6];
                        var query3="UPDATE account SET Balance="+balance+" WHERE ID="+chsplit[2];
                        connection.query(query3,function(err,result){
                          if(err){
                            return console.log(err);
                            connection.rollback(function() {
                              throw err;
                            });
                          }
                          var query4="SELECT * FROM account WHERE ID="+chsplit[3];
                          connection.query(query4,function(err,result){
                            if(err){
                              return console.log(err);
                              connection.rollback(function() {
                                throw err;
                              });
                            }
                            var balance2=result[0].Balance;
                            var balance3=parseInt(balance2)+parseInt(chsplit[6]);
                            var query5="UPDATE account SET Balance="+balance3+" WHERE ID="+chsplit[3];
                            connection.query(query5,function(err,result){
                              if(err){
                                return console.log(err);
                                connection.rollback(function() {
                                  throw err;
                                });
                              }
                              var query6="INSERT INTO msg SET ?";
                              var msg={FromUser:chsplit[4],ToUser:chsplit[5],Description:"Transaction with ID= "+chsplit[1]+". Amount ="+chsplit[6]+" transferred to account number = "+chsplit[3]};
                              connection.query(query6,msg,function(err,result){
                                if(err){
                                  return console.log(err);
                                  connection.rollback(function() {
                                    throw err;
                                  });
                                }
                                connection.commit(function(err) {
                                  if (err) {
                                    connection.rollback(function() {
                                      throw err;
                                    });
                                  }
                                  console.log('Transaction Complete.');
                                    res.render('../public/frontpagesm.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
                                   //connection.end();
                                });
                              });
                            });
                          });
                        });
                      }
                      else{
                        console.log('NOT ENOUGH BALANCE');
                      }
                    });
                  });
                });
                }else{
                  console.log("Credit account doesnt exist");
                }

            });
          }else{
            console.log("Debit account doesnt exist");
          }
        });
      }
    }
      });
  }
  else if (req.body.app=="Reject"){
    console.log(req.body.checkboxreq);
    console.log('length='+req.body.hidden);
    for(var i =0;i<req.body.hidden;i++){
      if(req.body.hidden==1){
        var chsplit=req.body.checkboxreq.split(",");
      }
      else{
      var chsplit=req.body.checkboxreq[i].split(",");
    }
      console.log('hi');
      console.log(chsplit[0]);
      console.log(chsplit[1]);
      console.log(chsplit[2]);
      console.log(chsplit[3]);
      console.log(chsplit[4]);
      console.log(chsplit[5]);
      connection.beginTransaction(function(err){
        if(err)
        console.log(err);

      connection.query("DELETE FROM transactionreqsm WHERE (ID) IN (?)",chsplit[0],function(err,results){
        if(err){
          return console.log(err);
          connection.rollback(function() {
            throw err;
          });
        }
      query="UPDATE transaction SET Status=2 WHERE ID="+chsplit[1];
      connection.query(query,function(err,result,fields){
        if(err){
          return console.log(err);
          connection.rollback(function() {
            throw err;
          });
        }

          connection.commit(function(err) {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }
            console.log('Transaction Complete.');
            res.render('../public/frontpagesm.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
                          // connection.end();
          });
      });
    });
  });

  }
  }
  
}
});

router.get('/logoutsm', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      //console.log("hi"+req.session.userid);
      var values={IpAddress:req.connection.remoteAddress,Description:'/logoutsm'};
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
req.session.destroy(function(err) {

  if(err)
  console.log(err);
 res.render('../public/home.ejs',{

          });

});
        });

}
});


router.get('/requestaccess',function(req,res){
    if(req.session.ipadd==req.connection.remoteAddress){
       var values={IpAddress:req.connection.remoteAddress,Description:'/requestaccess'};
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


  var requests=null;
  var query="SELECT * FROM transaction";
  connection.query(query,function(err,result,fields){
    if(err)
    console.log(err);
    res.render('../public/requestaccess.ejs',{
      requests:result,
      userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
    });
  });
}
});

router.post('/requestaccess',function(req,res){
    if(req.session.ipadd==req.connection.remoteAddress){
 var values={IpAddress:req.connection.remoteAddress,Description:'/requestaccessPOST'};
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
  if(req.body.app=="Approve"){
    console.log(req.body.checkboxreq);
    console.log('length='+req.body.hidden);
    connection.beginTransaction(function(err){
      if(err)
      console.log(err);
    for(var i=0;i<req.body.hidden;i++){
      if(req.body.hidden==1){
        var chsplit=req.body.checkboxreq.split(",");
      }
      else{
      var chsplit=req.body.checkboxreq[i].split(",");
    }
    console.log(chsplit[0]);
    console.log(chsplit[1]);
    console.log(chsplit[2]);
    console.log(chsplit[3]);
    var query2="INSERT INTO authtransaction SET ?";
    var val={UserAadhar:'1',TransactionID:chsplit[0],OfUserAadhar:chsplit[3],Verified:'0'};
    connection.query(query2,val,function(err,result){
      if(err)
      console.log(err);

    });
    }

    res.render('../public/frontpagesm.ejs',{
                          userid:req.session.userid,
                            usertype:req.session.usertype,
                            sessionid:req.session.sessionid,
                            Useraadhar:req.session.Useraadhar

                         });
      });
  }
}
});

module.exports = router;
