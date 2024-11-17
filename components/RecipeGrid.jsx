import React from "react";
import RecipeCard from "./RecipeCard";
const RecipeGrid = () => {
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
