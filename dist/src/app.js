'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _dataEntries = require('../data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

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

// Get all entries
app.get('/api/v1/entries', function (req, res) {
  res.status(200).json({
    entries: _dataEntries2.default
  });
});

// Get single entry
app.get('/api/v1/entries/:id', function (req, res) {
  var id = req.params.id;

  if (typeof Number(id) === 'number') {
    console.log('*****id');
    console.log(typeof id === 'undefined' ? 'undefined' : _typeof(id));
    var foundEntry = _dataEntries2.default.find(function (entry) {
      return entry.entryId == id;
    });

    if (foundEntry) {
      res.json({
        foundEntry: foundEntry
      });
    } else {
      res.status(404).json();
    }
  } else {
    res.status(404).json();
  }
});

// Create an entry
app.post('/api/v1/entries', function (req, res) {
  if (req.body.title && req.body.description && req.body.entryId && req.body.createdAt) {
    _dataEntries2.default.push({
      entryId: req.body.entryId,
      title: req.body.title,
      description: req.body.description,
      createdAt: req.body.createdAt
    });
    res.status(201).json({
      newEntry: {
        entryId: req.body.entryId,
        title: req.body.title,
        description: req.body.description,
        createdAt: req.body.createdAt
      }
    });
  } else {
    res.status(400).send();
  }
});

// Modify an entry
app.put('/api/v1/entries/:id', function (req, res) {
  if (req.body.title && req.body.description && req.body.entryId && req.body.createdAt) {
    var id = req.params.id;


    var foundEntry = _dataEntries2.default.find(function (entry) {
      return entry.entryId == id;
    });

    if (foundEntry) {
      res.json({
        modifiedEntry: {
          entryId: req.body.entryId,
          title: req.body.title,
          description: req.body.description,
          createdAt: req.body.createdAt
        }
      });
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
});

var PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log('app started on port ' + PORT);
});

exports.default = app;
//# sourceMappingURL=app.js.map