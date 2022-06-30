
//BASE URL
const BASE_URL = "http://192.168.1.29:2002"//"https://leadserver.verzeo.com"
module.exports = {
  URLS: { 

   //Login
   login:BASE_URL+"/auth/login",

    //Assign Lead
    assignLead:BASE_URL + "/leads/assign",

    //create single lead
    createLead:BASE_URL+"/leads/createLead",

    //edit single lead
    editLead:BASE_URL+"/leads/leadUpdate",

    //update/create call logs
    updateCallLog:BASE_URL +"/logs/createCallLog",


    //autoComplete search of emplyess
    getAutoSearchData:BASE_URL +'/leads/search/employee',

    // get leads based on filter
    getLeadsBasedOnFilter:BASE_URL+ "/leads/filterLeads",
   
    // Lead Bulk Upload
    leadBulkUpload:BASE_URL +'/leads/bulk/upload',

    // Myteam
    myteammembers:BASE_URL +'/leads/direct/members',

    //get untouched leads count
    getCountOfUntouchedLeads:BASE_URL+"/leads/getUntouchedLeads"

  },
};
