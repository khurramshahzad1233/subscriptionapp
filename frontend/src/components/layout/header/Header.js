import React, { Fragment,useState } from 'react'
import "./Header.css"
import {routes} from "./contantroute.js";
import {Link} from "react-router-dom";
import {FaBars} from "react-icons/fa";
import {useSelector} from "react-redux"


const Header = () => {
    const [open, setOpen]=useState(false);
    const {isAuthenticated,user}=useSelector((state)=>state.userred)

    const togglebtn=(e)=>{
        setOpen(!open)
    };

    const logouthandler=(e)=>{

    }

  return (
    <Fragment>
        <header><div className="fabaricon" onClick={togglebtn}><FaBars/></div>
        <div className={open?"backdrop":"backdrop closebackdrop"} onClick={togglebtn}></div>
        <div className={open?"burgermenu":"burgermenu closemenu"}>
        {routes.map((route)=>{
            return(
                <div key={route.name} className="menudiv"><Link to={route.link} style={{textDecoration:"none"}} onClick={togglebtn}>{route.name}</Link></div>
            )
        })
        }
        <div>{isAuthenticated?(
            <Fragment>
                <Link to={`/account`} onClick={togglebtn}><button>Profile</button></Link>
                <button onClick={logouthandler}>Logout</button>
                <p>{
                    user && user.role==="admin" &&(
                        <Link to={`/admin/dashboard`} onClick={togglebtn}><button>Dashboard</button></Link>
                    )
                    }</p>
            </Fragment>
        ):(
            <Fragment>
                <Link to={`/login`} onClick={togglebtn}><button>Login</button></Link>
                <span>{""}OR{""}</span>
                <Link to={`/register`} onClick={togglebtn}><button>Sign Up</button></Link>
            </Fragment>
        )}</div>
            </div></header>
        </Fragment>
  )
}

export default Header