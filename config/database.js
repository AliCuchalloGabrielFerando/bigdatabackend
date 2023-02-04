const mongoose = require("mongoose");
require('dotenv').config();
const dbConnect = ()=>{
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err.message) : 
    console.log('Connected to yourDB-name database'));
};

module.exports = dbConnect;
/*
mongoose.connect('mongodb://localhost/bigdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err.message) : 
    console.log('Connected to yourDB-name database'));
};*/

