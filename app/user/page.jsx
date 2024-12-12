"use client";
import RecipeGrid from "@components/RecipeGrid";
import RecipeOfTheDay from "@components/RecipeOfTheDay";
import React, { useState, useEffect } from "react";
import { supabase } from "@lib/supabase";
import { useUser } from "@context/UserContext";
import { useRouter } from "next/navigation";
import BackButton from "@components/BackButton";
import { fetchDataWithLocalStorageAndExpiry } from "@utils/network";

const user = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out successfully.");
      alert("User Signed Out Succesfully");
      router.push("/");
    }
  };

  const user = useUser();

  const fetchFullRecipeDetails = async (recipeIds) => {
    if (!recipeIds || recipeIds.length === 0) {
      console.error("No recipe IDs provided.");
      return [];
    }

    const idsQuery = recipeIds.join(",");
    const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${idsQuery}`;

    const { data, error } = await fetchDataWithLocalStorageAndExpiry(url);
    if (error) {
      console.error("Error fetching recipe details from Spoonacular:", error);
      return [];
    }

    return data.map((recipe) => ({
      id: recipe.id,
      image: recipe.image,
      title: recipe.title,
      tags: recipe.dishTypes || [], // Default to an empty array if no tags
      time: recipe.readyInMinutes,
      servings: recipe.servings,
    }));
  };

  const [savedRecipes, setSavedRecipes] = useState([]);
  const fetchSavedRecipeIds = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("saved_recipes")
        .select("recipe_id")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching saved recipe IDs:", error);
        return null;
      }

      return data.map((item) => item.recipe_id); // Extracting just the recipe IDs
    } catch (err) {
      console.error("Unexpected error:", err);
      return null;
    }
  };

  const fetchSavedRecipes = async (userId) => {
    // Fetch saved recipe IDs from Supabase
    const savedRecipeIds = await fetchSavedRecipeIds(userId);
    if (!savedRecipeIds || savedRecipeIds.length === 0) {
      return []; // No saved recipes
    }

    // Fetch full details from Spoonacular
    const recipeDetails = await fetchFullRecipeDetails(savedRecipeIds);
    return recipeDetails;
  };

  // To handle refresh after unsave
  // const handleUnsave = async (recipeId) => {
  //   if (!user?.id) return;

  //   const { error } = await supabase
  //     .from("saved_recipes")
  //     .delete()
  //     .eq("user_id", user.id)
  //     .eq("recipe_id", recipeId);

  //   if (error) {
  //     console.error("Error unsaving recipe:", error.message);
  //   } else {
  //     console.log("Recipe unsaved successfully.");
  //     fetchSavedRecipes(); // Re-fetch saved recipes
  //   }
  // };

  useEffect(() => {
    const loadSavedRecipes = async () => {
      if (!user) return;

      setLoading(true);
      const recipes = await fetchSavedRecipes(user.id);
      setSavedRecipes(recipes);
      setLoading(false);
    };

    loadSavedRecipes();
  }, [user]);

  if (loading) {
    return <p>Loading saved recipes...</p>;
  }

  if (!user) {
    return <p>Please log in to see your saved recipes.</p>;
  }

  return (
    <>
      {/* Profile Card */}
      <section className="flex items-center justify-center p-6 mb-24 bg-pastel-green">
        {/* Profile Card */}
        <div className="bg-pastel-green w-full max-w-md h-[500px] rounded-lg flex flex-col items-center justify-center p-6">
          {/* Profile Avatar */}
          <div className="flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full">
            {
              (user.avatar = "" ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full"
                />
              ) : (
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
              ))
            }
          </div>

          {/* Email Address */}
          <p className="mt-4 text-3xl font-medium text-black text-opacity-60">
            {user.email || ""}
          </p>

          {/* Action Links */}
          <div className="flex flex-col items-center mt-4 space-y-2">
            <a
              href="/meal-plan"
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
              onClick={handleSignOut}
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

      {/* Saved Recipes  */}
      <section className="mt-24 w-full max-w-[1020px] mx-auto">
        <div className="flex items-center justify-between pb-2">
          {/* Heading */}
          <h1 className="text-3xl font-medium underline text-pastel-green font-playfair">
            Saved Recipes
          </h1>

          {/* Sort Options */}
          {/* <div className="flex items-center gap-1 text-sm text-gray-700">
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
          </div> */}
        </div>
        {savedRecipes.length === 0 ? (
          <p>No saved recipes</p>
        ) : (
          <RecipeGrid recipes={savedRecipes} />
        )}
      </section>

      <BackButton />
    </>
  );
};

export default user;
