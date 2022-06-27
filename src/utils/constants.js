export const MONTHS =['January', 'February','March','April','May','June','July','August','September','October','November','December']
export const WEEKDAYS=['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

//CAMEL CASE TO SENTENCE
export const camelToSentence=(text)=>{
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult
}

// DAYS IN A MONTH
export const getDaysinMonth = (month,year)=>{
  let  daysInMonth = new Date(year, month+1, 0).getDate();
     return daysInMonth
}

//DEBOUNCE FUNCTION
export const debounce = (func, delay) => { 
  let timerId; 
  return function() { 
    clearTimeout(timerId) 
    timerId = setTimeout(() => func.apply(this,arguments), delay)
  }; 
};

//BASE URL
export const BASE_URL = "http://192.168.1.48:2002/leads"