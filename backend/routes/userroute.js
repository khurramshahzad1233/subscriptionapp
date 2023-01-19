import express from "express"
import { addtoplaylistcontroller, getalluser, getmyprofilecontroller, logincontroller, registerusercontroller, removefromplaylistcontroller, updateavatarcontroller } from "../controllers/usercontroller.js";
import {authuser,authadmin,authsubscriber} from "../middlewares/auth.js"
import singleUpload from "../middlewares/multer.js"
const router=express.Router();

router.route("/admin/user").get(getalluser);
router.route("/user/new").post(singleUpload,registerusercontroller);
router.route("/user/login").post(logincontroller);
router.route("/user/me").get(authuser,getmyprofilecontroller);
router.route("/user/avatar/update").put(authuser,singleUpload,updateavatarcontroller);
router.route("/user/addtoplaylist").post(authuser,addtoplaylistcontroller);
router.route("/user/removefromplaylist").delete(authuser,removefromplaylistcontroller)


export default router;