var express 	= require('express');
var app 	= express();
var mongoose 	= require('mongoose');
var database 	= require('./config/database');
var morgan 	= require('morgan');
var bodyParser	= require('body-parser');
var methodOverride = require('method-override');
require('./models/Restaurants');

mongoose.connect(database.localURL);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

require('./routes/index.js')(app);

app.listen(8080);
console.log("App listening on port 8080");
