import React, { useState, useEffect, useRef } from "react";
import {Link, useLocation} from 'react-router-dom'

//css
import "./ParticularTeamMember.css";

//assets
import dummy from "../../assets/chefview/dummy.png"
import mailIcon from "../../assets/chefview/mailIcon.svg"
import phoneIcon from "../../assets/chefview/phoneIcon.svg"
import tempPhoto from "../../assets/dashboard/tempPhoto.png"
import {IoIosArrowBack} from "react-icons/io";

//components
import DoughnutComp from "../../components/doughnut/doughnut"
import Table from "../../components/Table";
import Tabs from "../../components/tabs/tabs.js";


function ParticularTeamMember({user,setOpenInner}) {
  const mainref  =  useRef(null)

  // Tabs
  const mainTabArr = [
    { name: "Team", value: "team" },
    { name: "Analytics", value: "analytics" },
    { name: "Leads", value: "leads" },
  ];

  // State for Sub Tabs 

  const[subtabs, setsubtabs] = useState("team")
  // State for Nested Tabs
  const[tabcount, settabcount] = useState(0);


  const[pieData,setpieData] = useState({
    
    labels: [
      'Pending',
      'Closed',
      'Untouched'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#311f03',
        '#5a5348',
        '#E6AA5580'
      ],
      hoverOffset: 4
    }]
  
  })

// const [parmemId , setparmemId] = useState(userId)


function updatePage(x){
 
}

function getPartData(e,key){
 
}


useEffect(()=>{
  
},[])




// Table

const [tableData,setTableData] = useState([]);
const [columns, setColumns] = useState([
  {
    Header: "Member Id",
    accessor: "memId",
    Cell:(props)=>{
      // return <button style={{backgroundColor:"transparent", border:"none", color:"white", textDecoration:"underline"}} onClick={(e)=>settabarray(tabarray.push(props.cell.row.original.memId))}>{props.cell.row.original.memId}</button>
      return <button style={{backgroundColor:"transparent", border:"none", color:"white", textDecoration:"underline"}} onClick={(e)=>updatePage(props.cell.row.original.memId)}>{props.cell.row.original.memId}</button>
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
  // {
  //   Header: "Options",
  //   accessor:'options',
  // },
]);


  const [profileScreen, setProfileScreen] = useState(false);

  return (
      <div className="mainParticular" ref={mainref}>
        <div className="flexalign">
          <IoIosArrowBack className = 'goBack' onClick={(e)=>setOpenInner(false)}/>
        </div>


          <div>
            <div className="sPOne">
              <div className="ParchefOverView">
                <div className="fPDiv">
                  <img src={dummy} alt="Dummy Image" />
                  <div className="InfoChef">
                    <h2>{user?.name}</h2>
                  </div>
                </div>
               
                <div className="sPflexDiv">
                  <img src={mailIcon} alt="MailIcon" />
                  <a href="#">{user?.email}</a>
                </div>
                <div className="sPflexDiv">
                  <img src={phoneIcon} alt="MailIcon" />
                  <a href="#">{user?.phone}</a>
                </div>
              </div>
              <div className='userTicketsSection'>
                    <div className='ticketHead'>
                      <h4>Leads Stats</h4>
                    </div>
                    <div className='tickets'>
                      <div>
                        <DoughnutComp donughtfor="Pie" pieData={pieData} />
                      </div>
                    </div>
              </div>
            </div>

            <div className="detailedSection">
            {/* Total Tasks */}
            <Tabs
              tabArr={mainTabArr}
              tabsClass="leadTabs"
              handleTab={(e)=>setsubtabs(e.value)}
            />
            {
              subtabs==="team"?
              <div className="totalTasksPart">
                <h4>Team Members</h4>
                <div className="tableParent">
                  {/* <Table /> */}
                  <Table search = {true} columns={columns} data={tableData} tClass="myteam" />
                </div>
              </div>:
              subtabs==="analytics"?
              <div className="totalTasksPart">
                <h4>Analytics</h4>

              </div>:
              subtabs==="leads"?
              <div className="totalTasksPart">
                <h4>Leads</h4>
                <Table search = {true} columns={columns} data={tableData} tClass="myteam" />
              </div>:null
            }
            </div>
          </div>
      </div>
  );
}

export default ParticularTeamMember;
