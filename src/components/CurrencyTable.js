import React, { useState, useEffect, useMemo } from "react";
import "./Table.css";
import formatNumber from "./formatNumber";
import currencyNames from "./CurrencyNames";

const CurrencyTable = () => {
  const [currencyData, setCurrencyData] = useState({}); // Raw rates relative to USD
  const [baseCurrency, setBaseCurrency] = useState("USD"); // Default base currency
  const [amount, setAmount] = useState(1); // Amount to convert, default to 1
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Track if it's the first load
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Sort state

  const API_URL = "https://api.exchangerate-api.com/v4/latest/USD"; // Fetching data based on USD rates

  // Fetch data from the API
  const fetchCurrencyData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (response.ok) {
        const data = await response.json();

        // Enrich the data with currency names without changing the object structure
        // raw values must be kept to calculate rate values
        const enrichedData = {};
        for (const [currency, rate] of Object.entries(data.rates)) {
          enrichedData[currency] = {
            rate: rate, // Store rate relative to USD
            name: currencyNames[currency] || "Unknown Currency", // Use currencyNames to get the name
          };
        }
        console.log(enrichedData);
        setCurrencyData(enrichedData); // Set the enriched data in the state
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      if (isFirstLoad) {
        setIsFirstLoad(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyData(); // Initial fetch
    const interval = setInterval(fetchCurrencyData, 15000); // Update every 15 seconds
    return () => clearInterval(interval); // Clean up interval
  }, []);

  // Compute the converted rates relative to the selected base currency
  const computeConvertedRates = (base) => {
    if (!currencyData[base]) return {};

    const baseRate = currencyData[base].rate;
    const convertedRates = {};

    // Calculate rates relative to the selected base currency
    for (const [currency, { rate }] of Object.entries(currencyData)) {
      convertedRates[currency] = rate / baseRate;
    }
    return convertedRates;
  };

  const convertedRates = useMemo(() => computeConvertedRates(baseCurrency), [baseCurrency, currencyData]);

  // Sorting logic based on the displayed (converted) rates
  const sortedRates = useMemo(() => {
    if (sortConfig.key === null) return Object.entries(currencyData);

    const sorted = [...Object.entries(currencyData)];
    sorted.sort((a, b) => {
      const valueA =
        sortConfig.key === "currency"  ? a[0] : sortConfig.key === "converted" ? convertedRates[a[0]] : a[1][sortConfig.key];
      const valueB =
        sortConfig.key === "currency"  ? b[0] : sortConfig.key === "converted"  ? convertedRates[b[0]] : b[1][sortConfig.key];

      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [currencyData, convertedRates, sortConfig]);

  // Handle sorting logic
  // First sort is in ascending order, second is in descending,
  // Third sort resets the sorting to default order.
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

  const handleAmountChange = (e) => {
    let value = e.target.value;

    // If the input starts with '0' and has more than one digit, remove the leading zero
    if (value.startsWith('0') && value.length > 1) {
      value = value.slice(1); // Remove the first character (the leading zero)
    }

    // Check if the value is a valid number
    if (value === '' || !isNaN(value)) {
      setAmount(value); // Only update if it's a valid number or an empty string
    }
  };

  // Table rendering: Render currency, name, rate, and converted values
  return (
    <div className="table-container" id="currency-section">
      <div className="currency-controls">
        <label htmlFor="baseCurrency">Base Currency:</label>
        <select
          id="baseCurrency"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)} // Update base currency selection
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
          onChange={handleAmountChange} // Update amount entered by the user
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
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("rate")}>Rate</th>
            <th onClick={() => handleSort("converted")}>Converted</th>
          </tr>
        </thead>
        <tbody>
          {sortedRates.map(([currency, { rate, name }]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{name}</td>
              <td>{rate ? formatNumber(rate) : "N/A"}</td>
              <td>{rate ? formatNumber(convertedRates[currency] * amount) : "N/A"}</td> {/* Conversion to the selected base currency */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
