export const fetchCountryData = async (query) => {
  try {
    let endpoint = "";
     if (!query) {
      endpoint =
        "https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,tld,currencies,languages,borders,flags,population";
    } 
    else if (query.length === 3) {
      endpoint = `https://restcountries.com/v3.1/alpha/${query}`;
    } 
    else {
      endpoint = `https://restcountries.com/v3.1/name/${query}`;
    }

    const response = await fetch(endpoint);

    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    let data = await response.json();

    if (data.response === false)

      // When searching by name → manually extract only needed fields
      if (query) {
        data = data.map(c => ({
          name: c.name,
          nativeName: c.name?.nativeName
            ? Object.values(c.name.nativeName)[0].common
            : c.name.common, // fallback if no nativeName
          capital: c.capital,
          region: c.region,
          subregion: c.subregion || "N/A",
          topLevelDomain: c.tld?.join(', ') || "N/A",
          currencies: c.currencies
            ? Object.values(c.currencies)
              .map(currency => currency.name)
              .join(', ')
            : "N/A",
          languages: c.languages
            ? Object.values(c.languages).join(', ')
            : "N/A",
          borders: c.borders || [],
          flags: c.flags,
          population: c.population,
        }));
      }


    return data;

  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
};
