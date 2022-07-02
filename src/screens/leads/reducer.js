import * as actionTypes from "./actionTypes";

const initialState = {
  openInner: false,
  openForm: false,
  openAssignModal:false,
  openBulkModal:false,
  filter:{mainLeadTab:'pending',subLeadTab:'todayLeads',leadGen:'all'},
  mainLeadTab: "pending",
  subLeadTab: "todayLeads",
  leadGen: "all",
  title: "Leads",
  search:'',
  formHeading:'',
  formData:[],
  rowObj:null,
  assignType:''
};

const reducer = (state = initialState, action) => {
  let defaultFilter = {...initialState.filter}
  switch (action.type) {
    case actionTypes.HANDLE_MAIN_TAB:
      return {
        ...state,
        filter:{mainLeadTab:action.mainLeadTab, subLeadTab: "todayLeads",leadGen:'all'},
      };

    case actionTypes.HANDLE_SUB_TAB:
      return { ...state,filter:{...state.filter,subLeadTab:action.subLeadTab}};

    case actionTypes.OPEN_INNER:
      return {
        ...state,
        openInner: true,
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

    case  actionTypes.UPDATE_CALL_RESPONSE:
      return {
        ...state,
           formHeading:"Update Call",
           formData:action.formData,
           openForm:true
      }
    
    case actionTypes.OPEN_BULK_MODAL:   
      return{
       ...state,
       openBulkModal:true,
      } 
      
    case actionTypes.CLOSE_BULK_MODAL:   
      return{
       ...state,
       openBulkModal:false,
      }   
    
    case actionTypes.ASSIGN_LEAD:
      return {
        ...state,
        openAssignModal:true,
        assignType:action.assignType,
        rowObj:action.rowObj

      }

    case actionTypes.CLOSE_ASSIGN_MODAL:
      return{
        ...state,
        openAssignModal:false,
        assignType:'',
        rowObj:null
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

    case actionTypes.SET_LEAD_GEN:
      return { ...state, filter:{...state.filter,leadGen: action.leadGen}};
    
    case actionTypes.HANDLE_SEARCH:
      return {...state, search:action.search}

    case actionTypes.SET_DEFAULT_STATE:
        return {...initialState,filter:defaultFilter}  
   
    default:
      return {...initialState,filter:defaultFilter}
  }
};

export default reducer;
