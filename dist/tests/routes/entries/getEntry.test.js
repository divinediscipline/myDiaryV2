'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../routes/src/app');

var _app2 = _interopRequireDefault(_app);

var _dataEntries = require('../../../models/data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('/GET an entry', function () {

  it('should return 404 if id is not a number', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/entries/abcd').expect(404).end(done);
  });

  it('should return 404 if entry is not found', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/entries/10').expect(404).end(done);
  });

  it('should return a diary entry', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/entries/2').expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.foundEntry).to.deep.equal(_dataEntries2.default[1]);
    }).end(done);
  });
});
//# sourceMappingURL=getEntry.test.js.map