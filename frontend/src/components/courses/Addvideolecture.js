import React,{Fragment,useEffect,useState} from 'react';
import "./Addvideolecture.css"
import {clearerror,getallvideolectureaction,addvideolectureaction,deletelectureaction} from "../actions/courseaction"
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useAlert} from 'react-alert';
import {Delete} from "@mui/icons-material"





const Addvideolecture = () => {
    const dispatch=useDispatch();
    const {id}=useParams();
    const alert=useAlert();

    const {error,alllecture}=useSelector((state)=>state.allvideolecturered);
    const {eror:addlectureerror, isCreated}=useSelector((state)=>state.addvideolecturered);
    const {err:deletelectureerror,isDeleted}=useSelector((state)=>state.deletelecturered)
    

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [video,setVideo]=useState("");
    const [videopreview,setVideopreview]=useState("");

    const addvideolecture=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend=()=>{
            setVideopreview(reader.result);
            setVideo(file)
        }

    }

    const addvideolecturesubmithandler=async(e)=>{
        e.preventDefault();

        const myform=new FormData();

        myform.append("title",title);
        myform.append("description",description);
        myform.append("file",video);

        await dispatch(addvideolectureaction(id,myform));
        dispatch({type:"ADD_VIDEO_LECTURE_RESET"})
        dispatch(getallvideolectureaction(id))
        

    };

    const deletelecturehandler=async(courseid,lectureid)=>{
        await dispatch(deletelectureaction(courseid,lectureid));
        dispatch(getallvideolectureaction(id))
        
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
        if(addlectureerror){
            alert.error(addlectureerror);
            dispatch(clearerror())
        };
        if(deletelectureerror){
            alert.error(deletelectureerror);
            dispatch(clearerror)
        }
        if(isCreated){
            alert.success("lecture created successfully")
        };
        if(isDeleted){
            alert.success("lecture deleted successfully")
        }


        dispatch(getallvideolectureaction(id))
    },[dispatch,id,error,alert,addlectureerror,isCreated,deletelectureerror,isDeleted])
  return (
    <Fragment>
        <div className="addvideolecturepage">
            <div className="allvideolecturecontainer">
                <h5>Course Lecture</h5>
                <div className="allvideolecturediv">{
                    alllecture.length>0 && alllecture.map((item,i)=>{
                        return <div key={i} className="singlevideolecture">
                            <div>
                            <p>#{i+1}{""} {item.title}</p>
                            <p>{item.description}</p>
                            </div>
                            
                            <div className="lecturedeletebtn">
                                <button onClick={()=>deletelecturehandler(id,`${item._id}`)}><Delete/></button>
                            </div>

                        </div>
                    })
                   
                }</div>
            </div>
            <div className="addvideocontainer">
                <h3>ADD VIDEO LECTURE</h3>
                <form 
                className='addvideolectureform'
                encType='multipart/form-data'
                onSubmit={addvideolecturesubmithandler}
                >
                    <p>
                        <input type="text"
                        required
                        placeholder='Title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                    </p>
                    <p>
                        <input type="text"
                        required
                        placeholder='Description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        />
                    </p>
                    <p>
                        <input type="file"
                        required
                        accept='video/mp4'
                        onChange={addvideolecture}
                        />
                    </p>
                    <div className="addvideopreview">{
                        videopreview &&(
                            <video src={videopreview}
                            controls
                            controlsList='nodownload'
                            ></video>
                        )
                    }</div>

                    <p>
                        <input type="submit"
                        value="Upload"
                        />
                    </p>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Addvideolecture