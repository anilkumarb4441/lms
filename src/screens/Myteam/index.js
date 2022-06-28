import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/modal";
import Input from "../../components/Input"
import Table from "../../components/Table";
import {camelToSentence} from "../../utils/constants"
import "./index.css";

// Assets
import chefImg from "../../assets/chefview/chef.png"


// Components
import ParticularTeamMember from "./ParticularTeamMember"
import Dots from "../../components/dots/dots"
import OverViewInner from "../clientOverview/overviewInner";

function Myteam() {

  // ParticularChef State

  const[particularChef,setParticularChef] = useState(false);
  const [chefId, setChefId] = useState("")

  // const[openForm,setOpenForm]  = useState(false)

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
      memId: "NA5N",
      memberName: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      memId: "NA75N",
      memberName: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      memId: "NA74N",
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


  return (
<>
    {
      particularChef?<ParticularTeamMember chefId={chefId} setParticularChef={setParticularChef} />:
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
    <div><Table search = {true} columns={columns} data={tableData} tClass="myteam" /></div>
    
      </div>
    }

  </>
);
}

export default Myteam;
