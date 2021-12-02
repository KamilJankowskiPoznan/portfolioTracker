import React, { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { About } from './About';
import { Home, SearchedCompany } from './Home';

const App = () => {
  const [portfolioCompanies, setPortfolioCompanies] = useState<SearchedCompany[]>([])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home portfolioCompanies={portfolioCompanies} setPortfolioCompanies={setPortfolioCompanies} />} />
        <Route path="/about:company" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
