"use client";
import React from "react";
import Navbar from "@components/Navbar";
import recipes from "@models/recipes";
import RecipeOfTheDay from "@components/RecipeOfTheDay";
import RecipeCard from "@components/RecipeCard";
import { useState, useEffect } from "react";
import SearchBarWithTags from "@components/SearchBarWithTags";

const Home = () => {
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

      {/* Hero section */}
      <section
        className={`hero-page text-center h-[510px] bg-hero bg-no-repeat bg-cover bg-center pt-10 text-white`}
      >
        <div className="container px-4 mx-auto">
          {/* Title */}
          <h1 className="font-playfair font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight">
            What’s In Your Kitchen Today?
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto mt-6 text-base font-semibold text-center sm:max-w-2xl md:max-w-3xl sm:mt-8 sm:text-lg md:text-xl">
            PantryChef helps you find new meals you can make with the
            ingredients you already have. Just enter the ingredients and press
            generate to find what you can make with your ingredients.
          </p>

          {/* Search Bar */}
          <div className="mt-6 sm:mt-8">
            <SearchBarWithTags />
          </div>
        </div>
      </section>

      {/* Recipe of the day section */}
      <section className="recipe-of-the-day mt-14">
        <h1 className="mb-10 text-4xl font-normal text-center underline font-playfair text-pastel-green">
          What’s The Recipe Of <i>Today </i> ?
        </h1>
        <RecipeOfTheDay />
      </section>

      {/* call to action section */}
      <section className="relative flex items-center h-auto px-6 py-12 mt-24 mb-24 bg-center bg-cover sm:px-10 bg-hero">
        {/* Text and Button Wrapper */}
        <div className="flex flex-col items-center justify-between w-full max-w-5xl mx-auto md:flex-row">
          {/* Text Section */}
          <div className="text-center text-white md:text-left">
            <h1 className="w-full text-2xl font-normal leading-tight sm:text-3xl md:text-4xl lg:text-5xl font-playfair">
              Create An Account Today To Save Your Favorite Recipes for Later!!
            </h1>
          </div>

          {/* Button Section */}
          <div className="mt-6 md:mt-0">
            <button className="px-6 py-4 text-lg font-semibold leading-none text-white rounded-full sm:text-xl md:text-2xl lg:text-3xl font-mulish bg-pastel-green hover:bg-pastel-green hover:bg-opacity-60">
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* What's new today section  */}
      <section className="whats-new-today ">
        <h1 className="mb-10 text-4xl font-normal text-center underline font-playfair text-pastel-green">
          What’s New <i>Today </i> ?
        </h1>
        <div
          className="flex p-4 space-x-4 overflow-x-scroll"
          key={recipes.map((recipe) => recipe.id)}
        >
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
      </section>

      {/* Trivia of the day section */}
      <section className="flex flex-col items-center justify-between h-auto px-6 py-16 mt-24 trivia md:flex-row sm:px-10 bg-pastel-green">
        {/* Left Side: Heading */}
        <div className="w-full px-4 text-center text-white md:w-1/2 md:text-left sm:px-6 md:ml-24">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-[65px] leading-tight font-playfair">
            What’s The Trivia Of <span className="italic">Today</span>?
          </h1>
        </div>

        {/* Right Side: Image with Overlay */}
        <div className="relative w-full px-4 mt-8 md:w-1/3 md:mt-0 sm:px-6 md:mr-24">
          {/* Background Image */}
          <img
            src="https://via.placeholder.com/400x300"
            alt="Trivia"
            className="h-[240px] sm:h-[280px] md:h-[340px] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] object-cover w-full"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 bg-black bg-opacity-50 rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
            <p className="text-sm leading-relaxed text-center sm:text-base md:text-lg font-mulish text-light-brown">
              PantryChef helps you find new meals you can make with the
              ingredients you already have. Just enter the ingredients and press
              generate to find what you can make with your ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Joke of the day section */}
      <section className="flex flex-col-reverse items-center justify-between h-auto px-6 py-12 mt-24 joke md:flex-row sm:px-10 bg-pastel-green">
        {/* Right Side: Image with Overlay */}
        <div className="relative w-full mt-8 md:w-1/3 md:mt-0 md:ml-12">
          {/* Background Image */}
          <img
            src="https://via.placeholder.com/400x300"
            alt="Trivia"
            className="h-[240px] sm:h-[280px] md:h-[340px] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] object-cover w-full"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 bg-black bg-opacity-50 rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
            <p className="text-sm leading-relaxed text-center sm:text-base md:text-lg font-mulish text-light-brown">
              PantryChef helps you find new meals you can make with the
              ingredients you already have. Just enter the ingredients and press
              generate to find what you can make with your ingredients.
            </p>
          </div>
        </div>

        {/* Left Side: Heading */}
        <div className="w-full px-3 text-center text-white md:w-1/2 md:text-right sm:px-6 md:mr-12">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-[70px] leading-tight font-playfair">
            What’s The Joke Of <span className="italic">Today</span>?
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
