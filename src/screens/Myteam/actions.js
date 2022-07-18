import * as actionTypes from "./actionTypes"

export const getTeamMember = (userObj)=>{
    
    
     return {
       type:actionTypes.GET_TEAM_MEMBER,
      payload:userObj
     }
}

export const setDefault = ()=>{
    return {
        type:actionTypes.SET_DEFAULT,
    }
}

