import React from "react";

const Tag = ({ label, onRemove }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-full bg-pastel-green">
      {/* Tag Label */}
      <span>{label}</span>

      {/* Close Button */}
      <button
        onClick={onRemove}
        className="text-black hover:text-gray-800 focus:outline-none"
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Tag;
