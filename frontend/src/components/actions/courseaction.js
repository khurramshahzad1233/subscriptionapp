import axios from "axios";

export const admincreatecourseaction=(coursedata)=>async(dispatch)=>{
    try {
        dispatch({type:"ADMIN_CREATE_COURSE_REQUEST"});
        const config={
            headers:{
                "content-type":"multipart/form-data"
            },
            withCredentials:true,
        };
        const {data}=await axios.post(`/api/admin/course/new`,coursedata,config);

        dispatch({
            type:"ADMIN_CREATE_COURSE_SUCCESS",
            payload:data,
        });
        
    } catch (error) {
        dispatch({
            type:"ADMIN_CREATE_COURSE_FAIL",
            payload:error.response.data.message,
        })
        
    }
}


export const clearerror=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR"
    })
};

export const addvideolectureaction=(id,formdata)=>async(dispatch)=>{
    try {
        dispatch({type:"ADD_VIDEO_LECTURE_REQUEST"});
        const config={
            headers:{
                "content-type":"multipart/form-data"
            },
            withCredentials:true,
        };
        const {data}=await axios.post(`/api/admin/lecture/add/${id}`,formdata,config);
        dispatch({
            type:"ADD_VIDEO_LECTURE_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ADD_VIDEO_LECTURE_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const getallcoursesaction=(keyword="",category="")=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_COURSES_REQUEST"});

        let link=`/api/courses/all?keyword=${keyword}`;

        if(category){
            category && 
            category==="all"?(
                link=`/api/courses/all?keyword=${keyword}`
            ):(link=`/api/courses/all?keyword=${keyword}&category=${category}`)
        }
        const {data}=await axios.get(link);

        dispatch({
            type:"ALL_COURSES_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_COURSES_FAIL",
            paylaod:error.response.data.message,
        })
        
    }
};


export const getallvideolectureaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_VIDEO_LECTURE_REQUEST"});
        const {data}=await axios.get(`/api/course/lecture/${id}`)
        

        dispatch({
            type:"ALL_VIDEO_LECTURE_SUCCESS",
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:"ALL_VIDEO_LECTURE_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const deletelectureaction=(courseId,lectureId)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_LECTURE_REQUEST"});
        const config={
            withCredentials:true,
        };
        const {data}=await axios.delete(`/api/course/lecture?courseId=${courseId}&lectureId=${lectureId}`,config);

        dispatch({
            type:"DELETE_LECTURE_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_LECTURE_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const deletecourseaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"DELETE_COURSE_REQUEST"});
        const config={
            withCredentials:true,
        };
        const {data}=await axios.delete(`/api/course/${id}`,config);

        dispatch({
            type:"DELETE_COURSE_SUCCESS",
            payload:data.success,
        })
        
    } catch (error) {
        dispatch({
            type:"DELETE_COURSE_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const courselectureaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"COURSE_LECTURE_REQUEST"});
        const config={
            withCredentials:true,
        };
        const {data}=await axios.get(`/api/course/lecture/${id}`,config);

        dispatch({
            type:"COURSE_LECTURE_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"COURSE_LECTURE_FAIL",
            paylaod:error.response.data.message,
        })
        
    }
}