
//BASE URL
const BASE_URL = "http://192.168.1.48:2002"
module.exports = {
  URLS: { 

    //Assign Lead
    assignLead:BASE_URL + "/leads/assign",
    //autoComplete search of emplyess
    getAutoSearchData:BASE_URL +'/leads/search/employee'
  },
};