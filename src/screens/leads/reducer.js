import * as actionTypes from "./actionTypes";

const initialState = {
  openInner: false,
  openForm: false,
  openAssignModal:false,
  mainLeadTab: "openLeads",
  subLeadTab: "todayLeads",
  status: "hotLead",
  title: "Leads",
  formHeading:'',
  formData:[],
  rowObj:{}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_MAIN_TAB:
      return {
        ...state,
        mainLeadTab: action.mainLeadTab,
        subLeadTab: "todayLeads",
      };

    case actionTypes.HANDLE_SUB_TAB:
      return { ...state, subLeadTab: action.subLeadTab };

    case actionTypes.OPEN_INNER:
      return {
        ...state,
        openInner: true,
        status: action.status,
        title: action.title,
      };

    case actionTypes.CLOSE_INNER:
      return {
        ...state,
        openInner: false,
        title: "Leads",
      };

    case actionTypes.EDIT_LEAD:   
      return{
       ...state,
       formHeading:"Edit Lead",
       openForm:true,
       formData:action.formData
      }
    case actionTypes.ADD_LEAD:   
      return{
       ...state,
       formHeading:"Add Lead",
       openForm:true,
       formData:action.formData
      } 
    
    case actionTypes.ASSIGN_LEAD:
      return {
        ...state,
        openAssignModal:true,
        rowObj:action.rowObj

      }

    case actionTypes.CLOSE_ASSIGN_MODAL:
      return{
        ...state,
        openAssignModal:false,
        rowObj:{}
      }    
    case actionTypes.CLOSE_FORM:   
      return{
       ...state,
       formHeading:"",
       openForm:false,
       formData:[]
      }
    
    case actionTypes.CHANGE_INPUT:
      return{
        ...state,
        formData:action.formData
      }

    case actionTypes.SET_STATUS:
      return { ...state, status: action.status };
    default:
      return initialState;
  }
};

export default reducer;
