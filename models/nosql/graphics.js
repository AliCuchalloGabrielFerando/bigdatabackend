const mongoose = require('mongoose');

const GraphSchema = new mongoose.Schema(
    {
        categories:{
            type:Array
        },
        user:{
            _id:{
                type:mongoose.Types.ObjectId
            },
            name:{
                type:String
            },
            age:{
                type:Number
            },
            email:{
                type:String
            }
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
)
module.exports = mongoose.model("graphics",GraphSchema);