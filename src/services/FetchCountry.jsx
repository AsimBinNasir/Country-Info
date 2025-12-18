const mapCountries = (data) => {
  return data.map((c) => ({
    ...c,
    name: c.name,
    nativeName: c.name?.nativeName
      ? Object.values(c.name.nativeName)[0]
        ? Object.values(c.name.nativeName)[0].common
        : c.name.common
      : c.name.common,
    capital: c.capital,
    region: c.region,
    subregion: c.subregion || "N/A",
    topLevelDomain: c.tld?.join(', ') || "N/A",
    currencies: c.currencies
      ? Object.values(c.currencies)
          .map((currency) => currency.name)
          .join(', ')
      : "N/A",
    languages: c.languages
      ? Object.values(c.languages).join(', ')
      : "N/A",
    borders: c.borders || [],
    flags: c.flags,
    population: c.population,
    cca3: c.cca3
  }));
};

export const fetchCountryData = async (query) => {
  try {
    let data = [];

    if (!query) {
      // We only ask for the fields we need (name, flag, etc.). This makes the page load faster and prevents "400 Bad Request" errors caused by downloading too much data at once.
      const endpoint = "https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population,cca3";
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error(`HTTP Error: ${response.status}`);
      }
      data = await response.json();
    } 
    else if (query.length === 3) {
      // Look for a code match first (e.g., 'FRA'). If that fails, treat the search as a name (e.g., 'France').
      const alphaResponse = await fetch(`https://restcountries.com/v3.1/alpha/${query}`);
      
      if (alphaResponse.ok) {
        data = await alphaResponse.json();
      } else {
        const nameResponse = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        if (!nameResponse.ok) {
          if (nameResponse.status === 404) return [];
          throw new Error(`HTTP Error: ${nameResponse.status}`);
        }
        data = await nameResponse.json();
      }
    } 
    else {
      const endpoint = `https://restcountries.com/v3.1/name/${query}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error(`HTTP Error: ${response.status}`);
      }
      data = await response.json();
    }

    // Convert the complex API response into a simple, consistent format that our app understands.
    if (Array.isArray(data)) {
      return mapCountries(data);
    } else if (data && typeof data === 'object') {
      return mapCountries([data]);
    }

    return [];

  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
};