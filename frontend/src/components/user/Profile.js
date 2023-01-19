import React,{Fragment,useEffect,useState} from 'react'
import "./Profile.css";
import {useDispatch,useSelector} from "react-redux";
import {clearerror,removefromplaylistaction,loaduseraction} from "../actions/useraction";
import {useNavigate,Link} from "react-router-dom"
import {Delete} from "@mui/icons-material"
import Imagepopup from './Imagepopup';
import axios from "axios";
import {useAlert} from "react-alert"

const Profile = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const alert=useAlert();


  const [openpopup,setOpenpopup]=useState(false);

  const togglepopup=(e)=>{
    setOpenpopup(!openpopup)
  }

  const {error,isAuthenticated,user}=useSelector((state)=>state.userred);
  const {error:removelisterror, isDeleted}=useSelector((state)=>state.removefromplaylistred)
  

  const cancelsubscription=async(e)=>{
    try {
      const {data}=await axios.delete("/api/subscription/cancel");
      if (data.error) return alert("cancellation unsuccessful!");
        alert("cancellation Successful! Subscription active.");

     
      
    } catch (err) {
      console.error(err);
        alert("cancellation failed! " + err.message);
      
    }

  }

  const removefromplaylisthandler=async(id)=>{
    await dispatch(removefromplaylistaction(id));
    dispatch(loaduseraction())

    

  };
  

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearerror())
    };
    if(isAuthenticated===false){
      navigate("/login")
    };
    if(removelisterror){
      alert.error(removelisterror);
      dispatch(clearerror())
    };

    if(isDeleted){
      alert.success("remove from playlist successfully")
    }
  },[dispatch,error,isAuthenticated,navigate,isDeleted,removelisterror,alert])
  return (
    <Fragment>
      <div className="profilenamediv">
        <p>{user.name} PROFILE</p>
      </div>
      <div className="profilecontainer">
        <div className="profileimagediv">
          <div className="profileimage">
            <img src={user.avatar.url} alt="Profile Avatar" />
          </div>
          <Imagepopup openpopup={openpopup} togglepopup={togglepopup} />
          <p><button onClick={togglepopup}>Change Photo</button></p>
        </div>
        <div className="profileinfodiv">
          <div className="profileinfo">
            <label>Name</label>
            <span>{user.name}</span>
          </div>
          <div className="profileinfo">
            <label>Email</label>
            <span>{user.email}</span>
          </div>
          <div className="profileinfo">
            <label>Created At</label>
            <span>{user.createdAt.split("T")[0]}</span>
          </div>
          <div className="profileinfo">
            <label>Subscription</label>
            <span>{user.subscription && user.subscription.status==="active"?(
              <button onClick={cancelsubscription}>Cancel Subscription</button>
            ):(
              <Link to={`/subscribe`}>Subscribe</Link>
            )}</span>
          </div>
         <div className="profilebtndiv">
          <Link to={`/updateprofile`}><button>Update Profile</button></Link>
          <Link to={`/changepassword`}><button>Change Password</button></Link>
         </div>
        </div>
        
      </div>
      <div className="profileplaylistheading">
      <h4>PLAYLIST</h4>
      </div>
      <div className="profileplaylistcontainer">{
        user.playlist && user.playlist.length>0?(
          user.playlist.map((element)=>(
            
              <div className="profilecourselistdiv" key={element.course}>
              <p><img src={element.poster} alt="poster-avatar" /></p>
              <p><Link to={`/course/${element.course}`}>Watch Now</Link> 
              <span><button onClick={()=>removefromplaylisthandler(element.course)}><Delete/></button></span>
              </p>
              </div>
              
           
          ))
        ):(
          <div className="emptyplaylist">Playlist is Empty</div>

        )
      }</div>
      
      
    </Fragment>
  )
}

export default Profile