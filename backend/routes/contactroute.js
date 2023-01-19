import express from "express"
import {authuser} from "../middlewares/auth.js"
import { contactcontroller } from "../controllers/statscontroller.js";
const router=express.Router();

router.route("/contact").post(authuser,contactcontroller)
export default router;