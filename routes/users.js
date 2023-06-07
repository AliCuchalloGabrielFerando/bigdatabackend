const express = require('express');
const router = express.Router();
const {validateCreateUser,valideUpdateUser} = require('../validators/users');
const {validateId} = require('../validators/id');
const {createUser,updateUser,getUser,getUsers,deleteUser} = require('../controllers/users');

router.get('/',getUsers);
router.get('/:id',validateId,getUser);
router.post('/',validateCreateUser,createUser);
router.put('/:id',valideUpdateUser,updateUser);
router.delete('/:id',validateId,deleteUser);

module.exports = router;