import React, { useState, useEffect, useRef } from 'react'
import "./index.css"
import { Link } from 'react-router-dom'
import API_SERVICES from "../../utils/API"
import { URLS } from "../../utils/urlConstants"
import localStorageService from "../../utils/localStorageService.js";
import * as utils from "../../utils/constants";
import * as actions from "./actions.js"
import { useSelector, useDispatch } from 'react-redux'



//assets
import searchIcon from '../../assets/icons/searchIcon.svg'


//components
import Dropdown from "../../components/dropdown/dropdown.js";
import Tabs from "../../components/tabs/tabs.js";
import CustomDateRange from "../../components/dateRangePicker/dateRangePicker";

import Table from "../../components/Table";
import CustomCalender from '../../components/calender/customCalender'
import ComparisonDateRange from '../../components/comparisonDateRange/comparisonDateRange'
import { initialState } from '../leads/reducer'
import { BsNodePlusFill } from 'react-icons/bs'


function DashBoard() {
  const mainref = useRef(null)
  const { userId } = localStorageService.getTokenDecode();
  const dispatch = useDispatch();
  const dashbordData = useSelector((state) => state.dashboard);

  console.log(dashbordData.arr, 'dashbordData')


  const [analyticToggle, setAnalyticToggle] = useState('self')
  const [charBartFilter, setChartBarFilter] = useState('today')

  // version 2
  const [search, setSearch] = useState('');
  const [singleDate, setSingleDate] = useState(new Date());
  const [rangeDate, setRangeDate] = useState(null);
  const [funnelLeads, setFunnelLeads] = useState([]);
  const [leadsComparison, setLeadComaprison] = useState([])
  const [comprange1, setCompRange1] = useState(null);
  const [comprange2, setCompRange2] = useState(null);
  const [tableLoading, setTableLoading] = useState({ funnelTable: 'false', comparisonTable: 'false' });
  const [teamMembers, setTeamMebers] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [memberSow, setMemberShow] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [showMember, setShowMember] = useState(false);
  const [memberName, setMemberName] = useState('Team');


  let dateRange1 = [comprange1 && comprange1.length > 0 ? utils.DateObjectToString(comprange1[0]) : '', comprange1 && comprange1.length > 0 ? utils.DateObjectToString(comprange1[1]) : '']
  let dateRange2 = [comprange2 && comprange2.length > 0 ? utils.DateObjectToString(comprange2[0]) : '', comprange2 && comprange2.length > 0 ? utils.DateObjectToString(comprange2[1]) : '']
  let rangeDateValue = [rangeDate && rangeDate.length > 0 ? utils.DateObjectToString(rangeDate[0]) : '', rangeDate && rangeDate.length > 0 ? utils.DateObjectToString(rangeDate[1]) : '']
  let dailyDate = singleDate !== '' ? utils.DateObjectToString(singleDate) : ""


  const isBelowThreshold = (currentValue) => currentValue === '';

  const tableData = dateRange1.every(isBelowThreshold) && dateRange2.every(isBelowThreshold) ? funnelLeads : leadsComparison;

  useEffect(() => {
    mainref.current.scrollIntoView();
    getMyTeamData();
   
  }, [])

  const mainTabArr = [
    { name: "Self", value: "self" },
    { name: "Team", value: "team" },

  ];

  const barChartSelect = [
    { name: "Daily", value: "today" },
    { name: "Range", value: "range" },
    { name: "comparison Range", value: "compRange" },
  ];

  const [comparisonCoulumn, setComparisonCoulumn] = useState([
    {
      Header: "Date Range",
      accessor: "Primary",
      Cell: (props) => {
        let primObj = props.cell.row.original.Primary;
        return (
          <p data-status={primObj} >{props.cell.row.original.Primary}</p>
        )
      }

    },
    {
      Header: "Call Backs",
      accessor: "CallBack",
    },
    {
      Header: "Total Leads",
      accessor: "count",
    },
    {
      Header: "Interested",
      accessor: "Interested",
    },
    {
      Header: "Payment Links",
      accessor: "paymentLinks",
    },
    {
      Header: "Payments",
      accessor: "payments",
    },
    {
      Header: "conv Rate",
      accessor: "convRate",
      Cell: (props) => {
        let convCount = (props.cell.row.original.closed / props.cell.row.original.count) * 100
        return (
          <p >{convCount > 0 ? convCount.toFixed(3) : 0} %</p>
        )
      }
    },
  ])

  function calcDelta(prim, seco) {
    let calc = (prim - seco) / seco;
    let calValue = calc ? calc.toFixed(3) : 0
    return calValue;
  }


  function getFunnelLeads() {
    const objDate = charBartFilter === 'today' ? dailyDate : rangeDateValue;
    const setobjValue = charBartFilter === 'today' ? 'today' : 'range'
    setTableLoading({ ...tableLoading, funnelTable: true })
    const callback = (err, res) => {
      setTableLoading({ ...tableLoading, funnelTable: false })
      if (err) {
        setFunnelLeads([])
        return;
      }
      if (res && res.status === 200) {
        if (res.data && res.data.status === "SUCCESS") {
          setFunnelLeads([res.data.data.stats]);

        } else {
          setFunnelLeads([]);
        }

      }
    }
    API_SERVICES.httpPOSTWithToken(URLS.getFunnelLeadsforSingle + `?q=${analyticToggle}&type=${setobjValue}&userId=${analyticToggle === 'team' ? memberId : ''}`, { date: objDate }, callback)
  }

  function getComparisonLeads() {
    let dateObj = {
      date1: dateRange1,
      date2: dateRange2,
    }
    if (dateRange1.every(isBelowThreshold) && dateRange2.every(isBelowThreshold)) {
      return;
    } else {
      setTableLoading({ ...tableLoading, comparisonTable: true })
      const callback = (err, res) => {
        setTableLoading({ ...tableLoading, comparisonTable: false })
        if (err) {
          setLeadComaprison([]);
          return;
        }
        if (res && res.status === 200) {
          if (res.data && res.data.status === "SUCCESS") {
            let inData = res.data.data;
            let delta = {
              Primary: 'Delta',
              count: `${calcDelta(inData[0].count, inData[1].count)} %`,
              CallBack: `${calcDelta(inData[0].CallBack, inData[1].CallBack)} %`,
              Interested: `${calcDelta(inData[0].Interested, inData[1].Interested)} %`,
              closed: `${calcDelta(inData[0].closed, inData[1].closed)} %`,
            }
            let objData = [...inData, delta]
            setLeadComaprison(objData);
          } else {
            setLeadComaprison([]);
          }
        }
      }
      API_SERVICES.httpPOSTWithToken(URLS.getComparisonLeads + `?q=${analyticToggle}&type=range&userId=${analyticToggle === 'team' ? memberId : ''}`, { date: dateObj }, callback)
    }
  }


  useEffect(() => {
    getFunnelLeads();
    let memIdd = analyticToggle === 'self' ? '' : memberId
    setMemberId(memIdd);
    let memName = analyticToggle === 'self' ? 'Team' : memberName
    setMemberName(memName)
    setCompRange1(charBartFilter === 'today' ? null : charBartFilter === 'range' ? null : comprange1);
    setCompRange2(charBartFilter === 'today' ? null : charBartFilter === 'range' ? null : comprange2);
    dispatch(actions.getFunnelLeads(tableData));
  }, [analyticToggle, memberId, singleDate, rangeDate])

  useEffect(() => {
    getComparisonLeads();
  }, [comprange1, comprange2, analyticToggle, memberId])

  function getMyTeamData() {
    const callback = (err, res) => {
      if (err) {
        setTeamMebers([]);
        return
      }
      if (res && res.status === 200) {
        if (res.data[0]?.directMembers) {
          let team = { userId: '', name: 'Team', }
          setTeamMebers([team, ...res.data[0].directMembers])
        } else {
          setTeamMebers([]);
        }
      }
    }
    API_SERVICES.httpPOSTWithToken(URLS.myteammembers, { pagination: false }, callback)
  }

  const empDataHandle = (e) => {
    let text = e.target.value.toLowerCase();
    setSearch(e.target.value);
    let filteredList = teamMembers
      ? teamMembers.filter((item) => {
        let eSearch = item?.name?.toLowerCase().includes(text)
        return eSearch
      }
      )
      : [];

    setFilterData([...filteredList]);
  };

 

  return (
    <div className='dashBoardScreen' ref={mainref}>
      <div className='screenTitleContainer'>
        <p className='screenTitle'>
          Dashboard
        </p>
      </div>

      <div className='funnelDashbord-wraper'>
        <h4 className='dashHeadline'>Lead Funnel Dashbord</h4>
        <Tabs
          tabArr={mainTabArr}
          activeValue={analyticToggle}
          tabsClass="leadTabs"
          handleTab={(e) => setAnalyticToggle(e.value)}
        />
        <div className='dashbordFilter-holer'>
          <div className='filterbetween'>
            <Dropdown
              dropdownClass="dashbordDropdown-filter"
              value={charBartFilter}
              options={barChartSelect}
              onchange={(item) => setChartBarFilter(item.value)}
            />
            {analyticToggle === 'team' &&
              <div className='memberSearchHolder'>
                {showMember === true ?
                  <div className='searchHolder' >
                    <img src={searchIcon} alt='search' />
                    <input onClick={() => setMemberShow(!memberSow)} type='search' value={search} placeholder='Search By Name' onChange={(e) => empDataHandle(e)} onFocus={() => { setFilterData(teamMembers) }} />
                  </div>
                  :
                  <div className='searchHolder' onClick={() => { setShowMember(true); setMemberId('') }}>
                    <p >{memberName}</p>
                    <span>X</span>
                  </div>
                }
                {memberSow === true && <div className='memberHolder'>
                  {filterData && filterData.map((item) => {
                    return (
                      <p onClick={() => { setMemberId(item.userId); setMemberName(item.name); setShowMember(false); setMemberShow(false) }}>{item.name}</p>
                    )
                  })
                  }
                </div>}
              </div>}

          </div>
          <div className='filterbetween'>
            {charBartFilter === 'today' ?
              <div className='dateFilter'>
                <p>Select Single Date</p>

                <CustomCalender
                  range={singleDate}
                  onChange={(arr) => {
                    setSingleDate(arr)
                  }} />
              </div>
              : charBartFilter === 'range' ?
                <div className='dateFilter'>
                  <p>Select range Date</p>

                  <CustomDateRange
                    range={rangeDate}
                    onChange={(arr) => {
                      setRangeDate(arr)
                    }} />
                </div> :
                <div className='dateFilter'>
                  <p>Select Comparison Date Range</p>
                  <ComparisonDateRange range={comprange1}
                    range2={comprange2}
                    onChange={(arr) => {
                      setCompRange1(arr);
                    }}
                    onChangerange={(arr) => {
                      setCompRange2(arr);
                    }} />
                </div>
            }
          </div>

        </div>

        <div className='funnelTable'>
          <Table
            columns={[...comparisonCoulumn]}
            data={tableData}
            tableLoading={tableLoading.funnelTable}
            tClass="myteam dashbordComparisonTable"
          />
        </div>
      </div>

    </div>
  )
}

export default DashBoard
