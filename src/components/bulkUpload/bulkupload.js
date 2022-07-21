import React, { useState, useRef } from "react";
import "./bulkupload.css";
import Modal from "../modal/modal";
import xlsxParser from "xlsx-parse-json";
import exportFromJSON from "export-from-json";
import API_SERVICES from "../../utils/API";
import { URLS } from "../../utils/urlConstants";
import { toastSuccess, toastWarning, toastError } from "../../utils/constants";

// Assets
import close from "../../assets/Bulkupload/close.svg";
import downloadIcon from "../../assets/icons/download.svg";
import cloudUpload from "../../assets/icons/cloud-upload.svg";
import fileIcon from "../../assets/icons/file-icon.svg";
import Input from "../Input";
import Loader from "../loader/loader";

function BulkUpload({show,handleDisplay,callback,userId}) {
  const formref = useRef();
  let sheetData = useRef(0);
  const [bulkData, setbulkData] = useState({isCampaign:false});
  const [filename, setfilename] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [sourceArr,setSourceArr] = useState()
  const [loading,setLoading] = useState(false);
  //email,facebook,rcb,website,google
  const sourceArr1 = [
    { name: "Facebook", value: "facebook" },
    { name: "Email", value: "email" },
    { name: "RCB", value: "rcb" },
    { name: "Website", value: "website" },
    { name: "Google", value: "google" },
  ];

  function downloadCSV(e) {
    e.preventDefault();
    var csv = "name,phone,email\n";
    var data = [
      { name: "User 1", phone: "9999999999", email: "user1@gmail.com",college:'XYZ College',branch:'Computer Science',yearOfPassOut:'2020' },
    ];
    const fileName = "sheet1";
    const exportType = "csv";
    exportFromJSON({ data, fileName, exportType });
  }

  function sendBulkData(e) {
    e.preventDefault();
    setLoading(true);
    const sendBulkDataCallBack = (err, res) => {
      setLoading(false);
      if (res && res.status === 201) {
        toastSuccess("Data Succesfully uploaded");
        setfilename("");
        formref.current.value = "";
        setbulkData({isCampaign:false});
        handleDisplay();
        callback();
      }
    };
    API_SERVICES.httpPOSTWithToken(
      URLS.leadBulkUpload,
      bulkData,
      sendBulkDataCallBack
    );
  }

  // checking for empty values in file
  const checkForEmptyValues = (data) => {
    let arr = ["name","phone","email"]
   
    let checker = true;
    for (let row of data) {
      for(let key of arr){
          if(!row[key]){
            return !checker
          }
      }
    }
    return checker;
  };

  // file on change 
  const handleFile = (e) => {
  
    if (!e.target.files[0]) return
      xlsxParser.onFileSelection(e.target.files[0]).then((data) => {
        sheetData = data["Sheet1"];
        if (!checkForEmptyValues(sheetData)) {
          toastWarning("File contains invalid data");
          setbulkData({ ...bulkData, leads: null });
          setfilename("");
          formref.current.reset();
          return;
        }
        setbulkData({ ...bulkData, ["leads"]: sheetData });
        setfilename(e.target.files[0].name);
      }).catch((err)=>{
        console.log(err)
        setbulkData({ ...bulkData, leads: null });
        setfilename("");
        formref.current.reset();
        toastError("Error");
      });
  };

  // file validation for uploading data
  React.useEffect(() => {
    if (!bulkData?.leads || !bulkData?.source) return;
    setDisabled(false);
  }, [bulkData]);

  React.useEffect(()=>{ 
    if(userId==="62d2567927ac212513541269"){
      // FOR CHANUKYA
    setSourceArr(sourceArr1)
    setbulkData({...bulkData,isCampaign:true})
    }else{
       // FOR SHUBAM
       setSourceArr([])
       setbulkData({...bulkData,isCampaign:false,source:'cgfl'})
    }

  },[])

  return (
    <Modal
      title={"Bulk Upload"}
      header={true}
      modalClass="bulkModal"
      show={show}
      handleDisplay={handleDisplay}
      body={loading?<Loader/>:
        <form>
          <div className="parentMainBulk">
            <div className="sample-download">
              <p>Don't have Same File? Click Here</p>
              <button className="saveBtn" onClick={(e) => downloadCSV(e)}>
                <p>Download</p>
                <img alt="icon" src={downloadIcon} />
              </button>
            </div>

            <input
              type="file"
              className="form-control-file"
              id={"bulkInput"}
              ref={formref}
              onChange={handleFile}
              style={{ display: "none" }}
              accept=".xlsx,.csv,.xls"
            />
            {!filename ? (
          
           <label className="bulkUploadLabel" htmlFor="bulkInput">
                <img src={cloudUpload} />
                <p>Drag File or Browse For File</p>
              </label>
           
           ) : (
              <>
                <div className="fileName-wrapper">
                  <div>
                    <img src={fileIcon} alt="file-icon" />
                    <p>{filename}</p>
                  </div>
                  <img
                    src={close}
                    onClick={(e) => {
                      setfilename("");
                      formref.current.value = "";
                      setbulkData({ ...bulkData,leads:null});
                    }}
                    alt="close"
                  />
                </div>

               {sourceArr && sourceArr.length>0 && <Input
                  element="select"
                  name="source"
                  label="Source"
                  value={bulkData?.source}
                  selectHeading="Select Source"
                  selectArr={sourceArr}
                  change={(e) =>
                    setbulkData({
                      ...bulkData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />}
              </>
            )}
          </div>

          <div className="modalFooter">
            <button
              className="cancelBtn"
              type="button"
              onClick={() => handleDisplay(false)}
            >
              Cancel
            </button>
            <button
              disabled={disabled}
              className="saveBtn"
              type="submit"
              onClick={(e) => sendBulkData(e)}
            >
              Upload
            </button>
          </div>
        </form>
      }
    />
  );
}

export default BulkUpload;
