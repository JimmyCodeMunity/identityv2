import React from "react";

const Promotional = () => {
  return (
    <>
      <section class="flex flex-col items-center text-white bg-[#161E31]">
    <div class="flex flex-col items-center">
        <h2 class="text-center text-4xl font-semibold max-w-2xl">Subscribe <span class="bg-gradient-to-t from-[#F8B179] to-[#161E31] p-1 bg-left inline-block bg-no-repeat">newsletter</span></h2>
        <p class="text-center text-slate-400 max-w-lg mt-3">A visual collection of our most recent works - each piece crafted with intention, emotion, and style.</p>
    </div>
    <div class="flex items-center justify-center mt-10 border border-slate-700 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-xl w-full">
        <input class="bg-transparent outline-none rounded-full px-4 h-full flex-1 placeholder:text-slate-400" placeholder="Enter your email address" type="text" />
        <button class="bg-[#F8B179] text-white rounded-full h-11 mr-1 px-10 flex items-center justify-center hover:bg-[#F8B179] active:scale-95 transition">Subscribe</button>
    </div>
</section>
    </>
  );
};

export default Promotional;
