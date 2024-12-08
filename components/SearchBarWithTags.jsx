"use client";
import React, { useState } from "react";
import Image from "next/image";
import Tag from "./Tag";
import searchIcon from "../public/assets/icons/svg/searchIcon.svg";

const SearchBarWithTags = ({ onTagsChange, onClickGenerate }) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check for commas
    if (value.includes(",")) {
      const splitValues = value.split(",");
      const newTags = splitValues.slice(0, -1); // Exclude the empty value after the last comma
      const updatedTags = [
        ...tags,
        ...newTags.map((tag) => tag.trim()).filter((tag) => tag),
      ]; // Trim and remove empty tags
      setTags(updatedTags);
      onTagsChange(updatedTags);
      setInputValue(""); // Reset input after processing
    } else {
      setInputValue(value); // Update input value
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  // Handle Generate Button Click
  const handleGenerate = () => {
    // console.log("Searched Items:", tags); // Log the tags array
    // alert(`Searched Items: ${tags.join(", ")}`); // Optional: show alert with tags
    // setTags([]); Incase of event where all tags should be clearede when "Generate" is clicked 
    onClickGenerate();
  };

  return (
    <div className="recipe-action pt-7">
      {/* Search Bar */}
      <div className="flex items-center max-w-lg p-3 mx-auto my-4 mb-6 bg-white rounded-full shadow-md">
        <Image src={searchIcon} width={25} height={25} alt="Chef Hat Icon" />
        <div className="flex flex-wrap items-center w-full gap-2 ml-4">
          {/* Tags */}
          {tags.map((tag, index) => (
            <Tag
              key={index}
              label={tag}
              onRemove={() => handleRemoveTag(tag)}
            />
          ))}
          {/* Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={
              tags.length === 0 && inputValue === ""
                ? "Add Ingredients (e.g. egg, flour, milk, nutmeg...)"
                : ""
            }
            className="flex-grow text-green-700 bg-transparent focus:outline-none placeholder-pastel-green placeholder-opacity-60"
          />
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="px-6 py-2 text-lg rounded-full bg-pastel-green hover:bg-pastel-green hover:bg-opacity-60"
      >
        Generate
      </button>
    </div>
  );
};

export default SearchBarWithTags;
