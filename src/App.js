import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import './App.css';

// Lazy load Projects component for code splitting and better performance
const Projects = lazy(() => import('./pages/Projects'));

function AppContent() {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  return (
    <div className="App">
      {!isWelcomePage && <Navigation />}
      <main className={isWelcomePage ? 'main-fullscreen' : ''}>
        <Suspense fallback={
          <div className="loading-fallback">
            <div className="loading-spinner"></div>
            <span>Loading...</span>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
