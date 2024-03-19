import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import './tailwind.css';


import { FaBridge } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
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
      if(phonenumber.length !== 10){
        enqueueSnackbar('Mobile Number should be exact 10 digits!', { variant: 'error'});
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
    const DelBridge = async() => {
        const response = await axios.delete(`http://localhost:9090/bridge/deletebridge/${id}`)
        if (response.status >= 200 && response.status < 300) {
            console.log(response.data);
            navigate('/home');
        } 
        else {
            console.error('Failed to fetch data:', response.statusText);
        }
    };

    const [bridges, setBridges] = useState([]);
    const [selectedBridge, setSelectedBridge] = useState('');
  
    useEffect(() => {
      const fetchBridges = async () => {
        try {
          const response = await axios.get('http://localhost:9090/bridge/getallbridge');
          setBridges(response.data); // Assuming the response data is an array of bridges
        } catch (error) {
          console.error('Error fetching bridges:', error);
        }
      };
      fetchBridges();
    }, []);
  
    
    const handleBridgeChange = (e) => {
      setSelectedBridge(e.target.value);
    };
  

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
            <button className='pr-2'><MdSearch size={36} /></button>
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
          <div className='w-11/12 ml-28 p-6 pt-24 bg-white'>
            <h1 className='text-center font-semibold text-3xl pb-16'>Register Super Admin</h1>
              <div className='w-full flex px-24'>
                <div className=' grid w-full px-8'>
                  <label htmlFor="name">Name:</label>
                  <input  className='border border-gray-500 p-2 mr-2 rounded mb-12' type="text" value={Name} onChange={(e) => setName(e.target.value)} name="name" required />
                  <label htmlFor="designation">Designation:</label>
                  <input className='border border-gray-500 p-2 mr-2 rounded' type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} name="designation" required />
                </div>

                <div className='grid w-full px-8'>
                  <label htmlFor="companyName">Company Name:</label>
                  <input  className='border border-gray-500 p-2 mr-2 rounded mb-12' type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} name="companyName" required />
                  <label  htmlFor="email">Email id:</label>
                  <input className='border border-gray-500 p-2 mr-2 rounded' type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                </div>
                

              <div className='grid w-full px-8'>
                <label htmlFor="phonenumber">Mobile Number: </label>
                <div className='flex'>
                <select name="countryCode" className='border w-1/3 mb-12 border-gray-500 p-2 mr-1 rounded' value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                <option value="+93">(+93) Afghanistan</option>
                  <option value="+355">(+355) Albania</option>
                  <option value="+213">(+213) Algeria</option>
                  <option value="+376">(+376) Andorra</option>
                  <option value="+244">(+244) Angola</option>
                  <option value="+1264">(+1264) Anguilla</option>
                  <option value="+1268">(+1268) Antigua and Barbuda</option>
                  <option value="+54">(+54) Argentina</option>
                  <option value="+374">(+374) Armenia</option>
                  <option value="+297">(+297) Aruba</option>
                  <option value="+61">(+61) Australia</option>
                  <option value="+43">(+43) Austria</option>
                  <option value="+994">(+994) Azerbaijan</option>
                  <option value="+1242">(+1242) Bahamas</option>
                  <option value="+973">(+973) Bahrain</option>
                  <option value="+880">(+880) Bangladesh</option>
                  <option value="+1246">(+1246) Barbados</option>
                  <option value="+375">(+375) Belarus</option>
                  <option value="+32">(+32) Belgium</option>
                  <option value="+501">(+501) Belize</option>
                  <option value="+229">(+229) Benin</option>
                  <option value="+1441">(+1441) Bermuda</option>
                  <option value="+975">(+975) Bhutan</option>
                  <option value="+591">(+591) Bolivia</option>
                  <option value="+387">(+387) Bosnia and Herzegovina</option>
                  <option value="+267">(+267) Botswana</option>
                  <option value="+55">(+55) Brazil</option>
                  <option value="+246">(+246) British Indian Ocean Territory</option>
                  <option value="+673">(+673) Brunei Darussalam</option>
                  <option value="+359">(+359) Bulgaria</option>
                  <option value="+226">(+226) Burkina Faso</option>
                  <option value="+257">(+257) Burundi</option>
                  <option value="+855">(+855) Cambodia</option>
                  <option value="+237">(+237) Cameroon</option>
                  <option value="+1">(+1) Canada</option>
                  <option value="+238">(+238) Cape Verde</option>
                  <option value="+1345">(+1345) Cayman Islands</option>
                  <option value="+236">(+236) Central African Republic</option>
                  <option value="+235">(+235) Chad</option>
                  <option value="+56">(+56) Chile</option>
                  <option value="+86">(+86) China</option>
                  <option value="+61">(+61) Christmas Island</option>
                  <option value="+672">(+672) Cocos (Keeling) Islands</option>
                  <option value="+57">(+57) Colombia</option>
                  <option value="+269">(+269) Comoros</option>
                  <option value="+242">(+242) Congo</option>
                  <option value="+243">(+243) Congo, the Democratic Republic of the</option>
                  <option value="+682">(+682) Cook Islands</option>
                  <option value="+506">(+506) Costa Rica</option>
                  <option value="+225">(+225) Cote D'Ivoire</option>
                  <option value="+385">(+385) Croatia</option>
                  <option value="+53">(+53) Cuba</option>
                  <option value="+357">(+357) Cyprus</option>
                  <option value="+420">(+420) Czech Republic</option>
                  <option value="+45">(+45) Denmark</option>
                  <option value="+253">(+253) Djibouti</option>
                  <option value="+1767">(+1767) Dominica</option>
                  <option value="+1809">(+1809) Dominican Republic</option>
                  <option value="+593">(+593) Ecuador</option>
                  <option value="+20">(+20) Egypt</option>
                  <option value="+503">(+503) El Salvador</option>
                  <option value="+240">(+240) Equatorial Guinea</option>
                  <option value="+291">(+291) Eritrea</option>
                  <option value="+372">(+372) Estonia</option>
                  <option value="+251">(+251) Ethiopia</option>
                  <option value="+500">(+500) Falkland Islands (Malvinas)</option>
                  <option value="+298">(+298) Faroe Islands</option>
                  <option value="+679">(+679) Fiji</option>
                  <option value="+358">(+358) Finland</option>
                  <option value="+33">(+33) France</option>
                  <option value="+594">(+594) French Guiana</option>
                  <option value="+689">(+689) French Polynesia</option>
                  <option value="+241">(+241) Gabon</option>
                  <option value="+220">(+220) Gambia</option>
                  <option value="+995">(+995) Georgia</option>
                  <option value="+49">(+49) Germany</option>
                  <option value="+233">(+233) Ghana</option>
                  <option value="+350">(+350) Gibraltar</option>
                  <option value="+30">(+30) Greece</option>
                  <option value="+299">(+299) Greenland</option>
                  <option value="+1473">(+1473) Grenada</option>
                  <option value="+590">(+590) Guadeloupe</option>
                  <option value="+1671">(+1671) Guam</option>
                  <option value="+502">(+502) Guatemala</option>
                  <option value="+224">(+224) Guinea</option>
                  <option value="+245">(+245) Guinea-Bissau</option>
                  <option value="+592">(+592) Guyana</option>
                  <option value="+509">(+509) Haiti</option>
                  <option value="+504">(+504) Honduras</option>
                  <option value="+852">(+852) Hong Kong</option>
                  <option value="+36">(+36) Hungary</option>
                  <option value="+354">(+354) Iceland</option>
                  <option value="+91">(+91) India</option>
                  <option value="+62">(+62) Indonesia</option>
                  <option value="+98">(+98) Iran, Islamic Republic of</option>
                  <option value="+964">(+964) Iraq</option>
                  <option value="+353">(+353) Ireland</option>
                  <option value="+972">(+972) Israel</option>
                  <option value="+39">(+39) Italy</option>
                  <option value="+1876">(+1876) Jamaica</option>
                  <option value="+81">(+81) Japan</option>
                  <option value="+962">(+962) Jordan</option>
                  <option value="+7">(+7) Kazakhstan</option>
                  <option value="+254">(+254) Kenya</option>
                  <option value="+686">(+686) Kiribati</option>
                  <option value="+850">(+850) Korea, Democratic People's Republic of</option>
                  <option value="+82">(+82) Korea, Republic of</option>
                  <option value="+965">(+965) Kuwait</option>
                  <option value="+996">(+996) Kyrgyzstan</option>
                  <option value="+856">(+856) Lao People's Democratic Republic</option>
                  <option value="+371">(+371) Latvia</option>
                  <option value="+961">(+961) Lebanon</option>
                  <option value="+266">(+266) Lesotho</option>
                  <option value="+231">(+231) Liberia</option>
                  <option value="+218">(+218) Libya</option>
                  <option value="+423">(+423) Liechtenstein</option>
                  <option value="+370">(+370) Lithuania</option>
                  <option value="+352">(+352) Luxembourg</option>
                  <option value="+853">(+853) Macao</option>
                  <option value="+389">(+389) Macedonia, the Former Yugoslav Republic of</option>
                  <option value="+261">(+261) Madagascar</option>
                  <option value="+265">(+265) Malawi</option>
                  <option value="+60">(+60) Malaysia</option>
                  <option value="+960">(+960) Maldives</option>
                  <option value="+223">(+223) Mali</option>
                  <option value="+356">(+356) Malta</option>
                  <option value="+692">(+692) Marshall Islands</option>
                  <option value="+596">(+596) Martinique</option>
                  <option value="+222">(+222) Mauritania</option>
                  <option value="+230">(+230) Mauritius</option>
                  <option value="+52">(+52) Mexico</option>
                  <option value="+691">(+691) Micronesia, Federated States of</option>
                  <option value="+373">(+373) Moldova, Republic of</option>
                  <option value="+377">(+377) Monaco</option>
                  <option value="+976">(+976) Mongolia</option>
                  <option value="+382">(+382) Montenegro</option>
                  <option value="+1664">(+1664) Montserrat</option>
                  <option value="+212">(+212) Morocco</option>
                  <option value="+258">(+258) Mozambique</option>
                  <option value="+95">(+95) Myanmar</option>
                  <option value="+264">(+264) Namibia</option>
                  <option value="+674">(+674) Nauru</option>
                  <option value="+977">(+977) Nepal</option>
                  <option value="+31">(+31) Netherlands</option>
                  <option value="+599">(+599) Netherlands Antilles</option>
                  <option value="+687">(+687) New Caledonia</option>
                  <option value="+64">(+64) New Zealand</option>
                  <option value="+505">(+505) Nicaragua</option>
                  <option value="+227">(+227) Niger</option>
                  <option value="+234">(+234) Nigeria</option>
                  <option value="+683">(+683) Niue</option>
                  <option value="+672">(+672) Norfolk Island</option>
                  <option value="+47">(+47) Norway</option>
                  <option value="+968">(+968) Oman</option>
                  <option value="+92">(+92) Pakistan</option>
                  <option value="+680">(+680) Palau</option>
                  <option value="+507">(+507) Panama</option>
                  <option value="+675">(+675) Papua New Guinea</option>
                  <option value="+595">(+595) Paraguay</option>
                  <option value="+51">(+51) Peru</option>
                  <option value="+63">(+63) Philippines</option>
                  <option value="+48">(+48) Poland</option>
                  <option value="+351">(+351) Portugal</option>
                  <option value="+974">(+974) Qatar</option>
                  <option value="+40">(+40) Romania</option>
                  <option value="+7">(+7) Russian Federation</option>
                  <option value="+250">(+250) Rwanda</option>
                  <option value="+1869">(+1869) Saint Kitts and Nevis</option>
                  <option value="+1758">(+1758) Saint Lucia</option>
                  <option value="+1784">(+1784) Saint Vincent and the Grenadines</option>
                  <option value="+684">(+684) Samoa</option>
                  <option value="+378">(+378) San Marino</option>
                  <option value="+239">(+239) Sao Tome and Principe</option>
                  <option value="+221">(+221) Senegal</option>
                  <option value="+381">(+381) Serbia</option>
                  <option value="+248">(+248) Seychelles</option>
                  <option value="+232">(+232) Sierra Leone</option>
                  <option value="+65">(+65) Singapore</option>
                  <option value="+421">(+421) Slovakia</option>
                  <option value="+386">(+386) Slovenia</option>
                  <option value="+677">(+677) Solomon Islands</option>
                  <option value="+252">(+252) Somalia</option>
                  <option value="+27">(+27) South Africa</option>
                  <option value="+34">(+34) Spain</option>
                  <option value="+94">(+94) Sri Lanka</option>
                  <option value="+249">(+249) Sudan</option>
                  <option value="+597">(+597) Suriname</option>
                  <option value="+268">(+268) Swaziland</option>
                  <option value="+46">(+46) Sweden</option>
                  <option value="+41">(+41) Switzerland</option>
                  <option value="+963">(+963) Syrian Arab Republic</option>
                  <option value="+886">(+886) Taiwan, Province of China</option>
                  <option value="+992">(+992) Tajikistan</option>
                  <option value="+255">(+255) Tanzania, United Republic of</option>
                  <option value="+66">(+66) Thailand</option>
                  <option value="+228">(+228) Togo</option>
                  <option value="+690">(+690) Tokelau</option>
                  <option value="+676">(+676) Tonga</option>
                  <option value="+1868">(+1868) Trinidad and Tobago</option>
                  <option value="+216">(+216) Tunisia</option>
                  <option value="+90">(+90) Turkey</option>
                  <option value="+993">(+993) Turkmenistan</option>
                  <option value="+688">(+688) Tuvalu</option>
                  <option value="+256">(+256) Uganda</option>
                  <option value="+380">(+380) Ukraine</option>
                  <option value="+971">(+971) United Arab Emirates</option>
                  <option value="+44">(+44) United Kingdom</option>
                  <option value="+1">(+1) United States</option>
                  <option value="+598">(+598) Uruguay</option>
                  <option value="+998">(+998) Uzbekistan</option>
                  <option value="+678">(+678) Vanuatu</option>
                  <option value="+58">(+58) Venezuela</option>
                  <option value="+84">(+84) Vietnam</option>
                  <option value="+1340">(+1340) Virgin Islands, U.S.</option>
                  <option value="+967">(+967) Yemen</option>
                  <option value="+260">(+260) Zambia</option>
                  <option value="+263">(+263) Zimbabwe</option>
                  <option value="+358">(+358) Åland Islands</option>
                </select>
                  <input type="text" className='border border-gray-500 p-2 mr-2 rounded mb-12 w-4/5' name="phonenumber" value={phonenumber} onChange={(e) => setphonenumber(e.target.value)} minLength="10" maxLength="10" required/>
                </div>
                  <label className='' htmlFor="Role">Role:</label>
                  <input type="text" className='border border-gray-500 p-2 mr-2 rounded' value={role} name="superadmin" readOnly/>
              </div>
            </div>
            <div className='text-center py-12'>
            {loading ? (
                <img id='Licon-masterform' className='absolute' src={loadingIcon} alt="Loading" />
              ) : (
                <button className='p-2 px-6 rounded-sm bg-blue-600 text-white hover:bg-blue-900' onClick={submitForm}>Submit</button>
          )}
            </div>
          </div>
          </form>
        </>
      )}


      {showBridgeDashboard && (
        <div className='w-11/12 ml-28 p-6 pt-24 bg-white'>
              <div>
              <select className='w-1/2 border border-gray-600 rounded-sm p-2' id="bridge" value={selectedBridge} onChange={handleBridgeChange}>
                <option value="">Select a bridge</option>
                {bridges.map((bridge) => (
                  <option key={bridge.id} value={bridge.id}>{bridge.name}</option>
                ))}
                <button className='p-2 mx-5 rounded-sm text-white bg-black hover:bg-white hover:text-black border border-black' onClick={DelBridge}>Delete Bridge</button>
              </select>
              {selectedBridge && <p>You selected: {selectedBridge}</p>}
            </div>
        </div>
      )}

</>

  )
};
export default Masterhome;