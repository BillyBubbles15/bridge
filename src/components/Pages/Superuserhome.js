import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import SensorData from '../Assets/Data.csv';
import './tailwind.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
} from 'chart.js';

import { FaBridge } from "react-icons/fa6";
import { FaArrowCircleRight, FaEdit } from "react-icons/fa";
import {MdHome, MdSettings, MdPerson, MdSearch, MdNotifications, MdDashboard, MdSensors, MdDescription, MdLogout, MdEdit } from 'react-icons/md'

import logo2 from '../Assets/logo2.png';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
)



const Superuserhome = () => {

    const [chartData, setChartData] = useState({});
    const [chartData1, setChartData1] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [chartData3, setChartData3] = useState({});
    const [chartData4, setChartData4] = useState({});
    const [chartData5, setChartData5] = useState({});
    const [chartData6, setChartData6] = useState({});
    const [chartData7, setChartData7] = useState({});


    const [averageLoggerTemp, setAverageLoggerTemp] = useState(null);
    const [averageBatteryVoltage, setAverageBatteryVoltage] = useState(null);
    //Sensor1
    const [averageSensor1Temp, setAverageSensor1Temp] = useState(null);
    const [averageSensor1Freq, setAverageSensor1Freq] = useState(null);
    const [averageSensor1Eng, setAverageSensor1Eng] = useState(null);
    //Sensor2
    const [averageSensor2Temp, setAverageSensor2Temp] = useState(null);
    const [averageSensor2Freq, setAverageSensor2Freq] = useState(null);
    const [averageSensor2Eng, setAverageSensor2Eng] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(SensorData); // Change path to your CSV file
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        const parsedData = Papa.parse(csv, { header: true });
        
        
        //General Dashboard
        const labels = parsedData.data.slice(0, 180).map(row => row.DateTime);

        const BatteryVoltage = parsedData.data.slice(0, 180).map(row => row.BatteryVoltage);
        const LoggerTemp = parsedData.data.slice(0, 180).map(row => row.LoggerTemp);
        
        // Sensor 1
        const Sensor1Temp = parsedData.data.slice(0, 180).map(row => row.S01TEMP);
        const Sensor1Freq = parsedData.data.slice(0, 180).map(row => row.S01hz);
        const Sensor1Eng = parsedData.data.slice(0, 180).map(row => row.S01Eng);
        
        // Sensor 2
        const Sensor2Temp = parsedData.data.slice(0, 180).map(row => row.S02TEMP);
        const Sensor2Freq = parsedData.data.slice(0, 180).map(row => row.S02Hz);
        const Sensor2Eng = parsedData.data.slice(0, 180).map(row => row.S02Eng);
        


        //INDIVIDUAL NUMERICAL VALUES (General Dashboard)
        const sum = BatteryVoltage.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        const average = sum / BatteryVoltage.length;
        setAverageBatteryVoltage(average.toFixed(2));

        const sum1 = LoggerTemp.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        const average1 = sum1 / LoggerTemp.length.toFixed(2);
        setAverageLoggerTemp(average1.toFixed(2));
    

        //INDIVIDUAL NUMERICAL VALUES (Sensors Dashboard)

        //Sensor 1
        const sum2 = Sensor1Temp.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        const average2 = sum2 / Sensor1Temp.length;
        setAverageSensor1Temp(average2.toFixed(2));

        const sum3 = Sensor1Freq.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        const average3 = sum3 / Sensor1Freq.length.toFixed(2);
        setAverageSensor1Freq(average3.toFixed(2));

        const sum4 = Sensor1Eng.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        const average4 = sum4 / Sensor1Eng.length.toFixed(2);
        setAverageSensor1Eng(average4.toFixed(2));

        //Sensor 2
        const sum5 = Sensor2Temp.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        const average5 = sum5 / Sensor2Temp.length;
        setAverageSensor2Temp(average5.toFixed(2));

        const sum6 = Sensor2Freq.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        const average6 = sum6 / Sensor2Freq.length.toFixed(2);
        setAverageSensor2Freq(average6.toFixed(2));

        const sum7 = Sensor2Eng.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue), 0);
        const average7 = sum7 / Sensor2Eng.length.toFixed(2);
        setAverageSensor2Eng(average7.toFixed(2));


        //Animation
        let count = 0;
        let count1 = 0;
        let count2 = 0;
        let count3 = 0;
        let count4 = 0;
        const animationInterval = setInterval(() => {
            if (count < average || count1 < average1 || count2 < average2 || count3 < average3 || count4 < average4) {
                setAverageBatteryVoltage(count.toFixed(2));
                setAverageLoggerTemp(count1.toFixed(2));
                setAverageSensor1Temp(count2.toFixed(2));
                setAverageSensor1Freq(count3.toFixed(2));
                setAverageSensor1Eng(count4.toFixed(2));
                count += average / 150; // Animation speed
                count1 += average1 / 150;
                count2 += average2 / 150;
                count3 += average3 / 150;
                count4 += average4 / 150;
            } else {
                setAverageBatteryVoltage(average.toFixed(2));
                setAverageLoggerTemp(average1.toFixed(2));
                setAverageSensor1Temp(average2.toFixed(2));
                setAverageSensor1Freq(average3.toFixed(2));
                setAverageSensor1Eng(average4.toFixed(2));
                clearInterval(animationInterval);
            }
        }, 20);
  
        

        setChartData({
          labels: labels,
          datasets: [
            {
                label: 'Date/Time vs Battery Voltage',
                data: BatteryVoltage,
                borderColor: 'blue',
                borderWidth: 1,
                pointBorderColor: 'black',
                pointRadius: 1,
                pointHoverRadius: 1,
                tension: 0,
            }
          ]
        });
        setChartData1({
            labels: labels,
            datasets: [
                {
                    label: 'Date/Time vs Logger Temperature',
                    data: LoggerTemp,
                    borderColor: 'red',
                    borderWidth: 1,
                    pointBorderColor: 'black',
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    tension: 0 
                }
            ]
        });

        //SENSOR DATA
        setChartData2({
            labels: labels,
            datasets: [
                {
                    label: 'Date/Time vs Sensor 1 Temperature',
                    data: Sensor1Temp,
                    borderColor: 'blue',
                    borderWidth: 1,
                    pointBorderColor: 'black',
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    tension: 0 
                }
            ]
        });
        setChartData3({
            labels: labels,
            datasets: [
                {
                    label: 'Date/Time vs Sensor 1 Frequency (in Hz)',
                    data: Sensor1Freq,
                    borderColor: 'red',
                    borderWidth: 1,
                    pointBorderColor: 'black',
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    tension: 0 
                }
            ]
        });
        setChartData4({
            labels: labels,
            datasets: [
                {
                    label: 'Date/Time vs Sensor 1 Eng',
                    data: Sensor1Eng,
                    borderColor: 'green',
                    borderWidth: 1,
                    pointBorderColor: 'black',
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    tension: 0 
                }
            ]
        });
        setChartData5({
            labels: labels,
            datasets: [
                {
                    label: 'Date/Time vs Sensor 2 Temp)',
                    data: Sensor2Temp,
                    borderColor: 'blue',
                    borderWidth: 1,
                    pointBorderColor: 'black',
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    tension: 0 
                }
            ]
        });
        setChartData6({
            labels: labels,
            datasets: [
                {
                    label: 'Date/Time vs Sensor 2 Frequency (in Hz)',
                    data: Sensor2Freq,
                    borderColor: 'red',
                    borderWidth: 1,
                    pointBorderColor: 'black',
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    tension: 0 
                }
            ]
        });
        setChartData7({
            labels: labels,
            datasets: [
                {
                    label: 'Date/Time vs Sensor 2 Eng',
                    data: Sensor2Eng,
                    borderColor: 'green',
                    borderWidth: 1,
                    pointBorderColor: 'black',
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    tension: 0 
                }
            ]
        });
      };
  
      fetchData();
    }, []);


    const navigate = useNavigate();
    const [isSelected, setIsSelected] = useState(true);
    const [isSelected1, setIsSelected1] = useState(false);
    const [isSelected4, setIsSelected4] = useState(false);


    const [showUserDetails, setshowUserDetails] = useState(false);
    const [showDashboard, setshowDashboard] = useState(true);
    const [showSensorDashboard, setshowSensorDashboard] = useState(false);
    const [showModify, setshowModify] = useState(false);

//MODIFY SECTION
const [id,setId]=useState('');
const bridgeName = localStorage.getItem('bridgeName');
  
    const countries = ['India', 'USA', 'Australia']; 
    const statesByCountry = {
      India: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
      USA: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
      Australia: ['Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia'],
    }; 


    console.log(bridgeName);
    useEffect(() => {
        const findBridgeID = async () => {
        
                try {
                    const response = await axios.get(`http://localhost:9090/bridge/bridgeid?bridgeName=${bridgeName}`)
                    if (response.status === 200) {
                        console.log(response.data)
                        setId(response.data)
                    } else {
                        console.error('Failed to fetch data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            
        };
    
        findBridgeID();
    }, [bridgeName]);

    
      const [userData, setUserData] = useState({
        country: '',
        state: '',
        coordinates: '',
        division: '',
        location: '',
        bridgeName: '',

        adminEmail: '',
        adminName: '',
        adminPhone: '',
        managerEmail: '',
        managerName: '',
        managerPhone: '',
        ownerEmail: '',
        ownerName: '',
        ownerPhone: '',

        adminEmail2: '',
        adminName2: '',
        adminPhone2: '',
        managerEmail2: '',
        managerName2: '',
        managerPhone2: '',
        ownerEmail2: '',
        ownerName2: '',
        ownerPhone2: '',

        adminEmail3: '',
        adminName3: '',
        adminPhone3: '',
        managerEmail3: '',
        managerName3: '',
        managerPhone3: '',
        ownerEmail3: '',
        ownerName3: '',
        ownerPhone3: '',

        managerEmail4: '',
        managerName4: '',
        managerPhone4: '',

        managerEmail5: '',
        managerName5: '',
        managerPhone5: '',
        
        managerEmail6: '',
        managerName6: '',
        managerPhone6: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    return;
                }
              const response = await axios.get(`http://localhost:9090/bridge/getbridge/${id}`);
              if (response.status === 200) {
                console.log(response.data);
                const { country, state, coordinates, division, location, bridgeName, 
                    adminName, adminEmail, adminPhone, adminName2, adminEmail2, adminPhone2, 
                    adminName3, adminEmail3, adminPhone3, managerName, managerEmail, managerPhone,
                    managerName2, managerEmail2, managerPhone2, managerName3, managerEmail3, managerPhone3,
                    managerName4, managerEmail4, managerPhone4, managerName5, managerEmail5, managerPhone5,
                    managerName6, managerEmail6, managerPhone6, ownerName, ownerEmail, ownerPhone, ownerName2, 
                    ownerEmail2, ownerPhone2, ownerName3, ownerEmail3, ownerPhone3 } = response.data;
                setUserData({country, state, coordinates, division, location, bridgeName, 
                    adminName, adminEmail, adminPhone, adminName2, adminEmail2, adminPhone2, 
                    adminName3, adminEmail3, adminPhone3, managerName, managerEmail, managerPhone,
                    managerName2, managerEmail2, managerPhone2, managerName3, managerEmail3, managerPhone3,
                    managerName4, managerEmail4, managerPhone4, managerName5, managerEmail5, managerPhone5,
                    managerName6, managerEmail6, managerPhone6, ownerName, ownerEmail, ownerPhone, ownerName2, 
                    ownerEmail2, ownerPhone2, ownerName3, ownerEmail3, ownerPhone3});
              } else {
                console.error('Failed to fetch data:', response.statusText);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };

        fetchData();
      }, [id]);

      const updateData = async (dataToUpdate) => {
        if(userData.adminName === userData.adminEmail === userData.adminPhone === ''){
            alert('Please Add Atleast One Admin!')
        }
        else if(userData.managerName === userData.managerEmail === userData.managerPhone === ''){
            alert('Please Add Atleast One Manager!');
        }
        else if(userData.ownerName === userData.ownerEmail === userData.ownerPhone === ''){
            alert('Please Add Atleast One Owner!');
        }
        else{
        try {
            const dataToUpdate = {
                country: userData.country,
                state: userData.state,
                coordinates: userData.coordinates,
                division: userData.division,
                location: userData.location,
                bridgeName: userData.bridgeName,

                adminEmail: userData.adminEmail,
                adminName: userData.adminName,
                adminPhone: userData.adminPhone,
                managerEmail: userData.managerEmail,
                managerName: userData.managerName,
                managerPhone: userData.managerPhone,
                ownerEmail: userData.ownerEmail,
                ownerName: userData.ownerName,
                ownerPhone: userData.ownerPhone,

                adminEmail2: userData.adminEmail2,
                adminName2: userData.adminName2,
                adminPhone2: userData.adminPhone2,
                managerEmail2: userData.managerEmail2,
                managerName2: userData.managerName2,
                managerPhone2: userData.managerPhone2,
                ownerEmail2: userData.ownerEmail2,
                ownerName2: userData.ownerName2,
                ownerPhone2: userData.ownerPhone2,

                adminEmail3: userData.adminEmail3,
                adminName3: userData.adminName3,
                adminPhone3: userData.adminPhone3,
                managerEmail3: userData.managerEmail3,
                managerName3: userData.managerName3,
                managerPhone3: userData.managerPhone3,
                ownerEmail3: userData.ownerEmail3,
                ownerName3: userData.ownerName3,
                ownerPhone3: userData.ownerPhone3,

                managerEmail4: userData.managerEmail4,
                managerName4: userData.managerName4,
                managerPhone4: userData.managerPhone4,

                managerEmail5: userData.managerEmail5,
                managerName5: userData.managerName5,
                managerPhone5: userData.managerPhone5,
                
                managerEmail6: userData.managerEmail6,
                managerName6: userData.managerName6,
                managerPhone6: userData.managerPhone6,
            };
            const response = await axios.put('http://localhost:9090/bridge/updatebridge/1', dataToUpdate);
            console.log('Data updated successfully:', response.data);
            return response.data; // Optionally return any data received from the server
            } catch (error) {
            console.error('Error updating data:', error);
            throw error; // Optionally rethrow the error to handle it in the calling code
        }
    }
      };


    const UserDetails = () => {
        setshowUserDetails(!showUserDetails);
    };

    const Dashboard = () => {
        setIsSelected(!isSelected);
        setIsSelected1(false);
        setIsSelected4(false);
        setshowDashboard(!showDashboard);
        setshowSensorDashboard(false);
        setshowModify(false);
    };

    const SensorDashboard = () => {
        setIsSelected1(!isSelected1);
        setIsSelected(false);
        setIsSelected4(false);
        setshowSensorDashboard(!showSensorDashboard);
        setshowDashboard(false);
        setshowModify(false);    };

    const RedirectHome = () => {
        navigate('../home')
    };


    const Modify = () => {
        setshowSensorDashboard(false);
        setshowDashboard(false);
        setIsSelected1(false);
        setIsSelected(false);
        setshowModify(!showModify);
        setIsSelected4(!isSelected4);
    };




  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />

      <div className="flex fixed z-10 w-full justify-center bg-gray-100 py-2 shadow-xl">
        <div className='w-full'>   
           <img className='h-10 pt-2 cursor-pointer px-5'  src={logo2} alt=""/>
        </div>
        <div className='w-full text-center pt-1'>
            <h1 className='text-2xl font-semibold'>Structural Health Monitoring Dashboard</h1>
        </div>
        <div className='w-full text-right'>
            <button className='px-2'><MdSearch size={36} /></button>
            <button className='px-2'><MdNotifications size={36} /></button>
            <button onClick={UserDetails} className='px-2'><MdPerson onClick={UserDetails} size={36} /></button>
        </div>
      </div>

      <nav className='w-24 bg-gray-300 fixed mt-14'>
        <div className='text-center'>
            <button className='w-full py-3 hover:bg-gray-400' onClick={RedirectHome}><ul><MdHome style={{width: '100%', alignItems: 'center'}} size={40} />Home</ul></button>
            <hr /><hr />
            <button className={`w-full py-3 ${isSelected ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={Dashboard}><ul><MdDashboard style={{width: '100%', alignItems: 'center'}} size={40} />Dashboard</ul></button>
            <hr /><hr />
            <button className={`w-full py-3 ${isSelected1 ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={SensorDashboard}><ul><MdSensors style={{width: '100%', alignItems: 'center'}} size={40} />Sensors</ul></button>
            <hr /><hr />
            <button className='w-full py-3 hover:bg-gray-400'><ul><FaBridge style={{width: '100%', alignItems: 'center'}} size={40} />Bridge</ul></button>
            <hr /><hr />
            <button className='w-full py-3 hover:bg-gray-400'><ul><MdDescription style={{width: '100%', alignItems: 'center'}} size={40} />Report</ul></button>
            <hr /><hr />
            <button className={`w-full py-3 ${isSelected4 ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={Modify}><ul><FaEdit style={{width: '100%', alignItems: 'center'}} size={40} />Modify</ul></button>
            <hr /><hr />
            <button className='w-full py-3 hover:bg-gray-400'><ul><MdSettings style={{width: '100%', alignItems: 'center'}} size={40}/>Settings</ul></button>
        </div>  
      </nav>



      {showUserDetails && (
        <div className="w-1/12 absolute top-14 right-2 bg-white border shadow-md">
          <div className='p-2 text-center'>Name</div>
          <div className='flex cursor-pointer hover:bg-gray-200 p-2'><MdEdit size={24} style={{paddingTop: '3px'}}/>Edit Info</div>
          <div className='flex cursor-pointer hover:bg-gray-200 p-2'><MdLogout size={24} style={{paddingTop: '3px'}}/>Log-out</div>
        </div>
      )}




      {showDashboard && (
        <>
        <div className='w-11/12 ml-24 p-6 flex pt-24 bg-white'>
            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <h1 className='text-center font-bold'>Battery Voltage Monitoring</h1><br />
                {chartData.labels && chartData.datasets && chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
                    <Line data={chartData}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>

            <div className="bg-gray-100 w-1/2 shadow-xl">
            <h1 className='text-center font-bold'>Logger Temperature Monitoring</h1><br />
            {chartData1.labels && chartData1.datasets && chartData1.labels.length > 0 && chartData1.datasets.length > 0 ? (
                    <Line data={chartData1} />
                    ) : (
                    <h1>Loading...</h1>
        )}
            </div>


            </div>
            <div className='w-11/12 ml-24 p-6 flex'>

              <div className="bg-gray-100 w-1/6 mx-6 shadow-2xl rounded-xl"><br />
                <h2 className="text-lg font-semibold text-center text-gray-600">Avg Battery Voltage</h2><br />
                <h1 className='text-center font-bold text-6xl text-gray-800'>{averageBatteryVoltage} </h1><br />
              </div>

              <div className="bg-gray-100 w-1/6 mx-6 shadow-2xl rounded-xl"><br />
                <h2 className="text-lg font-semibold text-center text-gray-600">Avg Logger Temp</h2><br />
                <h1 className='text-center font-bold text-6xl text-gray-800'>{averageLoggerTemp}</h1><br />
              </div>

              <div className="bg-pink-600 w-2/3 shadow-2xl mx-6 rounded-xl text-white p-3 pl-6">
              <h1 className='text-2xl'>General Dashboard</h1> <hr /><br />
              <p className='text-sm'>The dashboard displays real-time data on battery voltage and logger temperature, allowing 
                users to monitor system health and performance. With intuitive visualizations, 
                it provides insights into power supply stability and environmental conditions, facilitating 
                informed decision-making and proactive maintenance.</p>

              </div>
            </div>
            </>
      )}



      {showSensorDashboard && (
        <>
        <h1 className='w-11/12 ml-24 text-center p-6 pt-24 text-pink-600 text-4xl font-semibold'>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash; Sensor 1 Dashboard &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</h1>
        <div className='w-11/12 ml-24 p-6 pt-6 flex'>
            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <br />
                <h1 className='text-center font-bold'>Sensor 1 Temperature Monitoring</h1><br />
                {chartData2.labels && chartData2.datasets && chartData2.labels.length > 0 && chartData2.datasets.length > 0 ? (
                    <Line data={chartData2}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>

            <div className="bg-gray-100 w-1/2 shadow-xl">
                <br />
                <h1 className='text-center font-bold'>Sensor 1 Frequency Monitoring</h1><br />
                {chartData3.labels && chartData3.datasets && chartData3.labels.length > 0 && chartData3.datasets.length > 0 ? (
                    <Line data={chartData3} />
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            </div>
        <div className='w-11/12 ml-24 p-6 flex pt-14'>

            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <br />
                <h1 className='text-center font-bold'>Sensor 1 Eng Monitoring</h1><br />
                {chartData4.labels && chartData4.datasets && chartData4.labels.length > 0 && chartData4.datasets.length > 0 ? (
                    <Line data={chartData4}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>

            <div className='grid w-1/4'>
                <div className="bg-gray-100 w-4/5 mx-6 mb-6 shadow-2xl rounded-xl"><br />
                    <h2 className="text-lg font-semibold text-center text-gray-600">Sensor 1 avg Temperature</h2><br />
                    <h1 className='text-center font-bold text-6xl text-gray-800'>{averageSensor1Temp} </h1><br />
                  </div>

                  <div className="bg-gray-100 w-4/5 mx-6 shadow-2xl rounded-xl"><br />
                    <h2 className="text-lg font-semibold text-center text-gray-600">Sensor 1 avg Eng</h2><br />
                    <h1 className='text-center font-bold text-6xl text-gray-800'>{averageSensor1Eng} </h1><br />
                  </div>

            </div>
            <div className='grid w-1/4'>
            <div className="bg-gray-100 w-4/5 mx-6 shadow-2xl mb-6 rounded-xl"><br />
                    <h2 className="text-lg font-semibold text-center text-gray-600">Sensor 1 avg Frequency</h2><br />
                    <h1 className='text-center font-bold text-6xl text-gray-800'>{averageSensor1Freq}</h1><br />
                  </div>

                  <div className="bg-pink-600 mx-6 w-4/5 text-white shadow-2xl cursor-pointer rounded-xl hover:bg-pink-800"><br />
                    <h2 className="text-lg font-semibold text-center">Avg Logger Temp</h2><br />
                    <FaArrowCircleRight className='' style={{width: '100%', alignItems: 'center'}} size={40} />
                  </div>
            </div>
        </div>
        <br />
        <hr />
        
        {/* Sensor 2 */}
        <h1 className='w-11/12 ml-24 text-center p-6 pt-24 text-pink-600 text-4xl font-semibold'>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash; Sensor 2 Dashboard &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</h1>
        <div className='w-11/12 ml-24 p-6 pt-6 flex'>
            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <br />
                <h1 className='text-center font-bold'>Sensor 2 Temperature Monitoring</h1><br />
                {chartData5.labels && chartData5.datasets && chartData5.labels.length > 0 && chartData5.datasets.length > 0 ? (
                    <Line data={chartData5}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>

            <div className="bg-gray-100 w-1/2 shadow-xl">
                <br />
                <h1 className='text-center font-bold'>Sensor 2 Frequency Monitoring</h1><br />
                {chartData6.labels && chartData6.datasets && chartData6.labels.length > 0 && chartData6.datasets.length > 0 ? (
                            <Line data={chartData6}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            </div>
        <div className='w-11/12 ml-24 p-6 flex pt-14'>

            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <br />
                <h1 className='text-center font-bold'>Sensor 2 Eng Monitoring</h1><br />
                {chartData7.labels && chartData7.datasets && chartData7.labels.length > 0 && chartData7.datasets.length > 0 ? (
                            <Line data={chartData7}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>

            <div className='grid w-1/4'>
                <div className="bg-gray-100 w-4/5 mx-6 mb-6 shadow-2xl rounded-xl"><br />
                    <h2 className="text-lg font-semibold text-center text-gray-600">Sensor 2 avg Temperature</h2><br />
                    <h1 className='text-center font-bold text-6xl text-gray-800'>{averageSensor2Temp} </h1><br />
                  </div>

                  <div className="bg-gray-100 w-4/5 mx-6 shadow-2xl rounded-xl"><br />
                    <h2 className="text-lg font-semibold text-center text-gray-600">Sensor 2 avg Eng</h2><br />
                    <h1 className='text-center font-bold text-6xl text-gray-800'>{averageSensor2Eng} </h1><br />
                  </div>

            </div>
            <div className='grid w-1/4'>

                <div className="bg-gray-100 w-4/5 mx-6 shadow-2xl mb-6 rounded-xl"><br />
                    <h2 className="text-lg font-semibold text-center text-gray-600">Sensor 2 avg Frequency</h2><br />
                    <h1 className='text-center font-bold text-6xl text-gray-800'>{averageSensor2Freq}</h1><br />
                  </div>

                  <div className="bg-pink-600 mx-6 w-4/5 text-white shadow-2xl cursor-pointer rounded-xl hover:bg-pink-800"><br />
                    <h2 className="text-lg font-semibold text-center">Avg Logger Temp</h2><br />
                    <FaArrowCircleRight className='' style={{width: '100%', alignItems: 'center'}} size={40} />
                  </div>
            </div>
        </div>

        </>
      )}
      

{showModify && (
        <>
        <div className='w-11/12 ml-24 p-6 pt-24 bg-white'>
        <h1 className='text-center text-4xl font-semibold pb-12'>Bridge Details</h1>
        <form>
        <h1 className='text-center text-3xl w-1/2 font-semibold pb-12'>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash; Bridge Details &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</h1>
          <div className="flex w-1/2">
            <div className='w-1/2 mx-5'>
              <div className="mb-6">
            <label htmlFor="country" className="block text-gray-700">Country:</label>
            <select id="country" name="country" value={userData.country} onChange={(e) => setUserData(prevData => ({...prevData, country: e.target.value}))} className="border border-gray-300 p-2 w-full rounded" >
                <option value="country" disabled>Select Country</option>
                {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="state" className="block text-gray-700">
              State:
            </label>
            <select id="state" name="state" value={userData.state} onChange={(e) => setUserData(prevData => ({...prevData, state: e.target.value}))} className="border border-gray-300 p-2 w-full rounded">
                <option value="state" disabled>Select State</option>
                {statesByCountry[userData.country]?.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="coordinates" className="block text-gray-700">
              Bridge Coordinates:
            </label>
            <input
              type="text" id="coordinates" placeholder='Enter Coordinates' name="coordinates" value={userData.coordinates} onChange={(e) => setUserData(prevData => ({...prevData, coordinates: e.target.value}))} className="border border-gray-300 p-2 w-full rounded"/>
          </div>
            </div>
            <div className='w-1/2 mx-5'>
            <div className="mb-6">
            <label htmlFor="division" className="block text-gray-700">
              Division:
            </label>
            <input type="text" id="division" placeholder='Enter Division' name="division" value={userData.division} onChange={(e) => setUserData(prevData => ({...prevData, division: e.target.value}))} className="border border-gray-300 p-2 w-full rounded" />
          </div>
          <div className="mb-6">
            <label htmlFor='bridgeName' className="block text-gray-700">
              Bridge Location:
            </label>
            <input type="text" id="location" placeholder='Enter Location' name="location" value={userData.location} onChange={(e) => setUserData(prevData => ({...prevData, location: e.target.value}))} className="border border-gray-300 p-2 w-full rounded" />
          </div>
          <div className="mb-6">
            <label htmlFor='bridgeName' className="block text-gray-700">
              Bridge Name:
            </label>
            <input type="text" id="name" placeholder='Enter Name' name="name" value={userData.bridgeName} onChange={(e) => setUserData(prevData => ({...prevData, bridgeName: e.target.value}))} className="border border-gray-300 p-2 w-full rounded" />
          </div>
        </div>
        </div>
        </form>
        <div className='mid relative z-0 ml-6 text-left left-1/2 w-1/2'>
        <h1 className='text-center text-3xl font-semibold pb-12'>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash; User Details &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</h1>
        <div>
            <h3 className=''>Added Admin(s):</h3>
            <input id='adminName' value={userData.adminName} onChange={(e) => setUserData(prevData => ({...prevData, adminName: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Admin 1)'/>
            <input id='adminEmail' value={userData.adminEmail} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='adminPhone' value={userData.adminPhone} onChange={(e) => setUserData(prevData => ({...prevData, adminPhone: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>
       
        <form action="submit">
        <div className='mt-5'>
            <input id='adminName2' value={userData.adminName2} onChange={(e) => setUserData(prevData => ({...prevData, adminName2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Admin 2)'/>
            <input id='adminEmail2' value={userData.adminEmail2} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='adminPhone2' value={userData.adminPhone2} onChange={(e) => setUserData(prevData => ({...prevData, adminPhone2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>

        <div className='mt-5'>
            <input id='adminName3' value={userData.adminName3} onChange={(e) => setUserData(prevData => ({...prevData, adminName3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Admin 3)'/>
            <input id='adminEmail3' value={userData.adminEmail3} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='adminPhone3' value={userData.adminPhone3} onChange={(e) => setUserData(prevData => ({...prevData, adminPhone3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>
        </form>

        <br /><br /><br />

        <div>
            <h3>Added Manager(s):</h3>
            <input id='managerName' value={userData.managerName} onChange={(e) => setUserData(prevData => ({...prevData, managerName: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 1)'/>
            <input id='managerEmail' value={userData.managerEmail} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='managerPhone' value={userData.managerPhone} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>

        <form action="submit">
        <div className='mt-5'>
            <input id='managerName2' value={userData.managerName2} onChange={(e) => setUserData(prevData => ({...prevData, managerName2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 2)'/>
            <input id='managerEmail2' value={userData.managerEmail2} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='managerPhone2' value={userData.managerPhone2} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>


        <div className='mt-5'>
            <input id='managerName3' value={userData.managerName3} onChange={(e) => setUserData(prevData => ({...prevData, managerName3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 3)'/>
            <input id='managerEmail3' value={userData.managerEmail3} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='managerPhone3' value={userData.managerPhone3} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>

        <div className='mt-5'>
            <input id='managerName4' value={userData.managerName4} onChange={(e) => setUserData(prevData => ({...prevData, managerName4: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 4)'/>
            <input id='managerEmail4' value={userData.managerEmail4} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail4: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='managerPhone4' value={userData.managerPhone4} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone4: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>

        <div className='mt-5'>
            <input id='managerName5' value={userData.managerName5} onChange={(e) => setUserData(prevData => ({...prevData, managerName5: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 5)'/>
            <input id='managerEmail5' value={userData.managerEmail5} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail5: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='managerPhone5' value={userData.managerPhone5} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone5: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>

        <div className='mt-5'>
            <input id='managerName6' value={userData.managerName6} onChange={(e) => setUserData(prevData => ({...prevData, managerName6: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 6)'/>
            <input id='managerEmail6' value={userData.managerEmail6} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail6: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='managerPhone6' value={userData.managerPhone6} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone6: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>
        </form>

        <br /><br /><br />

        <div>
            <h3>Added Owner(s):</h3>
            <input id='ownerName' value={userData.ownerName} onChange={(e) => setUserData(prevData => ({...prevData, ownerName: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Owner 1)'/>
            <input id='ownerEmail' value={userData.ownerEmail} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='ownerPhone' value={userData.ownerPhone} onChange={(e) => setUserData(prevData => ({...prevData, ownerPhone: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>

        <form action="submit">
        <div className='mt-5'>
            <input id='ownerName2' value={userData.ownerName2} onChange={(e) => setUserData(prevData => ({...prevData, ownerName2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Owner 2)'/>
            <input id='ownerEmail2' value={userData.ownerEmail2} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='ownerPhone2' value={userData.ownerPhone2} onChange={(e) => setUserData(prevData => ({...prevData, ownerPhone2: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>

        <div className='mt-5'>
            <input id='ownerName3' value={userData.ownerName3} onChange={(e) => setUserData(prevData => ({...prevData, ownerName3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Name (Owner 3)'/>
            <input id='ownerEmail3' value={userData.ownerEmail3} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <input id='ownerPhone3' value={userData.ownerPhone3} onChange={(e) => setUserData(prevData => ({...prevData, ownerPhone3: e.target.value}))} className="border border-gray-300 p-2 mr-2 rounded" type="text" placeholder='Mobile Number'/>
        </div>
        </form>
      </div>
      <div className='text-center pt-6'>
        <button className='p-2 text-white px-4 rounded-sm bg-pink-600 hover:bg-pink-900' onClick={updateData}>Save</button>
      </div>
        </div>
        </> 
      )}

    </>
  )
};

export default Superuserhome;