import {configureStore} from "@reduxjs/toolkit"
import { contactreducer } from "./components/reducers/contactreducer";
import { addvideolecturereducer, admincreatecoursereducer, allcoursesreducer,allvideolecturereducer, courselecturereducer, deletecoursereducer, deletelecturereducer } from "./components/reducers/coursereducer";
import { statsreducer } from "./components/reducers/statsreducer";
import { addtoplaylistreducer, removefromplaylistreducer, updateprofilereducer, userreducer } from "./components/reducers/userreducer";
const store=configureStore({
    reducer:{
        userred:userreducer,
        updateprofilered:updateprofilereducer,
        admincreatecoursered:admincreatecoursereducer,
        addvideolecturered:addvideolecturereducer,
        allcoursesred:allcoursesreducer,
        allvideolecturered:allvideolecturereducer,
        deletelecturered:deletelecturereducer,
        deletecoursered:deletecoursereducer,
        addtoplaylistred:addtoplaylistreducer,
        removefromplaylistred:removefromplaylistreducer,
        courselecturered:courselecturereducer,
        statsred:statsreducer,
        contactred:contactreducer,
        
    }

});

export default store;