export const fetchCountryData = async () => {
  try {
    const url =
      "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
};
