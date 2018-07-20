import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import entries from '../data/dataEntries';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
  const { id } = req.params;

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
    entries.push({
      entryId: 3,
      title: req.body.title,
      description: req.body.description,
      createdAt: 20180506143490000,
      updatedAt: 20180506143490000,
    });
    res.send(
      {
        newEntry: {
          entryId: 3,
          title: req.body.title,
          description: req.body.description,
          createdAt: 20180506143490000,
          updatedAt: 20180506143490000,
        },
      },
    );
  } else {
    res.status(400).send();
  }
});


// Modify an entry
app.put('/api/v1/entries/:id', (req, res) => {
  if (req.body.title && req.body.description) {
    const { id } = req.params;

    const foundEntry = entries.find((entry) => {
      return entry.entryId == id;
    });

    if (foundEntry) {
      res.send(
        {
          modifiedEntry: {
            entryId: id,
            title: req.body.title,
            description: req.body.description,
            createdAt: 20180506143490000,
            updatedAt: 20180506143490000,
          },
        },
      );
    } else {
      res.status(404).send();
    }
  } else {
    res.status(400).send();
  }
});


// const port = parseInt(process.env.PORT, 10) || 8000;
const port = 8000;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});

export default app;
