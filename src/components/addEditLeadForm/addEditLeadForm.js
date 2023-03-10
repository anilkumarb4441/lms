import React,{useState,useEffect} from "react";
import "./addEditLeadForm.css";
import Modal from "../modal/modal";
import Input from "../Input";
import Loader from "../loader/loader";
import * as utils from "../../utils/constants"
import { useSelector } from "react-redux";

function AddEditLeadForm({
  show,
  handleDisplay,
  submitForm,
  handleInputChange,
  formData,
  heading,
  loading
}) 
   
{
 
  //this will come only for update call response form
  const [callResponse,setCallResponse] = useState()
 const subFilter = useSelector(state => state.leads.filter.subFilter)
  useEffect(()=>{
    // function to display call response message while updating call status
    let callStatus = formData?.find(obj=>obj.name==="status")?.value
    let callResponseMessage = utils.callResponseArr.find(val=>val.name===callStatus)?.value 
    setCallResponse(callResponseMessage)
  },[formData])
 
  return (
    <Modal
      title={heading}
      header={true}
      modalClass="addLeadModal"
      show={show}
      handleDisplay={handleDisplay}
      body={loading?<Loader/>:
        <div className="addLead">
          <div className="addLeadCol1">
          
            <form
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              <div>
                {/* Displaying Call Response Message  while Updating call status */}
               {subFilter!=="preRegistration" &&callResponse && <p className = "callresponse">Info: This lead will be moving to {callResponse}</p>}
              
                {formData &&
                  formData.map((item, i) => {
                    return (
                      <Input
                        {...item}
                        inputClass="addLeadInput"
                        key={i}
                         change={(e) => handleInputChange(e, i)}
                      />
                    );
                  })}
              </div>
              <div className = "modalFooter">
              <button className = "cancelBtn" onClick = {(e)=>{
                e.preventDefault();
                handleDisplay(false);
              }} type ='button'>Cancel</button>
              <button className="saveBtn" type="submit">
                Save
              </button>
            
              </div>   
            </form>
          </div>
        </div>
      }
    />
  );
}

export default AddEditLeadForm;
