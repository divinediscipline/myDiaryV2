import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// load routes
import entries from '../entries';

const { Client } = require('pg');

dotenv.config();

// Set up the express app
const app = express();


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data and use loaded routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', entries);


app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the myDiary API',
  v1: '/api/v1',
}));

app.get('/v1', (req, res) => res.status(200).json({
  message: 'Welcome to version 1 of the myDiary API',
}));


// trying to input data into postgres database
app.post('/test', (req, res) => {
  console.log('Post body', req.body);

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'diary_entries',
    password: 'phoenix123',
    port: 5432,
  });
  client.connect()
    .then(() => {
      console.log('connection complete');
      // const sql = 'INSERT INTO users (firstName, lastName) VALUES ( $1, $2)';
      // const params = ['aaaa', 'bbbb'];
      // return client.query(sql, params);
    });
  //   .then((result) => {
  //     console.log('result?', result);
  //   })
  //   .catch((err) => {
  //     console.log('err', err);
  //   });
  // res.send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

export default app;
