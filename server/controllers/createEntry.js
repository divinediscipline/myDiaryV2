import entries from '../models/data/dataEntries';

const createEntry = (req, res) => {
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
};


export default createEntry;