import express from "express"
import { cancelsubscriptioncontroller, sendstripeapikey, subscriptioncontroller } from "../controllers/paymentcontroller.js";
import {authadmin,authuser} from "../middlewares/auth.js"
const router=express.Router();

router.route("/stripeapikey").get(sendstripeapikey);
router.route("/subscribe/paymentprocess").post(authuser,subscriptioncontroller);
router.route("/subscription/cancel").delete(authuser,cancelsubscriptioncontroller)

export default router