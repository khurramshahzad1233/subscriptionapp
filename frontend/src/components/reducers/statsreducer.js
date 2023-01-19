import {createReducer} from "@reduxjs/toolkit"

const statsreducerinitialstate={
    stats:[]
};
export const statsreducer=createReducer(statsreducerinitialstate,{
    DASHBOARD_STATS_REQUEST:(state,action)=>{
        return{
            loading:true,
            stats:[]
        }
    },
    DASHBOARD_STATS_SUCCESS:(state,action)=>{
        return{
            loading:false,
            stats:action.payload.stats,
            usercount:action.payload.usercount,
            viewcount:action.payload.viewcount,
            subscriptioncount:action.payload.subscriptioncount,
            userpercentage:action.payload.userpercentage,
            viewpercentage:action.payload.viewpercentage,
            subscriptionpercentage:action.payload.subscriptionpercentage,
            userprofit:action.payload.userprofit,
            viewprofit:action.payload.viewprofit,
            subscriptionprofit:action.payload.subscriptionprofit,
            createdAt:action.payload.stats[11].createdAt,
           
        }
    },
    DASHBOARD_STATS_FAIL:(state,action)=>{
        return{
            loading:false,
            stats:[],
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
   
})