import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/modal";
import "./assignToModal.css";
import { URLS } from "../../utils/urlConstants";
import API_SERVICES from "../../utils/API";
import Input from "../Input";
import { toastSuccess ,toastWarning} from "../../utils/constants";

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

  const handleCount = (num) => {
    setLeadCount(num);
  };

  const getTeamMembers = () => {
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
      }
    };
    API_SERVICES.httpPOSTWithToken(
      URLS.myteammembers,
      { userId: "" },
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

  return (
    <Modal
      show={show}
      header={true}
      modalClass="AssignToModal"
      title="Assign To"
      handleDisplay={handleDisplay}
      body={
        <form onSubmit={(e) => assignLeads(e)}>
          <p>
            Total Unassigned leads : <span>{untouchedCount}</span>
          </p>
          <Input
            element="select"
            name="userId"
            value={userId}
            selectHeading="Assign To"
            selectArr={selectArr}
            change={(e) => {
              setUserId(e.target.value);
            }}
            required={true}
          />
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
