import React, {useState, useRef} from "react";
import "./bulkupload.css";
import Modal from "../modal/modal";
import Input from "../Input";
import xlsxParser from 'xlsx-parse-json';
import exportFromJSON from 'export-from-json';
import axios from "axios";

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

    function downloadCSV(){
      var csv = 'employeeid,status,date_of_leaving,leftTheOrganization,reason\n';
      var data = [
          {employeeid:'VZEOXXX', status:'AWOL', date_of_leaving:'2022-05-11', leftTheOrganization:false,reason:"Reason Here"},
          {employeeid:'VZEOXXX', status:'SICK', date_of_leaving:'2022-05-14', leftTheOrganization:false,reason:"Reason Here"},
          {employeeid:'VZEOXXX', status:'AWOL', date_of_leaving:'2022-02-11', leftTheOrganization:false,reason:"Reason Here"},
          {employeeid:'VZEOXXX', status:'SICK', date_of_leaving:'2022-01-11', leftTheOrganization:true,reason:"Reason Here"},
          {employeeid:'VZEOXXX', status:'AWOL', date_of_leaving:'2022-03-01', leftTheOrganization:true,reason:"Reason Here"},
          {employeeid:'VZEOXXX', status:'AWOL', date_of_leaving:'2022-04-08', leftTheOrganization:false,reason:"Reason Here"},
      ];
      const fileName = 'sheet1'
      const exportType = 'csv'
      exportFromJSON({ data,fileName,exportType });
   }

    function sendBulkData(){
        // console.log(sheetData,bulkData);
        // let data = {sheetData:sheetData,source:bulkData.source}
        // console.log(data,fosrmref.current);
        // formref.current.value="";
        console.log(bulkData);
        // axios({
        //     method:'post',
        //     url:URLS.getAutoSearchData,
        //     data:{data:text}
        // }).then((res)=>{
        //     if(res.status===200){
        //         console.log(res)
        //         let data = res?.data?.directMembers?res.data.directMembers:[]
        //       setSuggestions(data)
        //     }
        // }).catch((err)=>{
        //   setSuggestions([])
        // }) 
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
                setbulkData({...bulkData,["data"]:sheetData})
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
          
            <form
              onSubmit={(e) => {
                sendBulkData(e);
              }}
            >
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
                            setbulkData({...bulkData,["data"]:""})
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
                errorfile===false && bulkData.source!="" && bulkData.data!="" ?
                    <button className="saveBtn" type="button" onClick={(e)=>sendBulkData()}>
                        Upload
                    </button>
                    :null
              }
            </form>
          </div>
        </div>
      }
    />
  );
}

export default BulkUpload;
