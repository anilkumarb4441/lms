import React, { useEffect, useRef } from "react";
import "./modal.css";
import { IoIosClose } from "react-icons/io";



import Backdrop from "../backdrop/backdrop";

function Modal({
  show,
  title,
  modalClass='',
  handleDisplay,
  body,
  bodyClick,
  header
}) {
  const modalRef = useRef();
  const bodyClicked = (event) => {    
    if (modalRef.current && modalRef.current.contains(event.target)) {
      return;
    }
   closeModal()
  };
  useEffect(() => {
   
    if(bodyClick){
      document.body.addEventListener("click", bodyClicked,true);
    }   
    return () => {
      document.body.removeEventListener("click", bodyClicked);
    };
  }, []);

  const closeModal =  ()=>{
    setTimeout(()=>{
      handleDisplay(false)
    },300)
    modalRef?.current.classList.remove("active");
  }

 

  return (
    show && (
      <>
        <div className={`modal  ${modalClass} active` } ref={modalRef}>
          {header && <div className="modalHeader">
            {title&&<div className="modalTitle">{title}</div>}
            <IoIosClose className="modalClose" onClick={() => closeModal()}/>
          </div>}
          <div className="modalBody"> {body}</div>       
        </div>
        <Backdrop close ={()=>closeModal()}/>
      </>
    )
  );
}

export default Modal;
