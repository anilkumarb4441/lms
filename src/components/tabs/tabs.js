import React from 'react'
import "./tabs.css"

function Tabs({tabArr,handleTab,defaultActiveKey=0}) {
    const [defaultKey,setDefaultKey] = React.useState(defaultActiveKey)
    const onclick = (item,i)=>{
       handleTab(item);
       setDefaultKey(i);
    }
    return (
        <div className = "tabsSection">
            {tabArr && tabArr.map((item,i)=>{
               return <button className = {i===defaultKey?'active':''} key = {i} onClick = {()=>onclick(item,i)}>{item.name}</button>
            })}
        </div>
    )
}

export default Tabs
