import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import ChampionsPage from "./pages/ChampionsPage";
import ChampionDetailPage from "./pages/ChampionDetailPage";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import RegionPage from "./pages/RegionPage";
import RegionDetailPage from "./pages/RegionDetailPage";
import ObjectsPage from "./pages/ObjectsPage";

const App = () => {
  return (
    <div>
      <Router>
      <Navbar />
        <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/champions" element={<ChampionsPage />} />
            <Route path="/champion/:id" element={<ChampionDetailPage />} />
            <Route path="/regions" element={<RegionPage/>} />
            <Route path="/region/:regionName" element={<RegionDetailPage/>} />
            <Route path="/objets" element={<ObjectsPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
