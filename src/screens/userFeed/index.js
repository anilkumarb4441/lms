import React,{useState} from 'react'
import FeedCard from '../../components/feedCard/feedCard';
import "./index.css"

function UserFeed() {

const [left,setLeft] = useState('0%')

const handleToggle=(e)=>{
   let pList = document.querySelectorAll('div.primaryToggle > p')
   for(var i = 0;i<pList.length;i++){
       pList[i].classList.remove('active')
   }
   let position = left==='0%'?'50%':'0%'
   setLeft(position);
   e.currentTarget.classList.add('active')
}

    return (
        <div className = 'userFeedScreen'>
            <div className="screenTitleContainer">
                <div><p className = 'screenTitle'>User Feed</p></div>
                <div className = 'primaryToggle'>
                    <p className = 'active' onClick = {(e)=>handleToggle(e)}>Chef</p>
                    <p  onClick = {(e)=>handleToggle(e)}>Client</p>
                    <div style = {{left:left}}></div>
                </div>
            </div>

            <div className= 'userFeedCardContainer'>
               <FeedCard/>
               <FeedCard/>
               <FeedCard/>
            </div>
        </div>
    )
}

export default UserFeed
