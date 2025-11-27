import React from 'react'

const CountryFlag = ({country}) => {
  return (
    <div className='w-full'>
      <img
        src={country.flags?.svg || 'https://via.placeholder.com/600x400?text=No+Flag'}
        alt={`${country.name?.common || 'Unknown'} flag`}
        className="w-full h-auto object-cover all-sides-shadow"
      />
    </div>
  )
}

export default CountryFlag