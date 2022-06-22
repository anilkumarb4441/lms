import React, { useState } from "react";


//css
// import "./settingscreen.css";

//assets
import photo1 from "../../assets/settings/photo1.svg"
import { BiEdit } from "react-icons/bi";

// Components
import Input from "../Input/index"



function Settingplan({...val}) {
    const[pricingData, setPricingData] = useState({...val})
    const[checkArray,setcheckArray] = useState({onetimepayment:false})
    const[disabletoggle, setdisabletoggle] = useState(true)
    const handleInputChange = (e)=>{
        if(e.target.type==="checkbox"){
            setcheckArray({...checkArray,[e.target.name]:e.target.checked})
        }
        else{
            setPricingData({...pricingData,[e.target.name]:e.target.value})
        //   let newArr = [...formData];
        //   let formObj = { ...newArr[i] };
        //   formObj.value = e.target.value;
        //   newArr.splice(i, 1, formObj);
        //   setFormData([...newArr]);
        }
    }

    function submitData(){
        // console.log(checkArray,pricingData,"555555555555555");
    }

  return (
      <div className="setPlanComponent">
            <div style={{textAlign:"right"}}>
                <BiEdit onClick={(e)=>setdisabletoggle(!disabletoggle)} style={{color:"white", fontSize:"24px"}} />
            </div>
            <p className="previewText">Card Preview*</p>
            <div className="prcingParent">
                  <div className="imgParent">
                      <h3>{pricingData.planName}</h3>
                      <div>
                          <img src={photo1} alt="Preview"/>
                          <p>₹ {pricingData.price}/-</p>
                          <p>For one visit only</p>
                          <p className="dupBtn">Proceed</p>
                      </div>
                  </div>
                  <div className="prcindDetailsInfo">
                      <div className="inputSetFlex">
                          <label>Plan Name</label>
                          <Input value={pricingData.planName} disable={disabletoggle} type="text" name="planName" required = {false} inputClass = 'setInput' change={(e) => handleInputChange(e)} />
                      </div>
                      <div className="inputSetFlex">
                          <label>Plan Price</label>
                          <Input value={pricingData.price} disable={disabletoggle} type="text" name="price" required = {false} inputClass = 'setInput' change={(e) => handleInputChange(e)} />
                      </div>
                      <div className="inputSetFlex" style={{justifyContent:"flex-start"}}>
                          <label style={{margin:"0% 5% 0% 0%"}}>One Type Payment</label>
                          {/* <div style={{textAlign:"center"}}> */}
                              <Input type="checkbox" required = {false} name="onetimepayment" checked = {checkArray.onetimepayment} change={(e) => handleInputChange(e)} />
                          {/* </div> */}
                      </div>
                      <div className="inputSetFlex">
                          <label>Total Payment</label>
                          <Input value={pricingData.price} disable={disabletoggle} type="text" name="totalPayment" required = {false} inputClass = 'setInput' change={(e) => handleInputChange(e)} />
                      </div>
                  </div>
            </div>
            <div className="NoteInfo">
                <p>For one visit only</p>
            </div>
            {
                disabletoggle?null:<button className="saveBtnSet" onClick={(e)=>submitData()}>Save</button>
            }
      </div>
  );
}

export default Settingplan;
