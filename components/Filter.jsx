// import React, { useState } from "react";

// const Filter = ({ onFilterSubmit }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [diet, setDiet] = useState("");
//   const [cuisine, setCuisine] = useState("");
//   const [mealType, setMealType] = useState("");
//   const [maxTime, setMaxTime] = useState("");

//   const handleFilterSubmit = () => {
//     const filters = {
//       diet,
//       cuisine,
//       mealType,
//       maxTime,
//     };
//     onFilterSubmit(filters);
//     setIsModalOpen(false); // Close modal when filters are applied
//   };

//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-[1022px] px-4 py-4 border-b border-leaf-brown">
//         <div className="flex items-center justify-between">
//           {/* Filter Section */}
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-5 h-5 text-gray-500"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12v5a1 1 0 01-.553.894l-4 2A1 1 0 019 19v-7L3.293 6.707A1 1 0 013 6V4z"
//               />
//             </svg>
//             <span className="text-sm font-medium text-pastel-green hover:underline">
//               Filter
//             </span>
//           </div>

//           {/* Sort Section */}
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium text-gray-700">Sort By</span>
//             <span className="flex items-center text-sm font-medium cursor-pointer text-pastel-green hover:underline">
//               Relevance
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-4 h-4 ml-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Filter Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-[#F4EDE2] rounded-2xl shadow-lg w-96 p-6">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-leaf-brown">
//                 Filter Recipes By:
//               </h2>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="text-lg font-bold text-cherry-red hover:underline"
//               >
//                 Close
//               </button>
//             </div>
//             {/* Dietary Preferences */}
//             <div className="mb-4">
//               <label className="block mb-2 font-medium">Dietary Preference</label>
//               <select
//                 value={diet}
//                 onChange={(e) => setDiet(e.target.value)}
//                 className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
//               >
//                 <option value="">Select Diet</option>
//                 <option value="vegan">Vegan</option>
//                 <option value="vegetarian">Vegetarian</option>
//                 <option value="gluten free">Gluten Free</option>
//                 <option value="pescatarian">Pescatarian</option>
//                 <option value="ketogenic">Ketogenic</option>
//               </select>
//             </div>

//             {/* Cuisine Type */}
//             <div className="mb-4">
//               <label className="block mb-2 font-medium">Cuisine Type</label>
//               <select
//                 value={cuisine}
//                 onChange={(e) => setCuisine(e.target.value)}
//                 className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
//               >
//                 <option value="">Select Cuisine</option>
//                 <option value="italian">Italian</option>
//                 <option value="mexican">Mexican</option>
//                 <option value="chinese">Chinese</option>
//                 <option value="indian">Indian</option>
//                 <option value="french">French</option>
//               </select>
//             </div>

//             {/* Meal Type */}
//             <div className="mb-4">
//               <label className="block mb-2 font-medium">Meal Type</label>
//               <select
//                 value={mealType}
//                 onChange={(e) => setMealType(e.target.value)}
//                 className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
//               >
//                 <option value="">Select Meal Type</option>
//                 <option value="breakfast">Breakfast</option>
//                 <option value="lunch">Lunch</option>
//                 <option value="dinner">Dinner</option>
//                 <option value="snack">Snack</option>
//                 <option value="dessert">Dessert</option>
//               </select>
//             </div>

//             {/* Max Preparation Time */}
//             <div className="mb-6">
//               <label className="block mb-2 font-medium">Max Prep Time (minutes)</label>
//               <input
//                 type="number"
//                 value={maxTime}
//                 onChange={(e) => setMaxTime(e.target.value)}
//                 placeholder="Enter max time in minutes"
//                 className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
//               />
//             </div>

//             {/* Apply Filters Button */}
//             <button
//               onClick={handleFilterSubmit}
//               className="w-full py-3 font-semibold text-white transition duration-300 rounded-full bg-pastel-green hover:bg-opacity-70"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Filter;

import React, { useState } from "react";
import Tag from "./Tag";

const Filter = ({ onFilterSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterSubmit = () => {
    const filters = {
      diet,
      cuisine,
      mealType,
      maxTime,
    };

    // Update selectedFilters dynamically
    const newFilters = [
      ...(diet ? [{ type: "Diet", value: diet }] : []),
      ...(cuisine ? [{ type: "Cuisine", value: cuisine }] : []),
      ...(mealType ? [{ type: "Meal Type", value: mealType }] : []),
      ...(maxTime ? [{ type: "Max Time", value: `${maxTime} min` }] : []),
    ];

    setSelectedFilters(newFilters);

    onFilterSubmit(filters);
    setIsModalOpen(false); 
  };

  const handleRemoveTag = (type) => {
    // Remove the filter dynamically
    if (type === "Diet") setDiet("");
    if (type === "Cuisine") setCuisine("");
    if (type === "Meal Type") setMealType("");
    if (type === "Max Time") setMaxTime("");

    // Update selectedFilters by removing the specific tag
    setSelectedFilters((prev) => prev.filter((filter) => filter.type !== type));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[1022px] px-4 py-4 border-b border-leaf-brown">
        <div className="flex items-center justify-between">
          {/* Filter Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 12v5a1 1 0 01-.553.894l-4 2A1 1 0 019 19v-7L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            <span className="text-sm font-medium text-pastel-green hover:underline">
              Filter
            </span>
          </div>

          {/* Sort Section */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort By</span>
            <span className="flex items-center text-sm font-medium cursor-pointer text-pastel-green hover:underline">
              Relevance
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Selected Filters Display */}
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedFilters.map((filter, index) => (
          <Tag
            key={index}
            label={`${filter.type}: ${filter.value}`}
            onRemove={() => handleRemoveTag(filter.type)}
          />
        ))}
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#F4EDE2] rounded-2xl shadow-lg w-96 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-leaf-brown">
                Filter Recipes By:
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-lg font-bold text-cherry-red hover:underline"
              >
                Close
              </button>
            </div>
            {/* Dietary Preferences */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Dietary Preference</label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
              >
                <option value="">Select Diet</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="gluten free">Gluten Free</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="ketogenic">Ketogenic</option>
              </select>
            </div>

            {/* Cuisine Type */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Cuisine Type</label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
              >
                <option value="">Select Cuisine</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                <option value="indian">Indian</option>
                <option value="french">French</option>
              </select>
            </div>

            {/* Meal Type */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
              >
                <option value="">Select Meal Type</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>

            {/* Max Preparation Time */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Max Prep Time (minutes)</label>
              <input
                type="number"
                value={maxTime}
                onChange={(e) => setMaxTime(e.target.value)}
                placeholder="Enter max time in minutes"
                className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-green"
              />
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={handleFilterSubmit}
              className="w-full py-3 font-semibold text-white transition duration-300 rounded-full bg-pastel-green hover:bg-opacity-70"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
