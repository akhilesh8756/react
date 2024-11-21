import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Fetch system time
  const fetchTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleString());
  };

  // Start countdown
  const startCountdown = () => {
    if (timeLeft <= 0) {
      alert("Please enter a valid duration!");
      return;
    }
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Stop countdown
  const stopCountdown = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  return (
    <div className="App">
      <h1>System Time and Countdown App</h1>

      {/* System Time Section */}
      <div>
        <h2>System Time</h2>
        <button onClick={fetchTime}>Get Current Time</button>
        <p>{currentTime}</p>
      </div>

      {/* Countdown Timer Section */}
      <div>
        <h2>Countdown Timer</h2>
        <input
          type="number"
          min="0"
          disabled={isRunning}
          value={timeLeft}
          onChange={(e) => setTimeLeft(Number(e.target.value))}
          placeholder="Enter seconds"
        />
        <button onClick={startCountdown} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopCountdown} disabled={!isRunning}>
          Stop
        </button>
        <p>Time Left: {timeLeft} seconds</p>
      </div>
    </div>
  );
};

export default App;
