
//BASE URL
const BASE_URL = "https://leadserver.verzeo.com"//"http://192.168.1.29:2002"
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
    updateCallLog:"/logs/createCallLog",


    //autoComplete search of emplyess
    getAutoSearchData:'/leads/search/employee',

    // get leads based on filter
    getLeadsBasedOnFilter: "/leads/filterLeads",
   
    // Lead Bulk Upload
    leadBulkUpload:'/leads/bulk/upload',

    // Myteam
    myteammembers:'/leads/direct/members',

    //get untouched leads count
    getCountOfUntouchedLeads:"/leads/getUntouchedLeads"

  },
};
