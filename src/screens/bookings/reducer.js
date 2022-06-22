import React from "react";
import { CLOSE_INVOICE, OPEN_INVOICE,SET_STATUS } from "./actionTypes";

const initialState = {
  openInvoice: false,
  status: "all",
  title: "Leads",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INVOICE:
      return {
        ...state,
        openInvoice: true,
        status: action.status,
        title: action.title,
      };
    case CLOSE_INVOICE:
      return initialState;
    case SET_STATUS:
      return { ...state, status: action.status };
    default:
      return initialState;
  }
};

export default reducer;
