import React from "react";
import Image from "next/image";
import chefHat from '../public/assets/icons/svg/chefHat.svg'

const navbar = () => {
  return (
    <nav className="bg-pastel-green p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a
            href="#login"
            className="text-white font-mulish text-lg underline hover:no-underline"
          >
            Login
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-white text-4xl font-bold font-pacifico">
            PantryChef
          </span>
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
            className="text-white text-lg underline hover:no-underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
