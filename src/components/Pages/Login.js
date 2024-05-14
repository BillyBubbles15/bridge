import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './tailwind.css';

import { FaUser, FaLock } from "react-icons/fa";
import { BsAwardFill } from "react-icons/bs";
import loadingIcon from '../Assets/loading.gif';

import logo from '../Assets/logo.png';
import logo2 from '../Assets/logo2.png';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Select Role'); 

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  

  const handleLogin = async () => {
    if (email === '') {
      enqueueSnackbar('Please enter an email!', { variant: 'error'});
    } else if (password === '') {
      enqueueSnackbar('Please enter a password!', { variant: 'error'});
    }else if (selectedRole === 'Select Role') {
      enqueueSnackbar ('Please select a role',{variant:'error'});
    } else {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:9090/login', {
          email: email,
          password: password,
          selectedRole: selectedRole,
        });
        localStorage.setItem('email', email);
  
        if (response.status >= 200 && response.status < 300) {
          console.log('Login successful');
          enqueueSnackbar('Logged in successfully!', { variant: 'success'});
          setLoading(false);
          
          const dashboardUrl = response.data.dashboardUrl;
          const superadminId = response.data.superadminId;
          const token = response.data.token;
          const name = response.data.name;
          
          localStorage.setItem('authToken', token);
          localStorage.setItem('name', name);
          localStorage.setItem('superadminId', superadminId);
          console.log(superadminId);
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
          <img className='xl:w-32 xl:p-6 md:w-20 md:p-4' src={logo} alt="" />
        </div>
        <div className="w-1/2 text-center justify-center">
          <div className="flex justify-center pt-8 xl:pb-16 md:pb-8">
            <img className='xl:w-40 md:w-24' src={logo2} alt="" />
          </div>
          <div className="text">
              <h1 className='xl:text-3xl xl:pb-24 md:pb-10 font-semibold text-indigo-900 md:text-lg'>Login</h1>
            </div>
          <div className="">
            <div className="xl:pb-6 md:pb-4 flex justify-center">
              <FaUser style={{ alignItems: 'center', marginTop: '1%' }} size={28}/>
              <input className="border border-gray-300 bg-gray-50 xl:p-3 xl:w-1/3 xl:text-base ml-3 pl-3 mr-2 md:w-2/5 md:pl-3 md:p-1 md:text-xs rounded-lg overflow-hidden shadow-md outline-0" type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)}/>
            </div>
            <div className="xl:pb-6 md:pb-4 flex justify-center">
            <FaLock style={{ alignItems: 'center', marginTop: '1%' }} size={28}/>
            <input className="border bg-gray-50 border-gray-300 xl:p-3 xl:w-1/3 xl:text-base ml-3 pl-3 mr-2 md:w-2/5 md:pl-3 md:p-1 md:text-xs rounded-lg overflow-hidden shadow-md outline-0" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
        </div>
      </div>
          <div className="xl:pb-6 md:pb-2 flex justify-center">
            <BsAwardFill style={{ alignItems: 'center', marginTop: '1%' }} size={30}/>
            <select className="border bg-gray-50 border-gray-300 xl:p-3 xl:w-1/3 xl:text-base ml-3 pl-3 mr-2 md:w-2/5 md:pl-3 md:p-1 md:text-xs cursor-pointer rounded-lg overflow-hidden shadow-md outline-0" onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="Select Role" selected disabled>Select Role</option>
              <option value="SUPERADMIN">Superadmin</option>
              <option value="bridge-owner">Bridge Owner</option>
              <option value="bridge-admin">Bridge Admin</option>
              <option value="bridge-manager">Bridge Manager</option>
            </select>
          </div>
          <div className="pt-16 md:pt-8">
            <div className="">
            {loading ? (
                <img id='Licon-login' className='absolute' src={loadingIcon} alt="Loading" />
              ) : (
                <button onClick={handleLogin} className='xl:p-2 mb-2 bg-blue-600 hover:bg-blue-900 text-white xl:text-base xl:px-8 md:text-xs md:px-4 md:py-2 rounded-sm overflow-hidden shadow-xl'>Login</button>
              )}
              <p className='underline xl:mb-16 xl:text-sm text-blue-800 hover:text-red-600 md:text-xs md:mb-2 rounded-sm'><a href="./forgotpassword">Forgot Password?</a></p>
            </div>
          </div>
        </div>
      </div>


  </>
  );
};

export default Login;