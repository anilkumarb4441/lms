import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/modal";
import Input from "../../components/Input"
import Table from "../../components/Table";
import {camelToSentence} from "../../utils/constants"
import "./index.css";
import API_SERVICES from "../../utils/API"
import {URLS} from "../../utils/urlConstants"

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
  const [tableData,setTableData] = useState([]);
  const [columns, setColumns] = useState([
    {
      Header: "userId",
      accessor: "userId",
      Cell:(props)=>{
        return <p style = {{textDecoration:'underline',cursor:'pointer'}} onClick = {(e)=>(setParticularChef(true),setChefId(props.cell.row.original.userId))}>{props.cell.row.original.userId}</p>
      }
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor:'phone'
    },
  ]);
  useEffect(() => {
    getMyTeamData()
  }, []);

  function getMyTeamData(){
    let callback = (err,res)=>{
      if(res && res.status===200){ 
          setTableData(res.data[0].directMembers)
      }
    }
    API_SERVICES.httpPOSTWithToken(URLS.myteammembers,{userId:''},callback)
  }


  return (
<>
    {
      particularChef?<ParticularTeamMember chefId={chefId} setParticularChef={setParticularChef} />:
      // particularChef?<OverViewInner chefId={chefId} particularChef={particularChef} setParticularChef={setParticularChef} />:
      <div className = 'chefOverviewScreen'>
      <div className="screenTitleContainer">
          <p className="screenTitle">My Team</p>
          <div>
          
          </div>
      </div>
    <div><Table search = {true} columns={columns} data={tableData} tClass="myteam" /></div>
    
      </div>
    }

  </>
);
}

export default Myteam;
