import * as actionTypes from './actionTypes';

export const getFunnelLeads = (userObj)=>{
    return {
        type:actionTypes.GET_FUNNEL_LEADS,
        payload:userObj,
    }
}