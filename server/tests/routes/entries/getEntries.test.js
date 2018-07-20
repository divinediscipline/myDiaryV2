import request from 'supertest';
import { expect } from 'chai';

import app from '../../../src/app';
import entries from '../../../data/dataEntries';

const testEntry = {
  title: 'Work on friday',
  description: 'just left home by 8am to look for electricity so I can code. I hope I will be able to finish and submit. Still writing auto tests.',
};


describe('GET /api/v1/entries', () => {

  it('should get all diary entries', (done) => {
    request(app)
      .get('/api/v1/entries')
      .expect(200)
      .expect((res) => {
        expect(res.body.entries.length).to.equal(4);
      })
      .end(done);
  });
});
