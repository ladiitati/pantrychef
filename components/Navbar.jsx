import React from "react";
import Image from "next/image";
import chefHat from '../public/assets/icons/svg/chefHat.svg'

const navbar = () => {
  return (
    <nav className="p-4 bg-pastel-green">
      <div className="container flex items-center justify-between mx-auto">
        <div>
          <a
            href="#login"
            className="text-lg text-white underline font-mulish hover:no-underline"
          >
            Login
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <a className="text-4xl font-bold text-white font-pacifico" href="/">
            PantryChef
          </a>
          <Image
            src={chefHat}
            width={50}
            height={50}
            alt="Chef Hat Icon"
          />
        </div>

        <div>
          <a
            href="#signup"
            className="text-lg text-white underline hover:no-underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
