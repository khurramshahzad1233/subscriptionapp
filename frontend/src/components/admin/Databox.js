import React from 'react'
import "./Databox.css"
import {RiArrowUpLine,RiArrowDownLine} from "react-icons/ri"

const Databox = ({title,quantity,percentage,profit}) => {
  return (
    <div className="databoxdiv">
        <h4>{title}</h4>
        <p>{quantity} <span>{`${percentage}%`}</span>
        <span>{
            profit?(<RiArrowUpLine color='green'/>):(<RiArrowDownLine color='red'/>)
            }</span>
        </p>
        <p>Since Last Month</p>

    </div>
  )
}

export default Databox