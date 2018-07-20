'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

var _dataEntries = require('../../../data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { error } from 'util';

beforeEach(function (done) {
  _dataEntries2.default.length = 0;
  done();
});

describe('/POST', function () {
  it('should create a new entry', function (done) {
    var testEntry = {
      title: 'Work on monday',
      description: 'is an audio or visual form of marketing communication that employs an openly.'
    };

    (0, _supertest2.default)(_app2.default).post('/api/v1/entries').send({
      title: 'Work on monday',
      description: 'is an audio or visual form of marketing communication that employs an openly.'
    }).expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.newEntry).to.include({ entryId: 3 });
      (0, _chai.expect)(res.body.newEntry.title).to.deep.equal(testEntry.title);
      (0, _chai.expect)(res.body.newEntry.description).to.deep.equal(testEntry.description);
    }).end(function (err, res) {
      if (err) {
        return done(err);
      }
      // console.log('******** for res.body.newEntry');
      // console.log(res.body.newEntry);
    });

    _dataEntries2.default.push(testEntry);
    // console.log('******** for entries');
    // console.log(entries);

    (0, _chai.expect)(_dataEntries2.default.length).to.equal(1);
    (0, _chai.expect)(_dataEntries2.default[0].title).to.deep.equal(testEntry.title);
    (0, _chai.expect)(_dataEntries2.default[0].description).to.deep.equal(testEntry.description);
    done();
  });

  it('should not create a diary entry with invalid data', function (done) {
    (0, _supertest2.default)(_app2.default).post('/api/v1/entries').send().expect(400).end(function (err, res) {
      if (err) {
        return done(err);
      }
    });

    (0, _chai.expect)(_dataEntries2.default.length).to.equal(0);
    done();
  });
});
//# sourceMappingURL=addEntry.test.js.map