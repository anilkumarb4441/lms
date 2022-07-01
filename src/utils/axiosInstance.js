import axios from 'axios';
import localStorageService from "./localStorageService"
import {URLS} from "./urlConstants"
  
const token = localStorageService.getAccessToken(); 
const axiosInstance = axios.create({
    baseURL: URLS.baseURL,
    headers : { 'Content-Type':'application/json',
    Authorization: 'Bearer '+token}
  });

export default axiosInstance 