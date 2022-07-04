import * as actionTypes from "./actionTypes";

// action to set Default State
export const setDefaultState = () => {
  return { type: actionTypes.SET_DEFAULT_STATE };
};

//action to open leadInner
export const openInner = (rowObj) => {
  return {
    type: actionTypes.OPEN_INNER,
    title: `Lead Id ${rowObj.leadId}`,
  };
};

// action to close leadInner
export const closeInner = () => {
  return {
    type: actionTypes.CLOSE_INNER,
  };
};

// action to set lead gen
export const setLeadGen = (leadGen) => {
  return {
    type: actionTypes.SET_LEAD_GEN,
    leadGen: leadGen,
  };
};

// action to handle MainTab Click
export const handleMainTab = (item) => {
  return {
    type: actionTypes.HANDLE_MAIN_TAB,
    mainLeadTab: item.value,
  };
};

// action to handle subTab Click
export const handleSubTab = (item) => {
  return {
    type: actionTypes.HANDLE_SUB_TAB,
    subLeadTab: item.value,
  };
};


//action to add Lead
export const addLead = (formData) => {
    return {
      type: actionTypes.ADD_LEAD,
      formData: formData,
    };
  };


//action to edit Lead
export const editLead = (rowData, formData) => {
  let newRowData = { ...rowData };
   let keys = formData.reduce((prev,current)=>{
       return [...prev,current.name]
   },[]).filter(k=>(k!=='source'&&k!=='isCampaign'));
  let newArr = [{ name: "leadId", value: rowData.leadId }];
  formData.forEach((obj) => {
    let newObj = { ...obj };
    let keyFound = keys.find((key) => key===obj.name);
    if(keyFound) {newObj.value = newRowData[keyFound];
        newArr = [...newArr, newObj];
    }else{
        return
    }   
  });
  return {
    type: actionTypes.EDIT_LEAD,
    formData: newArr,
  };
};



// Update Call Response
export const updateCallResponse = (rowData, formData) => {
  let newRowData = {
    status: rowData.callLogs?.status,
    response: rowData.callLogs?.response,
  };
  let keys = Object.keys(newRowData);
  let newArr = [
  { name: "leadId", value: rowData.leadId },
  { name: "referenceId", value: rowData.referenceId }
];
  formData.forEach((obj) => {
    let newObj = { ...obj };
    let keyFound = keys.find((key) => key === obj.name);
    if(keyFound) {newObj.value = newRowData[keyFound];
        newArr = [...newArr, newObj];
    }else{
        return
    }  
  });
  return {
    type: actionTypes.UPDATE_CALL_RESPONSE,
    formData:newArr
  };
};

//action to assign lead
export const assignLead = (rowObj,assignType) => {
  return {
    type: actionTypes.ASSIGN_LEAD,
    assignType:assignType,
    rowObj: rowObj,
  };
};

//action to close assign modal
export const closeAssignModal = () => {
  return {
    type: actionTypes.CLOSE_ASSIGN_MODAL,
  };
};

//action to open bulk Modal
export const openBulkModal = () => {
  return {
    type: actionTypes.OPEN_BULK_MODAL,
  };
};

//action to close bulk Modal
export const closeBulkModal = () => {
  return {
    type: actionTypes.CLOSE_BULK_MODAL,
  };
};

//action to open Form
export const openForm = () => {
  return {
    type: actionTypes.OPEN_FORM,
    openForm: true,
  };
};

//action to close Form
export const closeForm = () => {
  return {
    type: actionTypes.CLOSE_FORM,
    openForm: false,
  };
};

//handle Input Change
export const changeInput = (e, i, formData) => {
  let newArr = [...formData];
  let formInput = { ...newArr[i] };
  if (e.target.type === "checkbox") {
    formInput.value = e.target.checked;
  } else {
    formInput.value = e.target.value;
  }
  newArr.splice(i, 1, formInput);
  return {
    type: actionTypes.CHANGE_INPUT,
    formData: newArr,
  };
};

// handle search input change
export const handleSearch = (e) => {
  return {
    type: actionTypes.HANDLE_SEARCH,
    search: e.target.value,
  };
};
