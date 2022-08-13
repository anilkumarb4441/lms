import React,{useState,useEffect, useRef} from 'react'
import "./index.css"
import {Link} from 'react-router-dom'
import API_SERVICES from "../../utils/API"
import { URLS } from "../../utils/urlConstants"
import localStorageService from "../../utils/localStorageService.js";


//assets
import card1 from '../../assets/dashboard/card1.svg'
import card2 from '../../assets/dashboard/card2.svg'
import card3 from '../../assets/dashboard/card3.svg'
import card4 from '../../assets/dashboard/card4.svg'
import fullScreen from "../../assets/dashboard/fullScreen.svg"
import ticketPhotoTemp from "../../assets/dashboard/ticketPhotoTemp.png"
import tempPhoto from "../../assets/dashboard/tempPhoto.png"


import {MONTHS} from "../../utils/constants.js"
import {WEEKDAYS} from "../../utils/constants.js"

import Tabs from "../../components/tabs/tabs.js";

//components
import { Chart, registerables, ArcElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);
Chart.register(ArcElement);




function DashBoard() {
  const mainref  =  useRef(null)
  const { userId } = localStorageService.getTokenDecode();

  //dashboard states
  const [analyticData, setAnalyticData] = useState([])
  const [teamAnalyticData, setTeamAnalyticData] = useState([])
  const [analyticToggle, setAnalyticToggle] = useState('team') 
  const [totalCustomerData, setTotalCustomerData] = useState([])
  const [analyticChart, setAnalyticChart] = useState([])

  let week1 = analyticChart.map(val=>val.day)
  console.log(week1)

  useEffect(()=>{
    mainref.current.scrollIntoView();
    getAnalyticsSelfData();
    getAnalyticsTeamData();
    getTotalCustomerhrapghData();
  },[])

  const mainTabArr = [
    { name: "Team", value: "team" },
    { name: "Self", value: "self" },
  ];

    // Array for Tickects

    const tempTicketsArray = [
      {
        type:"Client",
        data:[
          {
            img:ticketPhotoTemp,
            name:"Ankita Ghosh",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          },
          {
            img:ticketPhotoTemp,
            name:"Ankita Ghosh",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          },
          {
            img:ticketPhotoTemp,
            name:"Ankita Ghosh",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          }
        ]
      },
      {
        type:"Chef",
        data:[
          {
            img:ticketPhotoTemp,
            name:"Ghosh Ankita ",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          },
          {
            img:ticketPhotoTemp,
            name:"Ghosh Ankita ",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          },
          {
            img:ticketPhotoTemp,
            name:"Ghosh Ankita ",
            descrip:"Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
          }
        ]
      }
    ]


  const tabrecnetOrder = [
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    },
    {
      img:tempPhoto,
      ID:"#1235",
      Name:"Arina Roy",
      Time:"9:30am-12:30pm",
      Date:"15.02.2022",
      Price:"1500 INR",
      Status:"Pending"
    }
  ]
  const [recentTabdta, setrecentTabdta] =  useState(tabrecnetOrder);
  const [checkBoxValue, setcheckBoxValue] = useState(false);
  const [ticketDisplay, setticketDisplay] = useState("Client");
  const [ticketsData, setticketsData] = useState(tempTicketsArray[0].data)

  const DgraphHeader = ({name,handleSelect})=>{
    
    return(<div className = 'dgraphHeader'>
    <p>{name}</p>
    <select onChange ={(e)=>handleSelect(e)}>
      <option>Monthly</option>
      <option>Yearly</option>
    </select></div>)
  }
    
  const [barData, setBarData] = useState({
   
    labels: WEEKDAYS,
    datasets: [
      {
        label: "Customers",
        maxBarThickness: "40",
        data:totalCustomerData,
        backgroundColor: "#E6AA55",
        hoverBackgroundColor: "#E6AA5580",
        borderWidth: 1,
      },
    ],
  });
  const [lineData, setLineData] = useState({
    labels: MONTHS,
    datasets: [
      {
        label: "Revenue",
        data: [
          2000, 3000, 4000, 5000, 1300, 3000, 6000, 2000, 3000, 4000, 1000, 500,
        ],
        backgroundColor: "#302C30",
        hoverBackgroundColor: "rgba(188, 0, 203, 0.21)",
        fill: true,
        borderWidth: 3,
       
      },
    ],
  });

  const [barOptions, setBarOptions] = useState({
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  });
  const [lineOptions, setLineOptions] = useState({
    elements:{
      line:{
        cubicInterpolationMode:'monotone'
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  });

  const  handleSelect = ()=>{

  }



  // CheckBox onchange Function

  function ticketsDisplay(e){
    ticketDisplay==="Client"?setticketDisplay("Chef"):setticketDisplay("Client");
    ticketDisplay==="Client"?setticketsData(tempTicketsArray[1].data):setticketsData(tempTicketsArray[0].data)
  }


  function getAnalyticsTeamData() {
    const callback = (err, res) => {
      if (err) {
        setTeamAnalyticData([]);
        return
      }

      if (res && res.status === 200) {
        if (res.data && res.data.status === "SUCCESS") {
          setTeamAnalyticData(res.data.data)
        } else {
          setTeamAnalyticData([]);
        }
      }
    }
    API_SERVICES.httpGETWithToken(URLS.dashboardAnalyticTeamData, callback)
  }
  

  function getAnalyticsSelfData() {
    const callback = (err, res) => {
      if (err) {
        setAnalyticData([]);
        return
      }

      if (res && res.status === 200) {
        if (res.data && res.data.status === "SUCCESS") {
          setAnalyticData(res.data.data)
 
        } else {
          setAnalyticData([]);
        }
      }
    }
    API_SERVICES.httpGETWithToken(URLS.dashboardAnalyticData+`/${userId}`, callback)
  }

  function getTotalCustomerhrapghData() {
    const callback = (err, res) => {
      if (err) {
        setTotalCustomerData([]);
        return
      }

      if (res && res.status === 200) {
       
        if (res.data && res.data.status === "SUCCESS") {
          setAnalyticChart(res.data.data.week)
          setTotalCustomerData(res.data.data.week.map(val=>val.count))
          let datasetObj ={...[...barData.datasets][0],data:res.data.data.week.map(val=>val.count)}
          setBarData({...barData,datasets:[datasetObj]}
          )
          
        } else {
          setTotalCustomerData([]);
        }
      }
    }
    API_SERVICES.httpGETWithToken(URLS.analyticsBarChart, callback)
  }

    return (
        <div className = 'dashBoardScreen' ref={mainref}>
            <div className = 'screenTitleContainer'>
            <p className = 'screenTitle'>
                Dashboard
            </p>
            </div>
            <Tabs
                    tabArr={mainTabArr}
                    activeValue={analyticToggle}
                    tabsClass="leadTabs"
                    handleTab={(e) => setAnalyticToggle(e.value)}
                  />
            {analyticToggle === 'team'&& <div className = 'dashboardCardContainer'>
               <div className = 'dashboardCard'>
                 {/* <img src = {card1} alt = 'cardImg'/> */}
                 <div>
                     <p>{teamAnalyticData.count>=0?teamAnalyticData.count:'---'}</p>
                     <p>Total Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card2} alt = 'cardImg'/> */}
                 <div>
                     <p>{teamAnalyticData.untouched>=0?teamAnalyticData.untouched:'---'}</p>
                     <p>Total untouched Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card3} alt = 'cardImg'/> */}
                 <div>
                     <p>{teamAnalyticData.pending>=0?teamAnalyticData.pending:'---'}</p>
                     <p>Total pending Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card3} alt = 'cardImg'/> */}
                 <div>
                     <p>{teamAnalyticData.close>=0?teamAnalyticData.closed:'---'}</p>
                     <p>Total Closed Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card3} alt = 'cardImg'/> */}
                 <div>
                     <p>{teamAnalyticData.lost>=0?teamAnalyticData.lost:'---'}</p>
                     <p>Total Lost Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card3} alt = 'cardImg'/> */}
                 <div>
                     <p>{teamAnalyticData.others>=0?teamAnalyticData.others:'---'}</p>
                     <p>others</p>
                 </div>
               </div>
            </div>}
            {analyticToggle === 'self'&& <div className = 'dashboardCardContainer'>
               <div className = 'dashboardCard'>
                 {/* <img src = {card1} alt = 'cardImg'/> */}
                 <div>
                     <p>{analyticData.count>=0?analyticData.count:'---'}</p>
                     <p>Total Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card2} alt = 'cardImg'/> */}
                 <div>
                     <p>{analyticData.untouched>=0?analyticData.untouched:'---'}</p>
                     <p>Total untouched Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card3} alt = 'cardImg'/> */}
                 <div>
                     <p>{analyticData.pending>=0?analyticData.pending:'---'}</p>
                     <p>Total pending Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card3} alt = 'cardImg'/> */}
                 <div>
                     <p>{analyticData.closed>=0?analyticData.closed:'---'}</p>
                     <p>Total Closed Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card3} alt = 'cardImg'/> */}
                 <div>
                     <p>{analyticData.lost>=0?analyticData.lost:'---'}</p>
                     <p>Total Lost Leads</p>
                 </div>
               </div>
               <div className = 'dashboardCard'>
                 {/* <img src = {card3} alt = 'cardImg'/> */}
                 <div>
                     <p>{analyticData.others>=0?analyticData.others:'---'}</p>
                     <p>others</p>
                 </div>
               </div>
            </div>}
            <div className='flexedgrapghParent'>
              <div className = 'dboardGraphContainer'>
                <DgraphHeader name = {'Total Revenue'} handleSelect = {(e)=>handleSelect(e)}/>
                <Line  data={lineData} options={lineOptions}/>
              </div>
              <div className = 'dboardGraphContainer'>
                <DgraphHeader name = {'Total Customers'} handleSelect = {(e)=>handleSelect(e)}/>
             <Bar data={barData} options={barOptions}/>
              </div>
            </div>
            <div className='ticketsGrapghParent'>
              <div className='chartPieConatiner'>
                <div className='ticketHead'>
                  <h4>Order Ratings Graph</h4>
                </div>
                <div className='pieParent'>
                  <div>
                    <Doughnut
                      data={{
                        labels:["Self"],
                        datasets:[
                          {
                            data:[75],
                            backgroundColor:"red",
                            circumference:300,
                            cutout:60,
                            borderColor:"transparent",
                          }
                        ],
                      }}
                    >
                      
                    </Doughnut>
                    <h2 className='abstexd'>83%</h2>
                    <h2 className='pieName'>Self Converted Leads</h2>
                  </div>
                  <div>
                    <Doughnut
                      data={{
                        labels:["Team"],
                        datasets:[
                          {
                            data:[75],
                            backgroundColor:"skyblue",
                            circumference:330,
                            cutout:60,
                            borderColor:"transparent",
                          }
                        ],
                      }}
                    >
                      
                    </Doughnut>
                    <h2 className='abstexd'>91%</h2>
                    <h2 className='pieName'>Team Converted Leads</h2>
                  </div>
                </div>
              </div>
              <div className='userTicketsSection'>
                <div className='ticketHead'>
                  <h4>Data </h4>
                  <div className='checkParentBox'>
                    <div className='checkBox'>
                      <label>
                        <div className='flexedtoggle'>
                          <p className={ticketDisplay==="Client"?"active":null}>Hot</p>
                          <p className={ticketDisplay==="Client"?null:"active"}>Cold</p>
                        </div>
                        <input checked={ticketDisplay==="Client"?false:true} type="checkbox" className='visbilityNone' onChange={(e)=>ticketsDisplay(e)} />
                      </label>
                    </div>
                    <Link to="#" className='linkfull'>
                      <img src={fullScreen} alt="FullIcon" />
                      <p>Full Screen</p>
                    </Link>
                  </div>
                </div>
                <div className='tickets'>
                  {
                    ticketsData.map((val,key)=>{
                      return(
                        <div className='tickectParent' key={key}>
                          <div className='tickImg'>
                            <img src={val.img} alt="Photo" />
                          </div>
                          <div className='ticketContentHolder'>
                            <h3 className='TuserName'>{val.name}</h3>
                            <p className='ticketDescript'>{val.descrip}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className='recentConatiner'>
              <h4>Recent Leads list</h4>
              <table>
                    <thead>
                        <tr>
                            <th>preview</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Time</th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTabdta.map((val,key)=>{
                            return(
                                <tr key={key} >
                                    <td><img src={val.img} /></td>
                                    <td>{val.ID}</td>
                                    <td>{val.Name}</td>
                                    <td>{val.Time}</td>
                                    <td>{val.Date}</td>
                                    <td>{val.Price}</td>
                                    <td>{val.Status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
              </table>
            </div>
        </div>
    )
}

export default DashBoard
