import React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { FaCartPlus } from 'react-icons/fa';


export default function DotBadge() {
  return (
    <Box sx={{ color: 'action.active' }}>
      <Badge color="info" variant="dot" className='flex justify-center items-center'>
        <FaCartPlus className='text-black'/>
      </Badge>
    </Box>
  );
}