var express=require('express');
var app=express();
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var randomstring = require("randomstring");
 var expressSanitizer = require('express-sanitizer');
app.use(expressSanitizer());  
var fs = require('fs');
var csrf=require('csurf');



/*PDFDocument = require ('pdfkit');
doc = new PDFDocument();
doc.pipe( fs.createWriteStream('output.pdf'));
doc.text('Some text with an embedded font!', 100, 100)
doc.end()*/



/*var docDefinition = {
  content: [
    // if you don't need styles, you can use a simple string to define a paragraph
    'This is a standard paragraph, using default style',
 
    // using a { text: '...' } object lets you set styling properties
    { text: 'This paragraph will have a bigger font', fontSize: 15 },
 
    // if you set the value of text to an array instead of a string, you'll be able
    // to style any part individually
    {
      text: [
        'This paragraph is defined as an array of elements to make it possible to ',
        { text: 'restyle part of it and make it bigger ', fontSize: 15 },
        'than the rest.'
      ]
    }
  ]
};
pdfMake.createPdf(docDefinition).download();
*/

//var passport = require("../routes/auth")();  

//app.use(passport.initialize()); 

// get an instance of the router for api routes
/*var apiRoutes = express.Router(); 
app.set('superSecret', 'ilovescotchyscotch');
apiRoutes.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});
app.use('/', apiRoutes);
*/



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

module.exports = function (app){



var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',//MYSQLUSERNAME =root
    password: 'a',//MYSQLPASSWORD= fcsprojectgroup6
    database: 'bankingsystem'//MYSQLDB
};

var sessionStore = new MySQLStore(options);
 
app.use(session({
    key: 'session_cookie_name',// SESSIONKEY=fcsprojectgroup6
    secret:randomstring.generate(),//SESSIONSECRET=fcsprojectgroup6secret
    cookie:{maxAge:1800000},
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));


/*connect to MongoDB
mongoose.connect('mongodb://localhost/testForAuth');
var db = mongoose.connection;
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
*/
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(csrf());



/*app.use( function( req, res, next ) {
  var token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  res.locals.csrftoken = req.csrfToken() ;
  next() ;
} ) ;

*/


// serve static files from template

// include routes
var routes = require('./../routes/router');
app.use('/', routes);

var routes = require('./../routes/systemadmin');
app.use('/', routes);

var routes = require('./../routes/sm');
app.use('/', routes);


var routes = require('./../routes/re');
app.use('/', routes);

var routes = require('./../routes/mrouter');
app.use('/', routes);




require(__dirname + './../routes.js')(app);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 400);
  res.send(err.message);
});


}
