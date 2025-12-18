import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterRegion from '../components/FilterRegion';
import CountryCard from '../components/CountryCard';
import { fetchCountryData } from '../services/FetchCountry';
import { useLoading } from '../hooks/useLoading';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(''); // '' means All Region
  const [selectedRegionLabel, setSelectedRegionLabel] = useState('All Region'); // label for dropdown
  const [refreshTrigger, setRefreshTrigger] = useState(0); // To force re-fetch
  const [hasFetched, setHasFetched] = useState(false); // To track if initial fetch is done
  
  const { isLoading, setIsLoading } = useLoading();

  const countriesPerPage = 12;

  useEffect(() => {
    const getCountries = async () => {
      setIsLoading(true);
      setCurrentPage(1); // Reset to page 1 on new search

      let data = await fetchCountryData(searchQuery);

      // Filter by region
      if (selectedRegion) {
        data = data.filter(c => c.region === selectedRegion);
      }

      setCountries(data);
      setIsLoading(false);
      setHasFetched(true);
    };

    getCountries();
  }, [searchQuery, selectedRegion, refreshTrigger, setIsLoading]);

  // Pagination Logic
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleResetHome = () => {
    setSearchQuery('');
    setSelectedRegion('');
    setSelectedRegionLabel('All Region');
    setCurrentPage(1);
    setRefreshTrigger(prev => prev + 1); 
  };

  return (
    <div className='min-h-screen pb-25 bg-gray-50 dark:bg-blue-950 transition-colors duration-300'>
      <Header onHomeClick={handleResetHome} />
      
      <div className='px-6 sm:px-10 md:px-12 lg:px-15 xl:px-25 flex flex-col gap-10 md:flex-row sm:justify-between items-start md:items-center my-10'>
        {/* Key forces SearchBar remount to clear local input state */}
        <SearchBar key={refreshTrigger} setSearchQuery={setSearchQuery} />
        <FilterRegion 
          selectedRegionLabel={selectedRegionLabel} 
          setSelectedRegion={setSelectedRegion} 
          setSelectedRegionLabel={setSelectedRegionLabel}
        />
      </div>
      
      {/* Content Area */}
      {(!isLoading && hasFetched && countries.length === 0) ? (
        <div className='flex justify-center items-center py-20'>
            <h2 className='font-nunitosans font-bold text-xl md:text-2xl text-gray-950 dark:text-white'>
                No countries were found
            </h2>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-10 xl:grid-cols-4 gap-20 px-6 sm:px-10 md:px-12 lg:px-15 xl:px-25 '>
            {currentCountries.map((country, index) => (
              <CountryCard key={country.cca3 || country.name.common || index} country={country} />
            ))}
        </div>
      )}

      {/* Pagination controls */}
      {countries.length > 0 && (
        <div className='flex justify-center items-center gap-4 mt-10 pb-10'>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className='px-8 py-2 font-bold text-gray-950 dark:text-white bg-white dark:bg-blue-900 shadow-md rounded-xl disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors duration-300'
            >
              Prev
            </button>
            <span className='font-bold text-gray-950 dark:text-white transition-colors duration-300'>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className='px-8 py-2 font-bold text-gray-950 dark:text-white bg-white dark:bg-blue-900 shadow-md rounded-xl disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors duration-300'
            >
              Next
            </button>
        </div>
      )}
    </div>
  );
};

export default Home;