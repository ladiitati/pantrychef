import React from "react";
import RecipeCard from "./RecipeCard";
import recipes from "../models/recipes.js";

const RecipeGrid = () => {
  return (
    <div className="grid max-w-screen-xl grid-cols-1 gap-4 px-4 py-8 mx-auto sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  );
};

export default RecipeGrid;
