import React from "react";
import "./Widget.css";

const Widget = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="widget">
      <button
        className="widget-button"
        onClick={() => scrollToSection("crypto-section")}
      >
        🪙 Crypto
      </button>
      <button
        className="widget-button"
        onClick={() => scrollToSection("currency-section")}
      >
        💱 Currency
      </button>
    </div>
  );
};

export default Widget;
