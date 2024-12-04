import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import CryptoTable from "./components/CryptoTable"; // Your existing CryptoTable
import CurrencyTable from "./components/CurrencyTable"; // Your existing CurrencyTable
import Dashboard from "./components/Dashboard"; // The new Dashboard page
import Widget from "./components/Widget"; // Importing the Widget component
import "./App.css"; // Import your global styles

const RedirectButton = () => {
  const location = useLocation(); // React Router hook to get the current location

  // Determine button text and route dynamically
  const buttonText = location.pathname === "/dashboard" ? "Go To Main Page" : "Go To Dashboard";
  const buttonRoute = location.pathname === "/dashboard" ? "/" : "/dashboard";

  return (
    <Link to={buttonRoute}>
      <button className="dashboard-btn">{buttonText}</button>
    </Link>
  );
};

const Tables = () => {
  console.log("Rendering Tables component");
  return(
    <div className="main-content" key="main">
      <h1 className="app-title">Cryptoworld</h1>
      <CryptoTable />
      <CurrencyTable />

      {/* Widget that appears on the left of the screen or quickNav */}
      <Widget /> 
    </div>
  );
  
};


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Main Page route to render both crypto and currency tables */}
          <Route path="/" element={<Tables />}/>
          {/* Route to dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {/* Dynamic button that adapts based on the current route */}
        <RedirectButton />
      </div>
    </Router>
  );
};

export default App;
