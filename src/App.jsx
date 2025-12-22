import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import IndividualCountry from "./pages/IndividualCountry";
import ErrorPage from "./pages/ErrorPage";
import AuthModal from "./components/AuthModal";
import Toast from "./components/Toast";

const App = () => {
  return (
    <div>
      <Toast />
      <AuthModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryName" element={<IndividualCountry />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage message="Page not found" />} />
      </Routes>
    </div>

  )
}

export default App;
