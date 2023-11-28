import React from 'react'
import Navber from './navbar'
import Mainbar from './mainbar'
import { motion } from 'framer-motion';
import Carousal from '../components/carousal';
import { useNavigate } from 'react-router-dom';
import BasicCard from '../components/card';
import { FaFacebook, FaInstagram, FaMailBulk, FaPhone, FaWhatsapp } from 'react-icons/fa';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const items = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
function Home() {

  const nav = useNavigate()
  const menucard=[
    {title:"pizza",src:"https://img.freepik.com/free-photo/tasty-top-view-sliced-pizza-italian-traditional-round-pizza_90220-1353.jpg?t=st=1700636370~exp=1700639970~hmac=1d0e013f7ebb7fa981268ae1f99e3d2cbd2abff28f89010d184a6c13a2a3bc65&w=740",nav:'/kitchen/pizza'},
    {title:"broast",src:"https://img.freepik.com/free-photo/french-fries-fried-chicken-wooden-plate_1203-7692.jpg?w=1060&t=st=1700645777~exp=1700646377~hmac=733248048845d5896fd5049434863a9c4324f981989a89a281b6bce8c9db8b1c",nav:'/kitchen/broast'},
    {title:"shavaya",src:"https://img.freepik.com/free-photo/roasted-chicken-with-spices-gray_23-2147765470.jpg?w=1060&t=st=1700646150~exp=1700646750~hmac=619113f5742de3bc95e6dfd58a3feec9e4fb034fc426e10867951fc631051fdb",nav:'/kitchen/shavaya'},
    {title:"prawns",src:"https://image.shutterstock.com/image-photo/jumbo-prawns-grilled-squids-black-260nw-129756848.jpg",nav:"/kitchen/prawn"},
    {title:"alfahm",src:"",},
    {title:"mandi",src:"",nav:'/kitchen/rice'},
    {title:"drinks",src:"https://img.freepik.com/free-photo/fresh-cola-drink-with-green-lime_144627-12395.jpg?size=626&ext=jpg&uid=R105963240&ga=GA1.1.922335369.1686896801&semt=ais",nav:"/kitchen/drinks"},
    {title:"mandi",src:"",},
   
]


  return (
    <div className='home_main'
 
    >
  
  
    
   <div className='w-full h-auto  flex flex-col relative  '>
    <Mainbar/>
    <div className='crme'>
      <div className='w-full  sm:w-4/6 rounded-lg bg-opacity-30 overflow-hidden flex flex-col justify-center items-center lg:p-20 sm:p-8 '>
        <p> The best offers  </p>
    <Carousal />
  </div>
      <div className=' p-4 font-thin h-1/2 lg:h-full'> <p>choose by menu</p><motion.ul
    className="w-full h-full sm:h-1/2 lg:h-full p-2 grid grid-cols-4 gap-4 grid-rows-2 gap-15 p-15 overflow-hidden bg-opacity-20 rounded-lg"
    variants={container}
    initial="hidden"
    animate="visible"
  >

{menucard.map((item, index) => (
  <motion.div className='flex justify-center h-auto gap-1 items-center flex-col w-auto' key={index}  onClick={() => nav(item.nav)}  variants={items}>
    <motion.div
      className="rounded-full lg:h-24 lg:w-24 sm:h-5 sm:w-5 sm:hidden lg:flex overflow-hidden"
       
      style={{
        boxShadow: '0 0 5px white', // Initial white box shadow
        transition: 'box-shadow 0.3s ease-in-out', // Transition for box shadow
      }}
      // You might need to adjust this part according to your animation
  
     // Remove box shadow on hover
    >
      <motion.button 
      initial={{ scale: 1 }} // Initial scale of the image
      whileHover={{ scale: 1.1 }}
      className='h-full w-full'
      style={{
        backgroundImage: `url("${item.src}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        
      
      }} >

        
      </motion.button >
      


    </motion.div>
    <div className='h-auto text-stone-200'>
      <span className=' qoute'>{item.title}</span>
    </div>
  </motion.div>
))}








  
    
  </motion.ul>
  <p>contact us</p>
  <div className='w-full flex justify-between items-center p-4 h-40 '>

    <FaWhatsapp  className='text-2xl '/>
    <FaInstagram  className='text-2xl '/>
    <FaPhone  className='text-2xl '/>
    <FaMailBulk  className='text-2xl'/>
    <FaFacebook  className='text-2xl'/>

      </div></div>
    </div>
    {/* <motion.div
      initial={{ opacity: 0, y: -20 }} // Initial state: hidden and slightly above
      animate={{ opacity: 1, y: 0 }} // Animated state: visible and at original position
      transition={{ duration: 1 }} // Animation duration
      className="co" 
      style={{
        display:"flex",
        justifyContent:"start",
        paddingInline:"10px"

        
      }}// Replace with your custom class name
    >
      <p className='qoute1'><motion.span  >CRUNCHICK </motion.span >  <motion.span className='text-opacity-70 text-6xl text-white'
          initial={{ opacity: 0 }} // Initial state: hidden
          animate={{ opacity: 1 }} // Animated state: visible
          transition={{ delay: 0.5, duration: 1 }} // Animation delay and duration
        >Order Now</motion.span></p>
    </motion.div> */}
   </div>
    <div className='font-thin flex justify-center ml-5  items-center'>our company provides you a lot of advantages <div className='icon-container'></div></div>
   <div className='w-full h-auto p-4 flex  justify-center gap-7 flex-wrap   '>
    <BasicCard/>

   </div>
   
   <Navber/>
    </div>
  )
}

export default Home