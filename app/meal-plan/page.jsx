"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@components/Navbar";
import Tag from "@components/Tag";
import { supabase } from "@lib/supabase";
import { useUser } from "@context/UserContext";
import { useRouter } from "next/navigation";
import BackButton from "@components/BackButton";

const MealPlanTable = () => {
  const [weekData, setWeekData] = useState({});
  const user = useUser();
  const router = useRouter();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fetchMealPlan = async () => {
    try {
      const { data, error } = await supabase
        .from("meal_plan")
        .select("day_of_week, recipe_name, recipe_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching meal plan:", error.message);
      } else {
        const transformedData = data.reduce((acc, item) => {
          if (!acc[item.day_of_week]) {
            acc[item.day_of_week] = [];
          }
          acc[item.day_of_week].push({
            recipe_name: item.recipe_name,
            recipe_id: item.recipe_id,
          });
          return acc;
        }, {});

        setWeekData(transformedData);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleRemoveTag = async (day, recipeName) => {
    try {
      const { error } = await supabase
        .from("meal_plan")
        .delete()
        .eq("user_id", user.id)
        .eq("day_of_week", day)
        .eq("recipe_name", recipeName);

      if (error) {
        console.error("Error removing meal from plan:", error.message);
      } else {
        setWeekData((prevData) => ({
          ...prevData,
          [day]: prevData[day].filter(
            (item) => item.recipe_name !== recipeName
          ),
        }));
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMealPlan();
    }
  }, [user]);

  if (!user) {
    return <p>Please Login to view your meal planner</p>;
  }

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
          {daysOfWeek.map((day) => (
            <tr key={day} className="border-t border-gray-300">
              <td className="p-4 text-sm font-medium bg-[#D9A99E] text-white">
                {day}
              </td>
              <td className="p-4 bg-[#F4EDE2]">
                <div className="flex flex-wrap gap-2">
                  {weekData[day] && weekData[day].length > 0 ? (
                    weekData[day].map((meal, index) => (
                      <a key={`${day}-${index}`} className="hover:underline">
                        <Tag
                          label={meal.recipe_name}
                          onRemove={() =>
                            handleRemoveTag(day, meal.recipe_name)
                          }
                          onClickRecipeTitle={() =>
                            router.push(`/recipe?id=${meal.recipe_id}`)
                          }
                        />
                      </a>
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
      <BackButton />
    </div>
  );
};

export default MealPlanTable;
