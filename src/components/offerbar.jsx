import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MdClose, MdCloseFullscreen } from 'react-icons/md';

function Offerbar() {
  const offerbarRef = useRef();

  const hideOfferbar = () => {
    if (offerbarRef.current) {
      offerbarRef.current.style.display = 'none';
    }
  };

  return (
    <motion.div
      ref={offerbarRef}
      className='fixed right-4 w-64 h-40 backdrop-blur-sm z-50 bottom-0  transform -translate-y-1/2'
    >
      Offerbar
      <button onClick={hideOfferbar}><MdClose/></button>

    </motion.div>
  );
}

export default Offerbar;
