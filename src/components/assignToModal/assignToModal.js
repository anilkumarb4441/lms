import React from 'react'
import Modal from "../../components/modal/modal"
import "./assignToModal.css"

function AssignToModal({show,handleDisplay,callback,rowObj}) {
    return (
       <Modal
        show = {show}
        header = {true}
        title  = "Assign To"
        handleDisplay = {handleDisplay}
        body = {<>
        <p>Assign</p>
        </>}
       />
    )
}

export default AssignToModal
