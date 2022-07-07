import React,{useState,useEffect} from 'react'
import { IoIosArrowBack } from "react-icons/io";
import Modal from '../../components/modal/modal';
import Table from '../../components/Table';
import API_Services from '../../utils/API';
import { URLS } from '../../utils/urlConstants';
import "./leadsInner.css"


function LeadsInner({goBack,leadObj}) {

  const [userDetails,setUserDetails] = useState(null)
  const [purchaseDetails,setPurchaseDetails] = useState([])
 const [purchaseObject,setPurchaseObject] = useState(null);
 const [openCourseModal,setOpenCourseModal] = useState(false);
    const getLeadPaymentHistory = ()=>{
        let {leadId,generatedBy,referenceId} = {...leadObj}
        let postObj = {leadId,generatedBy,referenceId}
        console.log(postObj)
        const callback = (err,res)=>{
            if(res && res.status===200){
               let user_details =  res.data.shift()
                setUserDetails(user_details)
                setPurchaseDetails(res.data)
            }
        }
        API_Services.httpPOSTWithToken(URLS.getLeadPurchaseDetails,postObj,callback)
    }

    const purchaseColumns = [
      {
      Header:'Order Id',
      accessor:'orderid',
      Cell:(props)=>{
        return <p title ='View Course Details' style = {{textDecoration:'underline',cursor:'pointer'}} onClick = {()=>{handleCourseDetails(props.cell.row.original)}}>{props.cell.row.original.orderid}</p>
      }     
    },

    {
      Header:"Filled OB Form",
      accessor: data=>data.isobformfilled?'Yes':'No'  
     },
 
     {
       Header:"Approval Needed",
       accessor: data=>data.isapprovalneeded?'Yes':'No'  
      },
 
      {
       Header:"Pre-registeration Payment",
       accessor: data=>data.ispaidpreregamount?'Yes':'No'  
      },
 
      {
       Header:"Payment Status",
       accessor: data=>data.ispaidpending?'Pending':'Completed'  
      },

     {
      Header:'Pre-registred Amount',
      accessor:'preregamount'
     },

    {
      Header:'Pending Amount',
      accessor:'pendingamount'
    },

    {
      Header:'Total Amount',
      accessor:'totalamount'
    },

    {
      Header:'Gateway',
      accessor:'gateway'
    },

    {
      Header:'Transaction Id',
      accessor:'transactionid'
    },

    
    
     
  ]

  const handleCourseDetails = (rowData)=>{
    setPurchaseObject(rowData);
    setOpenCourseModal(true);
  }

    useEffect(()=>{
      getLeadPaymentHistory();  
    },[])
    return (
        <>
            <div className="leadsInner">
            <IoIosArrowBack
              className="goBack"
              onClick={() => {goBack()}}
            />
            <div className="leadsInnerWrapper">
              
                <div className="leadProfileContainer">
                  <div className="leadProfile">
                    <p><span>Name : </span>{userDetails?.name}</p>
                    <p><span>Email : </span>{userDetails?.email}</p>
                    <p><span>Contact : </span>{userDetails?.phone}</p>
                  </div>
                </div>
                 
                 <div className = "leadPurchaseContainer">
                    <p>Purchase History</p>
                    <Table
                     tableClass = "Table"
                     data ={purchaseDetails}
                     columns = {purchaseColumns}
                    />
                 </div>
              </div>
          </div>
           <Modal
             handleDisplay = {(e)=>{setOpenCourseModal(e); setPurchaseObject(null)}}
             show = {openCourseModal}
             modalClass = 'courseModal'
             header = {true}
             title = 'View Course Details'
             body = {<>
              <div>
             { purchaseObject?.courseDetails?.length>0 &&purchaseObject?.courseDetails.map((course,i)=>{
                    return <div className= 'courseCard'>
                    <p>{course.name}</p>
                    <p>Price : <span>{course.price}</span></p>
                    <p>Minimum Price : <span>{course.minprice}</span></p>
                    <p>Program Plan : <span>{course.programplan}</span></p>
                    <p>Batch : <span>{course.batch}</span></p>
                  </div>
             })
                
             }
              </div>
             </>}
           />
        </>
    )
}

export default LeadsInner

/**
[
{
  email: "user1@gmail.com"
  name: "user1"
  phone: "8374370427"},
{
  courseDetails:[{
    batch: "january"
    minprice: 3000
    name: "fronted development"
    price: 5000
    programplan: "self paced"
    _id: "62c2f931b78868d55d609f9a"
  }]
  gateway: "cashfree"
  isapprovalneeded: false
  isobformfilled: true
  ispaidpending: true
  ispaidpreregamount: true
  orderid: "l56u91sm"
  pendingamount: 0
  preregamount: 1000
  totalamount: 3000
  transactionid: "885334246"
}
]
 */
