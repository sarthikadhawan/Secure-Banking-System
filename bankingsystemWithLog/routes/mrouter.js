var express = require('express');
var router = express.Router();
var session = require('express-session');
var unique = require('array-unique');
var mysql = require('mysql');
var crypto = require('crypto');
var uniqid = require('uniqid');
var moment = require('moment');
var User = require('../routes/router');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
let verifyToken = require('../routes/auth');
var pdf = require('html-pdf');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var expressSanitizer = require('express-sanitizer');
var bodyParser = require('body-parser');
var PDFDocument = require('pdfkit');
var validator = require('validator');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());

//2147483647

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a",
  database: "bankingsystem"
});

router.get('/', function (req, res, next) {
res.render('../public/frontpagem.ejs',{
 userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });
});

router.get('/createaccountejs', function (req, res, next) {

res.render('../public/createaccount.ejs',{
userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });


});

router.get('/newtransactionejs', function (req, res, next) {

res.render('../public/newtransaction.ejs',{
userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });


});


router.get('/creditmoneyejs', function (req, res, next) {

res.render('../public/creditmoney.ejs',{
userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });


});

router.get('/debitmoneyejs', function (req, res, next) {

res.render('../public/debitmoney.ejs',{
userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });


});


router.get('/create_account', function (req, res, next) {

  var values={IpAddress:req.connection.remoteAddress,Description:'/create_accountGET'};

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
  res.render('../public/createaccount.ejs',{userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});



});

router.post('/create_account', function (req, res, next) {

   if(req.session.ipadd==req.connection.remoteAddress){

 var values={IpAddress:req.connection.remoteAddress,Description:'/create_accountPOST'};
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
 if(req.sanitize(req.body.accounttype)!="" && req.sanitize(req.body.balance)!="" && validator.isNumeric(req.body.balance.toString()) && validator.isAlpha(req.body.accounttype.toString()) && req.body.accounttype.length>0 && req.body.accounttype.length<=20 && req.body.balance>=1000 && req.body.balance<=200000)
 {
  var query=null;
  var acctype = req.sanitize(req.body.accounttype);
  var amt = req.sanitize(req.body.balance);
  var id=req.session.userid;
  var aadhar=req.session.useraadhar;

var Timestmp = moment(Date.now()).format('YYYY-MM-DD');
//console.log(Timestmp);
var accData = {
   Type:req.session.userid,
   AadharNumber:req.session.useraadhar,
       Balance:amt,
    OpeningDate:Timestmp,
    }

query="INSERT INTO accountreq set ?";

con.query(query,accData ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");

});
}
res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
}
});


router.get('/download_statements', function (req, res, next) {

  res.render('../public/downloadstatementsm.ejs',{
      userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
    


});

router.post('/download_statements', function (req, res, next) {
var values={IpAddress:req.connection.remoteAddress,Description:'/download_statements'};
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

  });;

    var aadhar=req.session.useraadhar;
  if(req.sanitize(req.body.transactionid)!="" && validator.isNumeric(req.body.transactionid.toString()) && req.body.transactionid<=2147483645)
  {
    var query="SELECT * FROM transaction WHERE ID="+mysql.escape(req.sanitize(req.body.transactionid))+" AND (DebitAadharNo="+mysql.escape(aadhar)+" OR CreditAadharNo="+mysql.escape(aadhar)+");";
     console.log(query);
    var requests=null;
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        requests=result;
        console.log(requests);
     if (result.length==0)
         {
            res.send("You dont have any transactions as of now ");
         }
      else
    {
      doc = new PDFDocument();
      var heading=" BANKING STATEMENT ";
      var a="Transaction ID : " + result[0].ID.toString()+"\n";
      var b="Debit Account Number : " + result[0].DebitAccount.toString()+"\n";
      var c="Credit Account Number: "+result[0].CreditAccount.toString()+"\n";
      var d="Debit Aadhar Number : "+ result[0].DebitAadharNo.toString()+"\n";
      var e="Credit Aadhar Number :" +result[0].CreditAadharNo.toString()+"\n";
      var f="Amount : "+result[0].Amount.toString()+"\n";
      var g="Timestamp : "+result[0].Timestamp.toString()+"\n";
      var h="Verification Status :"+result[0].Status.toString()+"\n";
  doc.pipe(fs.createWriteStream("./public/statement.pdf"));
      doc.text(heading);
      doc.moveDown(1);
      doc.moveDown(1);
      doc.text(a);
      doc.moveDown(1);
      doc.text(b);
      doc.moveDown(1);
      doc.text(c);
      doc.moveDown(1);
      doc.text(d);
      doc.moveDown(1);
      doc.text(e);
      doc.moveDown(1);
      doc.text(f);
      doc.moveDown(1);
      doc.text(g);
      doc.moveDown(1);
      doc.text(h);
      doc.moveDown(1);
      doc.end();
      doc.pipe(res);
      //res.download(doc);
        //res.download("./public/statement.pdf");

    }

         /*res.render('../public/frontpagem.ejs',{
      requests:requests,
         userid:req.session.userid});*/
    });
}
  else
    res.send("You did not enter a valid Transaction Id. You need to log in again");

});


router.get('/view_transactions', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/view_transactions'};
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
    var query="SELECT * FROM transaction where DebitAadharNo="+mysql.escape(aadhar)+" OR CreditAadharNo="+mysql.escape(aadhar)+";";
     //console.log(query);
    var requests=null;
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        requests=result;
        //console.log(requests);
     if (result.length==0)
         {
            res.send("You dont have any transactions as of now ");
         }
else{
        res.render('../public/transaction.ejs',{
      requests:requests,
          userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});}
    });
}
});

router.get('/view_msg', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/view_msg'};
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

var aadhar=req.session.useraadhar;
    var query="SELECT Description FROM msg Where FromUser="+mysql.escape(aadhar)+" OR ToUser="+mysql.escape(aadhar)+";";
    // console.log(query);
    var requests=null;
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        requests=result;
        //console.log(requests);
     if (result.length==0)
         {
             res.render('../public/error.ejs',{  userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
         }
else{
        res.render('../public/msg.ejs',{
      requests:requests,
          userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});}
    });

  });
    
  }

});

router.get('/get_info', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/get_info'};
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
    var id=req.session.userid;
    var query="SELECT * FROM merchant where ID="+mysql.escape(id)+";";
     //console.log(query);
    var requests=null;
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        requests=result;
        //console.log(requests);

        res.render('../public/viewinfo.ejs',{
      requests:requests,
          userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
    });
}
});



router.all('/modify_details', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){
     var values={IpAddress:req.connection.remoteAddress,Description:'/modify_details'};
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


res.render('../public/modifym.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});}
});

router.post('/modify_phone', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/modify_phone'};
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
var id=req.session.userid;
var aadhar=req.session.useraadhar;

if (req.sanitize(req.body.phone)!="" && validator.isNumeric(req.body.phone.toString()) && req.body.phone.length>10)
{
  con.query("UPDATE merchant SET PhoneNumber ='"+req.sanitize(req.body.phone)+"' WHERE ID = "+mysql.escape(id)+" AND AadharNumber="+mysql.escape(aadhar), function (err, result, fields) {
    if (err) throw err;  });}

res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
}

});

router.post('/modify_address', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/modify_address'};
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
var id=req.session.userid;
var aadhar=req.session.useraadhar;

if (req.sanitize(req.body.address)!="" && validator.isAlphanumeric(req.sanitize(req.body.address.toString())) && req.body.address.length<=20)
{
  con.query("UPDATE merchant SET Address='"+req.sanitize(req.body.address)+"' WHERE ID="+mysql.escape(id)+" AND AadharNumber="+mysql.escape(aadhar), function (err, result, fields) {
    if (err) throw err;  });}

res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});}
});

router.post('/modify_nationality', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/modify_nationality'};
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
var id=req.session.userid;
var aadhar=req.session.useraadhar;

if (req.sanitize(req.body.nationality)!="" && validator.isAlpha(req.sanitize(req.body.nationality.toString())) && req.body.nationality.length<=10)
{
  con.query("UPDATE merchant SET Nationality='"+req.sanitize(req.body.nationality)+"' WHERE ID="+mysql.escape(id)+" AND AadharNumber="+mysql.escape(aadhar), function (err, result, fields) {
    if (err) throw err;  });}

res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});}
});


router.post('/modify_password', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/modify_password'};
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
var id=req.session.userid;
var aadhar=req.session.useraadhar;

if (req.sanitize(req.body.newpassword)!="" && validator.isAlphanumeric(req.sanitize(req.body.newpassword.toString())) && req.body.newpassword.length>7 && req.body.newpassword.length<16 )
{
  queryold="SELECT Password FROM merchant Where AadharNumber="+mysql.escape(aadhar)+";";


  con.query(queryold, function (err, result, fields){
    if (err)
    console.log(err);  
if(req.sanitize(req.body.newpassword)!="")
{
con.query("UPDATE merchant SET Password= '"+crypto.createHash('md5').update(req.sanitize(req.body.newpassword)).digest("hex")+"' WHERE ID = "+mysql.escape(id)+" AND AadharNumber="+mysql.escape(aadhar), function (err, result, fields) {
    if (err) throw err;  });

}
/*else
{
  res.send("You entered wrong password. Login again");
}*/
        });
}
/*else
{
  res.send("error");
}*/
  }
  res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
});

router.get('/authorize_requests',function(req,res){
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/authorize_requestsGET'};
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
  var aadhar= req.session.useraadhar;
  query="SELECT * FROM authtransaction where OfUserAadhar="+mysql.escape(aadhar);
  con.query(query, function (err, result, fields){
    if (err)
    console.log(err);
    res.render('../public/authorizereqm.ejs',{
        requests:result,
       userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });
    });}
  });


router.post('/authorize_requests', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/authorize_requestsPOST'};
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
  if (req.sanitize(req.body.app=="Approve"))
  {

      for (var i=0;i<req.sanitize(req.body.checkboxreq).length;i++)
      {

var chsplit=req.sanitize(req.body.checkboxreq[i]).split(",");

                query="update authtransaction set Verified=1 where ID="+chsplit[0];
                con.query(query, function (err, result, fields) {
                    if (err) throw err;

        });



      }
res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid });

    }
    else if(req.sanitize(req.body.app)=="Reject")
    {
     for (var i=0;i<req.sanitize(req.body.checkboxreq).length;i++)
          {

var chsplit=req.sanitize(req.body.checkboxreq[i]).split(",");

                query="update authtransaction set Verified=2 where ID="+chsplit[0];
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;

            });


          }
res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid });

    }
}

});

router.get('/submit_payments',function(req,res){
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/submit_payments'};
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
  var aadhar= req.session.useraadhar;
  query="SELECT * FROM merchantemployees WHERE MerchantAadharNo="+mysql.escape(aadhar)+" AND Verified=0;";
  con.query(query, function (err, result, fields){
    if (err)
    console.log(err);
    res.render('../public/submitpaymentsm.ejs',{
        requests:result,
       userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
          });
    });}
  });

router.post('/submit_payments', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/submit_payments'};
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
  if (req.sanitize(req.body.app)=="Approve")
  {
  //console.log("checkbox length");
  //console.log(req.sanitize(req.body.hidden));
      for (var i=0;i<req.sanitize(req.body.hidden);i++)
      {

if(req.body.hidden==1){
        var chsplit=req.body.checkboxreq.split(",");
      }
      else{
      var chsplit=req.body.checkboxreq[i].split(",");
    }

                query="update merchantemployees set Verified=1 where ID="+chsplit[0];
                con.query(query, function (err, result, fields) {
                    if (err) throw err;

                    var st =4;
                    var Timestmp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                    //console.log(Timestmp);
                    var transData = {                          DebitAccount:req.sanitize(chsplit[2]),                          CreditAccount:req.sanitize(chsplit[1]),                          DebitAadharNo:req.sanitize(chsplit[3]),
CreditAadharNo:req.session.useraadhar,
Amount:req.sanitize(chsplit[4]),
Timestamp:Timestmp,
Status:st
   }
//console.log(chsplit);
 querynew="INSERT INTO transaction set ?";
//console.log("Bye");
con.query(querynew,transData ,function (err, result) {
    if (err) throw err;
   // console.log("1 record inserted");

querynew1="SELECT ID FROM transaction WHERE CreditAadharNo="+mysql.escape(req.session.useraadhar)+" AND Timestamp="+mysql.escape(Timestmp)+" AND Status=4;";
//console.log("HII");
//console.log(querynew1);
con.query(querynew1,transData ,function (err, resul) {
    if (err) throw err;
    //console.log("ID fetched");

//console.log(resul[0].ID);
var data = {
   TransactionID:resul[0].ID
           }
var amt=req.sanitize(chsplit[4]);
if(amt<20000)
{
  query2="INSERT INTO transactionreqre set ?";
  con.query(query2,data ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
  });
}
else if(amt>=20000 && amt<50000)
{
  query3="INSERT INTO transactionreqsm set ?";
  con.query(query3,data ,function (err, result) {
    if (err) throw err;
   // console.log("1 record inserted");
  });
}
else if(amt>=50000)
{
  query4="INSERT INTO transactionreqsa set ?";
  con.query(query4,data ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
  });
}

});
});

        });

      }
res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid });

    }
    else if(req.sanitize(req.body.app)=="Reject")
    {
     for (var i=0;i<req.sanitize(req.body.checkboxreq).length;i++)
          {

var chsplit=req.sanitize(req.body.checkboxreq[i]).split(",");

                query="update merchantemployees set Verified=2 where ID="+chsplit[0];
                    con.query(query, function (err, result, fields) {
                        if (err) throw err;

            });


          }
res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid });

    }
}
});

router.post('/credit_money', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/credit_money'};
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

querycheck="SELECT ID FROM account WHERE AadharNumber="+mysql.escape(req.session.useraadhar)+";";
var check =0;

con.query(querycheck, function (err, result, fields) {
        if (err) throw err;

  for(var z=0;z<result.length;z++)
{
  //console.log(req.sanitize(req.body.accountnumber));
  //console.log(result[z].ID);
  if(req.sanitize(req.body.accountnumber)==result[z].ID &&  validator.isNumeric(req.sanitize(req.body.accountnumber.toString())) && req.body.accountnumber.length<=10)
  {
    check =1;
    break;
  }
}

if(req.sanitize(req.body.amount)>0 && check>0 && validator.isNumeric(req.sanitize(req.body.amount.toString())) && req.body.amount<=10000)
  {
  var amt = req.sanitize(req.body.amount);
  var id=req.session.userid;
  var aadhar=req.session.useraadhar;

var st =4;
var temp=-1;
var Timestmp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
//console.log(Timestmp);
var transData = {
   DebitAccount:temp,
   CreditAccount:req.sanitize(req.body.accountnumber),
       DebitAadharNo:temp,
       CreditAadharNo:req.session.useraadhar,
    Amount:amt,
    Timestamp:Timestmp,
    Status:st
    }

query="INSERT INTO transaction set ?";

con.query(query,transData ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");

query1="SELECT ID FROM transaction WHERE CreditAadharNo="+mysql.escape(aadhar)+" AND Timestamp="+mysql.escape(Timestmp);
//console.log("HII");
con.query(query1,transData ,function (err, result) {
    if (err) throw err;
   // console.log("ID fetched");

//console.log(resul[0].ID);
var data = {
   TransactionID:resul[0].ID
           }

if(amt<20000)
{
  query2="INSERT INTO transactionreqre set ?";
  con.query(query2,data ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
  });
}
else if(amt>=20000 && amt<50000)
{
  query3="INSERT INTO transactionreqsm set ?";
  con.query(query3,data ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
  });
}
else if(amt>=50000)
{
  query4="INSERT INTO transactionreqsa set ?";
  con.query(query4,data ,function (err, result) {
    if (err) throw err;
   // console.log("1 record inserted");
  });
}

res.redirect('/genotp');
});
});
}
else
{
  res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
}

       });
}

});

router.post('/debit_money', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/debit_money'};
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
  var amt = req.sanitize(req.body.amount);
  var id=req.session.userid;
  var aadhar=req.session.useraadhar;
querycheck="SELECT ID FROM account WHERE AadharNumber="+mysql.escape(req.session.useraadhar)+";";
var check =0;

con.query(querycheck, function (err, result, fields) {
        if (err) throw err;
     //console.log(result.length);
     for(var z=0;z<result.length;z++)
    {
  //console.log(req.sanitize(req.body.accountnumber));
  //console.log(result[z].ID);
  if(req.sanitize(req.body.accountnumber)==result[z].ID &&  validator.isNumeric(req.sanitize(req.body.accountnumber.toString())) && req.body.accountnumber.length<=10)
  {
    check =1;
    break;
  }
    }
   //console.log("I am here");
//console.log(check);
if(amt!="" && amt>0 && check>0 && validator.isNumeric(req.sanitize(req.body.amount.toString())) && req.body.amount<=10000)
{
//console.log("Yoo");
var st =4;
var temp=-1;
var Timestmp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
//console.log(Timestmp);
var transData = {
   DebitAccount:req.sanitize(req.body.accountnumber),
   CreditAccount:temp,
       DebitAadharNo:req.session.useraadhar,
       CreditAadharNo:temp,
    Amount:amt,
    Timestamp:Timestmp,
    Status:st
    }

query="INSERT INTO transaction set ?";

con.query(query,transData ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");

query1="SELECT ID FROM transaction WHERE DebitAadharNo="+mysql.escape(aadhar)+" AND Timestamp="+mysql.escape(Timestmp);
//console.log("HII");
con.query(query1,transData ,function (err, resul) {
    if (err) throw err;
   // console.log("ID fetched");

//console.log(resul[0].ID);
var data = {
   TransactionID:resul[0].ID
           }

if(amt<20000)
{
  query2="INSERT INTO transactionreqre set ?";
  con.query(query2,data ,function (err, result) {
    if (err) throw err;
   // console.log("1 record inserted");
  });
}
else if(amt>=20000 && amt<50000)
{
  query3="INSERT INTO transactionreqsm set ?";
  con.query(query3,data ,function (err, result) {
    if (err) throw err;
   // console.log("1 record inserted");
  });
}
else if(amt>=50000)
{
  query4="INSERT INTO transactionreqsa set ?";
  con.query(query4,data ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
  });
}

//res.render('../public/frontpagem.ejs');
res.redirect('/genotp');
});
});
}
else
{
res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
}

       });
}
});



router.post('/transfer_money', function (req, res, next) {
   if(req.session.ipadd==req.connection.remoteAddress){

var values={IpAddress:req.connection.remoteAddress,Description:'/transfer_money'};
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
  var amt = req.sanitize(req.body.amount);
  var id=req.session.userid;
  var aadhar=req.session.useraadhar;
querycheck="SELECT ID FROM account WHERE AadharNumber="+mysql.escape(req.session.useraadhar)+";";
var check1 =0;
var check2 =0;

con.query(querycheck, function (err, result, fields) {
        if (err) throw err;

  for(var z=0;z<result.length;z++)
{
  if(req.sanitize(req.body.myaccountnumber)==result[z].ID &&  validator.isNumeric(req.sanitize(req.body.myaccountnumber.toString()))&& req.body.myaccountnumber.length<=10)
  {
    check1 =1;
    querychecker="SELECT ID FROM account WHERE    AadharNumber="+mysql.escape(req.sanitize(req.body.accountaadhar))+";";
    con.query(querychecker, function (err, results, fields)     {
        if (err) throw err;
      //console.log(results.length);
      //console.log("length");
      for(var m=0;m<results.length;m++)
{
  //console.log(req.sanitize(req.body.accountnumber));
  //console.log(results[m].ID);
  if(req.sanitize(req.body.accountnumber)==results[m].ID && validator.isNumeric(req.sanitize(req.body.accountnumber.toString())) && req.body.accountnumber.length<=10)
  {
    check2 =1;
    //console.log("Checks");
//console.log(check1);
//console.log(check2);
if(amt!="" && amt>0 && check1>0 && check2>0 && validator.isNumeric(req.sanitize(req.body.amount.toString())) && req.body.amount<=500000)
{
var st =4;
var Timestmp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
//console.log(Timestmp);
var transData = {
   DebitAccount:req.session.userid,
   CreditAccount:req.sanitize(req.body.accountnumber),
       DebitAadharNo:req.session.useraadhar,
       CreditAadharNo:req.sanitize(req.body.accountaadhar),
    Amount:amt,
    Timestamp:Timestmp,
    Status:st
    }

query="INSERT INTO transaction set ?";

con.query(query,transData ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");

query1="SELECT ID FROM transaction WHERE DebitAadharNo="+mysql.escape(aadhar)+" AND Timestamp="+mysql.escape(Timestmp);
//console.log("HII");
con.query(query1,transData ,function (err, resul) {
    if (err) throw err;
    //console.log("ID fetched");

//console.log(resul[0].ID);
var data = {
   TransactionID:resul[0].ID
           }

if(amt<20000)
{
  query2="INSERT INTO transactionreqre set ?";
  con.query(query2,data ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
  });
}
else if(amt>=20000 && amt<50000)
{
  query3="INSERT INTO transactionreqsm set ?";
  con.query(query3,data ,function (err, result) {
    if (err) throw err;
   // console.log("1 record inserted");
  });
}
else if(amt>=50000)
{
  query4="INSERT INTO transactionreqsa set ?";
  con.query(query4,data ,function (err, result) {
    if (err) throw err;
    //console.log("1 record inserted");
  });
}

res.redirect('/genotp');
});
});
}
else
{
res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
}
break;
  }

}
res.render('../public/frontpagem.ejs',{ userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid});
     });

    break;
  }
}

       });
}
});


router.get('/logoutm', function (req, res, next) {


 if(req.session.ipadd==req.connection.remoteAddress){
  var values={IpAddress:req.connection.remoteAddress,Description:'/logoutm'};
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