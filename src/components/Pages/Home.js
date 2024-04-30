import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './tailwind.css';

import { MdSearch } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";

import logo from '../Assets/logo2.png';
import loadingIcon from '../Assets/loading.gif';

const Home = () => {
  const navigate = useNavigate();
  const [showBridge, setshowBridge] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const showAddBridge = (e) => {
    e.preventDefault();
    setshowBridge(!showBridge);
    setIsExpanded(!isExpanded);
  };

  const addbridge = () => {
    navigate('./bridgeform');
  };

const [showexcelfile, setshowexcelfile] = useState(false);

  const addcsv = async(e) => {
    e.preventDefault();
    setshowexcelfile(!showexcelfile);
    setshowBridge(false);
  };

  const [searchKeyword, setSearchKeyword] = useState('');

  const superadminId = localStorage.getItem('superadminId')
  console.log('superadminId:', superadminId);

  const [superdata, setsuperdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const email = localStorage.getItem('email');
        // if(!email){
        //     navigate('/');
        //     enqueueSnackbar('Please Login to Navigate!', { variant: 'error'});
        //     return;
        // }
        if (!superadminId) {
          enqueueSnackbar('Selected user is not a Superadmin!', { variant: 'error' });
          navigate('/');
        }
        const response = await axios.get(`http://localhost:9090/bridge/superbridges?superadminId=${superadminId}`);
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          if (Array.isArray(response.data)) {
            setsuperdata(response.data);
          } else {
            setsuperdata([response.data]);
          }
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [superadminId, navigate, enqueueSnackbar]);

  const RedirectDashboard = (bridgeName) => {
    localStorage.setItem('bridgeName', bridgeName);
    navigate('/home/dashboard');
  };

  const filteredData = superdata.filter((bridge) =>
  bridge.bridgeName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  bridge.country.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  bridge.state.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  bridge.division.toLowerCase().includes(searchKeyword.toLowerCase())
);


const handleRowClick = (bridge) => {
  if (bridge.id && bridge.bridgeName) {
    RedirectDashboard(bridge.bridgeName);
    enqueueSnackbar('Welcome to Dashboard!', { variant: 'success' });
  }
};

  const [data, setData] = useState([]);
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
        setLoading(true);
          try{
              const formData = new FormData();
                formData.append('file', selectedFile.file);
              const response = await axios.post('http://localhost:9090/files/upload', formData,{
                  headers:{
                      'Content-Type': 'multipart/form-data',
                  }
              });
              if(response.status >= 200 && response.status < 300){
                setLoading(false);
                console.log('Backend Response: ',response.data);
                enqueueSnackbar('File successfully uploaded!', { variant: 'success'});
                navigate('/home/sensorform-excel');
              }
          }
          catch(error){
            setLoading(false);
            console.log(error);
            enqueueSnackbar('Unable to submit form, please check your file format!', { variant: 'success'});
          }

      }
  };

  const back = (e) => {
    setshowexcelfile(false);
    setshowBridge(false);
    setIsExpanded(!isExpanded);
  };

  const sample_csv = 'https://shm-frontserver.azurewebsites.net/sample.xlsx'

  const downloadFileAtURL = (url) => {
      const fileName = url.split("/").pop();
      const aTag = document.createElement("a");
      aTag.href = url;
      aTag.href = url;
      aTag.setAttribute("download", fileName);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
  };

  return (
    <>
        <button onClick={showAddBridge} className='justify-center absolute mb-16 py-4 z-40 font-semibold text-2xl w-full bg-indigo-600 hover:bg-indigo-900 flex cursor-pointer overflow-hidden shadow-md text-white'>Click here to add a new bridge &nbsp; {isExpanded ? <FaChevronUp size={30} style={{marginTop:'2px'}} /> : <FaChevronDown size={30} style={{marginTop:'2px'}} />}</button>
        {showBridge && (
          <div className="absolute w-full mt-16 pb-24 pt-20 bg-gray-200 shadow-2xl text-center border border-gray-300 rounded-sm">
          <div className="w-full flex justify-center">
            <img src={logo} alt="" />
          </div>
          <br /><br /><br />
          <div className="w-full">
            <h1 className="text-3xl font-bold text-black mb-8">Welcome, <br /><br />Choose a method to Register a new Bridge</h1>
          </div>
          <br /><br />
          <div className="w-full justify-center">
            <button onClick={addbridge} className="bg-blue-600 w-1/3 py-4 text-2xl font-semibold text-gray-100 rounded-lg overflow-hidden shadow-xl hover:bg-blue-900">Add Manually</button>
            <br /><br /><br />
            <button onClick={addcsv} className="bg-blue-600 py-4 w-1/3 text-2xl font-semibold text-gray-100 rounded-lg overflow-hidden shadow-xl hover:bg-blue-900">Upload Excel</button>
          </div>
          </div>
        )}

        {showexcelfile && (
          <div className='absolute bg-gray-100 w-full text-center z-50'>
            <button className='flex justify-start pl-6 mt-4 underline' onClick={back}><IoArrowBackCircleSharp size={28}/>Back</button>
            <div className="flex justify-center mb-6">
              <img src={logo} alt="" />
            </div><br />
            <div>
              <h1 className='text-3xl font-semibold py-6'>Sample File</h1><br />
              <p className='text-gray-800'>Download this sample excel file for additional reference. <br />Create your own excel file by referring to the format of the sample file.</p><br />
              <button className="cursor-pointer bg-pink-600 text-white p-2 mt-6 rounded-sm hover:bg-pink-900" onClick={()=>{downloadFileAtURL(sample_csv)}}>Sample Download</button>
            </div>
            <br /><br /><hr /><br />
            <h1 className='text-3xl font-semibold py-6'>Select File</h1><br />
            <p className='text-gray-800'>Choose your excel file with reference to our sample excel file and upload it. <br />Make sure that the format matches that of our provided sample file.</p>
            <br />
            <div className="flex pt-6 pb-10 w-full justify-center">
              <input id='fileinput' className='hidden' type="file" accept='.xlsx , .xls , .csv' onChange={handleFileUpload} />
              <label htmlFor="fileinput" className="cursor-pointer bg-blue-600 text-white p-2 px-8 rounded-sm hover:bg-blue-900" >{selectedFile ? `${selectedFile.file.name}` : 'Choose File'}</label>
              {loading ? (
              <img id='homeload' src={loadingIcon} alt="Loading" />
              ) : (
              <button className='bg-green-600 justify-end text-white p-2 px-4 rounded-sm ml-12 hover:bg-green-900' onClick={postDataToServer}>Submit</button>
              )}
            </div>
          </div>  
        )}

      <div className="w-full pt-16">
        <div className='flex py-3 px-6 bg-gray-200 border border-gray-300 overflow-hidden shadow-xl'>
          <div className="w-full justify-left">
            <img src={logo} alt="" />
          </div>
          <div className='flex w-full justify-center'>
          <h1 className='font-bold text-3xl'>Added Bridges</h1>
          </div>
          <div className="flex w-full justify-end items-center">
            <MdSearch size={36} className='text-gray-600'/>
            <input type="text" placeholder="Search" className="border border-gray-300 p-2 pl-3 mr-5 outline-0 w-1/2 rounded-lg overflow-hidden shadow-md" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
          </div>
        </div>
        <br />
        <div className="mt-4 bg-gray-100 border border-gray-200 rounded-sm overflow-hidden shadow-xl mx-6">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="border bg-black text-lg text-white px-2 py-4 font-bold">#</th>
                <th className="border bg-black text-lg text-white px-12 py-4 font-bold">Name</th>
                <th className="border bg-black text-lg text-white px-4 py-4 font-bold">Country</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">State</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">City</th>
                <th className="border bg-black text-lg text-white px-4 py-4 font-bold">Division</th>
                <th className="border bg-black text-lg text-white py-4 font-bold">Coordinates</th>
              </tr>
            </thead>
            <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((bridge, index) => (
      <tr key={index} onClick={() => handleRowClick(bridge)} className="hover:bg-stone-400 text-center cursor-pointer border border-gray-300">
        <td className="px-2 py-2">{bridge.id}</td>
        <td className="px-12 py-2">{bridge.bridgeName}</td>
        <td className="px-4 py-2">{bridge.country}</td>
        <td className="px-8 py-2">{bridge.state}</td>
        <td className="px-8 py-2">{bridge.city}</td>
        <td className="px-4 py-2">{bridge.division}</td>
        <td className="py-2">{bridge.coordinates}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" className="py-2 text-center text-lg hover:bg-stone-400 cursor-pointer">
        No bridges found
      </td>
    </tr>
  )}
</tbody>
          </table>
        </div>
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
    </>
  );
};

export default Home;
