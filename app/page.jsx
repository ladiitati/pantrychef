"use client";
import React from "react";
import Navbar from "@components/Navbar";
import searchIcon from "../public/assets/icons/svg/searchIcon.svg";
import Image from "next/image";
import RecipeOfTheDay from "@components/RecipeOfTheDay";
import RecipeCard from "@components/RecipeCard";
import { useState, useEffect } from "react";

const Home = () => {
  const recipes = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      title: "Panda Express Orange Chicken",
      time: "25 minutes",
      servings: "8",
      tags: [],
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      title: "Strawberry Brown Bread",
      time: "25 minutes",
      servings: "10",
      tags: [],
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      title: "Jamaican Beans & Peas",
      time: "25 minutes",
      servings: "12",
      tags: ["Vegan", "Vegetarian", "Gluten Free"],
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      title: "Chocolate Chip Peanut Butter Oatmeal",
      time: "25 minutes",
      servings: "4",
      tags: [],
    },
    {
      id: 5,
      image: "https://via.placeholder.com/150",
      title: "Old Fashioned Oatmeal Raisins",
      time: "25 minutes",
      servings: "8",
      tags: ["Vegan", "Vegetarian"],
    },
    {
      id: 6,
      image: "https://via.placeholder.com/150",
      title: "Old Fashioned Oatmeal Raisins",
      time: "25 minutes",
      servings: "8",
      tags: ["Vegan", "Vegetarian"],
    },
    {
      id: 7,
      image: "https://via.placeholder.com/150",
      title: "Old Fashioned Oatmeal Raisins",
      time: "25 minutes",
      servings: "8",
      tags: ["Vegan", "Vegetarian"],
    },
    {
      id: 8,
      image: "https://via.placeholder.com/150",
      title: "Old Fashioned Oatmeal Raisins",
      time: "25 minutes",
      servings: "8",
      tags: ["Vegan", "Vegetarian"],
    },
    {
      id: 9,
      image: "https://via.placeholder.com/150",
      title: "Old Fashioned Oatmeal Raisins",
      time: "25 minutes",
      servings: "8",
      tags: ["Vegan", "Vegetarian"],
    },
    {
      id: 10,
      image: "https://via.placeholder.com/150",
      title: "Old Fashioned Oatmeal Raisins",
      time: "25 minutes",
      servings: "8",
      tags: ["Vegan", "Vegetarian"],
    },
  ];

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("isSaved")) || false;
    setIsSaved(savedState);
  }, []);

  const toggleSave = () => {
    setIsSaved(!isSaved);
    localStorage.setItem("isSaved", JSON.stringify(!isSaved));
  };

  return (
    <div>
      <Navbar />
      <section
        className={`hero-page text-center h-[510px] bg-hero bg-no-repeat bg-cover bg-center pt-10 text-white`}
      >
        <h1 className="font-playfair font-normal text-[80px]">
          What’s In Your Kitchen Today?
        </h1>
        <p className="max-w-3xl mx-auto mt-8 font-semibold text-center sm:text-lg">
          PantryChef helps you find new meals you can make with the ingredients
          you already have. Just enter the ingredients and press generate to
          find what you can make with your ingredients.
        </p>
        <div className="recipe-action pt-7">
          <div className="flex items-center max-w-lg p-3 mx-auto my-4 mb-6 bg-white rounded-full shadow-md">
            <Image
              src={searchIcon}
              width={25}
              height={25}
              alt="Chef Hat Icon"
            />
            <input
              type="text"
              placeholder="Add Ingredients (e.g. egg, flour, milk, nutmeg...)"
              className="w-full ml-4 text-green-700 bg-transparent focus:outline-none placeholder-pastel-green placeholder-opacity-60"
            />
          </div>

          <button className="px-6 py-2 text-lg rounded-full bg-pastel-green hover:bg-pastel-green hover:bg-opacity-60">
            Generate
          </button>
        </div>
      </section>
      <section className="recipe-of-the-day mt-14">
        <h1 className="mb-10 text-4xl font-normal text-center underline font-playfair text-pastel-green">
          What’s The Recipe Of <i>Today </i> ?
        </h1>
        <RecipeOfTheDay />
      </section>
      {/* <section
        className={`hero-page mt-24 text-center h-[216px] bg-cta bg-no-repeat bg-cover bg-center pt-10 text-white`}
      >
        <h1 className="w-[691px] text-5xl text-left leading-tight font-normal font-playfair">
          Create An Account Today To Save Your Favorite Recipes for Later!!
        </h1>
      </section> */}
      <section className="relative flex items-center h-64 px-10 mt-24 mb-24 bg-center bg-cover bg-hero">
        {/* Text and Button Wrapper */}
        <div className="flex flex-col items-center justify-between w-full max-w-5xl mx-auto md:flex-row">
          {/* Text Section */}
          <div className="text-center text-white md:text-left">
            <h1 className="w-[691px] text-5xl text-left leading-tight font-normal font-playfair">
              Create An Account Today To Save Your Favorite Recipes for Later!!
            </h1>
          </div>

          {/* Button Section */}
          <div className="mt-4 md:mt-0">
            <button className="px-6 py-3 text-3xl font-semibold text-white rounded-full font-mulish bg-pastel-green hover:bg-pastel-green hover:bg-opacity-60">
              Sign Up
            </button>
          </div>
        </div>
      </section>
      <section className="whats-new-today ">
        <h1 className="mb-10 text-4xl font-normal text-center underline font-playfair text-pastel-green">
          What’s New <i>Today </i> ?
        </h1>
        <div className="flex p-4 space-x-4 overflow-x-scroll">
          {recipes.map((recipe) => (
            <RecipeCard
              id={recipe.id}
              image={recipe.image} // Replace with your image URL
              title={recipe.title}
              tags={recipe.tags}
              time={recipe.time}
              servings={recipe.servings}
            />
          ))}
        </div>
        {/* <div className="flex p-4 space-x-4 overflow-x-scroll">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="max-w-xs bg-[#F4EDE2] rounded-lg shadow-md flex-none"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="object-cover w-full h-40"
              />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-semibold text-leaf-brown">
                    {recipe.title}
                  </h2>
                  <svg
                    onClick={toggleSave}
                    className={`w-6 h-6 cursor-pointer ${
                      isSaved
                        ? "text-cherry-red fill-cherry-red"
                        : "text-cherry-red"
                    }`}
                    fill={isSaved ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v18l7-5 7 5V3H5z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-light text-leaf-brown">
                  Ready in: {recipe.time}
                </p>
                <p className="text-sm font-light text-leaf-brown">
                  Servings: {recipe.servings}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </section>
      <section className="triva flex h-[500px] items-center justify-between px-10 py-16 mt-24 bg-pastel-green">
        {/* Left Side: Heading */}
        <div className="w-1/2 ml-24 text-white">
          <h1 className="font-bold leading-snug text-[80px] font-playfair">
            What’s The Trivia Of <span className="italic">Today</span>?
          </h1>
        </div>

        {/* Right Side: Image with Overlay */}
        <div className="relative w-1/3 mr-24">
          {/* Background Image */}
          <img
            src="https://via.placeholder.com/400x300"
            alt="Trivia"
            className="h-[340px] rounded-[40px] object-cover w-full"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-6 bg-black bg-opacity-50 rounded-xl">
            <p className="text-lg leading-relaxed text-center font-mulish text-light-brown">
              PantryChef helps you find new meals you can make with the
              ingredients you already have. Just enter the ingredients and press
              generate to find what you can make with your ingredients.
            </p>
          </div>
        </div>
      </section>
      <section className="joke flex h-[500px] items-center justify-between px-10 py-16 mt-24 bg-pastel-green">
        {/* Right Side: Image with Overlay */}
        <div className="relative w-1/3 ml-24">
          {/* Background Image */}
          <img
            src="https://via.placeholder.com/400x300"
            alt="Trivia"
            className="h-[340px] rounded-[40px] object-cover w-full"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-6 bg-black bg-opacity-50 rounded-xl">
            <p className="text-lg leading-relaxed text-center font-mulish text-light-brown">
              PantryChef helps you find new meals you can make with the
              ingredients you already have. Just enter the ingredients and press
              generate to find what you can make with your ingredients.
            </p>
          </div>
        </div>

        {/* Left Side: Heading */}
        <div className="w-1/2 mr-24 text-white">
          <h1 className="font-bold leading-snug text-right text-[80px] font-playfair">
            What’s The Joke Of <span className="italic">Today</span>?
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
