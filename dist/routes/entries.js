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

var _createEntry = require('../controllers/createEntry');

var _createEntry2 = _interopRequireDefault(_createEntry);

var _modifyEntry = require('../controllers/modifyEntry');

var _modifyEntry2 = _interopRequireDefault(_modifyEntry);

var _getEntries = require('../controllers/getEntries');

var _getEntries2 = _interopRequireDefault(_getEntries);

var _getEntry = require('../controllers/getEntry');

var _getEntry2 = _interopRequireDefault(_getEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//Api routes
router.post('/entries', _createEntry2.default);
router.put('/entries/:id', _modifyEntry2.default);
router.get('/entries', _getEntries2.default);
router.get('/entries/:id', _getEntry2.default);

exports.default = router;
//# sourceMappingURL=entries.js.map