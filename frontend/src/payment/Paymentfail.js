import React,{Fragment} from 'react';
import "./Paymentfail.css"
import { FiAlertCircle } from "react-icons/fi";
import {Link} from "react-router-dom"

const Paymentfail = () => {
  return (
    <Fragment>
        <div className="paymentfailpage">
            <p><FiAlertCircle/></p>
            <p>Payment Fail</p>
            <Link to={`/subscribe`}>Try Again</Link>
        </div>
    </Fragment>
  )
}

export default Paymentfail