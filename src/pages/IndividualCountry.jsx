import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { fetchCountryData } from '../services/FetchCountry';
import CountryFlag from '../components/CountryFlag';
import CountryInfo from '../components/CountryInfo';

const IndividualCountry = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      const data = await fetchCountryData(countryName);
      setCountry(data[0]); // fetchCountryData returns an array
    };
    getCountry();
  }, [countryName]);

  if (!country) return <div>Loading...</div>;

  return (
    <div className="'min-h-screen pb-25 bg-gray-50'">
      <Header />
      <div className='px-25 flex justify-between items-center my-17'>
        <button
          className="px-8 py-2 bg-white rounded-lg all-sides-shadow font-nunitosans font-medium text-base text-gray-950 flex items-center
             transform transition-transform duration-200 active:scale-90"
          onClick={() => window.history.back()}
        >
          <span className="mr-2">&larr;</span> Back
        </button>

      </div>

      <div className='grid grid-cols-2 gap-35 px-25'>
        <CountryFlag country={country} />
        <CountryInfo country={country} />
      </div>

    </div>
  );
};

export default IndividualCountry;
