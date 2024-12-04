import React from "react";
import { UAParser } from "ua-parser-js";

const getBrowserDetails = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    browser: result.browser.name || "Unknown",
    browserVersion: result.browser.version || "Unknown",
    productName: result.engine.name || "Unknown",
    viewportSize: `${window.innerWidth}px x ${window.innerHeight}px`,
    viewportAspectRatio: `${window.innerWidth}:${window.innerHeight}`,
    outerWindowWidth: window.outerWidth || "Unknown",
    outerWindowHeight: window.outerHeight || "Unknown",
    availableWidth: window.screen.availWidth || "Unknown",
    availableHeight: window.screen.availHeight || "Unknown",
    screenPosition: `${window.screenX || 0} x ${window.screenY || 0}`,
    isFullscreen: document.fullscreenElement ? "Yes" : "No",
    cookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
    historyLength: window.history.length || "Unknown",
    secureContext: window.isSecureContext ? "Yes" : "No",
    prefersDarkUI: window.matchMedia("(prefers-color-scheme: dark)").matches ? "Dark" : "Light",
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "Yes" : "No",
    prefersReducedTransparency: window.matchMedia("(prefers-reduced-transparency: reduce)").matches ? "Yes" : "No",
    prefersHighContrast: window.matchMedia("(prefers-contrast: high)").matches ? "Yes" : "No",
    localStorage: typeof localStorage !== "undefined" ? "Enabled" : "Unsupported",
    productSub: navigator.productSub || "Unknown",
    appName: navigator.appName || "Unknown",
    appVersion: navigator.appVersion || "Unknown",
    pdfViewer: navigator.pdfViewerEnabled ? "Enabled" : "Unknown",
    localStorageSize: `${localStorage.length} items`,
    webdriver: navigator.webdriver ? "Yes" : "No",
    globalPrivacyControl: "Unsupported",
  };
};

const BrowserDetailsComponent = () => {
  const browserDetails = getBrowserDetails();

  return (
    <div className="info-card detailsbox">
      <h3>Browser Details</h3>
      {Object.entries(browserDetails).map(([key, value]) => (
        <p key={key}>
          <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

export default BrowserDetailsComponent;
