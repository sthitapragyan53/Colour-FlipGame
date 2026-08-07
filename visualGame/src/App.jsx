import React from 'react';
// Change BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ColorfulGame from './pages/ColourfulGame.jsx';
import './app.css';

// 1. Home / About Component
function HomePage() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Colorful Memory Match</h1>
        <p className="hero-subtitle">
          Test your cognitive memory and speed against the clock!
        </p>
        <Link to="/game" className="play-now-btn">
          Play Game Now 🎮
        </Link>
      </header>

      <section className="info-card">
        <h2>About the Game</h2>
        <p>
          Colorful Memory Match is a fast-paced card-matching game designed to exercise 
          short-term visual memory. Flip over pairs of matching colors before time runs out!
        </p>
      </section>

      <section className="info-card">
        <h2>How to Play</h2>
        <ol className="rules-list">
          <li>Click <strong>Start Game</strong> to shuffle the grid and trigger the 30-second timer.</li>
          <li>Click any face-down tile marked with <strong>?</strong> to reveal its hidden color.</li>
          <li>Select a second tile to see if the colors match.</li>
          <li>If they match, both tiles stay revealed and you score <strong>+2 points</strong>.</li>
          <li>If they don't match, both tiles flip back over after half a second.</li>
          <li>Clear as many pairs as possible before time expires!</li>
        </ol>
      </section>
    </div>
  );
}

// 2. Main App Router Wrapper
export default function App() {
  return (
    <Router>
      <div>
        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<ColorfulGame />} />
        </Routes>
      </div>
    </Router>
  );
}