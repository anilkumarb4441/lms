import React, { useState, useEffect,useRef } from "react";
import "./dots.css";
// Assets
import dots from "../../assets/icons/dots.svg"
import {BsThreeDotsVertical} from "react-icons/bs"


function Dots({options,onclick}){
    const[display, setDisplay] = useState(false);
    const dotRef = useRef()
    const optionRef = useRef()
    const dotClick = (event)=>{
       if(dotRef?.current?.contains(event.target)||optionRef?.current?.contains(event.target)) return
       setDisplay(false)
    }
    useEffect(()=>{
         document.body.addEventListener('click',dotClick);
        return ()=>{
             document.body.removeEventListener('click',dotClick)
        }
    },[])

    return(
        <div className="dotsParent" ref={dotRef}>
            <BsThreeDotsVertical  onClick={()=>setDisplay(!display)}/>
            {/* <img  src={dots} alt="Dots"/> */}
            {display?
                <div ref= {optionRef} className="absOptions">
                    {options && options.map((item,i)=>{
                        return <p key = {i} style = {{color:item.color}} onClick = {()=>{onclick(item.name)}}>{item.name}</p> 
                    })}              
                </div>
                :null
            }
        </div>
    )
}

export default Dots;