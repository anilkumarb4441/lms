import {OPEN_INVOICE} from  './actionTypes'
import {CLOSE_INVOICE} from  './actionTypes'
import {SET_STATUS} from './actionTypes'


export const openBooking =(rowObj)=>{
    return {
        type :OPEN_INVOICE,
        status:rowObj.status,
        title:`Booking Id ${rowObj.orderId}`
    }
}

export const closeBooking =()=>{
    return {
        type :CLOSE_INVOICE,
        status:'',
        title:'Booking'
    }
}

export const setStatus = (status)=>{
    return {
        type:SET_STATUS,
        status:status
    }
}