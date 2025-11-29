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
  onClick={handleClick}
>
  {/* Image container */}
  <div className='w-full h-40 drop-shadow overflow-hidden rounded-t-lg'>
    <img
      src={country.flags?.svg || 'https://via.placeholder.com/300x200?text=No+Flag'}
      alt={`${country.name?.common || 'Unknown'} flag`}
      className="w-full h-auto object-top object-contain"
    />
  </div>

  {/* Card content */}
  <div className='pt-9 pb-10 px-7 flex flex-col gap-4'>
    <p className='font-nunitosans font-extrabold text-lg text-gray-950'>
      {country.name?.common || "Unknown"}
    </p>

    <div className='flex flex-col gap-1'>
      <p className='font-nunitosans font-bold text-base text-gray-950'>
        Population: <span className='font-normal'>{country.population?.toLocaleString() || "N/A"}</span>
      </p>
      <p className='font-nunitosans font-bold text-base text-gray-950'>
        Region: <span className='font-normal'>{country.region || "N/A"}</span>
      </p>
      <p className='font-nunitosans font-bold text-base text-gray-950'>
        Capital: <span className='font-normal'>{country.capital?.[0] || "N/A"}</span>
      </p>
    </div>
  </div>
</div>

  )
}

export default CountryCard
