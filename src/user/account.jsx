import React, { useState, useEffect } from 'react';
import { IoLocation } from 'react-icons/io5';

function Account() {
  const [userLocation, setUserLocation] = useState(null);

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
      <h1 className='text-3xl font-thin p-2'>Account</h1>
      <div className='text-xs w-full text-blue-300 flex justify-center items-center'>
        <div><IoLocation/></div>
        <div className='text-xs font-thin'>
          {userLocation ? userLocation : 'Loading...'}
        </div>
      </div>
    </div>
  );
}

export default Account;
