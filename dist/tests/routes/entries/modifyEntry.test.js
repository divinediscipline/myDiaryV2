'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _app = require('../../../routes/src/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('/PUT modify an entry', function () {
  var testEntry = {
    entryId: '1',
    title: 'Upated test title',
    description: 'Updated test description',
    createdAt: '5555555'
  };
  it('should modify a diary entry', function (done) {

    (0, _supertest2.default)(_app2.default).put('/api/v1/entries/1').send(testEntry).expect(200).expect(function (res) {
      (0, _chai.expect)(res.body.modifiedEntry).to.deep.equal(testEntry);
    }).end(done);
  });

  it('should return 404 if entry is not found', function (done) {
    (0, _supertest2.default)(_app2.default).put('/api/v1/entries/10').send(testEntry).expect(404).end(done);
  });

  it('should return 400 if incomplete diary entry is sent', function (done) {
    var incompleteEntry = {
      entryId: '1',
      description: 'Updated test description',
      createdAt: '5555555'
    };
    (0, _supertest2.default)(_app2.default).put('/api/v1/entries/1').send(incompleteEntry).expect(400).end(done);
  });
});
//# sourceMappingURL=modifyEntry.test.js.map