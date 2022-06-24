import * as actionTypes from "./actionTypes"

//action to open leadInner
export const openBooking =(rowObj)=>{
    return {
        type :actionTypes.OPEN_INVOICE,
        status:rowObj.status,
        title:`Booking Id ${rowObj.leadId}`
    }
}

// action to close leadInner
export const closeBooking =()=>{
    return {
        type :actionTypes.CLOSE_INVOICE,
        status:'',
        title:'Booking'
    }
}

// action to set lead status
export const setStatus = (status)=>{
    return {
        type:actionTypes.SET_STATUS,
        status:status
    }
}

// action to handle MainTab Click
export const handleMainTab = (item)=>{
    return{
        type:actionTypes.HANDLE_MAIN_TAB,
        mainLeadTab:item.value
    }
}

// action to handle subTab Click
export const handleSubTab = (item)=>{
    return{
        type:actionTypes.HANDLE_SUB_TAB,
        subLeadTab:item.value
    }
}

//action to Edit Lead
export const editLead = (row)=>{
    
}