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
HistorySchema.statics.deleteById = function(_id){
    return this.deleteOne({_id:_id})
}
module.exports = mongoose.model("histories",HistorySchema);