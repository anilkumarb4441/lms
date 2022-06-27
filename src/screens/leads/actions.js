import * as actionTypes from "./actionTypes"




//action to open leadInner
export const openInner =(rowObj)=>{
    return {
        type :actionTypes.OPEN_INNER,
        status:rowObj.status,
        title:`Lead Id ${rowObj.leadId}`
    }
}

// action to close leadInner
export const closeInner =()=>{
    return {
        type :actionTypes.CLOSE_INNER,
        status:'',
        title:'Booking'
    }
}

// action to set lead status
export const setStatus = (status)=>{
    return {
        type:actionTypes.SET_STATUS,
        status:status
    }
}

// action to handle MainTab Click
export const handleMainTab = (item)=>{
    return{
        type:actionTypes.HANDLE_MAIN_TAB,
        mainLeadTab:item.value
    }
}

// action to handle subTab Click
export const handleSubTab = (item)=>{
    return{
        type:actionTypes.HANDLE_SUB_TAB,
        subLeadTab:item.value
    }
}

//action to edit Lead
export const editLead = (rowData,formData)=>{
    let newRowData = {...rowData}
    let keys = Object.keys(rowData)
    let newArr = [{name:'leadId',value:rowData.leadId}];
    formData.forEach(obj=>{
          let newObj = {...obj}
          let keyFound = keys.find(key=>key===obj.name)
          newObj.value = newRowData[keyFound]
          newArr = [...newArr,newObj]
        })
    return{
        type:actionTypes.EDIT_LEAD,
        formData:newArr
    }
}

//action to add Lead
export const addLead = (formData)=>{
    return{
        type:actionTypes.ADD_LEAD, 
        formData:formData
   }
}

//action to assign lead
export const assignLead = (rowObj)=>{
    return{
        type:actionTypes.ASSIGN_LEAD,
        rowObj:rowObj
    }
}

//action to close assign modal
export const closeAssignModal = ()=>{
    return {
        type:actionTypes.CLOSE_ASSIGN_MODAL
    }
}

//action to open Form
export const openForm = ()=>{
    return{
        type:actionTypes.OPEN_FORM,
        openForm:true
    }
}

//action to close Form
export const closeForm = ()=>{
    return{
        type:actionTypes.CLOSE_FORM,
        openForm:false
    }
}

 //handle Input Change
 export const changeInput = (e,i,formData)=>{
    let newArr = [...formData];
    let formInput = { ...newArr[i] };
    formInput.value = e.target.value;
    newArr.splice(i, 1, formInput);
    return {
        type:actionTypes.CHANGE_INPUT,
        formData:newArr
    }
  }