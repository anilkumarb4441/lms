import React,{useState,useEffect} from 'react'
import "./doughnut.css"
import { Chart, registerables, ArcElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
Chart.register(...registerables);
Chart.register(ArcElement);

function DoughnutComp({type,digit,subtext}){
    // console.log(type,digit,subtext,"555555555");
    return(
        <div className='doughParent'>
            <Doughnut
                data={{

                    datasets:[
                        {
                            data:(type==="Ratings"?[75,25]:[digit,100-digit]),
                            backgroundColor:(type==="Ratings"?["red","#63626A"]:type==="Total Coupons"?["skyblue","#63626A"]:type==="Total Bookings"?["red","#63626A"]:type==="Attendance"?[(digit>70?"green":digit<70&&digit>50?"red":null),"#63626A"]:null),
                            circumference:360,
                            cutout:100,
                            borderColor:"transparent",
                          }
                        ],
                      }}
            >
                      
            </Doughnut>
            <p className='absD1'>{digit}{type==="Attendance"?"%":null}</p>
            <p className='absD2'>{subtext}</p>
        </div>
    )
}

export default DoughnutComp;