import React from 'react'

import Whislistslider from '../components/wishlistSlider'
import Navber from './navbar'
function Wishlist() {
  
  return (
    <div className='bg-black flex-col flex w-full  p-1 lg:p-10 justify-start items-center'
    
    style={{
      height:"100vh"
    }}
    
    >
      <p className="lg:text-6xl text-4xl font-thin"  
     style={{
      fontFamily:" 'Arista Pro Alternate Fat', sans-serif "
     }} 
      
      >WISHLIST</p>
      <div className='w-full md:3/4 h-auto  '>

<Whislistslider/>

      </div>
      <Navber/>
    </div>
  )
}

export default Wishlist