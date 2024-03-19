import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import './tailwind.css';

import loadingIcon from '../Assets/loading.gif';
import logo from '../Assets/logo2.png';

import { IoIosArrowDown, IoIosWarning } from "react-icons/io";
import { IoArrowBackCircleSharp } from "react-icons/io5";



const BridgeForm = ({onSubmit }) => {
  
  const [country, setCountry] = useState('');
  const [admin1countryCode , setCountryCode1] = useState('code');
  const [admin2countryCode , setCountryCode2] = useState('code');
  const [admin3countryCode , setCountryCode3] = useState('code');
  const [manager1countryCode , setCountryCode4] = useState('code');
  const [manager2countryCode , setCountryCode5] = useState('code');
  const [manager3countryCode , setCountryCode6] = useState('code');
  const [manager4countryCode , setCountryCode7] = useState('code');
  const [manager5countryCode , setCountryCode8] = useState('code');
  const [manager6countryCode , setCountryCode9] = useState('code');
  const [owner1countryCode , setCountryCode10] = useState('code');
  const [owner2countryCode , setCountryCode11] = useState('code');
  const [owner3countryCode , setCountryCode12] = useState('code');
  const [state, setState] = useState('');
  const [coordinates, setCoordinates] =useState('');
  const [division, setDivision] = useState('');
  const [bridgeName, setBridgeName] = useState('');
  const [location, setlocation] = useState('');
  const [nobridgespan, setnobridgespan] = useState('1');
  const [noofgirders, setnoofgirders] = useState('1');

  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
  const navigate = useNavigate();
  const countries = ['India', 'USA', 'Australia']; 
  const statesByCountry = {
    India: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
    USA: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    Australia: ['Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland', 'South Australia', 'Tasmania', 'Victoria', 'Western Australia'],
  }; 

  
  const[showUserForm, setShowUserForm] = useState(false);
  const[showBridgeForm, setShowBridgeForm] = useState(true);

  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showManagerForm, setShowManagerForm] = useState(false);
  const [showOwnerForm, setShowOwnerForm] = useState(false); 

  const [showBackendError,setBackendError]=useState(false);
  const [showUserError0, setshowUserError0] =useState(false);
  const [showUserError1, setshowUserError1] =useState(false);
  const [showUserError2, setshowUserError2] =useState(false);


  const [showUserError3, setshowUserError3] =useState(false);

  const [showUserError31, setshowUserError31] =useState(false);
  const [showUserError32, setshowUserError32] =useState(false);
  const [showUserError33, setshowUserError33] =useState(false);
  const [showUserError34, setshowUserError34] =useState(false);
  const [showUserError35, setshowUserError35] =useState(false);
  const [showUserError36, setshowUserError36] =useState(false);
  const [showUserError37, setshowUserError37] =useState(false);
  const [showUserError38, setshowUserError38] =useState(false);
  const [showUserError39, setshowUserError39] =useState(false);

  const [showUserError31a, setshowUserError31a] =useState(false);
  const [showUserError32b, setshowUserError32b] =useState(false);
  const [showUserError33c, setshowUserError33c] =useState(false);
  const [showUserError34d, setshowUserError34d] =useState(false);
  const [showUserError35e, setshowUserError35e] =useState(false);
  const [showUserError36f, setshowUserError36f] =useState(false);
  const [showUserError37g, setshowUserError37g] =useState(false);
  const [showUserError38h, setshowUserError38h] =useState(false);
  const [showUserError39i, setshowUserError39i] =useState(false);


  const [showUserError4, setshowUserError4] =useState(false);

  const [showUserError41, setshowUserError41] =useState(false);
  const [showUserError42, setshowUserError42] =useState(false);
  const [showUserError43, setshowUserError43] =useState(false);
  const [showUserError44, setshowUserError44] =useState(false);
  const [showUserError45, setshowUserError45] =useState(false);
  const [showUserError46, setshowUserError46] =useState(false);
  const [showUserError47, setshowUserError47] =useState(false);
  const [showUserError48, setshowUserError48] =useState(false);
  const [showUserError49, setshowUserError49] =useState(false);

  const [showUserError4a, setshowUserError4a] =useState(false);
  const [showUserError4b, setshowUserError4b] =useState(false);
  const [showUserError4c, setshowUserError4c] =useState(false);
  const [showUserError4d, setshowUserError4d] =useState(false);
  const [showUserError4e, setshowUserError4e] =useState(false);
  const [showUserError4f, setshowUserError4f] =useState(false);
  const [showUserError4g, setshowUserError4g] =useState(false);
  const [showUserError4h, setshowUserError4h] =useState(false);
  const [showUserError4i, setshowUserError4i] =useState(false);

  const [showUserError411, setshowUserError411] =useState(false);
  const [showUserError422, setshowUserError422] =useState(false);
  const [showUserError433, setshowUserError433] =useState(false);
  const [showUserError444, setshowUserError444] =useState(false);
  const [showUserError455, setshowUserError455] =useState(false);
  const [showUserError466, setshowUserError466] =useState(false);
  const [showUserError477, setshowUserError477] =useState(false);
  const [showUserError488, setshowUserError488] =useState(false);
  const [showUserError499, setshowUserError499] =useState(false);
  
  const [showUserError41a, setshowUserError41a] =useState(false);
  const [showUserError42b, setshowUserError42b] =useState(false);
  const [showUserError43c, setshowUserError43c] =useState(false);
  const [showUserError44d, setshowUserError44d] =useState(false);
  const [showUserError45e, setshowUserError45e] =useState(false);
  const [showUserError46f, setshowUserError46f] =useState(false);
  const [showUserError47g, setshowUserError47g] =useState(false);
  const [showUserError48h, setshowUserError48h] =useState(false);
  const [showUserError49i, setshowUserError49i] =useState(false);

  const [showUserError411a, setshowUserError411a] =useState(false);
  const [showUserError422b, setshowUserError422b] =useState(false);
  const [showUserError433c, setshowUserError433c] =useState(false);
  const [showUserError444d, setshowUserError444d] =useState(false);
  const [showUserError455e, setshowUserError455e] =useState(false);
  const [showUserError466f, setshowUserError466f] =useState(false);
  const [showUserError477g, setshowUserError477g] =useState(false);
  const [showUserError488h, setshowUserError488h] =useState(false);
  const [showUserError499i, setshowUserError499i] =useState(false);


  const [showUserError5, setshowUserError5] =useState(false);

  const [showUserError51, setshowUserError51] =useState(false);
  const [showUserError52, setshowUserError52] =useState(false);
  const [showUserError53, setshowUserError53] =useState(false);
  const [showUserError54, setshowUserError54] =useState(false);
  const [showUserError55, setshowUserError55] =useState(false);
  const [showUserError56, setshowUserError56] =useState(false);
  const [showUserError57, setshowUserError57] =useState(false);
  const [showUserError58, setshowUserError58] =useState(false);
  const [showUserError59, setshowUserError59] =useState(false);

  const [showUserError51a, setshowUserError51a] =useState(false);
  const [showUserError52b, setshowUserError52b] =useState(false);
  const [showUserError53c, setshowUserError53c] =useState(false);
  const [showUserError54d, setshowUserError54d] =useState(false);
  const [showUserError55e, setshowUserError55e] =useState(false);
  const [showUserError56f, setshowUserError56f] =useState(false);
  const [showUserError57g, setshowUserError57g] =useState(false);
  const [showUserError58h, setshowUserError58h] =useState(false);
  const [showUserError59i, setshowUserError59i] =useState(false);

  
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

  const UserForm = async(e) => {
    e.preventDefault();
    if(!country || !state || !nobridgespan || !noofgirders || !coordinates || !division || !location || !bridgeName){
      enqueueSnackbar('Please fill all the fields!', { variant: 'error'});
    }
    else{
      enqueueSnackbar('Data entered successfully!', { variant: 'success'});
      setShowUserForm(!showUserForm);
      setShowBridgeForm(false);
    }
  };

  const CancelBridgeForm = () => {
    setCountry('');
    setState('');
    setnobridgespan('');
    setnoofgirders('');
    setDivision('');
    setCoordinates('');
    setBridgeName('');
    setlocation('');
  };

  const Cancel = () => {
    CancelBridgeForm();
  };

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

  const submitForm = async (e) => {
    e.preventDefault();
    if(adminName ==='' || adminEmail === '' || adminPhone === ''){
      setshowUserError0(true);
      setTimeout(() => {
        setshowUserError0(false);
    }, 5000);
    }
    else if(managerName === '' || managerEmail === '' || managerPhone === ''){
      setshowUserError1(true);
      setTimeout(() => {
        setshowUserError1(false);
    }, 5000);
    }
    else if(ownerName === '' || ownerEmail === '' || ownerPhone === ''){
      setshowUserError2(true);
      setTimeout(() => {
        setshowUserError2(false);
    }, 5000);
    }
    else if(adminPhone.length !== 10){
      setshowUserError3(true);
      setTimeout(() => {
        setshowUserError3(false);
    }, 5000);
    }
    else if(adminName2.length === 0 && adminEmail2.length >  0 && adminPhone2.length === 10){
      setshowUserError31(true);
      setTimeout(() => {
        setshowUserError31(false);
    }, 5000);
    }
    else if(adminName2.length > 0 && adminEmail2.length ===  0 && adminPhone2.length === 10){
      setshowUserError32(true);
      setTimeout(() => {
        setshowUserError32(false);
    }, 5000);
    }
    else if(adminName2.length > 0 && adminEmail2.length >  0 && adminPhone2.length === 0){
      setshowUserError33(true);
      setTimeout(() => {
        setshowUserError33(false);
    }, 5000);
    }
    else if(adminName2.length === 0 && adminEmail2.length >  0 && adminPhone2.length === 0){
      setshowUserError34(true);
      setTimeout(() => {
        setshowUserError34(false);
    }, 5000);
    }
    else if(adminName2.length > 0 && adminEmail2.length ===  0 && adminPhone2.length === 0){
      setshowUserError35(true);
      setTimeout(() => {
        setshowUserError35(false);
    }, 5000);
    }
    else if(adminName2.length === 0 && adminEmail2.length ===  0 && adminPhone2.length === 10){
      setshowUserError36(true);
      setTimeout(() => {
        setshowUserError36(false);
    }, 5000);
    }
    else if(adminName2.length > 0 && adminEmail2.length >  0 && adminPhone2.length !== 10){
      setshowUserError37(true);
      setTimeout(() => {
        setshowUserError37(false);
    }, 5000);
    }
    else if(adminName2.length === 0 && adminEmail2.length >  0 && adminPhone2.length !== 10){
      setshowUserError38(true);
      setTimeout(() => {
        setshowUserError38(false);
    }, 5000);
    }
    else if(adminName2.length > 0 && adminEmail2.length ===  0 && adminPhone2.length !== 10){
      setshowUserError39(true);
      setTimeout(() => {
        setshowUserError39(false);
    }, 5000);
    }
    else if(adminName3.length === 0 && adminEmail3.length >  0 && adminPhone3.length === 10){
      setshowUserError31a(true);
      setTimeout(() => {
        setshowUserError31a(false);
    }, 5000);
    }
    else if(adminName3.length > 0 && adminEmail3.length ===  0 && adminPhone3.length === 10){
      setshowUserError32b(true);
      setTimeout(() => {
        setshowUserError32b(false);
    }, 5000);
    }
    else if(adminName3.length > 0 && adminEmail3.length >  0 && adminPhone3.length === 0){
      setshowUserError33c(true);
      setTimeout(() => {
        setshowUserError33c(false);
    }, 5000);
    }
    else if(adminName3.length === 0 && adminEmail3.length >  0 && adminPhone3.length === 0){
      setshowUserError34d(true);
      setTimeout(() => {
        setshowUserError34d(false);
    }, 5000);
    }
    else if(adminName3.length > 0 && adminEmail3.length ===  0 && adminPhone3.length === 0){
      setshowUserError35e(true);
      setTimeout(() => {
        setshowUserError35e(false);
    }, 5000);
    }
    else if(adminName3.length === 0 && adminEmail3.length ===  0 && adminPhone3.length === 10){
      setshowUserError36f(true);
      setTimeout(() => {
        setshowUserError36f(false);
    }, 5000);
    }
    else if(adminName3.length > 0 && adminEmail3.length >  0 && adminPhone3.length !== 10){
      setshowUserError37g(true);
      setTimeout(() => {
        setshowUserError37g(false);
    }, 5000);
    }
    else if(adminName3.length === 0 && adminEmail3.length >  0 && adminPhone3.length !== 10){
      setshowUserError38h(true);
      setTimeout(() => {
        setshowUserError38h(false);
    }, 5000);
    }
    else if(adminName3.length > 0 && adminEmail3.length ===  0 && adminPhone3.length !== 10){
      setshowUserError39i(true);
      setTimeout(() => {
        setshowUserError39i(false);
    }, 5000);
    }

    
    else if(managerPhone.length !== 10){
      setshowUserError4(true);
      setTimeout(() => {
        setshowUserError4(false);
    }, 5000);
    }
    else if(managerName2.length === 0 && managerEmail2.length >  0 && managerPhone2.length === 10){
      setshowUserError41(true);
      setTimeout(() => {
        setshowUserError41(false);
    }, 5000);
    }
    else if(managerName2.length > 0 && managerEmail2.length ===  0 && managerPhone2.length === 10){
      setshowUserError42(true);
      setTimeout(() => {
        setshowUserError42(false);
    }, 5000);
    }
    else if(managerName2.length > 0 && managerEmail2.length >  0 && managerPhone2.length === 0){
      setshowUserError43(true);
      setTimeout(() => {
        setshowUserError43(false);
    }, 5000);
    }
    else if(managerName2.length === 0 && managerEmail2.length >  0 && managerPhone2.length === 0){
      setshowUserError44(true);
      setTimeout(() => {
        setshowUserError44(false);
    }, 5000);
    }
    else if(managerName2.length > 0 && managerEmail2.length ===  0 && managerPhone2.length === 0){
      setshowUserError45(true);
      setTimeout(() => {
        setshowUserError45(false);
    }, 5000);
    }
    else if(managerName2.length === 0 && managerEmail2.length ===  0 && managerPhone2.length === 10){
      setshowUserError46(true);
      setTimeout(() => {
        setshowUserError46(false);
    }, 5000);
    }
    else if(managerName2.length > 0 && managerEmail2.length >  0 && managerPhone2.length !== 10){
      setshowUserError47(true);
      setTimeout(() => {
        setshowUserError47(false);
    }, 5000);
    }
    else if(managerName2.length === 0 && managerEmail2.length >  0 && managerPhone2.length !== 10){
      setshowUserError48(true);
      setTimeout(() => {
        setshowUserError48(false);
    }, 5000);
    }
    else if(managerName2.length > 0 && managerEmail2.length ===  0 && managerPhone2.length !== 10){
      setshowUserError49(true);
      setTimeout(() => {
        setshowUserError49(false);
    }, 5000);
    }
    else if(managerName3.length === 0 && managerEmail3.length >  0 && managerPhone3.length === 10){
      setshowUserError4a(true);
      setTimeout(() => {
        setshowUserError4a(false);
    }, 5000);
    }
    else if(managerName3.length > 0 && managerEmail3.length ===  0 && managerPhone3.length === 10){
      setshowUserError4b(true);
      setTimeout(() => {
        setshowUserError4b(false);
    }, 5000);
    }
    else if(managerName3.length > 0 && managerEmail3.length >  0 && managerPhone3.length === 0){
      setshowUserError4c(true);
      setTimeout(() => {
        setshowUserError4c(false);
    }, 5000);
    }
    else if(managerName3.length === 0 && managerEmail3.length >  0 && managerPhone3.length === 0){
      setshowUserError4d(true);
      setTimeout(() => {
        setshowUserError4d(false);
    }, 5000);
    }
    else if(managerName3.length > 0 && managerEmail3.length ===  0 && managerPhone3.length === 0){
      setshowUserError4e(true);
      setTimeout(() => {
        setshowUserError4e(false);
    }, 5000);
    }
    else if(managerName3.length === 0 && managerEmail3.length ===  0 && managerPhone3.length === 10){
      setshowUserError4f(true);
      setTimeout(() => {
        setshowUserError4f(false);
    }, 5000);
    }
    else if(managerName3.length > 0 && managerEmail3.length >  0 && managerPhone3.length !== 10){
      setshowUserError4g(true);
      setTimeout(() => {
        setshowUserError4g(false);
    }, 5000);
    }
    else if(managerName3.length === 0 && managerEmail3.length >  0 && managerPhone3.length !== 10){
      setshowUserError4h(true);
      setTimeout(() => {
        setshowUserError4h(false);
    }, 5000);
    }
    else if(managerName3.length > 0 && managerEmail3.length ===  0 && managerPhone3.length !== 10){
      setshowUserError4i(true);
      setTimeout(() => {
        setshowUserError4i(false);
    }, 5000);
    }

    else if(managerName4.length === 0 && managerEmail4.length >  0 && managerPhone4.length === 10){
      setshowUserError411(true);
      setTimeout(() => {
        setshowUserError411(false);
    }, 5000);
    }
    else if(managerName4.length > 0 && managerEmail4.length ===  0 && managerPhone4.length === 10){
      setshowUserError422(true);
      setTimeout(() => {
        setshowUserError422(false);
    }, 5000);
    }
    else if(managerName4.length > 0 && managerEmail4.length >  0 && managerPhone4.length === 0){
      setshowUserError433(true);
      setTimeout(() => {
        setshowUserError433(false);
    }, 5000);
    }
    else if(managerName4.length === 0 && managerEmail4.length >  0 && managerPhone4.length === 0){
      setshowUserError444(true);
      setTimeout(() => {
        setshowUserError444(false);
    }, 5000);
    }
    else if(managerName4.length > 0 && managerEmail4.length ===  0 && managerPhone4.length === 0){
      setshowUserError455(true);
      setTimeout(() => {
        setshowUserError455(false);
    }, 5000);
    }
    else if(managerName4.length === 0 && managerEmail4.length ===  0 && managerPhone4.length === 10){
      setshowUserError466(true);
      setTimeout(() => {
        setshowUserError466(false);
    }, 5000);
    }
    else if(managerName4.length > 0 && managerEmail4.length >  0 && managerPhone4.length !== 10){
      setshowUserError477(true);
      setTimeout(() => {
        setshowUserError477(false);
    }, 5000);
    }
    else if(managerName4.length === 0 && managerEmail4.length >  0 && managerPhone4.length !== 10){
      setshowUserError488(true);
      setTimeout(() => {
        setshowUserError488(false);
    }, 5000);
    }
    else if(managerName4.length > 0 && managerEmail4.length ===  0 && managerPhone4.length !== 10){
      setshowUserError499(true);
      setTimeout(() => {
        setshowUserError499(false);
    }, 5000);
    }
    else if(managerName5.length === 0 && managerEmail5.length >  0 && managerPhone5.length === 10){
      setshowUserError41a(true);
      setTimeout(() => {
        setshowUserError41a(false);
    }, 5000);
    }
    else if(managerName5.length > 0 && managerEmail5.length ===  0 && managerPhone5.length === 10){
      setshowUserError42b(true);
      setTimeout(() => {
        setshowUserError42b(false);
    }, 5000);
    }
    else if(managerName5.length > 0 && managerEmail5.length >  0 && managerPhone5.length === 0){
      setshowUserError43c(true);
      setTimeout(() => {
        setshowUserError43c(false);
    }, 5000);
    }
    else if(managerName5.length === 0 && managerEmail5.length >  0 && managerPhone5.length === 0){
      setshowUserError44d(true);
      setTimeout(() => {
        setshowUserError44d(false);
    }, 5000);
    }
    else if(managerName5.length > 0 && managerEmail5.length ===  0 && managerPhone5.length === 0){
      setshowUserError45e(true);
      setTimeout(() => {
        setshowUserError45e(false);
    }, 5000);
    }
    else if(managerName5.length === 0 && managerEmail5.length ===  0 && managerPhone5.length === 10){
      setshowUserError46f(true);
      setTimeout(() => {
        setshowUserError46f(false);
    }, 5000);
    }
    else if(managerName5.length > 0 && managerEmail5.length >  0 && managerPhone5.length !== 10){
      setshowUserError47g(true);
      setTimeout(() => {
        setshowUserError47g(false);
    }, 5000);
    }
    else if(managerName5.length === 0 && managerEmail5.length >  0 && managerPhone5.length !== 10){
      setshowUserError48h(true);
      setTimeout(() => {
        setshowUserError48h(false);
    }, 5000);
    }
    else if(managerName5.length > 0 && managerEmail5.length ===  0 && managerPhone5.length !== 10){
      setshowUserError49i(true);
      setTimeout(() => {
        setshowUserError49i(false);
    }, 5000);
    }
    else if(managerName6.length === 0 && managerEmail6.length >  0 && managerPhone6.length === 10){
      setshowUserError411a(true);
      setTimeout(() => {
        setshowUserError411a(false);
    }, 5000);
    }
    else if(managerName6.length > 0 && managerEmail6.length ===  0 && managerPhone6.length === 10){
      setshowUserError422b(true);
      setTimeout(() => {
        setshowUserError422b(false);
    }, 5000);
    }
    else if(managerName6.length > 0 && managerEmail6.length >  0 && managerPhone6.length === 0){
      setshowUserError433c(true);
      setTimeout(() => {
        setshowUserError433c(false);
    }, 5000);
    }
    else if(managerName6.length === 0 && managerEmail6.length >  0 && managerPhone6.length === 0){
      setshowUserError444d(true);
      setTimeout(() => {
        setshowUserError444d(false);
    }, 5000);
    }
    else if(managerName6.length > 0 && managerEmail6.length ===  0 && managerPhone6.length === 0){
      setshowUserError455e(true);
      setTimeout(() => {
        setshowUserError455e(false);
    }, 5000);
    }
    else if(managerName6.length === 0 && managerEmail6.length ===  0 && managerPhone6.length === 10){
      setshowUserError466f(true);
      setTimeout(() => {
        setshowUserError466f(false);
    }, 5000);
    }
    else if(managerName6.length > 0 && managerEmail6.length >  0 && managerPhone6.length !== 10){
      setshowUserError477g(true);
      setTimeout(() => {
        setshowUserError477g(false);
    }, 5000);
    }
    else if(managerName6.length === 0 && managerEmail6.length >  0 && managerPhone6.length !== 10){
      setshowUserError488h(true);
      setTimeout(() => {
        setshowUserError488h(false);
    }, 5000);
    }
    else if(managerName6.length > 0 && managerEmail6.length ===  0 && managerPhone6.length !== 10){
      setshowUserError499i(true);
      setTimeout(() => {
        setshowUserError499i(false);
    }, 5000);
    }


    else if(ownerPhone.length !== 10){
      setshowUserError5(true);
      setTimeout(() => {
        setshowUserError5(false);
    }, 5000);
    }
    else if(ownerName2.length === 0 && ownerEmail2.length >  0 && ownerPhone2.length === 10){
      setshowUserError51(true);
      setTimeout(() => {
        setshowUserError51(false);
    }, 5000);
    }
    else if(ownerName2.length > 0 && ownerEmail2.length ===  0 && ownerPhone2.length === 10){
      setshowUserError52(true);
      setTimeout(() => {
        setshowUserError52(false);
    }, 5000);
    }
    else if(ownerName2.length > 0 && ownerEmail2.length >  0 && ownerPhone2.length === 0){
      setshowUserError53(true);
      setTimeout(() => {
        setshowUserError53(false);
    }, 5000);
    }
    else if(ownerName2.length === 0 && ownerEmail2.length >  0 && ownerPhone2.length === 0){
      setshowUserError54(true);
      setTimeout(() => {
        setshowUserError54(false);
    }, 5000);
    }
    else if(ownerName2.length > 0 && ownerEmail2.length ===  0 && ownerPhone2.length === 0){
      setshowUserError55(true);
      setTimeout(() => {
        setshowUserError55(false);
    }, 5000);
    }
    else if(ownerName2.length === 0 && ownerEmail2.length ===  0 && ownerPhone2.length === 10){
      setshowUserError56(true);
      setTimeout(() => {
        setshowUserError56(false);
    }, 5000);
    }
    else if(ownerName2.length > 0 && ownerEmail2.length >  0 && ownerPhone2.length !== 10){
      setshowUserError57(true);
      setTimeout(() => {
        setshowUserError57(false);
    }, 5000);
    }
    else if(ownerName2.length === 0 && ownerEmail2.length >  0 && ownerPhone2.length !== 10){
      setshowUserError58(true);
      setTimeout(() => {
        setshowUserError58(false);
    }, 5000);
    }
    else if(ownerName2.length > 0 && ownerEmail2.length ===  0 && ownerPhone2.length !== 10){
      setshowUserError59(true);
      setTimeout(() => {
        setshowUserError59(false);
    }, 5000);
    }
    else if(ownerName3.length === 0 && ownerEmail3.length >  0 && ownerPhone3.length === 10){
      setshowUserError51a(true);
      setTimeout(() => {
        setshowUserError51a(false);
    }, 5000);
    }
    else if(ownerName3.length > 0 && ownerEmail3.length ===  0 && ownerPhone3.length === 10){
      setshowUserError52b(true);
      setTimeout(() => {
        setshowUserError52b(false);
    }, 5000);
    }
    else if(ownerName3.length > 0 && ownerEmail3.length >  0 && ownerPhone3.length === 0){
      setshowUserError53c(true);
      setTimeout(() => {
        setshowUserError53c(false);
    }, 5000);
    }
    else if(ownerName3.length === 0 && ownerEmail3.length >  0 && ownerPhone3.length === 0){
      setshowUserError54d(true);
      setTimeout(() => {
        setshowUserError54d(false);
    }, 5000);
    }
    else if(ownerName3.length > 0 && ownerEmail3.length ===  0 && ownerPhone3.length === 0){
      setshowUserError55e(true);
      setTimeout(() => {
        setshowUserError55e(false);
    }, 5000);
    }
    else if(ownerName3.length === 0 && ownerEmail3.length ===  0 && ownerPhone3.length === 10){
      setshowUserError56f(true);
      setTimeout(() => {
        setshowUserError56f(false);
    }, 5000);
    }
    else if(ownerName3.length > 0 && ownerEmail3.length >  0 && ownerPhone3.length !== 10){
      setshowUserError57g(true);
      setTimeout(() => {
        setshowUserError57g(false);
    }, 5000);
    }
    else if(ownerName3.length === 0 && ownerEmail3.length >  0 && ownerPhone3.length !== 10){
      setshowUserError58h(true);
      setTimeout(() => {
        setshowUserError58h(false);
    }, 5000);
    }
    else if(ownerName3.length > 0 && ownerEmail3.length ===  0 && ownerPhone3.length !== 10){
      setshowUserError59i(true);
      setTimeout(() => {
        setshowUserError59i(false);
    }, 5000);
    }
    else{
        try {
          setLoading(true);
          const response = await axios.post('http://localhost:9090/bridge/register', {
            country:country,
            state:state,
            nobridgespan:nobridgespan,
            noofgirders:noofgirders,
            division:division,
            coordinates:coordinates,
            bridgeName:bridgeName,
            location:location,

            admin1countryCode: admin1countryCode,
            admin2countryCode: admin2countryCode,
            admin3countryCode: admin3countryCode,

            owner1countryCode: owner1countryCode,
            owner2countryCode: owner2countryCode,
            owner3countryCode: owner3countryCode,

            manager1countryCode: manager1countryCode,
            manager2countryCode: manager2countryCode,
            manager3countryCode: manager3countryCode,
            manager4countryCode: manager4countryCode,
            manager5countryCode: manager5countryCode,
            manager6countryCode: manager6countryCode,

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
          localStorage.setItem('noofgirders', noofgirders);
          localStorage.setItem('nobridgespan', nobridgespan);
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
          console.log(response.data.message);

         if (response.data.message.includes('User details do not match.')) {
            setBackendError(true);
            setTimeout(() => {
              setBackendError(false);
          }, 5000);
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
          <button type="submit" onClick={PrevFrom} className="inline-flex underline mt-4 p-2 hover:text-blue-800"><IoArrowBackCircleSharp size={32}/>Back</button>
        <div className='text-center justify-center flex'>
          <img className='' src={logo} alt="" />
          {showBackendError && (
            <div className='absolute text-center w-full flex justify-center items-center'>
            <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Existing Users Details Not Matched! </h1>
          </div>
          )}
          { showUserError0 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Please Add Atleast One Admin!</h1>
            </div>
          )}
        { showUserError1 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Please Add Atleast One Manager!</h1>
            </div>
          )}
        { showUserError2 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Please Add Atleast One Owner!</h1>
            </div>
          )}
        { showUserError3 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError31 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Please Enter Name!</h1>
            </div>
          )}
        { showUserError32 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Please Enter email!</h1>
            </div>
          )}
        { showUserError33 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError34 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError35 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError36 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError37 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError38 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError39 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 2: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError31a && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Please Enter Name!</h1>
            </div>
          )}
        { showUserError32b && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Please Enter email!</h1>
            </div>
          )}
        { showUserError33c && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError34d && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError35e && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError36f && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError37g && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError38h && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError39i && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Admin 3: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}


        { showUserError41 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Please Enter Name!</h1>
            </div>
          )}
        { showUserError42 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Please Enter email!</h1>
            </div>
          )}
        { showUserError43 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError44 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError45 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError46 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError47 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError48 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError49 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 2: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError4a && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Please Enter Name!</h1>
            </div>
          )}
        { showUserError4b && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Please Enter email!</h1>
            </div>
          )}
        { showUserError4c && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError4d && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError4e && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError4f && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError4g && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError4h && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError4i && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 3: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError411 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Please Enter Name!</h1>
            </div>
          )}
        { showUserError422 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Please Enter email!</h1>
            </div>
          )}
        { showUserError433 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError444 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError455 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError466 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError477 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError488 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError499 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 4: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError41a && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Please Enter Name!</h1>
            </div>
          )}
        { showUserError42b && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Please Enter email!</h1>
            </div>
          )}
        { showUserError43c && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError44d && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError45e && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError46f && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError47g && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError48h && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError49i && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 5: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
          { showUserError411a && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Please Enter Name!</h1>
            </div>
          )}
        { showUserError422b && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Please Enter email!</h1>
            </div>
          )}
        { showUserError433c && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError444d && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError455e && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError466f && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError477g && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError488h && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError499i && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager 6: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}


        { showUserError51 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Please Enter Name!</h1>
            </div>
          )}
        { showUserError52 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Please Enter email!</h1>
            </div>
          )}
        { showUserError53 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError54 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError55 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError56 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError57 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError58 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError59 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 2: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError51a && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Please Enter Name!</h1>
            </div>
          )}
        { showUserError52b && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Please Enter email!</h1>
            </div>
          )}
        { showUserError53c && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Please Enter Mobile Number!</h1>
            </div>
          )}
        { showUserError54d && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Please Enter Name and Mobile Number!</h1>
            </div>
          )}
        { showUserError55e && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Please Enter email and Mobile Number!</h1>
            </div>
          )}
        { showUserError56f && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Please Enter Name and email!</h1>
            </div>
          )}
        { showUserError57g && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError58h && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Enter Name and Mobile Number must be 10 digits!</h1>
            </div>
          )}
        { showUserError59i && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner 3: Enter email & Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError4 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Manager Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        { showUserError5 && ( 
            <div className='absolute text-center w-full flex justify-center items-center'>
              <h1 className='p-4 px-6 border flex border-black rounded-sm shadow-2xl bg-yellow-200 font-semibold'><IoIosWarning size={24}/>Owner Mobile Number Must Include 10 digits!</h1>
            </div>
          )}
        </div>

        <h1 className='mt-12 mb-12 text-3xl text-center font-semibold'>Add User Details</h1>        
        <hr />          
        <button className='text-black w-full hover:bg-gray-100 flex justify-center font-bold text-xl py-5' onClick={handleAddAdmin}>Add Admin(s): <IoIosArrowDown size={26}/></button><hr />
        {showAdminForm && ( 
        <form className='text-center pt-6 pb-12' action="submit">
        <div className='flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Admin 1: &nbsp;</h1>
            <input id='adminName' value={adminName} onChange={(e) => setAdminName(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Admin 1)'/>
            <input id='adminEmail' value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={admin1countryCode} onChange={(e) => setCountryCode1(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
            </select>
            <input id='adminPhone' value={adminPhone} onChange={(e) => setAdminPhone(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
        </div>
        
        <div className='mt-5 flex justify-center'>
          <h1 className='text-lg font-semibold mt-1'>Admin 2: &nbsp;</h1>
            <input id='adminName2' value={adminName2} onChange={(e) => setAdminName2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Admin 2)'/>
            <input id='adminEmail2' value={adminEmail2} onChange={(e) => setAdminEmail2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={admin2countryCode} onChange={(e) => setCountryCode2(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
                </select>
            <input id='adminPhone2' value={adminPhone2} onChange={(e) => setAdminPhone2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
        </div>

        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Admin 3: &nbsp;</h1>
            <input id='adminName3' value={adminName3} onChange={(e) => setAdminName3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Admin 3)'/>
            <input id='adminEmail3' value={adminEmail3} onChange={(e) => setAdminEmail3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={admin3countryCode} onChange={(e) => setCountryCode3(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
            </select>
            <input id='adminPhone3' value={adminPhone3} onChange={(e) => setAdminPhone3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
        </div>
        </form>
        )}


        <button className='text-black w-full hover:bg-gray-100 flex justify-center font-bold text-xl py-5' onClick={handleAddManager}>Add Manager(s): <IoIosArrowDown size={26}/></button><hr />
        {showManagerForm &&(
        <form className='text-center pt-6 pb-12' action="submit">
          <div className='flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 1: &nbsp;</h1>
            <input id='managerName' value={managerName} onChange={(e) => setManagerName(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 1)'/>
            <input id='managerEmail' value={managerEmail} onChange={(e) => setManagerEmail(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={manager1countryCode} onChange={(e) => setCountryCode4(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
            ))}
            </select>
            <input id='managerPhone' value={managerPhone} onChange={(e) => setManagerPhone(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>

        </div>
 
        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 2: &nbsp;</h1>
            <input id='managerName2' value={managerName2} onChange={(e) => setManagerName2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 2)'/>
            <input id='managerEmail2' value={managerEmail2} onChange={(e) => setManagerEmail2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={manager2countryCode} onChange={(e) => setCountryCode5(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
                </select>
            <input id='managerPhone2' value={managerPhone2} onChange={(e) => setManagerPhone2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
        </div>


        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 3: &nbsp;</h1>
            <input id='managerName3' value={managerName3} onChange={(e) => setManagerName3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 3)'/>
            <input id='managerEmail3' value={managerEmail3} onChange={(e) => setManagerEmail3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={manager3countryCode} onChange={(e) => setCountryCode6(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
                </select>
            <input id='managerPhone3' value={managerPhone3} onChange={(e) => setManagerPhone3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
        </div>

        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 4: &nbsp;</h1>
            <input id='managerName4' value={managerName4} onChange={(e) => setManagerName4(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 4)'/>
            <input id='managerEmail4' value={managerEmail4} onChange={(e) => setManagerEmail4(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={manager4countryCode} onChange={(e) => setCountryCode7(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
                </select>
            <input id='managerPhone4' value={managerPhone4} onChange={(e) => setManagerPhone4(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
        </div>

        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 5: &nbsp;</h1>
            <input id='managerName5' value={managerName5} onChange={(e) => setManagerName5(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 5)'/>
            <input id='managerEmail5' value={managerEmail5} onChange={(e) => setManagerEmail5(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={manager5countryCode} onChange={(e) => setCountryCode8(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
                </select>
            <input id='managerPhone6' value={managerPhone6} onChange={(e) => setManagerPhone6(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
        </div>

        <div className='mt-5 flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Manager 6: &nbsp;</h1>
            <input id='managerName6' value={managerName6} onChange={(e) => setManagerName6(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Manager 6)'/>
            <input id='managerEmail6' value={managerEmail6} onChange={(e) => setManagerEmail6(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={manager6countryCode} onChange={(e) => setCountryCode9(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
                </select>
            <input id='managerPhone6' value={managerPhone6} onChange={(e) => setManagerPhone6(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
        </div>
        </form>
        )}

        <button className='text-black w-full hover:bg-gray-100 flex justify-center font-bold text-xl py-5' onClick={handleAddOwner}>Add Owner(s): <IoIosArrowDown size={26}/></button><hr />
        {showOwnerForm && (
        <form className='text-center pt-6 pb-12' action="submit">
          <div className='flex justify-center'>
            <h1 className='text-lg font-semibold mt-1'>Owner 1: &nbsp;</h1>
            <input id='ownerName' value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Owner 1)'/>
            <input id='ownerEmail' value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
            <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={owner1countryCode} onChange={(e) => setCountryCode10(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
            </select>
            <input id='ownerPhone' value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
      </div>

      <div className='mt-5 flex justify-center'>
          <h1 className='text-lg font-semibold mt-1'>Owner 2: &nbsp;</h1>
          <input id='ownerName2' value={ownerName2} onChange={(e) => setOwnerName2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Owner 2)'/>
          <input id='ownerEmail2' value={ownerEmail2} onChange={(e) => setOwnerEmail2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
          <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={owner2countryCode} onChange={(e) => setCountryCode11(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
          </select>
          <input id='ownerPhone2' value={ownerPhone2} onChange={(e) => setOwnerPhone2(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
      </div>
            
      <div className='mt-5 flex justify-center'>
          <h1 className='text-lg font-semibold mt-1'>Owner 3: &nbsp;</h1>
          <input id='ownerName3' value={ownerName3} onChange={(e) => setOwnerName3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Name (Owner 3)'/>
          <input id='ownerEmail3' value={ownerEmail3} onChange={(e) => setOwnerEmail3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="email" placeholder='email'/>
          <select name="countryCode" className='border border-gray-500 w-20 p-2 mr-1 rounded' value={owner3countryCode} onChange={(e) => setCountryCode12(e.target.value)}>
            {filteredOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
            </option>
            ))}
          </select>
          <input id='ownerPhone3' value={ownerPhone3} onChange={(e) => setOwnerPhone3(e.target.value)} className="border border-gray-500 p-2 mr-2 rounded" type="text" placeholder='Mobile Number' minLength="10" maxLength="10"/>
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
            <button className='flex underline mt-4 hover:text-blue-800' onClick={backHome}><IoArrowBackCircleSharp size={32}/>Home</button>
            <div className='w-full flex text-center justify-center items-center'>
            <img className='mb-8' src={logo} alt="" />
            </div>

        <form><hr />
          <h1 className='text-center text-3xl mt-8 mb-8 font-semibold'>Enter Bridge Details</h1><hr />
          <div className="flex bg-gray-100 mt-16 mx-12 shadow-2xl p-6 pt-12 pb-12">
            <div className='w-full mx-5'>
              <div className="mb-6">
            <label htmlFor="country" className="block text-gray-700">Country:</label>
            <select id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} className="border border-gray-300 p-2 w-full rounded" >
                <option value="" disabled>Select Country</option>
                {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
              <label htmlFor="coordinates" className="block text-gray-700">Bridge Coordinates:</label>
              <input type="text" id="coordinates" placeholder='Enter Coordinates' name="coordinates" value={coordinates} onChange={(e) => setCoordinates(e.target.value)} className="border border-gray-300 p-2 w-full rounded"/>
            </div>
          <div className="mb-6">
            <label htmlFor="nobridgespan" className="block text-gray-700">Number of Bridge Spans:</label>
            <select id="nobridgespan" name="nobridgespan" onChange={(e) => setnobridgespan(e.target.value)} className="border border-gray-300 p-2 w-full rounded">
              {[...Array(50).keys()].map((span) => (<option key={span + 1} value={span + 1}>{span + 1}</option>))}
            </select>
          </div>
        </div>
            <div className='w-full mx-5'>
            <div className="mb-6">
            <label htmlFor="state" className="block text-gray-700">State:</label>
            <select id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} className="border border-gray-300 p-2 w-full rounded">
                <option value="" disabled>Select State</option>
                {statesByCountry[country]?.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor='bridgeName' className="block text-gray-700">Bridge Location:</label>
            <input type="text" id="location" placeholder='Enter Location' name="location" value={location} onChange={(e) => setlocation(e.target.value)} className="border border-gray-300 p-2 w-full rounded" />
          </div>
          <div className="mb-6">
            <label htmlFor="noofgirders" className="block text-gray-700">Number of Girders:</label>
            <select id="noofgirders" name="noofgirders" onChange={(e) => setnoofgirders(e.target.value)} className="border border-gray-300 p-2 w-full rounded">
              {[...Array(20).keys()].map((girder) => (<option key={girder + 1} value={girder + 1}>{girder + 1}</option>))}
            </select>
          </div>
        </div>
        <div className='w-full mx-5'>
            <div className="mb-6">
              <label htmlFor="division" className="block text-gray-700">Division:</label>
              <input type="text" id="division" placeholder='Enter Division' name="division" value={division} onChange={(e) => setDivision(e.target.value)} className="border border-gray-300 p-2 w-full rounded" />
            </div>
            <div className="mb-6">
              <label htmlFor='bridgeName' className="block text-gray-700">Bridge Name:</label>
              <input type="text" id="name" placeholder='Enter Name' name="name" value={bridgeName} onChange={(e) => setBridgeName(e.target.value)} className="border border-gray-300 p-2 w-full rounded" />
            </div>
        </div>
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