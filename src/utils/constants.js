import {toast} from "react-toastify"

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


// New Date to yyyy-mm-dd
export const DateObjectToString=(dateObj)=>{
  let date = new Date(dateObj.getTime() + 19800000).toISOString().split("T")[0]
  return date
}

// yyyy-mm-dd to  New Date
export const StringtoDateObject=(dateString)=>{
   let time = new Date(dateString).getTime()-19800000
   let date = new Date(time);
   return date
}

//DEBOUNCE FUNCTION
export const debounce = (func, delay) => { 
  let timerId; 
  return function() { 
    clearTimeout(timerId) 
    timerId = setTimeout(() => func.apply(this,arguments), delay)
  }; 
};




//Toast Messages
export const toastSuccess = (msg)=>{
  toast.success(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}

export const toastWarning = (msg)=>{
  toast.warn(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}

export const toastError = (msg)=>{
  toast.error(msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}