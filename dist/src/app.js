'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

var dummyData = [{
  entryId: '8356954a-9a42-4616-8079-887a734',
  title: 'Work on monday',
  description: 'is an audio or visual form of marketing communication that employs an openly sponsored, non-personal message to promote or sell a product, service or idea.[1]:465 Sponsors of advertising are typically businesses wishing to promote their products or services. Advertising is differentiated from public relations in that an advertiser pays for and has control over the message. It differs from personal selling in that the message is non-personal, i.e., not directed to a particular.',
  createdAt: 20180506143490000,
  updatedAt: 20180506143490000
}, {
  entryId: '8356954a-9a42-4616-8079-734',
  title: 'Work on Tuesday',
  description: 'In ancient China, the earliest advertising known was oral, as recorded in the Classic of Poetry (11th to 7th centuries BC) of bamboo flutes played to sell confectionery. Advertisement usually takes in the form of calligraphic signboards and inked papers. A copper printing plate dated back to the Song dynasty used to print posters in the form of a square sheet of paper with a rabbit logo with Jinan Lius Fine Needle Shop" and "We buy high-quality steel rods and make fine-quality needles, to be ready for use at home in no time" written above and below[11] is considered the worlds earliest identified printed advertising medium',
  createdAt: 20180506143490000,
  updatedAt: 20180506143490000
}];

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

app.get('/api/v1/entries', function (req, res) {
  res.send(dummyData);
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', function (req, res) {
  return res.status(200).json({
    message: 'This is the myDiary API, you seem to be lost, check your url properly'
  });
});

var port = parseInt(process.env.PORT, 10) || 8000;

app.listen(port, function () {
  console.log('app started on port ' + port);
});

// export default app;
//# sourceMappingURL=app.js.map