import React, { useEffect, useRef } from "react";
import "./modal.css";
import { IoIosClose } from "react-icons/io";



import Backdrop from "../backdrop/backdrop";

function Modal({
  show,
  title,
  modalClass='',
  handleSaveValue,
  handleSave,
  handleDisplay,
  cancelBtn,
  body,
  bodyClick,
  header
}) {
  const modalRef = useRef();
  const bodyClicked = (event) => {    
  
    if (modalRef.current && modalRef.current.contains(event.target)) {
      return;
    }
    handleDisplay(false);
  };
  useEffect(() => {
   
    if(bodyClick){
      document.body.addEventListener("click", bodyClicked);
    }   
    return () => {
      document.body.removeEventListener("click", bodyClicked);
    };
  }, []);

  return (
    show && (
      <>
        <div className={`modal ${modalClass}`} ref={modalRef}>
          {header && <div className="modalHeader">
            {title&&<div className="modalTitle">{title}</div>}
            <IoIosClose className="modalClose" onClick={() => handleDisplay(false)}/>
          </div>}
          <div className="modalBody"> {body}</div>
         
                {handleSave && (  <div className={`modalFooter`}>
                      
              <button
                onClick={(e) => handleSave(e)}
                style={{ cursor: "pointer" }}
              >
                {handleSaveValue}
              </button>
              {cancelBtn&&<button
                onClick={()=>handleDisplay(false)}
                style={{  cursor: "pointer" }}
              >
                cancel
              </button>}
            
          </div>
          )}
        </div>
        <Backdrop />
      </>
    )
  );
}

export default Modal;
