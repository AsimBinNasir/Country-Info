import React from 'react';
import { useNavigate } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use cca3 or common name as identifier
    // Pass state to let the target page know this navigation came from within the app
    navigate(`/country/${country.cca3 || country.name.common}`, { state: { fromApp: true } });
  };

  return (
    <div
      className='group w-full h-auto rounded-lg bg-white dark:bg-blue-900 shadow-md cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-blue-500/10 will-change-transform'
      onClick={handleClick}
    >
      {/* Image container */}
      <div className='w-full aspect-3/2 overflow-hidden rounded-t-lg bg-gray-200 dark:bg-blue-950'>
        <img
          src={country.flags?.svg || 'https://via.placeholder.com/300x200?text=No+Flag'}
          alt={`${country.name?.common || 'Unknown'} flag`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 will-change-transform"
        />
      </div>

      {/* Card content */}
      <div className='pt-9 pb-10 px-6 md:px-4 lg:px-6 flex flex-col gap-4'>
        <p className='font-nunitosans font-extrabold text-base text-gray-950 dark:text-white truncate transition-colors duration-300'>
          {country.name?.common || "Unknown"}
        </p>

        <div className='flex flex-col gap-1'>
          <p className='font-nunitosans font-bold text-sm text-gray-950 dark:text-white transition-colors duration-300'>
            Population: <span className='font-normal'>{country.population?.toLocaleString() || "N/A"}</span>
          </p>
          <p className='font-nunitosans font-bold text-sm text-gray-950 dark:text-white transition-colors duration-300'>
            Region: <span className='font-normal'>{country.region || "N/A"}</span>
          </p>
          <p className='font-nunitosans font-bold text-sm text-gray-950 dark:text-white transition-colors duration-300'>
            Capital: <span className='font-normal'>{country.capital?.[0] || "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;