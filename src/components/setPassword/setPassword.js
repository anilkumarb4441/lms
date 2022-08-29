import React from 'react';
import './setPassword.css'

// assets
import backImg from '../../assets/login/forgotBack.png';
import verlogo from '../../assets/login/verzeoL.svg';

const SetPassword = () => {
    return (
        <div className='serPasswordWraper' style={{backgroundImage:`url(${backImg})`}}>
           <div className='setPassword-logo'>
            <img src={verlogo} />   
           </div>
           <div className='setPassForm-holder'>
                <h1>Don't Worry !</h1>
                <p>Let Me Help You !!</p>
                <form className='serPassForm'>
                    <input type='email' placeholder='Enter Your Email ID' required/>
                    <button>Send Reset Link</button>
                </form>
           </div>
        </div>
    );
};

export default SetPassword;