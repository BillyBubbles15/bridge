import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import './tailwind.css';

import logo from '../Assets/logo2.png';
import loadingIcon from '../Assets/loading.gif';


const SensorForm = () => {
  const [loading, setLoading] = useState(false);
  const [showAddSensor, setshowAddSensor] =useState(false);
  const [numSensors, setNumSensors] = useState('');
  const [sensorInputs, setSensorInputs] = useState([]);

  const [sensortype, setsensortype]= useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [division, setDivision] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [bridgeLocation, setBridgeLocation] = useState('');
  const [bridgeName, setBridgeName] = useState('');
  
  const [spanno, setspanno] = useState(0);
  const [girderno, setgirderno] = useState(0);

  const [adminName, setAdminName] = useState('');
  const [adminName2, setAdminName2] = useState('');
  const [adminName3, setAdminName3] = useState('');

  const [managerName, setManagerName] = useState('');
  const [managerName2, setManagerName2] = useState('');
  const [managerName3, setManagerName3] = useState('');
  const [managerName4, setManagerName4] = useState('');
  const [managerName5, setManagerName5] = useState('');
  const [managerName6, setManagerName6] = useState('');

  const [ownerName, setOwnerName] = useState('');
  const [ownerName2, setOwnerName2] = useState('');
  const [ownerName3, setOwnerName3] = useState('');

  const [spannos, setspannos] = useState('');
  const [girderCount, setgirderCount] = useState('');

  const bid = localStorage.getItem('bid');

  const Navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const storedCountry = localStorage.getItem('country');
    const storedState = localStorage.getItem('state');
    const storedCity = localStorage.getItem('city');
    const storedDivision = localStorage.getItem('division');
    const storedCoordinates = localStorage.getItem('coordinates');
    const location = localStorage.getItem('location');
    const storedbridgeName = localStorage.getItem('bridgeName');

    const storedSpans = localStorage.getItem('spans');
    const storedGirders = localStorage.getItem('girderCount');

    const storedOwnerName = localStorage.getItem('ownerName');
    const storedOwnerName2 = localStorage.getItem('ownerName2');
    const storedOwnerName3 = localStorage.getItem('ownerName3');

    const storedManagerName = localStorage.getItem('managerName');
    const storedManagerName2 = localStorage.getItem('managerName2');
    const storedManagerName3 = localStorage.getItem('managerName3');
    const storedManagerName4 = localStorage.getItem('managerName4');
    const storedManagerName5 = localStorage.getItem('managerName5');
    const storedManagerName6 = localStorage.getItem('managerName6');

    const storedAdminName = localStorage.getItem('adminName');
    const storedAdminName2 = localStorage.getItem('adminName2');
    const storedAdminName3 = localStorage.getItem('adminName3');


  
    setCountry(storedCountry || '');
    setState(storedState || '');
    setCity(storedCity || '');
    setDivision(storedDivision || '');
    setCoordinates(storedCoordinates || '');
    setBridgeLocation(location || '');
    setBridgeName(storedbridgeName || '');

    setspannos(storedSpans || '');
    setgirderCount(storedGirders || '');

    setAdminName(storedAdminName || '');
    setAdminName2(storedAdminName2 || '');
    setAdminName3(storedAdminName3 || '');

    setManagerName(storedManagerName || '');
    setManagerName2(storedManagerName2 || '');
    setManagerName3(storedManagerName3 || '');
    setManagerName4(storedManagerName4 || '');
    setManagerName5(storedManagerName5 || '');
    setManagerName6(storedManagerName6 || '');

    setOwnerName(storedOwnerName || '');  
    setOwnerName2(storedOwnerName2 || '');  
    setOwnerName3(storedOwnerName3 || '');  

  }, []);

  const handleSensorTypeChange = (e) => {
    setsensortype(e.target.value);
  };

  const handleNumSensorsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumSensors(count);
    const inputs = Array.from({ length: count }, (_, index) => ({
      id: index,
      value: ''
    }));
    setSensorInputs(inputs);
  };


  const handleSubmit1 = async(e) => {
    e.preventDefault();
    if(!sensortype || !numSensors || !sensorInputs){
      enqueueSnackbar('Please fill all the fields!', { variant: 'error'});
    }
    else {
      setshowAddSensor(!showAddSensor);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sensortype || !numSensors || !sensorInputs) {
      enqueueSnackbar('Please fill all the fields correctly!', { variant: 'error'});
      setshowAddSensor(false);
    }
    else {
      try {
        setLoading(true);
        const sensorData = [];
        
        sensorInputs.forEach((input) => {
          const spanno = input.spanno;
          const girderno = input.girderno;
          sensorData.push({
            sensortype: sensortype,
            spanno: spanno,
            girderno: girderno,
          });
        });
  
        // Post sensor data for each location separately
        for (const data of sensorData) {
          const response = await axios.post(`http://localhost:9090/bridge/addSensorData/${bid}`, [data]);
          if (response.status >= 200 && response.status < 300) {
            console.log('Sensor Added Successfully:', data);
            enqueueSnackbar('Sensor(s) Added Successfully!', { variant: 'success'});
            Navigate('../home');
          }
        }
      } catch (error) {
        console.error('Error submitting form: ', error);
        enqueueSnackbar('Failed to submit form!', { variant: 'error'});
      } finally {
        setLoading(false);
        setshowAddSensor(false);
        setNumSensors('');
        setsensortype('');
        setspanno('');
        setgirderno('');
        setSensorInputs([]);
      }
    }
  };


  const handleCancel = () => {
    setsensortype('');
    setspanno('');
    setgirderno('');
    setSensorInputs([]);
    setNumSensors('');
  };

const handleAddSensor = async (e) => {
  e.preventDefault();
  if (!sensortype || !numSensors || !sensorInputs) {
    enqueueSnackbar('Please fill all the fields correctly!', { variant: 'error'});
  }
  else {
    try {
      setLoading(true);
      const sensorData = [];
      
      sensorInputs.forEach((input) => {
        const spanno = input.spanno;
        const girderno = input.girderno;
        sensorData.push({
          sensortype: sensortype,
          spanno: spanno,
          girderno: girderno,
        });
      });

      // Post sensor data for each location separately
      for (const data of sensorData) {
        const response = await axios.post(`http://localhost:9090/bridge/addSensorData/${bid}`, [data]);
        if (response.status >= 200 && response.status < 300) {
          console.log('Sensor Added Successfully:', data);
          enqueueSnackbar('Sensor(s) Added Successfully!', { variant: 'success'});
        }
      }
    } catch (error) {
      console.error('Error submitting form: ', error);
      enqueueSnackbar('Failed to submit form!', { variant: 'error'});
    } finally {
      setLoading(false);
      setshowAddSensor(false);
      setNumSensors('');
      setsensortype('');
      setspanno('');
      setgirderno('');
      setSensorInputs([]);
    }
  }
};

const handleSensorInputChange = (id, value) => {
  setSensorInputs(prevInputs => prevInputs.map(input => {
    if (input.id === id) {
      return { ...input, value };
    }
    return input;
  }));
};

  return (
    <>
    <div className="">
      <img className='pl-6 pt-6 pb-6' src={logo} alt="" />
      <div className="flex w-full text-center">
      <div className="container w-1/2 box-border shadow-2xl mx-5 ml-10 my-8 p-6 bg-gray-100">
      <h1 className='text-center text-3xl text-black font-sans font-semibold'>Add Sensor Details</h1><br /><hr /><hr />
      <form>
        <div className='justify-center text-left pt-8 mx-20 block'>
          <h1 className='text-left px-5 font-semibold mb-4'>Add Sensor Location:</h1>
          <div className='flex w-full'>
          <div className="w-1/2 mb-4 px-5">
            <label htmlFor="nobridgespan" className="block text-gray-700">Span Number:</label>
            <select id="nobridgespan" name="nobridgespan" onChange={(e) => setspanno(e.target.value)}  className="border border-gray-300 p-1 w-full pl-3 mr-2 overflow-hidden shadow-md outline-0 rounded-lg">
              {[...Array(50).keys()].map((span) => (<option key={span + 1} value={spanno + 1}>{span + 1}</option>))}
            </select>
          </div>
          <div className="w-1/2 mb-4 px-5">
            <label htmlFor="girderno" className="block text-gray-700">Girder Number:</label>
            <select id="girderno" name="girderno" onChange={(e) => setgirderno(e.target.value)}  className="border border-gray-300 p-1 w-full pl-3 mr-2 overflow-hidden shadow-md outline-0 rounded-lg">
              {[...Array(50).keys()].map((girder) => (<option key={girder + 1} value={girderno + 1}>{girder + 1}</option>))}
            </select>
          </div>
          </div>

          <div className="mb-4 px-5">
            <label htmlFor="sensortype" className="block text-gray-700">Sensor Type:</label>
            <select id="sensortype" onChange={handleSensorTypeChange} name="sensortype" value={sensortype} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg outline-0 overflow-hidden shadow-md">
              <option value="" disabled>Select Sensor Type</option>
              <option value="Accelerometer">Accelerometer</option>
              <option value="Strain Gauge">Strain Gauge</option>
              <option value="Deflection Gauge">Deflection Gauge</option>
              <option value="Camera">Camera</option>
            </select>
          </div>
            <div id='sensorform-pop1' className="mx-5 mb-4">
              <label htmlFor="numSensors" className="block text-gray-700">Number of Sensors:</label>
              <select id="numSensors" onChange={handleNumSensorsChange} value={numSensors} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg overflow-hidden outline-0 shadow-md">
                {Array.from({ length: 11 }, (_, index) => (
                  <option key={index} value={index}>{index}</option>
                ))}
              </select>
            </div>
            {sensorInputs.map(input => (
              <div className="mx-5 mb-4" key={input.id}>
                <label className="block text-gray-700" htmlFor={`sensorInput${input.id}`}>Sensor {input.id + 1} Location:</label>
                <input className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg overflow-hidden outline-0 shadow-md" type="text" id={`sensorInput${input.id}`} placeholder='Ex: Center, Top Right' value={input.value} onChange={(e) => handleSensorInputChange(input.id, e.target.value)}/>
              </div>
            ))}
        </div>


        {showAddSensor && (
        <div>
          {loading ? (
            <img id='Licon-sensorform' className='absolute' src={loadingIcon} alt="Loading" />
            ) : (
            <>
              <div id='sensorform-pop' className='absolute bg-white px-32 py-8 rounded shadow-2xl border border-black'>
                <h1 className='pb-8'>Do you want to add another sensor?</h1>
                <button className="bg-blue-600 px-5 mx-2 py-2 text-gray-100 rounded-sm hover:bg-blue-900 overflow-hidden shadow-2xl" onClick={handleAddSensor}>Yes</button>
                <button className="bg-pink-600 px-5 mx-2 py-2 text-gray-100 rounded-sm hover:bg-pink-900 overflow-hidden shadow-2xl" onClick={handleSubmit}>No</button>
              </div>
            </>
          )}

          
        </div>
          )}
        {!showAddSensor && (
          <div className='my-6 text-center'>
            <button className="bg-blue-600 px-5 mx-2 py-2 text-gray-100 rounded-sm hover:bg-blue-900 overflow-hidden shadow-2xl" onClick={handleSubmit1}>Submit</button>
            <button className="bg-black px-5 mx-2 py-2 text-gray-100 rounded-sm border border-black hover:bg-white hover:text-black overflow-hidden shadow-2xl" onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </form>
    </div>

    <div className="box-border shadow-2xl w-1/2 p-6 bg-gray-100 mx-5 mr-10 my-8 justify-center text-left">
      <h1 className='text-center font-semibold text-3xl text-black'>Previously Entered Details</h1><br /><hr /><hr />
      <div className='flex pt-8'>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="sensorlocation" className="block text-gray-700">Country:</label>
          <input type="text" value={country} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden shadow-md" disabled/>
        </div>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="sensorlocation" className="block text-gray-700">State:</label>
          <input type="text" value={state} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden shadow-md" disabled/>
        </div>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="sensorlocation" className="block text-gray-700">City:</label>
          <input type="text" value={city} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden shadow-md" disabled/>
        </div>
      </div>
    
      <div className='flex'>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="sensorlocation" className="block text-gray-700">Division:</label>
          <input type="text" value={division} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden shadow-md" disabled/>
        </div>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="sensorlocation" className="block text-gray-700">Coordinates:</label>
          <input type="text" value={coordinates} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden shadow-md" disabled/>
        </div>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="sensorlocation" className="block text-gray-700">Bridge Location:</label>
          <input type="text" value={bridgeLocation} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden shadow-md" disabled/>
        </div>
      </div>

      <div className='flex'>
      <div className="mb-4 px-2 w-full">
          <label htmlFor="sensorlocation" className="block text-gray-700">Bridge Name:</label>
          <input type="text" value={bridgeName} className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden shadow-md" disabled/>
        </div>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="nobridgespan" className="block text-gray-700">Span Number:</label>
          <select id="nobridgespan" name="nobridgespan" value={spannos} onChange={(e) => setspanno(e.target.value)} className="border border-gray-300 p-1 w-full pl-3 mr-2 overflow-hidden shadow-md outline-0 rounded-lg" >
            <option value="" disabled>Select Span Number</option>
            {/* Map through the fetched spans and display them as options */}
            {Array.from({ length: spannos }, (_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="girderno" className="block text-gray-700">Girder Number:</label>
          <select id="girderno" name="girderno" value={girderno} onChange={(e) => setgirderno(e.target.value)} className="border border-gray-300 p-1 w-full pl-3 mr-2 overflow-hidden shadow-md outline-0 rounded-lg" >
          <option value="" disabled>Select Girder Number</option>
            {/* Map through the fetched girders and display them as options */}
            {Array.from({ length: girderCount }, (_, index) => (
            <option key={index + 1} value={index + 1}>{`Girder ${index + 1}`}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className='flex'>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="admins" className="block text-gray-700">Bridge Admin(s):</label>
          <select id="adminName" className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden outline-0 shadow-md" readOnly>
            <option value={adminName}>{adminName}</option>
            {adminName2 ? <option value={adminName2}>{adminName2}</option> : <option value="">Admin 2</option>}
            {adminName3 ? <option value={adminName3}>{adminName3}</option> : <option value="">Admin 3</option>}
          </select>
        </div>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="managers" className="block text-gray-700">Bridge Manager(s):</label>
          <select id="adminName" className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden outline-0 shadow-md" readOnly>
            <option value={managerName}>{managerName}</option>
            {managerName2 ? <option value={managerName2}>{managerName2}</option>: <option value="">Manager 2</option>}
            {managerName3 ? <option value={managerName3}>{managerName3}</option>: <option value="">Manager 3</option>}
            {managerName4 ? <option value={managerName4}>{managerName4}</option>: <option value="">Manager 4</option>}
            {managerName5 ? <option value={managerName5}>{managerName5}</option>: <option value="">Manager 5</option>}
            {managerName6 ? <option value={managerName6}>{managerName6}</option>: <option value="">Manager 6</option>}
          </select>
        </div>
        <div className="mb-4 px-2 w-full">
          <label htmlFor="owners" className="block text-gray-700">Bridge Owner(s):</label>
          <select id="adminName" className="border border-gray-300 p-1 w-full pl-3 mr-2 rounded-lg bg-white overflow-hidden outline-0 shadow-md" readOnly>
            <option value={ownerName}>{ownerName}</option>:
            {ownerName2 ? <option value={ownerName2}>{ownerName2}</option>: <option value="">Owner 2</option>}
            {ownerName3 ? <option value={ownerName3}>{ownerName3}</option>: <option value="">Owner 3</option>}
          </select>
        </div>
      </div>
      </div>
  </div>
  </div>
  <br /><br />
  </>
  )
}

export default SensorForm;