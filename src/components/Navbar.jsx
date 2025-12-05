// Navbar.tsx
import React, { useState } from "react";
import { Button } from "./ui/button";
import Logo from "@/constants";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { useAuth } from "@/context/AuthContext";
import { useLocation, Link } from "react-router-dom"; // ← Added

const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation(); // ← Detect current route

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* MAIN BAR */}
      <div className="bg-[#F8B179] w-full px-4 sm:px-16 py-4 shadow-lg">
        <nav className="relative z-50 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={closeMobile}>
            <Logo />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "text-[#161E31] font-bold text-lg"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <button
                onClick={logout}
                className="px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-medium transition backdrop-blur-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/products"
                className="group relative overflow-hidden rounded-full bg-[#161E31] px-8 py-3 font-bold text-[#F8B179] shadow-lg transition-all hover:shadow-xl hover:shadow-[#161E31]/50 hover:scale-105"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#F8B179]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobile}
            className="md:hidden p-2 active:scale-90 transition"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-opacity duration-500 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gradient-to-b from-[#161E31] to-[#0f172a] shadow-2xl flex flex-col p-8 transform transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closeMobile}
          className="self-end mb-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col gap-8 text-2xl font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobile}
              className={`transition-all duration-300 ${
                isActive(item.path)
                  ? "text-[#F8B179] font-bold scale-110"
                  : "text-white/80 hover:text-[#F8B179]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Auth */}
        <div className="mt-12 flex flex-col gap-5">
          {user ? (
            <button
              onClick={() => {
                logout();
                closeMobile();
              }}
              className="w-full py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition backdrop-blur-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/products"
              onClick={closeMobile}
              className="block text-center py-4 rounded-full bg-[#F8B179] text-[#161E31] font-bold text-lg hover:bg-[#f5a065] transition shadow-lg"
            >
              Shop Now
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;