import * as actionTypes from "./actionTypes";
import * as utils from "../../utils/constants"

// action to set Default State
export const setDefaultState = () => {
  return { type: actionTypes.SET_DEFAULT_STATE };
};

//action to open leadInner
export const openInner = (rowObj) => {
  return {
    type: actionTypes.OPEN_INNER,
    rowObj: rowObj,
    title: `Lead Id ${rowObj.leadId}`,
  };
};

// action to close leadInner
export const closeInner = () => {
  return {
    type: actionTypes.CLOSE_INNER,
  };
};

// action to set all filter values
export const setFilter = (filter) => {
   

  return { type: actionTypes.SET_FILTER, filter: { ...filter} };
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
  let keys = formData
    .reduce((prev, current) => {
      return [...prev, current.name];
    }, [])
    .filter((k) => k !== "source" && k !== "isCampaign");
  let newArr = [{ name: "leadId", value: rowData.leadId }];
  formData.forEach((obj) => {
    let newObj = { ...obj };
    let keyFound = keys.find((key) => key === obj.name);
    if (keyFound) {
      newObj.value = newRowData[keyFound];
      newArr = [...newArr, newObj];
    } else {
      return;
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
    status: rowData.callLogs?.status
  };
  let keys = Object.keys(newRowData);
  let newArr = [
    { name: "leadId", value: rowData.leadId },
    { name: "referenceId", value: rowData.referenceId },
    { name: "response", value: rowData.callLogs?.response },
  ];
  formData.forEach((obj) => {
    let newObj = { ...obj };
    let keyFound = keys.find((key) => key === obj.name);
    if (keyFound) {
      newObj.value = newRowData[keyFound];
      newArr = [...newArr, newObj];
    } else {
      return;
    }
  });
  return {
    type: actionTypes.UPDATE_CALL_RESPONSE,
    formData: newArr,
  };
};


//action to assign lead
export const assignLead = (rowObj, assignType) => {
  return {
    type: actionTypes.ASSIGN_LEAD,
    assignType: assignType,
    rowObj: rowObj,
  };
};

//action to close assign modal
export const closeAssignModal = () => {
  return {
    type: actionTypes.CLOSE_ASSIGN_MODAL,
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

// handle  Input Change for update call response,add,edit forms
export const changeInput = (e, i, formData) => {
  let newArr = [...formData];
  let formInput = { ...newArr[i] };
   
  // attaching call response for change in call status
  if(e.target.name==="status"){
   
    // finding index of call Response Object
    let responseIndex = newArr.findIndex(obj=>obj.name==="response")
   
    // getting call response message based on call statu
    let callResponseMessage = utils.callResponseArr.find(val=>val.name===e.target.value)?.value 
   
    // updating call response message
    newArr.splice(responseIndex, 1, {name:'response',value:callResponseMessage});
  }

  // for checkboxes
  if (e.target.type === "checkbox") {
    formInput.value = e.target.checked;
   
  } else  {
    formInput.value = e.target.value;
  }

  // replacing old input value with new input value
  newArr.splice(i, 1, formInput);
 
  return {
    type: actionTypes.CHANGE_INPUT,
    formData: newArr,
  };
};

