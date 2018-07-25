import entries from '../models/data/dataEntries';


const modifyEntry = (req, res) => {
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
};

export default modifyEntry;