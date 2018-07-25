import entries from '../models/data/dataEntries';


const getEntry = (req, res) => {
  const { id } = req.params;
  if (typeof (Number(id)) === 'number') {
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
};

export default getEntry;