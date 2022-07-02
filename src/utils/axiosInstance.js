import axios from 'axios';
import localStorageService from "./localStorageService"
import {URLS} from "./urlConstants"
  
//const token = localStorageService.getAccessToken(); 
const axiosInstance = axios.create({
    baseURL: URLS.baseURL
  })




export default axiosInstance 