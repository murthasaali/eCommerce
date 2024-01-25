import React,{useState} from 'react'
import { seleectImg } from '../redux/authSlice';
import { useSelector } from 'react-redux';
import { FaChevronCircleRight } from 'react-icons/fa';
import chat from '../assets/visa.jpg'
import mastercard from '../assets/mastercard.png'
import rupay from '../assets/rupay.png'
import raz from '../assets/raz.webp'
function Total() {
  const img = useSelector(seleectImg);



  return (
    <div className='w-auto h-auto rounded-3xl p-4 text-white bg-orange-500 bg-opacity-60  items-start flex-col'>


<div className='w-full h-10 flex justify-between '>
    <h3 className='font-thin'>Cart deatails</h3>
    <div className="avatar">
  <div className="w-8  h-8 rounded">
    <img src={img}  alt="Tailwind-CSS-Avatar-component" />
  </div>
</div>
</div>
<label className='w-full text-start text-xs  font-thin'>card type</label>
<div className='w-full flex gap-2 justify-between'>
<div className='rounded-md bg-opacity-30 w-16 h-10 shadow-lg' style={{
          backgroundImage: `url(${chat})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: "center",
          backgroundSize: 'cover',



        }}></div>
<div className='rounded-md bg-opacity-30 w-16 bg-white h-10' style={{
          backgroundImage: `url(${mastercard})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: "center",
          backgroundSize: 'cover',



        }}></div>
<div className='rounded-md bg-opacity-30 w-16 h-10' style={{
          backgroundImage: `url(${chat})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: "center",
          backgroundSize: 'cover',



        }}></div>
<div className='rounded-md bg-opacity-30 bg-white w-16 h-10' style={{
          backgroundImage: `url(${raz})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: "center",
          backgroundSize: 'cover',



        }}></div>



</div>

<form  className='w-full h-auto flex mt-3 font-thin text-xs flex-col  justify-start items-start gap-2' >
    <label > name on card</label>
    <input type="text" className='px-2 text-black text-opacity-50 w-full rounded-md backdrop-blur-sm bg-slate-400 bg-opacity-25 h-10' placeholder='name' />
    <label > name on card</label>
    <input type="text" className='px-2  w-full rounded-md backdrop-blur-sm bg-slate-400 bg-opacity-25 h-10' placeholder='111 222 333' />
    <div className='w-full gap-2 flex justify-between'>
        <div className='flex flex-col w-1/2  justify-start items-start '>

    <label > exp date</label>

    <input type="text" className='px-2  rounded-md backdrop-blur-sm bg-slate-400 bg-opacity-25 h-10' placeholder='mm/yy' />
        </div>
        <div className='flex flex-col w-1/2  justify-start items-start '>

    <label > cvv</label>

    <input type="text" className='px-2  rounded-md backdrop-blur-sm bg-slate-400 bg-opacity-25 h-10' placeholder='123' />
        </div>
    </div>


</form>

<div className='w-full h-[1px] text-md mt-1 bg-opacity-50 bg-white'></div>

<div className='w-full h-auto  font-thin bg-opacity-25   flex flex-col'>
    <div className='w-full h-auto flex flex-row justify-between'><span>subtotal</span> <span>$ 1000</span></div>
</div>
<div className='w-full h-auto  font-thin bg-opacity-25   flex flex-col'>
    <div className='w-full h-auto flex flex-row justify-between'><span>shipping</span> <span>$ 1000</span></div>
</div>
<div className='w-full h-auto  font-thin bg-opacity-25   flex flex-col'>
    <div className='w-full h-auto flex  flex-row justify-between'><span>Total tax.included</span> <span>$ 1000</span></div>
</div>
<div className='w-full rounded-lg bg-black text-white text-md px-4 h-10 items-center  flex justify-between'><span>$ 1355</span> <button  className='flex items-center gap-2'>checkout <FaChevronCircleRight/></button></div>
    </div>
  )
}

export default Total