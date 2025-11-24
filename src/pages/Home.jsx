import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import FilterRegion from '../components/FilterRegion'
import CountryCard from '../components/CountryCard'
const Home = () => {
  return (
    <div className='min-h-screen pb-25 bg-gray-50'>
      <Header />
      <div className='px-25 flex justify-between items-center my-10'>
        <SearchBar />
        <FilterRegion />
      </div>
      <div className='grid grid-cols-4 gap-20 px-25'>
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
      </div>
    </div>
  )
}

export default Home