import request from 'supertest';
import { expect } from 'chai';

import app from '../../../src/app';
// import entries from '../../../data/dataEntries';


describe('GET /api/v1/entries', () => {

  it('should get all diary entries', (done) => {
    request(app)
      .get('/api/v1/entries')
      .expect(200)
      .expect((res) => {
        expect(res.body.entries.length).to.equal(3);
      })
      .end(done);
  });
});
