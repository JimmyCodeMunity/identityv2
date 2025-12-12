import { useState } from "react";
import { Zap, Shield, Truck, Sparkles, ScanLine, Palette } from "lucide-react";

export const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "24-Hour Express Printing",
      desc: "Need wristbands tomorrow? We print and deliver in Nairobi same-day. Nationwide in 48hrs max.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Tamper-Proof & Secure",
      desc: "Serialized QR codes, hologram seals, and one-time-lock clasps. Say goodbye to fakes and gatecrashers.",
    },
    {
      icon: <ScanLine className="w-8 h-8" />,
      title: "RFID & Cashless Ready",
      desc: "Upgrade to tap-to-enter and cashless payments. Perfect for festivals, concerts & VIP zones.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Full Custom Branding",
      desc: "Your logo, colors, sponsor logos, and event theme — printed in stunning full-color HD.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Nationwide Delivery",
      desc: "Free shipping on orders over 500 wristbands. Track your package live — from print to your venue.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "VIP & Tiered Access",
      desc: "Color-coded wristbands for General, VIP, Backstage, Press — control access zones with ease.",
    },
  ];

  // Unified theme colors
  const accentGradient = "from-[#F8B179] to-[#f59e0b]";
  const cardBg = "bg-white/10";
  const cardBorder = "border-white/20";
  const hoverBg = "bg-white/20";
  const textDark = "#161E31";

  return (
    <section className="relative bg-gradient-to-b from-[#161E31] via-[#1e1b4b] to-[#161E31] py-24 overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#F8B179]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F8B179]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F8B179]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Kenya's Top Events Choose{" "}
            <span className="text-[#F8B179]">IdentityEA</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Secure, beautiful, and delivered on time — every single event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
            >
              <div
                className={`p-8 rounded-3xl border-2 ${cardBorder} ${hoveredIndex === index ? hoverBg : cardBg
                  } backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-[#F8B179]/30 hover:-translate-y-4 group-hover:border-[#F8B179]/50`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-[#F8B179] p-3 text-white shadow-xl mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#F8B179] text-[#161E31] font-bold text-lg rounded-full hover:bg-[#f59e0b] transition-all duration-300 shadow-xl hover:shadow-[#F8B179]/60 transform hover:scale-105"
          >
            Explore All Wristbands
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};