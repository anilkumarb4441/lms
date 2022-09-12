import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/modal";
import "./assignToModal.css";
import { URLS } from "../../utils/urlConstants";
import API_SERVICES from "../../utils/API";
import Input from "../Input";
import { toastSuccess ,toastWarning} from "../../utils/constants";
import Loader from "../loader/loader";
import { IoMdArrowDropdown } from "react-icons/io";

function AssignToModal({
  show,
  handleDisplay,
  assignLeadCallBack,
  rowObj,
  assignType = "",
}) {
  const [selectArr, setSelectArr] = useState([]);
  const [leadCount, setLeadCount] = useState(1);
  const [userId, setUserId] = useState("");
  const [level, setLevel] = useState();
  const [untouchedCount, setUntouchedCount] = useState();
  const [loading,setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState([]);
  const [selectedLead, setSelectedLead] = useState('')
  const [showDropdown, setShowDropDown] = useState(false);



  const handleCount = (num) => {
    setLeadCount(num);
  };

  const getTeamMembers = () => {
    setLoading(true);
    const callback = (err, res) => {
      if (res && res.status === 200) {
        let teamData = res?.data[0]?.directMembers
          ? res?.data[0]?.directMembers
          : [];
        setLevel(teamData[0]?.level);
        let arr = teamData.reduce((prev, curr) => {
          return [...prev, { name: curr.name, value: curr.userId }];
        }, []);
        if(!arr.length){
          toastWarning("You cannot assign Leads")
          handleDisplay()
        }
        if (assignType == "bulk") {
          setSelectArr([...arr, { name: "Assign To Team", value: "team" }]);
        } else {
          setSelectArr([...arr]);
        }
        setLoading(false);
      }
    };
    API_SERVICES.httpPOSTWithToken(
      URLS.myteammembers,
      { userId: "", pagination:false},
      callback
    );
  };

  const getUnassignedLeadsCount = () => {
    const callback = (err, res) => {
      if (res && res.status === 200) {
        setUntouchedCount(res.data);
      }
    };
    API_SERVICES.httpGETWithToken(URLS.getUnassignedLeadsCount, callback);
  };

  const assignLeads = (e) => {
    e.preventDefault();
    setLoading(true);
    let data;
    if (assignType === "bulk") {
      data = {
        level: level,
        leadCount: parseInt(leadCount),
        type: "single",
        userId: userId,
      };
      if (userId === "team") {
        data.type = "group";
        delete data.userId;
        delete data.userId;
      }
    } else {
      data = {
        referenceId: rowObj.referenceId,
        userId: userId,
        type: "single",
      };
    }

    const callback = (err, res) => {
      setLoading(false);
      if (res && res.status == 200) {
        assignLeadCallBack();
        toastSuccess("Assigned Successfully"); 
      }
    };
    API_SERVICES.httpPOSTWithToken(URLS.assignLead, data, callback);
  };

  useEffect(() => {
    getTeamMembers();
    getUnassignedLeadsCount();
  }, []);


  // assign search
  const onChangeAssignLeads = (e) => {
    let text = e.target.value.toLowerCase();
    setSearch(e.target.value)
  
    let filteredList = selectArr ?
    selectArr.filter((item) => {
        let serch = item.name?.toLowerCase().includes(text);
        return serch
      }) :[]

      setSearchData([...filteredList]);
  };


const dropdownData = search !== ''?searchData:selectArr

  return (
    <Modal
      show={show}
      header={true}
      modalClass="AssignToModal"
      title="Assign To"
      handleDisplay={handleDisplay}
      body={loading?<Loader/>:
        <form onSubmit={(e) => assignLeads(e)}>
          <p>
            Total Unassigned leads : <span>{untouchedCount}</span>
          </p>
          {/* <input type="search" value={search} onChange={(e)=>onChangeAssignLeads(e)} placeholder="Search by name"  className="assignSerchbar"/> */}
          {/* <Input
            element="select"
            name="userId"
            value={userId}
            selectHeading="Assign To"
            selectArr={search===''?selectArr:searchData}
            change={(e) => {
              setUserId(e.target.value);
            }}
            required={true}
            searchbar='anil'
          /> */}
       
       <div className="assignLeadsWraper">
            <div className="dropdownHead" onClick={()=>setShowDropDown(!showDropdown)}>
              <p>{selectedLead ===''?'Assign To':selectedLead}</p>
              <IoMdArrowDropdown />
              </div>
           { showDropdown === true?
             <div className="assignLead-dropdown">
             <input type="search" value={search} onChange={(e)=>onChangeAssignLeads(e)} placeholder="Search by name"  className="assignSerchbar"/>
             <div className="leadsAssignContainer">
               {
                dropdownData.map((val)=>{
                   return(
                   <>
                    <p className="leadName" onClick={()=>{setUserId(val.value);setSelectedLead(val.name); setShowDropDown(false)}}>{val.name}</p>
                   </>
                   )
                 })
               }
             </div>
             </div>:null
           }
       </div>

          {assignType === "bulk" && (
            <Input
              type="number"
              change={(e) => {
                handleCount(e.target.value);
              }}
              value={leadCount}
              name="leadCount"
              max={untouchedCount}
              min={1}
              required={true}
              
            />
          )}

          <div className="modalFooter">
            <button
              className="cancelBtn"
              type="button"
              onClick={() => handleDisplay(false)}
            >
              Cancel
            </button>
            {untouchedCount > 0 && (
              <button className="saveBtn" type="submit">
                Assign Lead
              </button>
            )}
          </div>
        </form>
      }
    />
  );
}

export default AssignToModal;
