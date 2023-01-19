import catchasyncerror from "../middlewares/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import coursedata from "../models/courseschema.js";
import cloudinary from "cloudinary";
import getdatauri from "../utils/datauri.js";
import statsdata from "../models/statsschema.js";


export const getallcoursecontroller=catchasyncerror(async(req,res,next)=>{
    const keyword=req.query.keyword || "";
    const category=req.query.category || "";

    const allcourse=await coursedata.find({
        title:{
            $regex:keyword,
            $options:"i"
        },
        category:{
            $regex:category,
            $options:"i",
        },
    }).select("-lecture");

    res.status(200).json({
        success:true,
        allcourse,
    })
});


export const getcourselecturecontroller=catchasyncerror(async(req,res,next)=>{
    const course=await coursedata.findById(req.params.id);

    if(!course){
        return next(new Errorhandler("course not found",404))
    };
    course.view+=1;

    await course.save();
    res.status(200).json({
        success:true,
        lecture:course.lecture,
    })
})



export const createcoursecontroller=catchasyncerror(async(req,res,next)=>{
    const {title,description,category,createdBy}=req.body;

    if(!title ||!description ||!category ||!createdBy){
        return next(new Errorhandler("please add all fields",400))
    };

    const file=req.file;
    const fileuri=getdatauri(file);
    const mycloud=await cloudinary.v2.uploader.upload(fileuri.content);

    await coursedata.create({
        title,description,category,createdBy,
        poster:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        },
    });

    res.status(201).json({
        success:true,
        message:"course created successfully, now you can add lectures"
    })
});


export const addlecturecontroller=catchasyncerror(async(req,res,next)=>{
    const {id}=req.params;
    const {title,description}=req.body;

    const course=await coursedata.findById(id);
    if(!course){
        return next(new Errorhandler("course not found",404))
    };

    const file=req.file;
    const fileuri=getdatauri(file);

    const mycloud=await cloudinary.v2.uploader.upload(fileuri.content,{
        resource_type:"video",
    });

    course.lecture.push({
        title,description,
        video:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    });
    course.numofvideo=course.lecture.length;
    await course.save();

    res.status(200).json({
        success:true,
        message:"lecture add in course successfully"
    })
});



export const deletelecturecontroller=catchasyncerror(async(req,res,next)=>{
    const {courseId,lectureId}=req.query;

    const course=await coursedata.findById(courseId);
    if(!course){
        return next(new Errorhandler("course not found",404))
    };
    const lecture=course.lecture.find((item)=>{
        if(item._id.toString()===lectureId.toString()) return item;
    });
    await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
        resource_type:"video",
    });
    course.lecture=course.lecture.filter((item)=>{
        if(item._id.toString()!==lectureId.toString()) return item;
    });
    course.numofvideo=course.lecture.length;
    await course.save();

    res.status(200).json({
        success:true,
        message:"lecture deleted successfully"
    })
});



export const deletecoursecontroller=catchasyncerror(async(req,res,next)=>{
    const {id}=req.params;
    const course=await coursedata.findById(id);
    if(!course){
        return next(new Errorhandler("course not found",404))
    };

    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for(let i=0; i<course.lecture.length; i++){
        const singlelecture=course.lecture[i];
        await cloudinary.v2.uploader.destroy(singlelecture.video.public_id,{
            resource_type:"video",
        })
    };
    await course.remove();
    res.status(200).json({
        success:true,
        message:"course deleted successfully",
    })
});


coursedata.watch().on("change",async()=>{
    const stats=await statsdata.find({}).sort({createdAt:"desc"}).limit(1);

    const allcourse=await coursedata.find({});

    let totalview=0;
    for( let i=0;i<allcourse.length; i++){
        totalview+=allcourse[i].view;
    }
    stats[0].view=totalview;
    stats[0].createdAt=new Date(Date.now());

    await stats[0].save();
})