
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
    console.log(err);
    console.log("Error connecting database ... nn");
}
});



function getRequests(req, res) {
	console.log("id : " + JSON.stringify(req.params.id));
	var id = req.session.userid;
  console.log(id)
		var values = [id];
	connection.query('SELECT * from authtransaction where OfUserAadhar = ? and Verified= 0',req.session.useraadhar, function(err, rows, fields) {
	  if (!err){
	    console.log('The solution is: '+JSON.stringify(rows));
      console.log(values);
      	framework.renderPage(res, "requests", { "dataTableHeaders" : rows });


	}
	  else{
	    console.log('Error while performing Query.' + err);

		}
	  });
}
function acceptRequest(req,res){
  updateStatus(req.session.userid,0,res);
}


function rejectRequest(req,res){
  updateStatus(req.session.userid,2,res);
}


function updateStatus(id, status,res) {
  console.log(status);
  var values=[status,id]
	connection.query('UPDATE autherizereq SET status=? where ID=?',values, function(err, rows, fields) {
	  if (!err){
        console.log(rows);
	}
	  else{
	    console.log('Error while performing Query.' + err);
	}
  res.end();
	  });


}

exports.getRequests=getRequests;
exports.acceptRequest=acceptRequest;
exports.rejectRequest=rejectRequest;
