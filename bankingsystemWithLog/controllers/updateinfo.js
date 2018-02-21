/** Transactions **/
var crypto = require('crypto');

var framework = require('../framework/framework.js');
var session = require('express-session');
var validator = require('validator');

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
  var Logvalues={Description:'/uemail',IpAddress:req.session.ipadd};
  makeLog(Logvalues);
  var body=req.body;
  if(body.newEmail.length>0 && validator.isAlpha(req.body.newEmail.toString())){
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
  var Logvalues={Description:'/upwd',IpAddress:req.session.ipadd};
  makeLog(Logvalues);
  var body=req.body;
  if(body.newPwd.length>0 && validator.isAlphanumeric(req.body.newPwd.toString())){
  var values=[crypto.createHash('md5').update(req.sanitize(body.newPwd)).digest("hex"),req.session.userid];
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
  if(body.newPhno.length>0 && validator.isNumeric(req.body.newPhno.toString())){
  var values=[body.newPhno,req.session.userid];
  console.log(body);
  var Logvalues={Description:'/uphno',IpAddress:req.session.ipadd};
  makeLog(Logvalues);
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
  var Logvalues={Description:'/uaddr',IpAddress:req.session.ipadd};
  makeLog(Logvalues);
  var body=req.body;
    if(body.newAddr.length>0 && validator.isAlphanumeric(req.body.newAddr.toString())){
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
exports.updateEmail=updateEmail
exports.updatePwd=updatePwd
exports.updatePhno=updatePhno
exports.updateAddr=updateAddr
exports.getAccountBalance=getAccountBalance
