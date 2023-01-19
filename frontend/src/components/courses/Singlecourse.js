import React,{Fragment,useEffect} from 'react'
import "./Singlecourse.css";
import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert"

import {clearerror,addtoplaylistaction,loaduseraction} from "../actions/useraction"

const Singlecourse = ({id,title,description,view,poster,numofvideo,createdBy}) => {
  const dispatch=useDispatch();
  const alert=useAlert()

  const {error,isAdded}=useSelector((state)=>state.addtoplaylistred)

  const addtoplaylisthandler=(id)=>{
    dispatch(addtoplaylistaction(id));

    dispatch(loaduseraction())
  };

  useEffect(()=>{

    if(error){
      alert.error(error)
      dispatch(clearerror())
    };

    if(isAdded){
      alert.success("addto playlist successfully");
      dispatch({type:"ADD_TO_PLAYLIST_RESET"})
    }
  },[alert,dispatch,error,isAdded])
  return (
    <Fragment>
        <div className="singlecoursecontainer">
            <div className="posterdiv">
                <img src={poster} alt="poster-avatar" />

            </div>
            <h2>{title}</h2>
            <p>{description}</p>
            <p><span> View{" "}</span>{view}</p>
            <p><span>No Of Lecture</span>{numofvideo}</p>
            <p><span>Creater</span>{createdBy}</p>
            <p>
                <span><Link to={`/course/${id}`}>Watch Now</Link></span>
                <span><button
                onClick={()=>addtoplaylisthandler(id)}
                >Add to Playlist</button></span>
            </p>

        </div>
    </Fragment>
  )
}

export default Singlecourse