import mongoose from "mongoose"
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"
const kittySchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"plz enter your name"],
        minLength:[4,"name should be more then 4 characters"]
    },
    email:{
        type:String,
        required:[true,"plz enter your email address"],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,"plz enter your password"],
        select:false,
        minLength:[6,"password should be more then 6 characters"]
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    },
    subscription:{
        id:{
            type:String,
        },
        status:{
            type:String,
            default:"inactive"
        }
    },
    playlist:[
        {
            course:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"course"
            },
            poster:{
                type:String,
            }
        }
    ],
    resetpasswordtoken:String,
    resetpasswordexpire:String,
  });

  kittySchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    };
    this.password=await bcrypt.hash(this.password,10);
    next();
  });

  kittySchema.methods.getjwttoken=function(){
    return jwt.sign({id:this._id},process.env.jwt_secret,{
        expiresIn:"5d"
    })

  };

  kittySchema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
  };

  kittySchema.methods.getresetpasswordtoken=function(){
    const resettoken=crypto.randomBytes(20).toString("hex");
    this.resetpasswordtoken=crypto.createHash("sha256").update(resettoken).digest("hex");
    this.resetpasswordexpire=Date.now()+15*60*1000;
    return resettoken;
  }

  const userdata = mongoose.model('user', kittySchema);
  export default userdata;