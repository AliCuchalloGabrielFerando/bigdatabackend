const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validateId = [
    check("id").exists().isMongoId(),
    (req,res,next)=>{
        validateResults(req,res,next)
    }
    ];

module.exports = {
    validateId
}