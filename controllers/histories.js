const { matchedData} = require('express-validator');
const handleHttpError = require('../utils/handleErrors');
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

        const categorias =[
            {name:'comunicacion',dominios:['meet','whatsapp','eldeber','infobae','paginasiete','lostiempos','atlassian',
            'genbeta','facebook','zoom','twitter','echaloasuerte','trello'],visitas:0},
            {name:'cursos',dominios:['udemy','youtube','cursosdev','aprendible','blumbitvirtual','coursera'],visitas:0},
            {name:'trabajo',dominios:['mail','cloud','firebase','google','uagrm','mongodb','laravel','github','tailwindcss','tailwindui',
            'tabnine','slideshare','mozilla','strapi','stackoverflow','angular','npmjs','wikipedia','developers','newtab',
            'microsoft','getbootstrap','laragon','laracasts','arcgis'],visitas:0},
            {name:'ocio',dominios:['novelfull','animeflv','mangaowl','gardenmanage','esports','soymotor',
            'xataka','brawltime','bolavip','motorsport','marca','diariomotor','20minutos','cinecente',
            'donbalon','manaco','lalatina','chess','gamestorrents','webnovelonline','towerofgod','statsroyale','seriesflix',
            'androidcleaner','volarenovels','deviantart'],visitas:0},
            {name:'pruebas',dominios:['localhost','herokuapp','heroku','expressjs','192.168','mediafire','pgsharp','127.0.0.1',
            'mega'],visitas:0},
            {name:'otros',dominios:[],visitas:0}
        ]
        const data = await historyModel.create(body);

        const re = await historyModel.aggregate([
            {$unwind:"$histories"},
            {$match:{"_id":data._id}},
            {$group:{_id:"$histories.url",total:{$sum:1}}}
        ])
        await historyModel.deleteById(data._id)
       // console.log(re);
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
       // console.log(categorias);
        let total = 0;
        categorias.forEach(categoria=>{
            total += categoria.visitas;
        })
        //console.log(total);

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