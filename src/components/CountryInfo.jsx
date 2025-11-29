import React from 'react'
import { useNavigate } from 'react-router-dom';

const CountryInfo = ({ country }) => {
    const navigate = useNavigate();
    return (
        <div>
            <div>
                <h1 className="pt-15 pb-10 font-nunitosans text-6xl text-gray-950 font-extrabold">{country.name.common}</h1>
            </div>
            <div className='pb-20 grid grid-cols-2 gap-20'>
                <div className='flex flex-col gap-2'>
                    <p className="font-nunitosans text-base text-gray-950"><span className="font-bold">Native Name:</span> {Object.values(country.name.nativeName)[0].common}</p>
                    <p className="font-nunitosans text-base text-gray-950"><span className="font-bold">Population:</span > {country.population.toLocaleString()}</p>
                    <p className="font-nunitosans text-base text-gray-950"><span className="font-bold">Region:</span> {country.region}</p>
                    <p className="font-nunitosans text-base text-gray-950"><span className="font-bold">Sub Region:</span> {country.subregion}</p>
                    <p className="font-nunitosans text-base text-gray-950"><span className="font-bold">Capital:</span> {country.capital?.[0]}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className="font-nunitosans text-base text-gray-950"><span className="font-bold">Top Level Domain:</span> {country.tld?.[0]}</p>
                    <p className="font-nunitosans text-base text-gray-950"><span className="font-bold">Currencies:</span> {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
                    <p className="font-nunitosans text-base text-gray-950"><span className="font-bold">Languages:</span> {Object.values(country.languages).join(', ')}</p>
                </div>

            </div>

            <div className="flex items-center gap-3">
                <span className="font-nunitosans text-base text-gray-950 font-bold">
                    Border Countries:
                </span>

                <div className="flex flex-wrap gap-2">
                    {country.borders?.length ? (
                        country.borders.map((border) => (
                            <div
                                key={border}
                                onClick={() => navigate(`/country/${border}`)}
                                className="px-6 py-1 bg-white all-sides-shadow-dark rounded text-gray-950 font-nunitosans text-sm cursor-pointer 
                     hover:scale-105 transition-transform"
                            >
                                {border}
                            </div>
                        ))
                    ) : (
                        <span className="text-gray-500">None</span>
                    )}
                </div>
            </div>



        </div>
    )
}

export default CountryInfo