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
    // Fetch network details from an API or use a service like "ipinfo.io" or "ip-api.com".
    const fetchNetworkDetails = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/"); // Replace with your API endpoint
        const data = await response.json();
        setNetworkDetails({
          ip: data.ip || "Unknown",
          vpn: "false", // Requires VPN detection service
          mobileData: "false", // Can be inferred using additional APIs
          as: data.as || "Unknown",
          asName: data.as_name || "Unknown",
          continent: data.continent_name || "Unknown",
          country: data.country_name || "Unknown",
          city: data.city || "Unknown",
          countryCode: data.country || "Unknown",
          currency: data.currency || "Unknown",
          isp: data.org || "Unknown",
          latitude: data.latitude || "Unknown",
          longitude: data.longitude || "Unknown",
          region: data.region || "Unknown",
          regionName: data.region_name || "Unknown",
          timezone: data.timezone || "Unknown",
          dnsIP: "212.156.199.162", // Static value or fetched dynamically
          dnsLocation: "Turkey - Turk Telekomunikasyon Anonim Sirketi",
          tor: "Unknown",
          rtt: "Unsupported",
          effectiveType: "Unsupported",
          reduceDataUsage: "Unsupported",
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
