"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@components/Navbar";
import RecipeCard from "@components/RecipeCard";
import recipes from "@models/recipes";
import daysOfWeek from "@models/daysOfTheWeek";
import { usePathname, useSearchParams } from "next/navigation";
import {
  fetchDataWithLocalStorageAndExpiry,
  fetchHtmlDataWithLocalStorageAndExpiry,
} from "@utils/network";
import BackButton from "@components/BackButton";

const RecipeDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [relatedRecipes, setRelatedRecipes] = useState(null);

  const [nutritionLabelWidget, setNutritionLabelWidget] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const recipeName = "Chocolate Chip Peanut Butter Oatmeal";

  const handleDayToggle = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleDone = () => {
    console.log("Selected Days:", selectedDays);
    console.log("Recipe Name:", recipeName);
    setIsModalOpen(false);
  };

  const fetchRecipeDetails = async () => {
    if (!id) {
      console.error("No recipe ID provided.");
      setError("Invalid recipe ID.");
      setLoading(false);
      return;
    }
    
    const url = `https://api.spoonacular.com/recipes/${id}/information`;

    const { data, error } = await fetchDataWithLocalStorageAndExpiry(url);
    if (error) {
      setError(error);
    } else {
      setRecipe(data);
      console.log(data);
    }
    setLoading(false);
  };

  // const fetchRelatedRecipes = async () => {
  //   setLoading(true);
  //   setError(null);
  //   const url = `https://api.spoonacular.com/recipes/${id}/similar`;

  //   const { data, error } = await fetchDataWithLocalStorageAndExpiry(url);
  //   if (error) {
  //     setError(error);
  //   } else {
  //     setRelatedRecipes(data);
  //     console.log(data);
  //   }
  //   setLoading(false);
  // };

  const fetchRelatedRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch related recipes
      const number = 2
      const relatedUrl = `https://api.spoonacular.com/recipes/${id}/similar?=${number}`;

      const { data: relatedData, error: relatedError } =
        await fetchDataWithLocalStorageAndExpiry(relatedUrl);
      console.log("related data", relatedData);

      if (relatedError) {
        setError("Failed to fetch related recipes.");
        setLoading(false);
        return;
      }

      // Fetch detailed information for each related recipe
      const detailedRecipes = await Promise.all(
        relatedData.map(async (relatedRecipe) => {
          const detailUrl = `https://api.spoonacular.com/recipes/${relatedRecipe.id}/information`;
          console.log("detail url", detailUrl);
          const { data: detailedData, error: detailError } =
            await fetchDataWithLocalStorageAndExpiry(detailUrl);

          if (detailError) {
            console.error(
              `Failed to fetch details for recipe ID ${relatedRecipe.id}`
            );
            return null;
          }

          // Map the required fields for the RecipeCard component
          return {
            id: detailedData.id,
            image: detailedData.image,
            title: detailedData.title,
            tags: detailedData.dishTypes || [], // Default to empty array if no tags
            time: detailedData.readyInMinutes,
            servings: detailedData.servings,
          };
        })
      );

      console.log("detailed recipes", detailedRecipes);
      // Filter out any failed requests (null values)
      setRelatedRecipes(detailedRecipes.filter((recipe) => recipe !== null));
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNutritionLabelWidget = async () => {
    const url = `https://api.spoonacular.com/recipes/${id}/nutritionLabel`;

    const { data, error } = await fetchHtmlDataWithLocalStorageAndExpiry(url);
    if (error) {
      setError(error);
    } else {
      setNutritionLabelWidget(data);
      console.log("nutrition label", data);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (!id) {
  //     console.error("No valid ID found, skipping API calls.");
  //     return;
  //   }
  //   fetchRecipeDetails();
  //   fetchRelatedRecipes();
  //   fetchNutritionLabelWidget();
  // }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      await fetchRecipeDetails();
      await fetchRelatedRecipes();
      await fetchNutritionLabelWidget();
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p>Error fetching recipe details: {error}</p>;

  return (
    <>
      <Navbar />
      <section className="my-10 bg-[#F4EDE2] p-8 rounded-2xl max-w-screen-lg mx-auto space-y-12">
        {/* Top Section: Recipe Overview */}
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          {/* Left Section */}
          <div className="space-y-4 md:w-1/2">
            <h1 className="text-3xl font-bold text-leaf-brown">
              {recipe?.title}
            </h1>
            <p className="font-medium text-gray-700 text-md">
              Health Rating :{" "}
              <span className="font-bold text-leaf-brown">
                {recipe?.spoonacularScore.toFixed(2)}/100
              </span>
            </p>

            {/* Recipe Metrics */}
            <div className="flex mt-4 space-x-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-leaf-brown">14</p>
                <p className="text-sm font-medium text-gray-600">Ingredients</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-leaf-brown">
                  {recipe?.readyInMinutes}
                </p>
                <p className="text-sm font-medium text-gray-600">Minutes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-leaf-brown">
                  $ {recipe?.pricePerServing}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Price per serving
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto whitespace-nowrap">
              {recipe?.dishTypes.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-pastel-green"
                >
                  {tag}
                </span>
              ))}
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-leaf-brown border-leaf-brown hover:bg-leaf-brown hover:text-white"
              >
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
              src={recipe?.image}
              width={400}
              height={300}
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
              {recipe?.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.nameClean}</li>
              ))}
            </ul>

            <h2 className="mt-8 mb-4 text-2xl font-bold text-leaf-brown">
              Instructions
            </h2>
            <ol className="space-y-2 text-gray-700 list-decimal list-inside">
              {recipe?.analyzedInstructions[0].steps.map((instruction) => (
                <li key={instruction.number}>{instruction.step}</li>
              ))}
            </ol>
          </div>

          {/* Nutrition Facts Section */}
          <div>
            <span
              dangerouslySetInnerHTML={{ __html: nutritionLabelWidget }}
            ></span>
          </div>
        </div>
        {/* Related Recipes Section */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-leaf-brown">
            Related Recipes
          </h2>
          <div
            className="flex p-4 space-x-4 overflow-x-scroll"
            key={relatedRecipes?.map((recipe) => recipe.id)}
          >
            {relatedRecipes?.map((recipe) => (
              <RecipeCard
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                tags={recipe.tags}
                time={recipe.time}
                servings={recipe.servings}
              />
            ))}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#F4EDE2] rounded-2xl shadow-lg w-96 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-leaf-brown">
                  Choose Days
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-lg font-bold text-cherry-red hover:underline"
                >
                  Close
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {daysOfWeek.map((day) => (
                  <label
                    key={day}
                    className="flex items-center space-x-2 text-leaf-brown"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayToggle(day)}
                      className="form-checkbox"
                    />
                    <span className="text-lg font-medium">{day}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={handleDone}
                className="w-full py-2 mt-6 font-semibold text-white rounded-full bg-pastel-green hover:bg-opacity-60"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </section>
      <BackButton />
    </>
  );
};

export default RecipeDetails;
