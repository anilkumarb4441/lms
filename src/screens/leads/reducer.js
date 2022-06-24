import * as actionTypes from "./actionTypes";

const initialState = {
  openInner: false,
  openModal:false,
  mainLeadTab:'openLeads',
  subLeadTab:'todayLeads',
  status: "hotLead",
  title: "Leads",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_MAIN_TAB:
       return{
         ...state,
         mainLeadTab:action.mainLeadTab
       }
    case actionTypes.HANDLE_SUB_TAB:
       return{  ...state,
          subLeadTab:action.subLeadTab
        }
      
    case actionTypes.OPEN_INNER:
      return {
        ...state,
        openInner: true,
        status: action.status,
        title: action.title,
      };
    case actionTypes.CLOSE_INNER:
      return initialState;
    case actionTypes.SET_STATUS:
      return { ...state, status: action.status };
    default:
      return initialState;
  }
};

export default reducer;
