var framework = require('../framework/framework.js');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'a',
  database : 'bankingsystem'
});


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});
function showError(res){
  framework.renderPage(res, "error", { "message" : "Error" });
}
function chceckAmountAndUpdateTransaction(body,req,res) {

  var values = [parseInt(req.sanitize(body.debitAccount))];

  connection.query('select * from account where ID =?',values, function(err, rows, fields) {
    if (!err){
      if(rows<=0){
           showError(res);
      }
      if(parseInt(req.sanitize(body.amount)) < rows[0].Balance){
        createTransactionSuccess(body,res);
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

function createTransaction(req, res) {
  console.log("request body : " + JSON.stringify(req.body));
  var body = req.body;
  chceckAmountAndUpdateTransaction(body,req,res);

}

function createTransactionSuccess(body,req,res){
  var values = [req.sanitize(body.creditAccount),req.sanitize(body.debitAccount),req.sanitize(body.creditAadharNo),req.sanitize(body.debitAadharNo),req.sanitize(body.amount),0];
  connection.query('insert into transaction(CreditAccount, DebitAccount, CreditAadharNo, DebitAadharNo, Amount, Status) values(?,?,?,?,?,?)',values, function(err, rows, fields) {
    if (!err){
      console.log('The solution is: '+JSON.stringify(rows));
      console.log('is id ' + rows.insertId);
      if(req.sanitize(body.amount) < 25000){
          addRequest("transactionreqre",rows.insertId,res);
      }else if(req.sanitize(body.amount) >= 25000 && req.sanitize(body.amount) < 50000){
            addRequest("transactionreqsa",rows.insertId,res);
      }else if(req.sanitize(body.amount) >= 50000){
            addRequest("transactionreqsm",rows.insertId,res);
      }
  }
    else{

      console.log("Error in createTransactionSuccess");
      console.log('Error while performing Query.' + err);
      framework.renderPage(res, "error", { "message" : "Error" });
    }
    });
    res.end();
}

function addRequest(tableName, transactionID,req,res){
  values = [transactionID];
  connection.query('insert into '+tableName +'(transactionID) values(?)',values, function(err, rows, fields) {
    if (!err){

        console.log("succefully inserted entry into " + tableName + " table");
        res.render('../public/frontpageiu.ejs',{userid:req.session.userid,
        usertype:req.session.usertype,
        sessionid:req.session.sessionid,
        useraadhar:req.session.useraadhar});

  }
    else{
      console.log("Error in Add request");
      console.log('Error while performing Query.' + err);
      framework.renderPage(res, "error", { "message" : "Error" });

    }
    });
}




exports.createTransaction=createTransaction;