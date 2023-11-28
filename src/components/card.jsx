import  React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import vh from '../delvery.png'
import clock from '../clock.png'
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard() {
  return (
    <>
    
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea className='bg-black text-white border flex flex-col items-center gap-4 justify-center'>
        <CardContent>
        <p className='text-stone-300 text-opacity-50 text-3xl'>Free delivery</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              component="img"
              style={{
                height: '150px',
                width: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              image={vh}
              alt="Free Delivery"
            />
          </div>
          <Typography variant="body2" color="text.secondary">
          <p className='text-white font-thin'>  we are providing free delivery servoce upto 5 kelometers</p>

          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea className='bg-black text-white border flex flex-col items-center gap-4 justify-center'>
        <CardContent>
        <p className='text-stone-300 text-opacity-50 text-3xl'>Time saving</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              component="img"
              style={{
                height: '150px',
                width: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              image={clock}
              alt="Free Delivery"
            />
          </div>
          <Typography variant="body2" color="text.secondary">
          <p className='text-white font-thin'>  we are providing free delivery servoce upto 5 kelometers</p>

          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea className='bg-black text-stone-60 border flex flex-col items-center gap-4 justify-center'>
        <CardContent>
          <p className='text-stone-300 text-opacity-50 text-3xl'>Time saving</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              component="img"
              style={{
                height: '150px',
                width: '150px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              image={vh}
              alt="Free Delivery"
            />
          </div>
          <Typography variant="body2" color="text.secondary">
          <p className='text-white font-thin'>  we are providing free delivery servoce upto 5 kelometers</p>

          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
              </>
  );
}