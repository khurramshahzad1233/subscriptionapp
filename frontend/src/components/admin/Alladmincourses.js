import React,{Fragment,useEffect} from 'react';
import "./Alladmincourses.css";
import {clearerror,deletecourseaction,getallcoursesaction} from "../actions/courseaction"
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert"
import Sidebar from './Sidebar';
import {Delete} from "@mui/icons-material"
import {Link} from "react-router-dom"


const Alladmincourses = () => {
  const dispatch=useDispatch();
  const alert=useAlert();

  const {error,allcourses}=useSelector((state)=>state.allcoursesred);
  const {error:deletecourseerror,isDeleted}=useSelector((state)=>state.deletecoursered)


  
  const deletecoursehandler=async(courseId)=>{
    await dispatch(deletecourseaction(courseId));
    dispatch(getallcoursesaction())

  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearerror())
    };
    if(deletecourseerror){
      alert.error(deletecourseerror);
      dispatch(clearerror())
    };
    if(isDeleted){
      alert.success("course deleted successfully")
    };
    dispatch({type:"DELETE_COURSE_RESET"})


    dispatch(getallcoursesaction())
  },[dispatch,alert,error,deletecourseerror,isDeleted])
  return (
    <Fragment>
      <div className="alladmincoursespage">
        <div className="alladmincoursespagesidebardiv"><Sidebar/></div>
        <h3>All Courses</h3>
        <div className="alladmincoursestablecontainer">
          <table>
            <thead>
              <tr>
              <th>Id</th>
              <th>Poster</th>
              <th>Title</th>
              <th>Category</th>
              <th>Creater</th>
              <th>Views</th>
              <th>Lecture</th>
              <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allcourses.map((item)=>(
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td><img src={item.poster.url} alt="poster avatar"/></td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.createdBy}</td>
                    <td>{item.view}</td>
                    <td>{item.numofvideo}</td>
                    <td>
                      <Link to={`/admin/course/lecture/${item._id}`}>View Lectures</Link>
                      <button onClick={()=>deletecoursehandler(`${item._id}`)}><Delete/></button>
                    </td>
                    
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default Alladmincourses