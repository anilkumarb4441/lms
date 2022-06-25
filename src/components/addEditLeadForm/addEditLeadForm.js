import React from "react";
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
}) {
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
                {formData &&
                  formData.map((item, i) => {
                    return (
                      <Input
                        {...item}
                        required={true}
                        inputClass="addLeadInput"
                        key={i}
                         change={(e) => handleInputChange(e, i)}
                      />
                    );
                  })}
              </div>
              <button className="saveBtn" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      }
    />
  );
}

export default AddEditLeadForm;
