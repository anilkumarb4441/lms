import React, { useState, useEffect, useRef } from 'react'
import "./index.css"
import { Link } from 'react-router-dom'
import API_SERVICES from "../../utils/API"
import { URLS } from "../../utils/urlConstants"
import localStorageService from "../../utils/localStorageService.js";
import * as utils from "../../utils/constants";



//assets
import card1 from '../../assets/dashboard/card1.svg'
import card2 from '../../assets/dashboard/card2.svg'
import card3 from '../../assets/dashboard/card3.svg'
import card4 from '../../assets/dashboard/card4.svg'
import fullScreen from "../../assets/dashboard/fullScreen.svg"
import ticketPhotoTemp from "../../assets/dashboard/ticketPhotoTemp.png"
import tempPhoto from "../../assets/dashboard/tempPhoto.png"
import searchIcon from '../../assets/icons/searchIcon.svg'

import { MONTHS } from "../../utils/constants.js"
import { WEEKDAYS } from "../../utils/constants.js"

//components
import Dropdown from "../../components/dropdown/dropdown.js";
import Tabs from "../../components/tabs/tabs.js";
import CustomDateRange from "../../components/dateRangePicker/dateRangePicker";

import Table from "../../components/Table";
import CustomCalender from '../../components/calender/customCalender'
import ComparisonDateRange from '../../components/comparisonDateRange/comparisonDateRange'




function DashBoard() {
  const mainref = useRef(null)
  const { userId } = localStorageService.getTokenDecode();

  //dashboard states
  const [analyticData, setAnalyticData] = useState([])
  const [analyticToggle, setAnalyticToggle] = useState('self')
  const [totalCustomerData, setTotalCustomerData] = useState([])
  const [charBartFilter, setChartBarFilter] = useState('week')
  const [selfrating, setSelfRating] = useState([]);
  const [teamRating, setteamRating] = useState([]);
  const [revenueProjeceted, setRevenueProjected] = useState([]);
  const [revenueToggle, setRevenueToggle] = useState('projected')

  // version 2
  const [search, setSearch] = useState('');
  const [singleDate, setSingleDate] = useState('');
  const [revenueLeads, setRevenueLeads] = useState([]);
  const [comprange1, setCompRange1] = useState(null);
  const [comprange2, setCompRange2] = useState(null);

  let dateRange1 = [comprange1 && comprange1.length>0?utils.DateObjectToString(comprange1[0]):null, comprange1 && comprange1.length>0?utils.DateObjectToString(comprange1[1]):null]
  let dateRange2 = [comprange2 && comprange2.length>0?utils.DateObjectToString(comprange2[0]):null, comprange2 && comprange2.length>0?utils.DateObjectToString(comprange2[1]):null]


  const YEARS = [
    '2022',
    '2023'

  ]

  useEffect(() => {
    mainref.current.scrollIntoView();
  }, [])

  useEffect(() => {
    getAnalyticsSelfData();
    // getRevenueProjected();
  }, [charBartFilter, analyticToggle ])

 
  const mainTabArr = [
    { name: "Self", value: "self" },
    { name: "Team", value: "team" },

  ];

  const barChartSelect = [
    { name: "Weekly", value: "week" },
    { name: "Monthly", value: "month" },
    { name: "Yearly", value: "year" },
  ];




 








 


  function getAnalyticsSelfData() {
    const callback = (err, res) => { 
      if (err) {
        setAnalyticData([]);

        return
      }

      if (res && res.status === 200) {
        if (res.data && res.data.status === "SUCCESS") {
          setAnalyticData(res.data.data.stats)

        } else {
          setAnalyticData([]);
        }
      }
    }
    API_SERVICES.httpGETWithToken(URLS.dashboardAnalyticData + `?q=${analyticToggle}&type=${charBartFilter}`, callback)
  }

  function getRevenueProjected() {
   
    const callback = (err, res) => {
      if (err) {
        return;
      }
      // lineData, setLineData
      if (res && res.status === 200) {
      
    }
    API_SERVICES.httpGETWithToken(URLS.analyticsRevenueProjected, callback)
  }
}


const tableData = [
  {
   dateRange:'primary',
   callBacks:200,
   totalLeads:40,
   interested:10,
   paymentLinks:10,
   payments:20,
   convRate:'10.00%'
  },
  {
   dateRange:'primary',
   callBacks:200,
   totalLeads:40,
   interested:10,
   paymentLinks:10,
   payments:20,
   convRate:'10.00%'
  }
]
const [columns, setColumns] = useState([
 {
   Header: "Date Range",
   accessor: "dateRange",
 },
 {
   Header: "Call Backs",
   accessor: "callBacks",
 },
 {
   Header: "Total Leads",
   accessor: "totalLeads",
 },
 {
   Header: "Interested",
   accessor: "interested",
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
 },
])


  return (
    <div className='dashBoardScreen' ref={mainref}>
      <div className='screenTitleContainer'>
        <p className='screenTitle'>
          Dashboard
        </p>
      </div>
      <div className='dashbord-FilersWraper'>
        <Tabs
          tabArr={mainTabArr}
          activeValue={analyticToggle}
          tabsClass="leadTabs"
          handleTab={(e) => setAnalyticToggle(e.value)}
        />
        <div>
          <Dropdown
            dropdownClass="dashbordDropdown-filter"
            value={charBartFilter}
            options={barChartSelect}
            onchange={(item) => setChartBarFilter(item.value)}
          />
        </div>
      </div>

      <div className='dashboardCardContainer'>
        <div className='dashboardCard'>
          {/* <img src = {card1} alt = 'cardImg'/> */}
          <div>
            <p>{analyticData.count >= 0 ? analyticData.count : '0'}</p>
            <p>Total Leads</p>
          </div>
        </div>
        <div className='dashboardCard'>
          {/* <img src = {card2} alt = 'cardImg'/> */}
          <div>
            <p>{analyticData.untouched >= 0 ? analyticData.untouched : '0'}</p>
            <p>Total untouched Leads</p>
          </div>
        </div>
        <div className='dashboardCard'>
          {/* <img src = {card3} alt = 'cardImg'/> */}
          <div>
            <p>{analyticData.pending >= 0 ? analyticData.pending : '0'}</p>
            <p>Total pending Leads</p>
          </div>
        </div>
        <div className='dashboardCard'>
          {/* <img src = {card3} alt = 'cardImg'/> */}
          <div>
            <p>{analyticData.closed >= 0 ? analyticData.closed : '0'}</p>
            <p>Total Closed Leads</p>
          </div>
        </div>
        <div className='dashboardCard'>
          {/* <img src = {card3} alt = 'cardImg'/> */}
          <div>
            <p>{analyticData.lost >= 0 ? analyticData.lost : '0'}</p>
            <p>Total Lost Leads</p>
          </div>
        </div>
        <div className='dashboardCard'>
          {/* <img src = {card3} alt = 'cardImg'/> */}
          <div>
            <p>{analyticData.others >= 0 ? analyticData.others : '0'}</p>
            <p>others</p>
          </div>
        </div>
      </div>
      <div className='funnelDashbord-wraper'>
        <h4 className='dashHeadline'>Lead Funnel Dashbord</h4>
        <div className='dashbordFilter-holer'>
         <div className='filterbetween'>
         <div className='searchHolder'>
            <img  src={searchIcon} alt='search'/>
            <input type='search' placeholder='Search By Name' value={search} onChange/>
          </div>
          <Dropdown
            dropdownClass="dashbordDropdown-filter"
            value={charBartFilter}
            options={barChartSelect}
            onchange={(item) => setChartBarFilter(item.value)}
          />
         </div>
        <div className='filterbetween'>
             <div className='dateFilter'>
              <p>Select Date</p>
       
         <CustomCalender 
         range={singleDate} 
         onChange={(arr) => {
                setSingleDate(arr)
              }}/>
             </div>
           
             <div className='dateFilter'>
             <p>Select Comparison Date Range</p>
             <ComparisonDateRange   range={comprange1}
              range2={comprange2}
              onChange={(arr) => {
                setCompRange1(arr);
              }}
              onChangerange={(arr) => {
                setCompRange2(arr);
              }}/>
             </div>
             
        </div>

        </div>
       
        <div className='funnelTable'>
        <Table
                      columns={columns}
                      // pagination={true}
                      // currentPage={tableFilter.pageNumber}
                      // pageSize={tableFilter.pageRows}
                      // totalCount={totalRowCount}
                      // tableLoading={tableLoading}
                      // onPageChange={(pageNumber, pageRows) => {
                      //   setTableFilter({
                      //     ...tableFilter,
                      //     pageNumber: pageNumber,
                      //     pageRows: pageRows,
                      //     search: "",
                      //   });
                      // }}
                      data={tableData}
                      tClass="myteam dashbordRevenueTable"
                    />
        </div>
      </div>
      {/* <div className='funnelDashbord-wraper'>
        <h4 className='dashHeadline'>Revenue Dashbord</h4>
        

        <div className='funnelTable'>
        <Table
                      columns={columns}
                      // pagination={true}
                      // currentPage={tableFilter.pageNumber}
                      // pageSize={tableFilter.pageRows}
                      // totalCount={totalRowCount}
                      // tableLoading={tableLoading}
                      // onPageChange={(pageNumber, pageRows) => {
                      //   setTableFilter({
                      //     ...tableFilter,
                      //     pageNumber: pageNumber,
                      //     pageRows: pageRows,
                      //     search: "",
                      //   });
                      // }}
                      data={tableData}
                      tClass="myteam dashbordRevenueTable"
                      
                    />
        </div>
      </div>
      <div className='funnelDashbord-wraper'>
      {
       comprange1&&  comprange1.length> 0&&<p>{utils.DateObjectToString(comprange1[0])} to {utils.DateObjectToString(comprange1[1])}</p>
      }
        <h4 className='dashHeadline'>Pending Payments Dashbord</h4>
       

        <div className='funnelTable'>
        <Table
                      columns={columns}
                      // pagination={true}
                      // currentPage={tableFilter.pageNumber}
                      // pageSize={tableFilter.pageRows}
                      // totalCount={totalRowCount}
                      // tableLoading={tableLoading}
                      // onPageChange={(pageNumber, pageRows) => {
                      //   setTableFilter({
                      //     ...tableFilter,
                      //     pageNumber: pageNumber,
                      //     pageRows: pageRows,
                      //     search: "",
                      //   });
                      // }}
                      data={tableData}
                      tClass="myteam dashbordRevenueTable"
                    />
        </div>
      </div> */}
    
    </div>
  )
}

export default DashBoard
