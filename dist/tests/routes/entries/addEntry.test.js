'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

var _dataEntries = require('../../../data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('POST /api/v1/entries', function () {
  it('should create a new entry', function (done) {
    var testEntry = {
      title: 'Work on sunday',
      description: 'is an audio or visual form of marketing communication that employs an openly.'
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/entries').send(testEntry).expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.newEntry).to.include({ entryId: 3 });
      (0, _chai.expect)(res.body.newEntry.title).to.deep.equal(testEntry.title);
      (0, _chai.expect)(res.body.newEntry.description).to.deep.equal(testEntry.description);
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }
    });

    _dataEntries2.default.push(testEntry);

    (0, _chai.expect)(_dataEntries2.default.length).to.equal(3);
    done();
  });

  it('should not create a diary entry with invalid data', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/entries').send().expect(400).end(function (err, res) {
      if (err) {
        return done(err);
      }
    });

    (0, _chai.expect)(_dataEntries2.default.length).to.equal(4);
    done();
  });
});
//# sourceMappingURL=addEntry.test.js.map