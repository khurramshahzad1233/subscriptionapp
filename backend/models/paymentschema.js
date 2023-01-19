import mongoose from "mongoose";
const kittySchema=new mongoose.Schema({
    stripepaymentid:{
        type:String,
        required:true,
    },
    subscriptionid:{
        type:String,
        requied:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    chargeid:{
        type:String,
        required:true,
    }
});
const paymentdata=mongoose.model("payment",kittySchema);
export default paymentdata;