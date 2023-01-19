import React,{Fragment} from 'react'
import "./Paymentsuccess.css";
import {RiCheckboxCircleFill} from "react-icons/ri"

const Paymentsuccess = () => {
  return (
    <Fragment>
        <div className="paymentsuccesspage">
            <div className="paymentsuccesscontainer">
                <h3>You have Pro Pack</h3>
                <div className="paymentsuccessdiv">
                    <h5>Payment Success</h5>
                    <p>Congratulation You are a pro member now and you have access to all content</p>
                    <p><RiCheckboxCircleFill/></p>
                    <p><button>Go to Profile</button></p>
                    <p>Reference Id:#35351</p>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Paymentsuccess