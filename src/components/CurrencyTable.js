import React, { useState, useEffect } from "react";
import "./Table.css"; // Correct import for table styling
import formatNumber from "./formatNumber";

const CurrencyTable = () => {
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show spinner
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Track if it's the first page load

  const API_URL = "https://api.exchangerate-api.com/v4/latest/USD"; // Example public API for currency data

  const fetchCurrencyData = async () => {
    try {
      setLoading(true); // Start loading before the API call
      const response = await fetch(API_URL);

      if (response.ok) { // Check if the response is successful
        const data = await response.json();
        setCurrencyData(data.rates); // Assuming 'rates' contains the currency data
        setLastUpdated(new Date().toLocaleTimeString());
        console.log("Currency data updated at:", new Date().toLocaleTimeString());
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      // Only stop the spinner on the first successful load
      if (isFirstLoad) {
        setIsFirstLoad(false);
      }
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchCurrencyData();

    // Auto-update every 15 seconds (or adjust based on API limits)
    const interval = setInterval(fetchCurrencyData, 15000); // 4 calls/minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading && isFirstLoad) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading currency data...</span>
      </div>
    );
  }

  return (
    <div className="table-container" id="currency-section">
      <h2 className="table-title">
        Currency Exchange Rates
        {lastUpdated && (
          <span style={{ fontSize: "0.8rem", marginLeft: "10px", color: "#c9d1d9" }}>
            Last updated: {lastUpdated}
          </span>
        )}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Change (24h)</th>
            <th>Market Cap</th>
            <th>24h High</th>
            <th>24h Low</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
            <th>All-Time High</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(currencyData).map((currencyCode) => (
            <tr key={currencyCode}>
              <td>{currencyCode}</td>
              <td>{currencyCode}</td> {/* Placeholder for symbol, can be enhanced */}
              <td>{currencyData[currencyCode].toFixed(2)}</td>
              <td className="positive">+0.02%</td> {/* Placeholder for 24h Change */}
              <td>{formatNumber(currencyData[currencyCode] * 100000000)}</td> {/* Market cap as an example */}
              <td>{formatNumber(currencyData[currencyCode] * 1.1)}</td> {/* 24h High */}
              <td>{formatNumber(currencyData[currencyCode] * 0.9)}</td> {/* 24h Low */}
              <td>{formatNumber(currencyData[currencyCode] * 10000)}</td> {/* Volume */}
              <td>{formatNumber(currencyData[currencyCode] * 1000)}</td> {/* Circulating supply */}
              <td>{formatNumber(currencyData[currencyCode] * 1.2)}</td> {/* All-Time High */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
