import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

export default function Carousal() {
  return (
    <div className='w-full h-full flex justify-center items-center rounded-lg' style={{ zIndex: 1 }}>
      <MDBCarousel fade style={{ filter: 'blur(0.2px)', opacity: 0.8, width: '100%' ,overflow:"hidden",zIndex:1}} className='rounded-lg   ' showControls>
        <MDBCarouselItem itemId={1} interval={1000} className="rounded-lg">
          <img
            src='https://img.freepik.com/free-photo/freshly-baked-pizza-rustic-wooden-table-generated-by-ai_24640-89802.jpg?t=st=1700640507~exp=1700644107~hmac=c06f3b18ca22b61b421ce007690af42460969effb3e3a59fb6a91000f8348bfa&w=1380'
            className='d-block w-100 rounded-lg'
            alt='...'
          />
            <div className='w-full h-full bg-black'>
              {/* Text overlay for company name and offer details */}
              <div className='text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <h2 className='qoute1'>CRUNCHICK</h2>
                <p className='font-thin'>"eat well"</p>
                <button className=" btn   bg-black  "   style={{
                  borderRadius:"25px",
                
                }}> button</button>
              </div>
            </div>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img
            src='https://img.freepik.com/free-photo/grilled-cheeseburger-with-tomato-sesame-bun-generative-ai_188544-12302.jpg?w=1380&t=st=1700646274~exp=1700646874~hmac=62d5c17754782c22d1d62f0ab477b7bc2a7d17f5f3d265ace2c880fb1dd83529'
            className='d-block w-100'
            alt='...'
          />  <div className='w-full h-full bg-black'>
          {/* Text overlay for company name and offer details */}
          <div className='text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='qoute1'>CRUNCHICK</div>
            <p className='font-thin'>"eat well"</p>
            <button className=' btn   bg-black ' style={{
              borderRadius:"25px"
            }} > order now</button>

          </div>
        </div>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img
            src='https://img.freepik.com/free-photo/freshly-italian-pizza-with-mozzarella-cheese-slice-generative-ai_188544-12347.jpg?w=1380&t=st=1700684073~exp=1700684673~hmac=f005d40b0414ad4ff4433483781d8fa4e4b0a8df58eb0e95240a2563fb364724'
            className='d-block w-100'
            alt='...'
          />  <div className='w-full h-full  bg-black'>
          {/* Text overlay for company name and offer details */}
          <div className='text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <h2 className='qoute1'>CRUNCHICK</h2>
            <p className='font-thin'>"eat well"</p>
            <button className=' btn    bg-black' style={{
              borderRadius:"25px"
            }}suu  > order now</button>

          </div>
        </div>
        </MDBCarouselItem>
       
        
    
      </MDBCarousel>
    </div>
  );
}
