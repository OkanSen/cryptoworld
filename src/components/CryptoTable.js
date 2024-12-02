import React, { useState, useEffect } from "react";
import "./Table.css"; // Correct import for table styling
import formatNumber from "./formatNumber";

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show spinner
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Track if it's the first page load

  const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
  const params = "?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"; // Fetch top 20 coins

  const fetchCryptoData = async () => {
    try {
      setLoading(true); // Start loading before the API call
      const response = await fetch(API_URL + params);

      if (response.ok) { // Check if the response is successful
        const data = await response.json();
        setCryptoData(data); // Update state with new data
        setLastUpdated(new Date().toLocaleTimeString());
        console.log("Crypto data updated at:", new Date().toLocaleTimeString());
      } else {
        throw new Error("Failed to fetch data"); // Handle failed fetch
      }
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      // Only stop the spinner on the first successful load
      if (isFirstLoad) {
        setIsFirstLoad(false); // After first successful load, prevent showing the spinner in future updates
      }
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  

  useEffect(() => {
    // Initial data fetch
    fetchCryptoData();

    // Auto-update every 15 seconds
    const interval = setInterval(fetchCryptoData, 15000); // 4 calls/minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading && isFirstLoad) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading crypto data...</span>
      </div>
    ); // Show spinner only during the first load
  }

  return (
    <div className="table-container" id="crypto-section">
      <h2 className="table-title">
        Cryptocurrency Market
        {lastUpdated && (
          <span style={{ fontSize: "0.8rem", marginLeft: "10px", color: "#c9d1d9" }}>
            Last updated: {lastUpdated}
          </span>
        )}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>24h Change</th>
            <th>Market Cap</th>
            <th>24h High</th>
            <th>24h Low</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
            <th>All-Time High</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.name}</td>
              <td>{coin.symbol?.toUpperCase() || "N/A"}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td className={coin.price_change_percentage_24h > 0 ? "positive" : "negative"}>
                {coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : "N/A"}%
              </td>
              <td>${formatNumber(coin.market_cap)}</td>
              <td>${formatNumber(coin.high_24h)}</td>
              <td>${formatNumber(coin.low_24h)}</td>
              <td>${formatNumber(coin.total_volume)}</td>
              <td>{formatNumber(coin.circulating_supply)}</td>
              <td>${formatNumber(coin.ath)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
