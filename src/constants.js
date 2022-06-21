export const MONTHS =['January', 'February','March','April','May','June','July','August','September','October','November','December']

export const WEEKDAYS=['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export const camelToSentence=(text)=>{
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult
}

export const getDaysinMonth = (month,year)=>{
  let  daysInMonth = new Date(year, month+1, 0).getDate();
     return daysInMonth
}