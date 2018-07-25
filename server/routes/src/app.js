import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';


// load routes
import entries from '../entries';


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



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

export default app;
