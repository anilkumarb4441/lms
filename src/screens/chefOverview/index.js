import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/modal";
import Input from "../../components/Input"
import Table from "../../components/Table";
import {camelToSentence} from "../../utils/constants"
import "./index.css";

// Assets
import chefImg from "../../assets/chefview/chef.png"


// Components
import ParticularChef from "./particularChefOverview"
import Dots from "../../components/dots/dots"
import OverViewInner from "../clientOverview/overviewInner";

function ChefOverView() {

  // ParticularChef State

  const[particularChef,setParticularChef] = useState(false);
  const [chefId, setChefId] = useState("")

  const[openForm,setOpenForm]  = useState(false)
  const [formData, setFormData] = useState([
    {
      name: "chefId",
      value: "",
      type: "text",
      placeholder: "Chef Id",
    },
    {
      name: "chefName",
      value: "",
      type: "text",
      placeholder: "Chef Name",
    },
    {
      name: "phone",
      value: "",
      type: "tel",
      placeholder: "Chef Id",
      pattern:'[6-9]{1}[0-9]{9}'
    },
    {
      name: "emailId",
      value: "",
      type: "email",
      placeholder: "Email Id",
    },
    {
      name: "designation",
      value: "",
      type: "text",
      placeholder: "Designation",
    },
    {
      name: "experience",
      value: '',
      type: "number",
      placeholder: "Experience",
    },
    {
      name: "expertIn",
      value: "",
      type: "text",
      placeholder: "Expert In",
    },
    {
      name: "salary",
      value: '',
      type: 'number',
      placeholder: "Salary",
    },
    {
      name: "address",
      value: "",
      element: "textarea",
      placeholder: "Address",
    },
  ]);
  const [originalData, setOriginalData] = useState([
    {
      memId: "NAN",
      memberName: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      memId: "NAN",
      memberName: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      memId: "NAN",
      memberName: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      memId: "NAN",
      memberName: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      memId: "NAN",
      memberName: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      memId: "NAN",
      memberName: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
  ]);
  const [tableData,setTableData] = useState(originalData);
  const [columns, setColumns] = useState([
    {
      Header: "Member Id",
      accessor: "memId",
      Cell:(props)=>{
        return <p style = {{textDecoration:'underline',cursor:'pointer'}} onClick = {(e)=>(setParticularChef(true),setChefId(props.cell.row.original.memId))}>{props.cell.row.original.memId}</p>
      }
    },
    {
      Header: "Member Name",
      accessor: "memberName",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor:'phone'
    },
  ]);

  const handleInputChange = (e,i)=>{
    let newArr = [...formData];
    let formObj = { ...newArr[i] };
    formObj.value = e.target.value;
    newArr.splice(i, 1, formObj);
    setFormData([...newArr]);
  }

  const submitForm = (e)=>{
    e.preventDefault();
    let newArr = [];
    formData.forEach((obj) => {
      let newObj = {};
      newObj.name = obj.name;
      newObj.value = obj.value;
      newArr = [...newArr, newObj];
    });
  console.log(newArr);

  }
  return (
<>
    {
      particularChef?<ParticularChef chefId={chefId} setParticularChef={setParticularChef} />:
      // particularChef?<OverViewInner chefId={chefId} particularChef={particularChef} setParticularChef={setParticularChef} />:
      <div className = 'chefOverviewScreen'>
      <div className="screenTitleContainer">
          <p className="screenTitle">My Team</p>
          <div>
              {/* <button className = 'btnPrimary' style = {{marginRight:'20px'}} onClick = {()=>{setOpenForm(true);}}>
                  Add New Chef
              </button>
              <button className = 'btnPrimary'>
                  Chef Attendance
              </button> */}
          </div>
      </div>
    <div><Table search = {true} columns={columns} data={tableData} tClass="leadTable myteam" /></div>
    
      {openForm && 
      <Modal
      header={false}
      modalClass="addChefModal"
      show={openForm}
      bodyClick = {true}
      handleDisplay={(e)=>setOpenForm(e)}
      body = { <div className = 'addChef'>
          <div className = 'addChefCol1'>
              <p>Add New Chef</p>
              <form onSubmit = {(e)=>{submitForm(e)}}>
              <div>
              {formData &&
            formData.map((item, i) => {
              return (
                <Input {...item} required = {true} inputClass = 'addChefInput' key={i}  change={(e) => handleInputChange(e, i)} />
              );
            })}
              </div>
              <button className = 'saveBtn' type='submit'>Save</button>
              </form>
          </div>
      </div>
  }
      />}
        {/* <div className="screenTitleContainer">
          <p className="screenTitle">Attendance Sheet</p>
          <div>
  
          </div>
          </div> */}
      </div>
    }

  </>
);
}

export default ChefOverView;
