import React,{Fragment,useState,useEffect} from 'react'
import "./Login.css"
import {Link} from "react-router-dom";
import {loginuseraction,clearerror} from "../actions/useraction";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert"
import {useNavigate,useLocation} from "react-router-dom"

const Login = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();
    const location=useLocation();

    const {error,isAuthenticated}=useSelector((state)=>state.userred)

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")

    const loginsubmithandler=(e)=>{
        e.preventDefault();

        dispatch(loginuseraction(email,password));
    };

    const redirect=location.search?location.search.split("=")[1]:"/account";

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
        if(isAuthenticated){
            navigate(redirect);
        }
        
    },[alert,dispatch,error,isAuthenticated,navigate,redirect])

  return (
    <Fragment>
        <div className="loginpage">
            <div className="logincontainer">
                <h4>WelCome to CourseBundler</h4>

                <form 
                className='loginform'
                onSubmit={loginsubmithandler}
                >
                    <div className="label">Email Address</div>
                    <div className="input">
                        <input type="email"
                        required
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="label">Password</div>
                    <div className="input">
                        <input type="password"
                        required
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="forgotpassword">
                        <Link to={`/forgotpassword`}>Forgot Password</Link>
                    </div>

                    <div className='loginsubmit'>
                        <input type="submit"
                        value="Login"
                        />
                    </div>
                </form>

                <div className="newuserlogin">
                    <span>New User? {" "}</span>
                    <Link to={`/register`}>Sign Up</Link>
                    <span>{"  "}here</span>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Login