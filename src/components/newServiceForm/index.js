import React,{useState} from "react";
import "./index.css";

//assets
import camera from "../../assets/icons/camera.svg";
import cheflogo from "../../assets/icons/formlogo.svg";

//Components
import Modal from "../modal/modal";
import Input from "../Input";

function NewService({
  title,
  formObj,
  setFormObj,
  showModal,
  showDisplay,
  submitService,
}){

const [img,setImg] =useState('');
const handleInput = (e)=>{
    if(e.target.type==='file'){
        setFormObj({...formObj,[e.target.name]:{...formObj[e.target.name],value:e.target.value,filepath:e.target.filepath}})
        return
    }
    setFormObj({...formObj,[e.target.name]:{...formObj[e.target.name],value:e.target.value}})
}

  return (
    <Modal
      header={true}
      title={
        <>
          <img src={cheflogo} alt ='cheflogo' />
          <p>{title}</p>
        </>
      }
      modalClass="newServiceModal"
      show={showModal}
      handleDisplay={(e) => showDisplay(e)}
      body={
        <form onSubmit={(e) => submitService(e)}>
          <div className = 'uploadServiceImg'>
            <label for = 'serviceImg'>
              <img src={camera} alt="camera" />
            </label>
            <input id = 'serviceImg' name = 'serviceImage' value = {formObj.serviceImage.value} type="file" onChange = {(e)=>handleInput(e)} accept=".png,.jpg" required />
            <p>Upload Image</p>
          </div>
          <div>
            <Input type="text" name='serviceType' placeholder={formObj.serviceType.placeholder} />
          </div>
          <div className="newServiceModalFooter">
            <button>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      }
    />
  );
}

export default NewService;
