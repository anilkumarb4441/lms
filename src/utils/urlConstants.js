
//BASE URL
const BASE_URL = "http://192.168.1.29:2002"//"https://leadserver.verzeo.com"
module.exports = {
  URLS: { 
    //Assign Lead
    assignLead:BASE_URL + "/leads/assign",

    //create single lead
    createLead:BASE_URL+"/leads/createLead",
    
    //autoComplete search of emplyess
    getAutoSearchData:BASE_URL +'/leads/search/employee',

    // get leads based on filter
    getLeadsBasedOnFilter:BASE_URL+ "/leads/filterLeads",
   
    // Lead Bulk Upload
    leadBulkUpload:BASE_URL +'/leads/upload'

  },
};
