import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import API_SERVICES from "../../utils/API";
import { URLS } from "../../utils/urlConstants";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actions";
import Input from "../../components/Input";
//css
import "./ParticularTeamMember.css";

//assets
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
  const [tableFilter, setTableFilter] = useState({ pageNumber: 1, pageRows: 5, search: '' })
  const [leadFilter, setLeadFilter] = useState({ pageNumber: 1, pageRows: 5, })
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [analRowCount, setanalRowCount] = useState(0)

  // states for table
  const [teamTabledata, setTeamTabledata] = useState([]);
  const [memberAnalytics, setMemberAnalytics] = useState([])
  const [onClkAnalyticData, setOnClkAnalyticData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [leadSearch, setLeadsearch] = useState('')
  const [allLeads, setAllLeads] = useState([])
  const [leadShow, setLeadShow] = useState('All')
  const [filterleadsData, setFilterLeadsData] = useState([])



  let onLoadPIData = [memberAnalytics.length > 0 ? memberAnalytics[0].new.length : 0, memberAnalytics.length > 0 ? memberAnalytics[0].workInProgress.length : 0, memberAnalytics.length > 0 ? memberAnalytics[0].lost.length : 0, memberAnalytics.length > 0 ? memberAnalytics[0].paid.length : 0];
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
      Header: "Email",
      accessor: "email",
    },
  ]);



  function onClickTeamMemberLeadAnalytics(obj) {
    setTableLoading(true);
    let usID = myTeamReducer.arr[myTeamReducer.arr.length - 1].userId
  
    const callback = (err, res) => {
      setTableLoading(false);
      if (err) {
        setOnClkAnalyticData([]);
        return;
      }
      if (res && res.status === 200) {
        if (res.data) {
          setOnClkAnalyticData(res.data.data);
          setanalRowCount(res.data.length);
          setsubtabs('leads');
          setLeadShow('sepLeads')

        } else {
          setOnClkAnalyticData([]);
          setTotalRowCount(0);
        }
      }
    };
    API_SERVICES.httpPOSTWithToken(
      URLS.onClickTeamMemberLeadAnalytics,
      { ...leadFilter, userId: usID, status: obj, },
      callback
    );
  }
    useEffect(()=>{
      onClickTeamMemberLeadAnalytics();
    },[leadFilter])

  function getPerticularMemberAnalytics(obj) {

    const callback = (err, res) => {
      if (err) {
        setMemberAnalytics([]);
        return;
      }
      if (res && res.status === 200) {
        if (res.data) {
          setMemberAnalytics([res.data])
          let { new: list, workInProgress, paid, lost } = res.data
          let allLeadArr = [...list, ...workInProgress, ...paid, ...lost]
          setAllLeads(allLeadArr)
          setFilterLeadsData(allLeadArr);

        } else {
          setMemberAnalytics([]);
        }
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.perticularTeamMember, { userId: obj.userId, status: ["new", "workInProgress", "lost", "paid"] }, callback);
  }

  function getPerticularMember(obj) {
    setTableLoading(true);
    const callback = (err, res) => {
      setTableLoading(false);
      if (err) {
        setTeamTabledata([]);
        return;
      }
      if (res && res.status === 200) {
        if (res.data[0]?.directMembers) {
          setTeamTabledata(res.data[0].directMembers);
          setTotalRowCount(res.data[1].count)
        } else {
          setTeamTabledata([]);
          setTotalRowCount(0)
        }
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.myteammembers, { ...tableFilter, userId: obj.userId, level: obj.level }, callback);
  }

  useEffect(() => {
    let lastObject = myTeamReducer.arr[myTeamReducer.arr.length - 1] // last object in the array
    if (!lastObject) return
    getPerticularMember(lastObject);
    getPerticularMemberAnalytics(lastObject);
  }, [myTeamReducer.arr, tableFilter]);


  const isBelowThreshold = (currentValue) => currentValue < 1;
  const chartShow = onLoadPIData.every(isBelowThreshold);


  const onLeadSearch = (e)=>{
   let text = e.target.value.toLowerCase();
    setLeadsearch(e.target.value);
    let filteredList = allLeads?
    allLeads.filter((item)=>{
      let serch = item.name?.toLowerCase().includes(text) || item.email?.toLowerCase().includes(text) || item.phone?.toLowerCase().includes(text);
      return serch
    }):[]

    setFilterLeadsData([...filteredList]);
  };

  

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
                {chartShow === true ?
                  <div className="emptyChart-parent"><div className="emptyChart-child">leads not Found</div></div> :
                  <DoughnutComp donughtfor="doughnut" pieData={dataToBeSent} />
                }

                <div className="status-wraper">
                  {memberAnalytics.length > 0 && Object.entries(...memberAnalytics).map(([key, val]) => {
                    return (
                      <div className="status-match">
                        <div className="status-cHol">
                          <div
                            className="statusimg-pending"
                            data-status={key}
                          ></div>
                          <p id="stu" className="stuName" onClick={(e) => onClickTeamMemberLeadAnalytics(key)}>{key === "new" ? "New" : key === "workInProgress" ? "Work in Progress" : key === "lost" ? "Lost" : "paid"}</p>
                        </div>
                        <p className="statusCount">{memberAnalytics[0][key].length}</p>
                      </div>

                    );
                  })}
                  {memberAnalytics.length > 0 &&<div className="status-match">
                    <div className="status-cHol">
                      <div className="statusimg-pending" data-status='all'></div>
                      <p id="stu" className="stuName" onClick={(e) => setLeadShow('All')}>Total</p>
                    </div>
                    <p className="statusCount">{allLeads.length}</p>
                  </div>} 
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

                    {subtabs === 'team' ?
                      <Input
                        inputClass="myTeamSearch"
                        type="search"
                        placeholder="Search By Name/Email/phone"
                        name="search"
                        value={tableFilter.search}
                        change={(e) =>
                          setTableFilter({
                            ...tableFilter,
                            pageNumber: 1,
                            search: e.target.value,
                          })
                        }

                      /> : 
                        // <input 

                        // type="search"
                        // placeholder="Search By Name/Email/phone"
                        // name="leadSearch"
                        // value={leadSearch}
                        // onChange={(e)=>onLeadSearch(e)}
                        // />
                      <input
                        className={leadShow === 'All'?'leadInput':'leadInputHide'}
                        type="search"
                        placeholder="Search By Name/Email/phone"
                        name="search"
                        value={leadSearch}
                        onChange={(e) =>onLeadSearch(e)
                        }
                      />
                    }
                    {/* <IoMdSearch className="IoMdSearchic" /> */}
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
                      tableLoading={tableLoading}
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
                      currentPage={leadFilter.pageNumber}
                      pageSize={leadFilter.pageRows}
                      totalCount={analRowCount}
                      tableLoading={tableLoading}
                      onPageChange={(pageNumber, pageRows) => {
                        setLeadFilter({
                          ...leadFilter,
                          pageNumber: pageNumber,
                          pageRows: pageRows,
                        });
                      }}
                      data={leadShow === 'All' ? filterleadsData : onClkAnalyticData}
                      tClass={leadShow === 'All'?'myteam perMyteam myTableLeads':'myteam perMyteam '}
                      
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

