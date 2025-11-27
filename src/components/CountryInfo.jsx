import React from 'react'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1 className="pt-15 pb-10 font-nunitosans text-6xl text-gray-950 font-extrabold">{country.name.common}</h1>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital?.[0]}</p>
        </div>
    )
}

export default CountryInfo