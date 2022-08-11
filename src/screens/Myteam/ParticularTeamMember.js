import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import API_SERVICES from "../../utils/API";
import { URLS } from "../../utils/urlConstants";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
//css
import "./ParticularTeamMember.css";

//assets
import dummy from "../../assets/chefview/dummy.png";
import mailIcon from "../../assets/chefview/mailIcon.svg";
import phoneIcon from "../../assets/chefview/phoneIcon.svg";
import tempPhoto from "../../assets/dashboard/tempPhoto.png";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";

//components
import DoughnutComp from "../../components/doughnut/doughnut";
import Table from "../../components/Table";
import Tabs from "../../components/tabs/tabs.js";

function ParticularTeamMember({
  filterQuery,
  totalCount,
  setFilterQuery,
  setParticularChef,
}) {
  const mainref = useRef(null);
  
  const dispatch = useDispatch();
  const myTeamReducer = useSelector((state) => state.myTeam);

  // Tabs
  const mainTabArr = [
    { name: "Team", value: "team" },
    { name: "Leads", value: "leads" },
  ];

  // State for Sub Tabs
  const [subtabs, setsubtabs] = useState("team");

  //filter and pagination
const [tableFilter, setTableFilter] = useState({ pageNumber: 1, pageRows: 5, search: ''})
const [totalRowCount, setTotalRowCount] = useState(0)
  
  // states for table
  const [teamTabledata, setTeamTabledata] = useState([]);
  const [memberAnalytics, setMemberAnalytics] = useState([])
  const [onClkAnalyticData, setOnClkAnalyticData] = useState([]);

let onLoadPIData = [memberAnalytics.length>0 ?memberAnalytics[0].new.length:0, memberAnalytics.length>0 ?memberAnalytics[0].workInProgress.length:0, memberAnalytics.length>0 ?memberAnalytics[0].lost.length:0, memberAnalytics.length>0 ?memberAnalytics[0].paid.length:0];
console.log(onLoadPIData)
const dataToBeSent = {
    datasets: [
      {
        data: onLoadPIData,
        backgroundColor: ["#70DFBF", "#FA7999", "#6898E5", 'red'],
        hoverOffset: 2,
      },
    ],
  };

  // Table
  const [columns, setColumns] = useState([
    {
      Header: "Member name",
      accessor: "name",
      Cell: (props) => {
        return (
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              textDecoration: "underline",
            }}
            onClick={(e) => {
              dispatch(actions.getTeamMember(props.cell.row.original));
            }}
          >
            {props.cell.row.original.name}
          </button>
        );
      },
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Level",
      accessor: "level",
    },
  ]);

  const [leadcolumns, setLeadColumns] = useState([
    // {
    //   Header: "Member name",
    //   accessor: "name",
    //   Cell: (props) => {
    //     return (
    //       <button style={{ backgroundColor: "transparent",border: "none",color: "black",textDecoration: "underline",}} onClick={(e) => {dispatch(actions.getTeamMember(props.cell.row.original));}}>
    //         {props.cell.row.original.name}
    //       </button>
    //     );
    //   },
    // },
    {
      Header: "Member name",
      accessor: "name",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ]);

 

  function onClickTeamMemberLeadAnalytics(obj) {
    let usID = myTeamReducer.arr[myTeamReducer.arr.length - 1].userId
    // let statusValue = obj.status === "untouched"? "untouched": obj.status === "open"? "pending": "completed";
    const callback = (err, res) => {
      if (err) {
        setOnClkAnalyticData([]);
        return;
      }
      if (res && res.status === 200) {
        if (res.data) {
          setOnClkAnalyticData(res.data.data);
          setTotalRowCount(10);
        } else {
          setOnClkAnalyticData([]);
          setTotalRowCount(0);
        }
      }
    };
    API_SERVICES.httpPOSTWithToken(
      URLS.onClickTeamMemberLeadAnalytics,
      { userId: usID, status: obj },
      callback
    );
  }

  function getPerticularMemberAnalytics(obj) {
    console.log(obj)
    const callback = (err, res) => {
      if (err) {
        setMemberAnalytics([]);
        return;
      } 
      if (res && res.status === 200) {
        if (res.data) {
          setMemberAnalytics([res.data])

        } else {
          setMemberAnalytics([]);

        }
      }
    };
   API_SERVICES.httpPOSTWithToken(URLS.perticularTeamMember,{ userId:obj.userId,status: ["new", "workInProgress", "lost", "paid"]},callback);
  }



  function getPerticularMember(obj) {
    const callback = (err, res) => {
      if (err) {
        setTeamTabledata([]);
        return;
      }
      if (res && res.status === 200) {
        if (res.data[0]?.directMembers) {
          setTeamTabledata(res.data[0].directMembers);
          setTotalRowCount(20)
        } else {
          setTeamTabledata([]);
          setTotalRowCount(0)
        }
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.myteammembers, { userId: obj.userId, level: obj.level }, callback);
  }

  useEffect(() => {
    let lastObject = myTeamReducer.arr[myTeamReducer.arr.length - 1] // last object in the array
    if (!lastObject) return
console.log(lastObject)
    getPerticularMember(lastObject);
    getPerticularMemberAnalytics(lastObject);
    onClickTeamMemberLeadAnalytics(lastObject);
  }, [myTeamReducer.arr, tableFilter]);

  return (
    <div className="mainParticular" ref={mainref}>
      <div className="partiMyTeam-firstHL">
        <div className="partiMyTeam-backButton">
          <IoIosArrowBack
            className="partBackBTN"
            onClick={(e) => {
              setParticularChef(false);
              dispatch(actions.setDefault());
            }}
          />
          <h4>My Team</h4>{" "}
          {myTeamReducer.arr &&
            myTeamReducer.arr.length > 0 &&
            myTeamReducer.arr.map((val, key) => {
              return (
                <p
                  onClick={(e) => dispatch(actions.getTeamMember(val))}
                  key={key}
                  className="meIds"
                >
                  &nbsp;/&nbsp;<span className="bedScumText">{val.name}</span>
                </p>
              );
            })}
        </div>
        <div className="infomain">
          <p className="infoContent1">Name &nbsp;:</p>
          <p className="infoContent">{myTeamReducer.arr[myTeamReducer.arr.length - 1].name}</p>
        </div>
      </div>
      <div>
        <div className="sPOne">
          <div className="userTicketsSection">
            <div className="ticketHead">
              <h4>Lead Stats</h4>
            </div>
            <div className="tickets">
              <div className="teckWrape">
                <DoughnutComp donughtfor="doughnut" pieData={dataToBeSent} />
                 {/* <div className="status-wraper">
                 <div className="status-match">
                        <div className="status-cHol">
                          <div
                            className="statusimg-pending" style={{boredr:'5px solid red'}}
                            ></div>
                          <p id="stu" className="stuName" onClick={(e) => onClickTeamMemberLeadAnalytics('new')}>New</p>
                        </div>
                        <p className="statusCount">{memberAnalytics.length!== 0 ?memberAnalytics.new.length:0}</p>
                      </div>
                  </div> */}

                <div className="status-wraper">
                  {console.log(memberAnalytics)}
                  {memberAnalytics.length>0 && Object.entries(...memberAnalytics).map(([key, val]) => {
                    console.log(val, 'val', key,memberAnalytics[0][key])
                    // Object.entries(information).map(([key, value])
                    return (
                      <div className="status-match">
                        <div className="status-cHol">
                          <div
                            className="statusimg-pending"
                            style={{
                              border:key === "new"? "5px solid #70DFBF": key === "workInProgress"? "5px solid #FA7999": "5px solid #6898E5",}}></div>
                          <p id="stu" className="stuName" onClick={(e) => onClickTeamMemberLeadAnalytics(key)}>{key === "new" ? "New": key === "workInProgress"? "Work in Progress": key === "lost"? "Lost": "paid"}</p>
                        </div>
                        <p className="statusCount">{memberAnalytics[0][key].length}</p>
                      </div>
                    );
                  })}
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
                    activeValue={subtabs}
                    tabsClass="leadTabs"
                    handleTab={(e) => setsubtabs(e.value)}
                  />
                  <div className="teamTabSearch">

                    <input
                      type="search"
                      placeholder="Search By Name/Email/phone"
                      name="search"
                      value={tableFilter.search}
                      onChange={(e) =>
                        setTableFilter({
                          ...tableFilter,
                          pageNumber: 1,
                          search: e.target.value,
                        })
                      }
                    
                    />
                    <IoMdSearch className="IoMdSearchic" />
                  </div>
                </div>

                {/* <Table /> */}

                {subtabs === "team" && (
                  <>
                    <Table
                      columns={columns}
                      pagination={true}
                      currentPage={tableFilter.pageNumber}
                      pageSize={tableFilter.pageRows}
                      totalCount={totalRowCount}
                      onPageChange={(pageNumber, pageRows) => {
                        setTableFilter({
                          ...tableFilter,
                          pageNumber: pageNumber,
                          pageRows: pageRows,
                          search: "",
                        });
                      }}
                      data={teamTabledata}
                      tClass="myteam perMyteam" 
                    />
                  </>
                )}
                {subtabs === "leads" && (
                  <>
                    <Table
                      columns={leadcolumns}
                      pagination={true}
                      currentPage={filterQuery.pageNumber}
                      pageSize={filterQuery.pageRows}
                      totalCount={totalCount}
                      onPageChange={(pageNumber, pageRows) => {
                        setFilterQuery({
                          ...filterQuery,
                          pageNumber: pageNumber,
                          pageRows: pageRows,
                          search: "",
                        });
                      }}
                      data={onClkAnalyticData}
                      tClass="myteam perMyteam"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticularTeamMember;

