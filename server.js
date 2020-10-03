'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');

var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');

var ConvertHandler = require('./controllers/convertHandler.js');
var convertHandler = new ConvertHandler();


var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.route('/api/convert')
  .get((req, res) => {
    return res.json({
      initNum: convertHandler.getNum(req.query.input),
      initUnit: convertHandler.getUnit(req.query.input),
      returnNum: convertHandler.convert(
        convertHandler.getNum(req.query.input),
        convertHandler.getUnit(req.query.input)
      ),
      returnUnit: convertHandler.getReturnUnit(
        convertHandler.getUnit(req.query.input)
      ),
      string: convertHandler.getString(
        convertHandler.getNum(req.query.input),
        convertHandler.getUnit(req.query.input),convertHandler.convert(
          convertHandler.getNum(req.query.input),
          convertHandler.getUnit(req.query.input)
        ),
        convertHandler.getReturnUnit(
          convertHandler.getUnit(req.query.input)
        )
      )
    });
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
