import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import FilterRegion from '../components/FilterRegion'
import CountryCard from '../components/CountryCard'
import { fetchCountryData } from '../services/FetchCountry'

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(''); // '' means All Region
  const [selectedRegionLabel, setSelectedRegionLabel] = useState('All Region'); // label for dropdown

  const countriesPerPage = 12;

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);

      let data = await fetchCountryData(searchQuery);

      // Filter by region
      if (selectedRegion) {
        data = data.filter(c => c.region === selectedRegion);
      }

      setCountries(data);
      setLoading(false);
    };

    getCountries();
  }, [searchQuery, selectedRegion]);

  if (loading) {
    return <div className='min-h-screen flex justify-center items-center'>Loading...</div>;
  }

  // Calculate the current countries to show
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  // Pagination handlers
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }

  return (
    <div className='min-h-screen pb-25 bg-gray-50'>
      <Header />
      <div className='px-25 flex justify-between items-center my-10'>
        <SearchBar setSearchQuery={setSearchQuery} />
        <FilterRegion selectedRegionLabel={selectedRegionLabel} setSelectedRegion={setSelectedRegion} setSelectedRegionLabel={setSelectedRegionLabel}/>

      </div>
      <div className='grid grid-cols-4 gap-20 px-25'>
        {currentCountries.map((country, index) => (
          <CountryCard key={country.cca2 || country.cca3 || country.name.common || index} country={country} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className='flex justify-center items-center gap-4 mt-10'>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className='px-8 py-2 font-bold text-gray-950 bg-white drop-shadow-2xl rounded-xl disabled:opacity-50'
        >
          Prev
        </button>
        <span className='font-bold text-gray-950'>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='px-8 py-2 font-bold text-gray-950 bg-white drop-shadow-2xl rounded-xl disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Home
