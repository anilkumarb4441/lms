import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom'
import API_SERVICES from "../../utils/API"
import { URLS } from "../../utils/urlConstants"
import {useDispatch,useSelector} from "react-redux"
import * as actions from "./actions"
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

function ParticularTeamMember({ perticularTMember, filterQuery, totalCount, setFilterQuery, setParticularChef, tableData, memberAnalytics, setTotalCount }) {
  const mainref = useRef(null)
const dispatch = useDispatch();
const  myTeamReducer = useSelector(state=>state.myTeam)
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
  
  // function updatePage(x) {
  //   settabarray(tabarray => [...tabarray, x])
  //   mainref.current.scrollIntoView();
  // }

  // function getPartData(e, key) {
  //   settabarray(tabarray.slice(0, key + 1))
  // }


  // 
  function getDataOfMem(x) {

  }
  // Table

  const [columns, setColumns] = useState([
    {
      Header: "Member name",
      accessor: "name",
      Cell: (props) => {
        // return <button style={{backgroundColor:"transparent", border:"none", color:"white", textDecoration:"underline"}} onClick={(e)=>settabarray(tabarray.push(props.cell.row.original.memId))}>{props.cell.row.original.memId}</button>
        return <button style={{ backgroundColor: "transparent", border: "none", color: "black", textDecoration: "underline" }} onClick={(e) => { dispatch(actions.getTeamMember(props.cell.row.original));}}>{props.cell.row.original.name}</button>
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
        return <button style={{ backgroundColor: "transparent", border: "none", color: "black", textDecoration: "underline" }} onClick={(e) => {dispatch(actions.getTeamMember(props.cell.row.original))}}>{props.cell.row.original.name}</button>
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

  function getPerticularMeberAnalytics() {
    const callback = (err, res) => {
      if (err) {
        // setMemberAnalytics([]);
        return
      }
      if (res && res.status === 200) {
        if (res.data) {
          // setMemberAnalytics(res.data)
        } else {
          // setMemberAnalytics([]);
        }
      }
    }
    API_SERVICES.httpPOSTWithToken(URLS.perticularTeamMember, { userId: myTeamReducer.arr.userId, status: ["untouched", "pending", "completed"] }, callback)
  }

  useEffect(()=>{
    getPerticularMeberAnalytics()
  },[])

  const [tableda, setTableda]=useState([])

  function getPerticularMeberTeam() {
    const callback = (err, res) => {
      if (err) {
        // setMemberTableData([]);
        return
      }
      if (res && res.status === 200) {
        if (res.data[0]?.directMembers) {
          dispatch(actions.getAsignTeamMember());
          setTableda(res.data[0].directMembers)
          // setTotalCount(res.data[0].directMembers.length)
        } else {
          // setMemberTableData([]);
          // setTotalCount(0);
        }
      }
    }
    API_SERVICES.httpPOSTWithToken(URLS.myteammembers, {  userId: myTeamReducer.arr.userId, level: myTeamReducer.arr.level }, callback)
  }

  useEffect(()=>{
    getPerticularMeberTeam()
  },[])

  useEffect(()=>{
    getDataOfMem(myTeamReducer.arr[myTeamReducer.arr.length - 1]);
  
  },[myTeamReducer.arr])

  return (
    <div className="mainParticular" ref={mainref}>

      <div className="partiMyTeam-firstHL">
        <div className="partiMyTeam-backButton">
          <IoIosArrowBack className='partBackBTN' onClick={(e) => {setParticularChef(false);dispatch(actions.setDefault())}} />
          <h4>My Team</h4> {
             myTeamReducer.arr && myTeamReducer.arr.length>0 && myTeamReducer.arr.map((val,key)=>{
                return(
                  <p onClick={(e)=>dispatch((actions.getTeamMember(val)))} key={key} className="meIds">&nbsp;/&nbsp;<span className="bedScumText">{val.name}</span></p>
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
                      data={tableda}
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
