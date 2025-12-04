import React from 'react'

const CallToAction = () => {
  return (
    <div className='overflow-hidden'>
        
<section class="flex flex-col items-center justify-center mx-auto max-md:mx-2 max-md:px-2 overflow-hidden w-full text-center py-20 md:py-24 bg-[url('./images/event1.jpg')] bg-cover bg-center bg-no-repeat">
    <h1 class="text-2xl md:text-3xl font-medium text-white max-w-2xl">Ready To Level up your Next Event?</h1>
    <div class="h-[3px] w-32 my-1 bg-gradient-to-l from-transparent to-indigo-600"></div>
    <p class="text-sm md:text-base text-white max-w-xl">
        Leverage AI Agents for real-time calling and unified multi-channel engagement, optimizing customer interactions at scale.
    </p>
    <a href="/products" class="px-8 py-2.5 mt-4 text-sm bg-gradient-to-r from-orange-600 to-slate-700 hover:sa clascale-105 transition duration-300 text-white rounded-full">
        Get Started
    </a>
</section>
    </div>
  )
}

export default CallToAction