import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import './tailwind.css';

import loadingIcon from '../Assets/loading.gif';
import logo from '../Assets/logo2.png';

import { IoIosArrowDown } from "react-icons/io";
import { IoArrowBackCircleSharp } from "react-icons/io5";


const BridgeForm = ({onSubmit }) => {
  
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [statesList, setStatesList] = useState([]);
  const [coordinates, setCoordinates] =useState('');
  const [division, setDivision] = useState('');
  const [bridgeName, setBridgeName] = useState('');
  const [location, setlocation] = useState('');
  const [nobridgespan, setnobridgespan] = useState([1]);
  const [noofgirders, setnoofgirders] = useState([1]);
  const navigate = useNavigate();

  const Name = localStorage.getItem('name');

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [superadminId, setsuperadminId] = useState('')
  const storedSuperadminId = localStorage.getItem('superadminId');
  if (storedSuperadminId !== superadminId) {
    setsuperadminId(storedSuperadminId || '');
  }
  
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);

    // Fetch states based on selected country
    if (selectedCountry === 'USA') {
      setStatesList([  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']);
    } else if (selectedCountry === 'Australia') {
      setStatesList([  'New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory']);
    } else {
      setStatesList([]);
    }
    
    // Reset state selection
    setState('');
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
  };

  const handleSpanChange = (e) => {
    setnobridgespan(parseInt(e.target.value)); // Update number of spans
  };
  
  const[showUserForm, setShowUserForm] = useState(false);
  const[showBridgeForm, setShowBridgeForm] = useState(true);

  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showManagerForm, setShowManagerForm] = useState(false);
  const [showOwnerForm, setShowOwnerForm] = useState(false); 
  
  const [adminEmail, setAdminEmail] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerPhone, setManagerPhone] = useState('');

  const [adminEmail2, setAdminEmail2] = useState('');
  const [adminName2, setAdminName2] = useState('');
  const [adminPhone2, setAdminPhone2] = useState('');
  const [ownerEmail2, setOwnerEmail2] = useState('');
  const [ownerName2, setOwnerName2] = useState('');
  const [ownerPhone2, setOwnerPhone2] = useState('');
  const [managerEmail2, setManagerEmail2] = useState('');
  const [managerName2, setManagerName2] = useState('');
  const [managerPhone2, setManagerPhone2] = useState('');

  const [adminEmail3, setAdminEmail3] = useState('');
  const [adminName3, setAdminName3] = useState('');
  const [adminPhone3, setAdminPhone3] = useState('');
  const [ownerEmail3, setOwnerEmail3] = useState('');
  const [ownerName3, setOwnerName3] = useState('');
  const [ownerPhone3, setOwnerPhone3] = useState('');
  const [managerEmail3, setManagerEmail3] = useState('');
  const [managerName3, setManagerName3] = useState('');
  const [managerPhone3, setManagerPhone3] = useState('');

  const [managerEmail4, setManagerEmail4] = useState('');
  const [managerName4, setManagerName4] = useState('');
  const [managerPhone4, setManagerPhone4] = useState('');

  const [managerEmail5, setManagerEmail5] = useState('');
  const [managerName5, setManagerName5] = useState('');
  const [managerPhone5, setManagerPhone5] = useState('');

  const [managerEmail6, setManagerEmail6] = useState('');
  const [managerName6, setManagerName6] = useState('');
  const [managerPhone6, setManagerPhone6] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(Array.from({ length: nobridgespan }, () => ''));
  
  const handleDropdownChange = (index, value) => {
    setSelectedOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };


  const handleAddAdmin = () => {
    setShowAdminForm(!showAdminForm);
    setShowManagerForm(false);
    setShowOwnerForm(false);
  };

  const handleAddManager = () => {
    setShowManagerForm(!showManagerForm);
    setShowAdminForm(false);
    setShowOwnerForm(false);
  };

  const handleAddOwner = () => {
    setShowOwnerForm(!showOwnerForm);
    setShowAdminForm(false);
    setShowManagerForm(false);
  };

  const closeForm = () => {
    setShowAdminForm(false);
    setShowManagerForm(false);
    setShowOwnerForm(false);
  };

  const UserForm = async (e) => {
    e.preventDefault();
    if (!country || !state || !city || !coordinates || !division || !location || !bridgeName) {
      enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
    } else {
      enqueueSnackbar('Data entered successfully!', { variant: 'success' });
      setShowUserForm(!showUserForm);
      setShowBridgeForm(false);
    }
  };


  const Cancel = () => {
    CancelBridgeForm();
  };

  

  const CancelBridgeForm = () => {
    setCountry('');
    setState('');
    setnobridgespan('');
    setDivision('');
    setCoordinates('');
    setBridgeName('');
    setlocation('');
    setCity('');
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if(adminName ==='' || adminEmail === '' || adminPhone === ''){
      enqueueSnackbar('Minimum one Admin required!', { variant: 'error'});
    }
    else if(managerName === '' || managerEmail === '' || managerPhone === ''){
      enqueueSnackbar('Minimum one Manager required!', { variant: 'error'});
    }
    else if(ownerName === '' || ownerEmail === '' || ownerPhone === ''){
      enqueueSnackbar('Minimum one Owner required!', { variant: 'error'});
    }

    else if(adminPhone.length < 11){
      enqueueSnackbar('Admin 1: Incorrect Mobile Number!', { variant: 'error'});
    }
    else if (!adminEmail.includes('@')) {
      enqueueSnackbar('Admin 1: Invalid Email Address!', { variant: 'error'});
    }
    else if(managerPhone.length < 11){
      enqueueSnackbar('Manager 1: Incorrect Mobile Number!', { variant: 'error'});
    }
    else if (!managerEmail.includes('@')) {
      enqueueSnackbar('Manager 1: Invalid Email Address!', { variant: 'error'});
    }
    else if(ownerPhone.length < 11){
      enqueueSnackbar('Owner 1: Incorrect Mobile Number!', { variant: 'error'});
    }
    else if (!ownerEmail.includes('@')) {
      enqueueSnackbar('Owner 1: Invalid Email Address!', { variant: 'error'});
    }

    else if(adminName2.length === 0 && adminEmail2.length >  0 && adminPhone2.length > 10){
      enqueueSnackbar('Admin 2: Enter a Name!', { variant: 'error'});
    }
    else if(adminName2.length > 0 && adminEmail2.length ===  0 && adminPhone2.length > 10){
      enqueueSnackbar('Admin 2: Enter an email', { variant: 'error'});
    }
    else if(adminName2.length > 0 && adminEmail2.length >  0 && adminPhone2.length === 0){
      enqueueSnackbar('Admin 2: Enter Mobile Number!', { variant: 'error'});
    }
    else if(adminName2.length === 0 && adminEmail2.length >  0 && adminPhone2.length < 11){
      enqueueSnackbar('Admin 2: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(adminName2.length > 0 && adminEmail2.length ===  0 && adminPhone2.length < 11){
      enqueueSnackbar('Admin 2: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(adminName2.length === 0 && adminEmail2.length ===  0 && adminPhone2.length > 10){
      enqueueSnackbar('Admin 2: Enter Name and Email!', { variant: 'error'});
    }
    else if(adminEmail2.length > 0 && !adminEmail2.includes('@')){
      enqueueSnackbar('Admin 2: Enter a valid Email!', { variant: 'error'});
    }
    else if(adminName2.length > 0 && adminEmail2.length >  0 && adminPhone2.length < 11){
      enqueueSnackbar('Admin 2: Incorrect Mobile Number!', { variant: 'error'});
    }

    else if(adminName3.length === 0 && adminEmail3.length >  0 && adminPhone3.length > 10){
      enqueueSnackbar('Admin 3: Enter a Name!', { variant: 'error'});
    }
    else if(adminName3.length > 0 && adminEmail3.length ===  0 && adminPhone3.length > 10){
      enqueueSnackbar('Admin 3: Enter an email', { variant: 'error'});
    }
    else if(adminName3.length > 0 && adminEmail3.length >  0 && adminPhone3.length === 0){
      enqueueSnackbar('Admin 3: Enter Mobile Number!', { variant: 'error'});
    }
    else if(adminName3.length === 0 && adminEmail3.length >  0 && adminPhone3.length < 11){
      enqueueSnackbar('Admin 3: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(adminName3.length > 0 && adminEmail3.length ===  0 && adminPhone3.length < 11){
      enqueueSnackbar('Admin 3: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(adminName3.length === 0 && adminEmail3.length ===  0 && adminPhone3.length > 10){
      enqueueSnackbar('Admin 3: Enter Name and Email!', { variant: 'error'});
    }
    else if(adminEmail3.length > 0 && !adminEmail3.includes('@')){
      enqueueSnackbar('Admin 3: Enter a valid Email!', { variant: 'error'});
    }
    else if(adminName3.length > 0 && adminEmail3.length >  0 && adminPhone3.length < 11){
      enqueueSnackbar('Admin 3: Incorrect Mobile Number!', { variant: 'error'});
    }


    else if(managerName2.length === 0 && managerEmail2.length >  0 && managerPhone2.length > 10){
      enqueueSnackbar('Manager 2: Enter a Name!', { variant: 'error'});
    }
    else if(managerName2.length > 0 && managerEmail2.length ===  0 && managerPhone2.length > 10){
      enqueueSnackbar('Manager 2: Enter an email', { variant: 'error'});
    }
    else if(managerName2.length > 0 && managerEmail2.length >  0 && managerPhone2.length === 0){
      enqueueSnackbar('Manager 2: Enter Mobile Number!', { variant: 'error'});
    }
    else if(managerName2.length === 0 && managerEmail2.length >  0 && managerPhone2.length < 11){
      enqueueSnackbar('Manager 2: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(managerName2.length > 0 && managerEmail2.length ===  0 && managerPhone2.length < 11){
      enqueueSnackbar('Manager 2: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(managerName2.length === 0 && managerEmail2.length ===  0 && managerPhone2.length > 10){
      enqueueSnackbar('Manager 2: Enter Name and Email!', { variant: 'error'});
    }
    else if(managerEmail2.length > 0 && !managerEmail2.includes('@')){
      enqueueSnackbar('Manager 2: Enter a valid Email!', { variant: 'error'});
    }
    else if(managerName2.length > 0 && managerEmail2.length >  0 && managerPhone2.length < 11){
      enqueueSnackbar('Manager 2: Incorrect Mobile Number!', { variant: 'error'});
    }

    else if(managerName3.length === 0 && managerEmail3.length >  0 && managerPhone3.length > 10){
      enqueueSnackbar('Manager 3: Enter a Name!', { variant: 'error'});
    }
    else if(managerName3.length > 0 && managerEmail3.length ===  0 && managerPhone3.length > 10){
      enqueueSnackbar('Manager 3: Enter an email', { variant: 'error'});
    }
    else if(managerName3.length > 0 && managerEmail3.length >  0 && managerPhone3.length === 0){
      enqueueSnackbar('Manager 3: Enter Mobile Number!', { variant: 'error'});
    }
    else if(managerName3.length === 0 && managerEmail3.length >  0 && managerPhone3.length < 11){
      enqueueSnackbar('Manager 3: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(managerName3.length > 0 && managerEmail3.length ===  0 && managerPhone3.length < 11){
      enqueueSnackbar('Manager 3: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(managerName3.length === 0 && managerEmail3.length ===  0 && managerPhone3.length > 10){
      enqueueSnackbar('Manager 3: Enter Name and Email!', { variant: 'error'});
    }
    else if(managerEmail3.length > 0 && !managerEmail3.includes('@')){
      enqueueSnackbar('Manager 3: Enter a valid Email!', { variant: 'error'});
    }
    else if(managerName3.length > 0 && managerEmail3.length >  0 && managerPhone3.length < 11){
      enqueueSnackbar('Manager 3: Incorrect Mobile Number!', { variant: 'error'});
    }

    else if(managerName4.length === 0 && managerEmail4.length >  0 && managerPhone4.length > 10){
      enqueueSnackbar('Manager 4: Enter a Name!', { variant: 'error'});
    }
    else if(managerName4.length > 0 && managerEmail4.length ===  0 && managerPhone4.length > 10){
      enqueueSnackbar('Manager 4: Enter an email', { variant: 'error'});
    }
    else if(managerName4.length > 0 && managerEmail4.length >  0 && managerPhone4.length === 0){
      enqueueSnackbar('Manager 4: Enter Mobile Number!', { variant: 'error'});
    }
    else if(managerName4.length === 0 && managerEmail4.length >  0 && managerPhone4.length < 11){
      enqueueSnackbar('Manager 4: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(managerName4.length > 0 && managerEmail4.length ===  0 && managerPhone4.length < 11){
      enqueueSnackbar('Manager 4: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(managerName4.length === 0 && managerEmail4.length ===  0 && managerPhone4.length > 10){
      enqueueSnackbar('Manager 4: Enter Name and Email!', { variant: 'error'});
    }
    else if(managerEmail4.length > 0 && !managerEmail4.includes('@')){
      enqueueSnackbar('Manager 4: Enter a valid Email!', { variant: 'error'});
    }
    else if(managerName4.length > 0 && managerEmail4.length >  0 && managerPhone4.length < 11){
      enqueueSnackbar('Manager 4: Incorrect Mobile Number!', { variant: 'error'});
    }

    else if(managerName5.length === 0 && managerEmail5.length >  0 && managerPhone5.length > 10){
      enqueueSnackbar('Manager 5: Enter a Name!', { variant: 'error'});
    }
    else if(managerName5.length > 0 && managerEmail5.length ===  0 && managerPhone5.length > 10){
      enqueueSnackbar('Manager 5: Enter an email', { variant: 'error'});
    }
    else if(managerName5.length > 0 && managerEmail5.length >  0 && managerPhone5.length === 0){
      enqueueSnackbar('Manager 5: Enter Mobile Number!', { variant: 'error'});
    }
    else if(managerName5.length === 0 && managerEmail5.length >  0 && managerPhone5.length < 11){
      enqueueSnackbar('Manager 5: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(managerName5.length > 0 && managerEmail5.length ===  0 && managerPhone5.length < 11){
      enqueueSnackbar('Manager 5: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(managerName5.length === 0 && managerEmail5.length ===  0 && managerPhone5.length > 10){
      enqueueSnackbar('Manager 5: Enter Name and Email!', { variant: 'error'});
    }
    else if(managerEmail5.length > 0 && !managerEmail5.includes('@')){
      enqueueSnackbar('Manager 5: Enter a valid Email!', { variant: 'error'});
    }
    else if(managerName5.length > 0 && managerEmail5.length >  0 && managerPhone5.length < 11){
      enqueueSnackbar('Manager 5: Incorrect Mobile Number!', { variant: 'error'});
    }

    else if(managerName6.length === 0 && managerEmail6.length >  0 && managerPhone6.length > 10){
      enqueueSnackbar('Manager 6: Enter a Name!', { variant: 'error'});
    }
    else if(managerName6.length > 0 && managerEmail6.length ===  0 && managerPhone6.length > 10){
      enqueueSnackbar('Manager 6: Enter an email', { variant: 'error'});
    }
    else if(managerName6.length > 0 && managerEmail6.length >  0 && managerPhone6.length === 0){
      enqueueSnackbar('Manager 6: Enter Mobile Number!', { variant: 'error'});
    }
    else if(managerName6.length === 0 && managerEmail6.length >  0 && managerPhone6.length < 11){
      enqueueSnackbar('Manager 6: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(managerName6.length > 0 && managerEmail6.length ===  0 && managerPhone6.length < 11){
      enqueueSnackbar('Manager 6: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(managerName6.length === 0 && managerEmail6.length ===  0 && managerPhone6.length > 10){
      enqueueSnackbar('Manager 6: Enter Name and Email!', { variant: 'error'});
    }
    else if(managerEmail6.length > 0 && !managerEmail6.includes('@')){
      enqueueSnackbar('Manager 6: Enter a valid Email!', { variant: 'error'});
    }
    else if(managerName6.length > 0 && managerEmail6.length >  0 && managerPhone6.length < 11){
      enqueueSnackbar('Manager 6: Incorrect Mobile Number!', { variant: 'error'});
    }


    else if(ownerName2.length === 0 && ownerEmail2.length >  0 && ownerPhone2.length > 10){
      enqueueSnackbar('Owner 2: Enter a Name!', { variant: 'error'});
    }
    else if(ownerName2.length > 0 && ownerEmail2.length ===  0 && ownerPhone2.length > 10){
      enqueueSnackbar('Owner 2: Enter an email', { variant: 'error'});
    }
    else if(ownerName2.length > 0 && ownerEmail2.length >  0 && ownerPhone2.length === 0){
      enqueueSnackbar('Owner 2: Enter Mobile Number!', { variant: 'error'});
    }
    else if(ownerName2.length === 0 && ownerEmail2.length >  0 && ownerPhone2.length < 11){
      enqueueSnackbar('Owner 2: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(ownerName2.length > 0 && ownerEmail2.length ===  0 && ownerPhone2.length < 11){
      enqueueSnackbar('Owner 2: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(ownerName2.length === 0 && ownerEmail2.length ===  0 && ownerPhone2.length > 10){
      enqueueSnackbar('Owner 2: Enter Name and Email!', { variant: 'error'});
    }
    else if(ownerEmail2.length > 0 && !ownerEmail2.includes('@')){
      enqueueSnackbar('Owner 2: Enter a valid Email!', { variant: 'error'});
    }
    else if(ownerName2.length > 0 && ownerEmail2.length >  0 && ownerPhone2.length < 11){
      enqueueSnackbar('Owner 2: Incorrect Mobile Number!', { variant: 'error'});
    }

    else if(ownerName3.length === 0 && ownerEmail3.length >  0 && ownerPhone3.length > 10){
      enqueueSnackbar('Owner 3: Enter a Name!', { variant: 'error'});
    }
    else if(ownerName3.length > 0 && ownerEmail3.length ===  0 && ownerPhone3.length > 10){
      enqueueSnackbar('Owner 3: Enter an email', { variant: 'error'});
    }
    else if(ownerName3.length > 0 && ownerEmail3.length >  0 && ownerPhone3.length === 0){
      enqueueSnackbar('Owner 3: Enter Mobile Number!', { variant: 'error'});
    }
    else if(ownerName3.length === 0 && ownerEmail3.length >  0 && ownerPhone3.length < 11){
      enqueueSnackbar('Owner 3: Enter Name and Mobile Number!', { variant: 'error'});
    }
    else if(ownerName3.length > 0 && ownerEmail3.length ===  0 && ownerPhone3.length < 11){
      enqueueSnackbar('Owner 3: Enter Email and Mobile Number!', { variant: 'error'});
    }
    else if(ownerName3.length === 0 && ownerEmail3.length ===  0 && ownerPhone3.length > 10){
      enqueueSnackbar('Owner 3: Enter Name and Email!', { variant: 'error'});
    }
    else if(ownerEmail3.length > 0 && !ownerEmail3.includes('@')){
      enqueueSnackbar('Owner 3: Enter a valid Email!', { variant: 'error'});
    }
    else if(ownerName3.length > 0 && ownerEmail3.length >  0 && ownerPhone3.length < 11){
      enqueueSnackbar('Owner 3: Incorrect Mobile Number!', { variant: 'error'});
    }

    else{
        try {
          setLoading(true);
          const response = await axios.post('http://localhost:9090/bridge/register', {
            Name: Name,
            country:country,
            state:state,
            city: city,
            nobridgespan:nobridgespan,
            noofgirders:noofgirders,
            division:division,
            coordinates:coordinates,
            bridgeName:bridgeName,
            location:location,
            superadminId:superadminId,

            adminEmail: adminEmail,
            adminName: adminName,
            adminPhone: adminPhone,
            managerEmail: managerEmail,
            managerName: managerName,
            managerPhone: managerPhone,
            ownerEmail: ownerEmail,
            ownerName: ownerName,
            ownerPhone: ownerPhone,

            adminEmail2: adminEmail2,
            adminName2: adminName2,
            adminPhone2: adminPhone2,
            managerEmail2: managerEmail2,
            managerName2: managerName2,
            managerPhone2: managerPhone2,
            ownerEmail2: ownerEmail2,
            ownerName2: ownerName2,
            ownerPhone2: ownerPhone2,

            adminEmail3: adminEmail3,
            adminName3: adminName3,
            adminPhone3: adminPhone3,
            managerEmail3: managerEmail3,
            managerName3: managerName3,
            managerPhone3: managerPhone3,
            ownerEmail3: ownerEmail3,
            ownerName3: ownerName3,
            ownerPhone3: ownerPhone3,

            managerEmail4: managerEmail4,
            managerName4: managerName4,
            managerPhone4: managerPhone4,

            managerEmail5: managerEmail5,
            managerName5: managerName5,
            managerPhone5: managerPhone5,
            
            managerEmail6: managerEmail6,
            managerName6: managerName6,
            managerPhone6: managerPhone6,
          });

          const bridgeId = response.data.id;
          localStorage.setItem('bid',bridgeId);
          localStorage.setItem('country', country);
          localStorage.setItem('state', state);
          localStorage.setItem('city', city);
          localStorage.setItem('nobridgespan', nobridgespan);
          localStorage.setItem('noofgirders', noofgirders);
          localStorage.setItem('division', division);
          localStorage.setItem('coordinates', coordinates);
          localStorage.setItem('location', location);
          localStorage.setItem('bridgeName', bridgeName);

          localStorage.setItem('ownerName', ownerName);
          localStorage.setItem('ownerName2', ownerName2);
          localStorage.setItem('ownerName3', ownerName3);

          localStorage.setItem('managerName', managerName);
          localStorage.setItem('managerName2', managerName2);
          localStorage.setItem('managerName3', managerName3);
          localStorage.setItem('managerName4', managerName4);
          localStorage.setItem('managerName5', managerName5);
          localStorage.setItem('managerName6', managerName6);

          localStorage.setItem('adminName', adminName);
          localStorage.setItem('adminName2', adminName2);
          localStorage.setItem('adminName3', adminName3);
          localStorage.setItem('spanData', JSON.stringify(selectedOptions));
          console.log(response.data.message);

        if (response.data.message.includes('User details do not match.')) {
          enqueueSnackbar('User details do not match!', { variant: 'error'});
        } else {
            navigate('/home/bridgeform/sensorform');
            if (onSubmit) {
                onSubmit();
            }
        }
        } catch (error) {
          console.error('Error submitting form', error);
        } finally {
          setLoading(false);
        }
      };
  };


    const resetForm = () => {
        setAdminEmail('');
        setAdminName('');
        setAdminPhone('');
        setManagerName('');
        setManagerEmail('');
        setManagerPhone('');
        setOwnerName('');
        setOwnerEmail('');
        setOwnerPhone('');

        setAdminEmail2('');
        setAdminName2('');
        setAdminPhone2('');
        setManagerName2('');
        setManagerEmail2('');
        setManagerPhone2('');
        setOwnerName2('');
        setOwnerEmail2('');
        setOwnerPhone2('');

        setAdminEmail3('');
        setAdminName3('');
        setAdminPhone3('');
        setManagerName3('');
        setManagerEmail3('');
        setManagerPhone3('');
        setOwnerName3('');
        setOwnerEmail3('');
        setOwnerPhone3('');

        setManagerName4('');
        setManagerEmail4('');
        setManagerPhone4('');

        setManagerName5('');
        setManagerEmail5('');
        setManagerPhone5('');

        setManagerName6('');
        setManagerEmail6('');
        setManagerPhone6('');

        closeForm();
      };

      const onCancel = () => {
        resetForm();
      };

      const PrevFrom = () => {
        setShowBridgeForm(!showBridgeForm);
        setShowUserForm(false);
      };

      const backHome = () => {
        navigate('/home')
      }



  return (
    <> 
    <div className="flex w-full">
        {showUserForm && ( 
        <div id='userform' className='text-left w-full'>
          <button type="submit" onClick={PrevFrom} className="inline-flex underline mt-4 p-2 hover:text-blue-700"><IoArrowBackCircleSharp size={32}/>Back</button>
        <div className='text-center justify-center flex'>
          <img className='' src={logo} alt="" />
        </div>

        <h1 className='mt-12 mb-12 text-3xl text-center font-semibold'>Add User Details</h1>        
        <hr />          
        <button className='text-black w-full hover:bg-gray-200 flex justify-center font-bold text-xl py-5' onClick={handleAddAdmin}>Add Admin(s): <IoIosArrowDown size={26}/></button><hr />
        {showAdminForm && ( 
        <form className='bg-blue-50 text-center pt-6 pb-12' action="submit">
        <div className='flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Admin 1: &nbsp;</h1>
            <input id='adminName' value={adminName} onChange={(e) => setAdminName(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Admin 1)'/>
            <input id='adminEmail' value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={adminPhone} onChange={(value) => setAdminPhone(value)} inputProps={{   required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>
        
        <div className='mt-5 flex justify-center'>
          <h1 className='text-lg font-semibold mt-1'>Admin 2: &nbsp;</h1>
            <input id='adminName2' value={adminName2} onChange={(e) => setAdminName2(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Admin 2)'/>
            <input id='adminEmail2' value={adminEmail2} onChange={(e) => setAdminEmail2(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={adminPhone2} onChange={(value) => setAdminPhone2(value)} inputProps={{   required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>

        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Admin 3: &nbsp;</h1>
            <input id='adminName3' value={adminName3} onChange={(e) => setAdminName3(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Admin 3)'/>
            <input id='adminEmail3' value={adminEmail3} onChange={(e) => setAdminEmail3(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={adminPhone3} onChange={(value) => setAdminPhone3(value)} inputProps={{   required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>
        </form>
        )}


        <button className='text-black w-full hover:bg-gray-200 flex justify-center font-bold text-xl py-5' onClick={handleAddManager}>Add Manager(s): <IoIosArrowDown size={26}/></button><hr />
        {showManagerForm &&(
        <form className='text-center bg-blue-50 pt-6 pb-12' action="submit">
          <div className='flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 1: &nbsp;</h1>
            <input id='managerName' value={managerName} onChange={(e) => setManagerName(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Manager 1)'/>
            <input id='managerEmail' value={managerEmail} onChange={(e) => setManagerEmail(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={managerPhone} onChange={(value) => setManagerPhone(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>
 
        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 2: &nbsp;</h1>
            <input id='managerName2' value={managerName2} onChange={(e) => setManagerName2(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Manager 2)'/>
            <input id='managerEmail2' value={managerEmail2} onChange={(e) => setManagerEmail2(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={managerPhone2} onChange={(value) => setManagerPhone2(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>


        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 3: &nbsp;</h1>
            <input id='managerName3' value={managerName3} onChange={(e) => setManagerName3(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Manager 3)'/>
            <input id='managerEmail3' value={managerEmail3} onChange={(e) => setManagerEmail3(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={managerPhone3} onChange={(value) => setManagerPhone3(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>

        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 4: &nbsp;</h1>
            <input id='managerName4' value={managerName4} onChange={(e) => setManagerName4(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Manager 4)'/>
            <input id='managerEmail4' value={managerEmail4} onChange={(e) => setManagerEmail4(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={managerPhone4} onChange={(value) => setManagerPhone4(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>

        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 5: &nbsp;</h1>
            <input id='managerName5' value={managerName5} onChange={(e) => setManagerName5(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Manager 5)'/>
            <input id='managerEmail5' value={managerEmail5} onChange={(e) => setManagerEmail5(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={managerPhone5} onChange={(value) => setManagerPhone5(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>

        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 6: &nbsp;</h1>
            <input id='managerName6' value={managerName6} onChange={(e) => setManagerName6(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Manager 6)'/>
            <input id='managerEmail6' value={managerEmail6} onChange={(e) => setManagerEmail6(e.target.value)} className="border border-gray-300 p-1 pl-3 w-1/6 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={managerPhone6} onChange={(value) => setManagerPhone6(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
        </div>
        </form>
        )}

        <button className='text-black w-full hover:bg-gray-200 flex justify-center font-bold text-xl py-5' onClick={handleAddOwner}>Add Owner(s): <IoIosArrowDown size={26}/></button><hr />
        {showOwnerForm && (
        <form className='text-center bg-blue-50 pt-6 pb-12' action="submit">
          <div className='flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Owner 1: &nbsp;</h1>
            <input id='ownerName' value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Owner 1)'/>
            <input id='ownerEmail' value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
            <div>
              <PhoneInput country={'us'} value={ownerPhone} onChange={(value) => setOwnerPhone(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
            </div>
          </div>

        <div className='mt-5 flex justify-center'>
          <h1 className='text-lg font-semibold mt-1'>Owner 2: &nbsp;</h1>
          <input id='ownerName2' value={ownerName2} onChange={(e) => setOwnerName2(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Owner 2)'/>
          <input id='ownerEmail2' value={ownerEmail2} onChange={(e) => setOwnerEmail2(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
          <div>
            <PhoneInput country={'us'} value={ownerPhone2} onChange={(value) => setOwnerPhone2(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
          </div>
        </div>
            
        <div className='mt-5 flex justify-center'>
          <h1 className='text-lg font-semibold mt-1'>Owner 3: &nbsp;</h1>
          <input id='ownerName3' value={ownerName3} onChange={(e) => setOwnerName3(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="text" placeholder='Name (Owner 3)'/>
          <input id='ownerEmail3' value={ownerEmail3} onChange={(e) => setOwnerEmail3(e.target.value)} className="border border-gray-300 p-1 w-1/6 pl-3 mr-4 rounded overflow-hidden shadow-md outline-0" type="email" placeholder='email'/>
          <div>
            <PhoneInput country={'us'} value={ownerPhone3} onChange={(value) => setOwnerPhone3(value)} inputProps={{  required: true, className: 'relative border border-gray-300 outline-0 rounded overflow-hidden shadow-md ml-9 p-2 w-full',}}/>
          </div>
        </div>
      </form>
      )}
    
        <div className='text-center mt-16 mb-6'>
        {loading ? (
                <img id='Licon-bridgeform' className='absolute w-24' src={loadingIcon} alt="Loading" />
              ) : (
          <button type="submit" onClick={submitForm} className="bg-blue-600 px-5 py-2 text-gray-100 mx-2 rounded-sm hover:bg-indigo-900">Submit</button>
          )}
        <button onClick={onCancel} className="bg-black px-5 py-2 text-gray-100 rounded-sm mx-2 hover:bg-red-800">Cancel</button>
        </div>
      </div>
      )}


    {showBridgeForm && ( 
      <div className="w-full px-2 bg-white rounded-xl">
            <button className='flex underline mt-4 hover:text-blue-700' onClick={backHome}><IoArrowBackCircleSharp size={32}/>Home</button>
            <div className='w-full flex text-center justify-center items-center'>
            <img className='mb-8' src={logo} alt="" />
            </div>

        <form><hr />
          <h1 className='text-center text-3xl mt-8 mb-8 font-semibold'>Enter Bridge Details</h1><hr />
          <div className="flex bg-gray-100 mt-16 mx-12 shadow-md p-6 pt-12 pb-12">
            <div className='w-full mx-5'>
              <div className="mb-6">
                <label htmlFor="country">Select Country:</label>
                <select id="country" value={country} onChange={handleCountryChange} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg">
                  <option value="">Select</option>
                  <option value="USA">USA</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="division" className="block text-gray-700">Division:</label>
                <input type="text" id="division" placeholder='Enter Division' name="division" value={division} onChange={(e) => setDivision(e.target.value)} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg" />
              </div>
          <div className="mb-6">
            <label htmlFor='bridgeName' className="block text-gray-700">Bridge Name:</label>
            <input type="text" id="name" placeholder='Enter Name' name="name" value={bridgeName} onChange={(e) => setBridgeName(e.target.value)} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg" />
          </div>
        </div>
            <div className='w-full mx-5'>
            <div className="mb-6">
            <div>
              <label htmlFor="state" className="block text-gray-700">Select State:</label>
              <select id="state" value={state} onChange={handleStateChange} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg">
                <option value="">Select</option>
                {statesList.map((stateName) => (
                  <option key={stateName} value={stateName}>{stateName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="coordinates" className="block text-gray-700">Bridge Coordinates:</label>
            <input type="text" id="coordinates" placeholder='Enter Coordinates' name="coordinates" value={coordinates} onChange={(e) => setCoordinates(e.target.value)} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg"/>
          </div>
          <div className="mb-6">
        <label htmlFor="nobridgespan" className="block text-gray-700">Total Number of Spans:</label>
        <select id="nobridgespan" name="nobridgespan" value={nobridgespan} onChange={handleSpanChange} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg">
          {[...Array(50).keys()].map((span) => (<option key={span + 1} value={span + 1}>{span + 1}</option>))}
        </select>
      </div>
        </div>
        <div className='w-full mx-5'>
            <div className='mb-6'>
              <label htmlFor="city" className="block text-gray-700">City:</label>
              <input type="text" id="city" placeholder='Enter City / Area' name="city" value={city} onChange={(e) => setCity(e.target.value)} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg"/>
            </div>
            <div className="mb-6">
              <label htmlFor='bridgeName' className="block text-gray-700">Bridge Location:</label>
              <input type="text" id="location" placeholder='Enter Location' name="location" value={location} onChange={(e) => setlocation(e.target.value)} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg"/>
            </div>
            <div className="mb-6">
              <label htmlFor="noofgirders" className="block text-gray-700">Total Number of Girders:</label>
              <select id="noofgirders" name="noofgirders" value={noofgirders} onChange={(e) => setnoofgirders(e.target.value)} className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg">
                {[...Array(50).keys()].map((girder) => (<option key={girder + 1} value={girder + 1}>{girder + 1}</option>))}
              </select>
            </div>
          </div>
        </div><br /><br /> <br />
        <hr />
        <h1 className='text-center text-3xl mt-8 mb-8 font-semibold'>Assign Girders to Individual Spans</h1><hr />
        <div className="bg-gray-100 grid grid-cols-2 overflow-hidden py-8 pt-12 shadow-md mx-12 text-center mt-12 mb-12">
        {Array.from({ length: nobridgespan }).map((_, index) => (
        <div key={index} className="mb-6">
          <label htmlFor={`spanDropdown${index + 1}`} className="block text-gray-700">{`Number of Girders per Span ${index + 1}:`}</label>
          <select 
            id={`spanDropdown${index + 1}`} 
            name={`spanDropdown${index + 1}`} 
            className="p-2 pl-4 w-3/4 overflow-hidden shadow-md outline-0 rounded-lg"
            value={selectedOptions[index]}
            onChange={(e) => handleDropdownChange(index, e.target.value)}
          >
            <option value="option1">1</option>
            <option value="option2">2</option>
            <option value="option3">3</option>
          </select>
        </div>
      ))}
        </div>
          <div className='flex align-center justify-center text-center mt-12 mb-12'>
            <button type="submit" onClick={UserForm} className="bg-blue-600 px-6 mx-2 py-2 text-gray-100 rounded-sm hover:bg-blue-900">Next</button>
            <button onClick={Cancel} className="bg-black px-5 py-2 text-gray-100 rounded-sm hover:bg-white hover:text-black border border-black ml-2">Cancel</button>
          </div>
          
        </form>
      </div>
      )}
      </div>

    </>
  );
};


export default BridgeForm;