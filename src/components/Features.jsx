import { useState } from "react";

export const Features = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div className="relative bg-[#161E31] py-20 overflow-hidden ">
        {/* Background Blob + Image Container */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Side: Blob + Image */}
            <div className="relative flex justify-center lg:justify-end w-full lg:w-1/2">
              {/* Orange Blob Background */}
              <div className="absolute inset-0 flex items-center flex-row justify-center pointer-events-none">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full max-w-lg lg:max-w-2xl opacity-80"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#F8B179"
                    d="M34.5,-30.6C43,-16.7,47.2,-2.5,47,15.7C46.8,33.8,42.2,55.9,26.4,69C10.6,82,-16.4,86.1,-38.6,76.7C-60.9,67.3,-78.4,44.6,-78.3,23.9C-78.3,3.2,-60.6,-15.5,-44.6,-31.1C-28.7,-46.7,-14.3,-59.2,-0.7,-58.6C12.9,-58.1,25.9,-44.5,34.5,-30.6Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>

              {/* Main Image - sits ON TOP of the blob */}
              <img
                src="./images/club.png"
                alt="Wristbands in action"
                className="relative z-10 w-full max-w-md lg:max-w-2xl object-contain drop-shadow-2xl"
              />
            </div>

            {/* Right Side: Feature Cards */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div
                className="group cursor-pointer"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <div
                  className={`p-6 rounded-2xl border transition-all duration-300 flex items-start gap-5 ${
                    isHover
                      ? "bg-violet-100 border-violet-300"
                      : "bg-violet-100 border-violet-300"
                  }`}
                >
                  <div className="p-3 bg-violet-200 rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-violet-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Real-Time Entry Tracking</h3>
                    <p className="text-gray-600 mt-2">Monitor attendance, control access zones, and get live reports during your event.</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="p-6 rounded-2xl border border-transparent hover:bg-green-100 hover:border-green-300 transition-all duration-300 flex items-start gap-5">
                  <div className="p-3 bg-green-200 rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5 .5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Cashless & RFID Ready</h3>
                    <p className="text-gray-600 mt-2">Tap-to-pay bars, VIP zones, and instant top-ups — no cash, no queues.</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="p-6 rounded-2xl border border-transparent hover:bg-orange-100 hover:border-orange-300 transition-all duration-300 flex items-start gap-5">
                  <div className="p-3 bg-orange-200 rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M12 15V3" />
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="m7 10 5 5 5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Fast & Secure Delivery</h3>
                    <p className="text-gray-600 mt-2">24–48 hour printing + same-day Nairobi delivery. Your wristbands arrive on time, every time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Global Poppins Font (add once in your app) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  );
};