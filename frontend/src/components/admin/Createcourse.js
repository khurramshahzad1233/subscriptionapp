import React,{Fragment,useState,useEffect} from 'react';
import "./Createcourse.css"
import Sidebar from './Sidebar';
import {clearerror,admincreatecourseaction} from "../actions/courseaction";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert"

const Createcourse = () => {

    const dispatch=useDispatch();
    const alert=useAlert();

    const {error,isCreated}=useSelector((state)=>state.admincreatecoursered)

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [createdBy,setCreatedBy]=useState("");
    const [image,setImage]=useState("");
    const [imagepreview,setImagepreview]=useState("");
 

    const categories=[
        "web development",
        "artificial intelligence",
        "data structure and algorithm",
        "app development",
        "data science",
        "game development",
    ];

    const createcourseimagehandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setImagepreview(reader.result);
            setImage(file)
        }

        
    }

    const createcoursesubmithandler=(e)=>{
        e.preventDefault();

        const myform=new FormData();
        myform.append("title",title);
        myform.append("description",description);
        myform.append("category",category);
        myform.append("createdBy",createdBy)
        myform.append("file",image);

        dispatch(admincreatecourseaction(myform))


    }

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearerror())
        }
        if(isCreated){
            alert.success("Course Created Successfully");
            dispatch({type:"ADMIN_CREATE_COURSE_RESET"})
        }

    },[error,dispatch,alert,isCreated])
  return (
    <Fragment>
        <div className="sidebardiv"><Sidebar/></div>
        <div className="createcoursepage">
            <div className="createcoursecontainer">
                <h4>CREATE COURSE</h4>
                <form
                onSubmit={createcoursesubmithandler}
                encType="multipart/form-data"
                >
                    <p>
                        <input type="text"
                        required
                        placeholder='Title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                    </p>
                    <p>
                        <input type="text"
                        required
                        placeholder='Description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        />
                    </p>
                    <p>
                        <select onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((category)=>(
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </p>
                    <p>
                        <input type="text"
                        required
                        placeholder='Creater Name'
                        value={createdBy}
                        onChange={(e)=>setCreatedBy(e.target.value)}
                        />
                    </p>
                    <div>
                        <input type="file"
                        required
                        accept='image/*'
                        onChange={createcourseimagehandler}
                        />
                        <div className="createcourseimage">
                        {
                            imagepreview &&(
                                <img src={imagepreview} alt="createcourse avatar"/>
                            )
                        }
                        </div>
                        
                    </div>
                    <p>
                        <input type="submit"
                        value="Create Course"
                        />
                    </p>


                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Createcourse