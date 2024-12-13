"use client";
import React from "react";
import Filter from "@components/Filter";
import RecipeGrid from "@components/RecipeGrid";
import Navbar from "@components/Navbar";
import recipes from "@models/recipes";
import RecipeOfTheDay from "@components/RecipeOfTheDay";
import RecipeCard from "@components/RecipeCard";
import { useState, useEffect } from "react";
import SearchBarWithTags from "@components/SearchBarWithTags";
import jokeImage from "../public/assets/images/png/jokeImage.png";
import triviaImage from "../public/assets/images/png/triviaImage.png";
import Image from "next/image";
import { fetchData, fetchDataWithLocalStorageAndExpiry } from "@utils/network";
import { supabase } from "@lib/supabase";
import { useUser } from "@context/UserContext";

require("dotenv").config();

const Home = () => {
  const [isSaved, setIsSaved] = useState(false);
  const user = useUser();

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("isSaved")) || false;
    setIsSaved(savedState);
  }, []);

  const toggleSave = () => {
    setIsSaved(!isSaved);
    localStorage.setItem("isSaved", JSON.stringify(!isSaved));
  };

  const [fullRecipes, setFullRecipes] = useState([]); // Full data
  const [firstRecipe, setFirstRecipe] = useState([]); // First recipe
  const [simplifiedRecipes, setSimplifiedRecipes] = useState([]); // Simplified data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const [trivia, setTrivia] = useState("");
  const [joke, setJoke] = useState("");

  const fetchRandomRecipes = async () => {
    const url = `https://api.spoonacular.com/recipes/random?number=20`;
    try {
      const { data, error } = await fetchDataWithLocalStorageAndExpiry(url);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      const recipes = data?.recipes || [];
      setFullRecipes(recipes); // Save full data
      setFirstRecipe(recipes[0]); // Set first recipe

      // Process simplified data
      const simplified = recipes.map((recipe) => ({
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        tags: recipe.dishTypes?.[0] || [], // First tag or fallback
        time: recipe.readyInMinutes || "N/A",
        servings: recipe.servings || "N/A",
      }));

      setSimplifiedRecipes(simplified);
      setLoading(false); // Data has been fetched
    } catch (err) {
      setError(err.message);
      setLoading(false); // Stop loading on error
    }
  };

  const fetchRandomTrivia = async () => {
    const url = `https://api.spoonacular.com/food/trivia/random`;

    const { data, error } = await fetchDataWithLocalStorageAndExpiry(url);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      setTrivia(data?.text || "No trivia available.");
      setLoading(false);
    }
  };

  const fetchRandomJoke = async () => {
    const url = `https://api.spoonacular.com/food/jokes/random`;

    const { data, error } = await fetchDataWithLocalStorageAndExpiry(url);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      setJoke(data?.text || "No Joke available.");
      setLoading(false);
    }
  };

  console.log("simplified recipes", simplifiedRecipes[0]);
  console.log("first recipes", firstRecipe);

  const [searchTags, setSearchTags] = useState();

  const [searchPage, setIsSearchPage] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [detailedSearchData, setDetailedSearchData] = useState([]);

  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [errorLoadingSearchResults, setErrorLoadingSearchResults] =
    useState(false);

  const handleSearchTagsChange = (updatedTags) => {
    setSearchTags(updatedTags);
    console.log("search parameters", updatedTags);
  };

  const buildIngredientsQuery = (searchTags) => {
    return searchTags.join(",+");
  };

  // const fetchSearchResults = async () => {
  //   setLoadingSearchResults(true);
  //   setErrorLoadingSearchResults(false);

  //   try {
  //     // Fetch search results
  //     const baseUrl = `https://api.spoonacular.com/recipes/findByIngredients`;
  //     const ingredientsQuery = buildIngredientsQuery(searchTags);
  //     const numberOfResults = 10;

  //     const fullUrl = `${baseUrl}?ingredients=${ingredientsQuery}&number=${numberOfResults}`;

  //     const { data, error } = await fetchDataWithLocalStorageAndExpiry(fullUrl);

  //     if (error) {
  //       console.error("Error fetching recipes:", error);
  //       setLoadingSearchResults(false);
  //       setErrorLoadingSearchResults(true);
  //       return;
  //     }

  //     console.log("Search Results:", data);

  //     // Fetch detailed information for each search result
  //     const detailedSearchResult = await Promise.all(
  //       data.map(async (searchResult) => {
  //         const detailedSearchResultUrl = `https://api.spoonacular.com/recipes/${searchResult.id}/information`;

  //         const { data: detailedData, error: detailedSearchError } =
  //           await fetchData(detailedSearchResultUrl);

  //         if (detailedSearchError) {
  //           console.error(
  //             `Failed to fetch details for search result id ${searchResult.id}:`,
  //             detailedSearchError
  //           );
  //           return null; // Skip this item on error
  //         }

  //         return {
  //           id: detailedData.id,
  //           image: detailedData.image,
  //           title: detailedData.title,
  //           tags: detailedData.dishTypes || [], // Default to empty array if no tags
  //           time: detailedData.readyInMinutes,
  //           servings: detailedData.servings,
  //         };
  //       })
  //     );

  //     console.log("Detailed Search Results:", detailedSearchResult);

  //     // Filter out any null values
  //     const validResults = detailedSearchResult.filter((item) => item !== null);

  //     // Update state
  //     setSearchResults(data); // Original search results
  //     setDetailedSearchData(validResults); // Detailed information

  //     setLoadingSearchResults(false);
  //   } catch (err) {
  //     console.error("An unexpected error occurred:", err);
  //     setErrorLoadingSearchResults(true);
  //   } finally {
  //     setLoadingSearchResults(false);
  //   }
  // };

  const fetchSearchResults = async () => {
    setLoadingSearchResults(true);
    setErrorLoadingSearchResults(false);
  
    try {
      // Fetch search results
      const baseUrl = `https://api.spoonacular.com/recipes/findByIngredients`;
      const ingredientsQuery = buildIngredientsQuery(searchTags);
      const numberOfResults = 20;
  
      const fullUrl = `${baseUrl}?ingredients=${ingredientsQuery}&number=${numberOfResults}`;
  
      const { data, error } = await fetchDataWithLocalStorageAndExpiry(fullUrl);
  
      if (error) {
        console.error("Error fetching recipes:", error);
        setLoadingSearchResults(false);
        setErrorLoadingSearchResults(true);
        return;
      }
  
      console.log("Search Results:", data);
  
      // Extract all recipe IDs
      const recipeIds = data.map((searchResult) => searchResult.id).join(",");
  
      // Fetch detailed information for all search results using the bulk endpoint
      const detailedSearchResultUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}`;
      const { data: detailedData, error: bulkError } = await fetchData(detailedSearchResultUrl);
  
      if (bulkError) {
        console.error("Error fetching detailed recipes:", bulkError);
        setLoadingSearchResults(false);
        setErrorLoadingSearchResults(true);
        return;
      }
  
      console.log("Detailed Bulk Search Results:", detailedData);
  
      // Transform and store the detailed data
      const validResults = detailedData.map((recipe) => ({
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        tags: recipe.dishTypes || [], // Default to empty array if no tags
        time: recipe.readyInMinutes,
        servings: recipe.servings,
      }));
  
      // Update state
      setSearchResults(data); // Original search results
      setDetailedSearchData(validResults); // Detailed information
  
      setLoadingSearchResults(false);
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      setErrorLoadingSearchResults(true);
    } finally {
      setLoadingSearchResults(false);
    }
  };  


  const handleGenerateSearchResults = () => {
    setIsSearchPage(true);
    setLoadingSearchResults(true);
    fetchSearchResults();
  };

  const [idsOfFilteredResults, setIdsOfFilteredResults] = useState([]);
  const [filteredData, setFilteredData] = useState();

  const buildFilterQuery = (filters) => {
    return Object.entries(filters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  };

  const handleFilterSubmit = async (filters) => {

    console.log("Applied Filters: ", filters);
    const baseUrl = `https://api.spoonacular.com/recipes/complexSearch`;
    const filterQuery = buildFilterQuery(filters);
    const numberOfResults = 20;

    const fullUrl = `${baseUrl}?includeIngredients=${searchTags}&${filterQuery}&number=${numberOfResults}`;

    console.log(fullUrl);

    const { data: filteredResults, error } =
      await fetchDataWithLocalStorageAndExpiry(fullUrl);

    if (error) {
      setError(error);
      setLoading(false);
    } else {
      console.log("Filtered Results", filteredResults);
      const ids = filteredResults.results.map((recipe) => recipe.id);
      setIdsOfFilteredResults(ids);
      console.log("Id of filtered results", idsOfFilteredResults);
      console.log(ids);
    }
  };

  const fetchBulkIds = async () => {
    if (idsOfFilteredResults.length === 0) return;

    const ids = idsOfFilteredResults.join(",");
    const url = `https://api.spoonacular.com/recipes/informationBulk`;
    const fullUrl = `${url}?ids=${ids}`;

    try {
      const { data, error } = await fetchDataWithLocalStorageAndExpiry(fullUrl);
      if (error) {
        setError(error);
        setLoading(false);
        return;
      } else {
        console.log("ids of filitered results", ids);
        console.log("url to fetch bulk data", fullUrl);
        console.log("filteredResults", data);

        const detailedFilteredData = data.map((recipe) => ({
          id: recipe.id,
          image: recipe.image,
          title: recipe.title,
          tags: recipe.dishTypes || [], // Default to empty array if no tags
          time: recipe.readyInMinutes,
          servings: recipe.servings,
        }));

        console.log("Filtered Recipe Details:", detailedFilteredData);

        setFilteredData(detailedFilteredData);
        console.log("detailed filter data:", filteredData);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "profile email",
      },
    });

    if (user) {
      await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
      });
    }
  };

  // useEffect(() => {
  //   fetchRandomRecipes();
  //   fetchRandomTrivia();
  //   fetchRandomJoke();
  //   console.log("Detailed Search Data Updated:", detailedSearchData);
  //   if (idsOfFilteredResults.length > 0) {
  //     fetchBulkIds();
  //   }
  // }, [detailedSearchData, idsOfFilteredResults]);

  useEffect(() => {
    fetchRandomRecipes();
    fetchRandomTrivia();
    fetchRandomJoke();
  }, []); // Runs once on mount

  // Trigger bulk fetch when `idsOfFilteredResults` changes
  useEffect(() => {
    if (idsOfFilteredResults.length > 0) {
      fetchBulkIds();
    }
  }, [idsOfFilteredResults]);

  return (
    <div>
      <Navbar />

      {/* Hero section */}
      <section
        className={`hero-page text-center h-[510px] bg-hero bg-no-repeat bg-cover bg-center pt-10 text-white`}
      >
        <div className="container px-4 mx-auto">
          {/* Title */}
          <h1 className="font-playfair font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-tight">
            What’s In Your Kitchen Today?
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto mt-6 text-base font-semibold text-center sm:max-w-2xl md:max-w-3xl sm:mt-8 sm:text-lg md:text-xl">
            PantryChef helps you find new meals you can make with the
            ingredients you already have. Just enter the ingredients and press
            generate to find what you can make with your ingredients.
          </p>

          {/* Search Bar */}
          <div className="mt-6 sm:mt-8">
            <SearchBarWithTags
              onTagsChange={handleSearchTagsChange}
              onClickGenerate={handleGenerateSearchResults}
            />
          </div>
        </div>
      </section>

      {searchPage ? (
        <div className="search-page">
          <section className="mt-20 mb-20 filter-bar">
            <Filter onFilterSubmit={handleFilterSubmit} />
          </section>
          {loadingSearchResults ? (
            <p className="text-3xl text-center">Loading search results...</p>
          ) : (
            <section className="search-results">
              {filteredData?.length > 0 ? (
                <h1 className="text-4xl font-bold text-center font-mulish text-pastel-green">
                  {filteredData?.length - 1} + Filtered Recipes
                </h1>
              ) : (
                <h1 className="text-4xl font-bold text-center font-mulish text-pastel-green">
                  {searchResults.length - 1} + Suggested Recipes
                </h1>
              )}
              {/* <h1 className="text-4xl font-bold text-center font-mulish text-pastel-green">
                {searchResults.length - 1} + Suggested Recipes
              </h1> */}
              {filteredData?.length > 0 ? (
                <RecipeGrid recipes={filteredData} />
              ) : (
                <RecipeGrid recipes={detailedSearchData} />
              )}
            </section>
          )}
          {errorLoadingSearchResults && (
            <p className="text-red-500">Error: {error}</p>
          )}
        </div>
      ) : (
        <div className="home-page">
          {/* Recipe of the day section */}
          <section className="recipe-of-the-day mt-14">
            <h1 className="mb-10 text-4xl font-normal text-center underline font-playfair text-pastel-green">
              What’s The Recipe Of <i>Today </i> ?
            </h1>
            <RecipeOfTheDay
              id={firstRecipe.id}
              image={firstRecipe.image}
              title={firstRecipe.title}
              time={firstRecipe.time}
              servings={firstRecipe.servings}
              dishTypes={firstRecipe.dishTypes || []}
              summary={firstRecipe.summary}
            />
          </section>

          {/* call to action section */}
          {user ? (
            <p className="mt-24 mb-24"></p>
          ) : (
            <section className="relative flex items-center h-auto px-6 py-12 mt-24 mb-24 bg-center bg-cover sm:px-10 bg-hero">
              {/* Text and Button Wrapper */}
              <div className="flex flex-col items-center justify-between w-full max-w-5xl mx-auto md:flex-row">
                {/* Text Section */}
                <div className="text-center text-white md:text-left">
                  <h1 className="w-full text-2xl font-normal leading-tight sm:text-3xl md:text-4xl lg:text-5xl font-playfair">
                    Create An Account Today To Save Your Favorite Recipes for
                    Later!!
                  </h1>
                </div>

                {/* Button Section */}
                <div className="mt-6 md:mt-0">
                  <button
                    onClick={handleLogin}
                    className="px-6 py-4 text-lg font-semibold leading-none text-white rounded-full sm:text-xl md:text-2xl lg:text-3xl font-mulish bg-pastel-green hover:bg-pastel-green hover:bg-opacity-60"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* What's new today section  */}
          <section className="whats-new-today ">
            <h1 className="mb-10 text-4xl font-normal text-center underline font-playfair text-pastel-green">
              What’s New <i>Today </i> ?
            </h1>
            {loading && <p>Loading recipes...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && simplifiedRecipes.length === 0 && (
              <p>No recipes available at the moment.</p>
            )}

            <div
              className="flex p-4 space-x-4 overflow-x-scroll"
              key={recipes.map((recipe) => recipe.id)}
            >
              {simplifiedRecipes.map((recipe) => (
                <RecipeCard
                  id={recipe.id}
                  image={recipe.image} // Replace with your image URL
                  title={recipe.title}
                  tags={recipe.tags}
                  time={recipe.time}
                  servings={recipe.servings}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Trivia of the day section */}
      <section className="flex flex-col items-center justify-between h-auto px-6 py-16 mt-24 trivia md:flex-row sm:px-10 bg-pastel-green">
        {/* Left Side: Heading */}
        <div className="w-full px-4 text-center text-white md:w-1/2 md:text-left sm:px-6 md:ml-24">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-[65px] leading-tight font-playfair">
            What’s The Trivia Of <span className="italic">Today</span>?
          </h1>
        </div>

        {/* Right Side: Image with Overlay */}
        <div className="relative w-full mt-8 md:w-1/3 md:mt-0 md:mr-24">
          {/* Background Image */}
          <Image
            src={triviaImage}
            alt="Trivia"
            className="h-[240px] sm:h-[280px] md:h-[340px] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] object-cover w-full"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 bg-black bg-opacity-50 rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
            <p className="text-sm leading-relaxed text-center sm:text-base md:text-lg font-mulish text-light-brown">
              {trivia}
            </p>
          </div>
        </div>
      </section>

      {/* Joke of the day section */}
      <section className="flex flex-col-reverse items-center justify-between h-auto px-6 py-12 mt-24 joke md:flex-row sm:px-10 bg-pastel-green">
        {/* Right Side: Image with Overlay */}
        <div className="relative w-full mt-8 md:w-1/3 md:mt-0 md:ml-12">
          {/* Background Image */}
          <Image
            src={jokeImage}
            alt="Joke"
            className="h-[240px] sm:h-[280px] md:h-[340px] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] object-cover w-full"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 bg-black bg-opacity-50 rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
            <p className="text-sm leading-relaxed text-center sm:text-base md:text-lg font-mulish text-light-brown">
              {joke}
            </p>
          </div>
        </div>

        {/* Left Side: Heading */}
        <div className="w-full px-3 text-center text-white md:w-1/2 md:text-right sm:px-6 md:mr-12">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-[70px] leading-tight font-playfair">
            What’s The Joke Of <span className="italic">Today</span>?
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
