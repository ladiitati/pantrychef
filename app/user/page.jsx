"use client";
import RecipeGrid from "@components/RecipeGrid";
import RecipeOfTheDay from "@components/RecipeOfTheDay";
import React from "react";

const user = () => {
  return (
    <>
      <section className="flex items-center justify-center p-6 mb-24 bg-pastel-green">
        {/* Profile Card */}
        <div className="bg-pastel-green w-full max-w-md h-[500px] rounded-lg flex flex-col items-center justify-center p-6">
          {/* Profile Avatar */}
          <div className="flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14c4.418 0 8 1.791 8 4M12 14c-4.418 0-8 1.791-8 4m8-4a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>

          {/* Email Address */}
          <p className="mt-4 text-3xl font-medium text-black text-opacity-60">
            christophernolan@gmail.com
          </p>

          {/* Action Links */}
          <div className="flex flex-col items-center mt-4 space-y-2">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-2xl font-medium bg-white rounded-md shadow text-pastel-green hover:bg-opacity-80"
            >
              View Meal Planner
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M12 16l-4-4 4-4m0 8l4-4-4-4"
                />
              </svg>
            </a>

            <button
              className="flex items-center gap-2 text-xl font-medium text-red-600 underline hover:text-red-800"
              onClick={() => alert("Logging out...")}
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      {/* <section className="my-24 create-a-recipe">
        <div className="flex text-center">
          <div className="w-full max-w-[1020px] bg-white">
            <h1 className="text-3xl font-medium underline font-playfair text-pastel-green">
              Create A Recipe
            </h1>
          </div>
        </div>
        <RecipeOfTheDay />
      </section> */}

      {/* <section className="my-24">
      <div className="w-full max-w-[1020px] mx-auto">
    
          <h1 className="mb-8 text-3xl font-medium underline font-playfair text-pastel-green">
            Create A Recipe
          </h1>

    
          <div>
            <RecipeOfTheDay />
          </div>
        </div> 
      </section> */}

      {/* <section className="my-24 create-a-recipe">
        <h1 className="mb-10 text-4xl font-normal text-center underline font-playfair text-pastel-green">
          Create A Recipe
        </h1>
        <RecipeOfTheDay />
      </section> */}

      {/* <section className="saved-recipes">
        <h1 className="mb-10 text-4xl font-normal text-center underline font-playfair text-pastel-green">
          Saved Recipe
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort By</span>
          <span className="flex items-center text-sm font-medium cursor-pointer text-pastel-green hover:underline">
            Relevance
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        <RecipeGrid />
      </section> */}

      <section className="my-24 w-full max-w-[1020px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          {/* Heading */}
          <h1 className="text-3xl font-medium underline text-pastel-green font-playfair">
            Create A Recipe
          </h1>
        </div>
        <RecipeOfTheDay />
      </section>

      <section className="mt-24 w-full max-w-[1020px] mx-auto">
        <div className="flex items-center justify-between pb-2">
          {/* Heading */}
          <h1 className="text-3xl font-medium underline text-pastel-green font-playfair">
            Saved Recipes
          </h1>

          {/* Sort Options */}
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <span className="font-medium">Sort By</span>
            <button className="flex items-center gap-1 font-semibold text-pastel-green hover:underline">
              Most Recent
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <RecipeGrid />
      </section>
    </>
  );
};

export default user;
