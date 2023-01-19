import React,{Fragment,useState,useEffect} from 'react';
import "./Courses.css"
import {getallcoursesaction,clearerror} from "../actions/courseaction";
import {useDispatch,useSelector} from "react-redux";
import { useAlert } from 'react-alert';
import Singlecourse from './Singlecourse';

const Courses = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {allcourses,error}=useSelector((state)=>state.allcoursesred)

    const [keyword,setKeyword]=useState("")
    const [category,setCategory]=useState("")
    const categories=[
        "all",
        "web development",
        "artificial intelligence",
        "data structure and algorithm",
        "app development",
        "data science",
        "game development"
    ];

    
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearerror())
        }

        dispatch(getallcoursesaction(keyword,category))
    },[alert,dispatch,error,keyword,category])
  return (
    <Fragment>
        <div className="coursescontainer">
            <h3>All Courses</h3>
            
            <input type="text"
                required
                placeholder='Search a Course ...'
                value={keyword}
                onChange={(e)=>setKeyword(e.target.value)}
                
                />
                
           
            <div className="categorydiv">
                {
                    categories.map((category)=>(
                        <div key={category }
                        onClick={()=>setCategory(category)}
                        >{category}</div>
                    ))
                }
            </div>


                
            

        </div>
        <div className="allcoursescontainer">{
            allcourses.length>0?(
                allcourses.map((course)=>(<Singlecourse 
                key={course._id}
                id={course._id}
                title={course.title}
                description={course.description}
                view={course.view}
                poster={course.poster.url}
                numofvideo={course.numofvideo}
                createdBy={course.createdBy}
                

                />))
                
            ):(
                <div>Courses not found</div>
            )
        }</div>
        
    </Fragment>
  )
}

export default Courses