var express = require('express');
var router = express.Router();
var session = require('express-session');
var unique = require('array-unique');
//var User = require('../models/user');
var mysql = require('mysql');
var crypto = require('crypto');
var User = require('../routes/router');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a",
  database: "bankingsystem"
});


router.get('/regrequestsa', function (req, res, next) {
  var query=null;
  var requests=null;

  query="SELECT * FROM regrequests ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    requests=result;
    res.render('../public/regrequestsa.ejs',{

        requests:requests,
        userid:User.userid

          }); 
  });

});


router.get('/viewsyslogsa', function (req, res, next) {
  var query=null;
  var requests=null;

  query="SELECT * FROM syslog ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    syslog=result;
    res.render('../public/viewsyslogsa.ejs',{

        requests:requests,
        userid:User.userid

          }); 
  });

});



router.get('/delusersa', function (req, res, next) {
var re="",m="",iu="",sm="";
  query="SELECT * FROM regularemployee where DelReq=1";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    re=result;
    query="SELECT * FROM systemmanager where DelReq=1";
    con.query(query, function (err, result, fields) {
    if (err) throw err;
    sm=result;
    query="SELECT * FROM individualuser where DelReq=1";

    con.query(query, function (err, result, fields) {
    if (err) throw err;
    iu=result;
    query="SELECT * FROM merchant where DelReq=1";

    con.query(query, function (err, result, fields) {
    if (err) throw err;
    m=result;

});
  
  });
  });
  });
    


    res.render('../public/delusersa.ejs',{

        re:re,
        sm:sm,
        iu:iu,
        m:m,
        userid:User.userid



          }); 
  });



router.get('/transactionreqsa', function (req, res, next) {
  var query=null;
  var requests=null;

  query="SELECT * FROM transactionreqsa,transaction where transaction.ID=transactionreqsa.TransactionID ";
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    requests=result;
    res.render('../public/transactionreqsa.ejs',{

        requests:requests,
        userid:User.userid


          }); 
  });

});

router.post('/approverejectregrequests', function (req, res, next) {
  
  if (req.body.app=="Approve")
  {

      for (var i=0;i<req.body.checkboxreq.length;i++)
      {
        
            var chsplit=req.body.checkboxreq[i].split(",");

        if (chsplit[1]==1)
        {

                query="update regularemployee set Status=1 where ID="+chsplit[2]
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                    query2="delete from regrequests  where ID="+chsplit[0]
                    con.query(query2, function (err, result, fields) {
                    if (err) throw err;
                    });
        });
        }

        else if(chsplit[1]==2)
        {
                query="update systemmanager set Status=1 where ID="+chsplit[2]
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                    query2="delete from regrequests  where ID="+chsplit[0]
                    con.query(query2, function (err, result, fields) {
                    if (err) throw err;
                    
                    });
                    
        });
        }
      }
res.render('../public/frontpagesa.ejs',{
    userid:User.userid,
    usertype:User.usertype }); 

    }
    else if(req.body.app=="Delete")
    {
     for (var i=0;i<req.body.checkboxreq.length;i++)
          {
            
            var chsplit=req.body.checkboxreq[i].split(",");

            if (chsplit[1]==1)
            {
                    query="update regularemployee set Status=2 where ID="+chsplit[2]
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                        query2="delete from regrequests  where ID="+chsplit[0]
                        con.query(query2, function (err, result, fields) {
                        if (err) throw err;
                        
                        });
            });
            }

            else if(chsplit[i].split(",")[1]==2)
            {
                    query="update systemmanager set Status=2 where ID="+chsplit[2]
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                        query2="delete from regrequests  where ID="+chsplit[0]
                        con.query(query2, function (err, result, fields) {
                        if (err) throw err;
                        
                        });
                        
            });
            }
          }
res.render('../public/frontpagesa.ejs',{userid:User.userid,
    usertype:User.usertype }); 
    }
  
});



router.post('/approverejecttransactionrequests', function (req, res, next) {
  
  if (req.body.app=="Approve")
  {

      for (var i=0;i<req.body.checkboxreq.length;i++)
      {
        
var chsplit=req.body.checkboxreq[i].split(",");
        
                query="update transaction set Status=1 where ID="+chsplit[0];
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                    query2="delete from transactionreqsa  where TransactionID="+chsplit[0];
                    con.query(query2, function (err, result, fields) {
                    if (err) throw err;


                    query3="select * from account  where AadharNumber="+chsplit[2];
                    con.query(query3, function (err, result, fields) {
                    if (err) throw err;
                    var ans=result[0].Balance;
                    if(ans-chsplit[3]>0){
                    query4="update account set Balance="+ans-chsplit[3]+" where AadharNumber="+chsplit[2];
                    con.query(query4, function (err, result, fields) {
                    if (err) throw err;
                    query5="select * from account  where AadharNumber="+chsplit[1];
                    con.query(query5, function (err, result, fields) {
                    if (err) throw err;
                    var ans=result[0].Balance;
                    query6="update account set Balance="+ans+chsplit[3]+" where AadharNumber="+chsplit[1];
                    con.query(query6, function (err, result, fields) {
                    if (err) throw err;

                    query7="insert into msg set ?";
                    var msg={FromUser:User.useraadhar,ToUser:chsplit[2],Description:"Transaction with ID="+chsplit[0]+" successful. Amount ="+chsplit[3]+" transferred to "+chsplit[5]} 
                    con.query(query7,msg ,function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    query8="insert into msg set ?";
                    var msg={FromUser:User.useraadhar,ToUser:chsplit[1],Description:"Transaction with ID="+chsplit[0]+" successful. Amount ="+chsplit[3]+" credited from "+chsplit[4]} 
                    con.query(query8,msg ,function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    
                    
                    });
                    
                    });
                    });
                    });

                    });

                  }
                    });

                    


                    });
        });
        

        
      }
res.render('../public/frontpagesa.ejs',{userid:User.userid,
    usertype:User.usertype }); 

    }
    else if(req.body.app=="Delete")
    {
     for (var i=0;i<req.body.checkboxreq.length;i++)
          {
            
var chsplit=req.body.checkboxreq[i].split(",");
            
                query="update transaction set Status=2 where ID="+chsplit[0]
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                    query2="delete from transactionreqsa  where TransactionID="+chsplit[0]
                        con.query(query2, function (err, result, fields) {
                        if (err) throw err;
                        
                        });
            });
            
            
          }
res.render('../public/frontpagesa.ejs',{userid:User.userid,
    usertype:User.usertype }); 

    }

  
});




router.post('/delusersendreqsa', function (req, res, next) {
  
  if(req.body.app=="Delete")
    {
     for (var i=0;i<req.body.checkboxreqre.length;i++)
          {
            

            
                    query="delete from regularemployee where ID="+req.body.checkboxreqre[i]
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                        
                        });
           
          }

          for (var i=0;i<req.body.checkboxreqsm.length;i++)
          {
            

            
                    query="delete from systemmanager where ID="+req.body.checkboxreqsm[i]
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                        
                        });
           
          }

          for (var i=0;i<req.body.checkboxreqiu.length;i++)
          {
            

            
                    query="delete from individualuser where ID="+req.body.checkboxreqiu[i]
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                        
                        });
           
          }

          for (var i=0;i<req.body.checkboxreqm.length;i++)
          {
            

            
                    query="delete from merchant where ID="+req.body.checkboxreqm[i]
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;
                        
                        });
           
          }

res.render('../public/frontpagesa.ejs',{ userid:User.userid,
    usertype:User.usertype}); 

          }
    
  
});

module.exports = router;
