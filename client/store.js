import {createStore} from "redux"

import { combineReducers } from "redux"

const postInput = {
  text : "",
  image : ""

}


const user_basic_details = {
    user_name : "",
    user_id : "",
    followers : "",
    following : "",
    posts_count:  "",
    description : "",
    education : "",
    job : "",
    posts : [],
    profileImg:"",
    user_join: ""

}



const UserUpdateDetails = (state = user_basic_details , action) =>{
    switch (action.type){
        case  "SETUSERBASICDETAILS" : 
            return {
                ...state,
                user_name : action.payload.user_name,
                user_id : action.payload.user_id,
                followers :action.payload.followers,
                following : action.payload.following,
                posts_count: action.payload.posts_count,
                location : action.payload.location,
                education : action.payload.education,
                job : action.payload.job,
                posts : action.payload.posts,
                user_join : action.payload.user_join,
                profileImg : action.payload.profileImg
            } 
    
        default : 
           return state
    }
}


const postInputReducer = (state= postInput , action)=>{
switch (action.type){
    case  "SELECTEDPOSTDATA" : 
        return {
            ...state,
            text : action.payload.text,
            image : action.payload.image
        }

    default : 
       return state
}
}

const rootReducer = combineReducers({
    postInputReducer,
    UserUpdateDetails
})

export const store = createStore(rootReducer)

