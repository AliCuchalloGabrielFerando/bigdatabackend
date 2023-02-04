const { matchedData} = require('express-validator');
const { userModel} = require('../models');
const handleHttpError = require('../utils/handleErrors');

const getUsers = async(req,res)=>{
    try{
        const data = await userModel.find({});
        res.send({data});
    }catch(err){
        handleHttpError(res,'error en getUsers');
    }
}

const getUser = async(req,res)=>{
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await userModel.findById(id);
        res.send({data});
    }catch(err){
        handleHttpError(res,'error en getUser fkey');
    }
}
const createUser = async(req,res)=>{
    try{
        const body = matchedData(req);
        const data = await userModel.create(body);
        res.send(data);
    }catch(err){
        handleHttpError(res,'error en createUser');
    }
}

const updateUser = async(req,res)=>{
    try{
        const {id, ...body} = matchedData(req);
        const data = await userModel.findOneAndUpdate(id,body);
        res.send({data});
    }catch(err){
        handleHttpError(res,'error en updateUser fkey');
    }
}

const deleteUser = async(req,res)=>{
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await userModel.deleteOne({_id:id});
        res.send({data});
    }catch(err){
        handleHttpError(res,'error en deleteUserr fkey');
    }
}
module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}