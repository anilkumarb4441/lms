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
      chefId: "ch0587",
      joiningDate: "26 Feb 2022",
      chefName: "Manish Arora",
      location: "HSR Layout, Sec 3, 500102",
      salary: "1700 INR",
      totalBookings: 21,
    },
  ]);
  const [tableData,setTableData] = useState(originalData);
  const [columns, setColumns] = useState([
    {
      Header: "Chef Id",
      accessor: "chefId",
      Cell:(props)=>{
        return <p style = {{textDecoration:'underline',cursor:'pointer'}} onClick = {(e)=>(setParticularChef(true),setChefId(props.cell.row.original.chefId))}>{props.cell.row.original.chefId}</p>
      }
    },
    {
      Header: "Joining Date",
      accessor: "joiningDate",
    },
    {
      Header: "Chef Name",
      accessor: "chefName",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Salary",
      accessor: "salary",
    },
    {
      Header: "Total Bookings",
      accessor:'totalBookings'
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
      // particularChef?<ParticularChef chefId={chefId} setParticularChef={setParticularChef} />:
      particularChef?<OverViewInner chefId={chefId} particularChef={particularChef} setParticularChef={setParticularChef} />:
      <div className = 'chefOverviewScreen'>
      <div className="screenTitleContainer">
          <p className="screenTitle">Chef Overview</p>
          <div>
              <button className = 'btnPrimary' style = {{marginRight:'20px'}} onClick = {()=>{setOpenForm(true);}}>
                  Add New Chef
              </button>
              <button className = 'btnPrimary'>
                  Chef Attendance
              </button>
          </div>
      </div>
    <div><Table search = {true} columns={columns} data={tableData} tClass="leadTable" /></div>
    
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
