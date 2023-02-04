const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
    {
        histories:{
            type:Array
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);
module.exports = mongoose.model("histories",HistorySchema);