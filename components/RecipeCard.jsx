// import React from 'react';

// const RecipeCard = ({ image, title, tags, time, servings }) => {
//   return (
//     <div className="max-w-xs bg-[#F4EDE2] rounded-lg shadow-md overflow-hidden">
//       {/* Image Section */}
//       <img src={image} alt={title} className="object-cover w-full h-40" />

//       {/* Content Section */}
//       <div className="p-4">
//         {/* Title and Bookmark */}
//         <div className="flex items-start justify-between">
//           <h2 className="text-xl font-semibold text-leaf-brown">{title}</h2>
//           <svg
//             className="w-6 h-6 cursor-pointer text-cherry-red"
//             fill="none"
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
//           {tags.map((tag, index) => (
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
//           Ready in: <span className="font-medium">{time}</span>
//         </p>
//         <p className="text-sm font-light text-leaf-brown">
//           Servings: <span className="font-medium">{servings}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;

import React, { useState } from "react";

const RecipeCard = ({ id, image, title, tags, time, servings }) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved(!isSaved);
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
          <h2 className="text-xl font-semibold text-leaf-brown">{title}</h2>
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
          {tags.map((tag, index) => (
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
          Ready in: <span className="font-medium">{time}</span>
        </p>
        <p className="text-sm font-light text-leaf-brown">
          Servings: <span className="font-medium">{servings}</span>
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;