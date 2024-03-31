import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './tailwind.css';

import { FaUser, FaLock } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import logo from '../Assets/logo.png';
import logo2 from '../Assets/logo2.png';


function Forgotpw() {
    const [email, setEmail] = useState('');
    const [randomCharacters, setRandomCharacters] = useState('');
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        generateRandomCharacters();
    }, []);

    const generateRandomCharacters = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setRandomCharacters(result);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (email === '') {
          enqueueSnackbar('Please enter an email!', { variant: 'error'});
          } 
          else if(userInput !== randomCharacters){
            enqueueSnackbar('Incorrect Captcha!', { variant: 'error'});
            setUserInput('');
          }
          else {
            try {
              const response = await axios.post('http://localhost:9090/login', {
                email: email,
              });
              if (response.status >= 200 && response.status < 300) {
                console.log('Successful', response);
                enqueueSnackbar('Kindly check your email! We have sent you a link to reset your password.', { variant: 'success'});
                navigate('/')
              } 
              else {
                enqueueSnackbar('Incorrect Credentials!', { variant: 'error'});
                setEmail('');
                setRandomCharacters('');
              }
            } catch (error) {
              console.error('Error during login:', error);
              enqueueSnackbar('An Error Occurred!', { variant: 'error'});
            }
          }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };
  
    const PrevFrom = () => {
      navigate('/');
    };


    return (
        <>
            <div className='flex'>
                <div id='forgotpw' className='w-1/2'>
                    <img className='p-6 w-32' src={logo} alt="" />
                </div>
                <div className='w-1/2'>
                  <button type="submit" onClick={PrevFrom} className="inline-flex underline mt-4 p-2 hover:text-blue-800"><IoArrowBackCircleSharp size={32}/>Back</button>
                  <div className='flex justify-center'>
                    <img className='w-40' src={logo2} alt="" />
                  </div>
                    <h1 className='text-center pb-8 text-indigo-900 pt-8 text-2xl font-semibold'>Forgot Password?</h1>
                    <p className='px-24 pb-16 text-center'>Please provide your email address, and we'll promptly send you a secure link to reset your password via email.</p>
                    <div className='flex justify-center'>
                        <FaUser style={{ alignItems: 'center', marginTop: '1%' }} size={28} />
                        <input className="border border-gray-300 bg-gray-50 p-3 ml-3 w-1/3 pl-3 mr-2 rounded-lg overflow-hidden shadow-md outline-0" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex justify-center pt-6'>
                        <FaLock style={{ alignItems: 'center', marginTop: '1%' }} size={28}/>
                        <input className="border border-gray-300 bg-gray-50 p-3 ml-3 w-1/3 pl-3 mr-2 rounded-lg overflow-hidden shadow-md outline-0" type="text" placeholder="Enter Captcha" value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>
                    <p className='text-center mt-12 font-semibold'>Captcha</p>
                    <p className='text-center mb-6 bg-gray-800 text-white mx-72 p-4 text-2xl overflow-hidden shadow-md outline-0'><strong>{randomCharacters}</strong></p>
                    <div className='text-center'>
                        <button onClick={handleSubmit} className='p-2 bg-blue-600 hover:bg-blue-900 px-5 text-white rounded-sm overflow-hidden shadow-md outline-0'>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpw;
