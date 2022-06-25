import React, { useState, useEffect } from "react";
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

function ParticularTeamMember({chefId,setParticularChef}) {

// State for Nested Tabs

const[tabcount, settabcount] = useState(0);
const[tabarray, settabarray] = useState([])

  const[pieData,setpieData] = useState({
    
    labels: [
      'Pending',
      'Closed',
      'Untouched'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'red',
        'green',
        'skyblue'
      ],
      hoverOffset: 4
    }]
  
  })

const [memId , setmemId] = useState(chefId)

function updatePage(x){
  console.log(x);
  tabarray.push(x);
  // debugger;
  settabarray(tabarray)
}


// Table

const [originalData, setOriginalData] = useState([
  {
    memId: "NAN54163",
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
      <div className="mainParticular">
        {
          console.log(tabarray,"lllll5l")
        }
        <div className="flexalign">
          <IoIosArrowBack className = 'goBack' onClick={(e)=>setParticularChef(false)}/>
          <h1>Member Id:
            {/* {
              tabarray.map((val,key)=>{
                return(
                  <>
                  &nbsp;/&nbsp;
                  <button className="meIds">{val}</button>
                  </>
                )
              })
            } */}
          </h1>
        </div>


          <div>
            <div className="sPOne">
              <div className="ParchefOverView">
                <div className="fPDiv">
                  <img src={dummy} alt="Dummy Image" />
                  <div className="InfoChef">
                    <h2>Ekka Singh</h2>
                  </div>
                </div>
                <p className="chefPInfo">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                </p>
                <div className="sPflexDiv">
                  <img src={mailIcon} alt="MailIcon" />
                  <a href="mailto:Enakshi@gmail.com">Enakshi@gmail.com</a>
                </div>
                <div className="sPflexDiv">
                  <img src={phoneIcon} alt="MailIcon" />
                  <a href="tel:9123456789">9123456789</a>
                </div>
              </div>
              <div className='userTicketsSection'>
                    <div className='ticketHead'>
                      <h4>Tickets Raised</h4>
                    </div>
                    <div className='tickets'>
                      <div>
                        <DoughnutComp donughtfor="Pie" pieData={pieData} />
                      </div>
                    </div>
              </div>
            </div>

            {/* Total Tasks */}
            <div className="totalTasksPart">
              <h4>Team Members</h4>
              <div className="tableParent">
                {/* <Table /> */}
                <Table search = {true} columns={columns} data={tableData} tClass="myteam" />
              </div>
            </div>
          </div>

      </div>
  );
}

export default ParticularTeamMember;
