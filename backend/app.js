import express from "express";
import cookieParser from "cookie-parser";
import Errormiddleware from "./middlewares/error.js";
import path from "path"

import user from "./routes/userroute.js";
import course from "./routes/courseroute.js"
import payment from "./routes/paymentroute.js";
import stats from "./routes/statsroute.js";
import contact from "./routes/contactroute.js"
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())




app.use("/api",user);
app.use("/api",course);
app.use("/api",payment);
app.use("/api",stats);
app.use("/api",contact);

app.use(express.static(path.join(__dirname,"../frondend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"..frontend/build/index.html"))
});
app.use(Errormiddleware)
export default app;