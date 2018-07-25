import request from 'supertest';
import { expect } from 'chai';


import app from '../../../routes/src/app';


describe('/PUT modify an entry', () => {
  const testEntry = {
    entryId: '1',
    title: 'Upated test title',
    description: 'Updated test description',
    createdAt: '5555555',
  };
  it('should modify a diary entry', (done) => {

    request(app)
      .put('/api/v1/entries/1')
      .send(testEntry)
      .expect(200)
      .expect((res) => {
        expect(res.body.modifiedEntry).to.deep.equal(testEntry);
      })
      .end(done);
  });

  it('should return 404 if entry is not found', (done) => {
    request(app)
      .put('/api/v1/entries/10')
      .send(testEntry)
      .expect(404)
      .end(done);
  });

  it('should return 400 if incomplete diary entry is sent', (done) => {
    const incompleteEntry = {
      entryId: '1',
      description: 'Updated test description',
      createdAt: '5555555',
    };
    request(app)
      .put('/api/v1/entries/1')
      .send(incompleteEntry)
      .expect(400)
      .end(done);
  });
});
