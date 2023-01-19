import catchasyncerror from "../middlewares/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import paymentdata from "../models/paymentschema.js";
import userdata from "../models/userschema.js"
import dotenv from "dotenv"
if(process.config.env!=='PRODUCTION'){
    dotenv.config({path:"backend/config.env"})
}

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion:"2022-11-15"
});

export const sendstripeapikey=catchasyncerror(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        stripeapikey:process.env.STRIPE_PUBLISHABLE_KEY,
    })
});


export const subscriptioncontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);

    if(req.user.role==="admin"){
        return next(new Errorhandler("admin can't buy subscription",401))
    }
   const {name,email,paymentMethod}=req.body;
   
   

   const customer=await stripe.customers.create({
    email,
    name,
    payment_method:paymentMethod,
    invoice_settings:{default_payment_method:paymentMethod},
   });

   const product=await stripe.products.create({
    name:"Monthly Subscription",
   });

   const subscription=await stripe.subscriptions.create({
    customer:customer.id,
    items:[
        {
            price_data:{
                currency:"usd",
                product:product.id,
                unit_amount:"1000",
                recurring:{
                    interval:"month"
                },
            },
        },
    ],

    payment_settings:{
        payment_method_types:["card"],
        save_default_payment_method:"on_subscription",
    },
    expand:["latest_invoice.payment_intent"],
   });
   
   user.subscription.id=subscription.id;
   user.subscription.status=subscription.status;
   
   await user.save();
   
   let stripepaymentid=paymentMethod;
   let subscriptionid=subscription.id;
   let chargeid=subscription.latest_invoice.payment_intent.id;
   await paymentdata.create({stripepaymentid,subscriptionid,chargeid})

   res.status(200).json({
    message:"subscription successfully initiated",
    clientSecret:subscription.latest_invoice.payment_intent.client_secret ,
   })
});



export const cancelsubscriptioncontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);

    const subscriptionId=user.subscription.id;
    console.log(subscriptionId)
    
    let refund=false;

    await stripe.subscriptions.del(subscriptionId);
    
    const payment=await paymentdata.findOne({subscriptionid:subscriptionId});

    const gap=Date.now()-payment.createdAt;

    const refundtime=process.env.REFUND_DAYS*24*60*60*1000;
    let chargeid=payment.chargeid

    if(refundtime>gap){
        await stripe.refunds.create({
            payment_intent:chargeid,
           
            
        });
        
    };
    await payment.remove();
    user.subscription.id=undefined;
    user.subscription.status=undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: refund
          ? "Subscription cancelled, You will receive full refund within 7 days."
          : "Subscription cancelled, Now refund initiated as subscription was cancelled after 7 days.",
      });
})