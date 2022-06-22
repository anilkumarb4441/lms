import { CLOSE_REVIEWS, OPEN_REVIEWS, SET_FORM_MODAL } from "./actionTypes"



export const openReviews = (str)=>{
    return {
        type:OPEN_REVIEWS,
        heading:`Reviews and Ratings (${str})`
    }
}


export const closeReviews = ()=>{
    return {
        type:CLOSE_REVIEWS,
        heading:'Services'
    }
}

export const setFormModal = (e)=>{
    return {
       type:SET_FORM_MODAL,
       openServiceForm:e
    }
}