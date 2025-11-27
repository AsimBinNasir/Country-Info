import React from 'react'
import { useNavigate } from 'react-router-dom';
const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/country/${country.name.common}`);
  }
  return (
    <div
      className='w-full h-auto rounded-lg bg-white drop-shadow-xl cursor-pointer'
      onClick={handleClick}>

      <div className='w-full h-50'>
        <img
          src={country.flags?.svg || 'https://via.placeholder.com/300x200?text=No+Flag'}
          alt={`${country.name?.common || 'Unknown'} flag`}
          className="w-full h-full rounded-t-lg object-cover"
        />
      </div>

      <div className='pt-9 pb-16 px-7 flex flex-col gap-7'>
        <p className='font-nunitosans font-extrabold text-2xl text-gray-950'>
          {country.name?.common || "Unknown"}
        </p>

        <div className='flex flex-col gap-1'>
          <p className='font-nunitosans font-bold text-lg text-gray-950'>
            Population: <span className='font-normal'>{country.population?.toLocaleString() || "N/A"}</span>
          </p>
          <p className='font-nunitosans font-bold text-lg text-gray-950'>
            Region: <span className='font-normal'>{country.region || "N/A"}</span>
          </p>
          <p className='font-nunitosans font-bold text-lg text-gray-950'>
            Capital: <span className='font-normal'>{country.capital?.[0] || "N/A"}</span>
          </p>
        </div>
      </div>

    </div>
  )
}

export default CountryCard
