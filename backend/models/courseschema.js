import mongoose from "mongoose";
const kittySchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,"plz enter course title"],
        minLength:[4,"title must be more then 4 characters"],
        maxLength:[80,"title cannot exceeded more then 80 characters"],
    },
    description:{
        type:String,
        required:[true,"please enter course description"],
        minLength:[20,"Description must be more then 20 characters"]
    },
    category:{
        type:String,
        required:true,
    },
    lecture:[
        {
            title:{
                type:String,
                requried:true,
            },
            description:{
                type:String,
                required:true,
            },
            video:{
                public_id:{
                    type:String,
                    required:true,
                },
                url:{
                    type:String,
                    required:true,
                }
            }
        }
    ],
    poster:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    numofvideo:{
        type:Number,
        default:0,
    },
    view:{
        type:Number,
        default:0,
    },
    createdBy:{
        type:String,
        required:[true,"enter course creator name"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },


});

const coursedata=mongoose.model("Course",kittySchema);

export default coursedata;