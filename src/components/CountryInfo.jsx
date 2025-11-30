import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
const CountryInfo = ({ country }) => {
    const navigate = useNavigate();
    const [borderCountries, setBorderCountries] = useState([]);
    const [loadingBorders, setLoadingBorders] = useState(false);

    useEffect(() => {
        const fetchBorders = async () => {
            if (!country?.borders?.length) {
                setBorderCountries([]);
                return;
            }
            setLoadingBorders(true);
            try {
                const res = await fetch(
                    `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(
                        ','
                    )}&fields=name,cca3`
                );
                const data = await res.json();
                setBorderCountries(data);
            } catch (err) {
                console.error("Error fetching border countries:", err);
            } finally {
                setLoadingBorders(false);
            }
        };

        fetchBorders();
    }, [country]);
    return (
        <div>
            <div>
                <h1 className="lg:pt-7 xl:pt-10 pb-7 sm:pb-10 font-nunitosans text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-950 font-extrabold m-0 leading-none">{country.name.common}</h1>
            </div>
            <div className='pb-10 xl:pb-20 grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-20'>
                <div className='flex flex-col gap-2'>
                    <p className="font-nunitosans text-sm xl:text-base text-gray-950"><span className="font-bold">Native Name:</span> {Object.values(country.name.nativeName)[0].common}</p>
                    <p className="font-nunitosans text-sm xl:text-base text-gray-950"><span className="font-bold">Population:</span > {country.population.toLocaleString()}</p>
                    <p className="font-nunitosans text-sm xl:text-base text-gray-950"><span className="font-bold">Region:</span> {country.region}</p>
                    <p className="font-nunitosans text-sm xl:text-base text-gray-950"><span className="font-bold">Sub Region:</span> {country.subregion}</p>
                    <p className="font-nunitosans text-sm xl:text-base text-gray-950"><span className="font-bold">Capital:</span> {country.capital?.[0]}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className="font-nunitosans text-sm xl:text-base text-gray-950"><span className="font-bold">Top Level Domain:</span> {country.tld?.[0]}</p>
                    <p className="font-nunitosans text-sm xl:text-base text-gray-950"><span className="font-bold">Currencies:</span> {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
                    <p className="font-nunitosans text-sm xl:text-base text-gray-950"><span className="font-bold">Languages:</span> {Object.values(country.languages).join(', ')}</p>
                </div>

            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-6 mt-6">
            <span className="font-nunitosans text-base sm:text-lg font-bold">Border Countries:</span>

            <div className="flex flex-wrap gap-2">
              {loadingBorders ? (
                <LoadingPage />
              ) : borderCountries.length ? (
                borderCountries.map((border) => (
                  <div
                    key={border.cca3}
                    onClick={() => navigate(`/country/${border.cca3}`)}
                    className="px-6 py-1 bg-white all-sides-shadow-dark rounded text-gray-950 font-nunitosans text-sm sm:text-base cursor-pointer hover:scale-105 transition-transform"
                  >
                    {border.name.common}
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