import React, { useState, useEffect,useRef } from "react";
import "./dots.css";


// Assets
import dots from "../../assets/icons/dots.svg"


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
        <div className="dotsParent">
            <img ref = {dotRef} src={dots} alt="Dots" onClick={()=>setDisplay(!display)}/>
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