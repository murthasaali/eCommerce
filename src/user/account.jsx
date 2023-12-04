import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoLocation } from 'react-icons/io5';
import {useNavigate} from 'react-router-dom'
import { Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import { seleectImg } from '../redux/authSlice';
import {useSelector}  from 'react-redux'
import ImageUploadComponent from '../components/setUserImage';
// import shamil from '../shamil.jpg'


const scaleVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };
function Account() {
  const [userLocation, setUserLocation] = useState(null);
  const img = useSelector(seleectImg)
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
    <div className='bg-black w-full flow flex-col justify-start items-center h-screen p-4'>
        <div className=' flex w-full h-auto justify-between  md:justify-evenly items-center ' >
        <motion.button variants={scaleVariants} initial="initial" whileHover="hover" whileTap="hover" onClick={()=>nav("/account")}>
           <div className=' p-3 w-auto flex md:flex-row  flex-col justify-center items-center gap-2'>

            <Avatar src={img} className='w-28 h-28'/>
            <div className='font-thin text-white opacity-70 text-xs md:text-xl'>Murthaza </div>
            
           </div>
          </motion.button>
      <div className='text-3xl md:text-5xl text-orange-500 text-opacity-75  font-thin p-2'
        style={{
            fontFamily:" 'Arista Pro Alternate Fat', sans-serif "
           }}
      >ACCOUNT</div>
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

      <div>
        <ImageUploadComponent/>
      </div>
    </div>
  );
}

export default Account;
