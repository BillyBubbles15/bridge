import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import './tailwind.css';

import { MdSearch } from 'react-icons/md';

import logo from '../Assets/logo2.png';
// import loadingIcon from '../Assets/loading.gif';

const Home = () => {
  const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [BackEndData, setBackEndData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        if(!email){
            navigate('/');
            enqueueSnackbar('Please Login to Navigate!', { variant: 'error'});
            return;
        }
        const response = await axios.get(`http://localhost:9090/bridge/showbridge?email=${email}`);
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
  }, [navigate, enqueueSnackbar]);

  const RedirectDashboard = (bridgeName) => {
    localStorage.setItem('bridgeName', bridgeName);
    navigate('/home/dashboard');
  };

  const handleRowClick = (bridgeName) => {
    RedirectDashboard(bridgeName);
  };

  // Filter the data based on searchKeyword
  const filteredData = BackEndData.filter(
    (data) =>
      data.bridge.bridgeName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      data.bridge.country.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      data.bridge.state.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      data.bridge.division.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
      <div className="w-full">
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
        <div className="mt-4 bg-gray-100 mx-5 border border-gray-200 rounded-sm shadow-2xl">
          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="border bg-black text-lg text-white px-2 py-4 font-bold">#</th>
                <th className="border bg-black text-lg text-white px-16 py-4 font-bold">Name</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Country</th>
                <th className="border bg-black text-lg text-white px-10 py-4 font-bold">State</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Division</th>
                <th className="border bg-black text-lg text-white px-8 py-4 font-bold">Coordinates</th>
                <th className="border bg-black text-lg text-white px-2 py-4 font-bold">Spans</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                    <tr key={index} onClick={() => handleRowClick(data.bridge.bridgeName)} className="hover:bg-gray-300 text-center cursor-pointer border border-gray-300">
                      <td className="border px-2 py-3">{data.bridge.id}</td>
                      <td className="border px-16 py-3">{data.bridge.bridgeName}</td>
                      <td className="border px-8 py-3">{data.bridge.country}</td>
                      <td className="border px-10 py-3">{data.bridge.state}</td>
                      <td className="border px-8 py-3">{data.bridge.division}</td>
                      <td className="border px-8 py-3">{data.bridge.coordinates}</td>
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
    </>
  );
};

export default Home;
