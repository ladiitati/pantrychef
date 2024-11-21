import React from "react";

const RecipeOfTheDay = () => {
  return (
    <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg md:flex-row bg-beige text-leaf-brown">
      {/* Image Section */}
      <div className="order-1 w-full md:w-1/3 md:order-none">
        <img
          src="https://via.placeholder.com/400x300"
          alt="Recipe Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-2/3 p-6 bg-[#F4EDE2]">
        <div className="flex items-start justify-between">
          <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl font-mulish text-leaf-brown">
            Grimace Shake
          </h2>
          <svg
            className="w-8 h-8 cursor-pointer sm:w-10 md:w-12 sm:h-10 md:h-12 text-cherry-red"
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

        <p className="mt-4 text-base font-light sm:text-lg md:text-xl font-mulish text-leaf-brown">
          Ready in: 26 minutes
        </p>
        <p className="text-base font-light sm:text-lg md:text-xl font-mulish text-leaf-brown">
          Calories Per Serving: 320 cal
        </p>
        <p className="text-base font-light sm:text-lg md:text-xl font-mulish text-leaf-brown">
          Dish Type(s): lunch, main course, dinner, breakfast
        </p>
        <p className="text-base font-light sm:text-lg md:text-xl font-mulish text-leaf-brown">
          Ingredient(s): eggs, milk, bacon, flour, nutmeg
        </p>

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 mt-6 text-sm font-semibold text-white rounded-full sm:text-base md:text-lg bg-pastel-green hover:bg-opacity-60">
            See full Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeOfTheDay;
