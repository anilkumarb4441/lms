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
    const [errorMsg, setErorMsg] = useState('');
    const [open, setOpen] = useState(false);

    

    let valDate1 = value && value[1].getDate();
    let valDate2 = value2 && value2[1].getDate();
    let valMonth1 = value && value[1].getMonth() +1;
    let valMonth2 = value2 && value2[1].getMonth()+ 1;



    const errorHandle = ()=>{
        if(valMonth1 >= valMonth2){
            if( valDate1 > valDate2){
                setErorMsg('Date Two should be greater then Date One');
                setOpen(true)
            }else{
                toggleCalendar(show=>!show);
                return;
            }
        }else{
            toggleCalendar(show=>!show);
            return;
        }
    }

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
            {errorMsg !== ''&& open && <div className='calErrorMsg'>
                <p className='Calerr'>{errorMsg}</p>
                <p className='calClose' onClick={()=>setOpen(false)}>x</p>
                </div>}
           {show &&
           <div className = "date-range-body-wraper rangeCal-parent">
            
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
                <button onClick = {()=>{onChange(value); onChangerange(value2); errorHandle()}} style = {{color:'#1294F2'}}>OK</button>
            </div>
           </div>
           }
        </div>
    )
}

export default ComparisonDateRange;


