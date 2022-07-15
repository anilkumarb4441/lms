import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom'

//css
import "./ParticularTeamMember.css";

//assets
import dummy from "../../assets/chefview/dummy.png"
import mailIcon from "../../assets/chefview/mailIcon.svg"
import phoneIcon from "../../assets/chefview/phoneIcon.svg"
import tempPhoto from "../../assets/dashboard/tempPhoto.png"
import { IoIosArrowBack } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";

//components
import DoughnutComp from "../../components/doughnut/doughnut"
import Table from "../../components/Table";
import Tabs from "../../components/tabs/tabs.js";

function ParticularTeamMember({perticularTMember, chefId, setParticularChef, tableData}) {
  const mainref = useRef(null)

  // Tabs
  const mainTabArr = [
    { name: "Team", value: "team" },
    { name: "Leads", value: "leads" },
  ];

  // State for Sub Tabs 

  const [subtabs, setsubtabs] = useState("team")

  // State for Nested Tabs
  const [tabcount, settabcount] = useState(0);


  const [pieData, setpieData] = useState({

    // labels: [
    //   'Pending',
    //   'Closed',
    //   'Untouched'
    // ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#70DFBF',
        '#FA7999',
        '#6898E5'
      ],
      hoverOffset: 4,

    }]

  })

  // const [parmemId , setparmemId] = useState(chefId)
  const [tabarray, settabarray] = useState([chefId]);

  function updatePage(x) {
    settabarray(tabarray => [...tabarray, x])
    mainref.current.scrollIntoView();
  }

  function getPartData(e, key) {
    settabarray(tabarray.slice(0, key + 1))
  }


  useEffect(() => {
    getDataOfMem(tabarray[tabarray.length - 1]);
    // console.log(tabarray[tabarray.length-1]);
  }, [tabarray])


  function getDataOfMem(x) {

  }


  // Table

  const [originalData, setOriginalData] = useState([
    {
      userId: "NAN54163",
      name: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      userId: "NAN",
      name: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      userId: "NAN",
      name: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      userId: "NAN",
      name: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      userId: "NANjhk",
      name: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
    {
      userId: "NAN",
      name: "Manu",
      email: "manojkumarobulasetty785@gmail.com",
      phone: 7729088005,
    },
  ]);
  const [intableData, setInTableData] = useState(tableData);
  const [leadTableData, setLeadTableData] = useState(originalData)
  const [columns, setColumns] = useState([
    {
      Header: "Member Id",
      accessor: "userId",
      Cell: (props) => {
        // return <button style={{backgroundColor:"transparent", border:"none", color:"white", textDecoration:"underline"}} onClick={(e)=>settabarray(tabarray.push(props.cell.row.original.memId))}>{props.cell.row.original.memId}</button>
        return <button style={{ backgroundColor: "transparent", border: "none", color: "black", textDecoration: "underline" }} onClick={(e) => updatePage(props.cell.row.original)}>{props.cell.row.original.userId}</button>
      }
    },
    {
      Header: "Member Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: 'phone'
    },
    // {
    //   Header: "Options",
    //   accessor:'options',
    // },
  ]);


  const [profileScreen, setProfileScreen] = useState(false);

  return (
    <div className="mainParticular" ref={mainref}>
      {/* <div className="flexalign">
          <IoIosArrowBack className = 'goBack' onClick={(e)=>setParticularChef(false)}/>
          <h1>Member Id:
            {
              tabarray.map((val,key)=>{
                return(
                  // &nbsp;/&nbsp;  
                  <button onClick={(e)=>getPartData(val,key)} key={key} className="meIds">&nbsp;/<span>{val}</span></button>
                )
              })
            }
          </h1>
        </div> */}  
        <div className="partiMyTeam-firstHL">
      <div className="partiMyTeam-backButton">
        <IoIosArrowBack className='partBackBTN' onClick={(e) => setParticularChef(false)} />
        <h4>My Team</h4>
      </div>
          <div className="infomain">
            <p className="infoContent1">Name &nbsp;:</p>
            <p className="infoContent">{perticularTMember.name}</p>
          </div>
      </div>
      <div>
        <div className="sPOne">
          {/* <div className="ParchefOverView">
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
              </div> */}
          <div className='userTicketsSection'>
            <div className='ticketHead'>
              <h4>Tickets Raised</h4>
            </div>
            <div className='tickets'>
              <div className="teckWrape">
                <DoughnutComp donughtfor="doughnut" pieData={pieData} />
                <div className="status-wraper">
                  <div className="status-match">
                    <div className="status-cHol">
                      <div className="statusimg-pending"></div>
                      <p className="stuName">Work in Progress</p>
                    </div>
                    <p className="statusCount">100</p> 
                  </div>
                  <div className="status-match">
                    <div className="status-cHol">
                      <div className="statusimg-untouched"></div>
                      <p className="stuName">New</p>
                    </div>
                    <p className="statusCount">100</p> 
                  </div>
                  <div className="status-match">
                    <div className="status-cHol">
                      <div className="statusimg-closed"></div>
                      <p className="stuName">Won</p>
                    </div>
                    <p className="statusCount">100</p> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detailedSection">
            {/* Total Tasks */}

            {
              subtabs === "team" ?
                <div className="totalTasksPart">
                  <div className="tableParent">
                    {/* <Table /> */}
                   <div className="tabAndSearch-HOL">
                   <Tabs
                      tabArr={mainTabArr}
                      tabsClass="leadTabs"
                      handleTab={(e) => setsubtabs(e.value)}
                    />
                    <div className="teamTabSearch"> 
                      <input placeholder=""/>
                      <IoMdSearch className="IoMdSearchic"/>
                    </div>
                   </div>
                    <Table columns={columns} data={intableData} tClass="myteam perMyteam" />
                  </div>
                </div> :
                subtabs === "analytics" ?
                  <div className="totalTasksPart">
                    <h4>Analytics</h4>

                  </div> :
                  subtabs === "leads" ?
                    <div className="totalTasksPart">
                      <h4>Leads</h4>
                      <Table  columns={columns} data={leadTableData} tClass="myteam perMyteam" />
                    </div> : null
            }
          </div>
        </div>


      </div>
    </div>
  );
}

export default ParticularTeamMember;
