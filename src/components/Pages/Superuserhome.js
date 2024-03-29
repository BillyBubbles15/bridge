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

import { FaBridge, FaTrash } from "react-icons/fa6";
import { FaArrowCircleRight, FaEdit } from "react-icons/fa";
import {MdHome, MdSettings, MdPerson, MdSearch, MdNotifications, MdDashboard, MdSensors, MdDescription, MdLogout, MdEdit } from 'react-icons/md'
import { PiWind } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { GiSpeedometer } from "react-icons/gi";

import logo2 from '../Assets/logo2.png';
import clear_icon from '../Assets/weather/clear.png';
import cloud_icon from '../Assets/weather/cloud.png';
import drizzle_icon from '../Assets/weather/drizzle.png';
import rain_icon from '../Assets/weather/rain.png';
import snow_icon from '../Assets/weather/snow.png';
import mist_icon from '../Assets/weather/fog.png';
import thunderstorm_icon from '../Assets/weather/thunderstorm.png';


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


    // console.log(bridgeName);
    useEffect(() => {
        const findBridgeID = async () => {
                try {
                    const response = await axios.get(`http://localhost:9090/bridge/bridgeid?bridgeName=${bridgeName}`)
                    if (response.status >= 200 && response.status < 300) {
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
        city:'',
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

        noofgirders: '',
        nobridgespan:'',

        admin1countryCode:'',
        admin2countryCode:'',
        admin3countryCode:'',

        manager1countryCode:'',
        manager2countryCode:'',
        manager3countryCode:'',
        manager4countryCode:'',
        manager5countryCode:'',
        manager6countryCode:'',

        owner1countryCode:'',
        owner2countryCode:'',
        owner3countryCode:'',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    return;
                }
              const response = await axios.get(`http://localhost:9090/bridge/getbridge/${id}`);
              if (response.status >= 200 && response.status < 300) {
                console.log(response.data);
                const { country, state, city, coordinates, division, location, bridgeName, 
                    adminName, adminEmail, adminPhone, adminName2, adminEmail2, adminPhone2, 
                    adminName3, adminEmail3, adminPhone3, managerName, managerEmail, managerPhone,
                    managerName2, managerEmail2, managerPhone2, managerName3, managerEmail3, managerPhone3,
                    managerName4, managerEmail4, managerPhone4, managerName5, managerEmail5, managerPhone5,
                    managerName6, managerEmail6, managerPhone6, ownerName, ownerEmail, ownerPhone, ownerName2, 
                    ownerEmail2, ownerPhone2, ownerName3, ownerEmail3, ownerPhone3, nobridgespan, noofgirders,
                    admin1countryCode,admin2countryCode,admin3countryCode,owner1countryCode,owner2countryCode,
                    owner3countryCode,manager1countryCode ,manager2countryCode ,manager3countryCode ,manager4countryCode,
                    manager5countryCode ,manager6countryCode} = response.data;

                setUserData({country, state, city, coordinates, division, location, bridgeName, 
                    adminName, adminEmail, adminPhone, adminName2, adminEmail2, adminPhone2, 
                    adminName3, adminEmail3, adminPhone3, managerName, managerEmail, managerPhone,
                    managerName2, managerEmail2, managerPhone2, managerName3, managerEmail3, managerPhone3,
                    managerName4, managerEmail4, managerPhone4, managerName5, managerEmail5, managerPhone5,
                    managerName6, managerEmail6, managerPhone6, ownerName, ownerEmail, ownerPhone, ownerName2, 
                    ownerEmail2, ownerPhone2, ownerName3, ownerEmail3, ownerPhone3, nobridgespan, noofgirders,
                    admin1countryCode,admin2countryCode,admin3countryCode,owner1countryCode,owner2countryCode,
                    owner3countryCode,manager1countryCode ,manager2countryCode ,manager3countryCode ,manager4countryCode,
                    manager5countryCode ,manager6countryCode});
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
        if(userData.country ===  userData.state === ''){
            alert('Please Select a Country & State')
        }
        else if(userData.adminName === userData.adminEmail === userData.adminPhone === ''){
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
                city: userData.city,
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

                admin1countryCode: userData.admin1countryCode,
                admin2countryCode: userData.admin2countryCode,
                admin3countryCode: userData.admin3countryCode,
    
                owner1countryCode: userData.owner1countryCode,
                owner2countryCode: userData.owner2countryCode,
                owner3countryCode: userData.owner3countryCode,
    
                manager1countryCode: userData.manager1countryCode,
                manager2countryCode: userData.manager2countryCode,
                manager3countryCode: userData.manager3countryCode,
                manager4countryCode: userData.manager4countryCode,
                manager5countryCode: userData.manager5countryCode,
                manager6countryCode: userData.manager6countryCode,
            };
            const response = await axios.put(`http://localhost:9090/bridge/updatebridge/${id}`, dataToUpdate);
            if(response.status >= 200 && response.status < 300){
                alert('Data Updated Successfully!')
                console.log('Data updated successfully:', response.data);
                return response.data;
            }
            } 
            catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    }
};



      //SensorData
      const [sensorDataList, setSensorDataList] = useState([]);

      const [sensorData, setsensorData] = useState({
        sensortype:'',
        spanno:'',
        girderno:'',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    return;
                }
              const response = await axios.get(`http://localhost:9090/bridge/getsensor/${id}`);
              if (response.status >= 200 && response.status < 300) {
                console.log(response.data);
                setSensorDataList(response.data);
                const { sensortype, spanno, girderno } = response.data;

                setsensorData({ sensortype, spanno, girderno});
              } else {
                console.error('Failed to fetch data:', response.statusText);
              }
            } catch (error) {
              console.error('Error:', error);
            }   
          };

        fetchData();
      }, [id]);


      const updateSensorData = async (SensordataToUpdate) => {
        try {
            const SensordataToUpdate = {
                sensortype: sensorData.sensortype,
                spanno: sensorData.spanno,
                girderno: sensorData.girderno,
            };
            const response = await axios.put(`http://localhost:9090/bridge/updatesensor/${id}`, SensordataToUpdate);
            if(response.status >= 200 && response.status < 300){
                alert('Data Updated Successfully!')
                console.log('Data updated successfully:', response.data);
                return response.data;
            }
            } 
            catch (error) {
            console.error('Error updating data:', error);
            throw error; // Optionally rethrow the error to handle it in the calling code
        }
      };

    const weatherapi = {
        key: "ce6e8efc9563bba968f6c6284d0253df",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const [Weather, setWeather] = useState('');

    useEffect(() => {
        // Fetch weather data for 'Pune' when component mounts
        fetch(`${weatherapi.base}weather?q=${userData.city}&units=metric&APPID=${weatherapi.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
                console.log(result);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, [weatherapi.base, weatherapi.key, userData.city]);

    const removeAdmin1 = (e) => {
        e.preventDefault();
        setUserData({
            adminName: '',
            adminEmail: '',
            admin1countryCode: '',
            adminPhone: ''
        });
    };
    const removeAdmin2 = (e) => {
        e.preventDefault();
        setUserData({
            adminName2: '',
            adminEmail2: '',
            admin2countryCode: '',
            adminPhone2: ''
        });
    };
    const removeAdmin3 = (e) => {
        e.preventDefault();
        setUserData({
            adminName3: '',
            adminEmail3: '',
            admin3countryCode: '',
            adminPhone3: ''
        });
    };


    const removeManager1 = (e) => {
        e.preventDefault();
        setUserData({
            managerName: '',
            managerEmail: '',
            manager1countryCode: '',
            managerPhone: ''
        });
    };
    const removeManager2 = (e) => {
        e.preventDefault();
        setUserData({
            managerName2: '',
            managerEmail2: '',
            manager2countryCode: '',
            managerPhone2: ''
        });
    };
    const removeManager3 = (e) => {
        e.preventDefault();
        setUserData({
            managerName3: '',
            managerEmail3: '',
            manager3countryCode: '',
            managerPhone3: ''
        });
    };
    const removeManager4 = (e) => {
        e.preventDefault();
        setUserData({
            managerName4: '',
            managerEmail4: '',
            manager4countryCode: '',
            managerPhone4: ''
        });
    };
    const removeManager5 = (e) => {
        e.preventDefault();
        setUserData({
            managerName5: '',
            managerEmail5: '',
            manager5countryCode: '',
            managerPhone5: ''
        });
    };
    const removeManager6 = (e) => {
        e.preventDefault();
        setUserData({
            managerName6: '',
            managerEmail6: '',
            manager6countryCode: '',
            managerPhone6: ''
        });
    };


    const removeOwner1 = (e) => {
        e.preventDefault();
        setUserData({
            ownerName: '',
            ownerEmail: '',
            owner1countryCode: '',
            ownerPhone: ''
        });
    };
    const removeOwner2 = (e) => {
        e.preventDefault();
        setUserData({
            ownerName2: '',
            ownerEmail2: '',
            owner2countryCode: '',
            ownerPhone2: ''
        });
    };
    const removeOwner3 = (e) => {
        e.preventDefault();
        setUserData({
            ownerName3: '',
            ownerEmail3: '',
            owner3countryCode: '',
            ownerPhone3: ''
        });
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
        setshowSensorDetails(false);
        setshowBridgeDetails(false);
        setshowUser(false);
    };

    const SensorDashboard = () => {
        setIsSelected1(!isSelected1);
        setIsSelected(false);
        setIsSelected4(false);
        setshowSensorDashboard(!showSensorDashboard);
        setshowDashboard(false);
        setshowModify(false);
        setshowBridgeDetails(false);
        setshowSensorDetails(false);
        setshowUser(false);    
    };

    const RedirectHome = () => {
        navigate('../home')
    };


    const Modify = () => {
        setshowSensorDashboard(false);
        setshowDashboard(false);
        setIsSelected1(false);
        setIsSelected(false);
        setshowSensorDetails(false);
        setshowUser(false);    
        setshowModify(!showModify);
        setIsSelected4(!isSelected4);
    };

    const [showBridgeDetails, setshowBridgeDetails] = useState(false);
    const [showSensorDetails, setshowSensorDetails] = useState(false);
    const [showUser, setshowUser] = useState(false);

    const showBridgeInfo = () => {
        setshowBridgeDetails(true);
        setshowSensorDetails(false);
        setshowUser(false);
    };

    const showSensorInfo = () => {
        setshowSensorDetails(true);
        setshowBridgeDetails(false);
        setshowUser(false);
    };

    const showUserInfo = () => {
        setshowUser(true);
        setshowSensorDetails(false);
        setshowBridgeDetails(false);
    }

    const options = [
        { value: 'code', label: 'Code', disabled: true },
        { value: '+93', label: '(+93) Afghanistan' },
        { value: '+355', label: '(+355) Albania' },
        { value: '+213', label: '(+213) Algeria' },
        { value: '+376', label: '(+376) Andorra' },
        { value: '+244', label: '(+244) Angola' },
        { value: '+1264', label: '(+1264) Anguilla' },
        { value: '+1268', label: '(+1268) Antigua and Barbuda' },
        { value: '+54', label: '(+54) Argentina' },
        { value: '+374', label: '(+374) Armenia' },
        { value: '+297', label: '(+297) Aruba' },
        { value: '+61', label: '(+61) Australia' },
        { value: '+43', label: '(+43) Austria' },
        { value: '+994', label: '(+994) Azerbaijan' },
        { value: '+1242', label: '(+1242) Bahamas' },
        { value: '+973', label: '(+973) Bahrain' },
        { value: '+880', label: '(+880) Bangladesh' },
        { value: '+1246', label: '(+1246) Barbados' },
        { value: '+375', label: '(+375) Belarus' },
        { value: '+32', label: '(+32) Belgium' },
        { value: '+501', label: '(+501) Belize' },
        { value: '+229', label: '(+229) Benin' },
        { value: '+1441', label: '(+1441) Bermuda' },
        { value: '+975', label: '(+975) Bhutan' },
        { value: '+591', label: '(+591) Bolivia' },
        { value: '+387', label: '(+387) Bosnia and Herzegovina' },
        { value: '+267', label: '(+267) Botswana' },
        { value: '+55', label: '(+55) Brazil' },
        { value: '+246', label: '(+246) British Indian Ocean Territory' },
        { value: '+673', label: '(+673) Brunei Darussalam' },
        { value: '+359', label: '(+359) Bulgaria' },
        { value: '+226', label: '(+226) Burkina Faso' },
        { value: '+257', label: '(+257) Burundi' },
        { value: '+855', label: '(+855) Cambodia' },
        { value: '+237', label: '(+237) Cameroon' },
        { value: '+1', label: '(+1) Canada' },
        { value: '+238', label: '(+238) Cape Verde' },
        { value: '+1345', label: '(+1345) Cayman Islands' },
        { value: '+236', label: '(+236) Central African Republic' },
        { value: '+235', label: '(+235) Chad' },
        { value: '+56', label: '(+56) Chile' },
        { value: '+86', label: '(+86) China' },
        { value: '+61', label: '(+61) Christmas Island' },
        { value: '+672', label: '(+672) Cocos (Keeling) Islands' },
        { value: '+57', label: '(+57) Colombia' },
        { value: '+269', label: '(+269) Comoros' },
        { value: '+242', label: '(+242) Congo' },
        { value: '+243', label: '(+243) Congo, the Democratic Republic of the' },
        { value: '+682', label: '(+682) Cook Islands' },
        { value: '+506', label: '(+506) Costa Rica' },
        { value: '+225', label: "(+225) Cote D'Ivoire" },
        { value: '+385', label: '(+385) Croatia' },
        { value: '+53', label: '(+53) Cuba' },
        { value: '+357', label: '(+357) Cyprus' },
        { value: '+420', label: '(+420) Czech Republic' },
        { value: '+45', label: '(+45) Denmark' },
        { value: '+253', label: '(+253) Djibouti' },
        { value: '+1767', label: '(+1767) Dominica' },
        { value: '+1809', label: '(+1809) Dominican Republic' },
        { value: '+593', label: '(+593) Ecuador' },
        { value: '+20', label: '(+20) Egypt' },
        { value: '+503', label: '(+503) El Salvador' },
        { value: '+240', label: '(+240) Equatorial Guinea' },
        { value: '+291', label: '(+291) Eritrea' },
        { value: '+372', label: '(+372) Estonia' },
        { value: '+251', label: '(+251) Ethiopia' },
        { value: '+500', label: '(+500) Falkland Islands (Malvinas)' },
        { value: '+298', label: '(+298) Faroe Islands' },
        { value: '+679', label: '(+679) Fiji' },
        { value: '+358', label: '(+358) Finland' },
        { value: '+33', label: '(+33) France' },
        { value: '+594', label: '(+594) French Guiana' },
        { value: '+689', label: '(+689) French Polynesia' },
        { value: '+241', label: '(+241) Gabon' },
        { value: '+220', label: '(+220) Gambia' },
        { value: '+995', label: '(+995) Georgia' },
        { value: '+49', label: '(+49) Germany' },
        { value: '+233', label: '(+233) Ghana' },
        { value: '+350', label: '(+350) Gibraltar' },
        { value: '+30', label: '(+30) Greece' },
        { value: '+299', label: '(+299) Greenland' },
        { value: '+1473', label: '(+1473) Grenada' },
        { value: '+590', label: '(+590) Guadeloupe' },
        { value: '+1671', label: '(+1671) Guam' },
        { value: '+502', label: '(+502) Guatemala' },
        { value: '+224', label: '(+224) Guinea' },
        { value: '+245', label: '(+245) Guinea-Bissau' },
        { value: '+592', label: '(+592) Guyana' },
        { value: '+509', label: '(+509) Haiti' },
        { value: '+504', label: '(+504) Honduras' },
        { value: '+852', label: '(+852) Hong Kong' },
        { value: '+36', label: '(+36) Hungary' },
        { value: '+354', label: '(+354) Iceland' },
        { value: '+91', label: '(+91) India' },
        { value: '+62', label: '(+62) Indonesia' },
        { value: '+98', label: '(+98) Iran, Islamic Republic of' },
        { value: '+964', label: '(+964) Iraq' },
        { value: '+353', label: '(+353) Ireland' },
        { value: '+972', label: '(+972) Israel' },
        { value: '+39', label: '(+39) Italy' },
        { value: '+1876', label: '(+1876) Jamaica' },
        { value: '+81', label: '(+81) Japan' },
        { value: '+962', label: '(+962) Jordan' },
        { value: '+7', label: '(+7) Kazakhstan' },
        { value: '+254', label: '(+254) Kenya' },
        { value: '+686', label: '(+686) Kiribati' },
        { value: '+850', label: "(+850) Korea, Democratic People's Republic of" },
        { value: '+82', label: '(+82) Korea, Republic of' },
        { value: '+965', label: '(+965) Kuwait' },
        { value: '+996', label: '(+996) Kyrgyzstan' },
        { value: '+856', label: "(+856) Lao People's Democratic Republic" },
        { value: '+371', label: '(+371) Latvia' },
        { value: '+961', label: '(+961) Lebanon' },
        { value: '+266', label: '(+266) Lesotho' },
        { value: '+231', label: '(+231) Liberia' },
        { value: '+218', label: '(+218) Libya' },
        { value: '+423', label: '(+423) Liechtenstein' },
        { value: '+370', label: '(+370) Lithuania' },
        { value: '+352', label: '(+352) Luxembourg' },
        { value: '+853', label: '(+853) Macao' },
        { value: '+389', label: '(+389) Macedonia, the Former Yugoslav Republic of' },
        { value: '+261', label: '(+261) Madagascar' },
        { value: '+265', label: '(+265) Malawi' },
        { value: '+60', label: '(+60) Malaysia' },
        { value: '+960', label: '(+960) Maldives' },
        { value: '+223', label: '(+223) Mali' },
        { value: '+356', label: '(+356) Malta' },
        { value: '+692', label: '(+692) Marshall Islands' },
        { value: '+596', label: '(+596) Martinique' },
        { value: '+222', label: '(+222) Mauritania' },
        { value: '+230', label: '(+230) Mauritius' },
        { value: '+52', label: '(+52) Mexico' },
        { value: '+691', label: '(+691) Micronesia, Federated States of' },
        { value: '+373', label: '(+373) Moldova, Republic of' },
        { value: '+377', label: '(+377) Monaco' },
        { value: '+976', label: '(+976) Mongolia' },
        { value: '+382', label: '(+382) Montenegro' },
        { value: '+1664', label: '(+1664) Montserrat' },
        { value: '+212', label: '(+212) Morocco' },
        { value: '+258', label: '(+258) Mozambique' },
        { value: '+95', label: '(+95) Myanmar' },
        { value: '+264', label: '(+264) Namibia' },
        { value: '+674', label: '(+674) Nauru' },
        { value: '+977', label: '(+977) Nepal' },
        { value: '+31', label: '(+31) Netherlands' },
        { value: '+599', label: '(+599) Netherlands Antilles' },
        { value: '+687', label: '(+687) New Caledonia' },
        { value: '+64', label: '(+64) New Zealand' },
        { value: '+505', label: '(+505) Nicaragua' },
        { value: '+227', label: '(+227) Niger' },
        { value: '+234', label: '(+234) Nigeria' },
        { value: '+683', label: '(+683) Niue' },
        { value: '+672', label: '(+672) Norfolk Island' },
        { value: '+47', label: '(+47) Norway' },
        { value: '+968', label: '(+968) Oman' },
        { value: '+92', label: '(+92) Pakistan' },
        { value: '+680', label: '(+680) Palau' },
        { value: '+507', label: '(+507) Panama' },
        { value: '+675', label: '(+675) Papua New Guinea' },
        { value: '+595', label: '(+595) Paraguay' },
        { value: '+51', label: '(+51) Peru' },
        { value: '+63', label: '(+63) Philippines' },
        { value: '+48', label: '(+48) Poland' },
        { value: '+351', label: '(+351) Portugal' },
        { value: '+974', label: '(+974) Qatar' },
        { value: '+40', label: '(+40) Romania' },
        { value: '+7', label: '(+7) Russian Federation' },
        { value: '+250', label: '(+250) Rwanda' },
        { value: '+1869', label: '(+1869) Saint Kitts and Nevis' },
        { value: '+1758', label: '(+1758) Saint Lucia' },
        { value: '+1784', label: '(+1784) Saint Vincent and the Grenadines' },
        { value: '+684', label: '(+684) Samoa' },
        { value: '+378', label: '(+378) San Marino' },
        { value: '+239', label: '(+239) Sao Tome and Principe' },
        { value: '+221', label: '(+221) Senegal' },
        { value: '+381', label: '(+381) Serbia' },
        { value: '+248', label: '(+248) Seychelles' },
        { value: '+232', label: '(+232) Sierra Leone' },
        { value: '+65', label: '(+65) Singapore' },
        { value: '+421', label: '(+421) Slovakia' },
        { value: '+386', label: '(+386) Slovenia' },
        { value: '+677', label: '(+677) Solomon Islands' },
        { value: '+252', label: '(+252) Somalia' },
        { value: '+27', label: '(+27) South Africa' },
        { value: '+34', label: '(+34) Spain' },
        { value: '+94', label: '(+94) Sri Lanka' },
        { value: '+249', label: '(+249) Sudan' },
        { value: '+597', label: '(+597) Suriname' },
        { value: '+268', label: '(+268) Swaziland' },
        { value: '+46', label: '(+46) Sweden' },
        { value: '+41', label: '(+41) Switzerland' },
        { value: '+963', label: '(+963) Syrian Arab Republic' },
        { value: '+886', label: '(+886) Taiwan, Province of China' },
        { value: '+992', label: '(+992) Tajikistan' },
        { value: '+255', label: '(+255) Tanzania, United Republic of' },
        { value: '+66', label: '(+66) Thailand' },
        { value: '+228', label: '(+228) Togo' },
        { value: '+690', label: '(+690) Tokelau' },
        { value: '+676', label: '(+676) Tonga' },
        { value: '+1868', label: '(+1868) Trinidad and Tobago' },
        { value: '+216', label: '(+216) Tunisia' },
        { value: '+90', label: '(+90) Turkey' },
        { value: '+993', label: '(+993) Turkmenistan' },
        { value: '+688', label: '(+688) Tuvalu' },
        { value: '+256', label: '(+256) Uganda' },
        { value: '+380', label: '(+380) Ukraine' },
        { value: '+971', label: '(+971) United Arab Emirates' },
        { value: '+44', label: '(+44) United Kingdom' },
        { value: '+1', label: '(+1) United States' },
        { value: '+598', label: '(+598) Uruguay' },
        { value: '+998', label: '(+998) Uzbekistan' },
        { value: '+678', label: '(+678) Vanuatu' },
        { value: '+58', label: '(+58) Venezuela' },
        { value: '+84', label: '(+84) Vietnam' },
        { value: '+1340', label: '(+1340) Virgin Islands, U.S.' },
        { value: '+967', label: '(+967) Yemen' },
        { value: '+260', label: '(+260) Zambia' },
        { value: '+263', label: '(+263) Zimbabwe' },
        { value: '+358', label: '(+358) Åland Islands' }
      ];

      const [searchTerm, setSearchTerm] = useState('');
  
      // Function to filter options based on search term
      const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

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
                localStorage.removeItem('authToken');
                navigate('/');
            } else {
                console.error('Failed to fetch data:', response.statusText);
                setSearchTerm('');
            }
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };


  return (
    <>
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




      {showDashboard && (
        <>
        <div className='w-11/12 ml-24 p-6 text-white pt-24 flex w-1/2 mx-8 shadow-xl'>
            <div className='bg-indigo-800 w-3/5 text-center py-6 mx-8 shadow-2xl rounded-xl'>
                { typeof Weather.main != "undefined" ? (
                <div className='flex justify-center pt-6'>

                    <div className='w-1/4'>
                        <div className='flex justify-start'>
                            {Weather.weather[0].main === "Clouds" && (
                                <img className='w-24' src={cloud_icon} alt="Cloud Icon" />
                            )}
                            {Weather.weather[0].main === "Smoke" && (
                                <img className='w-24' src={mist_icon} alt="Cloud Icon" />
                            )}
                            {Weather.weather[0].main === "Haze" && (
                                <img className='w-24' src={mist_icon} alt="Cloud Icon" />
                            )}
                            {Weather.weather[0].main === "Clear" && (
                                <img className='w-24' src={clear_icon} alt="Clear Icon" />
                            )}
                            {Weather.weather[0].main === "Rain" && (
                                <img className='w-24' src={rain_icon} alt="Clear Icon" />
                            )}
                            {Weather.weather[0].main === "Mist" && (
                                <img className='w-24' src={mist_icon} alt="Clear Icon" />
                            )}
                            {Weather.weather[0].main === "Snow" && (
                                <img className='w-24' src={snow_icon} alt="Clear Icon" />
                            )}
                            {Weather.weather[0].main === "Thunderstorm" && (
                                <img className='w-24' src={thunderstorm_icon} alt="Clear Icon" />
                            )}
                            {Weather.weather[0].main === "Drizzle" && (
                                <img className='w-24' src={drizzle_icon} alt="Clear Icon" />
                            )}
                        </div>
                        <div>
                            <p className='text-3xl mt-4 text-left'>{Weather.weather[0].main}</p>
                        </div>
                    </div>

                    <div className='w-1/3 pt-6 text-left'>
                        <p className='text-4xl font-semibold'>{Weather.name}, {Weather.sys.country}</p><br />
                        <p className='text-4xl font-semibold'>{Weather.main.temp}°C</p>
                        <p>({Weather.weather[0].description})</p>
                    </div>

                    <div className='w-1/3 pt-6'>
                        <div className='flex'>
                            <WiHumidity size={30}/>
                            <p className='ml-2 text-xl'>Air Humidity: {Weather.main.humidity}%</p>
                        </div>
                        <div className=' mt-2 flex'>
                            <PiWind size={30}/>
                            <p className='ml-2 text-xl'>Wind Speed: {Weather.wind.speed} km/h</p>
                        </div>
                        <div className='mt-2 flex'>
                            <GiSpeedometer size={30}/>
                            <p className='ml-2 text-xl'>Air Pressure: {Weather.main.pressure} mBar</p>
                        </div>
                    </div>
                </div>

                ) :  (
                <div>No weather report could be found for {userData.city}. <br />Edit the city name to check if your area's weather gets shown.</div>
                )}
            </div>
        </div>
        <div className='w-11/12 ml-24 p-6 flex bg-white'>
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

                  <div className="bg-pink-600 mx-6 w-4/5 text-white pb-10 shadow-2xl cursor-pointer rounded-xl hover:bg-pink-800"><br />
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

                  <div className="bg-pink-600 mx-6 w-4/5 text-white pb-10 shadow-2xl cursor-pointer rounded-xl hover:bg-pink-800"><br />
                    <h2 className="text-lg font-semibold text-center">Avg Logger Temp</h2><br />
                    <FaArrowCircleRight className='' style={{width: '100%', alignItems: 'center'}} size={40} />
                  </div>
            </div>
        </div>

        </>
      )}
      

{showModify && (
    <>
    <div className='w-11/12 ml-24 pt-14 bg-white'>
    <nav className='flex fixed justify-center bg-pink-100 w-full z-10'>
        <ul className= 'px-12 py-4 cursor-pointer hover:bg-pink-300' onClick={showBridgeInfo}>Bridge Information</ul>
        <ul className='px-12 py-4 cursor-pointer hover:bg-pink-300' onClick={showSensorInfo}>Sensor Information</ul>
        <ul className='px-12 py-4 cursor-pointer hover:bg-pink-300' onClick={showUserInfo}>User Information</ul>
    </nav>
    </div>
    </>
)}

{showBridgeDetails && (
    <>
        <div className='w-11/12 ml-24 p-6 pt-24 bg-white'>
        <form>
        <h1 className='text-center text-3xl w-full font-semibold pb-12'>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash; {userData.bridgeName} &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</h1>
          <div className="flex w-full px-6 justify-center">
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
                    <label htmlFor="state" className="block text-gray-700">State:</label>
                    <select id="state" name="state" value={userData.state} onChange={(e) => setUserData(prevData => ({...prevData, state: e.target.value}))} className="border border-gray-300 p-2 w-full rounded">
                    <option value="state" disabled>Select State</option>
                    {statesByCountry[userData.country]?.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                    </select>
                </div>
                
                <div className="mb-6">
                    <label htmlFor="nobridgespan" className="block text-gray-700">Number of Bridge Spans:</label>
                    <select id="nobridgespan" name="nobridgespan" value={userData.nobridgespan} onChange={(e) => setUserData(prevData => ({...prevData, nobridgespan: e.target.value}))} className="border border-gray-300 p-2 w-full rounded">
                    {[...Array(20).keys()].map((span) => (<option key={span + 1} value={span + 1}>{span + 1}</option>))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="noofgirders" className="block text-gray-700">Number of Girders:</label>
                    <select id="noofgirders" name="noofgirders" value={userData.nobridgespan} onChange={(e) => setUserData(prevData => ({...prevData, noofgirders: e.target.value}))} className="border border-gray-300 p-2 w-full rounded">
                    {[...Array(20).keys()].map((girder) => (<option key={girder + 1} value={girder + 1}>{girder + 1}</option>))}
                    </select>
                </div>
            </div>
            <div className="w-1/2 px-6 justify-center">
                <div className="mb-6">
                    <label htmlFor="division" className="block text-gray-700">City:</label>
                    <input type="text" id="division" placeholder='Enter Division' name="division" value={userData.city} onChange={(e) => setUserData(prevData => ({...prevData, division: e.target.value}))} className="border border-gray-300 p-2 w-full rounded" />
                </div>
                <div className="mb-6">
                    <label htmlFor="division" className="block text-gray-700">Division:</label>
                    <input type="text" id="division" placeholder='Enter Division' name="division" value={userData.division} onChange={(e) => setUserData(prevData => ({...prevData, division: e.target.value}))} className="border border-gray-300 p-2 w-full rounded" />
                </div>
                <div className="mb-6">
                    <label htmlFor='bridgeName' className="block text-gray-700">Bridge Location:</label>
                    <input type="text" id="location" placeholder='Enter Location' name="location" value={userData.location} onChange={(e) => setUserData(prevData => ({...prevData, location: e.target.value}))} className="border border-gray-300 p-2 w-full rounded" />
                </div>
                <div className="mb-6">
                    <label htmlFor="coordinates" className="block text-gray-700">Bridge Coordinates:</label>
                    <input type="text" id="coordinates" placeholder='Enter Coordinates' name="coordinates" value={userData.coordinates} onChange={(e) => setUserData(prevData => ({...prevData, coordinates: e.target.value}))} className="border border-gray-300 p-2 w-full rounded"/>
                </div>
            </div>
        </div>
        </form>
        <div className='text-center'>
            <button className='mt-12 p-2 bg-pink-600 text-white px-6 mx-4 rounded-sm hover:bg-pink-900' onClick={updateData}>Save</button>
        </div> 
        </div>
    </>
)}

{showSensorDetails && (
    <>
        <div className='w-11/12 ml-24 p-6 pt-24 bg-white'>
        {sensorDataList.length === 0 ? (
        <div className="text-center text-gray-700">No sensors found</div>
        ) : (
          sensorDataList.map((sensorData, index) => (
            <div key={index} className='w-11/12 ml-24 p-6 pt-24 bg-white'>
              <h1 className='text-center text-3xl w-full font-semibold pb-12'>Sensor Information - {sensorData.id}</h1>
              <div className="mb-6 px-96 w-full">
                <label htmlFor="sensortype" className="block text-gray-700">Sensor Type:</label>
                <select id="sensortype" name="sensortype" value={sensorData.sensortype}  onChange={(e) => setUserData(prevData => ({...prevData, sensortype: e.target.value}))} className="border border-gray-300 p-2 w-full rounded">
                  <option value="Accelerometer">Accelerometer</option>
                  <option value="Strain Gauge">Strain Gauge</option>
                  <option value="Deflection Gauge">Deflection Gauge</option>
                  <option value="Camera">Camera</option>
                </select>
              </div>
              <h1 className='font-semibold text-lg'>Sensor Location</h1>  
              <div className="mb-2 w-full px-5">
                <label htmlFor={`spanno-${index}`} className="block text-gray-700">Span Number:</label>
                <select id={`spanno-${index}`} name={`spanno-${index}`} value={sensorData.spanno}  onChange={(e) => setUserData(prevData => ({...prevData, spanno: e.target.value}))} className="border border-gray-300 p-1 w-full rounded">
                  {Array.from({ length: parseInt(userData.nobridgespan) }, (_, i) => (
                    <option key={`span-${i + 1}`} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2 w-full px-5">
                <label htmlFor={`girderno-${index}`} className="block text-gray-700">Girder Number:</label>
                <select id={`girderno-${index}`} name={`girderno-${index}`} value={sensorData.girderno}  onChange={(e) => setUserData(prevData => ({...prevData, girderno: e.target.value}))} className="border border-gray-300 p-1 w-full rounded">
                  {Array.from({ length: parseInt(userData.noofgirders) }, (_, i) => (
                    <option key={`girder-${i + 1}`} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
        ))
    )}
      <div className='text-center'>
        <button className='mt-12 p-2 bg-pink-600 text-white px-6 rounded-sm hover:bg-pink-900' onClick={() => updateSensorData(sensorData.id, sensorData)}>Save</button>
      </div> 
    </div>
    </>
)}

{showUser && ( 
    <>
        <div className='w-11/12 ml-24 p-6 pt-24 bg-white'>
        <h1 className='text-center text-3xl w-full font-semibold pb-12'>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash; User Information &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</h1>
        <div className='text-left text-gray-800'>
        <h3 className='font-semibold pb-6'>Added Admin(s):</h3>
        <div className='flex'>
            <input id='adminName' value={userData.adminName} onChange={(e) => setUserData(prevData => ({...prevData, adminName: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Admin 1)'/>
            <input id='adminEmail' value={userData.adminEmail} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.admin1countryCode} onChange={(e) => setUserData(prevData => ({...prevData, admin1countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
            </select>
            <input id='adminPhone' value={userData.adminPhone} onChange={(e) => setUserData(prevData => ({...prevData, adminPhone: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeAdmin1}><FaTrash size={20}/></button>
        </div>
        <form action="submit">
        <div className='mt-5 flex'>
            <input id='adminName2' value={userData.adminName2} onChange={(e) => setUserData(prevData => ({...prevData, adminName2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Admin 2)'/>
            <input id='adminEmail2' value={userData.adminEmail2} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.admin2countryCode} onChange={(e) => setUserData(prevData => ({...prevData, admin2countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
                </select>
            <input id='adminPhone2' value={userData.adminPhone2} onChange={(e) => setUserData(prevData => ({...prevData, adminPhone2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeAdmin2}><FaTrash size={20}/></button>
        </div>
        <div className='mt-5 flex'>
            <input id='adminName3' value={userData.adminName3} onChange={(e) => setUserData(prevData => ({...prevData, adminName3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Admin 3)'/>
            <input id='adminEmail3' value={userData.adminEmail3} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.admin3countryCode} onChange={(e) => setUserData(prevData => ({...prevData, admin3countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
            </select>
            <input id='adminPhone3' value={userData.adminPhone3} onChange={(e) => setUserData(prevData => ({...prevData, adminPhone3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeAdmin3}><FaTrash size={20}/></button>
        </div>
        </form>

        <br /><br /><br />
        <h3 className='font-semibold pb-6'>Added Manager(s):</h3>
        <div className='flex'>
            <input id='managerName' value={userData.managerName} onChange={(e) => setUserData(prevData => ({...prevData, managerName: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Manager 1)'/>
            <input id='managerEmail' value={userData.managerEmail} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.manager1countryCode} onChange={(e) => setUserData(prevData => ({...prevData, manager1countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
            </select>
            <input id='managerPhone' value={userData.managerPhone} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeManager1}><FaTrash size={20}/></button>
        </div>

        <form action="submit">
        <div className='mt-5 flex'>
            <input id='managerName2' value={userData.managerName2} onChange={(e) => setUserData(prevData => ({...prevData, managerName2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Manager 2)'/>
            <input id='managerEmail2' value={userData.managerEmail2} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.manager2countryCode} onChange={(e) => setUserData(prevData => ({...prevData, manager2countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
            </select>
            <input id='managerPhone2' value={userData.managerPhone2} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeManager2}><FaTrash size={20}/></button>
        </div>


        <div className='mt-5 flex'>
            <input id='managerName3' value={userData.managerName3} onChange={(e) => setUserData(prevData => ({...prevData, managerName3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Manager 3)'/>
            <input id='managerEmail3' value={userData.managerEmail3} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.manager3countryCode} onChange={(e) => setUserData(prevData => ({...prevData, manager3countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
                </select>
            <input id='managerPhone3' value={userData.managerPhone3} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeManager3}><FaTrash size={20}/></button>
        </div>

        <div className='mt-5 flex'>
            <input id='managerName4' value={userData.managerName4} onChange={(e) => setUserData(prevData => ({...prevData, managerName4: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Manager 4)'/>
            <input id='managerEmail4' value={userData.managerEmail4} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail4: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.manager4countryCode} onChange={(e) => setUserData(prevData => ({...prevData, manager4countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
                </select>
            <input id='managerPhone4' value={userData.managerPhone4} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone4: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeManager4}><FaTrash size={20}/></button>
        </div>

        <div className='mt-5 flex'>
            <input id='managerName5' value={userData.managerName5} onChange={(e) => setUserData(prevData => ({...prevData, managerName5: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Manager 5)'/>
            <input id='managerEmail5' value={userData.managerEmail5} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail5: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.manager5countryCode} onChange={(e) => setUserData(prevData => ({...prevData, manager5countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
                </select>
            <input id='managerPhone5' value={userData.managerPhone5} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone5: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeManager5}><FaTrash size={20}/></button>
        </div>

        <div className='mt-5 flex'>
            <input id='managerName6' value={userData.managerName6} onChange={(e) => setUserData(prevData => ({...prevData, managerName6: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Manager 6)'/>
            <input id='managerEmail6' value={userData.managerEmail6} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail6: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.manager6countryCode} onChange={(e) => setUserData(prevData => ({...prevData, manager6countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
                </select>
            <input id='managerPhone6' value={userData.managerPhone6} onChange={(e) => setUserData(prevData => ({...prevData, managerPhone6: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeManager6}><FaTrash size={20}/></button>
        </div>
        </form>

        <br /><br /><br />
        <h3 className='font-semibold pb-6'>Added Owner(s):</h3>
        <div className='flex'>
            <input id='ownerName' value={userData.ownerName} onChange={(e) => setUserData(prevData => ({...prevData, ownerName: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Owner 1)'/>
            <input id='ownerEmail' value={userData.ownerEmail} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.owner1countryCode} onChange={(e) => setUserData(prevData => ({...prevData, owner1countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
                </select>
            <input id='ownerPhone' value={userData.ownerPhone} onChange={(e) => setUserData(prevData => ({...prevData, ownerPhone: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeOwner1}><FaTrash size={20}/></button>
        </div>

        <form action="submit">
        <div className='mt-5 flex'>
            <input id='ownerName2' value={userData.ownerName2} onChange={(e) => setUserData(prevData => ({...prevData, ownerName2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Owner 2)'/>
            <input id='ownerEmail2' value={userData.ownerEmail2} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.owner2countryCode} onChange={(e) => setUserData(prevData => ({...prevData, owner2countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
                </select>
            <input id='ownerPhone2' value={userData.ownerPhone2} onChange={(e) => setUserData(prevData => ({...prevData, ownerPhone2: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeOwner2}><FaTrash size={20}/></button>
        </div>

        <div className='mt-5 flex'>
            <input id='ownerName3' value={userData.ownerName3} onChange={(e) => setUserData(prevData => ({...prevData, ownerName3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Name (Owner 3)'/>
            <input id='ownerEmail3' value={userData.ownerEmail3} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="email" placeholder='email'/>
            <select name="countryCode" value={userData.owner3countryCode} onChange={(e) => setUserData(prevData => ({...prevData, owner3countryCode: e.target.value}))} className='border-b-2 border-gray-400 p-2 w-1/6 mr-2 cursor-pointer'>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
                </select>
            <input id='ownerPhone3' value={userData.ownerPhone3} onChange={(e) => setUserData(prevData => ({...prevData, ownerPhone3: e.target.value}))} className="border-b-2 border-gray-400 p-2 w-full mr-8" type="text" placeholder='Mobile Number'/>
            <button className='w-1/6 mt-4' onClick={removeOwner3}><FaTrash size={20}/></button>
        </div>
        </form>
        </div>
        <div className='text-center'>
            <button className='mt-12 p-2 bg-pink-600 text-white px-6 rounded-sm hover:bg-pink-900' onClick={updateData}>Save</button>
        </div> 
        </div>
    </>
)}
</>

  )
};
export default Superuserhome;