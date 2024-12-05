const formatNumber = (num) => {
  if (num == null) return "N/A"; // Handle null or undefined values

  // Handle numbers with more than 3 decimals using scientific notation
  if (num < 0.001 && num > 0) {
    return num.toExponential(3); // Scientific notation for small values
  }

  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "T"; // Trillions
  } 
  else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B"; // Billions
  } 
  else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M"; // Millions
  } 
  else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K"; // Thousands
  } 
  else if (num >= 1) {
    return num.toFixed(4); // For values greater than or equal to 1, preserve 4 decimals
  } 
  else if (num > 0) {
    return num.toFixed(4); // Tiny positive numbers, preserve 4 decimals
  } 
  else {
    return num.toString(); // Handle zero or negatives
  }

  return num; // Return as-is for numbers that don't fit any criteria
};

export default formatNumber;
