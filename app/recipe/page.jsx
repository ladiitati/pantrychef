"use client";
import RecipeCard from "@components/RecipeCard";
import recipes from "@models/recipes";

const RecipeDetails = () => {
  return (
    <section className="my-10 bg-[#F4EDE2] p-8 rounded-2xl max-w-screen-lg mx-auto space-y-12">
      {/* Top Section: Recipe Overview */}
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        {/* Left Section */}
        <div className="space-y-4 md:w-1/2">
          <h1 className="text-3xl font-bold text-leaf-brown">
            Chocolate Chip Peanut Butter Oatmeal
          </h1>
          <p className="font-medium text-gray-700 text-md">
            Health Rating :{" "}
            <span className="font-bold text-leaf-brown">91/100</span>
          </p>

          {/* Recipe Metrics */}
          <div className="flex mt-4 space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-leaf-brown">14</p>
              <p className="text-sm font-medium text-gray-600">Ingredients</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-leaf-brown">45</p>
              <p className="text-sm font-medium text-gray-600">Minutes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-leaf-brown">1920</p>
              <p className="text-sm font-medium text-gray-600">Calories</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {["Lunch", "Dinner", "Main Course", "Desserts"].map(
              (tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-pastel-green"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Actions */}
          <div className="flex mt-6 space-x-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-cherry-red border-cherry-red hover:bg-cherry-red hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v18l7-5 7 5V3H5z"
                />
              </svg>
              Add To Favorites
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-leaf-brown border-leaf-brown hover:bg-leaf-brown hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add To Meal Plan
            </button>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="mt-8 md:w-1/2 md:mt-0">
          <img
            src="https://via.placeholder.com/400x300"
            alt="Recipe"
            className="object-cover w-full rounded-2xl"
          />
        </div>
      </div>

      {/* Ingredients and Instructions with Nutrition Facts */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Ingredients Section */}
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold text-leaf-brown">
            Ingredients
          </h2>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            {Array(10)
              .fill("1 cup of sugar")
              .map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
          </ul>

          <h2 className="mt-8 mb-4 text-2xl font-bold text-leaf-brown">
            Instructions
          </h2>
          <ol className="space-y-2 text-gray-700 list-decimal list-inside">
            {[
              "Preheat the oven to 375°F (190°C).",
              "Grease a baking dish with some oil.",
              "In a bowl, beat the eggs and season with salt and pepper.",
              "Layer the sliced potatoes and apples in the baking dish.",
              "Pour the beaten eggs over the potatoes and apples.",
              "Sprinkle the shredded cheese on top.",
              "Cover the baking dish with foil and bake for about 30 minutes.",
              "Uncover and bake for an additional 10–15 minutes until the cheese is melted and golden brown.",
              "Serve hot as a delicious side dish or light meal. Enjoy!",
            ].map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        {/* Nutrition Facts Section */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-leaf-brown">
            Nutrition Facts
          </h2>
          <img
            src="https://via.placeholder.com/300x400"
            alt="Nutrition Facts"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
      {/* Related Recipes Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-leaf-brown">
          Related Recipes
        </h2>
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
      </div>
    </section>
  );
};

export default RecipeDetails;