import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const entries = [
  {
    entryId: 1,
    title: 'Work on monday',
    description: 'is an audio or visual form of marketing communication that employs an openly sponsored, non-personal message to promote or sell a product, service or idea.[1]:465 Sponsors of advertising are typically businesses wishing to promote their products or services. Advertising is differentiated from public relations in that an advertiser pays for and has control over the message. It differs from personal selling in that the message is non-personal, i.e., not directed to a particular.',
    createdAt: 20180506143490000,
    updatedAt: 20180506143490000,
  },
  {
    entryId: 2,
    title: 'Work on Tuesday',
    description: 'In ancient China, the earliest advertising known was oral, as recorded in the Classic of Poetry (11th to 7th centuries BC) of bamboo flutes played to sell confectionery. Advertisement usually takes in the form of calligraphic signboards and inked papers. A copper printing plate dated back to the Song dynasty used to print posters in the form of a square sheet of paper with a rabbit logo with Jinan Lius Fine Needle Shop" and "We buy high-quality steel rods and make fine-quality needles, to be ready for use at home in no time" written above and below[11] is considered the worlds earliest identified printed advertising medium',
    createdAt: 20180506143490000,
    updatedAt: 20180506143490000,
  },

];

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the myDiary API',
  v1: '/api/v1',
}));

app.get('/v1', (req, res) => res.status(200).json({
  message: 'Welcome to version 1 of the myDiary API',
}));

// Get all entries
app.get('/api/v1/entries', (req, res) => {
  res.send(
    {
      entries,
    },
  );
});

// Get single entry
app.get('/api/v1/entries/:id', (req, res) => {
  let id = req.params.id;

  const foundEntry = entries.find((entry) => {
    return entry.entryId == id;
  });

  if (foundEntry) {
    res.send(
      {
        foundEntry,
      },
    );
  } else {
    res.status(404).send();
  }
});

// Create an entry
app.post('/api/v1/entries', (req, res) => {
  if (req.body.title && req.body.description) {
    res.send(
      {
        newEntry: {
          title: req.body.title,
          description: req.body.description,
        },
      },
    );
  } else {
    res.status(400).send();
  }
});


// const port = parseInt(process.env.PORT, 10) || 8000;
const port = 8000;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});


// export default app;
