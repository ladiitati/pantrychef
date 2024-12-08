import React from "react";
import { useRouter } from "next/navigation";

const BackButton = ({ position = "bottom-left" }) => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/"); // Fallback if no history
    }
  };

  // Determine the positioning classes based on the `position` prop
  const positionClasses =
    position === "bottom-left"
      ? "left-5 bottom-5"
      : position === "bottom-right"
      ? "right-5 bottom-5"
      : position === "top-left"
      ? "left-5 top-5"
      : "right-5 top-5";

  return (
    <button
      onClick={handleBack}
      className={`fixed ${positionClasses} z-50 flex items-center px-4 py-2 text-white bg-pastel-green rounded-full hover:bg-opacity-80 shadow-md`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Go Back
    </button>
  );
};

export default BackButton;
