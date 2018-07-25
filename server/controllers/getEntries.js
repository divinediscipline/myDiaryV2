import entries from '../models/data/dataEntries';


const getEntries = (req, res) => {
  res.status(200).json(
    {
      entries,
    },
  );
};

export default getEntries;