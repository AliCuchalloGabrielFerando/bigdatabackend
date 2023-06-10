const { matchedData} = require('express-validator');
const handleHttpError = require('../utils/handleErrors');
const categorias = require('../config/categorias.json');
const {historyModel,graphicsModel} = require('../models');

const createHistory =async(req,res)=>{

    const body = req.body;
    try{
        const user = body.user;
        delete body.user;
        body.histories.forEach(item=>{
            let url = item.url.split('/');
            if(url.length >=2){
            item.url = url[2];
            }else{
              //  console.log("se perdio algo");
            }
            delete item.favicon_url;
            delete item.page_transition;
            delete item.title;
            delete item.client_id;
            delete item.time_usec;
        })

        const data = await historyModel.create(body);

        const re = await historyModel.aggregate([
            {$unwind:"$histories"},
            {$match:{"_id":data._id}},
            {$group:{_id:"$histories.url",total:{$sum:1}}}
        ])
        await historyModel.deleteById(data._id)
        re.forEach(item=>{
            categorias.forEach(categoria=>{
                categoria.dominios.forEach(dominio=>{
                    if(item._id.includes(dominio)){
                        categoria.visitas+= item.total
                        item.total=0;
                        return false;
                    }
                })
                if(item.total==0){
                    return false
                }
            })
            if(item.total>0){
                categorias[categorias.length-1].visitas += item.total;
            }
        })
        let total = 0;
        categorias.forEach(categoria=>{
            total += categoria.visitas;
        })

        let graph = {}
        graph.user = user;
        graph.categories = categorias;
        const resultado = await graphicsModel.create(graph);
        res.send({resultado});

    }catch(err){
        console.log(err.message);
        handleHttpError(res,'error en createHistory');
    }
}
//url oficio  
//url ocio []
const getHistories = async(req,res)=>{
    try{
        const data = await graphicsModel.find({});
        
        //await historyModel.mapReduce(mapFunction,reduceFunction,{out:'mapeado', jsMode: true, verbose: true});
        res.send({data});
    }catch(err){
        console.log(err.message)
        handleHttpError(res,'error en getHistories');
    }
}
const getHistory = async(req,res)=>{
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await graphicsModel.findById(id);
        res.send({data});
    }catch(err){
        handleHttpError(res,'error en getHuistory fkey');
    }
}
const deleteHistory = async(req,res)=>{
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await graphicsModel.deleteOne({_id:id});
        res.send({data});
    }catch(err){
        handleHttpError(res,'error en deleteUserr fkey');
    }
}

module.exports={
    createHistory,
    getHistories,
    getHistory,
    deleteHistory
}