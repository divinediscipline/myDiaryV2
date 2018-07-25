import request from 'supertest';
import { expect } from 'chai';


import app from '../../../routes/src/app';
import entries from '../../../models/data/dataEntries';


describe('/GET an entry', () => {

  it('should return 404 if id is not a number', (done) => {
    request(app)
      .get('/api/v1/entries/abcd')
      .expect(404)
      .end(done);
  });

  it('should return 404 if entry is not found', (done) => {
    request(app)
      .get('/api/v1/entries/10')
      .expect(404)
      .end(done);
  });

  it('should return a diary entry', (done) => {
    request(app)
      .get('/api/v1/entries/2')
      .expect(200)
      .expect((res) => {
        expect(res.body.foundEntry).to.deep.equal(entries[1]);
      })
      .end(done);
  });
});
