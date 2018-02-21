var framework = require('../framework/framework.js');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'a',
  database : 'bankingsystem'
});
var validator = require('validator');


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
function showError(res){
  framework.renderPage(res, "error", { "message" : "Error" ,"sessionid":req.session.sessionid,"userid":req.session.userid});
}
function chceckAmountAndUpdateTransaction(body,req,res) {

  var values = [parseInt(req.sanitize(body.debitAccount))];
  var aadhar=[req.session.useraadhar];
  console.log(aadhar);
  connection.query('select ID from account where AadharNumber =?',aadhar, function(err1, rows1, fields1){
          if(err1){ framework.renderPage(res, "error", { "message" : "You did not have account" });}
          var test=0;
          console.log(rows1.length);
          for(var i=0;i<rows1.length;i++){

            if(req.sanitize(req.body.debitAccount)==rows1[i].ID){
              test=1
            }
          }
          if(test==0){
                    console.log(err1);
                    framework.renderPage(res, "error", { "message" : "I know you will test this" });
          }
          else{
                    connection.query('select * from account where ID =?',values, function(err, rows, fields) {
                      if (!err){
                        if(rows<=0){
                             showError(res);
                        }
                        if(parseInt(req.sanitize(body.amount)) <= rows[0].Balance){
                          createTransactionSuccess(body,req,res);
                        }else{
                          framework.renderPage(res, "error", { "message" : "Insufficient balance" });
                        }
                    }
                      else{

                        console.log("Error in check balance");
                        console.log('Error while performing Query.' + err);
                        framework.renderPage(res, "error", { "message" : "Error" });
                      }
                      });
                    }
            });
    }

function createTransaction(req, res) {
  console.log(req.body.debitAadharNo.length);
  if(validator.isNumeric(req.body.creditAccount.toString()) && validator.isNumeric(req.body.debitAccount.toString()) && validator.isNumeric(req.body.creditAadharNo.toString()) && validator.isNumeric(req.body.debitAadharNo.toString()) && validator.isNumeric(req.body.amount.toString()) && req.body.creditAadharNo.length==16
  && req.body.debitAadharNo.length==16){
  var Logvalues={Description:'/transactionsiu',IpAddress:req.session.ipadd};
  makeLog(Logvalues);
  console.log("request body : " + JSON.stringify(req.body));
  var body = req.body;
  chceckAmountAndUpdateTransaction(body,req,res);
}
else{
  framework.renderPage(res, "error", { "message" : "Invalid Inputs" });
}

}

function createTransactionSuccess(body,req,res){
  var values = [req.sanitize(body.amount),req.sanitize(body.debitAadharNo),req.sanitize(body.debitAccount),req.sanitize(body.creditAadharNo),req.sanitize(body.creditAccount),0];
  connection.query('insert into merchantemployees(Amount, EmployeeAadhar,EmployeeAccountNo,MerchantAadharNo,MerchantAccountNo,Verified) values(?,?,?,?,?,?)',values, function(err, rows, fields) {
    if (!err){

      res.render('../public/frontpageiu.ejs',{userid:req.session.userid,
         usertype:req.session.usertype,
         sessionid:req.session.sessionid,
         useraadhar:req.session.useraadhar});
  }
    else{

      console.log("Error in createTransactionSuccess");
      console.log('Error while performing Query.' + err);
      framework.renderPage(res, "error", { "message" : "Error" });
    }
    });

}

function addRequest(tableName, transactionID,req,res){
  values = [transactionID];
  connection.query('insert into '+tableName +'(transactionID) values(?)',values, function(err, rows, fields) {
    if (!err){

        console.log("succefully inserted entry into " + tableName + " table");
        res.redirect('/genotp');
        // res.render('../public/frontpageiu.ejs',{userid:req.session.userid,
        // usertype:req.session.usertype,
        // sessionid:req.session.sessionid,
        // useraadhar:req.session.useraadhar});

  }
    else{
      console.log("Error in Add request");
      console.log('Error while performing Query.' + err);
      framework.renderPage(res, "error", { "message" : "Error" });

    }
    });
}

function makeLog(Logvalues) {
  var values=Logvalues;


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
}

exports.makeLog=makeLog
exports.createTransaction=createTransaction;
