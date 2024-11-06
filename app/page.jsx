import React from "react";
import Navbar from "@components/Navbar";
import heroImage from "../public/assets/images/png/heroImage.png";
import searchIcon from "../public/assets/icons/svg/searchIcon.svg";
import Image from "next/image";
import RecipeOfTheDay from "@components/RecipeOfTheDay";

const Home = () => {
  return (
    <div>
      <Navbar />
      <section
        className={`hero-page text-center h-[510px] bg-hero bg-no-repeat bg-cover bg-center pt-10 text-white`}
      >
        <h1 className="font-playfair font-normal text-[80px]">
          What’s In Your Kitchen Today?
        </h1>
        <p className="mt-8 text-center font-semibold sm:text-lg max-w-3xl mx-auto">
          PantryChef helps you find new meals you can make with the ingredients
          you already have. Just enter the ingredients and press generate to
          find what you can make with your ingredients.
        </p>
        <div className="recipe-action pt-7">
          <div className="flex items-center bg-white my-4 rounded-full shadow-md p-3 mb-6 max-w-lg mx-auto">
            <Image
              src={searchIcon}
              width={25}
              height={25}
              alt="Chef Hat Icon"
            />
            <input
              type="text"
              placeholder="Add Ingredients (e.g. egg, flour, milk, nutmeg...)"
              className="ml-4 w-full bg-transparent focus:outline-none text-green-700 placeholder-pastel-green placeholder-opacity-60"
            />
          </div>

          <button className="bg-pastel-green hover:bg-pastel-green hover:bg-opacity-60 text-lg rounded-full py-2 px-6">
            Generate
          </button>
        </div>
      </section>
      <section className="recipe-of-the-day mt-14 content-center">
        <h1 className="font-playfair font-normal mb-10 text-center text-pastel-green underline text-4xl">
          What’s The Recipe Of Today ?
        </h1>
        <RecipeOfTheDay />
      </section>
    
    </div>
  );
};

export default Home;
