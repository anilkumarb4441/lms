import localStorageService from "../../utils/localStorageService";
import * as actionTypes from "./actionTypes";

export const initialState = {
  openInner: false,
  openForm: false,
  openAssignModal: false,
  filter: {
    mainFilter: "pending",
    subFilter: "todayLeads",
    subMostFilter: "all",
    pageRows: 10,
    pageNumber: 1,
    searchData: "",
    range:null
  },
  mainFilter: "pending",
  subFilter: "todayLeads",
  subMostFilter: "all",
  title: "",
  formHeading: "",
  formData: [],
  rowObj: null,
  assignType: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FILTER:
      return { ...state, filter: action.filter };

    case actionTypes.OPEN_INNER:
      return {
        ...state,
        openInner: true,
        title: action.title,
        rowObj:action.rowObj,
      };

    case actionTypes.CLOSE_INNER:
      return {
        ...state,
        openInner: false,
        title: "",
        rowObj:null,
      };

    case actionTypes.EDIT_LEAD:
      return {
        ...state,
        formHeading: "Edit Lead",
        openForm: true,
        formData: action.formData,
      };

    case actionTypes.ADD_LEAD:
      return {
        ...state,
        formHeading: "Add Lead",
        openForm: true,
        formData: action.formData,
      };

    case actionTypes.UPDATE_CALL_RESPONSE:
      return {
        ...state,
        formHeading: "Update Call",
        formData: action.formData,
        openForm: true,
      };

 

    case actionTypes.ASSIGN_LEAD:
      return {
        ...state,
        openAssignModal: true,
        assignType: action.assignType,
        rowObj: action.rowObj,
      };

    case actionTypes.CLOSE_ASSIGN_MODAL:
      return {
        ...state,
        openAssignModal: false,
        assignType: "",
        rowObj: null,
      };

    case actionTypes.CLOSE_FORM:
      return {
        ...state,
        formHeading: "",
        openForm: false,
        formData: [],
      };

    case actionTypes.CHANGE_INPUT:
      return {
        ...state,
        formData: action.formData,
      };

    case actionTypes.SET_DEFAULT_STATE:
      return { ...initialState, filter: { ...initialState.filter } };

    default:
      return { ...initialState, filter: { ...initialState.filter } };
  }
};

export default reducer;
