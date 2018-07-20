import request from 'supertest';
import { expect } from 'chai';

import app from '../../../src/app';
import entries from '../../../data/dataEntries';
// import { error } from 'util';

beforeEach((done) => {
  entries.length = 0;
  done();
});

describe('/POST', () => {
  it('should create a new entry', (done) => {
    const testEntry = {
      title: 'Work on monday',
      description: 'is an audio or visual form of marketing communication that employs an openly.',
    };

    request(app)
      .post('/api/v1/entries')
      .send({
        title: 'Work on monday',
        description: 'is an audio or visual form of marketing communication that employs an openly.',
      })
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
        // console.log('******** for res.body.newEntry');
        // console.log(res.body.newEntry);
      });

    entries.push(testEntry);
    // console.log('******** for entries');
    // console.log(entries);

    expect(entries.length).to.equal(1);
    expect(entries[0].title).to.deep.equal(testEntry.title);
    expect(entries[0].description).to.deep.equal(testEntry.description);
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

    expect(entries.length).to.equal(0);
    done();
  });
});
