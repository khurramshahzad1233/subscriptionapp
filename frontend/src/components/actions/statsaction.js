import axios from "axios"

export const getdashboardstatsaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"DASHBOARD_STATS_REQUEST"})
        
        const config={
            withCredentials:true,
        };

        const {data}=await axios.get(`/api/stats/admin/dashboard`,config);

        dispatch({
            type:"DASHBOARD_STATS_SUCCESS",
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:"DASHBOARD_STATS_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"})
}