import Errorhandler from "../utils/errorhandler.js"
import catchasyncerror from "../middlewares/catchasyncerror.js"
import userdata from "../models/userschema.js";
import cloudinary from "cloudinary"
import getdatauri from "../utils/datauri.js";
import sendtoken from "../utils/sendtoken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import coursedata from "../models/courseschema.js";
import statsdata from "../models/statsschema.js";


export const getalluser=catchasyncerror(async(req,res,next)=>{
    const alluser=await userdata.find({});

    res.status(200).json({
        success:true,
        alluser,

    })
});

export const registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const file=req.file;


    if(!name ||!email ||!password ||!file){
        return next(new Errorhandler("plz enter all fields",400))
    };

    let user=await userdata.findOne({email});
    if(user){
        return next(new Errorhandler("user already exist",409))
    };
    const fileuri=getdatauri(file);
    const mycloud=await cloudinary.v2.uploader.upload(fileuri.content);

    user=await userdata.create({
        name,email,password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    })
    sendtoken(res,user,201,"register successfully")
});


export const logincontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email ||!password){
        return next(
            new Errorhandler("Plz enter all fields",400)
        )
    };
    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("incorrect email or password",401))
    };
    const matchpassword=await user.comparepassword(password);
    if(!matchpassword){
        return next(new Errorhandler("incorrect email or password",401))
    };
    sendtoken(res,user,200,"welcome back")
});

export const logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
        
    }).json({
        success:true,
        message:"logout successfully"
    })
});


export const getmyprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz login to access the resource",400))
    };
    res.status(200).json({
        success:true,
        user,
    })
});

export const updatepasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const {oldpassword,newpassword}=req.body;
    if(!oldpassword || !newpassword){
        return next(new Errorhandler("plz enter all fields",400))
    };
    const user=await userdata.findById(req.user.id).select("+password");
    const matchpassword=await userdata.comparepassword(oldpassword);

    if(!matchpassword){
        return next(new Errorhandler("incorrect old password",400));
    };
    user.password=newpassword;
    await user.save();

    res.status(200).json({
        success:true,
        message:"password change successfully",
    });

});

export const updateprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const {name,email}=req.body;

    const user=await userdata.findById(req.user.id);
    if(name){user.name=name};
    if(email){user.email=email};

    await user.save();

    res.status(200).json({
        success:true,
        message:"profile update successfully"
    })
});

export const updateavatarcontroller=catchasyncerror(async(req,res,next)=>{
    const file=req.file;
    console.log(file);

    const user=await userdata.findById(req.user.id);
    const fileuri=getdatauri(file);

    const mycloud=await cloudinary.v2.uploader.upload(fileuri.content);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
    };
    await user.save();

    res.status(200).json({
        success:true,
        message:"avatar updated successfully"
    })
});


export const updaterolecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",404))
    };
    if(user.role==="user"){
        user.role="admin"
    }else{
        user.role="user"
    };
    await user.save();

    res.status(200).json({
        success:true,
        message:"updated role successfully"
    })
});


export const addtoplaylistcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz subscribe to access the resource",403))
    };

    const course=await coursedata.findById(req.body.id);
    if(!course){
        return next(new Errorhandler("invalid course id",404))
    };

    const isitemexist=user.playlist.find((item)=>{
        if(item.course.toString()===course._id.toString())return true;
    });
    if(isitemexist){
        return next(new Errorhandler("item already exist",409))
    };
    user.playlist.push({
        course:course._id,
        poster:course.poster.url,
    });
    await user.save();

    res.status(200).json({
        success:true,
        message:"added to playlist"
    })
});


export const removefromplaylistcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz login to access the resource",401))
    };
    const course=await coursedata.findById(req.query.id);
    if(!course){
        return next(new Errorhandler("invalid course id",404))
    };
    const newplaylist=user.playlist.filter((item)=>{
        if(item.course.toString()!==course._id.toString())return item;
    });
    user.playlist=newplaylist;
    await user.save();

    res.status(200).json({
        success:true,
        message:"remove from playlist"
    })
});


export const deleteusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);

    if(!user){
        return next(new Errorhandler("user not found",404))
    };
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();

    res.status(200).json({
        success:true,
        message:"user deleted successfully",
    })
});

export const deleteprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz login to access the resource",401))
    };
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();

    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });

    res.status(200).json({
        success:true,
        message:"profile deleted successfully"
    })
});


export const forgotpasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const {email}=req.body;
    const user=await userdata.findOne({email});

    if(!user){
        return next(new Errorhandler("user not found",400))
    };

    const resettoken=await user.getresettoken();
    await user.save();

    const resetpasswordurl=`${process.env.forntendurl}/resetpassword/${resettoken}`;
    const message=`click on the link to reset your password ${resetpasswordurl}. if your did not request the linke then please ignore`

    await sendEmail(user.email,"password recovery",message);

    res.status(200).json({
        success:true,
        message:`reset token sent to ${user.email}`
    })
    
});



export const resetpasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const {token}=req.params;

    const resetpasswordtoken=crypto.createHash("sha256").update(token).digest("hex");

    const user=await userdata.findOne({
        resetpasswordtoken,
        resetpasswordexpire:{$gt:Date.now()}
    });

    if(!user){
        return next(new Errorhandler("token is invalid or has been expired",401));

    };
    user.password=req.body.password;
    user.resetpasswordtoken=undefined;
    user.resetpasswordexpire=undefined;

    await user.save();

    res.status(200).json({
        success:true,
        message:"password changed successfully"
    })
});


userdata.watch().on("change",async ()=>{
    const stats=await statsdata.find({}).sort({createdAt:"desc"}).limit(1);

    const subscription=await userdata.find({"subscription.status":"active"});
    stats[0].user=await userdata.countDocuments();
    stats[0].subscription=subscription.length;
    stats[0].createdAt=new Date(Date.now());

    await stats[0].save()
});
