"use client"
import React from "react";
import Image from "next/image";
import Navbar from "@components/Navbar";
import RecipeCard from "@components/RecipeCard";
import searchIcon from "../../public/assets/icons/svg/searchIcon.svg";
import { useState, useEffect } from "react";
import RecipeGrid from "@components/RecipeGrid";
import Filter from "@components/Filter";

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
      <section className="mt-24 mb-24 filter-bar">
        <Filter/>
      </section>
      <section className="search-results">
        <h1 className="mb-20 text-4xl font-bold text-center font-mulish text-pastel-green">
          20,000+ Suggested Recipes
        </h1>
        <RecipeGrid recipe={recipes}/>
      </section>
    </div>
  );
};

export default Home;
