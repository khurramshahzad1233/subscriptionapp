import React,{Fragment} from 'react';
import "./Notfound.css";
import {Link} from "react-router-dom";
import {RiErrorWarningFill} from "react-icons/ri"

const Notfound = () => {
  return (
    <Fragment>
      <div className="notfoundpage">
        <RiErrorWarningFill/>
        <h4>Page Not Found</h4>
        <Link to={`/`}><button>Go to home</button></Link>
      </div>
    </Fragment>
  )
}

export default Notfound