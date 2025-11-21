import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import FilterRegion from '../components/FilterRegion'
const Home = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='px-25 flex justify-between items-center my-10'>
        <SearchBar />
        <FilterRegion />
      </div>
    </div>
  )
}

export default Home