"use client";
import React, { useState } from "react";
import Navbar from "@components/Navbar";
import Tag from "@components/Tag";

const MealPlanTable = () => {
  // Sample data for the week
  const [weekData, setWeekData] = useState({
    Sunday: ["Jamaican Beans & Peas", "Chocolate Chip Peanut Butter Oatmeal"],
    Monday: [
      "Jamaican Beans & Peas",
      "Chocolate Chip Peanut Butter Oatmeal",
      "Jamaican Beans & Peas",
    ],
    Tuesday: [
      "Jamaican Beans & Peas",
      "Chocolate Chip Peanut Butter Oatmeal",
      "Chocolate Chip Peanut Butter Oatmeal",
      "Rice & Stew",
    ],
    Wednesday: ["Chocolate Chip Peanut Butter Oatmeal"],
    Thursday: [],
    Friday: [
      "Jamaican Beans & Peas",
      "Chocolate Chip Peanut Butter Oatmeal",
      "Jamaican Beans & Peas",
    ],
    Saturday: [],
  });

  // Function to remove a tag from the respective day's meals
  const handleRemoveTag = (day, meal) => {
    setWeekData((prevData) => ({
      ...prevData,
      [day]: prevData[day].filter((item) => item !== meal),
    }));
  };

  return (
    <div className="w-full mx-auto">
    <div className="mb-10">
    <Navbar />
    </div>
      <table className="w-full border border-collapse border-gray-300">
        <thead>
          <tr>
            <th className="p-4 text-left text-white bg-pastel-green">Day</th>
            <th className="p-4 text-left text-white bg-pastel-green">Meals</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(weekData).map(([day, meals]) => (
            <tr key={day} className="border-t border-gray-300">
              {/* Day Column */}
              <td className="p-4 text-sm font-medium bg-[#D9A99E] text-white">
                {day}
              </td>

              {/* Meals Column */}
              <td className="p-4 bg-[#F4EDE2]">
                <div className="flex flex-wrap gap-2">
                  {meals.length > 0 ? (
                    meals.map((meal, index) => (
                      <Tag
                        key={`${day}-${index}`}
                        label={meal}
                        onRemove={() => handleRemoveTag(day, meal)}
                      />
                    ))
                  ) : (
                    <span className="text-sm italic text-gray-500">
                      No meals planned
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealPlanTable;
