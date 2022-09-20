import React,{useState} from 'react'
import * as utils from "../../utils/constants";
//css
import "./comparisonDateRange.css"
import "react-calendar/dist/Calendar.css";

//components
import Calendar from 'react-calendar'
import {IoIosArrowBack} from "react-icons/io"
import {IoIosArrowForward} from "react-icons/io"
import {HiChevronDoubleLeft} from "react-icons/hi"
import {HiChevronDoubleRight} from "react-icons/hi"
import {GrPowerReset} from "react-icons/gr"
import {BsCalendar} from "react-icons/bs"

function ComparisonDateRange({onChange, onChangerange,range, range2}) {
    const [show,toggleCalendar] = useState(false);
    const [value,setValue] = useState();
    const [value2,setValue2] = useState();
    const reset =()=>{
        onChange(null)
        setValue();
        setValue2();
    }
    return (
        <div className = "comparison-date-range-picker">
            <div className = 'date-range-header'>
                
                 { range?
                 <>
                 <GrPowerReset onClick = {()=>reset()}/>
                 <p>{utils.DateObjectToString(range[0])} to {utils.DateObjectToString(range[1])}</p>
                 <br />
                 <p>{utils.DateObjectToString(range2[0])} to {utils.DateObjectToString(range2[1])}</p>
                 </>:<p>Select Date</p>}
                    <BsCalendar onClick = {()=>toggleCalendar(show=>!show)} /> 
            </div>
           {show &&
           <div className = "date-range-body-wraper">
            <div className='dateCalenderHolder'>
            <div>
            <Calendar
            selectRange = {true}
            value = {value}
            onChange = {setValue}
            maxDate  = {new Date()}
            maxDetail = {'month'}
            returnValue = {'range'}
            prevLabel = {<IoIosArrowBack/>}
            nextLabel = {<IoIosArrowForward/>}
            prev2Label = {<HiChevronDoubleLeft/>}
            next2Label = {<HiChevronDoubleRight/>}
            />
            </div>
            <div>
            <Calendar
            selectRange = {true}
            value = {value2}
            onChange = {setValue2}
            maxDate  = {new Date()}
            maxDetail = {'month'}
            returnValue = {'range'}
            prevLabel = {<IoIosArrowBack/>}
            nextLabel = {<IoIosArrowForward/>}
            prev2Label = {<HiChevronDoubleLeft/>}
            next2Label = {<HiChevronDoubleRight/>}
            />
            </div>
            </div>
            <div className = 'date-range-footer'>
              <button onClick = {()=>toggleCalendar(show=>!show)} style = {{color:'#FF4B4B'}}>Cancel</button>
                <button onClick = {()=>{onChange(value); onChangerange(value2); toggleCalendar(show=>!show)}} style = {{color:'#1294F2'}}>OK</button>
            </div>
           </div>
           }
        </div>
    )
}

export default ComparisonDateRange;


