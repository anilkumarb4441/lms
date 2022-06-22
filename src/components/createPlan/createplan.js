import React, { useState } from "react";

//CSS

import "./createplan.css"

// Assets

import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";


function Createplan(){

    const[newInput, setnewInput] = useState(0);
    // var inputs= [];
    const [inputArr, setinputArr] = useState([])

    const [formdata, setFormData] = useState({})



    function AddInput(){
        // console.log(newInput);
        var i;
        let temp = newInput;
        temp = temp+1;
        let tempArr = [...inputArr];
        // for(i=0;i<temp;i++){
            tempArr.push(<input type="text" onChange={(e)=>setFormData({...formdata,[e.target.name]:e.target.value})} value={(formdata.name)} name={"Name"+i} placeholder="For one visit only" />);
        // }
        setinputArr(tempArr)
        setnewInput(temp)
    }

    function deleteInput(a){
        console.log(a);
        let temp =  [...inputArr];
        temp.splice(a, 1);
        console.log(inputArr,temp);
        setinputArr(temp);
    }



    return(
        <div className="createPLan">
            <h2>Create Plans</h2>
            <div className="createForm">
                <form>
                    <div className="flexedRepresent">
                        <label>
                            Plan Name
                        </label>
                        <input type="text" name="planname" placeholder="Hourly Basis" />
                    </div>

                    <div className="flexedRepresent">
                        <label>
                            Plan Price
                        </label>
                        <input type="text" name="planname" placeholder="₹3999/-" />
                    </div>

                    <div className="flexedRepresent One">
                        <label>
                            Note
                            <BsFillPlusSquareFill onClick={(e)=> AddInput()} />
                        </label>
                        <input type="text" name="planname" placeholder="For one visit only" />
                        {inputArr.map((val,key)=>{
                            console.log(val,"lllll");
                            return(
                                <div className="newDiv" key={key} >
                                    {val}
                                    <AiFillDelete onClick={(e)=>deleteInput(key)}/>
                                </div>
                            )
                        })}
                    </div>

                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default Createplan;