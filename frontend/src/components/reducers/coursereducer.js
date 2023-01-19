import {createReducer} from "@reduxjs/toolkit"

const createcourseinitialstate={
    createcourse:{}
};

export const admincreatecoursereducer=createReducer(createcourseinitialstate,{
    ADMIN_CREATE_COURSE_REQUEST:(state,action)=>{
        return{
            loading:true,
            createcourse:{}
        }
    },
    ADMIN_CREATE_COURSE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            createcourse:action.payload.success,
            isCreated:true,
        }
    },
    ADMIN_CREATE_COURSE_FAIL:(state,action)=>{
        return{
            loading:false,
            createcourse:{},
            error:action.payload,
            isCreated:false,
        }
    },
    ADMIN_CREATE_COURSE_RESET:(state,action)=>{
        return{
            loading:false,
            ...state,
            isCreated:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});


const addvideolectureinitialstate={
    createlecture:{}
};
export const addvideolecturereducer=createReducer(addvideolectureinitialstate,{
    ADD_VIDEO_LECTURE_REQUEST:(state,action)=>{
        return{
            loading:true,
            createlecture:{}
        }
    },
    ADD_VIDEO_LECTURE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            createlecture:action.payload.success,
            isCreated:true,
        }
    },
    ADD_VIDEO_LECTURE_FAIL:(state,action)=>{
        return{
            loading:false,
            createlecture:{},
            error:action.payload,
            isCreated:false,

        }
    },
    ADD_VIDEO_LECTURE_RESET:(state,action)=>{
        return{
            ...state,
            isCreated:false,
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

const allcoursesinitialstate={
    allcourses:[]
};
export const allcoursesreducer=createReducer(allcoursesinitialstate,{
    ALL_COURSES_REQUEST:(state,action)=>{
        return{
            loading:true,
            allcourses:[]
        }
    },
    ALL_COURSES_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allcourses:action.payload.allcourse,
        }
    },
    ALL_COURSES_FAIL:(state,action)=>{
        return{
            loading:false,
            allcourses:[],
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


const alllectureinitialstate={
    alllecture:[]
};
export const allvideolecturereducer=createReducer(alllectureinitialstate,{
    ALL_VIDEO_LECTURE_REQUEST:(state,action)=>{
        return{
            loading:true,
            alllecture:[]
        }
    },
    ALL_VIDEO_LECTURE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            alllecture:action.payload.lecture,
        }
    },
    ALL_VIDEO_LECTURE_FAIL:(state,action)=>{
        return{
            loading:false,
            alllecture:[],
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
});


const deletelectureinitialstate={
    deletelecture:{}
};
export const deletelecturereducer=createReducer(deletelectureinitialstate,{
    DELETE_LECTURE_REQUEST:(state,action)=>{
        return{
            loading:true,
            deletelecture:{}
        }
    },
    DELETE_LECTURE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            deletelecture:action.payload.success,
            isDeleted:true,
        }
    },
    DELETE_LECTURE_FAIL:(state,action)=>{
        return{
            loading:false,
            deletelecture:{},
            isDeleted:false,
            error:action.payload,
        }
    },
    DELETE_LECTURE_RESET:(state,action)=>{
        return{
            loading:false,
            isDeleted:false,
            deletelecture:{}
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
});


const deletecourseinitialstate={
    deletecourse:{}
};
export const deletecoursereducer=createReducer(deletecourseinitialstate,{
    DELETE_COURSE_REQUEST:(state,action)=>{
        return{
            loading:true,
            deletecourse:{}
        }
    },
    DELETE_COURSE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            deletecourse:action.payload.success,
            isDeleted:true,
        }
    },
    DELETE_COURSE_FAIL:(state,action)=>{
        return{
            loading:false,
            deletecourse:{},
            isDeleted:false,
            error:action.payload,
        }
    },
    DELETE_COURSE_RESET:(state,action)=>{
        return{
            loading:false,
            isDeleted:false,
            deletecourse:{},
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
});


const courselectureinitialstate={
    alllecture:{}
};
export const courselecturereducer=createReducer(courselectureinitialstate,{
    COURSE_LECTURE_REQUEST:(state,action)=>{
        return{
            loading:true,
            alllecture:{}
        }
    },
    COURSE_LECTURE_SUCCESS:(state,action)=>{
        return{
            loading:false,
            alllecture:action.payload.lecture,
        }
    },
    COURSE_LECTURE_FAIL:(state,action)=>{
        return{
            loading:false,
            alllecture:{},
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
