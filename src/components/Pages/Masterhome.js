import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as XLSX from 'xlsx';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import './tailwind.css';


import { FaBridge } from "react-icons/fa6";
import { FaEdit, FaTrash } from "react-icons/fa";
import {MdHome, MdSettings, MdPerson, MdSearch, MdNotifications, MdDashboard, MdLogout, MdEdit } from 'react-icons/md'
import loadingIcon from '../Assets/loading.gif';

import logo2 from '../Assets/logo2.png';


const Masterhome = () => {

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    const [isSelected0, setIsSelected0] = useState(true);
    const [isSelected, setIsSelected] = useState(false);
    const [isSelected1, setIsSelected1] = useState(false);
    const [isSelected4, setIsSelected4] = useState(false);


    const [showUserDetails, setshowUserDetails] = useState(false);
    const [showDashboard, setshowDashboard] = useState(false);
    const [showBridgeDashboard, setshowBridgeDashboard] = useState(false);
    const [showModify, setshowModify] = useState(false);
    const [showHome, setshowHome] = useState(true);



    const UserDetails = () => {
        setshowUserDetails(!showUserDetails);
    };

    const Dashboard = () => {
        setIsSelected(!isSelected);
        setIsSelected1(false);
        setIsSelected4(false);
        setshowDashboard(!showDashboard);
        setshowBridgeDashboard(false);
        setshowModify(false);
        setIsSelected0(false);
        setshowHome(false);
    };

    const BridgeDashboard = () => {
        setIsSelected1(!isSelected1);
        setIsSelected(false);
        setIsSelected4(false);
        setshowBridgeDashboard(!showBridgeDashboard);
        setshowDashboard(false);
        setshowModify(false);
        setIsSelected0(false);
        setshowHome(false);
    };

    const RedirectHome = () => {
        setIsSelected0(!isSelected0);
        setshowHome(!showHome);
        setIsSelected1(false);
        setIsSelected(false);
        setIsSelected4(false);
        setshowDashboard(false);
        setshowBridgeDashboard(false);
        setshowDashboard(false);
        setshowModify(false);
    };


    const Modify = () => {
        setshowBridgeDashboard(false);
        setshowDashboard(false);
        setIsSelected1(false);
        setIsSelected(false);
        setIsSelected0(false);
        setshowHome(false);
        setshowModify(!showModify);
        setIsSelected4(!isSelected4);
    };

    const [Name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [companyName , setCompanyName] = useState('');
    const [phonenumber , setphonenumber] = useState('');
    const [countryCode , setCountryCode] = useState('');
    const [email , setEmail] = useState('');
    const [role, setRole] = useState('SUPERADMIN');

    const submitForm = async (event) => {
      if(phonenumber.length < 11){
        enqueueSnackbar('Incorrect Mobile Number!', { variant: 'error'});
        setphonenumber(''); 
      }
      try {
        setLoading(true);
        event.preventDefault();
    
        const formData = {
          name: Name,
          designation: designation,
          companyName: companyName,
          email: email,
          phonenumber: phonenumber,
          countryCode: countryCode,
          role: role,
        };
    
        console.log('Form Data:', formData);
    
        const response = await axios.post('http://localhost:9090/masterhome/register', formData);
        console.log('Form submitted successfully', response.data);
        enqueueSnackbar('Form submitted successfully', { variant: 'success'});
        setName('');
        setDesignation('');
        setCompanyName('');
        setEmail('');
        setRole('SUPERADMIN')
        setCountryCode('');
        setphonenumber('');
        setLoading(false);
      } catch (error) {
        console.error('Error submitting form', error);
        if (error.response && error.response.status === 400) {
          if (error.response.data.message === "Email already exists. Please choose a different email.") {
            enqueueSnackbar('Email already exists. Please choose a different email.', { variant: 'error'});
            setLoading(false);
          }
          else if (error.response.data.message === "Name must be unique. Please choose a different name.") {
            enqueueSnackbar('Name must be unique. Please choose a different name.', { variant: 'error'});
            setLoading(false);
          } 
          else {
            enqueueSnackbar('Error submitting form', { variant: 'error'});
            setLoading(false);
          }
        } 
        else {
          enqueueSnackbar('Error submitting form', { variant: 'error'});
          setLoading(false);

        }
      }
    };
    
    const Logout = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Corrected key
            console.log(token);
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Correct interpolation
                }
            };
    
            const response = await axios.post('http://localhost:9090/logout', {}, config);
    
            if (response.status === 200) {
                console.log(response.data);
                enqueueSnackbar('Logged out successfully', { variant: 'success'});
                localStorage.removeItem('authToken');
                navigate('/masterlogin');
            } else {
                console.error('Failed to fetch data:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };

  const id = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const[showdelbridge, setshowdelbridge] = useState('');

  const DelBridge = (e) => {
    e.preventDefault();
    setshowdelbridge(!showdelbridge);
  }
  const Deldelbridge = (e) => {
    setshowdelbridge(false);
  };

  const [data, setData] = useState([]);;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setData(parsedData);
          setSelectedFile({ file, data: parsedData });
      };
  };

  const postDataToServer = async() => {
      if(!selectedFile){
          enqueueSnackbar('Please add a file!', { variant: 'error'});
      }
      else{
          try{
              const formData = new FormData();
                formData.append('file', selectedFile.file);
              const response = await axios.post('http://localhost:9090/bridge/csv/1', formData,{
                  headers:{
                      'Content-Type': 'multipart/form-data',
                  }
              });
              if(response.status >= 200 && response.status < 300){
                  console.log('Backend Response: ',response.data);
                  enqueueSnackbar('File uploaded successfully!', { variant: 'success'});
                  navigate('/home');
              }
          }
          catch(error){
              console.log(error);
              enqueueSnackbar('Error Submitting file! Please check your file format! ', { variant: 'error'});
          }
      }
  };


    const DelBridge1 = async() => {
        const response = await axios.delete(`http://localhost:9090/bridge/deletebridge/${id}`)
        if (response.status >= 200 && response.status < 300) {
            console.log(response.data);
            enqueueSnackbar('Bridge Deleted Successfully!', { variant: 'success'});
        } 
        else {
            console.error('Failed to fetch data:', response.statusText);
        }
    };





    const [bridges, setBridges] = useState([]);
    const [superAdminId, setSuperAdminId] = useState(null);
    const [emaill, setemaill] = useState(null);
  
    useEffect(() => {
      const fetchBridges = async () => {
        try {
          const response = await axios.get('http://localhost:9090/bridge/getallbridge');
          console.log(response.data);
          setBridges(response.data);
        } catch (error) {
          console.error('Error fetching bridges:', error);
        }
      };
  
      fetchBridges();
    }, []);

    useEffect(() => {
      const fetchAllUserData = async () => {
        try {
          const response = await axios.get('http://localhost:9090/masterhome/getuserdata');
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching bridges:', error);
        }
      };
  
      fetchAllUserData();
    }, []);

    useEffect(() => {
      const fetchSuperAdmin = async () => {
        try {
          const superAdminResponse = await axios.get(`http://localhost:9090/getdata/byrole?role=SUPERADMIN`);
          console.log(superAdminResponse.data);
          setSuperAdminId(superAdminResponse.data.name);
        } catch (error) {
          console.error('Error fetching superadmin:', error);
        }
      };
    
      fetchSuperAdmin();
    }, []);


    const [userId, setUserId] = useState('');

    useEffect(() => {
      const fetchUserEmail = async () => {
        try {
          if (!emaill) return;
          const useremailResponse = await axios.get(`http://localhost:9090/masterhome/findUser/${emaill}`);
          const useremailData = useremailResponse.data;
          const userId = useremailData.userId;
          setemaill(useremailResponse.data);
          
          setUserId(userId);
        } catch (error) {
          console.error('Error fetching user email:', error);
        }
      };
  
      fetchUserEmail();
    }, [emaill]);

    const promotion = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:9090/masterhome/addSuperadmin/${userId}`);
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          enqueueSnackbar('User Promoted to SuperAdmin!', { variant: 'success'});
        }
        else{
          console.log(response.data);
          enqueueSnackbar('Vishay', { variant: 'error'});
        }
      } catch (error) {
        console.error('Vishay:', error);
      }
    };

    const demotion = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:9090/masterhome/removeSuperadmin/${superAdminId}`);
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          enqueueSnackbar('Superadmin Removed successfully!', { variant: 'success'});
        } else {
          console.log(response.data);
          enqueueSnackbar('Error removing superadmin', { variant: 'error'});
        }
      } catch (error) {
        console.error('Error removing superadmin:', error);
        enqueueSnackbar('Error removing superadmin', { variant: 'error'});
      }
    };



  
    const filteredData = bridges.filter((bridge) =>
    (bridge.bridgeName?.toLowerCase().includes(searchKeyword.toLowerCase()) || false) ||
    (bridge.country?.toLowerCase().includes(searchKeyword.toLowerCase()) || false) ||
    (bridge.state?.toLowerCase().includes(searchKeyword.toLowerCase()) || false) ||
    (bridge.division?.toLowerCase().includes(searchKeyword.toLowerCase()) || false)
  );

  const [showopt, setshowopt] = useState('');
  const showoption = (e) => {
    e.preventDefault();
    setshowopt(!showopt);
  }

  const [showopt1, setshowopt1] = useState('');
  const showoption1 = (e) => {
    e.preventDefault();
    setshowopt1(!showopt1);
  }
  
  
  return (
    <>
      <div className="flex fixed z-10 w-full justify-center bg-gray-100 py-2 shadow-xl">
        <div className='w-1/4'>   
           <img className='h-10 pt-2 cursor-pointer pl-5'  src={logo2} alt=""/>
        </div>
        <div className='w-2/3 text-center pt-1'>
            <h1 className='text-2xl font-semibold'>Structural Health Monitoring - Master Admin Dashboard</h1>
        </div>
        <div className='w-1/4 text-right'>
            <button className='px-2'><MdNotifications size={36} /></button>
            <button onClick={UserDetails} className='px-2'><MdPerson onClick={UserDetails} size={36} /></button>
        </div>
      </div>

      <nav className='w-32 bg-gray-300 fixed mt-14'>
        <div className='text-center'>
            <button className={`w-full py-5 ${isSelected0 ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={RedirectHome}><ul><MdHome style={{width: '100%', alignItems: 'center'}} size={40} />Add Superuser</ul></button>
            <hr /><hr />
            <button className={`w-full py-5 ${isSelected ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={Dashboard}><ul><MdDashboard style={{width: '100%', alignItems: 'center'}} size={40} />Add Data Sheet</ul></button>
            <hr /><hr />
            <button className={`w-full py-5 ${isSelected1 ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={BridgeDashboard}><ul><FaBridge style={{width: '100%', alignItems: 'center'}} size={40} />Bridge List</ul></button>
            <hr /><hr />
            <button className={`w-full py-3 ${isSelected4 ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={Modify}><ul><FaEdit style={{width: '100%', alignItems: 'center'}} size={40} />Edit</ul></button>
            <hr /><hr />
            <button className='w-full py-3 hover:bg-gray-400'><ul><MdSettings style={{width: '100%', alignItems: 'center'}} size={40}/>Settings</ul></button>
        </div>  
      </nav>


      {showUserDetails && (
        <div className="w-1/12 z-10 fixed top-14 right-2 bg-gray-100 border shadow-md">
          <div className='p-2 text-center'>Name</div>
          <div className='flex cursor-pointer hover:bg-gray-200 p-2'><MdEdit size={24} style={{paddingTop: '3px'}}/>Edit Info</div>
          <div className='flex cursor-pointer hover:bg-gray-200 p-2' onClick={Logout}><MdLogout size={24} style={{paddingTop: '3px'}}/>Log-out</div>
        </div>
      )}


      {showHome && (
        <>
          <form onSubmit={submitForm}>
          <div className='w-11/12 ml-32 p-6 pt-24'>
            <h1 className='text-center font-semibold mb-4 text-3xl'>Register Super Admin</h1>
              <div className='w-full flex px-24 py-12 shadow-xl bg-gray-100'>
                <div className=' grid w-full px-14'>
                  <label htmlFor="name">Name:</label>
                  <input  className='border border-gray-300 overflow-hidden shadow-md pl-3 p-1 mr-2 rounded mb-4' placeholder='Enter Name' type="text" value={Name} onChange={(e) => setName(e.target.value)} name="name" required />
                  <label htmlFor="designation">Designation:</label>
                  <input className='border border-gray-300 overflow-hidden shadow-md pl-3 p-1 mr-2 rounded mb-4' placeholder='Enter Designation' type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} name="designation" required />
                </div>

                <div className='grid w-full px-14'>
                  <label htmlFor="companyName">Company Name:</label>
                  <input  className='border border-gray-300 overflow-hidden shadow-md pl-3 p-1 mr-2 rounded mb-4' placeholder='Enter Company' type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} name="companyName" required />
                  <label  htmlFor="email">Email id:</label>
                  <input className='border border-gray-300 overflow-hidden shadow-md pl-3 p-1 mr-2 rounded mb-4' placeholder='Enter Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                </div>
                

              <div className='grid w-full px-14'>
                <label htmlFor="phonenumber">Mobile Number: </label>
              <div>
                  <PhoneInput country={'us'} value={phonenumber} onChange={(value) => setphonenumber(value)} inputProps={{  required: true, }}/>
                </div>
                <label className='' htmlFor="Role">Role:</label>
                <input type="text" className='border border-gray-300 overflow-hidden shadow-md pl-3 p-1 mr-2 rounded mb-4' value={role} name="superadmin" readOnly/>
              </div>
            </div>
            <div className='text-center mt-6'>
            {loading ? (
                <img id='Licon-masterform' className='absolute' src={loadingIcon} alt="Loading" />
              ) : (
                <button className='p-1 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-900' onClick={submitForm}>Submit</button>
            )}
            </div>
          </div>
          </form>
        </>
      )}


      {showBridgeDashboard && (
        <div className='w-11/12 ml-28 p-6 pt-20 bg-white'>
          <div className='flex py-5 px-6 bg-gray-200 border border-gray-300 shadow-2xl'>
            <div className="w-full justify-left">
              <img src={logo2} alt="" />
            </div>
            <div className='flex w-full justify-center'>
            <h1 className='font-bold text-3xl'>LIST OF ALL BRIDGES</h1>
            </div>
            <div className="flex w-full justify-end items-center">
              <MdSearch size={36} className='text-gray-600'/>
              <input type="text" placeholder="Search" className="w-56 rounded-lg overflow-hidden shadow-md p-2 mr-2 focus:outline-none" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
            </div>
          </div>
          <div className="mt-4 bg-gray-100 border border-gray-200 rounded-sm shadow-2xl">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="border bg-black text-lg text-white px-3 py-4 font-bold">#</th>
                <th className="border bg-black text-lg text-white px-16 py-4 font-bold">Bridge Name</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Superadmin</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Admin(s)</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Manager(s)</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Owner(s)</th>
                <th className="border bg-black text-lg text-white px-2 py-4 font-bold">Add Datasheet</th>
                <th className="justify-center border bg-black text-lg text-white px-3 py-4 font-bold">Delete</th>
              </tr>
            </thead>
            {showdelbridge&&(
              <div className='absolute'>
                <h1>Do you really want to delete this bridge?</h1>
                <div>
                  <button onClick={DelBridge1}>Yes</button>
                  <button onClick={Deldelbridge}>No</button>
                </div>
              </div>
            )}
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((bridge, index) => (
                  <tr key={index} className="text-center border border-gray-300">
                    <td className="border px-3 py-3">{bridge.id}</td>
                    <td className="border px-16 py-3">{bridge.bridgeName}</td>
                    <td className="border px-10 py-3">
                      <select id="adminName" className="ouline-0 p-1 w-full rounded">
                        <option value={bridge.adminName} onMouseOver={showoption}>{bridge.adminName}</option>
                        {bridge.adminName2 ? <option value={bridge.adminName2} onMouseOver={showoption}>{bridge.adminName2}</option> : <option value="">Admin 2</option>}
                        {bridge.adminName3 ? <option value={bridge.adminName3} onMouseOver={showoption}>{bridge.adminName3}</option> : <option value="">Admin 3</option>}
                      </select>
                    </td>
                    <td className="border px-8 py-3">
                      <select id="adminName" className="ouline-0 p-1 w-full rounded">
                        <option value={bridge.managerName} onMouseOver={showoption}>{bridge.managerName}</option>
                        {bridge.managerName2 ? <option value={bridge.managerName2} onMouseOver={showoption}>{bridge.managerName2}</option>: <option value="">Manager 2</option>}
                        {bridge.managerName3 ? <option value={bridge.managerName3} onMouseOver={showoption}>{bridge.managerName3}</option>: <option value="">Manager 3</option>}
                        {bridge.managerName4 ? <option value={bridge.managerName4} onMouseOver={showoption}>{bridge.managerName4}</option>: <option value="">Manager 4</option>}
                        {bridge.managerName5 ? <option value={bridge.managerName5} onMouseOver={showoption}>{bridge.managerName5}</option>: <option value="">Manager 5</option>}
                        {bridge.managerName6 ? <option value={bridge.managerName6} onMouseOver={showoption}>{bridge.managerName6}</option>: <option value="">Manager 6</option>}
                      </select>
                    </td>
                    
                    <td className="border px-8 py-3">
                      <select id="adminName" className="ouline-0 p-1 w-full rounded" readOnly>
                        <option value={bridge.ownerName} onMouseOver={showoption}>{bridge.ownerName}</option>:
                        {bridge.ownerName2 ? <option value={bridge.ownerName2} onMouseOver={showoption}>{bridge.ownerName2}</option>: <option value="">Owner 2</option>}
                        {bridge.ownerName3 ? <option value={bridge.ownerName3} onMouseOver={showoption}>{bridge.ownerName3}</option>: <option value="">Owner 3</option>}
                      </select>
                    </td>
                    <td className="border px-2 py-3">
                    <div>
                      <div className='hover:bg-gray-200 w-3/5'>
                      <input id='fileinput' className='hidden' type="file" accept='.xlsx , .xls , .csv' onChange={handleFileUpload} />
                      <label htmlFor="fileinput" className="cursor-pointer bg-blue-600 text-white p-2 px-8 rounded-sm hover:bg-blue-900" >{selectedFile ? `${selectedFile.file.name}` : 'Choose File'}</label>
                      <button className='bg-green-600 justify-end text-white p-2 px-4 rounded-sm ml-12 hover:bg-green-900' onClick={postDataToServer}>Submit</button>
                      </div>
                    </div>
                    </td>
                    <td className="border px-3 py-3 cursor-pointer"><button onClick={DelBridge}><FaTrash size={20}/></button></td>
                  </tr>
                  
                ))
                ) : (
                  
                <tr>
                  <td colSpan="8" className="py-3 text-center text-lg">
                    <h1 onMouseOver={showoption}>No bridges found</h1>
                  </td>
                </tr>
              )}
            { showopt && (
              <>
                <div className='w-10/12 absolute z-50 '>
                  <div className='flex w-full justify-center'>
                  <h1 onClick={promotion} className='text-center w-full bg-pink-600'>Make Superadmin</h1>
                  </div>
                </div>
              </>
            )}
            { showopt1 && (
              <>
                <div className='w-10/12 absolute z-50 '>
                  <div className='flex w-full justify-center'>
                  <h1 onClick={demotion} className='text-center w-full bg-pink-600'>Remove Superadmin</h1>
                  </div>
                </div>
              </>
            )}
            </tbody>
          </table>
          
        </div>

        {data.length > 0 && (
            <table className='hidden text-left'>
                <thead>
                    <tr className='grid'>
                        {Object.keys(data[0]).map((key)=>(
                            <th className='p-2 w-full' key={key}><label htmlFor="label">{key}:</label></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr className='grid' key={index}>
                            {Object.values(row).map((value, index) => (
                                <td key={index}><input className='p-2 w-full' type="text" value={value} readOnly/></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </div>
      )}
</>

  )
};
export default Masterhome;
