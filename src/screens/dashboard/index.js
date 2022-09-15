import React, { useState, useEffect, useRef } from 'react'
import "./index.css"
import { Link } from 'react-router-dom'
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


import { MONTHS } from "../../utils/constants.js"
import { WEEKDAYS } from "../../utils/constants.js"
import Dropdown from "../../components/dropdown/dropdown.js";
import Tabs from "../../components/tabs/tabs.js";

//components
import { Chart, registerables, ArcElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);
Chart.register(ArcElement);




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

  useEffect(() => {
    getRevenueProjected();
  }, [charBartFilter, analyticToggle, revenueToggle])

  const mainTabArr = [
    { name: "Self", value: "self" },
    { name: "Team", value: "team" },

  ];
  const revenueTab = [
    { name: "projected", value: "projected" },
    { name: "Generated", value: "generated" },

  ];

  const barChartSelect = [
    { name: "Weekly", value: "week" },
    { name: "Monthly", value: "month" },
    { name: "Yearly", value: "year" },
  ];

  // Array for Tickects

  const tempTicketsArray = [
    {
      type: "Client",
      data: [
        {
          img: ticketPhotoTemp,
          name: "Ankita Ghosh",
          descrip: "Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        },
        {
          img: ticketPhotoTemp,
          name: "Ankita Ghosh",
          descrip: "Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        },
        {
          img: ticketPhotoTemp,
          name: "Ankita Ghosh",
          descrip: "Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        }
      ]
    },
    {
      type: "Chef",
      data: [
        {
          img: ticketPhotoTemp,
          name: "Ghosh Ankita ",
          descrip: "Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        },
        {
          img: ticketPhotoTemp,
          name: "Ghosh Ankita ",
          descrip: "Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        },
        {
          img: ticketPhotoTemp,
          name: "Ghosh Ankita ",
          descrip: "Lorem ipsum dolor sit amet, repudiare inczxiderint qui ei, Lorem ipsum do",
        }
      ]
    }
  ]


  const tabrecnetOrder = [
    {
      img: tempPhoto,
      ID: "#1235",
      Name: "Arina Roy",
      Time: "9:30am-12:30pm",
      Date: "15.02.2022",
      Price: "1500 INR",
      Status: "Pending"
    },
    {
      img: tempPhoto,
      ID: "#1235",
      Name: "Arina Roy",
      Time: "9:30am-12:30pm",
      Date: "15.02.2022",
      Price: "1500 INR",
      Status: "Pending"
    },
    {
      img: tempPhoto,
      ID: "#1235",
      Name: "Arina Roy",
      Time: "9:30am-12:30pm",
      Date: "15.02.2022",
      Price: "1500 INR",
      Status: "Pending"
    },
    {
      img: tempPhoto,
      ID: "#1235",
      Name: "Arina Roy",
      Time: "9:30am-12:30pm",
      Date: "15.02.2022",
      Price: "1500 INR",
      Status: "Pending"
    }
  ]
  const [recentTabdta, setrecentTabdta] = useState(tabrecnetOrder);
  const [checkBoxValue, setcheckBoxValue] = useState(false);
  const [ticketDisplay, setticketDisplay] = useState("Client");
  const [ticketsData, setticketsData] = useState(tempTicketsArray[0].data)

  const DgraphHeader = ({ name, charBartFilter, setChartBarFilter }) => {

    return (<div className='dgraphHeader'>
      <p>{name}</p>
      <select value={charBartFilter} onChange={(e) => { handleSelect(e) }}>
        <option value='week'>Weekly</option>
        <option value='month'>Monthly</option>
        <option value='year'>Yearly</option>
      </select>
    </div>)
  }


  const barlabel = charBartFilter === 'week' ? WEEKDAYS : charBartFilter === 'month' ? MONTHS : YEARS

  const [barData, setBarData] = useState({

    labels: barlabel,
    datasets: [
      {
        label: "Customers",
        maxBarThickness: "40",
        data: totalCustomerData,
        backgroundColor: "#E6AA55",
        hoverBackgroundColor: "#E6AA5580",
        borderWidth: 1,
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: barlabel,
    datasets: [
      {
        label: "Revenue",
        data:revenueProjeceted,
        // data:revenueToggle==='projected'?revenueProjeceted:revenueGenerated,
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
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  });
  const [lineOptions, setLineOptions] = useState({
    elements: {
      line: {
        cubicInterpolationMode: 'monotone'
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  });

  // const [selfRating]

  const handleSelect = (e) => {

  }


  // CheckBox onchange Function

  function ticketsDisplay(e) {
    ticketDisplay === "Client" ? setticketDisplay("Chef") : setticketDisplay("Client");
    ticketDisplay === "Client" ? setticketsData(tempTicketsArray[1].data) : setticketsData(tempTicketsArray[0].data)
  }


  function getAnalyticsSelfData() {
    const callback = (err, res) => {
      if (err) {
        setAnalyticData([]);
        setTotalCustomerData([]);
        return
      }

      if (res && res.status === 200) {
        if (res.data && res.data.status === "SUCCESS") {
          setAnalyticData(res.data.data.stats)

          // line graph
          let barData1 = res.data.data.barchatstats ? res.data.data.barchatstats[charBartFilter] : []
          let datasetObj = { ...barData.datasets[0], data: Object.values(barData1) }
          let labelObj = { ...barData.labels, labels: barlabel }
          setBarData({ ...barData, ...labelObj, datasets: [datasetObj] });

          let lineLabel = { ...lineData.labels, labels: barlabel }
          setLineData({ ...lineData, ...lineLabel })
          setTotalCustomerData(Object.values(barData1))

          // revuenu graph

          // rating graoph
          let selfRatingData = res.data.data.self ? res.data.data.self : [];
          setSelfRating(selfRatingData);
          let teamRatingData = res.data.data.team ? res.data.data.team : [];
          setteamRating(teamRatingData);

        } else {
          setAnalyticData([]);
          setTotalCustomerData([]);
        }
      }
    }
    API_SERVICES.httpGETWithToken(URLS.dashboardAnalyticData + `?q=${analyticToggle}&type=${charBartFilter}`, callback)
  }

  function getRevenueProjected() {
   
    const callback = (err, res) => {
      if (err) {
        setRevenueProjected([]);
        return;
      }
      // lineData, setLineData
      if (res && res.status === 200) {
        if (res.data && res.data.status === "SUCCESS") {  
          let revProjBarData = res.data.data &&res.data.data[0] ? res.data.data[0] : []
          let datasetObj = { ...lineData.datasets[0], data: Object.values(revProjBarData)}
          let labelObj = { ...barData.labels, labels: barlabel }
          setLineData({...lineData, ...labelObj, datasets: [datasetObj]});
          setRevenueProjected(Object.values(revProjBarData));
   


        } else {
       
          setRevenueProjected([]);
        }
      }
    }
   
    API_SERVICES.httpGETWithToken(revenueToggle ==='projected'?URLS.analyticsRevenueProjected+`?q=${analyticToggle}&type=${charBartFilter}`:URLS.analyticsRevenueGenerated+ `?q=${analyticToggle}&type=${charBartFilter}`, callback)
  }



  function pecentageCalc(count, conversion) {
    var calcu = (conversion / count) * 100;
    return calcu;
  }

  const selfRatingInPercent = selfrating.conversionCount >= 0 && selfrating.count >= 0  ? pecentageCalc(selfrating.count, selfrating.conversionCount) : 'loading...';
  const TeamRatingInPercent = teamRating.conversionCount >= 0 && teamRating.count >= 0 ? pecentageCalc(teamRating.count, teamRating.conversionCount) : 'loading...';

  // const TeamRatingInPercent = 20;
  function perceConvertDeg(valu) {
    let calcValue = (valu / 100) * 360;
    return calcValue;
  }

  const selfDeg = perceConvertDeg(selfRatingInPercent);
  const teamDeg = perceConvertDeg(TeamRatingInPercent)


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
      <div className='revenueTabs'>
          <Tabs
          tabArr={revenueTab}
          activeValue={revenueToggle}
          tabsClass="leadTabs"
          handleTab={(e) => setRevenueToggle(e.value)}
        />
          </div>
      <div className='flexedgrapghParent'>
     
        <div className='dboardGraphContainer'>
          {/* <DgraphHeader name = {'Total Revenue'} handleSelect = {(e)=>handleSelect(e)}/> */}
          
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className='dboardGraphContainer'>
          {/* <DgraphHeader name = {'Total Customers'} setChartBarFilter={setChartBarFilter}/>
                 */}

          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className='ticketsGrapghParent'>
        <div className='chartPieConatiner'>
          <div className='ticketHead'>
            <h4>Conversion Ratings</h4>
          </div>
          <div className='pieParent'>
            <div>
              <Doughnut
                data={{
                  labels: ["Self"],
                  datasets: [
                    {
                      data: [selfrating.conversionCount],
                      backgroundColor: "red",
                      circumference: selfDeg,
                      cutout: 60,
                      borderColor: "transparent",

                    }
                  ],
                }}
              >

              </Doughnut>
              <h2 className='abstexd'>{selfRatingInPercent >= 0 ? selfRatingInPercent.toFixed(2) : 0} %</h2>
              <h2 className='pieName'>{selfrating.conversionCount} / {selfrating.count}</h2>
            </div>
            <div>
              <Doughnut
                data={{
                  labels: ["Team"],
                  datasets: [
                    {
                      data: teamRating ? [teamRating.conversionCount] : [0],
                      backgroundColor: "skyblue",
                      circumference: teamDeg,
                      cutout: 60,
                      borderColor: "transparent",
                    }
                  ],
                }}
              >

              </Doughnut>
              <h2 className='abstexd'>{TeamRatingInPercent >= 0 ? TeamRatingInPercent.toFixed(2) : 0} %</h2>
              <h2 className='pieName'>{teamRating.conversionCount} / {teamRating.count}</h2>
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
                    <p className={ticketDisplay === "Client" ? "active" : null}>Hot</p>
                    <p className={ticketDisplay === "Client" ? null : "active"}>Cold</p>
                  </div>
                  <input checked={ticketDisplay === "Client" ? false : true} type="checkbox" className='visbilityNone' onChange={(e) => ticketsDisplay(e)} />
                </label>
              </div>
              {/* <Link to="#" className='linkfull'>
                      <img src={fullScreen} alt="FullIcon" />
                      <p>Full Screen</p>
                    </Link> */}
            </div>
          </div>
          <div className='tickets'>
            {
              ticketsData.map((val, key) => {
                return (
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
      {/* <div className='recentConatiner'>
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
            {recentTabdta.map((val, key) => {
              return (
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
      </div> */}
    </div>
  )
}

export default DashBoard
