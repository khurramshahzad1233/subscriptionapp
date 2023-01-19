import React,{Fragment,useState,useEffect} from 'react';
import "./Register.css";
import {registeruseraction,clearerror} from "../actions/useraction";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert"
import {Link,useNavigate,useLocation} from "react-router-dom"


const Register = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
    const location=useLocation();

    const {error,isAuthenticated}=useSelector((state)=>state.userred)

    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [avatar,setAvatar]=useState("")
    const [avatarpreview,setAvatarpreview]=useState("/Profile.png");
    

    const registerhandler=(e)=>{
       const file=e.target.files[0];
       const reader=new FileReader();

       reader.readAsDataURL(file);

       reader.onloadend=()=>{
        setAvatarpreview(reader.result);
        setAvatar(file);
       }
    }


    const registersubmithandler=(e)=>{
        e.preventDefault();
        const myform=new FormData();

        myform.append("name",name);
        myform.append("email",email);
        myform.append("password",password);
        myform.append("file",avatar);

        dispatch(registeruseraction(myform))

        
    };

    const redirect=location.search?location.search.split("=")[1]:"/account"

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        };

        if(isAuthenticated){
            navigate(redirect)

        }
    },[dispatch,error,alert,isAuthenticated,navigate,redirect])
  return (
    <Fragment>
        <div className="registerpage">
            <div className="registercontainer">
            <h4>Registration</h4>
            <div className="avatarpreview">
                <img src={avatarpreview} alt="avatar-preview" />
            </div>

            <form 
            className="registerform"
            encType='multipart/form-data'
            onSubmit={registersubmithandler}
            >
                <div className="label">Name</div>
                <div className="input">
                    <input type="text"
                    required
                    placeholder='Name'
                    value={name}
                    name="name"
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="label">Email</div>
                <div className="input">
                    <input type="email"
                    required
                    placeholder='Email'
                    value={email}
                    name="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="label">Password</div>
                <div className="input">
                    <input type="password"
                    required
                    placeholder='Password'
                    value={password}
                    name="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="label">Choose Avatar</div>
                <div>
                    <input type="file"
                    accept='image/*'
                    required
                    name='avatar'
                    onChange={registerhandler}
                    />
                </div>
                <div className="input inputsubmit">
                    <input type="submit"
                    value="Sign Up"
                    />
                </div>
            </form>

            <div className="alreadysignupdiv">
                <p>Already SignUp? {""}</p>
                <span>Go To {""}</span>
                <span><Link to={`/login`}>Login</Link></span>
            </div>

            </div>
           
        </div>
    </Fragment>
  )
}

export default Register