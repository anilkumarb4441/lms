import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
//assets
import mailIcon from "../../assets/chefview/mailIcon.svg"
import phoneIcon from "../../assets/chefview/phoneIcon.svg"
import locationIcon from "../../assets/clientView/locationIcon.svg"
import booked from "../../assets/clientView/booked.svg"
//css
import './overviewInner.css'
import DoughnutComp from '../../components/doughnut/doughnut';
import { Chart, registerables, ArcElement } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
const OverViewInner = ({ selectedclient, setSelectedClient }) =>
{
  Chart.register(...registerables);
Chart.register(ArcElement);
  const [tickets, setTickets] = useState([]);
  const trackValue = 30;
  return (
      <div className="overviewInner">
                  <div className="flexalign">
          <IoIosArrowBack className = 'goBack' onClick={(e)=>setSelectedClient(false)}/>
          <h1>Client-{selectedclient}</h1>
        </div>
      <div className="section1">
              <div className="clientInfoCard">
                <div className="clientInfo">
            <div className="imgHold">
                  </div>
            <h2>Ekka Singh</h2>
            <p>{selectedclient}</p>
                </div>
                <div className="clientContact">
            <div className="contactItem">
              <img src={mailIcon} alt="MailIcon" />
                  <a href="mailto:Enakshi@gmail.com">Enakshi@gmail.com</a></div>
            <div className="contactItem">
              <img src={phoneIcon} alt="MailIcon" />
                  <a href="tel:9123456789">9123456789</a>
                      </div>
            <div className="contactItem">
                         <img src={locationIcon} alt="MailIcon" style={{width: "76px"}}/>
                  <a href="tel:9123456789">Sed ut perspiciatis unde omnis iste natus error sit voluptatem  doloremque laudantium, totam rem aperiam.</a>
                      </div>
                </div>
              </div>
              <div className='userTicketsSection'>
                    <div className='ticketHead'>
                      <h4>Tickets </h4>
                    </div>
                    <div className='tickets'>
                    </div>
              </div>
            </div>
      <div className="section2">
        <div className="secCards"> <div className="header"><div>Order-#1234</div> <button className='header-btn booked'>Booked</button></div>
        <div className="orderInfo">  <div class="pie-wrapper progress-45 style-2">
  <img src={booked} alt="" />
    <div class="pie">
      <div class="left-side half-circle"></div>
      <div class="right-side half-circle"></div>
    </div>
    <div class="shadow"></div>
  </div></div>
        <div className="orderStatus"></div>
        </div>
        <div className="secCards"> <div className="header"><div>Order-#1234</div> <button className='header-btn hasIssue'>Booked</button></div>
          <div className="orderInfo" style={{height:"150px",wisth:"150px"}}>
            <div className="leftInfo">
                                    <Doughnut
                      data={{
                        datasets:[
                          {
                            data:[trackValue,100-trackValue],
                            backgroundColor:["#45B0F5","#707070A3"],
                            circumference:360,
                            cutout:50,
                            borderColor:"transparent",
                          }
                        ],
                      }}
                    >            
                    </Doughnut>
                      <img src={booked} alt="" />
            </div>
            <div className="rightInfo">
              <div className="infoElements">
                <p>Booked on:</p>
                <p>09.02.22</p>
              </div>
            </div>
          </div>
        <div className="orderStatus"></div>
        </div>
          </div>
          
     </div>
  )
}

export default OverViewInner
