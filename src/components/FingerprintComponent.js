import React, { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const FingerprintComponent = () => {
  const [fingerprintDetails, setFingerprintDetails] = useState({
    visitorId: "Fetching...",
    components: "Fetching...",
  });

  // upon page load
  useEffect(() => {
    const getFingerprintDetails = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprintDetails({
        visitorId: result.visitorId,
        components: JSON.stringify(result.components, null, 2),
      });
    };

    getFingerprintDetails();
  }, []);

  return (
    <div className="info-card">
      <h3>Fingerprint Information</h3>
      <p>
        <strong>Visitor ID:</strong> {fingerprintDetails.visitorId}
      </p>
      <p>
        <strong>Fingerprint Components:</strong>
      </p>
      <textarea
        readOnly
        value={fingerprintDetails.components}
        style={{
          width: "100%",
          height: "200px",
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

export default FingerprintComponent;
