import catchasyncerror from "../middlewares/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import statsdata from "../models/statsschema.js";
import sendEmail from "../utils/sendEmail.js";

export const contactcontroller=catchasyncerror(async(req,res,next)=>{
    const {name,email,message}=req.body;
   

    if(!name ||!email ||!message){
        return next(new Errorhandler("All fields are required",400))
    };
    const from=email;
    const subject="contact for new course";
    const text=`i am ${name} and my email is ${email}. \n${message}`;

    await sendEmail(from, subject, text);

    res.status(200).json({
        success:true,
        message:"your message has been sent"
    })
});



export const requestcoursecontroller=catchasyncerror(async(req,res,next)=>{
    const {name,email,course}=req.body;

    if(!name ||!email ||!course){
        return next(new Errorhandler("All fields are required",400))
    };

    const to=process.env.my_email;
    const subj="requesting new course";
    const text=`i am ${name} and my email is ${email}. \n${course}`;

    await sendEmail(to,subj,text);

    res.status(200).json({
        success:true,
        message:"your request has been submitted"
    })
});


export const getdashboardstatscontroller=catchasyncerror(async(req,res,next)=>{
    const stats=await statsdata.find({}).sort({createdAt:"desc"}).limit(12);

    const statdata=[];
    for(let i=0; i<stats.length; i++){
        statdata.unshift(stats[i]);
    };
    const requiredsize=12-stats.length;
    
    for(let i=0; i<requiredsize; i++){
        statdata.unshift({
            user:0,
            subscription:0,
            view:0,
        });
    };
    const usercount=statdata[11].user;
    const subscriptioncount=statdata[11].subscription;
    const viewcount=statdata[11].view;

    let userpercentage=0,
    viewpercentage=0,
    subscriptionpercentage=0;

    let userprofit=true,
    viewprofit=true,
    subscriptionprofit=true;

    if(statdata[10].user===0) userpercentage=usercount*100;
    if(statdata[10].view===0) viewpercentage=viewcount*100;
    if(statdata[10].subscription===0) subscriptionpercentage=subscriptioncount*100;
    else{
        const difference={
            user:statdata[11].user-statdata[10].user,
            view:statdata[11].view-statdata[10].view,
            subscription:statdata[11].subscription-statdata[10].subscription,
        };
        userpercentage=(difference.user/statdata[10].user)*100;
        viewpercentage=(difference.view/statdata[10].view)*100;
        subscriptionpercentage=(difference.subscription/statdata[10].subscription)*100;

        if(userpercentage<0) userprofit=false;
        if(viewpercentage<0) viewpercentage=false;
        if(subscriptionpercentage<0) subscriptionprofit=false;
    };

    res.status(200).json({
        success:true,
        stats:statdata,
        usercount,
        viewcount,
        subscriptioncount,
        viewpercentage,
        userpercentage,
        subscriptionpercentage,
        userprofit,
        viewprofit,
        subscriptionprofit,
    })

});