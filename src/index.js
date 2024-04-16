import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Masterlogin from './components/Pages/Masterlogin';
import reportWebVitals from './reportWebVitals';
import ChangePassword from './components/Pages/ChangePassword';
import Masterhome from './components/Pages/Masterhome';
import Superuserhome from './components/Pages/Superuserhome';
import ResetPassword from './components/Pages/ResetPassword';
import Home from './components/Pages/Home';
import BridgeForm from './components/Pages/BridgeForm';
import SensorForm from './components/Pages/sensorform';
import Addexcelfile from './components/Pages/Addexcelfile'
import Forgotpw from './components/Pages/Forgotpw';
import Bridges from './components/Pages/Bridges';
import Sensorformexcel from './components/Pages/Sensorformexcel';
// import Selector from './components/Pages/Selector';

const root = createRoot(document.getElementById('root'));

root.render(
    <SnackbarProvider 
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/masterlogin" element={<Masterlogin />} />
          <Route path="/forgotpassword" element={<Forgotpw />} />
          <Route path="/newuser/resetpassword" element={<ResetPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/addexcel" element={<Addexcelfile />} />
          <Route path="/home/bridgeform" element={<BridgeForm />} />
          <Route path="/home/bridgeform/sensorform" element={<SensorForm />} />
          <Route path="/home/sensorform-excel" element={<Sensorformexcel />} />
          <Route path="/home/dashboard" element={<Superuserhome />} />
          <Route path="/masterhome" element={<Masterhome />} />
          <Route path="/bridges" element={<Bridges />} />
        </Routes>
      </Router>
    </SnackbarProvider>
);

reportWebVitals();
