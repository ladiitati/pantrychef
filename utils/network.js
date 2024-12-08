export const fetchData = async (url) => {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    // Determine if `?` is already in the URL
    const separator = url.includes("?") ? "&" : "?";

    // Append the API key to the URL
    const fullUrl = `${url}${separator}apiKey=${apiKey}`;

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const fetchDataWithLocalStorageAndExpiry = async (url) => {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    // Determine if `?` is already in the URL
    const separator = url.includes("?") ? "&" : "?";

    // Append the API key to the URL
    const fullUrl = `${url}${separator}apiKey=${apiKey}`;

    // Create a unique cache key
    const cacheKey = `cache_${fullUrl}`;
    const cachedData = JSON.parse(localStorage.getItem(cacheKey));

    // Check if cache exists and is still valid
    const now = new Date();
    if (cachedData && now.getTime() < cachedData.expiry) {
      console.log("Serving from local storage cache:", fullUrl);
      return { data: cachedData.value, error: null };
    }

    // Fetch new data from the API
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Set expiry to 1 hour (3600 seconds) from now
    const expiry = now.getTime() + 86400 * 1000;
    localStorage.setItem(cacheKey, JSON.stringify({ value: data, expiry }));

    console.log("Serving fresh data:", fullUrl);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};


export const fetchHtmlDataWithLocalStorageAndExpiry = async (url) => {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "text/html",
      },
    };

    // Determine if `?` is already in the URL
    const separator = url.includes("?") ? "&" : "?";

    // Append the API key to the URL
    const fullUrl = `${url}${separator}apiKey=${apiKey}`;

    // Create a unique cache key
    const cacheKey = `cache_${fullUrl}`;
    const cachedData = JSON.parse(localStorage.getItem(cacheKey));

    // Check if cache exists and is still valid
    const now = new Date();
    if (cachedData && now.getTime() < cachedData.expiry) {
      console.log("Serving from local storage cache:", fullUrl);
      return { data: cachedData.value, error: null };
    }

    // Fetch new data from the API
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    // Set expiry to 1 hour (3600 seconds) from now
    const expiry = now.getTime() + 86400 * 1000;
    localStorage.setItem(cacheKey, JSON.stringify({ value: data, expiry }));

    console.log("Serving fresh data:", fullUrl);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
