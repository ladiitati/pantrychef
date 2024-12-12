"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@context/UserContext";
import { supabase } from "@lib/supabase";

const RecipeOfTheDay = ({
  id,
  image,
  title,
  time,
  servings,
  dishTypes,
  summary,
}) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const user = useUser();

  const [showFullSummary, setShowFullSummary] = useState(false);

  const toggleSummary = () => {
    setShowFullSummary(!showFullSummary);
  };

  const handleSeeFullRecipe = () => {
    router.push(`/recipe?id=${id}`);
  };
  // Truncate the summary if not expanded
  // const truncatedSummary = summary.slice(0, 250) + "...";

  const toggleSave = async () => {
    if (!user?.id) {
      console.log("User must be logged in to save a recipe.");
      alert("You must be logged in to save a recipe");
      return;
    }

    if (isSaved) {
      // Unsave the recipe
      const { error } = await supabase
        .from("saved_recipes")
        .delete()
        .eq("user_id", user.id)
        .eq("recipe_id", id);

      if (error) {
        console.error("Error unsaving recipe:", error.message);
      } else {
        setIsSaved(false);
        alert(`"${title}" REMOVED from Favorites`);
      }
    } else {
      // Save the recipe
      const { error } = await supabase.from("saved_recipes").insert({
        user_id: user.id,
        recipe_id: id,
      });

      if (error) {
        console.error("Error saving recipe:", error.message);
      } else {
        setIsSaved(true);
        alert(`${title} added to Favorites`);
      }
    }
  };

  useEffect(() => {
    // Check if the recipe is already saved for this user
    const checkIfSaved = async () => {
      if (!user?.id) return;
      const { data, error } = await supabase
        .from("saved_recipes")
        .select("id")
        .eq("user_id", user.id)
        .eq("recipe_id", id);
      if (data && data.length > 0) {
        setIsSaved(true);
      }
    };
    checkIfSaved();
  }, [user, id]);
  console.log(dishTypes);

  return (
    <div
      key={id}
      className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg md:flex-row bg-beige text-leaf-brown"
    >
      {/* Image Section */}
      <div className="order-1 w-full md:w-1/3 md:order-none">
        <img
          src={image}
          width={400}
          height={300}
          alt="Recipe Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-2/3 p-6 bg-[#F4EDE2]">
        <div className="flex items-start justify-between">
          <h2 className="text-3xl font-semibold hover:underline sm:text-4xl md:text-5xl font-mulish text-leaf-brown">
            {title}
          </h2>
          <svg
            onClick={toggleSave}
            className={`w-12 h-12 cursor-pointer transition-transform duration-400 ${
              isSaved
                ? "text-cherry-red fill-cherry-red scale-110"
                : "text-cherry-red"
            }`}
            fill={isSaved ? "currentColor" : "none"}
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
          <span className="font-semibold">Ready in:</span> {time} minutes
        </p>
        <p className="text-base font-light sm:text-lg md:text-xl font-mulish text-leaf-brown">
          <span className="font-semibold">Servings:</span> {servings}
        </p>
        <p className="text-base font-light sm:text-lg md:text-xl font-mulish text-leaf-brown">
          <span className="font-semibold">Dish Type(s):</span>{" "}
          {dishTypes.map((dishType) => " " + dishType + ",")}
        </p>
        <p className="text-base font-light sm:text-lg md:text-xl font-mulish text-leaf-brown">
          <span className="font-semibold">Summary:</span>{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: showFullSummary
                ? summary || "No summary available."
                : (summary || "No summary available.").slice(0, 150) + "...",
            }}
          ></span>
          {summary && summary.length > 250 && (
            <button
              className="ml-2 text-sm underline text-pastel-green"
              onClick={toggleSummary}
            >
              {showFullSummary ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSeeFullRecipe}
            className="px-4 py-2 mt-6 text-sm font-semibold text-white rounded-full sm:text-base md:text-lg bg-pastel-green hover:bg-opacity-60"
          >
            See full Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeOfTheDay;
