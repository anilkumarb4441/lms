
//BASE URL
const BASE_URL = "https://leadserver.verzeo.com"//"https://leadserver.verzeo.com"
module.exports = {
  URLS: { 

    //baseURL
    baseURL:BASE_URL,

   //Login
   userLogin:BASE_URL+"/auth/login",

    //Assign Lead
    assignLead: "/leads/assign",

    //create single lead
    createLead:"/leads/createLead",

    //edit single lead
    editLead:"/leads/leadUpdate",

    //update/create call logs
    updateCallLog:"/logs/updateCallLog",


    //autoComplete search of emplyess
    getAutoSearchData:'/leads/search/employee',

    // get leads based on filter
    getLeadsBasedOnFilter: "/leads/filterLeads",
   
    // Lead Bulk Upload
    leadBulkUpload:'/leads/bulk/upload',

    //get Unassigned leads count
    getUnassignedLeadsCount:"/leads/getUntouchedLeads",

    // get Lead Purchase Details
    getLeadPurchaseDetails:'/payment/getPurchaseDetails',

    // url to hit customer dashboard if lead response from call status comes as interested
    createLeadBussiness:"https://obform.loca.lt/api/v2/leadgen/create-lead-business",

    //redirect to customer dashboard
    redirectToCustomerDashBoard: BASE_URL+"/auth/redirect",

     // Myteam
     myteammembers:'/leads/direct/members',

  },
};

