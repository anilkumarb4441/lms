
//BASE URL
// const BASE_URL ="http://192.168.1.95:2002" ,http://192.168.1.69:2002
const BASE_URL ="https://leadserver.verzeo.com"
//"https://leadserver.verzeo.com"

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
   
    // Lead Bulk oad
    leadBulkUpload:'/leads/bulk/upload',

    //get Unassigned leads count
    getUnassignedLeadsCount:"/leads/getUntouchedLeads",

    // get Lead Purchase Details
    getLeadPurchaseDetails:'/payment/getPurchaseDetails',

    // url to hit customer dashboard if lead response from call status comes as interested
    createLeadBussiness:"https://customer.verzeo.com/api/v2/leadgen/create-lead-business",

    //redirect to customer dashboard
    redirectToCustomerDashBoard: BASE_URL+"/auth/redirect",

     // Myteam
     myteammembers:'/leads/direct/members',
    //  myteammembers:'/analytics',

     //perticular team member 
     perticularTeamMember:'/analytics/onLoadTeamMemberLeadAnalytics',


     //on Click Team Member Lead Analytics data
     onClickTeamMemberLeadAnalytics:'/analytics/onClickTeamMemberLeadAnalytics',

     // get bulk uploaded leads 
     getBulkUploadedLeads:'/leads/permissionBasedFiltering',

    // dashboard lead count analytics self or member data
     dashboardAnalyticData:'/analytics',

     // dashboard lead count analytics total team data 
     dashboardAnalyticTeamData:'/analytics/team',

       // dashboard lead count analytics total customer bar chart  
       analyticsBarChart:'/analytics/chart',

        // dashboard analytics  revenue projected graph
        analyticsRevenueProjected:'/analytics/revenueProjected',

         // dashboard analytics  revenue generated graph  
         analyticsRevenueGenerated:'/analytics/revenueGenerated',

          // number of leads assign to whom
          noOfleadsAssignToWhom:'/leads/numberOfLeadsAssignedToWhom',

          undoAssignedLeads:'/leads/assign/undo'
  },
};

