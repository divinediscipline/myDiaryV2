import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import createEntry from '../controllers/createEntry';
import modifyEntry from '../controllers/modifyEntry';
import getEntries from '../controllers/getEntries';
import getEntry from '../controllers/getEntry';

const router = express.Router();

//Api routes
router.post('/entries', createEntry);
router.put('/entries/:id', modifyEntry);
router.get('/entries', getEntries);
router.get('/entries/:id', getEntry);


export default router;