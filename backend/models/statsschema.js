import mongoose from "mongoose";
const kittySchema=new mongoose.Schema({
    user:{
        type:Number,
        default:0,
    },
    subscription:{
        type:Number,
        default:0,
    },
    view:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});
const statsdata=mongoose.model("stats",kittySchema)
export default statsdata;