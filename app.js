const express    = require('express');		// call express
const app        = express(); 				// define our app using express
const bodyParser = require('body-parser'); 	// get body-parser
const morgan     = require('morgan'); 		// used to see requests
const mongoose   = require('mongoose');
const config 	   = require('./config/config');
const path 	     = require('path');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(morgan('dev'));

mongoose.connect(config.database);

app.use(express.static(__dirname + '/view'));
//routes
const apiRoutes = require('./app/routes/api')(app,express);

app.use('/api', apiRoutes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/view/index.html')));

app.listen(config.port);

console.log('Magic happens on port ' + config.port);
