
//BASE URL
const BASE_URL = "http://192.168.1.29:2002"//"https://leadserver.verzeo.com"
module.exports = {
  URLS: { 

    //baseURL
    baseURL:BASE_URL,

   //Login
   userLogin:"/auth/login",

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
