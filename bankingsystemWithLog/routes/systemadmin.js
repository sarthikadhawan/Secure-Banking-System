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

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a",
  database: "bankingsystem"
});


router.get('/regrequestsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/regrequestsa'};
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
  var query=null;
  var requests=null;

  query="SELECT * FROM regrequests ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    requests=result;
    res.render('../public/regrequestsa.ejs',{

        requests:requests,
         userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid

          });
  });
}
});


router.get('/viewsyslogsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/viewsyslogsa'};
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

  var query=null;
  var requests=null;

  query="SELECT * FROM syslog ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    syslog=result;
    res.render('../public/viewsyslogsa.ejs',{

        requests:result,
        userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });
  });
}
});



router.get('/delusersa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/delusersa'};
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

var re="",m="",iu="",sm="";
  var query="SELECT * FROM regularemployee ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    re=result;
    var query2="SELECT * FROM systemmanager";
    con.query(query2, function (err, result, fields) {
    if (err) throw err;
    sm=result;
    var query3="SELECT * FROM individualuser";

    con.query(query3, function (err, result, fields) {
    if (err) throw err;
    iu=result;
    var query4="SELECT * FROM merchant";

    con.query(query4, function (err, result, fields) {
    if (err) throw err;
    m=result;

res.render('../public/delusersa.ejs',{

        re:re,
        sm:sm,
        iu:iu,
        m:m,
        userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid


          });
});

  });
  });
  });


}

  });


router.get('/viewrollbacktransactionreqsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/viewrollbacktransactionreqsa'};
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
  var query=null;
  var requests=null;

  query="SELECT * FROM rollbacktransactionreqsa,transaction where transaction.ID=rollbacktransactionreqsa.TransactionID ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    requests=result;
    res.render('../public/viewrollbacktransactionreqsa.ejs',{

        requests:requests,
 userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid

          });
  });
}
});

router.get('/rollbacktransactionsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/rollbacktransactionsa'};
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

  var query=null;
  var requests=null;
        con.beginTransaction(function(err){

  query="SELECT * FROM rollbacktransactionreqsa,transaction where transaction.ID=rollbacktransactionreqsa.TransactionID and Statusextuser=1";
  con.query(query, function (err, result, fields) {
if(err){
            return console.log(err);
            con.rollback(function() {
              throw err;
            });
          }
    var query2="insert into transaction set ?";
data={CreditAccount:result[0].DebitAccount,DebitAccount:result[0].CreditAccount,DebitAadharNo:result[0].CreditAadharNo,CreditAadharNo:result[0].DebitAadharNo,Amount:result[0].Amount,Timestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),Status:1}
con.query(query2, data,function (err, result, fields) {
if(err){
            return console.log(err);
            con.rollback(function() {
              throw err;
            });
          }                    ID=result.insertId;
                    var query3="select * from account  where AadharNumber="+data.DebitAadharNo;
                    con.query(query3, function (err, result, fields) {
if(err){
            return console.log(err);
            con.rollback(function() {
              throw err;
            });
          }                    var ans=parseInt(result[0].Balance);
                    if(ans-parseInt(data.Amount)>0){
                    var query4="update account set Balance="+parseInt(ans)-parseInt(data.Amount)+" where AadharNumber="+data.DebitAadharNo;
                    con.query(query4, function (err, result, fields) {
if(err){
            return console.log(err);
            con.rollback(function() {
              throw err;
            });
          }                    var query5="select * from account  where AadharNumber="+data.CreditAadharNo;
                    con.query(query5, function (err, result, fields) {
if(err){
            return console.log(err);
            con.rollback(function() {
              throw err;
            });
          }                    var ans=parseInt(result[0].Balance);
                    var query6="update account set Balance="+parseInt(ans)+parseInt(data.Amount)+" where AadharNumber="+data.CreditAadharNo;
                    con.query(query6, function (err, result, fields) {
if(err){
            return console.log(err);
            con.rollback(function() {
              throw err;
            });
          }
                    var query7="insert into msg set ?";
                    var msg={FromUser:req.session.useraadhar,ToUser:data.DebitAadharNo,Description:"Transaction with ID="+ID+" successful. Amount ="+data.Amount+" transferred to "+data.CreditAccount}
                    con.query(query7,msg ,function (err, result) {
if(err){
            return console.log(err);
            con.rollback(function() {
              throw err;
            });
          }                    console.log("1 record inserted");
                   var query8="insert into msg set ?";
                    var msg={FromUser:req.session.useraadhar,ToUser:data.CreditAadharNo,Description:"Transaction with ID="+ID+" successful. Amount ="+data.Amount+" credited from "+data.DebitAccount}
                    con.query(query8,msg ,function (err, result) {
if(err){
            return console.log(err);
            con.rollback(function() {
              throw err;
            });
          }                    console.log("1 record inserted");
                     con.commit(function(err) {
                        if (err) {
                          con.rollback(function() {
                            throw err;
                          });
                        }
                        console.log('Transaction Complete.');
                         //con.end();
                      });

                    });

                    });
                    });
                    });

                    });

                  }
                    });

        });


    res.render('../public/frontpagesa.ejs',{

   userid:req.session.userid,
                            usertype:req.session.usertype,
                            sessionid:req.session.sessionid


          });
  });
});
}
});



router.post('/approverejectrollbacktransactionrequests', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/approverejectrollbacktransactionrequests'};
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

  if (req.body.app=="Approve")
  {

      for (var i=0;i<req.body.hidden;i++)
      {

var chsplit=req.body.checkboxreq[i].split(",");

                query="update rollbacktransactionreqsa set Statussa=1 where ID="+chsplit[0];
                con.query(query, function (err, result, fields) {
                    if (err) throw err;

        });



      }
res.render('../public/frontpagesa.ejs',{

    userid:req.session.userid,
                            usertype:req.session.usertype,
                            sessionid:req.session.sessionid
 });

    }
    else if(req.body.app=="Delete")
    {
     for (var i=0;i<req.body.hidden;i++)
          {

var chsplit=req.body.checkboxreq[i].split(",");

                query="update rollbacktransactionreqsa set Statussa=2 where ID="+chsplit[0]
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;

            });


          }
res.render('../public/frontpagesa.ejs',{
    userid:req.session.userid,
                            usertype:req.session.usertype,
                            sessionid:req.session.sessionid
 });

    }

 }
});






router.get('/transactionreqsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/transactionreqsa'};
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

  var query=null;
  var requests=null;

  query="SELECT * FROM transactionreqsa,transaction where transaction.ID=transactionreqsa.TransactionID and Status=0 ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    requests=result;
    res.render('../public/transactionreqsa.ejs',{

        requests:requests,
 userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid

          });
  });
}
});

router.post('/approverejectregrequests', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/approverejectregrequests'};
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


  if (req.body.app=="Approve")
  {

      for (var i=0;i<req.body.hidden;i++)
      {

            if(req.body.hidden==1){
        var chsplit=req.body.checkboxreq.split(",");
      }
      else{
      var chsplit=req.body.checkboxreq[i].split(",");
    }
        if (chsplit[1]==1)
        {

                query="update regularemployee set Status=1 where ID="+chsplit[2];
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                            });

                    con.query("DELETE FROM regrequests WHERE (ID) IN (?)",
    chsplit[0], function (err, result, fields) {
                        if (err) throw err;



        });
        }

        else if(chsplit[1]==2)
        {
                query="update systemmanager set Status=1 where ID="+chsplit[2]
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                               });

                    con.query("DELETE FROM regrequests WHERE (ID) IN (?)",
    chsplit[0], function (err, result, fields) {

                        if (err) throw err;



        });
        }
      }
res.render('../public/frontpagesa.ejs',{
    userid:req.session.userid,
    usertype:req.session.usertype,
    sessionid:req.session.sessionid });

    }
    else if(req.body.app=="Delete")
    {
     for (var i=0;i<req.body.hidden;i++)
          {

            if(req.body.hidden==1){
        var chsplit=req.body.checkboxreq.split(",");
      }
      else{
      var chsplit=req.body.checkboxreq[i].split(",");
    }

            if (chsplit[1]==1)
            {
                    query="update regularemployee set Status=2 where ID="+chsplit[2];
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;});


                        con.query("DELETE FROM regrequests WHERE (ID) IN (?)",
    chsplit[0], function (err, result, fields) {
                        if (err) throw err;


            });
            }

            else if(chsplit[i].split(",")[1]==2)
            {
                    query="update systemmanager set Status=2 where ID="+chsplit[2];
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
 });

                         con.query("DELETE FROM regrequests WHERE (ID) IN (?)",
    chsplit[0], function (err, result, fields) {
                        if (err) throw err;



            });
            }
          }
res.render('../public/frontpagesa.ejs',{userid:req.session.userid,
    usertype:req.session.usertype,
     sessionid:req.session.sessionid  });
    }
 }
});


router.post('/approverejecttransactionsa',function(req,res){
        if(req.session.ipadd==req.connection.remoteAddress){

          var values={IpAddress:req.connection.remoteAddress,Description:'/approverejecttransactionsa'};
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

    if(req.body.app=="Approve"){
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
              con.query("DELETE FROM transactionreqsa WHERE (ID) IN (?)",chsplit[0],function(err,results){
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
              con.query("DELETE FROM transactionreqsa WHERE (ID) IN (?)",chsplit[0],function(err,results){
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
                  con.query("DELETE FROM transactionreqsa WHERE (ID) IN (?)",chsplit[0],function(err,results){
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
                                    res.render('../public/frontpagesa.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
                                  // con.end();
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

      con.query("DELETE FROM transactionreqsm WHERE (ID) IN (?)",chsplit[0],function(err,results){
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
            res.render('../public/frontpagesa.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
                          // con.end();
          });
      });
    });
  });

  }
  }
 
}
});














router.post('/delusersendreqsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/delusersendreqsa'};
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

  if(req.body.app=="Delete")
    {

     for (var i=0;i<req.body.hidden.split(",")[0];i++)
          {


                     con.query("DELETE FROM regularemployee WHERE (ID) IN (?)",
    req.body.checkboxreqre.split(",")[0], function (err, result, fields) {
                        if (err) throw err;

                        });




            /* con.query("delete from transaction,transactionreqre where transaction.ID=transactionreqre.TransactionID and  CreditAadharNo=?", req.body.checkboxreqre.split(",")[1], function (err, result, fields) {

  });
           */


          }


          for (var i=0;i<req.body.hidden.split(",")[1];i++)
          {



                     con.query("DELETE FROM systemmanager WHERE (ID) IN (?)",
     req.body.checkboxreqsm.split(",")[0], function (err, result, fields) {
                        if (err) throw err;

                        });




          }



          for (var i=0;i<req.body.hidden.split(",")[2];i++)
          {



                    con.query("DELETE FROM individualuser WHERE (ID) IN (?)",
     req.body.checkboxreqiu.split(",")[0], function (err, result, fields) {
                        if (err) throw err;

                        });
                    con.query("delete from account where AadharNumber=?", req.body.checkboxreqiu.split(",")[1], function (err, result, fields) {

  });
  con.query("select * from transaction where DebitAadharNo=?", req.body.checkboxreqiu.split(",")[1],function (err, result, fields) {
 con.query("delete from transactionreqre where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});

 con.query("delete from transactionreqsm where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});

 con.query("delete from transactionreqsa where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});
  });

  con.query("select * from transaction where CreditAadharNo=?", req.body.checkboxreqiu.split(",")[1],function (err, result, fields) {
 con.query("delete from transactionreqre where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});

 con.query("delete from transactionreqsm where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});

 con.query("delete from transactionreqsa where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});
  });

             con.query("delete from transaction where DebitAadharNo=?  ", req.body.checkboxreqiu.split(",")[1],function (err, result, fields) {
              if(err)
          return console.log(err);


  });

              con.query("delete from transaction where CreditAadharNo=?  ", req.body.checkboxreqiu.split(",")[1],function (err, result, fields) {
              if(err)
          return console.log(err);


  });

          }



          for (var i=0;i<req.body.hidden.split(",")[3];i++)
          {




                    con.query("DELETE FROM merchant WHERE (ID) IN (?)",
     req.body.checkboxreqm.split(",")[0], function (err, result, fields) {
                        if (err) throw err;

                        });
                    con.query("delete from account where AadharNumber=?", req.body.checkboxreqm.split(",")[1], function (err, result, fields) {

  });
  con.query("select * from transaction where DebitAadharNo=?", req.body.checkboxreqm.split(",")[1],function (err, result, fields) {
 con.query("delete from transactionreqre where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});

 con.query("delete from transactionreqsm where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});

 con.query("delete from transactionreqsa where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});
  });

  con.query("select * from transaction where CreditAadharNo=?", req.body.checkboxreqm.split(",")[1],function (err, result, fields) {
 con.query("delete from transactionreqre where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});

  con.query("delete from transactionreqsm where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});

   con.query("delete from transactionreqsa where TransactionID =? ", result[0].ID, function (err, result, fields) {
 if(err)
          return console.log(err);
});


  });

             con.query("delete from transaction where DebitAadharNo=?  ", req.body.checkboxreqm.split(",")[1],function (err, result, fields) {
              if(err)
          return console.log(err);


  });

              con.query("delete from transaction where CreditAadharNo=?  ", req.body.checkboxreqm.split(",")[1],function (err, result, fields) {
              if(err)
          return console.log(err);


  });

          }
res.render('../public/frontpagesa.ejs',{
  userid:req.session.userid,
    usertype:req.session.usertype,
    sessionid:req.session.sessionid});










          }

  }
});

router.get('/logoutsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/logoutsa'};
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

router.get('/accreqsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/accreqsa'};
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
 con.query("select * from accountreq  ", function (err, result, fields) {

  res.render('../public/accreqsa.ejs',{
requests:result,
     userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });

 });

}});

router.post('/apprejaccreqsa', function (req, res, next) {
      if(req.session.ipadd==req.connection.remoteAddress){
        var values={IpAddress:req.connection.remoteAddress,Description:'/apprejaccreqsa'};
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

if (req.body.app=="Approve")
  {

     for(var i =0;i<req.body.hidden;i++){
      if(req.body.hidden==1){
        var chsplit=req.body.checkboxreq.split(",");
      }
      else{
      var chsplit=req.body.checkboxreq[i].split(",");
    }
        data={
          Type:req.sanitize(chsplit[1]),
          AadharNumber:req.sanitize(chsplit[2]),
          Balance:req.sanitize(chsplit[3]),
          OpeningDate:moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        }
        console.log(chsplit[4]);
console.log(req.sanitize(chsplit[4]));
                query="delete from accountreq  where ID="+chsplit[0];
                con.query(query, function (err, result, fields) {
                    if (err) throw err;

        });
                con.query("insert into account set ?",data, function (err, result, fields) {
                    if (err) throw err;
                    var value={FromUser:req.session.userid,ToUser:chsplit[2],Description:"account no "+result.insertId+" created"};
                    con.query("insert into msg set ?",value,function (err, result, fields) {
                    if (err) throw err;

        });

        });



      }
res.render('../public/frontpagesa.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
    sessionid:req.session.sessionid});

    }
    else if(req.body.app=="Reject")
    {
     for(var i =0;i<req.body.hidden;i++){
      if(req.body.hidden==1){
        var chsplit=req.body.checkboxreq.split(",");
      }
      else{
      var chsplit=req.body.checkboxreq[i].split(",");
    }

                query="delete from accountreq  where ID="+chsplit[0];
                con.query(query, function (err, result, fields) {
                    if (err) throw err;

        });

          }
res.render('../public/frontpagesa.ejs',{userid:req.session.userid,
    usertype:req.session.usertype,
    sessionid:req.session.sessionid});

    }

}
  });




module.exports = router;
