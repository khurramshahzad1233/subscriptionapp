import React,{Fragment,useEffect,useState} from 'react';
import "./Coursepage.css";
import {courselectureaction,clearerror} from "../actions/courseaction";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useAlert} from "react-alert"

const Coursepage = () => {
  const [lectureno,setLectureno]=useState(0)
  const dispatch=useDispatch();
  const {id}=useParams();
  const alert=useAlert();

  const {error,alllecture}=useSelector((state)=>state.courselecturered)



  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearerror())
    }

    dispatch(courselectureaction(id))
  },[dispatch,id,alert,error])
  return (
    <Fragment>
      <div className="alllecturecontainer">
        <div className="alllecturevideoplayer">{
          alllecture && alllecture.length>0?(
            <Fragment>
              <div className="lecturecontainer">
                <div className="lectureplayer">
                  <video src={alllecture[lectureno].video.url}
                  controls
                  controlsList='nodownload noremoteplayback'
                  disablePictureInPicture
                  disableRemotePlayback
                  ></video>

              </div>
              <p>{`# ${lectureno+1} ${alllecture[lectureno].title}`}</p>
              <p><span>Description: </span>{alllecture[lectureno].description}</p>
              </div>
              
            </Fragment>
          ):(
            <h5>No Lectures Yet</h5>
          )
        }</div>
        <div className="alllectureindex">{
          alllecture.length>0 && alllecture.map((element,index)=>(
            <div>
              <p className='lecturebtn'><button key={element._id}
            onClick={()=>setLectureno(index)}
            >{`#${index+1}${element.title}`}</button></p>
            </div>
            
          ))
        }</div>
      </div>
    </Fragment>

  )
}

export default Coursepage