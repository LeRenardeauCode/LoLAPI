import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import ChampionsPage from './pages/ChampionsPage';


const App = () => {
  return (

      <Router>
        <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
          <Routes>
            <Route path="/" element={<ChampionsPage />} />
          </Routes>
        </Container>
      </Router>
  );
};

export default App;