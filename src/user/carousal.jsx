import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const Carousel = () => {
  const images = [
    '../sr',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg'
  ]; // Add image paths as needed
  const [currentIndex, setCurrentIndex] = useState(0);
  const transition = { duration: 0.5, ease: 'easeInOut' };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="flex h-full w-full items-center justify-center ">
      <motion.div
        className="w-64 h-64 flex items-center justify-center overflow-hidden"
        
        dragConstraints={{ left: -100 * (images.length - 1), right: 0 }}
        whileTap={{ cursor: 'grabbing' }}
        transition={transition}
      >
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            className="w-64 h-64 rounded-lg overflow-hidden"
           
            dragElastic={0.8}
            transition={transition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              src={images[0]}
              alt={`Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Carousel;


