const express = require('express');
const router = express.Router();
const {validateCreateUser,valideUpdateUser,validateIdUser} = require('../validators/users');
const {createUser,updateUser,getUser,getUsers,deleteUser} = require('../controllers/users');

router.get('/',getUsers);
router.get('/:id',validateIdUser,getUser);
router.post('/',validateCreateUser,createUser);
router.put('/:id',valideUpdateUser,updateUser);
router.delete('/:id',validateIdUser,deleteUser);

module.exports = router;