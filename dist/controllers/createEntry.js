'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataEntries = require('../models/data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEntry = function createEntry(req, res) {
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
};

exports.default = createEntry;
//# sourceMappingURL=createEntry.js.map