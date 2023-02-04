require('dotenv').config();


const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const dbConnect = require("./config/database");
const app = express();
app.use(cors());
//permite respuesta json
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
//permite leer archivos dentro del servidor
app.use(express.static("storage"));

app.use('/api',require("./routes"));

app.listen(port,()=>{
console.log(`tu app corre en: http://localhost:${port}` );

});
dbConnect();
