import React, { useState, useEffect } from "react";
import "./login.css";
import API_Services from "../../utils/API";
import Input from "../Input";
import { URLS } from "../../utils/urlConstants";
import { toastSuccess, toastWarning } from "../../utils/constants"
import Loader from "../loader/loader";
import loginBack from '../../assets/login/background.png'
import eyeon from '../../assets/login/eyeon.svg'
import eyeoff from '../../assets/login/eyeoff.svg'
import Lottie from 'react-lottie';
import loginAnimation from '../../lottie/loginAnimation.json' 


function Login({ setToken, setIsToken }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true)
    API_Services.httpPOST(URLS.userLogin, credentials, callback);
  };

  const callback = (err, res) => {
    setLoading(false)
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

  useEffect(() => {

    let email = new URLSearchParams(window.location.search).get("email");
    let password = new URLSearchParams(window.location.search).get("password");
    if (email && password) {
      console.log(email, password);
      API_Services.httpPOST(`${URLS.userLogin}?email=${email}&password=${password}`, {}, callback);
    }
  }, [])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="login-wrappper">
      <div className="loginBackground" style={{ backgroundImage: `url(${loginBack})` }}>
        <div style={{display:'flex'}}>
        <Lottie 
	    options={defaultOptions}
        height={300}
        width={500}
      />
         <Lottie 
	    options={defaultOptions}
        height={300}
        width={500}
      />
        </div>
        <div className="loginFormWraper">
          <h4>Welcome back !</h4>
          <p>Sign in to continue Lead Management System</p>
          <form className="loginForm" onSubmit={(e) => submitForm(e)}>
            {loading ? <Loader /> : <>
              <div className="inputContainer">
                <label>Email</label><br />
                <input name="email"
                  type="email"
                  // placeholder="xyz@gmail.com"
                  value={credentials.email}
                  onChange={updateCredentials}
                  required={true} />
              </div>
              <div className="inputContainer">
                <label>Password</label><br />
                <div className="inputholder">
                  <input 
                  name="password"
                    placeholder="******"
                    autoComplete="current-password"
                    id="current-password"
                    type={showPassword ===true? "text" : "password"}
                    value={credentials.password}
                    onChange={updateCredentials}
                    required={true} />
                  <img src={showPassword === true ? eyeoff : eyeon} onClick={() => setShowPassword(show1 => !show1)} alt="showIcon" />
                </div>
              </div>

            </>}
             <a className="loginForgot"  href="https://customer.verzeo.com/employee/forgotpassword" target="_blank">Forgot Password?</a>
            <button type="submit" className="loginButton"> Sign in </button>
          </form>
        </div>
      </div>



    </div>
  );
}

export default Login;
