import React,{Fragment} from 'react';
import "./Footer.css"
import {FaYoutube, FaInstagram, FaGithub} from "react-icons/fa"


const Footer = () => {
  return (
    <Fragment>
        <div className="footerpage">
            <div className="copyright">
                <h4>ALL RIGHT RESERVED &copy; Khurram shahzad</h4>
            </div>
            <div className="footericon">
                <FaYoutube/>
                <FaInstagram/>
                <FaGithub/>
            </div>
            

        </div>
    </Fragment>
  )
}

export default Footer