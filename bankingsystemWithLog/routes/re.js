var express = require('express');
var router = express.Router();
var session = require('express-session');
var unique = require('array-unique');
//var User = require('../models/user');
var mysql = require('mysql');
var crypto = require('crypto');
var User = require('../routes/router');
var validator = require('validator');

var trycatch = require('trycatch')


var uniqid = require('uniqid');
var generalsessionId=0;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a",
  database: "bankingsystem"
});



router.get('/frontpagere', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/frontpagere'};
      con.query('SELECT * from syslog',function(err1, rows1, fields1) {
        if (err1) throw err1;
        if(rows1.length>1000){

          con.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
            if (err2) throw err2;

            con.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
          	    if (err3) throw err3;
          	  });
            });

        }
        else{
          con.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
        	    if (err2) throw err2;
        	  });

        }

    	  });

        var aadhar=req.session.useraadhar;
        
        var query="SELECT * FROM authtransaction where UserAadhar="+aadhar+" and Verified=1;";
        console.log(query);
        var reqs;
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            reqs=result;
            res.render('../public/frontpagere.ejs',{userid:req.session.userid,
        usertype:req.session.usertype,
        sessionid:req.session.sessionid,
        useraadhar:req.session.useraadhar, requests:reqs,aadhar:aadhar});
        });
    }

});

//frontpage re



router.post('/checkstatusre', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/checkstatusre'};
      con.query('SELECT * from syslog',function(err1, rows1, fields1) {
        if (err1) throw err1;
        if(rows1.length>1000){

          con.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
            if (err2) throw err2;

            con.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
          	    if (err3) throw err3;
          	  });
            });

        }
        else{
          con.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
        	    if (err2) throw err2;
        	  });

        }

    	  });
        var aadhar=req.session.useraadhar;
        
        var query="SELECT * FROM authtransaction where UserAadhar="+req.session.useraadhar+" and Verified=1";
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.render('../public/seedatare.ejs',{requests:result,aadhar:aadhar, userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});


        });
    }
});


router.post('/gettransactiondata', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/gettransactiondata'};
      con.query('SELECT * from syslog',function(err1, rows1, fields1) {
        if (err1) throw err1;
        if(rows1.length>1000){

          con.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
            if (err2) throw err2;

            con.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
                if (err3) throw err3;
              });
            });

        }
        else{
          con.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
              if (err2) throw err2;
            });

        }

        });

    var aadhar=req.sanitize(req.body.ofuseraadhar);
    var query="SELECT * FROM transaction where DebitAadharNo="+aadhar+" and ID="+req.sanitize(req.body.getdata);
    var reqs;

if(validator.isNumeric(aadhar.toString())&&validator.isNumeric(req.body.getdata.toString())&&aadhar&&req.body.getdata){
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.render('../public/viewtransactionreqre.ejs',{transaction:result,aadhar:req.session.useraadhar, userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
    });}


   }
});


router.post('/requestaccess', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/requestaccess'};
      con.query('SELECT * from syslog',function(err1, rows1, fields1) {
        if (err1) throw err1;
        if(rows1.length>1000){

          con.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
            if (err2) throw err2;

            con.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
                if (err3) throw err3;
              });
            });

        }
        else{
          con.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
              if (err2) throw err2;
            });

        }

        });
      if(req.body.userAadhar&&req.body.empaadhar&&req.body.reason&&req.body.transactionID&&validator.isNumeric(req.body.userAadhar.toString())&&validator.isNumeric(req.body.empaadhar.toString())&&validator.isNumeric(req.body.transactionID.toString())&&validator.isAlpha(req.body.reason.toString()))
      {
       
    var req1 = {
      UserAadhar:req.sanitize(req.session.useraadhar),
        OfUserAadhar: req.sanitize(req.body.aadhar),
      //reason: req.body.reason,
      TransactionID: reqq.sanitize(req.body.transactionID)


    }
    console.log(req1);
    var query='INSERT into authtransaction set ?';
    con.query(query,req1 ,function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.render('../public/frontpagere.ejs',{userid:req.session.userid,
    usertype:req.session.usertype,
    sessionid:req.session.sessionid,
    useraadhar:req.session.useraadhar});
  });
}
else
res.send("Something wrong entered or format not follwed or empty fields");

}
});


router.post('/seerequests', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/seerequests'};
      con.query('SELECT * from syslog',function(err1, rows1, fields1) {
        if (err1) throw err1;
        if(rows1.length>1000){

          con.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
            if (err2) throw err2;

            con.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
                if (err3) throw err3;
              });
            });

        }
        else{
          con.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
              if (err2) throw err2;
            });

        }

        });
      if(req.body.aadhar){
         
      var aadhar=re.sanitize(req.body.aadhar);
      console.log(aadhar);

      var query="SELECT * FROM transactionreqre where Verified=0;";
      console.log(query);
      con.query(query, function (err, result, fields) {
          if (err) throw err;
          res.render('../public/seerequests.ejs',{requests:result,aadhar:aadhar, userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
      });

    }}
    else
res.send("Something wrong entered or format not follwed or empty fields");

});
router.get('/transactionreqre', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/transactionreqre'};
      con.query('SELECT * from syslog',function(err1, rows1, fields1) {
        if (err1) throw err1;
        if(rows1.length>1000){

          con.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
            if (err2) throw err2;

            con.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
                if (err3) throw err3;
              });
            });

        }
        else{
          con.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
              if (err2) throw err2;
            });

        }

        });
    if(!(req.body.aadhar)){
        res.send("error: fill all details");
    }
else{
  var query=null;
  var requests=null;

  query="SELECT * FROM transactionreqre,transaction where transaction.ID=transactionreqre.TransactionID ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    requests=result;
    res.render('../public/transactionreqre.ejs',{

        requests:requests,
        userid:req.session.userid,
        aadhar:req.sanitize(req.body.aadhar),
    usertype:req.session.usertype,
sessionid:req.session.sessionid

          });
  });}}

});

router.post('/approverejecttransactionre',function(req,res){
    if(req.body.app=="Approve"){
      var values={IpAddress:req.connection.remoteAddress,Description:'/approverejecttransactionre'};
      con.query('SELECT * from syslog',function(err1, rows1, fields1) {
        if (err1) throw err1;
        if(rows1.length>1000){

          con.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
            if (err2) throw err2;

            con.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
                if (err3) throw err3;
              });
            });

        }
        else{
          con.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
              if (err2) throw err2;
            });

        }

        });
      console.log(req.body.checkboxreq);
      console.log('length='+req.body.hidden);
      con.beginTransaction(function(err){
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
          con.query(query10,function(err,result){
            if(err){
            return console.log(err);
            con.rollback(function(){
              throw err;
            });
          }
            var balance2=result[0].Balance;
          var total=parseInt(balance2)+parseInt(chsplit[6]);
          var query4 = "UPDATE account SET Balance ="+total+" WHERE ID ="+chsplit[3];
          con.query(query4,function(err,result){
            if(err){
              return console.log(err);
              con.rollback(function(){
                throw err;
              });
            }
            var query6="INSERT INTO msg SET ?";
            var msg={FromUser:-1,ToUser:chsplit[5],Description:"Transaction with ID= "+chsplit[1]+". Amount ="+chsplit[6]+" transferred to account number = "+chsplit[3]};
            con.query(query6,msg,function(err,result){
              if(err){
                return console.log(err);
                con.rollback(function(){
                  throw err;
                });
              }
              con.query("DELETE FROM transactionreqre WHERE (ID) IN (?)",chsplit[0],function(err,results){
                if(err){
                  return console.log(err);
                  con.rollback(function(){
                    throw err;
                  });
                }
              });

            });
          });
          });
        }else if(chsplit[3]=='-1'){
          var query10="SELECT * FROM account WHERE ID="+chsplit[2];
          con.query(query10,function(err,result){
            if(err){
            return console.log(err);
            con.rollback(function(){
              throw err;
            });
          }
            var balance2=result[0].Balance;
          var total=parseInt(balance2)+parseInt(chsplit[6]);
          var query4 = "UPDATE account SET Balance ="+total+" WHERE ID ="+chsplit[2];
          con.query(query4,function(err,result){
            if(err){
              return console.log(err);
              con.rollback(function(){
                throw err;
              });
            }
            var query6="INSERT INTO msg SET ?";
            var msg={FromUser:-1,ToUser:chsplit[4],Description:"Transaction with ID= "+chsplit[1]+". Amount ="+chsplit[6]+" transferred to account number = "+chsplit[2]};
            con.query(query6,msg,function(err,result){
              if(err){
                return console.log(err);
                con.rollback(function(){
                  throw err;
                });
              }
              con.query("DELETE FROM transactionreqre WHERE (ID) IN (?)",chsplit[0],function(err,results){
                if(err){
                  return console.log(err);
                  con.rollback(function(){
                    throw err;
                  });
                }
              });
            });
          });
          });
        }else{
        con.query("SELECT * FROM account WHERE ID = "+chsplit[2],function(err,result){
          if(err){
          return console.log(err);
          con.rollback(function(){
            throw err;
          });
        }
          if(result.length>0){
            console.log("debit account exits");
            con.query("SELECT * FROM account WHERE ID = "+chsplit[3],function(err,results2){
              if(err){
                return console.log(err);
                con.rollback(function(){
                  throw err;
                });
              }
                if(results2.length>0){
                  console.log("credit account exists");
                  con.query("DELETE FROM transactionreqre WHERE (ID) IN (?)",chsplit[0],function(err,results){
                    if(err){
                      return console.log(err);
                      con.rollback(function() {
                        throw err;
                      });
                    }
                  query="UPDATE transaction SET Status=1 WHERE ID="+chsplit[1];
                  con.query(query,function(err,result,fields){
                    if(err){
                      return console.log(err);
                      con.rollback(function() {
                        throw err;
                      });
                    }
                    var query2="SELECT * FROM account WHERE ID="+chsplit[2];
                    con.query(query2,function(err,result){
                      if(err){
                        return console.log(err);
                        con.rollback(function() {
                          throw err;
                        });
                      }
                      var balance=result[0].Balance;
                      if(balance-chsplit[6]>=0){
                        balance=balance-chsplit[6];
                        var query3="UPDATE account SET Balance="+balance+" WHERE ID="+chsplit[2];
                        con.query(query3,function(err,result){
                          if(err){
                            return console.log(err);
                            con.rollback(function() {
                              throw err;
                            });
                          }
                          var query4="SELECT * FROM account WHERE ID="+chsplit[3];
                          con.query(query4,function(err,result){
                            if(err){
                              return console.log(err);
                              con.rollback(function() {
                                throw err;
                              });
                            }
                            var balance2=result[0].Balance;
                            var balance3=parseInt(balance2)+parseInt(chsplit[6]);
                            var query5="UPDATE account SET Balance="+balance3+" WHERE ID="+chsplit[3];
                            con.query(query5,function(err,result){
                              if(err){
                                return console.log(err);
                                con.rollback(function() {
                                  throw err;
                                });
                              }
                              var query6="INSERT INTO msg SET ?";
                              var msg={FromUser:chsplit[4],ToUser:chsplit[5],Description:"Transaction with ID= "+chsplit[1]+". Amount ="+chsplit[6]+" transferred to account number = "+chsplit[3]};
                              con.query(query6,msg,function(err,result){
                                if(err){
                                  return console.log(err);
                                  con.rollback(function() {
                                    throw err;
                                  });
                                }
                                con.commit(function(err) {
                                  if (err) {
                                    con.rollback(function() {
                                      throw err;
                                    });
                                  }
                                  console.log('Transaction Complete.');
                                    res.render('../public/frontpagere.ejs',{
                                     userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
                                   //con.end();
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
      con.beginTransaction(function(err){
        if(err)
        console.log(err);

      con.query("DELETE FROM transactionreqre WHERE (ID) IN (?)",chsplit[0],function(err,results){
        if(err){
          return console.log(err);
          con.rollback(function() {
            throw err;
          });
        }
      query="UPDATE transaction SET Status=2 WHERE ID="+chsplit[1];
      con.query(query,function(err,result,fields){
        if(err){
          return console.log(err);
          con.rollback(function() {
            throw err;
          });
        }

          con.commit(function(err) {
            if (err) {
              con.rollback(function() {
                throw err;
              });
            }
            console.log('Transaction Complete.');
            res.render('../public/frontpagere.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
                         //  con.end();
          });
      });
    });
  });

  }

  }
 
});


router.get('/logoutre', function (req, res, next) {


 if(req.session.ipadd==req.connection.remoteAddress){
  var values={IpAddress:req.connection.remoteAddress,Description:'/logoutre'};
  con.query('SELECT * from syslog',function(err1, rows1, fields1) {
    if (err1) throw err1;
    if(rows1.length>1000){

      con.query('TRUNCATE table syslog',function(err2, rows2, fields2) {
        if (err2) throw err2;

        con.query('INSERT INTO syslog set ?',values, function(err3, rows3, fields3) {
            if (err3) throw err3;
          });
        });

    }
    else{
      con.query('INSERT INTO syslog set ?',values, function(err2, rows2, fields2) {
          if (err2) throw err2;
        });

    }

    });

    req.session.destroy(function(err) {
 res.render('../public/home.ejs',{

          });

});


}


});



module.exports = router;
