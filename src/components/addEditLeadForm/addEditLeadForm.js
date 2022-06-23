import React from "react";
import "./addEditLeadForm.css";
import Modal from "../modal/modal";
import Input from "../Input";

function addEditLeadForm({
  show,
  handleDisplay,
  submitForm,
  handleInputChange,
  formData,
}) {
  return (
    <Modal
      header={false}
      modalClass="addChefModal"
      show={show}
      bodyClick={true}
      handleDisplay={(e) => handleDisplay(e)}
      body={
        <div className="addLead">
          <div className="addLeadCol1">
            <p>Add New Chef</p>
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

export default addEditLeadForm;
