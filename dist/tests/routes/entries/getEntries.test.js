'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../routes/src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('/GET all entries', function () {

  it('should get all diary entries', function (done) {
    (0, _supertest2.default)(_app2.default).get('/api/v1/entries').expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.entries.length).to.equal(3);
    }).end(done);
  });
});
//# sourceMappingURL=getEntries.test.js.map