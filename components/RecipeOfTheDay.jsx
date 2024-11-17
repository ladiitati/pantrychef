import React from "react";

const RecipeOfTheDay = () => {
  return (
    <div className="flex max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg bg-beige text-leaf-brown">
      <div className="w-1/3">
        <img
          src="path/to/your-image.jpg"
          alt="Recipe Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-2/3 p-6 bg-[#F4EDE2]">
        <div className="flex items-start justify-between">
          <h2 className="text-5xl font-semibold font-mulish text-leaf-brown">
            Grimace Shake
          </h2>
          <svg
            className="w-12 h-12 cursor-pointer text-cherry-red"
            fill="none"
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

        <p className="mt-4 text-xl font-light font-mulish text-leaf-brown">Ready in: 26 minutes</p>
        <p className="text-xl font-light font-mulish text-leaf-brown">Calories Per Serving: 320 cal</p>
        <p className="text-xl font-light font-mulish text-leaf-brown">
          Dish Type(s): lunch, main course, dinner, breakfast
        </p>
        <p className="text-xl font-light font-mulish text-leaf-brown">
          Ingredient(s): eggs, milk, bacon, flour, nutmeg
        </p>

        <div className="flex justify-end mt-2">
        <button className="px-4 py-2 mt-6 font-semibold text-white rounded-full bg-pastel-green hover:bg-opacity-60">
          See full Recipe
        </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeOfTheDay;
