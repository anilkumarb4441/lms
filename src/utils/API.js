import axiosInstance from "./axiosInstance";
import axios from "axios";
import {toastError} from "./constants"
import localStorageService from "./localStorageService";

export default class API_Services {

    
  static httpGET(endPoint, callback) {
    axios
      .get(endPoint)
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        console.log(err)
        toastError(err?.message)
        callback(err, null);
      });
  }

  
  static httpGETWithToken(endPoint, callback) {
    let token = localStorageService.getAccessToken();
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    axiosInstance({
        method:'get',
        url:endPoint,
        headers:headers,
    })
      .then((res) => {
        callback(null, res);
      })
      .catch((err) => {
        // Forbidden. Not allowed to access the page
        if (err.response && err.response.status && (err.response.status == 403||err.response.status===401)) {
          let navURL = "/";
          localStorageService.clearToken()
          toastError('Your Session Got Expired. Please Login again')
          return (window.location = navURL);
        }
        console.log(err)
        toastError(err?.message)
        callback(err, null);
      });
  }

  
  static httpPOST(endPoint, postObj, callback) {
    axios
      .post(endPoint, postObj)
      .then((res) => {
        callback(null, res);
      
      })
      .catch((err) => {
        console.log(err)
        toastError(err?.message)
        callback(err, null);
      });
  }

  
  static httpPOSTWithToken(endPoint, postObj, callback) {
    let token = localStorageService.getAccessToken();
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }; 
    axiosInstance({
        method:'post',
        data:postObj,
        url:endPoint,
        headers:headers
    })
      .then((res) => {
        console.log(res.data)
        callback(null, res);
      })
      .catch((err) => {
        // Forbidden. Not allowed to access the page
        if (err.response && err.response.status && (err.response.status == 403||err.response.status===401)) {
          let navURL = "/";
          localStorageService.clearToken()
          toastError('Your Session Got Expired. Please Login again')
          return (window.location = navURL);
        }
        callback(err, null);
        console.log(err)
        toastError(err?.message)
      });
  }
}
