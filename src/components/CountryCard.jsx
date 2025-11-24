import React from 'react'

const CountryCard = () => {
  return (
    <div className='w-full h-auto rounded-lg bg-white drop-shadow-xl cursor-pointer' >
      <div className='w-full h-50'>
        <img
          src="https://flagcdn.com/de.svg"
          alt="German Flag"
          className="w-full h-full rounded-t-lg object-cover"
        />
      </div>

      <div className='pt-9 pb-16 px-7 flex flex-col gap-7'>

        <p className='font-nunitosans font-extrabold text-2xl text-gray-950'>Germany</p>

        <div className='flex flex-col gap-2'>
          <p className='font-nunitosans font-bold text-lg text-gray-950'>
            Population: <span className='font-normal'>83,783,942</span>
          </p>
          <p className='font-nunitosans font-bold text-lg text-gray-950'>
            Region: <span className='font-normal'>Europe</span>
          </p>
          <p className='font-nunitosans font-bold text-lg text-gray-950'>
            Capital: <span className='font-normal'>Berlin</span>
          </p>
        </div>

      </div>



    </div>
  )
}

export default CountryCard