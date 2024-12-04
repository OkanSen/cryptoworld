import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Assuming styles are here

const GlitchCard = ({ children }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200); // Remove glitch after animation
    }, 5000); // Trigger every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return <div className={`info-card ${glitch ? "glitch" : ""}`}>{children}</div>;
};

export default GlitchCard;