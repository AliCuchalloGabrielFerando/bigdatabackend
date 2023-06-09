const express = require('express');
const { createHistory, getHistories,deleteHistory, getHistory } = require('../controllers/histories');
const {validateId} = require('../validators/id');
const {valideUser} = require('../validators/users');
const router = express.Router();

router.get('/',getHistories);
router.get('/:id',validateId,getHistory);
router.post('/',valideUser,createHistory);
router.delete('/:id',validateId,deleteHistory)

module.exports = router;