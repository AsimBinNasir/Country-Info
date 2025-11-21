import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IndividualCountry from "./pages/IndividualCountry";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:name" element={<IndividualCountry />} />
      </Routes>
    </>
  )
}

export default App