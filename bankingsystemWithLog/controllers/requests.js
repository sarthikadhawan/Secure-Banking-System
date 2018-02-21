
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
    console.log(err);
    console.log("Error connecting database ... nn");
}
});



function getRequests(req, res) {
  var Logvalues={Description:'/requestsiu',IpAddress:req.session.ipadd};
  makeLog(Logvalues);
//	console.log("id : " + JSON.stringify(req.params.id));
	var id = req.session.userid;
  console.log(id)
		var values = [id];
	connection.query('SELECT * from authtransaction where OfUserAadhar = '+req.session.useraadhar+' and Verified= 0',function(err, rows, fields) {
	  if (!err){
	    console.log('The solution is: '+JSON.stringify(rows));
      console.log(values);
      	framework.renderPage(res, "requests", { "dataTableHeaders" : rows,sessionid:req.session.sessionid,userid:req.session.userid });


	}
	  else{
	    console.log('Error while performing Query.' + err);

		}
	  });
}
function acceptRequest(req,res){
  updateStatus(req.session.userid,1,res);
}


function rejectRequest(req,res){
  updateStatus(req.session.userid,2,res);
}


function updateStatus(id, status,res) {
  console.log(status);
  var values=[status,id]
	connection.query('UPDATE authtransaction SET Verified=? where ID=?',values, function(err, rows, fields) {
	  if (!err){
        console.log(rows);
	}
	  else{
	    console.log('Error while performing Query.' + err);
	}
  res.end();
	  });


}
function makeLog(Logvalues) {
  var values=Logvalues;
  console.log("hererer");
  console.log(Logvalues);

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

exports.getRequests=getRequests;
exports.acceptRequest=acceptRequest;
exports.rejectRequest=rejectRequest;
