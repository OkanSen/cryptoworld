import React from "react";

const CookiesComponent = () => {
  const getCookiesDetails = () => {
    return {
      cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
      cookieCount: document.cookie ? document.cookie.split(";").length : 0,
      cookiesContent: document.cookie || "No cookies set",
    };
  };

  const cookiesDetails = getCookiesDetails();

  return (
    <div className="info-card">
      <h3>Cookies Information</h3>
      <p>
        <strong>Cookies Enabled:</strong> {cookiesDetails.cookiesEnabled}
      </p>
      <p>
        <strong>Total Cookies:</strong> {cookiesDetails.cookieCount}
      </p>
      <p>
        <strong>Cookies Content:</strong>
      </p>
      <textarea
        readOnly
        value={cookiesDetails.cookiesContent}
        style={{
          width: "100%",
          height: "100px",
          resize: "none",
          fontFamily: "monospace",
          fontSize: "12px",
          backgroundColor: "#161b22",
          color: "#00ff00",
        }}
      />
    </div>
  );
};

export default CookiesComponent;
