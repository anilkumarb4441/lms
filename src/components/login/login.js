import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import Input from "../Input";
import URLS from "../../utils/urlConstants"
function Login({setToken,setIsToken}) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
 
 
  const submitForm = (e) => {
    e.preventDefault();
    console.log(credentials)
    axios({
      method: "post",
      url: URLS.login,
      data: credentials,
    }).then((res) => {
        if (res.status === 200) {
              setToken(res.data);
              setIsToken(true);
        }
      })
      .catch((err) => {
          if(err.msg){
              console(err.msg)
          }
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
