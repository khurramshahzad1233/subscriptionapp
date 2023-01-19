import {createReducer} from "@reduxjs/toolkit"

const contactinitialstate={
    contact:{}
}

export const contactreducer=createReducer(contactinitialstate,{
    CONTACT_REQUEST:(state,action)=>{
        return{
            loading:true,
            contact:{}
        }
    },
    CONTACT_SUCCESS:(state,action)=>{
        return{
            loading:false,
            contact:action.payload.success,
            isSendt:true
        }
    },
    CONTACT_RESET:(state,action)=>{
        return{
            loading:false,
            contact:{},
            isSent:false,
        }

    },
    CONTACT_FAIL:(state,action)=>{
        return{
            loading:false,
            contact:{},
            error:action.payload,
            isSent:false,
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