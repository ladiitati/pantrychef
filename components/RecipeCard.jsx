// import React, { useState } from "react";
// import { supabase } from "@lib/supabase";
// import { useUser } from "@context/UserContext";

// const RecipeCard = ({ id, image, title, tags, time, servings }) => {
//   const [isSaved, setIsSaved] = useState(false);
//   const router = useRouter();

//   const user = useUser();

//   const toggleSave = async () => {
//     if (!user) {
//       alert("Please log in to save recipes.");
//       return;
//     }

//     console.log("Current User:", user);
//     try {
//       const { data, error } = await supabase.from("saved_recipes").insert({
//         user_id: user.id,
//         recipe_id: id,
//       });

//       if (error) {
//         console.error("Error saving recipe:", error.message);
//         alert("An error occurred while saving the recipe. Please try again.");
//         return;
//       }

//       console.log("Recipe saved successfully:", data);
//       setIsSaved(!isSaved); // Update the state to toggle the saved status.
//     } catch (err) {
//       console.error("Unexpected error:", err);
//     }
//   };

//   const handleRecipeClick = () => {
//     router.push(`/recipe?id=${id}`);
//     // console.log('clicked id' + id)
//   };

//   return (
//     <div
//       key={id}
//       className="max-w-xs bg-[#F4EDE2] rounded-lg shadow-md flex-none overflow-hidden"
//     >
//       {/* Image Section */}
//       <img src={image} alt={title} className="object-cover w-full h-40 " />

//       {/* Content Section */}
//       <div className="p-4">
//         {/* Title and Bookmark */}
//         <div className="flex items-start justify-between">
//           <h2
//             onClick={handleRecipeClick}
//             className="text-xl font-semibold cursor-pointer hover:underline text-leaf-brown"
//           >
//             {title}
//           </h2>
//           <svg
//             onClick={toggleSave}
//             className={`w-6 h-6 cursor-pointer transition-transform duration-400 ${
//               isSaved
//                 ? "text-cherry-red fill-cherry-red scale-110"
//                 : "text-cherry-red"
//             }`}
//             fill={isSaved ? "currentColor" : "none"}
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 3v18l7-5 7 5V3H5z"
//             />
//           </svg>
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mt-2">
//           {(Array.isArray(tags) ? tags : [tags]).map((tag, index) => (
//             <span
//               key={index}
//               className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-pastel-green"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Details */}
//         <p className="mt-4 text-sm font-light text-leaf-brown">
//           Ready in: <span className="font-medium">{time}</span> minutes
//         </p>
//         <p className="text-sm font-light text-leaf-brown">
//           Servings: <span className="font-medium">{servings}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { supabase } from "@lib/supabase";
import { useUser } from "@context/UserContext";
import { useRouter } from "next/navigation";

const RecipeCard = ({ id, image, title, tags, time, servings }) => {
  const [isSaved, setIsSaved] = useState(false);
  const user = useUser();
  const router = useRouter();

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
        alert(`"${title}" ADDED to Favorites`);
      }
    }
  };

  const handleRecipeClick = () => {
    if (!user) {
      alert("Please Login/Sign Up to view recipes");
      return
    }
    router.push(`/recipe?id=${id}`);
  };

  return (
    <div
      key={id}
      className="max-w-xs bg-[#F4EDE2] rounded-lg shadow-md flex-none overflow-hidden"
    >
      {/* Image Section */}
      <img src={image} alt={title} className="object-cover w-full h-40" />

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Bookmark */}
        <div className="flex items-start justify-between">
          <h2
            onClick={handleRecipeClick}
            className="text-xl font-semibold cursor-pointer hover:underline text-leaf-brown"
          >
            {title}
          </h2>
          <svg
            onClick={toggleSave}
            className={`w-6 h-6 cursor-pointer transition-transform duration-400 ${
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

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {(Array.isArray(tags) ? tags : [tags]).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-pastel-green"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Details */}
        <p className="mt-4 text-sm font-light text-leaf-brown">
          Ready in: <span className="font-medium">{time}</span> minutes
        </p>
        <p className="text-sm font-light text-leaf-brown">
          Servings: <span className="font-medium">{servings}</span>
        </p>
      </div>
    </div>
  );
};

// to refresh after unsave
// const RecipeCard = ({ id, image, title, tags, time, servings, onUnsave }) => {
//   const [isSaved, setIsSaved] = useState(false); // Assume saved in this case

//   const toggleSave = async () => {
//     if (isSaved) {
//       await onUnsave(id); // Call parent unsave handler
//       setIsSaved(false);
//     }
//   };

//   return (
//     <div className="max-w-xs bg-[#F4EDE2] rounded-lg shadow-md flex-none overflow-hidden">
//       <img src={image} alt={title} className="object-cover w-full h-40" />
//       <div className="p-4">
//         <div className="flex items-start justify-between">
//           <h2 className="text-xl font-semibold text-leaf-brown">{title}</h2>
//           <svg
//             onClick={toggleSave}
//             className={`w-6 h-6 cursor-pointer transition-transform duration-400 ${
//               isSaved
//                 ? "text-cherry-red fill-cherry-red scale-110"
//                 : "text-gray-400"
//             }`}
//             fill={isSaved ? "currentColor" : "none"}
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 3v18l7-5 7 5V3H5z"
//             />
//           </svg>
//         </div>
//         <p className="mt-4 text-sm font-light text-leaf-brown">
//           Ready in: {time} minutes
//         </p>
//         <p className="text-sm font-light text-leaf-brown">
//           Servings: {servings}
//         </p>
//       </div>
//     </div>
//   );
// };

export default RecipeCard;
