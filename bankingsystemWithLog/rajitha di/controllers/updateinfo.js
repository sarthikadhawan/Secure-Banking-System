/** Transactions **/

var framework = require('../framework/framework.js');
var session = require('express-session');

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

function updateEmail(req, res) {
  var body=req.body;
  if(body.newEmail.length>0){
  newEmail=req.sanitize(req.sanitize(req.body.newEmail));
  userid=req.sanitize(req.session.userid);
  var values=[newEmail,userid];
  console.log(newEmail);
  console.log(userid);
  console.log(body);
	connection.query('UPDATE individualuser SET Nationality=? where ID=?',values, function(err, rows, fields) {
	  if (!err){
        console.log(rows);
        res.render('../public/frontpageiu.ejs',{userid:req.session.userid,
        usertype:req.session.usertype,
        sessionid:req.session.sessionid,
        useraadhar:req.session.useraadhar});


	}
	  else{
	    console.log('Error while performing Query.' + err);
	}
	  });
  }
  else{
    framework.renderPage(res, "error", { "message" : "Internal Error" });
  }
}
function updatePwd(req, res) {
  var body=req.body;
  if(body.newPwd.length>0){
  var values=[req.sanitize(body.newPwd),req.session.userid];
  console.log(body);
	connection.query('UPDATE individualuser SET Password=? where ID=?',values, function(err, rows, fields) {
	  if (!err){
        console.log(rows);
        res.render('../public/frontpageiu.ejs',{userid:req.session.userid,
        usertype:req.session.usertype,
        sessionid:req.session.sessionid,
        useraadhar:req.session.useraadhar});

	}
	  else{
	    console.log('Error while performing Query.' + err);
	}
	  });
  }
  else{
      framework.renderPage(res, "error", { "message" : "Internal Error" });
  }
}
function updatePhno(req, res) {
  var body=req.body;
  if(body.newPhno.length>0){
  var values=[req.sanitize(body.newPhno),req.session.userid];
  console.log(body);
	connection.query('UPDATE individualuser SET PhoneNumber=? where ID=?',values, function(err, rows, fields) {
	  if (!err){
        console.log(rows);
        res.render('../public/frontpageiu.ejs',{userid:req.session.userid,
        usertype:req.session.usertype,
        sessionid:req.session.sessionid,
        useraadhar:req.session.useraadhar});

	}
	  else{
	    console.log('Error while performing Query.' + err);
	}
	  });
  }
  else{
    framework.renderPage(res, "error", { "message" : "Internal Error" });
  }
}
function updateAddr(req, res) {
  var body=req.body;
    if(body.newAddr.length>0){
  var values=[req.sanitize(body.newAddr),req.session.userid];
  console.log(body);
	connection.query('UPDATE individualuser SET Address=? where ID=?',values, function(err, rows, fields) {
	  if (!err){
        console.log(rows);

        res.render('../public/frontpageiu.ejs',{userid:req.session.userid,
        usertype:req.session.usertype,
        sessionid:req.session.sessionid,
        useraadhar:req.session.useraadhar});


	}
	  else{
	    console.log('Error while performing Query.' + err);
	}
	  });
  }
  else{
    framework.renderPage(res, "error", { "message" : "Internal Error" });
  }
}

function getAccountBalance(req, res) {
  var num = req.query.id;
	connection.query('SELECT Balance from account where ID=?',num, function(err, rows, fields) {
	  if (!err){
        console.log(rows);

        res.render('../public/frontpageiu.ejs',{userid:req.session.userid,
        usertype:req.session.usertype,
        sessionid:req.session.sessionid,
        useraadhar:req.session.useraadhar});

	}
	  else{
	    console.log('Error while performing Query.' + err);
	}
	  });
}


exports.updateEmail=updateEmail
exports.updatePwd=updatePwd
exports.updatePhno=updatePhno
exports.updateAddr=updateAddr
exports.getAccountBalance=getAccountBalance
