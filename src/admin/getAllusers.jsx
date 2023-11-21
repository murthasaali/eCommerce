import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
const container = {
  hidden: { opacity: 0.8, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [isdelete, setisdelete] = useState([]);
  const token = useSelector(selectToken);
    // Modal state
    const [showModal, setShowModal] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
      setShowModal(!showModal);
    }
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://ecommerce-api.bridgeon.in/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        setUsers(data);
      } else {
        console.error('User retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const deleteUser = async (userId, token) => {
    try {
      const response = await axios.delete(`https://ecommerce-api.bridgeon.in/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        console.log('User deleted.');
        setisdelete([...isdelete, "User deleted."]);
        fetchUsers();
      } else {
        console.error('User deletion failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const findUserById = async (userId,token) => {
    try {
      const response = await axios.get(`https://ecommerce-api.bridgeon.in/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        setSelectedUserData(data);
        console.log(selectedUserData);
      } else {
        console.error('User retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCLickuser = (id) => {
    findUserById(id, token);
    setSelectedUser(true);
  };

  const handleRemove = (id) => {
    deleteUser(id, token);
  };

  return (
    <div className='p-4 flex justify-center items-center flex-col'>

      <motion.div className='h-20'
      variants={item}
      >

     <FaSearch className='text-3xl font-thin text-white first-letter  '
   
     
     />
      </motion.div>
      <motion.table className="w-full bg-fuchsia-200 bg-opacity-60 text-black font-sans  rounded-xl"
           variants={container} 
           initial="hidden"
           animate="visible">
  <thead>
    <tr>
      <th className="py-2 font-thin">Name</th>
      <th className="py-2 font-thin">ID</th>
      <th className="py-2 font-thin">Email</th>
      <th className="py-2 font-thin">Actions</th>
      <th className="py-2 font-thin">View</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user._id} className="bg-gray-900 bg-opacity-90 text-white">
        <td className="py-2 px-4">{user.username}</td>
        <td className="py-2 px-4">{user._id}</td>
        <td className="py-2 px-4">{user.email}</td>
        <td className="py-2 px-4">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleRemove(user._id)}>
            Remove
          </button>
        </td>
        <td className="py-2 px-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleCLickuser(user._id)}>
            View
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</motion.table>


     
      {selectedUser && (
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
  onClick={() => setSelectedUser(false)}
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
            <button onClick={() => setSelectedUser(false)}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GetAllUsers;
