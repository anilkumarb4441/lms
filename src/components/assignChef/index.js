import React, { useState } from "react";
import "./index.css"
import cheflogo from "../../assets/icons/formlogo.svg";

//components
import Input from "../Input";
import Modal from "../modal/modal";
import { IoIosClose } from "react-icons/io";
import {IoIosAdd} from "react-icons/io";


function AssignChef({ showModal, open ,formObj,setFormObj,submitForm}) {
    const addHelper =()=>{
        setFormObj({...formObj,chefs:[...formObj.chefs,'']})
    }

    const removeHelper = (i)=>{
          let newArr1 = [...formObj.chefs]
         newArr1.splice(i,1);
          setFormObj({...formObj,chefs:newArr1})        
    }

   const handleInput =(e,i)=>{
       if(e.target.name!=='chef'){
        setFormObj({...formObj,[e.target.name]:e.target.value})
       }else{
       
        let newArr1 = [...formObj.chefs]
        newArr1.splice(i,1,e.target.value);
        setFormObj({...formObj,chefs:newArr1}) ;
       }
   }

  return (
    <Modal
      show={showModal}
      header = {true}
      modalClass="assignChef"
      title={
        <>
          <img src={cheflogo} alt="logo" />
          <p>Assign a Chef</p>
        </>
      }
      handleDisplay={(e) => open(e)}
      body={<form onSubmit = {(e)=>submitForm(e)}>
        <div>
       
        {formObj.chefs && formObj.chefs.map((item,i)=>{
                    
              if(i===0){
                  return <div key = {i} className = 'addHelper'>
           
                  <Input  name = 'chef' value = {item} placeholder = 'Chef/Helper Name' change = {(e)=>handleInput(e,i)} />
                       <IoIosAdd onClick = {()=>addHelper()} />         
                  </div >
              }
                return <div key = {i} className = 'addHelper' >
           
                <Input name = 'chef'  placeholder = 'Chef/Helper Name' change = {(e)=>handleInput(e,i)}/>
                     <IoIosClose onClick = {()=>removeHelper(i)}/>         
                </div >
            })}
        
            </div>   
           <Input  placeholder = 'Client Name' name = 'clientName' value = {formObj.clientName} type = 'text' change = {(e)=>handleInput(e)} />
           <Input placeholder = 'Address' name = 'address' value = {formObj.address} type = 'text' change = {(e)=>handleInput(e)} />
         <div className = 'inputFlexContainer'>
         <Input placeholder = 'Date' name = 'date' type = 'date' value = {formObj.date} change = {(e)=>handleInput(e)} />
         <Input placeholder = 'Time' name = 'time' type = 'time' value = {formObj.time} change = {(e)=>handleInput(e)} />
             </div >            
                 <Input placeholder = 'People' name = 'people' value = {formObj.people} change = {(e)=>handleInput(e)} type = 'number'/>
                 <Input element = 'textarea' placeholder = 'Ingredients list'value = {formObj.ingredientsList} change = {(e)=>handleInput(e)}  name = 'ingredientsList'/>
                 <div className = 'assignChefBtnContainer'>
                     <button>Cancel</button>
                     <button type= 'submit'>Send Request</button>
                 </div>
      </form>}
    />
  );
}

export default AssignChef;
