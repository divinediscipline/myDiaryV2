'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataEntries = require('../models/data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEntries = function getEntries(req, res) {
  res.status(200).json({
    entries: _dataEntries2.default
  });
};

exports.default = getEntries;
//# sourceMappingURL=getEntries.js.map