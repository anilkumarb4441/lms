import React,{useState,useEffect} from "react";
import "./addEditLeadForm.css";
import Modal from "../modal/modal";
import Input from "../Input";

function AddEditLeadForm({
  show,
  handleDisplay,
  submitForm,
  handleInputChange,
  formData,
  heading
}) 
   
{
 
  // this will come only for update call response form
  const [callResponse,setCallResponse] = useState()
 
  useEffect(()=>{
    // function to display call response message while updating call status
    let response = formData?.find(obj=>obj.name==="response")?.value
    setCallResponse(response)
  },[formData])
 
  return (
    <Modal
      title={heading}
      header={true}
      modalClass="addLeadModal"
      show={show}
      handleDisplay={handleDisplay}
      body={
        <div className="addLead">
          <div className="addLeadCol1">
          
            <form
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              <div>
                {/* Displaying Call Response Message  while Updating call status */}
               {callResponse && <p className = "callresponse">Call Response: {callResponse}</p>}
              
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
