const mongoose = require("mongoose");
const UserScheme = new mongoose.Schema(
    {
        name:{
            type:String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);

module.exports = mongoose.model("users",UserScheme);