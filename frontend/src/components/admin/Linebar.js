import React,{useState} from 'react'
import "./Linebar.css"
import {Slider } from "@mui/material"

const Linebar = ({title,values,profit}) => {
  const [value,setValue]=useState({values});

 const handlechange=(e)=>{
  setValue(values)
 }
  

  return (
    <div className="lanebardiv">
        <h3>{title}</h3>
        <div className="slidebar">
          <p><span>{profit?`0%`:`-${value}%`}</span><span>{`${value>100?value:100}%`}</span></p>
        <Slider
        size="small"
        value={profit?values:0}
        onChange={handlechange}
        aria-label="Small"
        valueLabelDisplay="auto"
        />
        </div>
        
       

    </div>
  )
}

export default Linebar