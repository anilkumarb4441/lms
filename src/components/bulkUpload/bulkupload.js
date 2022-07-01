import React, {useState, useRef} from "react";
import "./bulkupload.css";
import Modal from "../modal/modal";
import Input from "../Input";
import xlsxParser from 'xlsx-parse-json';
import exportFromJSON from 'export-from-json';
import axiosInstance from "../../utils/axiosInstance";
import {URLS} from "../../utils/urlConstants"

// Assets
import close from "../../assets/Bulkupload/close.svg"

function BulkUpload({
  show,
  handleDisplay,
}) {

    const formref = useRef();
    let sheetData = useRef(0);
    
   
    const[bulkData, setbulkData] = useState({source:""})
    const [filename, setfilename] = useState("");
    const[errorfile, seterrorfile] = useState(false)

    function downloadCSV(e){
      e.preventDefault();
      var csv = 'name,phone,email\n';
      var data = [
          {name:"Tanisha",phone:"7894561230",email:"tanisha.g@verzeo.com"},
      ];
      const fileName = 'sheet1'
      const exportType = 'csv'
      exportFromJSON({ data,fileName,exportType });
   }

    function sendBulkData(e){
      e.preventDefault()
        // console.log(sheetData,bulkData);
        // let data = {sheetData:sheetData,source:bulkData.source}
        // console.log(data,fosrmref.current);
        // formref.current.value="";
        // console.log(bulkData);
        axiosInstance({
            method:'post',
            url:URLS.leadBulkUpload,
            data:bulkData
        }).then((res)=>{
            if(res.status===201){
                console.log(res)
                alert(res.data)
                setfilename("");
                formref.current.value="";
                setbulkData({...bulkData,["leads"]:""})
                handleDisplay();
            }
        }).catch((err)=>{
          alert("Something went wrong");
          // setSuggestions([])
          setfilename("");
          formref.current.value="";
          setbulkData({...bulkData,["leads"]:""})
        }) 
    }

    const checkForEmptyValues = (data) => {
        let checker = true;
        for (let row of data) {
            for (let key in row) {  
                if (row[key] == '' && !(typeof row[key] =="boolean")) {
                    console.log(key,"va",row[key])
                    return !checker;
                }
            }
        }
        return checker;
    };

    const handleFile = (e) => {
        setfilename(e.target.files[0].name)
        if (e.target.files[0])
            xlsxParser.onFileSelection(e.target.files[0]).then((data) => {
                sheetData = data['Sheet1'];
                setbulkData({...bulkData,["leads"]:sheetData})
                if (!checkForEmptyValues(sheetData)) {
                    alert("File contains invalid data")
                    // setErrorMsg('File contains invalid data');
                    formref.current.reset();
                    seterrorfile(true);
                    return;
                }
                // else {
                //     sendBulkData();
                // }
            });
    };


  return (
    <Modal
      title={"Bulk Upload"}
      header={true}
      modalClass="addLeadModal"
      show={show}
      handleDisplay={handleDisplay}
      body={
        <div className="addLead">
          <div className="addLeadCol1">
          
            <form>
                {/* <p></p> */}
              <div className="parentMainBulk">
              <input
                            type="file"
                            className="form-control-file"
                            id={'File1'}
                            ref={formref}
                            onChange={handleFile}
                            style={{ display: 'none' }}
                            accept=".xlsx,.csv,.xls"
                        />
                        <div className="btnCrosParent">
                          <button type="button" onClick={(e)=>formref.current.click()} className="BtnBulk">
                          {filename===""?"Upload File":filename}
                          </button>
                          {
                            filename!=""?<img src={close} alt="Close SVG" onClick={(e)=>{
                            setfilename("");
                            formref.current.value="";
                            setbulkData({...bulkData,["leads"]:""})
                          }} />:null}
                        </div>
                {
                    filename!=""?
                    <select name="source" onChange={(e)=>setbulkData({...bulkData,[e.target.name]:e.target.value})}>
                        <option value="">Select Source</option>
                        <option value="facebook">Facebook</option>
                        <option value="linked">Linked In</option>
                    </select>
                    :null
                }
              </div>
              {
                errorfile===false && bulkData.source!="" && bulkData.leads!="" ?
                    <button className="saveBtn" type="button" onClick={(e)=>sendBulkData(e)}>
                        Upload
                    </button>
                    :null
              }
              <button className="downBtn" onClick={(e)=>downloadCSV(e)}>Click to download sample file</button>
            </form>
          </div>
        </div>
      }
    />
  );
}

export default BulkUpload;
