import React, {useState, useRef} from "react";
import "./bulkupload.css";
import Modal from "../modal/modal";
import Input from "../Input";
import xlsxParser from 'xlsx-parse-json';
import exportFromJSON from 'export-from-json';

function BulkUpload({
  show,
  handleDisplay,
  submitForm,
  handleInputChange,
  heading
}) {

    const formref = useRef();
    let sheetData = useRef(0);
    
    const[openModal, setopenModal] = useState(true)
    const[bulkData, setbulkData] = useState({source:""})
    const [filename, setfilename] = useState("");
    const[errorfile, seterrorfile] = useState(false)

    function sendBulkData(){
        console.log(sheetData,bulkData);
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
        console.log(e.target.files[0].name,"Entered");
        setfilename(e.target.files[0].name)
        if (e.target.files[0])
            xlsxParser.onFileSelection(e.target.files[0]).then((data) => {
                sheetData = data['Sheet1'];
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
      show={openModal}
      handleDisplay={setopenModal}
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
                <button type="button" onClick={(e)=>formref.current.click()} className="BtnBulk">
                {filename===""?"Upload File":filename}
                </button>
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
                errorfile===false && bulkData.source!="" ?
                    <button className="saveBtn" type="button" onClick={sendBulkData()}>
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
