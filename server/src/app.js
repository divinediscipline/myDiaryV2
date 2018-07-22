import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import entries from '../data/dataEntries';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
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
  res.status(200).json(
    {
      entries,
    },
  );
});

// Get single entry
app.get('/api/v1/entries/:id', (req, res) => {
  const { id } = req.params;
  if (typeof (Number(id)) === 'number') {
    console.log('*****id');
    console.log(typeof (id));
    const foundEntry = entries.find((entry) => {
      return entry.entryId == id;
    });

    if (foundEntry) {
      res.json(
        {
          foundEntry,
        },
      );
    } else {
      res.status(404).json();
    }
  } else {
    res.status(404).json();
  }
});

// Create an entry
app.post('/api/v1/entries', (req, res) => {
  if (req.body.title && req.body.description && req.body.entryId && req.body.createdAt) {
    entries.push({
      entryId: req.body.entryId,
      title: req.body.title,
      description: req.body.description,
      createdAt: req.body.createdAt,
    });
    res.status(201).json(
      {
        newEntry: {
          entryId: req.body.entryId,
          title: req.body.title,
          description: req.body.description,
          createdAt: req.body.createdAt,
        },
      },
    );
  } else {
    res.status(400).send();
  }
});


// Modify an entry
app.put('/api/v1/entries/:id', (req, res) => {
  if (req.body.title && req.body.description && req.body.entryId && req.body.createdAt) {
    const { id } = req.params;

    const foundEntry = entries.find((entry) => {
      return entry.entryId == id;
    });

    if (foundEntry) {
      res.json(
        {
          modifiedEntry: {
            entryId: req.body.entryId,
            title: req.body.title,
            description: req.body.description,
            createdAt: req.body.createdAt,
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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

export default app;
