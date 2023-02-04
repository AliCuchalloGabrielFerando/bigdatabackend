const express = require('express');
const { createHistory, getHistories,deleteHistory, getHistory } = require('../controllers/histories');
const {validateIdUser} = require('../validators/users');
const router = express.Router();

router.get('/',getHistories);
router.get('/:id',validateIdUser,getHistory);
router.post('/',createHistory);
router.delete('/:id',validateIdUser,deleteHistory)

module.exports = router;