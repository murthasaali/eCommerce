import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoLocation } from 'react-icons/io5';
import {useNavigate} from 'react-router-dom'
import { Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import shamil from '../shamil.jpg'
const scaleVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };
function Account() {
  const [userLocation, setUserLocation] = useState(null);
    const nav=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            if (!response.ok) {
              throw new Error('Error retrieving location data');
            }
            const data = await response.json();
            console.log(data);

            // Access the address components (village and district)
            const village = data.address.village || 'Unknown Village';
            const district = data.address.county || 'Unknown District';

            setUserLocation(`${village}, ${district}`);
          });
        } else {
          setUserLocation('Geolocation is not supported.');
        }
      } catch (error) {
        console.error('Error getting the location:', error);
        setUserLocation('Location not available');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-black w-full flow flex-col justify-start items-center h-screen'>
        <div className=' flex w-full h-auto justify-evenly items-center ' >
        <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={()=>nav("/account")}>
           <div className='h-auto w-auto flex flex-row p-2 md:flex-col justify-center items-center gap-2'>

            <Avatar src={shamil} className='w-24 h-24'/>
            <div className='font-thin text-white opacity-70 text-xs md:text-xl'>shamil </div>
            
           </div>
          </motion.button>
      <h1 className='text-3xl md:text-5xl text-orange-500 text-opacity-75  font-thin p-2'
        style={{
            fontFamily:" 'Arista Pro Alternate Fat', sans-serif "
           }}
      >ACCOUNT</h1>
      <button onClick={()=>nav('/')}>
        
        <BiArrowBack className='text-white text-xl md:2xl hover:text-orange-600  '/>
      </button>
     
        </div>
      <div className='text-xs gap-2 w-full text-blue-300 flex md:justify-end justify-center px-3 items-center'>
        <div><IoLocation/></div>
        <div className='text-xs font-thin'>
          {userLocation ? userLocation : 'Loading...'}
        </div>
      </div>
    </div>
  );
}

export default Account;
