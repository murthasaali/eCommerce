import React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { FaCartPlus } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom'

export default function DotBadge() {
  const nav=useNavigate()
  return (
    <Box sx={{ color: 'action.active' }}>
      <Badge color="info" variant="dot" className='flex justify-center items-center'>
        <FaCartPlus className='text-orange-600' onClick={()=>nav('/cart')}/>
      </Badge>
    </Box>
  );
}