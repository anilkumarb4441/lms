import React,{useState} from 'react'
import "./reviewCard.css"
import clientProfile from "../../assets/icons/clientProfile.png"

//components
import {AiOutlineDelete} from "react-icons/ai"
import {HiDownload} from "react-icons/hi"
import {IoIosSend} from "react-icons/io"

function ReviewCard() {

    const [replyObj,setReplyObj] = useState({value:'',flag:false})
    const [inpVal,setInpVal] = useState('')
   const [flag,setFlag]= useState(false)
  

   const sendReply = ()=>{
       setReplyObj({...replyObj,value:inpVal,flag:true})
       setFlag(false)
       
   }
    return (
        <div className = 'reviewCard'>
           <div className = 'reviewCardCol1'>
           <div className = 'reviewCardClientProfile'>
               <img src = {clientProfile} alt = 'clientProfile'/>
               <div>
                   <p>Salil</p>
                   <p>1 day ago</p> 
               </div>
           
               </div>    
               <p className = 'clientReviewText'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et</p>
              {flag && <div className = 'replyBar'>
                  <input type = 'text' value = {inpVal} onChange = {(e)=>setInpVal(e.target.value)} name= 'reply' placeholder = 'Type Reply...' />
                  <IoIosSend style = {{cursor:'pointer'}} onClick = {()=>{sendReply()}}/>
              </div>}
            {replyObj.flag &&  <div>
                  <p className = 'sentReply'>Reply: <span>{replyObj.value}</span></p>
              </div>}
        </div>     
        <div className = 'reviewCardCol2'>
           {!flag && !replyObj.flag && <button onClick={()=>setFlag(true)}>
                Respond
            </button>}
            <div className = 'actionBtns'><HiDownload style = {{cursor:'pointer'}}/><p>Download Review</p></div>
            <div className = 'actionBtns'><AiOutlineDelete style = {{cursor:'pointer'}}/><p>Delete Review</p></div>
        </div>
        </div>
    )
}

export default ReviewCard
