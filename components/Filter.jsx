import React from "react";

const Filter = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[1022px] px-4 py-4 border-b border-leaf-brown">
        <div className="flex items-center justify-between">
          {/* Filter Section */}
          <div className="flex items-center gap-2">
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
            <span className="text-sm font-medium cursor-pointer text-pastel-green hover:underline">
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
    </div>
  );
};

export default Filter;
