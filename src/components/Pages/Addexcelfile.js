import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './tailwind.css';
import { useSnackbar } from 'notistack';

import logo2 from '../Assets/logo.png';
import axios from 'axios';

const Addexcelfile = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
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
            try{
                const formData = new FormData();
                  formData.append('file', selectedFile.file);
                const response = await axios.post('http://localhost:9090/files/upload', formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    }
                });
                if(response.status >= 200 && response.status < 300){
                    console.log('Backend Response: ',response.data);
                    enqueueSnackbar('File uploaded successfully!', { variant: 'success'});
                    navigate('/home');
                }
 
            }
            catch(error){
                console.log(error);
                enqueueSnackbar('Error Submitting file! Please check your file format! ', { variant: 'error'});
            }

        }
    };

    const sample_csv = 'http:///localhost:3000/sample.xlsx'

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
      <div className='flex'>

        <div id='excel' className='w-1/3'>
            <img className='w-32 p-7' src={logo2} alt="" />
        </div>

        <div className='w-2/3 pl-20 pb-6'>
            <div>
                <h1 className='text-3xl font-semibold py-6'>Sample File</h1><br />
                <p className='text-gray-800'>Download this sample excel file for additional reference. <br />Create your own excel file by referring to the format of the sample file.</p><br />
                <button className="cursor-pointer bg-pink-600 text-white p-2 mt-6 rounded-sm hover:bg-pink-900" onClick={()=>{downloadFileAtURL(sample_csv)}}>Sample Download</button>
            </div>
            <br /><br /><hr /><br />
            <h1 className='text-3xl font-semibold py-6'>Select File</h1><br />
            <p className='text-gray-800'>Choose your excel file with reference to our sample excel file and upload it. <br />Make sure that the format matches that of our provided sample file.</p>
            <br />
            <div className="flex py-6">
              <input id='fileinput' className='hidden' type="file" accept='.xlsx , .xls , .csv' onChange={handleFileUpload} />
              <label htmlFor="fileinput" className="cursor-pointer bg-blue-600 text-white p-2 px-8 rounded-sm hover:bg-blue-900" >{selectedFile ? `${selectedFile.file.name}` : 'Choose File'}</label>
              <button className='bg-green-600 justify-end text-white p-2 px-4 rounded-sm ml-12 hover:bg-green-900' onClick={postDataToServer}>Submit</button>
            </div>
            
        </div>
        <div className='justify-center w-1/6'>
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

export default Addexcelfile;