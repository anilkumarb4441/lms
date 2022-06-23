import React from 'react'
import "./tabs.css"

function Tabs({tabArr,handleTab}) {
    const onclick = (item)=>{
       handleTab(item)
    }
    return (
        <div>
            {tabArr && tabArr.map((item,i)=>{
               return <button key = {i} onClick = {()=>onclick(item)}>{item.name}</button>
            })}
        </div>
    )
}

export default Tabs
