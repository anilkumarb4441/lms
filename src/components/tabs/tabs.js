import React from 'react'

function Tabs({tabArr,handleTab}) {

    const onclick = (item)=>{
       handleTab(item)
    }
    return (
        <div>
            {tabArr && tabArr.map((item,i)=>{
               return <button key = {i} onClick = {()=>onclick(item)}>{item}</button>
            })}
        </div>
    )
}

export default Tabs
