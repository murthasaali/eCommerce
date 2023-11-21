import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Dashboard() {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setIsModalOpen1(true)}>Open Modal 1</button>
      {isModalOpen1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: 999,
          }}
          onClick={() => setIsModalOpen1(false)}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}
            // style={{
            //   background: 'white',
            //   padding: '2rem',
            //   borderRadius: '0.5rem',
            // }}
            className='bg-white w-3/4 h-3/4 rounded-xl bg-opacity-70'
            onClick={(e) => e.stopPropagation()}
        
           
          >
            <h2>Modal 1 Title</h2>
            <p>Modal 1 content goes here.</p>
            <button onClick={() => setIsModalOpen1(false)}>Close</button>
          </motion.div>
        </motion.div>
      )}

      <button onClick={() => setIsModalOpen2(true)}>Open Modal 2</button>
      {isModalOpen2 && (
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5, ease: "easeOut" } }}
    style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  }}
  onClick={() => setIsModalOpen2(false)}
>
          <motion.div
            initial={{ x: 50,y:50, opacity: 0 }}
            animate={{ x: 0,y:0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}
            // style={{
            //   background: 'white',
            //   padding: '2rem',
            //   borderRadius: '0.5rem',
            // }}
            onClick={(e) => e.stopPropagation()}
            className='bg-white w-3/4 h-3/4 rounded-xl bg-opacity-70'
            
          >
            <h2>Modal 2 Title</h2>
            <p>Modal 2 content goes here.</p>
            <button onClick={() => setIsModalOpen2(false)}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
