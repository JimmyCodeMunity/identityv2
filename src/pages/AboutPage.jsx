// src/components/AboutUs.jsx
import React from "react";
import { CheckCircle2, MapPin, Clock, Shield, Users, Zap } from "lucide-react";
import AppLayout from "@/layout/AppLayout";

export default function AboutUs() {
  return (
    <AppLayout>
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        {/* Subtle decorative overlay */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 -left-32 w-96 h-96 bg-[#F8B179]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 -right-40 w-80 h-80 bg-[#161E31]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#161E31] mb-4">
              About <span className="text-[#F8B179]">IdentityEA</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Kenya's leading provider of premium event wristbands, badges, and secure access solutions since 2018.
            </p>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {[
              { value: "50K+", label: "Events Powered" },
              { value: "1M+", label: "Wristbands Delivered" },
              { value: "24hr", label: "Express Printing" },
              { value: "4.9★", label: "Customer Rating" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#F8B179]/30 transition-all duration-300 group"
              >
                <p className="text-4xl md:text-5xl font-bold text-[#161E31] group-hover:text-[#F8B179] transition-colors">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
            <div className="order-2 md:order-1 space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-[#161E31]">
                From Nairobi with Passion
              </h3>
              <div className="space-y-5 text-gray-700 leading-relaxed text-base">
                <p>
                  Founded in the heart of Nairobi in 2018, IdentityEA was born from a simple truth:{" "}
                  <strong className="text-[#161E31]">Kenyan events deserved world-class access control</strong>.
                  Counterfeit tickets, long queues, and flimsy wristbands were holding organizers back.
                </p>
                <p>
                  Our mission was clear: deliver{" "}
                  <strong className="text-[#161E31]">secure, beautiful, and reliable wristbands</strong>{" "}
                  to every concert, festival, conference, and corporate event across East Africa.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {[
                  "Same-day printing available in Nairobi",
                  "Nationwide delivery within 48 hours",
                  "Tamper-proof Tyvek & premium fabric options",
                  "Full custom branding for VIPs & sponsors",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#F8B179] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/identityea1.jpg"
                  alt="IdentityEA team in Nairobi"
                  className="w-full h-96 md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161E31]/80 via-[#161E31]/20 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-6 h-6" />
                    <span className="text-xl font-bold">Nairobi, Kenya</span>
                  </div>
                  <p className="text-sm opacity-90">Proudly East African</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-[#161E31] mb-12">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-10 h-10" />,
                  title: "Speed",
                  desc: "Lightning-fast printing and delivery. Your deadline is our priority.",
                },
                {
                  icon: <Shield className="w-10 h-10" />,
                  title: "Security",
                  desc: "Advanced anti-counterfeit features: QR codes, serial numbers, tamper-proof seals.",
                },
                {
                  icon: <Users className="w-10 h-10" />,
                  title: "Partnership",
                  desc: "We’re with you every step — from design to event day success.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-[#F8B179]/40 transition-all duration-300 text-center group"
                >
                  <div className="w-20 h-20 bg-[#F8B179]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F8B179]/20 transition-colors">
                    <div className="text-[#161E31]">{value.icon}</div>
                  </div>
                  <h4 className="text-2xl font-bold text-[#161E31] mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-[#161E31] text-white rounded-3xl p-12 md:p-16 shadow-2xl">
            <h3 className="text-3xl md:text-5xl font-extrabold mb-6">
              Ready to Elevate Your Event?
            </h3>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
              Join thousands of organizers across Kenya who trust IdentityEA for secure, stylish, and stress-free access control.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="/products"
                className="px-10 py-4 bg-[#F8B179] text-[#161E31] font-bold rounded-full hover:bg-[#f5a065] transition shadow-lg text-lg"
              >
                Explore Wristbands
              </a>
              <a
                href="https://wa.me/254720575757"
            target="_blank"
            rel="noreferrer noopener"
                className="px-10 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-[#161E31] transition text-lg"
              >
                Get a Quote Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}