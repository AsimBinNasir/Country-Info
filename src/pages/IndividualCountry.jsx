import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountryData } from '../services/FetchCountry';
import CountryFlag from '../components/CountryFlag';
import CountryInfo from '../components/CountryInfo';
import { useLoading } from '../hooks/useLoading';

const IndividualCountry = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  // Removed <Country | null>
  const [country, setCountry] = useState(null);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const getCountry = async () => {
      if (countryName) {
        setIsLoading(true);
        const data = await fetchCountryData(countryName);
        
        if (data && data.length > 0) {
          setCountry(data[0]); 
        } else {
          // Navigate to error page if country not found
          navigate('/error', { replace: true });
        }
        setIsLoading(false);
      }
    };
    getCountry();
  }, [countryName, navigate, setIsLoading]);

  const handleBack = () => {
    navigate('/');
  };

  // Guard clause while waiting for data
  if (!country) return <div className="min-h-screen bg-gray-50 dark:bg-blue-950" />;

  return (
    <div className="min-h-screen pb-25 bg-gray-50 dark:bg-blue-950 transition-colors duration-300">
      <Header />
      
      <div className='px-6 sm:px-10 md:px-12 lg:px-15 xl:px-25 flex justify-between items-center my-17 py-10'>
        <button
          className="px-9 py-2 bg-white dark:bg-blue-900 rounded sm:rounded-lg all-sides-shadow-light font-nunitosans font-medium text-base text-gray-950 dark:text-white flex items-center
             transform transition-all duration-300 active:scale-90 cursor-pointer hover:shadow-lg"
          onClick={handleBack}
        >
          <span className="mr-2">&larr;</span> Back
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-15 xl:gap-35 px-6 sm:px-10 md:px-12 lg:px-15 xl:px-25 pb-10'>
        <CountryFlag country={country} />
        <CountryInfo country={country} />
      </div>
    </div>
  );
};

export default IndividualCountry;