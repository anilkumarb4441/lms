import React, { useState } from "react";
import Modal from "../../components/modal/modal";
import "./assignToModal.css";
import {debounce} from "../../utils/constants"
import {URLS} from "../../utils/urlConstants"
import axios from "axios"
//http://192.168.1.48:2002/leads/search
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

export default AssignToModal;
//leadRefId,
//userId
//type:single