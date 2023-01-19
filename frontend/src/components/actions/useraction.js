import axios from "axios"

export const registeruseraction=(userdata)=>async(dispatch)=>{
    try {
        dispatch({
            type:"REGISTER_USER_REQUEST",
        });
        const config={
            headers:{
                "content-type":"multipart/form-data"
            },
            withCredentials:true,
        };
        
        const {data}=await axios.post(`/api/user/new`,userdata,config);
        

        dispatch({
            type:"REGISTER_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"REGISTER_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const clearerror=()=>async(dispatch)=>{
    dispatch({
        type:"CLEAR_ERROR"
    })
};


export const loginuseraction=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:"LOGIN_USER_REQUEST"});

        const config={
            headers:{
                "content-type":"application/json"
            }
        };

        const {data}=await axios.post(`/api/user/login`,{email,password},config)
        dispatch({
            type:"LOGIN_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOGIN_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }
};

export const loaduseraction=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LOAD_USER_REQUEST"
        });
        const {data}=await axios.get(`/api/user/me`);
        dispatch({
            type:"LOAD_USER_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"LOAD_USER_FAIL",
            payload:error.response.data.message,
        })
        
    }

};


export const updateprofileavatar=(avatardata)=>async(dispatch)=>{
    try {
        dispatch({
            type:"UPDATE_AVATAR_REQUEST",
        });
        const config={
            headers:{
                "content-type":"multipart/form-data"
            },
            withCredentials:true,
        };
        const {data}=await axios.put(`/api/user/avatar/update`,avatardata,config);

        dispatch({
            type:"UPDATE_AVATAR_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"UPDATE_AVATAR_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const addtoplaylistaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"ADD_TO_PLAYLIST_REQUEST"});
        const config={
            headers:{"content-type":"application/json"},
            withCredentials:true,
        };
        const {data}=await axios.post(`/api/user/addtoplaylist`,{id},config);

        dispatch({
            type:"ADD_TO_PLAYLIST_SUCCESS",
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:"ADD_TO_PLAYLIST_FAIL",
            payload:error.response.data.message,
        })
        
    }
};


export const removefromplaylistaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"REMOVE_FROM_PLAYLIST_REQUEST"});

        const config={
            withCredentials:true,
        };
        const {data}=await axios.delete(`/api/user/removefromplaylist?id=${id}`,config);

        dispatch({
            type:"REMOVE_FROM_PLAYLIST_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"REMOVE_FROM_PLAYLIST_FAIL",
            payload:error.response.data.message,
        })
        
    }
}