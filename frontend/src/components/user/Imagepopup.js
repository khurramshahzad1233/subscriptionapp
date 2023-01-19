import React,{Fragment,useState,useEffect} from 'react';
import "./Imagepopup.css";
import {clearerror,updateprofileavatar,loaduseraction} from "../actions/useraction";
import { useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert'

const Imagepopup = ({openpopup,togglepopup}) => {
  const dispatch=useDispatch();
  const alert=useAlert()

  const {error}=useSelector((state)=>state.updateprofilered)

  const [image,setImage]=useState("");
  const [imagepreview,setImagepreview]=useState("/profile.png");



  const changepopupimg=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();

    reader.readAsDataURL(file)

    reader.onloadend=()=>{
      setImagepreview(reader.result);
      setImage(file);
    }
  };

  const popupimagehandler=async(e)=>{
    e.preventDefault();

    const myform=new FormData();
    myform.append("file",image);

   await dispatch(updateprofileavatar(myform));
   dispatch(loaduseraction());



  }
  

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearerror())
    }
  },[alert,dispatch,error])
  return (
    <Fragment>{openpopup?(
      
        <div className='imagepopupcontainer'>
          <button onClick={togglepopup} className="imagepopupclosebtn">Close</button>
          <div className="imagepopupheading">
            Change Photo
          </div>
          <form 
          onSubmit={popupimagehandler}
          >
            <div className='imagepopupdiv'>
              <img src={imagepreview} alt="popup-avatar"/>
              </div>

              <div>
              <input type="file"
              required
              accept='image/*'
              onChange={changepopupimg}
              />
              </div>

              <div>
              <input type="submit"
              value="Change Photo"
              />
              </div>
              
          </form>
          <div className="imagepopupcancelbtn">
            <button onClick={togglepopup}>Cancel</button>
          </div>

          
        </div>

    ):("")}</Fragment>
  )
}

export default Imagepopup