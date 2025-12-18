import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IndividualCountry from "./pages/IndividualCountry";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:countryName" element={<IndividualCountry />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage message="Page not found" />} /> 
    </Routes>
  )
}

export default App;
