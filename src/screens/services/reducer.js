import React from "react";
import { CLOSE_REVIEWS, OPEN_REVIEWS ,SET_FORM_MODAL,ON_LOAD} from "./actionTypes";

const initialState = {
    openReview: false,
    openServiceForm:false ,
    heading:'Services',
    serviceType:'Occasion',
    
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_REVIEWS:
      return {
        ...state,
        openReview: true,
        heading:action.heading
      
      };
    case CLOSE_REVIEWS:
        return {...state,openReview:false,heading:action.heading}; 
    case SET_FORM_MODAL:
        return {...state,openServiceForm:action.openServiceForm}; 
     case ON_LOAD:
         return initialState    
    default:
      return initialState;
  }
};

export default reducer;
