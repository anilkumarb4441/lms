import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {ToastContainer} from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';
import configureAppStore from "./store.js"


const store = configureAppStore()
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<>
  <Provider store = {store}>
  <ToastContainer/>
  <Router>
  <App />
  </Router>
  
  </Provider>
 
</>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
