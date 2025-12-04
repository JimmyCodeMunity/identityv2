import React from "react";

const BackVideoOverlay = () => {
  return (
    <div className="">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/video/event.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />
    </div>
  );
};

export default BackVideoOverlay;