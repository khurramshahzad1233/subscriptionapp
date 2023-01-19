import React,{Fragment} from 'react';
import "./Sidebar.css";
import {Dashboard,VerifiedUser,Add,RemoveRedEyeOutlined} from "@mui/icons-material"
import {Link} from "react-router-dom"

const Sidebar = () => {
  return (
    <Fragment>
        <div className="sidebarcontainer">
            <p><Dashboard/><Link to={`/admin/dashboard`}>Dashboard</Link></p>
            <p><Add/><Link to={`/admin/createcourse`}>Create Course</Link></p>
            <p><RemoveRedEyeOutlined/><Link to={`/admin/courses`}>Couses</Link></p>
            <p><VerifiedUser/><Link to={`/admin/users`}>Users</Link></p>

        </div>
    </Fragment>
  )
}

export default Sidebar