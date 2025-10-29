import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import ChampionsPage from "./pages/ChampionsPage";
import ChampionDetailPage from "./pages/ChampionDetailPage";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";

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
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
