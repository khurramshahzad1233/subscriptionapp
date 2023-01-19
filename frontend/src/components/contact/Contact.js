import React,{Fragment,useState,useEffect} from 'react';
import "./Contact.css";
import {clearerror,contactaction} from "../actions/contactaction";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from 'react-alert'

const Contact = () => {
    const dispatch=useDispatch();
    const alert=useAlert()

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [message,setMessage]=useState("");
    

    const {error,isSent}=useSelector((state)=>state.contactred)

    const contactsubmithandler=(e)=>{
        e.preventDefault();

        dispatch(contactaction(name,email,message))
    };


    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
        if(isSent){
            alert.success("email sent successfully");
            dispatch({type:"CONTACT_RESET"})

        }
    },[dispatch,error,alert,isSent])
  return (
    <Fragment>
        <div className="contactpage">
            <div className="contactcontainer">
                <h4>Contact Us</h4>
                <form
                onSubmit={contactsubmithandler}
                >
                    <p>
                        <label htmlFor='name'>name</label>
                        <input type="text" 
                        required
                        placeholder='name'
                        id='name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </p>

                    <p>
                        <label htmlFor='email'>email</label>
                        <input type="email"
                        required
                        placeholder='email'
                        id='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    </p>

                    <p>
                        <label htmlFor="message">message</label>
                        <input type="text"
                        required
                        placeholder='message'
                        id='message'
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        />
                    </p>

                    <p>
                        <input type="submit"
                        value="Send Email"
                        />
                    </p>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Contact