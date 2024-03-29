const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validateCreateUser = [
    check("name").exists().notEmpty(),
    check("age").exists().notEmpty().isNumeric({ min: 12, max: 99 }),
    check("email").exists().notEmpty().isEmail(),
    (req,res,next)=>validateResults(req,res,next)
];

const valideUpdateUser = [
    check("id").exists().notEmpty().isMongoId(),
    check("name").exists().notEmpty(),
    check("age").exists().notEmpty().isNumeric({ min: 12, max: 99 }),
    check("email").exists().notEmpty().isEmail(),
    (req,res,next)=>{
        validateResults(req,res,next)
    }
];
const valideUser = [
    check("user._id").exists().notEmpty().isMongoId(),
    check("user.name").exists().notEmpty().isString(),
    (req,res,next)=>{
        validateResults(req,res,next)
    }
]
module.exports = {
    validateCreateUser,
    valideUpdateUser,
    valideUser
}