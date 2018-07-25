'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _entries = require('../entries');

var _entries2 = _interopRequireDefault(_entries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Log requests to the console.


// load routes
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data and use loaded routes 
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/api/v1', _entries2.default);

app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Welcome to the myDiary API',
    v1: '/api/v1'
  });
});

app.get('/v1', function (req, res) {
  return res.status(200).json({
    message: 'Welcome to version 1 of the myDiary API'
  });
});

var PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log('app started on port ' + PORT);
});

exports.default = app;
//# sourceMappingURL=app.js.map