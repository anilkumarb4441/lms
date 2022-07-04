import React, { useState, useEffect } from "react";
import "./login.css";
import API_Services from "../../utils/API";
import Input from "../Input";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URLS } from "../../utils/urlConstants";
import {toastSuccess,toastWarning} from "../../utils/constants"
function Login({ setToken, setIsToken }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    API_Services.httpPOST(URLS.userLogin, credentials, callback);
  };

  const callback = (err, res) => {
    if (res) {
      if (res.status === 200 && res.data.success) {
        setToken(res.data);
        toastSuccess("Logged in Succesfully")
        setIsToken(true);
      } else {
        toastWarning(res.data.msg);
        setIsToken(false);
      }
    } 
  };

  useEffect(()=>{
    
   let email =  new URLSearchParams(window.location.search).get("email");
   let password =  new URLSearchParams(window.location.search).get("password");
   if(email && password){
     console.log(email,password);
    API_Services.httpPOST(`${URLS.userLogin}?email=${email}&password=${password}`,{}, callback);
   }
  },[])

  return (
    <div className="login-wrappper">
      <form onSubmit={(e) => submitForm(e)} className="login-form">
        <h2>Login</h2>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="xyz@gamil.com"
          value={credentials.email}
          change={updateCredentials}
          required={true}
        />
        <Input
          label="Password"
          name="password"
          placeholder="******"
          autoComplete="current-password"
          id="current-password"
          type="password"
          value={credentials.password}
          change={updateCredentials}
          required={true}
        />
        <button type="submit" className="btnPrimary">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
