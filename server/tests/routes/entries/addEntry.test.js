import request from 'supertest';
import { expect } from 'chai';

import app from '../../../src/app';
import entries from '../../../data/dataEntries';

describe('POST /api/v1/entries', () => {
  it('should create a new entry', (done) => {
    const testEntry = {
      title: 'Work on sunday',
      description: 'is an audio or visual form of marketing communication that employs an openly.',
    };

    request(app)
      .post('/api/v1/entries')
      .send(testEntry)
      .expect(200)
      .expect((res) => {
        expect(res.body.newEntry).to.include({ entryId: 3 });
        expect(res.body.newEntry.title).to.deep.equal(testEntry.title);
        expect(res.body.newEntry.description).to.deep.equal(testEntry.description);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        
      });

    entries.push(testEntry);
    

    expect(entries.length).to.equal(3);
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

    expect(entries.length).to.equal(4);
    done();
  });
});
