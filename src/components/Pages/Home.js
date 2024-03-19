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
  const superadminId = useState('');
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

  const [BackEndData, setBackEndData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const superadminId = localStorage.getItem('superadminId');
        // if (!superadminId) {
        //   enqueueSnackbar('Selected user is not a Superadmin!', { variant: 'error'});
        //   navigate('/');
        //   return;
        // }
        
        const response = await axios.get(`http://localhost:8080/files/bridges?superadminId=${superadminId}`, {
          superadminId:superadminId,
        });
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data);
          setBackEndData(response.data);
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

  const handleRowClick = (bridgeName) => {
    RedirectDashboard(bridgeName);
    enqueueSnackbar('Welcome to Dashboard!', { variant: 'success'});
  };

  // Filter the data based on searchKeyword
  const filteredData = BackEndData.filter(
    (data) =>
      data.bridge.bridgeName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      data.bridge.country.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      data.bridge.state.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      data.bridge.division.toLowerCase().includes(searchKeyword.toLowerCase())
  );

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
        <button onClick={showAddBridge} className='justify-center absolute mb-16 py-4 z-40 font-semibold text-2xl w-full bg-pink-600 hover:bg-pink-900 flex cursor-pointer text-white'>Click here to add a new bridge &nbsp;
        {isExpanded ? <FaChevronUp size={30} style={{marginTop:'2px'}} /> : <FaChevronDown size={30} style={{marginTop:'2px'}} />}</button>
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
            <button onClick={addbridge} className="bg-blue-600 w-1/3 py-4 text-2xl font-semibold text-gray-100 rounded-sm hover:bg-blue-900">Add Manually</button>
            <br /><br /><br />
            <button onClick={addcsv} className="bg-blue-600 py-4 w-1/3 text-2xl font-semibold text-gray-100 rounded-sm hover:bg-blue-900">Upload Excel</button>
          </div>
          </div>
        )}

        {showexcelfile && (
          <div className='absolute bg-gray-100 w-full text-center z-50'>
            <button className='flex justify-start p-6 underline' onClick={back}><IoArrowBackCircleSharp size={28}/>Back</button>
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
            <div className="flex py-6 w-full justify-center">
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
        <div className='flex py-5 px-6 bg-gray-200 border border-gray-300 shadow-2xl'>
          <div className="w-full justify-left">
            <img src={logo} alt="" />
          </div>
          <div className='flex w-full justify-center'>
          <h1 className='font-bold text-3xl'>Added Bridges</h1>
          </div>
          <div className="flex w-full justify-end items-center">
            <MdSearch size={36} className='text-gray-600'/>
            <input type="text" placeholder="Search" className="border bg-gray-200 w-56 border-gray-600 rounded-md p-2 mr-2 focus:outline-none" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
          </div>
        </div>
        <br />
        <div className="mt-4 bg-gray-100 border border-gray-200 rounded-sm shadow-2xl">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="border bg-black text-lg text-white px-2 py-4 font-bold">#</th>
                <th className="border bg-black text-lg text-white px-16 py-4 font-bold">Name</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Country</th>
                <th className="border bg-black text-lg text-white px-10 py-4 font-bold">State</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Division</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Coordinates</th>
                <th className="border bg-black text-lg text-white px-2 py-4 font-bold">Girders</th>
                <th className="border bg-black text-lg text-white px-2 py-4 font-bold">Spans</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr key={index} onClick={() => handleRowClick(data.bridge.bridgeName)} className="hover:bg-gray-300 text-center cursor-pointer border border-gray-300" >
                    <td className="border px-2 py-3">{data.bridge.id}</td>
                    <td className="border px-16 py-3">{data.bridge.bridgeName}</td>
                    <td className="border px-8 py-3">{data.bridge.country}</td>
                    <td className="border px-10 py-3">{data.bridge.state}</td>
                    <td className="border px-8 py-3">{data.bridge.division}</td>
                    <td className="border px-8 py-3">{data.bridge.coordinates}</td>
                    <td className="border px-2 py-3">{data.bridge.noofgirders}</td>
                    <td className="border px-2 py-3">{data.bridge.nobridgespan}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-3 text-center text-lg hover:bg-gray-200 cursor-pointer">No bridges found</td>
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
