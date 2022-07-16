import * as actionTypes from "./actionTypes"

export const getTeamMember = (userObj)=>{
    debugger;
     let {userId,name} = userObj
     return {
       type:actionTypes.GET_TEAM_MEMBER,
      payload:{userId,name}
     }
}

export const setDefault = ()=>{
    return {
        type:actionTypes.SET_DEFAULT,
    }
}