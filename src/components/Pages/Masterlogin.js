import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './tailwind.css';

import { FaUser, FaLock } from "react-icons/fa";
import loadingIcon from '../Assets/loading.gif';

import logo from '../Assets/logo.png';
import logo2 from '../Assets/logo2.png';


const Masterlogin = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
  
    const handleLogin = async () => {
      if (email === '') {
        enqueueSnackbar('Please enter your email!', { variant: 'error'});
      }
      else if (password === '') {
        enqueueSnackbar('Please enter your password!', { variant: 'error'});
      }
      else {
        try {
          setLoading(true);
          const response = await axios.post('http://localhost:9090/login', {
            email: email,
            password: password,
          });
          localStorage.setItem('email', email);
    
          if (response.status >= 200 && response.status < 300) {
            console.log('Login successful');
            enqueueSnackbar('Logged in successfully!', { variant: 'success'});
            setLoading(false);
            
            const { token, superadminId, dashboardUrl } = response.data;
            
            localStorage.setItem('authToken', token);
            localStorage.setItem('superadminId', superadminId);
            localStorage.setItem('dashboardUrl', dashboardUrl);          
            navigate(dashboardUrl);
          } else {
            enqueueSnackbar('Incorrect Login Credentials!', { variant: 'error'});
            setemail('');
            setPassword('');
            setLoading(false);
          }
        } catch (error) {
          console.error('Error during login:', error);
          if (error.response && error.response.status === 403 && error.response.data === 'Invalid role selected') {
            enqueueSnackbar('Invalid role selected',{variant:'error'});
          } else {
            enqueueSnackbar('Incorrect login credentials!',{variant:'error'});
            enqueueSnackbar('User not found!', { variant: 'error'});  
          }
          setLoading(false);
        }
      }
    };
    
  
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleLogin();
      }
    };
    
    return (
      <>
        <div className="w-full flex">
          <div className="background w-1/2">
            <img className='w-32 p-6' src={logo} alt="" />
          </div>
          <div className="w-1/2 text-center justify-center">
            <div className="flex justify-center pt-8 pb-16">
              <img className='w-40' src={logo2} alt="" />
            </div>
            <div className="text">
                <h1 className='text-3xl pb-24 font-semibold text-indigo-900'>Login</h1>
              </div>
            <div className="">
              <div className="pb-6 flex justify-center">
                <FaUser style={{ alignItems: 'center', marginTop: '1%' }} size={28}/>
                <input className="border border-gray-400 bg-gray-100 p-3 w-1/3 ml-3 pl-3 mr-2 rounded" type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)}/>
              </div>
              <div className="pb-6 flex justify-center">
              <FaLock style={{ alignItems: 'center', marginTop: '1%' }} size={28}/>
              <input className="border bg-gray-100 border-gray-400 p-3 w-1/3 ml-3 pl-3 mr-2 rounded" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
          </div>
        </div>
            <div className="pt-16">
              <div className="">
              {loading ? (
                  <img id='Licon-login' className='absolute' src={loadingIcon} alt="Loading" />
                ) : (
                  <button onClick={handleLogin} className='p-2 mb-2 bg-blue-600 hover:bg-blue-900 text-white rounded-sm px-8'>Login</button>
                )}
                <p className='underline text-m text-blue-800'><a href="./forgotpassword">Forgot Password?</a></p>
              </div>
            </div>
          </div>
        </div>
  
  
    </>
    );
  };
export default Masterlogin;