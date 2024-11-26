import React, { useState } from "react";
import Image from "next/image";
import chefHat from "../public/assets/icons/svg/chefHat.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-pastel-green">
      <div className="container flex items-center justify-between mx-auto">
        {/* Left: Login */}
        <div className="hidden md:block">
          <a
            href="#login"
            className="text-lg text-white underline font-mulish hover:no-underline"
          >
            Login
          </a>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center space-x-2">
          <a
            className="text-4xl font-bold text-white font-pacifico"
            href="/"
          >
            PantryChef
          </a>
          <Image src={chefHat} width={50} height={50} alt="Chef Hat Icon" />
        </div>

        {/* Right: Sign Up */}
        <div className="hidden md:block">
          <a
            href="#signup"
            className="text-lg text-white underline hover:no-underline"
          >
            Sign Up
          </a>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-pastel-green">
          <div className="flex flex-col items-center py-4 space-y-4">
            <a
              href="#login"
              className="text-lg text-white underline font-mulish hover:no-underline"
            >
              Login
            </a>
            <a
              href="#signup"
              className="text-lg text-white underline font-mulish hover:no-underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
