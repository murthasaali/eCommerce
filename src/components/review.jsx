import React from 'react'

function Review() {
  return (
    <div className='w-full h-full bg-black'>

    <div className='p-4 lg:w-1/2 md:w-full flex h-auto flex-col  justify-center bg-black '><div className="chat chat-start">
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div className="chat-header">
     abc@gmial.com
      <time className="text-xs opacity-50">12:45</time>
    </div>
    <div className="chat-bubble text-xs md:font-thin xs:font-2xl">delisious , i never taste like this before</div>
    <div className="chat-footer opacity-50">
      Delivered
    </div>
  </div>
  <div className="chat chat-end">
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
    <div className="chat-header">
      Anakin
      <time className="text-xs opacity-50">12:46</time>
    </div>
    <div className="chat-bubble">thanks 😍</div>
    <div className="chat-footer opacity-50">
      Seen at 12:46
    </div>
  </div></div>
    </div>
  )
}

export default Review