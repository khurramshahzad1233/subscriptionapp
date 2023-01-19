import express from "express"
import {authuser,authadmin} from "../middlewares/auth.js"
import { getdashboardstatscontroller } from "../controllers/statscontroller.js";

const router=express.Router();

router.route("/stats/admin/dashboard").get(authuser,authadmin,getdashboardstatscontroller);

export default router;