'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../src/app');

var _app2 = _interopRequireDefault(_app);

var _dataEntries = require('../../../data/dataEntries');

var _dataEntries2 = _interopRequireDefault(_dataEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testEntry = {
  title: 'Work on friday',
  description: 'just left home by 8am to look for electricity so I can code. I hope I will be able to finish and submit. Still writing auto tests.'
};

describe('GET /api/v1/entries', function () {

  it('should get all diary entries', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/entries').expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.entries.length).to.equal(4);
    }).end(done);
  });
});
//# sourceMappingURL=getEntries.test.js.map