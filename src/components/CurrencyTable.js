import React, { useState, useEffect } from "react";
import "./Table.css";
import formatNumber from "./formatNumber";
import currencyNames from "./CurrencyNames";

const CurrencyTable = () => {
  const [currencyData, setCurrencyData] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD"); // Default base currency
  const [amount, setAmount] = useState(1); // Amount to convert, default to 1
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Track if it's the first load
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Sort state

  const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

  // Fetch data from the API
  const fetchCurrencyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (response.ok) {
        const data = await response.json();
        setCurrencyData(data.rates);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      if (isFirstLoad) {
        setIsFirstLoad(false); // Mark first load as completed
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyData(); // Initial fetch
    const interval = setInterval(fetchCurrencyData, 15000); // Update every 15 seconds
    return () => clearInterval(interval); // Clean up interval
  }, []);

  // Compute rates for the selected base currency
  const computeRates = (base) => {
    if (!currencyData[base]) return {};
    const rates = {};
    for (const [currency, rate] of Object.entries(currencyData)) {
      rates[currency] = rate / currencyData[base];
    }
    return rates;
  };

  const rates = computeRates(baseCurrency);

  // Sorting logic
  const sortedRates = React.useMemo(() => {
    if (sortConfig.key === null) return Object.entries(rates);

    const sorted = [...Object.entries(rates)];
    sorted.sort((a, b) => {
      const valueA = sortConfig.key === "currency" ? a[0] : a[1];
      const valueB = sortConfig.key === "currency" ? b[0] : b[1];

      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [rates, sortConfig]);

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
      <div className="currency-controls">
        <label htmlFor="baseCurrency">Base Currency:</label>
        <select
          id="baseCurrency"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          {Object.keys(currencyData).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <h2 className="table-title">
        Exchange Rates
        {lastUpdated && (
          <span style={{ fontSize: "0.8rem", marginLeft: "10px", color: "#c9d1d9" }}>
            Last updated: {lastUpdated}
          </span>
        )}
      </h2>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("currency")}>Currency</th>
            <th onClick={() => handleSort("currency_name")}>Name</th>
            <th onClick={() => handleSort("rate")}>Rate</th>
            <th onClick={() => handleSort("converted")}>Converted</th>
          </tr>
        </thead>
        <tbody>
          {sortedRates.map(([currency, rate]) => (
            <tr key={currency}>
              <td >{currency}</td>
              <td>{currencyNames[currency] || "Unknown Currency"}</td>
              <td>{formatNumber(rate)}</td>
              <td>{formatNumber(rate * amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
