import React, { useState, useEffect } from 'react';
import { IoLocation } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const scaleVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3 } },
};

function Location() {
  const [userLocation, setUserLocation] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            if (!response.ok) {
             alert( Error)
            }
            const data = await response.json();

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
    <div className='bg-black w-full flow  justify-start items-center h-auto p-4'>
      <div className='text-xs gap-2 w-full text-blue-300 flex md:justify-end justify-center px-3 items-center'>
        <div><IoLocation /></div>
        <div className='text-xs font-thin'>
          {userLocation ? userLocation : 'Loading...'}
        </div>
      </div>
    </div>
  );
}

export default Location;
