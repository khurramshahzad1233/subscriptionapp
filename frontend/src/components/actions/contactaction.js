import axios from "axios";

export const contactaction=(name,email,message)=>async(dispatch)=>{
    try {
        dispatch({type:"CONTACT_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            },
            withCredentials:true,
        };
        const {data}=await axios.post(`/api/contact`,{name,email,message},config);
        

        dispatch({
            type:"CONTACT_SUCCESS",
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:"CONTACT_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const clearerror=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR"
    })
}