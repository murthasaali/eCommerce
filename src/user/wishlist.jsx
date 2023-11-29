import React from 'react'

import Whislistslider from '../components/wishlistSlider'
function Wishlist() {
  
  return (
    <div className='bg-black flex-col flex w-full h-screen p-1 lg:p-10 justify-start items-center'>
      <p className="lg:text-6xl text-4xl font-thin">Wishlist</p>
      <div className='w-full md:3/4 h-auto  '>

<Whislistslider/>

      </div>
    </div>
  )
}

export default Wishlist