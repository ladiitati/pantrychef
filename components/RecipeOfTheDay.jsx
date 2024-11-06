import React from 'react'

const RecipeOfTheDay = () => {
  return (
    <div class="flex bg-beige rounded-lg shadow-lg overflow-hidden max-w-3xl">
  <div class="w-1/3">
    <img src="path/to/your-image.jpg" alt="Recipe Image" class="w-full h-full object-cover" />
  </div>
  
  <div class="w-2/3 p-6 bg-[#F4EDE2]">
    <div class="flex justify-between items-start">
      <h2 class="text-2xl font-semibold text-brown-600 underline">Grimace Shake</h2>
      <svg class="w-6 h-6 text-brown-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v18l7-5 7 5V3H5z" />
      </svg>
    </div>
    
    <p class="text-sm text-brown-500 mt-4">Ready in: 26 minutes</p>
    <p class="text-sm text-brown-500">Calories Per Serving: 320 cal</p>
    <p class="text-sm text-brown-500">Dish Type(s): lunch, main course, dinner, breakfast</p>
    <p class="text-sm text-brown-500">Ingredient(s): eggs, milk, bacon, flour, nutmeg</p>
    
    <button class="mt-6 px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700">
      See full Recipe
    </button>
  </div>
</div>

  )
}

export default RecipeOfTheDay