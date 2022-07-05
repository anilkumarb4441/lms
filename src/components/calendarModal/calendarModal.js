import React from 'react'
import "./calendarModal.css"
import Modal from "../modal/modal"
import Calendar from 'react-calendar'
import "react-calendar/dist/Calendar.css";
import {AiOutlineDoubleLeft} from "react-icons/ai"
import {AiOutlineDoubleRight} from "react-icons/ai"
import {BsChevronLeft} from "react-icons/bs"
import {BsChevronRight} from "react-icons/bs"

function CalendarModal({show,handleDisplay,value,onChange}){
    return (
        <Modal
        modalClass = 'calendarModal'
        show = {show}
        handleDisplay = {handleDisplay}
        bodyClick = {false}
        body = {
            <Calendar
            selectRange = {true}
            value = {value}
            onChange = {onChange}
            maxDate  = {new Date()}
            maxDetail = {'month'}
            returnValue = {'range'}
            prevLabel = {<BsChevronLeft/>}
            nextLabel = {<BsChevronRight/>}
            prev2Label = {<AiOutlineDoubleLeft/>}
            next2Label = {<AiOutlineDoubleRight/>}
            />
        }
        />
    )
}

export default CalendarModal
