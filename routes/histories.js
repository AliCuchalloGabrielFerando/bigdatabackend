const express = require('express');
const { createHistory, getHistories,deleteHistory, getHistory } = require('../controllers/histories');
const {validateId} = require('../validators/id');
const router = express.Router();

router.get('/',getHistories);
router.get('/:id',validateId,getHistory);
router.post('/',createHistory);
router.delete('/:id',validateId,deleteHistory)

module.exports = router;