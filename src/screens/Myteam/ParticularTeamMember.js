import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom'
import API_SERVICES from "../../utils/API"
import { URLS } from "../../utils/urlConstants"

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

function ParticularTeamMember({perticularTMember, chefId, filterQuery,totalCount,setFilterQuery, setParticularChef, tableData, memberAnalytics}){
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

  const  membAn=  memberAnalytics.map((val)=>val.number)

   
    const dataToBeSent={
    datasets: [{
      data:membAn, 
      backgroundColor: [
        '#70DFBF',
        '#FA7999',
        '#6898E5'
      ],
      hoverOffset: 4,

    }]
   
  }
  // })

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
  const [leadTableData, setLeadTableData] = useState(originalData)


  const [columns, setColumns] = useState([
    {
      Header: "Member name",
      accessor: "name",
      Cell: (props) => {
        // return <button style={{backgroundColor:"transparent", border:"none", color:"white", textDecoration:"underline"}} onClick={(e)=>settabarray(tabarray.push(props.cell.row.original.memId))}>{props.cell.row.original.memId}</button>
        return <button style={{ backgroundColor: "transparent", border: "none", color: "black", textDecoration: "underline" }} onClick={(e) => updatePage(props.cell.row.original)}>{props.cell.row.original.name}</button>
      }
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: 'phone'
    },
    {
      Header: "Level",
      accessor:'level',
    },
  ]);

  const [onClkAnalyticData, setOnClkAnalyticData ] = useState([])

  function onClickTeamMemberLeadAnalytics(){

    const callback = (err, res)=>{
      if(err){
        console.log('error2', err)
        setOnClkAnalyticData([]);
        return
      }
      if (res && res.status === 200) {
      if(res.data){
        console.log('data2', res.data)
        setOnClkAnalyticData(res.data)
      
      }else{
        setOnClkAnalyticData([]);

      }
    }
    }
    API_SERVICES.httpPOSTWithToken(URLS.onClickTeamMemberLeadAnalytics, { userId:perticularTMember.userId, status:"untouched" }, callback)
  } 

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
                <DoughnutComp donughtfor="doughnut" pieData={dataToBeSent} 
                // options={
                // { onClick: onClickTeamMemberLeadAnalytics()}}
                />
                <div className="status-wraper">
                  {
                    memberAnalytics.map((val)=>{
                     return(
                      <div className="status-match">
                      <div className="status-cHol">
                        <div className="statusimg-pending" style={{border:val.status==="untouched"?"5px solid #70DFBF":val.status==="open"?'5px solid #FA7999':'5px solid #6898E5'}}></div>
                  
                        <p className="stuName">
                          {val.status==="untouched"? "New":val.status==="open"?'Work in Progress':'Won'}
                          </p>
                      </div>
                      <p className="statusCount">{val.number}</p> 
                    </div>
                     )
                    })
                    



                  }

                  {/* <div className="status-match">
                    <div className="status-cHol">
                      <div className="statusimg-untouched"></div>
                      <p className="stuName">New</p>
                    </div>
                    <p className="statusCount">{membAn[1]}</p> 
                  </div>
                  <div className="status-match">
                    <div className="status-cHol">
                      <div className="statusimg-closed"></div>
                      <p className="stuName">Won</p>
                    </div>
                    <p className="statusCount">{membAn[2]}</p> 
                  </div> */}
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
                      <input type = "search"  placeholder="Search By Name/Email/phone" name ="search" change = {(e)=>setFilterQuery({...filterQuery,pageNumber:1,search:e.target.value})} value = {filterQuery.search}/>
                      <IoMdSearch className="IoMdSearchic"/>
                    </div>
                   </div>
                    <Table columns={columns} 
                     pagination = {true}                 
                     currentPage={filterQuery.pageNumber}
                     pageSize={filterQuery.pageRows}
                     totalCount={totalCount} 
                     onPageChange={(pageNumber, pageRows) => {
                         setFilterQuery({...filterQuery, pageNumber:pageNumber,pageRows:pageRows,search:''})
                     }}
                    data={tableData} 
                    tClass="myteam perMyteam" />
                  </div>
                </div> :
                subtabs === "analytics" ?
                  <div className="totalTasksPart">
                    <h4>Analytics</h4>

                  </div> :
                  subtabs === "leads" ?
                    <div className="totalTasksPart">
                      <h4>Leads</h4>
                      <Table  columns={columns}
                      data={leadTableData}
                       tClass="myteam perMyteam" />
                    </div> : null
            }
          </div>
        </div>


      </div>
    </div>
  );
}

export default ParticularTeamMember;
