// Hero.tsx (Fixed Version)
import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import BackVideoOverlay from "../components/BackVideoOverlay";
import { motion } from "framer-motion";
import CircularGallery from "@/components/ui/circulargaller";
import NewNav from "@/components/NewNAv";  // Make sure path is correct
import BlurText from "@/components/ui/blurtext";
import { useApi } from "@/context/ApiContext";

const HomeSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { categories, banners } = useApi();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            {/* Full-screen Artistic Hero */}
            <section id="home" className="relative w-full min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
                
                {/* Background Video */}
                <BackVideoOverlay />

                {/* Dynamic Aurora Background (Behind Everything) */}
                <div className="absolute inset-0 pointer-events-none opacity-50">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent" />
                    <div
                        className="absolute w-96 h-96 -top-48 -left-48 rounded-full blur-3xl bg-purple-600/30"
                        style={{
                            transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
                            transition: "transform 0.3s ease-out"
                        }}
                    />
                    <div
                        className="absolute w-96 h-96 -bottom-48 -right-48 rounded-full blur-3xl bg-pink-600/30"
                        style={{
                            transform: `translate(${-mousePosition.x / 70}px, ${-mousePosition.y / 70}px)`,
                            transition: "transform 0.3s ease-out"
                        }}
                    />
                </div>

                {/* NAVBAR - Now correctly layered on top */}
                <div className="absolute top-0 left-0 right-0 z-50 pointer-events-auto">
                    <div className="flex justify-center pt-8">
                        <NewNav />
                    </div>
                </div>

                {/* Main Hero Content */}
                <div className="relative z-10 flex-1 flex flex-col items-center mt-12 justify-center px-6 sm:px-12 text-center pt-32 pb-20">
                    <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        <span className="text-sm tracking-wider text-white/90">Limited Edition Drops Live Now</span>
                    </div>
                    <div className="w-full text-center mx-auto flex justify-center items-center">
                        <BlurText
  text="IdentityEA"
  delay={200}
  animateBy="words"
  direction="top"
  className="text-6xl sm:text-7xl md:text-8xl text-center mx-auto font-bold tracking-tight text-white mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
/>
                    </div>

                    <h1 className="text-center">
                        
                        
                        <span className="block text-4xl sm:text-5xl md:text-6xl mt-4 font-light tracking-wider text-white/80">
                            Unforgettable Events Start Here.
                        </span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-white/70 font-light max-w-4xl mx-auto mb-12 leading-relaxed">
                       Premium Tyvek®, Fabric, Vinyl, Silicone & RFID wristbands | Custom-printed in 24–48 hrs | Delivered across East Africa
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a
                            href="/products"
                            className="group relative overflow-hidden px-10 py-5 rounded-full bg-[#161E31] text-white font-medium text-lg tracking-wide hover:scale-105 transition-all duration-500 shadow-2xl"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Explore the Gallery
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition duration-500" />
                        </a>

                        <a
                            href="#products"
                            className="px-10 py-5 rounded-full border-2 border-white/30 bg-[#676f9d] text-[#F8B179] font-medium text-lg tracking-wide hover:bg-white/20 hover:border-white/60 transition-all duration-500"
                        >
                            View Ready-Made Collections
                        </a>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
                        </div>
                    </div>

                    {/* Circular Gallery Below Hero */}
            <div style={{ height: '600px', position: 'relative' }} className="w-full bg-transparent">
                <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
            </div>
                </div>
                

                {/* Artistic Corner Accents */}
                <div className="absolute top-10 right-10 w-32 h-32 border-t-4 border-r-4 border-purple-500/30 rotate-45 pointer-events-none" />
                <div className="absolute bottom-20 left-20 w-24 h-24 border-b-4 border-l-4 border-pink-500/30 -rotate-45 pointer-events-none" />
            </section>

            
        </>
    );
};

export default HomeSection;