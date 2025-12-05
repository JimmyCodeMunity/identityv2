import { useState } from "react";
import { Zap, Shield, Truck, Sparkles, ScanLine, Palette } from "lucide-react";

export const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "24-Hour Express Printing",
      desc: "Need wristbands tomorrow? We print and deliver in Nairobi same-day. Nationwide in 48hrs max.",
      color: "from-amber-400 to-orange-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      hoverBg: "bg-amber-100",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Tamper-Proof & Secure",
      desc: "Serialized QR codes, hologram seals, and one-time-lock clasps. Say goodbye to fakes and gatecrashers.",
      color: "from-emerald-400 to-teal-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      hoverBg: "bg-emerald-100",
    },
    {
      icon: <ScanLine className="w-8 h-8" />,
      title: "RFID & Cashless Ready",
      desc: "Upgrade to tap-to-enter and cashless payments. Perfect for festivals, concerts & VIP zones.",
      color: "from-purple-400 to-indigo-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      hoverBg: "bg-purple-100",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Full Custom Branding",
      desc: "Your logo, colors, sponsor logos, and event theme — printed in stunning full-color HD.",
      color: "from-pink-400 to-rose-500",
      bg: "bg-pink-50",
      border: "border-pink-200",
      hoverBg: "bg-pink-100",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Nationwide Delivery",
      desc: "Free shipping on orders over 500 wristbands. Track your package live — from print to your venue.",
      color: "from-blue-400 to-cyan-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      hoverBg: "bg-blue-100",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "VIP & Tiered Access",
      desc: "Color-coded wristbands for General, VIP, Backstage, Press — control access zones with ease.",
      color: "from-yellow-400 to-amber-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      hoverBg: "bg-yellow-100",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#161E31] via-[#1e1b4b] to-[#161E31] py-24 overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-[#F8B179]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F8B179]/20 rounded-full blur-3xl"></div>
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
                className={`p-8 rounded-3xl border-2 ${feature.border} ${hoveredIndex === index ? feature.hoverBg : feature.bg
                  } backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-[#F8B179]/20 hover:-translate-y-3`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-3 text-white shadow-lg mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#161E31] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-16">
          <a
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#F8B179] text-[#161E31] font-bold text-lg rounded-full hover:bg-[#f5a065] transition shadow-xl hover:shadow-[#F8B179]/50"
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