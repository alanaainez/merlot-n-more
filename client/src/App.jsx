import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import WineList from './pages/WineList.jsx';
import RedWines from './pages/RedWines.jsx';
import WhiteWines from './pages/WhiteWines.jsx';
import RoseWines from './pages/RoseWines.jsx';
import SparklingWines from './pages/SparklingWines.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wines" element={<WineList />} />
            <Route path="/wines/red" element={<RedWines />} />
            <Route path="/wines/white" element={<WhiteWines />} />
            <Route path="/wines/rose" element={<RoseWines />} />
            <Route path="/wines/sparkling" element={<SparklingWines />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
