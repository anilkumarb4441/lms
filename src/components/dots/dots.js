import React, { useState, useEffect } from "react";
import "./dots.css";


// Assets
import dots from "../../assets/chefview/dots.svg"


function Dots({chefObj,setFormData,formData,setParticularChef,chefId,setChefId,setOpenForm}){

    const[dispOptions, setdispOptions] = useState(false)

    function deleteChef(x){
        console.log(x);
    }
    function handleEdit(){
        setOpenForm(true);
        console.log(chefObj,"kkkkkkkkkk");
        let newChefObj = {...chefObj}
        const keys = Object.keys(chefObj)
        const newArr = [...formData];
        newArr.forEach(obj=>{
              let key = keys.find(ke=>ke===obj.name)
                obj.value = newChefObj[key]
        })

        setFormData(newArr);
    }

    return(
        <div className="dotsParent">
            <img src={dots} alt="Dots" onClick={(e)=>setdispOptions(!dispOptions)}/>
            {dispOptions?
                <div className="absOptions">
                    <p style = {{color:"#0D6CA1"}} onClick = {(e)=>(setParticularChef(true),setChefId(chefId))}>View Details</p>
                    <p style = {{color:"#1CA217"}} onClick = {(e)=>(handleEdit())}>Edit</p>
                    <p style = {{color:"#EC951F"}} onClick = {(e)=>(setChefId(chefId))}>Assigned Task</p>
                    <p style = {{color:"#EC1F25"}} onClick = {(e)=>deleteChef(chefId)}>Delete</p>
                </div>
                :null
            }
        </div>
    )
}

export default Dots;