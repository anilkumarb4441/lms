import React, { useState,useEffect} from "react";
import "./login.css";
import axios from "axios";
import Input from "../Input";
import {URLS} from "../../utils/urlConstants"
function Login({setToken,setIsToken}) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
 
 
  const submitForm = (e) => {
    e.preventDefault();
  
   
    axios({
      method: "post",
      url: URLS.userLogin,
      data: credentials,
    }).then((res) => {
        if (res.status === 200 && res.data.success) {
              setToken(res.data);
              setIsToken(true);
        }else{
          alert(res.data.msg);
          setIsToken(false);
        }
      })
      .catch((err) => {
          alert('Something went wrong. Please try again later')
      });
  };

 
  return (
    <div className="login-wrappper">
      <form onSubmit={(e) => submitForm(e)} className="login-form">
          <h2>Login</h2>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder = "xyz@gamil.com"
          value={credentials.email}
          change={updateCredentials}
          required={true}
        />
        <Input
          label="Password"
          name="password"
          placeholder = "******"
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
