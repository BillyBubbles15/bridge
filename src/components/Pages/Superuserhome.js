import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { City, Country, State } from "country-state-city";
import { useSnackbar } from 'notistack';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, LineElement } from 'chart.js';
import { FaBridge, FaTrash } from "react-icons/fa6";
import { FaArrowCircleRight, FaEdit } from "react-icons/fa";
import {MdHome, MdSettings, MdPerson, MdSearch, MdNotifications, MdDashboard, MdSensors, MdDescription, MdLogout, MdEdit } from 'react-icons/md';
import { PiWind } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { GiSpeedometer } from "react-icons/gi";
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

import './tailwind.css';
import 'react-phone-input-2/lib/style.css';
import Selector from "./Selector";

import logo2 from '../Assets/logo2.png';
import clear_icon from '../Assets/weather/clear.png';
import cloud_icon from '../Assets/weather/cloud.png';
import drizzle_icon from '../Assets/weather/drizzle.png';
import rain_icon from '../Assets/weather/rain.png';
import snow_icon from '../Assets/weather/snow.png';
import mist_icon from '../Assets/weather/fog.png';
import thunderstorm_icon from '../Assets/weather/thunderstorm.png';

import stdimg from '../Assets/stdimg.jpg';

import SensorData from '../Assets/Data.csv';
import SampleData from '../Assets/SGdata.csv';

ChartJS.register( CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)



const Superuserhome = () => {

    const [chartData, setChartData] = useState({});
    const [chartData1, setChartData1] = useState({});
    const [chartData2, setChartData2] = useState({});
    const [chartData3, setChartData3] = useState({});
    const [chartData4, setChartData4] = useState({});
    const [chartData5, setChartData5] = useState({});
    const [chartData6, setChartData6] = useState({});
    const [chartData7, setChartData7] = useState({});


    const [SampleChartData, setSampleChartData] = useState({});
    const [SampleChartData0, setSampleChartData0] = useState({});
    const [SampleChartData1, setSampleChartData1] = useState({});
    const [SampleChartData2, setSampleChartData2] = useState({});
    const [SampleChartData3, setSampleChartData3] = useState({});
    const [SampleChartData4, setSampleChartData4] = useState({});
    const [SampleChartData5, setSampleChartData5] = useState({});
    const [SampleChartData6, setSampleChartData6] = useState({});

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


    const [showaccelerometers, setshowaccelerometers] = useState(false);
    const [showstraingauges, setshowstraingauges] = useState(false);

    const accelerometerbtn = (e) => {
        e.preventDefault();
        setIsSelected(!isSelected);
        setshowaccelerometers(true);
        setshowstraingauges(false);
        setshowDashboard(false);
        setshowSensorDashboard(false);
        setshowModify(false);
        setshowSensorDetails(false);
        setshowBridgeDetails(false);
        setshowUser(false);
    }

    const straingaugebtn = (e) => {
        e.preventDefault();
        setIsSelected(!isSelected);
        setshowaccelerometers(false);
        setshowstraingauges(true);
        setshowDashboard(false);
        setshowSensorDashboard(false);
        setshowModify(false);
        setshowSensorDetails(false);
        setshowBridgeDetails(false);
        setshowUser(false);
    }

    useEffect(() => {

        const fetchData1 = async () => {
            const response1 = await fetch(SampleData); // Change path to your CSV file
            const reader1 = response1.body.getReader();
            const result1 = await reader1.read();
            const decoder1 = new TextDecoder('utf-8');
            const csv1 = decoder1.decode(result1.value);
            const parsedData1 = Papa.parse(csv1, { header: true });

            const label = parsedData1.data.slice(0, 3).map(row => row.TIME);

            const straingauge1 = parsedData1.data.slice(0, 3).map(row => row.SG1);
            const straingauge2 = parsedData1.data.slice(0, 3).map(row => row.SG2);
            const straingauge3 = parsedData1.data.slice(0, 3).map(row => row.SG3);

            const accelerometer1 = parsedData1.data.slice(0, 3).map(row => row.ACC1);
            const accelerometer2 = parsedData1.data.slice(0, 3).map(row => row.ACC2);
            const accelerometer3 = parsedData1.data.slice(0, 3).map(row => row.ACC3);

            setSampleChartData({
                labels: label,
                datasets: [
                  {
                      label: 'Date/Time vs Strain Gauge 1',
                      data: straingauge1,
                      borderColor: 'red',
                      borderWidth: 1,
                      pointBorderColor: 'black',  
                      pointRadius: 1,
                      pointHoverRadius: 1,
                      tension: 0,
                  }
                ]
              });
            setSampleChartData1({
                labels: label,
                datasets: [
                  {
                      label: 'Date/Time vs Strain Gauge 2',
                      data: straingauge2,
                      borderColor: 'blue',
                      borderWidth: 1,
                      pointBorderColor: 'black',
                      pointRadius: 1,
                      pointHoverRadius: 1,
                      tension: 0,
                  }
                ]
              });
            setSampleChartData2({
                labels: label,
                datasets: [
                  {
                      label: 'Date/Time vs Strain Gauge 3',
                      data: straingauge3,
                      borderColor: 'green',
                      borderWidth: 1,
                      pointBorderColor: 'black',  
                      pointRadius: 1,
                      pointHoverRadius: 1,
                      tension: 0,
                  }
                ]
              });
            setSampleChartData3({
                labels: label,
                datasets: [
                  {
                      label: 'Date/Time vs Acclerometer 1',
                      data: accelerometer1,
                      borderColor: 'red',
                      borderWidth: 1,
                      pointBorderColor: 'black',  
                      pointRadius: 1,
                      pointHoverRadius: 1,
                      tension: 0,
                  }
                ]
              });
            setSampleChartData4({
                labels: label,
                datasets: [
                  {
                      label: 'Date/Time vs Accelerometer 2',
                      data: accelerometer2,
                      borderColor: 'blue',
                      borderWidth: 1,
                      pointBorderColor: 'black',  
                      pointRadius: 1,
                      pointHoverRadius: 1,
                      tension: 0,
                  }
                ]
              });
            setSampleChartData5({
                labels: label,
                datasets: [
                  {
                      label: 'Date/Time vs Accelerometer 3',
                      data: accelerometer3,
                      borderColor: 'green',
                      borderWidth: 1,
                      pointBorderColor: 'black',  
                      pointRadius: 1,
                      pointHoverRadius: 1,
                      tension: 0,
                  }
                ]
              });
              setSampleChartData6({
                labels: label,
                datasets: [
                    {
                        label: 'Strain Gauge 1',
                        data: straingauge1,
                        borderColor: 'red',
                        borderWidth: 1,
                        pointBorderColor: 'black',
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        tension: 0,
                    },
                    {
                        label: 'Strain Gauge 2',
                        data: straingauge2,
                        borderColor: 'blue',
                        borderWidth: 1,
                        pointBorderColor: 'black',
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        tension: 0,
                    },
                    {
                        label: 'Strain Gauge 3',
                        data: straingauge3,
                        borderColor: 'green',
                        borderWidth: 1,
                        pointBorderColor: 'black',
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        tension: 0,
                    },
                ]
            });
              setSampleChartData0({
                labels: label,
                datasets: [
                    {
                        label: 'Accelerometer 1',
                        data: accelerometer1,
                        borderColor: 'red',
                        borderWidth: 1,
                        pointBorderColor: 'black',
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        tension: 0,
                    },
                    {
                        label: 'Accelerometer 2',
                        data: accelerometer2,
                        borderColor: 'blue',
                        borderWidth: 1,
                        pointBorderColor: 'black',
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        tension: 0,
                    },
                    {
                        label: 'Accelerometer 3',
                        data: accelerometer3,
                        borderColor: 'green',
                        borderWidth: 1,
                        pointBorderColor: 'black',
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        tension: 0,
                    },
                ]
            });
  
        }
    fetchData1();
    }, []);


    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
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
  
let countryData = Country.getAllCountries();
const [stateData, setStateData] = useState();
const [cityData, setCityData] = useState();

const [country, setCountry] = useState(countryData[0]);
const [state, setState] = useState();
const [city, setCity] = useState();

useEffect(() => {
  setStateData(State.getStatesOfCountry(country?.isoCode));
}, [country]);

useEffect(() => {
  setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
}, [country?.isoCode, state]);


useEffect(() => {
  stateData && setState(stateData[0]);
}, [stateData]);

useEffect(() => {
  cityData && setCity(cityData[0]);
}, [cityData]);


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

        admin1countryCode:'code',
        admin2countryCode:'code',
        admin3countryCode:'code',

        manager1countryCode:'code',
        manager2countryCode:'code',
        manager3countryCode:'code',
        manager4countryCode:'code',
        manager5countryCode:'code',
        manager6countryCode:'code',

        owner1countryCode:'code',
        owner2countryCode:'code',
        owner3countryCode:'code',
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
        if(!userData.adminName || !userData.adminEmail || !userData.adminPhone || userData.admin1countryCode === 'code'){
            enqueueSnackbar('Please Add Atleast One Admin!', { variant: 'error'});
        }
        else if(!userData.managerName || !userData.managerEmail || !userData.managerPhone || userData.manager1countryCode === 'code'){
            enqueueSnackbar('Please Add Atleast One Manager!', { variant: 'error'});
        }
        else if(!userData.ownerName || !userData.ownerEmail || !userData.ownerPhone || userData.owner1countryCode === 'code'){
            enqueueSnackbar('Please Add Atleast One Owner!', { variant: 'error'});
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
        fetch(`${weatherapi.base}weather?q=Pune&units=metric&APPID=${weatherapi.key}`)
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
            admin1countryCode: 'code',
            adminPhone: ''
        });
    };
    const removeAdmin2 = (e) => {
        e.preventDefault();
        setUserData({
            adminName2: '',
            adminEmail2: '',
            admin2countryCode: 'code',
            adminPhone2: ''
        });
    };
    const removeAdmin3 = (e) => {
        e.preventDefault();
        setUserData({
            adminName3: '',
            adminEmail3: '',
            admin3countryCode: 'code',
            adminPhone3: ''
        });
    };


    const removeManager1 = (e) => {
        e.preventDefault();
        setUserData({
            managerName: '',
            managerEmail: '',
            manager1countryCode: 'code',
            managerPhone: ''
        });
    };
    const removeManager2 = (e) => {
        e.preventDefault();
        setUserData({
            managerName2: '',
            managerEmail2: '',
            manager2countryCode: 'code',
            managerPhone2: ''
        });
    };
    const removeManager3 = (e) => {
        e.preventDefault();
        setUserData({
            managerName3: '',
            managerEmail3: '',
            manager3countryCode: 'code',
            managerPhone3: ''
        });
    };
    const removeManager4 = (e) => {
        e.preventDefault();
        setUserData({
            managerName4: '',
            managerEmail4: '',
            manager4countryCode: 'code',
            managerPhone4: ''
        });
    };
    const removeManager5 = (e) => {
        e.preventDefault();
        setUserData({
            managerName5: '',
            managerEmail5: '',
            manager5countryCode: 'code',
            managerPhone5: ''
        });
    };
    const removeManager6 = (e) => {
        e.preventDefault();
        setUserData({
            managerName6: '',
            managerEmail6: '',
            manager6countryCode: 'code',
            managerPhone6: ''
        });
    };


    const removeOwner1 = (e) => {
        e.preventDefault();
        setUserData({
            ownerName: '',
            ownerEmail: '',
            owner1countryCode: 'code',
            ownerPhone: ''
        });
    };
    const removeOwner2 = (e) => {
        e.preventDefault();
        setUserData({
            ownerName2: '',
            ownerEmail2: '',
            owner2countryCode: 'code',
            ownerPhone2: ''
        });
    };
    const removeOwner3 = (e) => {
        e.preventDefault();
        setUserData({
            ownerName3: '',
            ownerEmail3: '',
            owner3countryCode: 'code',
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
        setshowaccelerometers(false);
        setshowstraingauges(false);
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
        setshowaccelerometers(false);
        setshowstraingauges(false);
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
        setshowBridgeDetails(true);
        setIsSelected4(!isSelected4);
        setshowaccelerometers(false);
        setshowstraingauges(false);
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
            }
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };


  return (
    <>
      <div className="flex fixed z-50 w-full justify-center bg-gray-100 py-2 shadow-xl">
        <div className='w-1/2'>   
           <img className='h-10 pt-2 cursor-pointer px-5'  src={logo2} alt=""/>
        </div>
        <div className='w-full text-center pt-1'>
            <h1 className='text-2xl font-semibold'>Structural Health Monitoring Dashboard</h1>
        </div>
        <div className='w-1/2 text-right'>
            <button className='px-2'><MdSearch size={36} /></button>
            <button className='px-2'><MdNotifications size={36} /></button>
            <button onClick={UserDetails} className='px-2'><MdPerson onClick={UserDetails} size={36} /></button>
        </div>
      </div>


      <nav className='w-24 bg-gray-300 fixed mt-14'>
        <div className='text-center'>
            <button className={`w-full py-3 ${isSelected ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={Dashboard}><ul><MdDashboard style={{width: '100%', alignItems: 'center'}} size={40} />Home</ul></button>
            <hr /><hr />
            <button className={`w-full py-3 ${isSelected1 ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={SensorDashboard}><ul><MdSensors style={{width: '100%', alignItems: 'center'}} size={40} />Sensors</ul></button>
            <hr /><hr />
            <button className='w-full py-3 hover:bg-gray-400'><ul><MdHome style={{width: '100%', alignItems: 'center'}} size={40} />Bridge</ul></button>
            <hr /><hr />
            <button className='w-full py-3 hover:bg-gray-400'><ul><MdDescription style={{width: '100%', alignItems: 'center'}} size={40} />Report</ul></button>
            <hr /><hr />
            <button className={`w-full py-3 ${isSelected4 ? 'bg-gray-400' : 'hover:bg-gray-400'}`} onClick={Modify}><ul><FaEdit style={{width: '100%', alignItems: 'center'}} size={40} />Modify</ul></button>
            <hr /><hr />
            <button className='w-full py-3 hover:bg-gray-400' onClick={RedirectHome}><ul><FaBridge  style={{width: '100%', alignItems: 'center'}} size={40} />Bridge List</ul></button>
            <hr /><hr />
            <button className='w-full py-3 hover:bg-gray-400'><ul><MdSettings style={{width: '100%', alignItems: 'center'}} size={40}/>Settings</ul></button>
        </div>  
      </nav>



      {showUserDetails && (
        <div className="w-1/12 z-50 fixed top-14 right-2 bg-gray-100 border shadow-md">
          <div className='p-2 text-center'>Name</div>
          <div className='flex cursor-pointer hover:bg-gray-200 p-2'><MdEdit size={24} style={{paddingTop: '3px'}}/>Edit Info</div>
          <div className='flex cursor-pointer hover:bg-gray-200 p-2' onClick={Logout}><MdLogout size={24} style={{paddingTop: '3px'}}/>Log-out</div>
        </div>
      )}


      {showDashboard && (
        <>
        <div className='w-11/12 ml-24 p-6 pt-20 flex w-1/2 mx-8'>
        <button className='w-1/3 p-2 border border-gray-300 rounded-lg mx-2 overflow-hidden shadow-lg hover:bg-indigo-800 hover:text-white' onClick={accelerometerbtn}>Accelerometer</button>
        <button className='w-1/3 p-2 border border-gray-300 rounded-lg mx-2 overflow-hidden shadow-lg hover:bg-indigo-800 hover:text-white' onClick={straingaugebtn}>Strain Gauge</button>
        <button className='w-1/3 p-2 border border-gray-300 rounded-lg mx-2 overflow-hidden shadow-lg hover:bg-indigo-800 hover:text-white' onClick={accelerometerbtn}>Deflection Gauge</button>
        <button className='w-1/3 p-2 border border-gray-300 rounded-lg mx-2 overflow-hidden shadow-lg hover:bg-indigo-800 hover:text-white' onClick={accelerometerbtn}>Camera</button>
        </div>



        <div className='w-11/12 ml-24 p-6 text-white pt-4 flex w-1/2 mx-8'>
            <div className='bg-indigo-800 w-2/5 text-center py-6 overflow-hidden shadow-xl rounded-xl'>
                { typeof Weather.main != "undefined" ? (
                <div className='flex justify-center'>
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

                    <div className='w-1/3 text-left'>
                        <p className='text-4xl font-semibold'>{Weather.name}, {Weather.sys.country}</p><br />
                        <p className='text-4xl font-semibold'>{Weather.main.temp}°C</p>
                        <p className='text-xl'>({Weather.weather[0].description})</p>
                    </div>

                    <div className='w-1/3'>
                        <div className='flex'>
                            <WiHumidity size={25}/>
                            <p className='ml-2 text-sm'>Air Humidity: {Weather.main.humidity}%</p>
                        </div>
                        <div className=' mt-2 flex'>
                            <PiWind size={25}/>
                            <p className='ml-2 text-sm'>Wind Speed: {Weather.wind.speed} km/h</p>
                        </div>
                        <div className='mt-2 flex'>
                            <GiSpeedometer size={20}/>
                            <p className='ml-2 text-sm'>Air Pressure: {Weather.main.pressure} mBar</p>
                        </div>
                    </div>
                </div>
                ) :  (
                <div>No weather report could be found for {userData.city}. <br />Edit the city name to check if the area's weather gets shown. <br /> Source: https://openweathermap.org/</div>
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


    {showaccelerometers && (
        <>
        <div className='w-11/12 ml-24 p-6 pt-24 flex bg-white'>
            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <h1 className='text-center font-bold'>Accelerometer 1</h1><br />
                {SampleChartData3.labels && SampleChartData3.datasets && SampleChartData3.labels.length > 0 && SampleChartData3.datasets.length > 0 ? (
                    <Line data={SampleChartData3}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>

            <div className="bg-gray-100 w-1/2 shadow-xl">
            <h1 className='text-center font-bold'>Accelerometer 2</h1><br />
            {SampleChartData4.labels && SampleChartData4.datasets && SampleChartData4.labels.length > 0 && SampleChartData4.datasets.length > 0 ? (
                    <Line data={SampleChartData4} />
                    ) : (
                    <h1>Loading...</h1>
            )}
            </div>
        </div>
        <div className='w-11/12 ml-24 p-6 flex bg-white'>
            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <h1 className='text-center font-bold'>Accelerometer 3</h1><br />
                {SampleChartData5.labels && SampleChartData5.datasets && SampleChartData5.labels.length > 0 && SampleChartData5.datasets.length > 0 ? (
                    <Line data={SampleChartData5}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <div className="bg-gray-100 w-1/2 shadow-xl">
                <h1 className='text-center font-bold'>Relative Accelerometer Plots</h1><br />
                {SampleChartData0.labels && SampleChartData0.datasets && SampleChartData0.labels.length > 0 && SampleChartData0.datasets.length > 0 ? (
                    <Line data={SampleChartData0}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
        </>
    )}


    {showstraingauges && (
        <>
                <div className='w-11/12 ml-24 p-6 pt-24 flex bg-white'>
            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <h1 className='text-center font-bold'>Strain Gauge 1</h1><br />
                {SampleChartData.labels && SampleChartData.datasets && SampleChartData.labels.length > 0 && SampleChartData.datasets.length > 0 ? (
                    <Line data={SampleChartData}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>

            <div className="bg-gray-100 w-1/2 shadow-xl">
            <h1 className='text-center font-bold'>Strain Gauge 2</h1><br />
            {SampleChartData1.labels && SampleChartData1.datasets && SampleChartData1.labels.length > 0 && SampleChartData1.datasets.length > 0 ? (
                    <Line data={SampleChartData1} />
                    ) : (
                    <h1>Loading...</h1>
            )}
            </div>
        </div>
        <div className='w-11/12 ml-24 p-6 flex bg-white'>
            <div className="bg-gray-100 w-1/2 mx-8 shadow-xl">
                <h1 className='text-center font-bold'>Strain Gauge 3</h1><br />
                {SampleChartData2.labels && SampleChartData2.datasets && SampleChartData2.labels.length > 0 && SampleChartData2.datasets.length > 0 ? (
                    <Line data={SampleChartData2}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <div className="bg-gray-100 w-1/2 shadow-xl">
                <h1 className='text-center font-bold'>Relative Strain Gauge Plots</h1><br />
                {SampleChartData6.labels && SampleChartData6.datasets && SampleChartData6.labels.length > 0 && SampleChartData6.datasets.length > 0 ? (
                    <Line data={SampleChartData6}/>
                    ) : (
                    <h1>Loading...</h1>
                )}
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
    <div className='w-11/12 z-30 fixed bg-white ml-24 p-6 pt-20 flex w-1/2 mx-8'>
        <button className='w-1/3 p-2 border border-gray-300 rounded-lg mx-2 overflow-hidden shadow-lg hover:bg-indigo-800 hover:text-white text-lg' onClick={showBridgeInfo}>Bridge Information</button>
        <button className='w-1/3 p-2 border border-gray-300 rounded-lg mx-2 overflow-hidden shadow-lg hover:bg-indigo-800 hover:text-white text-lg' onClick={showSensorInfo}>Sensor Information</button>
        <button className='w-1/3 p-2 border border-gray-300 rounded-lg mx-2 overflow-hidden shadow-lg hover:bg-indigo-800 hover:text-white text-lg' onClick={showUserInfo}>User Information</button>
    </div>
    </>
)}

{showBridgeDetails && (
    <>
        <div className='w-11/12 ml-24 p-6 pt-40 bg-white'>
        <form>
        <h1 className='text-center text-3xl w-full font-semibold pb-12'>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash; Bridge Information &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</h1>
          <div className="flex w-full pl-16 py-6 justify-center bg-gray-100">

            <div className='w-1/3 px-2 justify-center'>
                <div className="mb-6">
                    <label htmlFor="country" className="block text-gray-700">Country:</label>
                    <Selector value={userData.country} data={countryData} selected={country} setSelected={setCountry}/>
                </div>
                <div className="mb-6">
                    <label htmlFor="division" className="block text-gray-700">Division:</label>
                    <input type="text" id="division" placeholder='Enter Division' name="division" value={userData.division} onChange={(e) => setUserData(prevData => ({...prevData, division: e.target.value}))} className="p-2 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg" />
                </div>
                <div className="mb-6">
                    <label htmlFor="division" className="block text-gray-700">Bridge Name:</label>
                    <input type="text" id="name" placeholder='Enter Name' name="name" value={userData.bridgeName} onChange={(e) => setUserData(prevData => ({...prevData, bridgeName: e.target.value}))} className="p-2 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg" />
                </div>
            </div>

            <div className="w-1/3 px-2 justify-center">
            <div className="mb-6">
                    <label htmlFor="state" className="block text-gray-700">State:</label>
                    <Selector value={userData.state} data={stateData} selected={state} setSelected={setState} />
                </div>
                <div className="mb-6">
                    <label htmlFor='bridgeName' className="block text-gray-700">Bridge Location:</label>
                    <input type="text" id="location" placeholder='Enter Location' name="location" value={userData.location} onChange={(e) => setUserData(prevData => ({...prevData, location: e.target.value}))} className="p-2 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg" />
                </div>
                <div className="mb-6">
                    <label htmlFor="nobridgespan" className="block text-gray-700">Number of Bridge Spans:</label>
                    <select id="nobridgespan" name="nobridgespan" value={userData.nobridgespan} onChange={(e) => setUserData(prevData => ({...prevData, nobridgespan: e.target.value}))} className="p-2 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg">
                    {[...Array(20).keys()].map((span) => (<option key={span + 1} value={span + 1}>{span + 1}</option>))}
                    </select>
                </div>
            </div>

            <div className='w-1/3 px-2 justify-center'>
                <div className="mb-6">
                    <label htmlFor="division" className="block text-gray-700">City:</label>
                    <Selector value={userData.city} data={cityData} selected={city} setSelected={setCity} />
                </div>
                <div className="mb-6">
                    <label htmlFor="coordinates" className="block text-gray-700">Bridge Coordinates:</label>
                    <input type="text" id="coordinates" placeholder='Enter Coordinates' name="coordinates" value={userData.coordinates} onChange={(e) => setUserData(prevData => ({...prevData, coordinates: e.target.value}))} className="p-2 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg"/>
                </div>
                <div className="mb-6">
                    <label htmlFor="noofgirders" className="block text-gray-700">Number of Girders:</label>
                    <select id="noofgirders" name="noofgirders" value={userData.nobridgespan} onChange={(e) => setUserData(prevData => ({...prevData, noofgirders: e.target.value}))} className="p-2 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg">
                    {[...Array(20).keys()].map((girder) => (<option key={girder + 1} value={girder + 1}>{girder + 1}</option>))}
                    </select>
                </div>
            </div>
        </div>
        </form>
        <div className='text-center'>
            <button className='p-2 bg-pink-600 w-full text-white px- rounded-sm hover:bg-pink-900' onClick={updateData}>Save</button>
        </div> 
        </div>
    </>
)}

{showSensorDetails && (
    <>
        <div className='w-11/12 ml-24 p-6 pt-40 bg-white'>
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
        <div className='w-11/12 ml-24 p-6 pt-40 bg-white'>
        <h1 className='text-center text-3xl w-full font-semibold pb-12'>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash; User Information &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</h1>
        <div className='text-left text-gray-800'>
        <h3 className='font-semibold pb-6'>Added Admin(s):</h3>
        <div className='flex'>
            <input id='adminName' value={userData.adminName} onChange={(e) => setUserData(prevData => ({...prevData, adminName: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Admin 1)'/>
            <input id='adminEmail' value={userData.adminEmail} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0 rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.adminPhone || ''} onChange={(value) => setUserData(prevData => ({ ...prevData, adminPhone: value }))} inputProps={{ required: true }} />
            <button className='w-1/6 mt-4' onClick={removeAdmin1}><FaTrash size={20}/></button>
        </div>
        <form action="submit">
        <div className='mt-5 flex'>
            <input id='adminName2' value={userData.adminName2} onChange={(e) => setUserData(prevData => ({...prevData, adminName2: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Admin 2)'/>
            <input id='adminEmail2' value={userData.adminEmail2} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail2: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.adminPhone2 || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, adminPhone2: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6 mt-4' onClick={removeAdmin2}><FaTrash size={20}/></button>
        </div>
        <div className='mt-5 flex'>
            <input id='adminName3' value={userData.adminName3} onChange={(e) => setUserData(prevData => ({...prevData, adminName3: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Admin 3)'/>
            <input id='adminEmail3' value={userData.adminEmail3} onChange={(e) => setUserData(prevData => ({...prevData, adminEmail3: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.adminPhone3 || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, adminPhone3: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6 mt-4' onClick={removeAdmin3}><FaTrash size={20}/></button>
        </div>
        </form>

        <br /><br /><br />
        <h3 className='font-semibold pb-6 mx-4'>Added Manager(s):</h3>
        <div className='flex'>
            <input id='managerName' value={userData.managerName} onChange={(e) => setUserData(prevData => ({...prevData, managerName: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Manager 1)'/>
            <input id='managerEmail' value={userData.managerEmail} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.managerPhone || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, managerPhone: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeManager1}><FaTrash size={20}/></button>
        </div>

        <form action="submit">
        <div className='mt-5 flex'>
            <input id='managerName2' value={userData.managerName2} onChange={(e) => setUserData(prevData => ({...prevData, managerName2: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Manager 2)'/>
            <input id='managerEmail2' value={userData.managerEmail2} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail2: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.managerPhone2 || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, managerPhone2: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeManager2}><FaTrash size={20}/></button>
        </div>


        <div className='mt-5 flex'>
            <input id='managerName3' value={userData.managerName3} onChange={(e) => setUserData(prevData => ({...prevData, managerName3: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Manager 3)'/>
            <input id='managerEmail3' value={userData.managerEmail3} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail3: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.managerPhone3 || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, managerPhone3: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeManager3}><FaTrash size={20}/></button>
        </div>

        <div className='mt-5 flex'>
            <input id='managerName4' value={userData.managerName4} onChange={(e) => setUserData(prevData => ({...prevData, managerName4: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Manager 4)'/>
            <input id='managerEmail4' value={userData.managerEmail4} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail4: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.managerPhone4 || ''} onChange={(value) => setUserData(prevData => ({ ...prevData, managerPhone4: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeManager4}><FaTrash size={20}/></button>
        </div>

        <div className='mt-5 flex'>
            <input id='managerName5' value={userData.managerName5} onChange={(e) => setUserData(prevData => ({...prevData, managerName5: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Manager 5)'/>
            <input id='managerEmail5' value={userData.managerEmail5} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail5: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.managerPhone5 || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, managerPhone5: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeManager5}><FaTrash size={20}/></button>
        </div>

        <div className='mt-5 flex'>
            <input id='managerName6' value={userData.managerName6} onChange={(e) => setUserData(prevData => ({...prevData, managerName6: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Manager 6)'/>
            <input id='managerEmail6' value={userData.managerEmail6} onChange={(e) => setUserData(prevData => ({...prevData, managerEmail6: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.managerPhone6 || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, managerPhone6: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeManager6}><FaTrash size={20}/></button>
        </div>
        </form>

        <br /><br /><br />
        <h3 className='font-semibold pb-6'>Added Owner(s):</h3>
        <div className='flex'>
            <input id='ownerName' value={userData.ownerName} onChange={(e) => setUserData(prevData => ({...prevData, ownerName: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Owner 1)'/>
            <input id='ownerEmail' value={userData.ownerEmail} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.ownerPhone || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, ownerPhone: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeOwner1}><FaTrash size={20}/></button>
        </div>

        <form action="submit">
        <div className='mt-5 flex'>
            <input id='ownerName2' value={userData.ownerName2} onChange={(e) => setUserData(prevData => ({...prevData, ownerName2: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Owner 2)'/>
            <input id='ownerEmail2' value={userData.ownerEmail2} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail2: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.ownerPhone2 || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, ownerPhone2: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeOwner2}><FaTrash size={20}/></button>
        </div>

        <div className='mt-5 flex'>
            <input id='ownerName3' value={userData.ownerName3} onChange={(e) => setUserData(prevData => ({...prevData, ownerName3: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="text" placeholder='Name (Owner 3)'/>
            <input id='ownerEmail3' value={userData.ownerEmail3} onChange={(e) => setUserData(prevData => ({...prevData, ownerEmail3: e.target.value}))} className="border border-gray-300 rounded overflow-hidden shadow-md w-full mx-4 pl-3 p-1" type="email" placeholder='email'/>
            <PhoneInput className="border border-gray-300 outline-0  rounded overflow-hidden shadow-md mx-4" country={'us'} value={userData.ownerPhone3 || ''}  onChange={(value) => setUserData(prevData => ({ ...prevData, ownerPhone3: value }))} inputProps={{  required: true, }}/>
            <button className='w-1/6' onClick={removeOwner3}><FaTrash size={20}/></button>
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