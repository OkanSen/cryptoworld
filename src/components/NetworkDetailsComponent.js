import React, { useEffect, useState } from "react";

const NetworkDetailsComponent = () => {
  const [networkDetails, setNetworkDetails] = useState({
    ip: "Unknown",
    vpn: "Unknown",
    mobileData: "Unknown",
    as: "Unknown",
    asName: "Unknown",
    continent: "Unknown",
    country: "Unknown",
    city: "Unknown",
    countryCode: "Unknown",
    currency: "Unknown",
    isp: "Unknown",
    latitude: "Unknown",
    longitude: "Unknown",
    region: "Unknown",
    regionName: "Unknown",
    timezone: "Unknown",
    dnsIP: "Unknown",
    dnsLocation: "Unknown",
    tor: "Unknown",
    rtt: "Unsupported",
    effectiveType: "Unsupported",
    reduceDataUsage: "Unsupported",
  });

  useEffect(() => {
    // Fetching network details using ipapi
    const fetchNetworkDetails = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setNetworkDetails({
          ip: data.ip || "Unknown",
          as: data.asn || "Unknown",
          asName: data.org || "Unknown",
          country: data.country_name || "Unknown",
          city: data.city || "Unknown",
          countryCode: data.country_code_iso3 || "Unknown",
          currency: data.currency || "Unknown",
          currency_name: data.currency_name	|| "Unknown",
          isp: data.org || "Unknown",
          latitude: data.latitude || "Unknown",
          longitude: data.longitude || "Unknown",
          region: data.region || "Unknown",
          postal: data.postal,
          timezone: data.timezone || "Unknown",
        });
      } catch (error) {
        console.error("Error fetching network details:", error);
      }
    };

    fetchNetworkDetails();
  }, []);

  return (
    <div className="info-card detailsbox">
      <h3>Network Details</h3>
      {Object.entries(networkDetails).map(([key, value]) => (
        <p key={key}>
          <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

export default NetworkDetailsComponent;
