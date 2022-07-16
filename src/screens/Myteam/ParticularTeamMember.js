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

function ParticularTeamMember({ perticularTMember, chefId, filterQuery, totalCount, setFilterQuery, setParticularChef, tableData, memberAnalytics, setTotalCount }) {
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

  const membAn = memberAnalytics.map((val) => val.number)


  const dataToBeSent = {
    datasets: [{
      data: membAn,
      backgroundColor: [
        '#70DFBF',
        '#FA7999',
        '#6898E5'
      ],
      hoverOffset: 2,

    }]
  }

  const [tabarray, settabarray] = useState([perticularTMember.name]);

  function updatePage(x) {
    settabarray(tabarray => [...tabarray, x])
    mainref.current.scrollIntoView();
  }

  function getPartData(e, key) {
    settabarray(tabarray.slice(0, key + 1))
  }


  useEffect(() => {
    getDataOfMem(tabarray[tabarray.length - 1]);
  }, [tabarray])

  function getDataOfMem(x) {

  }
  // Table

  const [columns, setColumns] = useState([
    {
      Header: "Member name",
      accessor: "name",
      Cell: (props) => {
        // return <button style={{backgroundColor:"transparent", border:"none", color:"white", textDecoration:"underline"}} onClick={(e)=>settabarray(tabarray.push(props.cell.row.original.memId))}>{props.cell.row.original.memId}</button>
        return <button style={{ backgroundColor: "transparent", border: "none", color: "black", textDecoration: "underline" }} onClick={(e) => updatePage(props.cell.row.original.name)}>{props.cell.row.original.name}</button>
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
      accessor: 'level',
    },
  ]);

  const [leadcolumns, setLeadColumns] = useState([
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
      Header: "Status",
      accessor: 'status',
    },
  ]);

  const [onClkAnalyticData, setOnClkAnalyticData] = useState([])
  function onClickTeamMemberLeadAnalytics(val) {
    let statusValue = val.status === "untouched" ? 'untouched' : val.status === "open" ? "pending" : 'completed'
    const callback = (err, res) => {
      if (err) {
        setOnClkAnalyticData([]);
        return
      }
      if (res && res.status === 200) {
        if (res.data) {
          setOnClkAnalyticData(res.data.data)
          setTotalCount(res.data.data.length)
        } else {
          setOnClkAnalyticData([]);
          setTotalCount(0)
        }
      }
    }
    API_SERVICES.httpPOSTWithToken(URLS.onClickTeamMemberLeadAnalytics, { userId: perticularTMember.userId, status: statusValue }, callback)
  }


  return (
    <div className="mainParticular" ref={mainref}>

      <div className="partiMyTeam-firstHL">
        <div className="partiMyTeam-backButton">
          <IoIosArrowBack className='partBackBTN' onClick={(e) => setParticularChef(false)} />
          <h4>My Team</h4> {
              tabarray.map((val,key)=>{
                return(
                  // &nbsp;/&nbsp;  
                  <p onClick={(e)=>getPartData(val,key)} key={key} className="meIds">&nbsp;/&nbsp;<span className="bedScumText">{val}</span></p>
                )
              })
            }
        </div>
        <div className="infomain">
          <p className="infoContent1">Name &nbsp;:</p>
          <p className="infoContent" >{perticularTMember.name}</p>
        </div>
      </div>
      <div>
        <div className="sPOne">
          <div className='userTicketsSection'>
            <div className='ticketHead'>
              <h4>Tickets Raised</h4>
            </div>
            <div className='tickets'>
              <div className="teckWrape">
                <DoughnutComp donughtfor="doughnut" pieData={dataToBeSent}
                />
                <div className="status-wraper">
                  {
                    memberAnalytics.map((val) => {
                      console.log(val, 'maerm')
                      return (
                        <div className="status-match">
                          <div className="status-cHol">
                            <div className="statusimg-pending" style={{ border: val.status === "untouched" ? "5px solid #70DFBF" : val.status === "pending" ? '5px solid #FA7999' : '5px solid #6898E5' }}></div>

                            <p id="stu" className="stuName" onClick={(e) => onClickTeamMemberLeadAnalytics(val)}>
                              {val.status === "untouched" ? "New" : val.status === "pending" ? 'Work in Progress' : 'Won'}
                            </p>
                          </div>
                          <p className="statusCount">{val.number}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="detailedSection">
            {/* Total Tasks */}
            <div className="totalTasksPart">
              <div className="tableParent">

                <div className="tabAndSearch-HOL">
                  <Tabs
                    tabArr={mainTabArr}
                    subtabs={subtabs}
                    tabsClass="leadTabs"
                    handleTab={(e) => setsubtabs(e.value)}
                  />
                  <div className="teamTabSearch">
                    <input type="search" placeholder="Search By Name/Email/phone" name="search" onChange={(e) => setFilterQuery({ ...filterQuery, pageNumber: 1, search: e.target.value })} value={filterQuery.search} />
                    <IoMdSearch className="IoMdSearchic" />
                  </div>
                </div>

                {/* <Table /> */}

                {subtabs === "team" &&
                  <>
                    <Table columns={columns}
                      pagination={true}
                      currentPage={filterQuery.pageNumber}
                      pageSize={filterQuery.pageRows}
                      totalCount={totalCount}
                      onPageChange={(pageNumber, pageRows) => {
                        setFilterQuery({ ...filterQuery, pageNumber: pageNumber, pageRows: pageRows, search: '' })
                      }}
                      data={tableData}
                      tClass="myteam perMyteam" />
                  </>
                }
                {
                  subtabs === "leads" &&
                  <>
                    <Table columns={leadcolumns}
                      pagination={true}
                      currentPage={filterQuery.pageNumber}
                      pageSize={filterQuery.pageRows}
                      totalCount={totalCount}
                      onPageChange={(pageNumber, pageRows) => {
                        setFilterQuery({ ...filterQuery, pageNumber: pageNumber, pageRows: pageRows, search: '' })
                      }}
                      data={onClkAnalyticData}
                      tClass="myteam perMyteam" />
                  </>
                }
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default ParticularTeamMember;
