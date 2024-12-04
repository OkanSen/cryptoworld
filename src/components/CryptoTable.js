import React, { useState, useEffect } from "react";
import "./Table.css";
import formatNumber from "./formatNumber";

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show spinner
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Track if it's the first page load
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Sort state


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

  // Sorting Logic
  const sortedCryptoData = React.useMemo(() => {
    if (sortConfig.key === null) return cryptoData;
  
    const sorted = [...cryptoData];
    sorted.sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
  
      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  
    return sorted;
  }, [cryptoData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        if (prevConfig.direction === "asc") {
          return { key, direction: "desc" };
        } else if (prevConfig.direction === "desc") {
          return { key: null, direction: null }; // Reset sorting
        }
      }
      return { key, direction: "asc" };
    });
  };

  

  useEffect(() => {
    // Initial data fetch
    fetchCryptoData();

    // Auto-update every 15 seconds
    const interval = setInterval(fetchCryptoData, 15000); // 4 calls/minute - Public API limit

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Show spinner only during the first load
  if (loading && isFirstLoad) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading crypto data...</span>
      </div>
    );
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
            <th  onClick={() => handleSort("name")}>Name</th>
            <th  onClick={() => handleSort("symbol")}>Symbol</th>
            <th  onClick={() => handleSort("current_price")}>Price (USD)</th>
            <th  onClick={() => handleSort("price_change_percentage_24h")}>24h Change</th>
            <th  onClick={() => handleSort("market_cap")}>Market Cap</th>
            <th  onClick={() => handleSort("high_24h")}>24h High</th>
            <th  onClick={() => handleSort("low_24h")}>24h Low</th>
            <th  onClick={() => handleSort("total_volume")}>Volume (24h)</th>
            <th  onClick={() => handleSort("circulating_supply")}>Circulating Supply</th>
            <th  onClick={() => handleSort("ath")}>All-Time High</th>
          </tr>
        </thead>
        <tbody>
          {sortedCryptoData.map((coin) => (
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
