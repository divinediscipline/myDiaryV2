'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataEntries = require('../models/data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEntry = function getEntry(req, res) {
  var id = req.params.id;

  if (typeof Number(id) === 'number') {
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
};

exports.default = getEntry;
//# sourceMappingURL=getEntry.js.map