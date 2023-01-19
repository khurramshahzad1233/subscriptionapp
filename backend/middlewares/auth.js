import jwt from "jsonwebtoken"
import Errorhandler from "../utils/errorhandler.js";
import catchasyncerror from "./catchasyncerror.js";
import userdata from "../models/userschema.js";

export const authuser=catchasyncerror(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new Errorhandler("plz login to access the resource",401))
    };
    const accessdata=jwt.verify(token,process.env.jwt_secret);

    req.user=await userdata.findById(accessdata.id);
    next()
});

export const authadmin=(req,res,next)=>{
    if(req.user.role!=="admin"){
        return next(new Errorhandler(`${req.user.role} is not allowed to access the resource`,403))
    };
    next();
}


export const authsubscriber=(req,res,next)=>{
    if(req.user.subscription.status!=="active" && req.user.role!=="admin"){
        return next(
            new Errorhandler(`only subscriber can access the resource`,403)
        )
    };
    next()
};