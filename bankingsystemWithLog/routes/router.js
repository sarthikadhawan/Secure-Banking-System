var express = require('express');
var app=express();
var cookieParser = require('cookie-parser')

var router = express.Router();
var session = require('express-session');
var unique = require('array-unique');
//var User = require('../models/user');
var mysql = require('mysql');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var moment = require('moment');
var Regex = require("regex");
var bodyParser = require('body-parser');

var codee=0;
var url = require('url');

var uniqid = require('uniqid');
var userid=0;
var usertype="";
var code=uniqid();
let verifyToken = require('../routes/auth');
var redirect=null;
var userDataregister=null;
var userr=null;
var jwt  = require('jsonwebtoken');
var validator = require('validator');

var fs = require('fs');
var https = require('https');
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
var options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    ca: fs.readFileSync('ca-crt.pem')
};



app.set('superSecret', 'ilovescotchyscotch');
app.use(cookieParser());


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fcsgp6@gmail.com',// EMAILID=fcsgp6@gmail.com
    pass: 'fcs12345'//EMAILPASSWORD=fcs12345
  }
});



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "a",
  database: "bankingsystem"
});
con.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
});
var otpp=null;
router.get('/genotp', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/genotp'};
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

var token=uniqid();
var mailOptions = {
    from: 'fcsgp6@gmail.com',
    to:      req.session.email,
    subject: 'OTP',
    text: token}
otpp=token;
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
res.render('../public/otpcnf.ejs',{

 userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid

          });
          }

});

router.post('/otpcnfdone', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress){
      var values={IpAddress:req.connection.remoteAddress,Description:'/otpcnfdone'};
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
if(validator.isAlphanumeric(req.body.code)){
if(otpp=req.sanitize(req.body.code))
{
  con.query("update transaction set Status=0 where DebitAadharNo="+req.session.useraadhar+" and Status=4", function (err, result, fields) {
  if(err)
  {
    console.log(err);
  }
  if(req.session.usertype==4)
  res.render('../public/frontpageiu.ejs',{
       userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
});
else
{
  res.render('../public/frontpagem.ejs',{
       userid:req.session.userid,
    usertype:req.session.usertype,
sessionid:req.session.sessionid
});
}

  });
}
else
{

    con.query("update transaction set Status=2 where DebitAadharNo=? and Status=4 ",req.session.aadharnumber, function (err, result, fields) {
if(err)
  {
    console.log(err);
  }
 req.session.destroy(function(err) {
 res.render('../public/home.ejs',{


          });

});
});
}
}}
else
res.send("Something wrong entered or format not follwed or empty fields");

});



  router.get('/', function (req, res, next) {

  // req.session.userid=null;
//req.session.useraadhar=null;
 //req.session.sessionid=null;
//req.session.usertype=null;
//if(req.session.userid!=null)
//return res.redirect("/"+redirect);
//else
res.render('../public/home.ejs',{

          });


});

router.get('/resetpassword?*', function (req, res, next) {
var url_parts = url.parse(req.url, true);
var query = url_parts.query;
var token = req.query.token;

var query="select * from tokenforforgotpswd where token='"+token+"'";
con.query(query, function (err, result, fields) {
    if (err) throw err;
    if (result.length>0)
    {
            res.send("Token used");

    }
    else
    {
      token={token:token};
  query="insert into tokenforforgotpswd set ?"
  con.query(query,token ,function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
      res.redirect('https://192.168.2.142:80/resetpassword.html');
    }

  });

});

router.get('/entermailforgotpassword', function (req, res, next) {

res.render('../public/entermailforgotpassword.ejs',{

          });


});
var forgotpswdemail='';
router.post('/entermailforgotpassword', function (req, res, next) {
  var values={IpAddress:req.connection.remoteAddress,Description:'/entermailforgotpassword'};
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
forgotpswdemail=req.sanitize(req.body.forgotpswdemail);
var forgotpswdDOB=req.sanitize(req.body.forgotpswdDOB);

console.log(usertype);

var query=null;
var redirect="";
usertype=req.sanitize(req.body.usertype);
if(forgotpswdemail!=""&&forgotpswdDOB!=""&&usertype!=""&&validator.isNumeric(usertype.toString())){
  if(usertype==1)
      {query="select * from regularemployee  where Email='"+forgotpswdemail+"' and DOB='"+forgotpswdDOB+"'";
    redirect="frontpagere";}
  else if(usertype==2)
      {query="select * from systemmanager  where Email='"+forgotpswdemail+"' and DOB='"+forgotpswdDOB+"'";
redirect="frontpagesm";}
  else if(usertype==3)
      {query="select * from systemadmin  where Email='"+forgotpswdemail+"' and DOB='"+forgotpswdDOB+"'";
redirect="frontpagesa";}
else if(usertype==4)
      {query="select * from individualuser  where Email='"+forgotpswdemail+"' and DOB='"+forgotpswdDOB+"'";
redirect="frontpageiu";}
else if(usertype==5)
      {query="select * from merchant  where Email='"+forgotpswdemail+"' and DOB='"+forgotpswdDOB+"'";
redirect="frontpagem";}

con.query(query, function (err, result, fields) {
    if (err) throw err;
    if (result.length==0)
    {

      res.send("Wrong email or DOB or usertype");

    }
    else
    {
      var token=uniqid();
var mailOptions = {
    from: 'fcsgp6@gmail.com',
    to:      forgotpswdemail,
    subject: 'Reset Password',
    text: 'Link:https://192.168.2.142:80/resetpassword?token='+token
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

res.render('../public/home.ejs',{

          });
    }

  });

}
else
res.send("Something wrong entered or format not follwed or empty fields");
});

router.post('/resetpassword', function (req, res, next) {
  var values={IpAddress:req.connection.remoteAddress,Description:'/resetpassword'};
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

var forgotpswdpswd=req.sanitize(req.body.newpswd);
//usertype=req.body.hidden;
if(forgotpswdpswd!=""&&validator.isAlphanumeric(forgotpswdpswd.toString())){
 var query=null;

  if(usertype==1)
      {query="update regularemployee set Password='"+crypto.createHash('md5').update(forgotpswdpswd).digest("hex")+"' where Email='"+forgotpswdemail+"'";
    redirect="frontpagere";}
  else if(usertype==2)
     { query="update systemmanager set Password='"+crypto.createHash('md5').update(forgotpswdpswd).digest("hex")+"' where Email='"+forgotpswdemail+"'";
redirect="frontpagesm";}
  else if(usertype==3)
     { query="update systemadmin set Password='"+crypto.createHash('md5').update(forgotpswdpswd).digest("hex")+"' where Email='"+forgotpswdemail+"'";
redirect="frontpagesa";}
else if(usertype==4)
     { query="update individualuser set Password='"+crypto.createHash('md5').update(forgotpswdpswd).digest("hex")+"' where Email='"+forgotpswdemail+"'";
redirect="frontpageiu";}
else if(usertype==5)
     { query="update merchant set Password='"+crypto.createHash('md5').update(forgotpswdpswd).digest("hex")+"' where Email='"+forgotpswdemail+"'";
redirect="frontpagem";}

con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.render('../public/home.ejs',{

          });
  });
}
else
res.send("Something wrong entered or format not follwed or empty fields");
});

router.get('/login',  function (req, res, next) {
  var values={IpAddress:req.connection.remoteAddress,Description:'/login'};
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
  res.render('../public/login.ejs',{

          });
});

router.get('/register',  function (req, res, next) {
  var values={IpAddress:req.connection.remoteAddress,Description:'/register'};
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
  res.render('../public/register.ejs',{

          });
});


router.post('/login',  function (req, res, next) {
  var values={IpAddress:req.connection.remoteAddress,Description:'/loginPost'};
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


if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = "6Lda8S8UAAAAAEP3z69nbIPNaDhN__edqSFWjR5N";
  // req.connection.remoteAddress will provide IP address of connected user.
  //var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] ;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
   https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey+ "&response=" + req.body['g-recaptcha-response'], function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });
        });

  if (req.body.email&&req.body.password &&req.body.usertype&&validator.isNumeric(req.body.usertype.toString())&&validator.isAlphanumeric(req.body.password.toString())&&validator.isEmail(req.body.email.toString())) {

    var userData = {
      email: req.sanitize(req.body.email),

      password: req.sanitize(req.body.password),
      user:req.sanitize(req.body.usertype)

    }
//console.log(userData);  //data from login form

usertype=userData.user;
console.log(usertype);
if(usertype==0)
{res.send("Unknown user");
}
else{

  var query=null;

  if(userData.user==1)
      {query="SELECT * FROM regularemployee where Email='"+userData.email+"' and Password='"+crypto.createHash('md5').update(userData.password).digest("hex")+"'";
    redirect="frontpagere";}
  else if(userData.user==2)
     { query="SELECT * FROM systemmanager where Email='"+userData.email+"' and Password='"+crypto.createHash('md5').update(userData.password).digest("hex")+"'";
redirect="frontpagesm";}
  else if(userData.user==3)
    {query="SELECT * FROM systemadmin where Email='"+userData.email+"' and Password='"+crypto.createHash('md5').update(userData.password).digest("hex")+"'";

redirect="frontpagesa";}
else if(userData.user==4)
    {query="SELECT * FROM individualuser where Email='"+userData.email+"' and Password='"+crypto.createHash('md5').update(userData.password).digest("hex")+"'";

redirect="frontpageiu";}
else if(userData.user==5)
    {query="SELECT * FROM merchant where Email='"+userData.email+"' and Password='"+crypto.createHash('md5').update(userData.password).digest("hex")+"'";
redirect="frontpagem";}

  con.query(query, function (err, result, fields) {
    if (err) throw err;



    if (result.length==0)
    {

      res.send("Wrong credentials");

    }
    else{
    userid=result[0].ID;
var ff=0;
if(userData.user==1||userData.user==2)
{
  if(result[0].Status==0)
    {res.send("Request still pending");ff=1;}

  else if(result[0].Status==2)
    {res.send("Request rejected");ff=1;}

  else if(result[0].DelReq==1)
    {res.send("Account in process of deletion");ff=1;}
  else
  {
     const payload = {
      userid: result[0].ID,
      type:usertype
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
        });

console.log(token.userid);
    module.exports.userid=userid;
    module.exports.useraadhar=result[0].AadharNumber;
    req.session.userid = result[0].ID;
    req.session.useraadhar = result[0].AadharNumber;
        req.session.usertype = usertype;

    req.session.sessionid=uniqid();
    module.exports.sessionid=req.session.sessionid;
      req.session.ipadd=req.connection.remoteAddress;
      req.session.email= result[0].Email;
    return res.redirect("/"+redirect);
  }


}

if(userData.user==4||userData.user==5)
{
   if(result[0].DelReq==1)
    res.send("Account in process of deletion");
  else
  {
    const payload = {
      userid: result[0].ID,
      type:usertype
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
        });

    module.exports.userid=userid;
    module.exports.useraadhar=result[0].AadharNumber;
    req.session.userid = result[0].ID;
    req.session.useraadhar = result[0].AadharNumber;
    req.session.sessionid=uniqid();
   req.session.ipadd=req.connection.remoteAddress;
           req.session.usertype = usertype;

         req.session.email= result[0].Email;


    module.exports.sessionid=req.session.sessionid;


    return res.redirect("/"+redirect);
  }


}
if(ff==0){
const payload = {
      userid: result[0].ID,
      type:usertype
    };
        var token = jwt.sign(payload, app.get('superSecret'), {
        });


    module.exports.userid=userid;
    module.exports.useraadhar=result[0].AadharNumber;
    req.session.userid = result[0].ID;
    req.session.useraadhar = result[0].AadharNumber;
    req.session.sessionid=uniqid();
    module.exports.sessionid=req.session.sessionid;
          req.session.ipadd=req.connection.remoteAddress;
                req.session.email= result[0].Email;
                        req.session.usertype = usertype;





    return res.redirect("/"+redirect);
}
}
  });


    /*User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user)
      {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }
      else
       {
        req.session.userid = user._id;
        return res.redirect('/profile');
      }
    });*/
  }

}


else
res.send("Something wrong entered or format not follwed or empty fields");
});

router.all('/regcnf', function (req, res, next) {
  var values={IpAddress:req.connection.remoteAddress,Description:'/regcnf'};
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
res.render('../public/regcnf.ejs',{



          });
});

router.post('/regcnfdone', function (req, res, next) {
  var values={IpAddress:req.connection.remoteAddress,Description:'/regcnfdone'};
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
console.log(codee);
console.log(req.sanitize(req.body.code));

if(req.sanitize(req.body.code)==codee&&validator.isAlphanumeric(req.body.code.toString())){
  var userData=userDataregister;
  var user=userr;
  if(user==1)
      query="INSERT INTO regularemployee set ?";
  else if(user==2)
      query="INSERT INTO systemmanager set ? ";
else if(user==3)
    query="INSERT INTO  systemadmin set ?";
  else if(user==4)
    query="INSERT INTO  individualuser set ?";

  else if(user==5)
    query="INSERT INTO  merchant set ?";

var useridforregrequests=0;
con.query(query,userData ,function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    useridforregrequests=result.insertId;


var usertype=userr;
var userData2 = {
      Name:userData.Name,
      Email: userData.Email,

      Password: userData.Password,
      DOB:userData.DOB,
      PhoneNumber:userData.PhoneNumber,
      Gender:userData.Gender,
      AadharNumber:userData.AadharNumber,
      PANNumber:userData.PANNumber,
      Nationality:userData.Nationality,
      UserID:result.insertId,
      type:0


    }

var query2=null;
if(user==1)
      query2="INSERT INTO regrequests set ? ";
  else if(user==2)
      query2="INSERT INTO  regrequests set ? ";

if(user==1||user==2){
con.query(query2,userData2 ,function (err, result) {
    if (err) throw err;

var query3=null;
    query3="Update regrequests set type="+usertype+" where ID="+result.insertId;
console.log(usertype);
    con.query(query3,function (err, result) {
    if (err) throw err;
console.log(usertype);

    console.log("1 record inserted");




     return res.redirect("/");

  });



  });
}
else
{ res.redirect("/");}
});
}
else
{res.send("Something wrong entered or format not follwed or empty fields");


}
});



router.post('/register', function (req, res, next) {

  function sha1(msg)
{
  function rotl(n,s) { return n<<s|n>>>32-s; };
  function tohex(i) { for(var h="", s=28;;s-=4) { h+=(i>>>s&0xf).toString(16); if(!s) return h; } };
  var H0=0x67452301, H1=0xEFCDAB89, H2=0x98BADCFE, H3=0x10325476, H4=0xC3D2E1F0, M=0x0ffffffff;
  var i, t, W=new Array(80), ml=msg.length, wa=new Array();
  msg += String.fromCharCode(0x80);
  while(msg.length%4) msg+=String.fromCharCode(0);
  for(i=0;i<msg.length;i+=4) wa.push(msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3));
  while(wa.length%16!=14) wa.push(0);
  wa.push(ml>>>29),wa.push((ml<<3)&M);
  for( var bo=0;bo<wa.length;bo+=16 ) {
    for(i=0;i<16;i++) W[i]=wa[bo+i];
    for(i=16;i<=79;i++) W[i]=rotl(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
    var A=H0, B=H1, C=H2, D=H3, E=H4;
    for(i=0 ;i<=19;i++) t=(rotl(A,5)+(B&C|~B&D)+E+W[i]+0x5A827999)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=20;i<=39;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=40;i<=59;i++) t=(rotl(A,5)+(B&C|B&D|C&D)+E+W[i]+0x8F1BBCDC)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=60;i<=79;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    H0=H0+A&M;H1=H1+B&M;H2=H2+C&M;H3=H3+D&M;H4=H4+E&M;
  }
  return tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4);
}


  var values={IpAddress:req.connection.remoteAddress,Description:'/registerPost'};
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



 if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
  }
  // Put your secret key here.
  var secretKey = "6Lda8S8UAAAAAEP3z69nbIPNaDhN__edqSFWjR5N";
  // req.connection.remoteAddress will provide IP address of connected user.
  //var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] ;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
   https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey+ "&response=" + req.body['g-recaptcha-response'], function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });

        });

console.log(req.body.aadharnumber.length);
 //insert in db
 //if(regex.test(req.body.name)&&regex.test(req.body.DOB)&&regex.test(req.body.mobile)&&regex.test(req.body.gender)&regex.test(req.body.aadharnumber)&&regex.test(req.body.pannumber)&&regex.test(req.body.nationality) )
if(req.body.name&&req.body.email&&req.body.password&&req.body.dob&&req.body.mobile&&req.body.gender&&req.body.aadharnumber&&req.body.pannumber&&req.body.nationality&&req.body.np.length>7&&req.body.np.length<16&&sha1(req.body.np.toString())==req.body.password.toString()
&&req.body.mobile.length==10&&req.body.aadharnumber.length<=16&&req.body.pannumber.length<=10&&validator.isAlpha(req.body.name.toString())&&validator.isEmail(req.body.email.toString())&&validator.isAlphanumeric(req.body.password.toString())&&validator.toDate(req.body.dob.toString())&&validator.isNumeric(req.body.mobile.toString())&&validator.isAlpha(req.body.gender.toString())
&&validator.isAlphanumeric(req.body.pannumber.toString())&&validator.isNumeric(req.body.aadharnumber.toString())&&validator.isAlpha(req.body.nationality.toString())  ){
 userData = {
      Name:req.sanitize(req.body.name),
      Email:req.sanitize( req.body.email),

      Password: crypto.createHash('md5').update(req.sanitize(req.body.password)).digest("hex"),
      DOB:req.sanitize(req.body.dob),
      PhoneNumber:req.sanitize(req.body.mobile),
      Gender:req.sanitize(req.body.gender),
      AadharNumber:req.sanitize(req.body.aadharnumber),
      PANNumber:req.sanitize(req.body.pannumber),
      Nationality:req.sanitize(req.body.nationality)

    }
    userDataregister=userData;


   // console.log(userData);  //data from register form
    var query=null;
    var user=req.sanitize(req.body.usertype);
    userr=user;
    if(user==0)
{res.send("Unknown user");
}
else{

    usertype=user;

    if(user==1)
      query="select * from regularemployee where Email='"+userData.Email+"' or AadharNumber="+userData.AadharNumber;
  else if(user==2)
      query="select * from systemmanager where Email='"+userData.Email+"' or AadharNumber="+userData.AadharNumber;
else if(user==3)
      query="select * from systemadmin where Email='"+userData.Email+"' or AadharNumber="+userData.AadharNumber;
  else if(user==4)
      query="select * from individualuser where Email='"+userData.Email+"' or AadharNumber="+userData.AadharNumber;
  else if(user==5)
      query="select * from merchant where Email='"+userData.Email+"' or AadharNumber="+userData.AadharNumber;

var f=0;
con.query(query ,function (err, result) {
    if (err) throw err;
if (result.length>0)
{
  res.send("Email or Aadhar taken");
  f=1;
}



else
{
  var mailOptions = {
    from: 'fcsgp6@gmail.com',
    to:  userData.Email,
    subject: 'Code to confirm registration',
    text: 'Code: '+code
  };
codee=code;
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


    return res.redirect("/regcnf");

}
/*User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userid = user._id;
        return res.redirect('/');
      }
    });*/

});
}



//else
//return res.send("Invalid input. Only characters and numbers accepted");
}
else
res.send("Something wrong entered or format not follwed or empty fields");
});




//frontpage re

router.all('/frontpagere', function (req, res, next) {
  if(req.session.ipadd==req.connection.remoteAddress&&req.session.usertype==1){
  res.render('../public/frontpagere.ejs',{
userid:req.session.userid,
    usertype:usertype,
    sessionid:req.session.sessionid,
    useraadhar:req.session.useraadhar
          }); }
});
//frontpage  sm

router.all('/frontpagesm', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress&&req.session.usertype==2){

  res.render('../public/frontpagesm.ejs',{
userid:req.session.userid,
    usertype:usertype,
    sessionid:req.session.sessionid,
    useraadhar:req.session.useraadhar
          }); }
});
//frontpage sa


router.all('/frontpagesa',function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress&&req.session.usertype==3){

  res.render('../public/frontpagesa.ejs',{
    userid:req.session.userid,
    usertype:usertype,
    sessionid:req.session.sessionid,
    useraadhar:req.session.useraadhar
          });
}
});
//frontpage iu

router.all('/frontpageiu', function (req, res, next) {
  console.log(req.session.ipadd);
  console.log(req.connection.remoteAddress);
    if(req.session.ipadd==req.connection.remoteAddress&&req.session.usertype==4){

  res.render('../public/frontpageiu.ejs',{
userid:req.session.userid,
    usertype:usertype,
    sessionid:req.session.sessionid,
    useraadhar:req.session.useraadhar
          });
}
});
//frontpage m

router.all('/frontpagem', function (req, res, next) {
    if(req.session.ipadd==req.connection.remoteAddress&&req.session.usertype==5){

  res.render('../public/frontpagem.ejs',{
   userid:req.session.userid,
    usertype:usertype,
    sessionid:req.session.sessionid,
    useraadhar:req.session.useraadhar
          });
}


});
module.exports = router;
