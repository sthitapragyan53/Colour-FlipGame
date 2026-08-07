import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Included for React Router navigation
import './ColorfulGame.css';


const BASE_COLORS = [
  'red', 'blue', 'green', 'purple', 'orange', 'pink',
  'red', 'blue', 'green', 'purple', 'orange', 'pink'
];

// Helper function to shuffle cards
const shuffleArray = (array) => {
  const arr = [...array]; // make a copy of array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// state management 
export default function ColorfulGame({ onBackToHome }) {
  // Array holding shuffled card
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const timerRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  // Handler to navigate back to home page
  const handleGoHome = () => {
    if (onBackToHome) {
      onBackToHome(); // Call custom prop function if provided
    } else {
      navigate('/'); // Default navigation using react-router-dom
    }
  };

  // Initialize/Restart the Game
  const startGame = () => {
    const shuffledCards = shuffleArray(BASE_COLORS);
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setIsProcessing(false);
  };

  // Timer logic
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      alert(`Game Over! Final Score: ${score}`);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft, score]);

  // Card matching check logic
  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsProcessing(true);
      const [firstIndex, secondIndex] = flippedIndices;

      if (cards[firstIndex] === cards[secondIndex]) {
        // Match found
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
        setScore((prev) => prev + 2);
        setFlippedIndices([]);
        setIsProcessing(false);
      } else {
        // Not a match: hide cards after 500ms delay
        const timeout = setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 500);

        return () => clearTimeout(timeout);
      }
    }
  }, [flippedIndices, cards]);

  // Handle individual card clicks
  const handleCardClick = (index) => {
    if (
      !isPlaying ||
      isProcessing ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index)
    ) {
      return;
    }

    setFlippedIndices((prev) => [...prev, index]);
  };

  return (
    <div className="game-wrapper">
      <div className="game-container">
        {/* Top Header / Navigation Bar */}
        <div className="game-header">
          <button className="back-btn" onClick={handleGoHome}>
            ← Back to Home
          </button>
        </div>

        <div className="board">
          {cards.map((color, index) => {
            const isFlipped = flippedIndices.includes(index);
            const isMatched = matchedIndices.includes(index);
            const isVisible = isFlipped || isMatched;

            return (
              <div
                key={index}
                className={`card ${!isVisible ? 'face-down' : ''} ${
                  isMatched ? 'matched' : ''
                } ${!isPlaying ? 'disabled' : ''}`}
                style={{
                  backgroundColor: isVisible ? color : '#e2e8f0',
                  color: isVisible ? '#ffffff' : '#64748b'
                }}
                onClick={() => handleCardClick(index)}
              >
                {isVisible ? '' : '?'}
              </div>
            );
          })}
        </div>

        <div className="dashboard">
          <p className="stat-text">Score: {score}</p>
          <p className="stat-text">Time Left: {timeLeft}s</p>
          <button
            className="start-btn"
            onClick={startGame}
            disabled={isPlaying}
          >
            {isPlaying ? 'Playing...' : 'Start Game'}
          </button>
        </div>
      </div>
    </div>
  );
}