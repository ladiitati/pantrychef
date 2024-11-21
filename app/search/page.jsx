"use client";
import React from "react";
import Navbar from "@components/Navbar";
import SearchBarWithTags from "@components/SearchBarWithTags";
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
      <section className="mt-24 mb-24 filter-bar">
        <Filter />
      </section>
      <section className="search-results">
        <h1 className="mb-20 text-4xl font-bold text-center font-mulish text-pastel-green">
          20,000+ Suggested Recipes
        </h1>
        <RecipeGrid recipe={recipes} />
      </section>
    </div>
  );
};

export default Home;
