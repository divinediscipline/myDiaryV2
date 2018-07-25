import request from 'supertest';
import { expect } from 'chai';

import app from '../../../routes/src/app';
import entries from '../../../models/data/dataEntries';

describe('/POST create an entry', () => {
  it('should create a new entry', (done) => {
    const testEntry = {
      entryId: '3',
      title: 'Test title',
      description: 'This is a test description',
      createdAt: '20180506143490000',
    };

    request(app)
      .post('/api/v1/entries')
      .send(testEntry)
      .expect(201)
      .expect((res) => {
        expect(res.body.newEntry.entryId).to.deep.equal(testEntry.entryId);
        expect(res.body.newEntry.title).to.deep.equal(testEntry.title);
        expect(res.body.newEntry.description).to.deep.equal(testEntry.description);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      });
    done();
  });


  it('should not create a diary entry with invalid data', (done) => {
    request(app)
      .post('/api/v1/entries')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      });
    expect(entries.length).to.equal(3);
    done();
  });
});
