import * as actionTypes from './actionTypes';

export const getFunnelLeads = (userObj)=>{
    console.log(userObj, 'obj')
    return {
        type:actionTypes.GET_FUNNEL_LEADS,
        paylaod:userObj,
    }
}