import express from "express"
import { addlecturecontroller, createcoursecontroller, deletecoursecontroller, deletelecturecontroller, getallcoursecontroller, getcourselecturecontroller } from "../controllers/coursecontroller.js";
import {authuser,authadmin,authsubscriber} from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router=express.Router();


router.route("/courses/all").get(getallcoursecontroller);
router.route("/admin/course/new").post(authuser,authadmin,singleUpload,createcoursecontroller);
router.route("/admin/lecture/add/:id").post(authuser,authadmin,singleUpload,addlecturecontroller);
router.route("/course/lecture/:id").get(authuser,getcourselecturecontroller);
router.route("/course/lecture").delete(authuser,authadmin,deletelecturecontroller);
router.route("/course/:id").delete(authuser,authadmin,deletecoursecontroller);
router.route("/course/lecture/:id").get(authuser,authsubscriber,getcourselecturecontroller)

export default router;