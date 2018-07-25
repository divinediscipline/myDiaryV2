'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataEntries = require('../models/data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modifyEntry = function modifyEntry(req, res) {
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
};

exports.default = modifyEntry;
//# sourceMappingURL=modifyEntry.js.map