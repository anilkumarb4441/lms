import React, { useState,useEffect } from "react";
import Modal from "../../components/modal/modal";
import "./assignToModal.css";
import {debounce} from "../../utils/constants"
import {URLS} from "../../utils/urlConstants"
import axios from "axios"
import Input from "../Input";

function AssignToModal({ show, handleDisplay, callback, rowObj,assignType=''}) {
 
const [selectArr,setSelectArr] = useState([])
const [leadCount,setLeadCount] = useState(1)
const [userId,setUserId] = useState('');
const [type,setType] = useState('')

const handleCount = (num)=>{
    setLeadCount(num)
}

const getTeamMembers = ()=>{
  axios({
    url:URLS.myteammembers,
    method:'post',
    data:{userId:"62bc18a0a9b4547f2491ebcc"}
  }).then((res)=>{
    if(res.status===200){
       let teamData = res?.data[0]?.directMembers?res?.data[0]?.directMembers:[]
       let arr =   teamData.reduce((prev,curr)=>{
          return [...prev,{name:curr.name,value:curr.userId}]    
        },[])
        if(assignType=='bulk'){
          setSelectArr([...arr,{name:'Assign To Team',value:'team'}])
        }else{
          setSelectArr([...arr])
        }      
    }
}).catch((err)=>{
  console.error(err)
  alert("Something went wrong. Please try again later");
})
}


const getUntouchedLeadsCount = ()=>{
  axios({
    method:'get',
    url:URLS.getCountOfUntouchedLeads
  }).then((res)=>{
          console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
}

const assignLeads = (e)=>{
  e.prevemtDefault()
  if(assignType==='bulk'){  
    let data = {level:2,leadCount:leadCount}
    if(userId==="team"){
       data.type = "group"
       data.userId = userId
    }else{
      data.type='single'
    }
    axios({
      url:URLS.assignLead,
      method:'post',
      data:{
        level:2,
        type:'group',
        leadCount:leadCount,
        userId:userId
      }
    }).then((res)=>{
          callback(res,null);
    }).catch((err)=>{
         callback(null,err);
    }) 
  }
  
  else{ 
    axios({
      url:URLS.assignLead,
      method:'post',
      data:{
        leadRefId:rowObj.leadId,
        userId:'',
        type:"single"
      }
    }).then((res)=>{
        
          callback(res,null);
    }).catch((err)=>{
         callback(null,err)
    })   
  }
  
}

useEffect(() => {
  getTeamMembers()  
  getUntouchedLeadsCount()
}, [])
  return (
    <Modal
      show={show}
      header={true}
      modalClass = 'AssignToModal'
      title="Assign To"
      handleDisplay={handleDisplay}
      body={
        <form onSubmit = {(e)=>assignLeads(e)}>
         <p>Total Untouched leads : <span>100</span></p>
         <Input 
          element = "select"
          name = 'userId'
          value = {userId}
          selectHeading = "Assign To"
          selectArr ={selectArr}
          change = {(e)=>{setUserId(e.target.value)}}
          required = {true}
         />
       {assignType==="bulk" &&  <Input 
          type= 'number'
          change = {(e)=>{handleCount(e.target.value)}}
          value = {leadCount}
          name = 'leadCount'
          max = {100}
          min = {1}
          required = {true}
         />}
         <button className = "btnPrimary" type = "subm">Assign Lead</button>
        </form>
      }
    />
  );
}

export default AssignToModal;

/*

leadRefId,
userId
type:single

ASSIGN LEADS BASED ON AUTO SEARCH

function AssignToModal({ show, handleDisplay, callback, rowObj }) {
 
  const [suggestions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activeIndex,setActiveIndex] = useState(0);
  const [activeSuggestion,setActiveSuggestion] = useState({})

  const handleOnChange = (text) => {
    setUserInput(text);     
    setActiveIndex(0);
    if(text.length>0){
        axios({
            method:'post',
            url:URLS.getAutoSearchData,
            data:{data:text}
        }).then((res)=>{
            if(res.status===200){
                console.log(res)
                let data = res?.data?.directMembers?res.data.directMembers:[]
               setSuggestions(data)
            }
        }).catch((err)=>{
          setSuggestions([])
        })  
    }else{
        setSuggestions([])
    }
        
  }

 const handleOnKeyDown = (e)=> {
   
     console.log(e.keyCode)
   // User pressed the enter key
    if (e.keyCode === 13) {    
        setActiveSuggestion(suggestions[activeIndex])
        setUserInput(suggestions[activeIndex]?.name)
        setActiveIndex(0)
        setSuggestions([])
    
    } 
    //user pressed the up arrow, decrement of index
    else if (e.keyCode === 38) {
      if (activeIndex === 0) {
        return;
      }
      setActiveIndex(active=>active-1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeIndex - 1 === suggestions.length) {
        return;
      }
      setActiveIndex(active=>active+1);
    }
  };

  const handleSuggestionClick = (item) => {
    setActiveSuggestion(item);
    setUserInput(item.name);
  };

  const SubmitSuggestion = () => {
       axios({
        method:'post',
        url:URLS.assignLead,
        data:{
            leadRefId:rowObj.leadId,
            type:'single',
            userId:activeSuggestion._id
        }
       }).then((res)=>{
           if(res.status===200){
             alert("Assigned")
           }
       }).catch((err)=>{
           console.log(err)
       })
  };

  return (
    <Modal
      show={show}
      header={true}
      modalClass = 'AssignToModal'
      title="Assign To"
      handleDisplay={handleDisplay}
      body={
        <>
          <div className="autoComplete-container">
            <input
              type="text"
              value={userInput}
              placeholder ="Search By Name/Email"
              onKeyDown = {handleOnKeyDown}
              onChange={(e) => handleOnChange(e.target.value)}
              onBlur = {()=>{setTimeout(()=>{
                  setSuggestions([]);
                  setActiveIndex(0);
              },1000)}}
            />
        {suggestions.length > 0 &&  <div className = "autoComplete-suggestions">        
              {suggestions.map((item, i) => {
                return (
                  <div
                  className = {i===activeIndex?"active":''}
                    key={i}
                    onClick={() => {
                      handleSuggestionClick(item);
                    }}
                  >
                    {`${item.name} / ${item.email}`}
                  </div>
              )})}</div>}
          </div>
          <button className = "btnPrimary" onClick={SubmitSuggestion}>Assign Lead</button>
        </>
      }
    />
  );
}
*/ 