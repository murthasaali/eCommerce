import React from 'react'
import { motion } from 'framer-motion';
import { MdOutlineAutoGraph } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { BiHomeAlt ,BiCartAdd} from "react-icons/bi";
import { FaOpencart } from "react-icons/fa";
import { SiStackoverflow } from "react-icons/si";
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './dashboard';
import GetAllproduct from './getAllproduct';
import Sales from './sales';
import GetAllUsers from './getAllusers';
  import Addproduct from './addproduct';
import Navber from '../user/navbar';
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
    },
    hover: {
      scale: 1.1,
      color: '#FF69B4',
      transition: { duration: 0.3 }
    }
  };
function Admin() {
  const nav=useNavigate()
  const location=useLocation()
  const isuser=location.pathname.endsWith('/admin/user')
  const issales=location.pathname.endsWith('/admin/sales')
  const isdash=location.pathname.endsWith('/admin')
  const isprosec=location.pathname.endsWith('/admin/prosec')
  const isadd=location.pathname.endsWith('/admin/add')
  return (
    <div className='bg-stone-200  h-screen w-full  flex  ' >
      <Navber/>
        <motion.div
         variants={container}
         initial="hidden"
         animate="visible"
         className='bg-white  bg-opacity-80 w-1/4 h-full rounded-lg  justify-center gap-8 font-sans text-black  flex flex-col Iitems-start  ' >
          <div className='w-full h-2/5 rounded-full  flex flex-col items-center justify-center'>
            <img className='h-52 w-52 rounded-full' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC" alt="" />
         <h1>murthasa</h1>
          </div>
           
            <motion.button  variants={item} whileHover={item.hover} className='flex  ml-10  justify-start items-center gap-1 ' ><SiStackoverflow className='text-3xl text-blue-400'/>  <h1>DASH BOARD</h1></motion.button>
            <motion.button  variants={item} whileHover={item.hover} className='flex  ml-10  justify-start items-center gap-1 ' ><BiHomeAlt className='text-3xl text-blue-400'/>  <h1> HOME</h1></motion.button>
            <motion.button  variants={item} whileHover={item.hover} className='flex  ml-10  justify-start items-center gap-1 ' ><MdOutlineAutoGraph className='text-3xl  text-blue-400'/>  <h1>SALES</h1></motion.button>
            <motion.button  variants={item} whileHover={item.hover} className='flex  ml-10  justify-start items-center gap-1 ' ><BiUser className='text-3xl  text-blue-400'/>  <h1 onClick={()=>nav('/admin/user')}>USE DETAIL</h1></motion.button>
            <motion.button  variants={item} whileHover={item.hover} className='flex  ml-10  justify-start items-center gap-1 ' ><FaOpencart className='text-3xl  text-blue-400'/>  <h1 onClick={()=>nav('/admin/prosec')}>PRODUCT DETAILS</h1></motion.button>
            <motion.button  variants={item}   whileHover={item.hover} className='flex  ml-10  justify-start items-center gap-1 ' ><BiCartAdd className='text-3xl  text-blue-400'/> <h1 onClick={()=>nav('/admin/add')}>ADD PRODUCT</h1></motion.button>
           
        </motion.div >
        <motion.div 
        variants={container} 
        initial="hidden"
        animate="visible"
        className='  flex-column justify-center w-11/12 h-full  rounded-lg'>
       {
        isdash&&<Dashboard/>
       }
       {
        isprosec&&<GetAllproduct/>
       }
       {
        issales&&<Sales/>
       }
       {
        isuser&&<GetAllUsers/>
       }
       {
        isadd&&<Addproduct/>
       }
        </motion.div >


    </div>
  )
}

export default Admin