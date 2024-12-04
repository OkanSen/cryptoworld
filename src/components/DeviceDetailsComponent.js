import React, { useState, useEffect } from "react";
import { UAParser } from "ua-parser-js";

// Get available device info
const getDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();
  
  return {
    os: result.os.name || "Unknown",
    osVersion: result.os.version || "Unknown",
    browser: result.browser.name || "Unknown",
    browserVersion: result.browser.version || "Unknown",
    deviceType: result.device.type || "Desktop/Laptop",
    deviceModel: result.device.model || "Unknown",
    cpu: result.cpu.architecture || "Unknown",
    platform: navigator.platform || "Unknown",
    memory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Unknown",
    cpuCores: navigator.hardwareConcurrency || "Unknown",
    screenSize: `${window.screen.width * window.devicePixelRatio}px x ${window.screen.height * window.devicePixelRatio}px`, // In order to get correct values we do this math
    gpuRenderer: (function () {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        return debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : "Unknown";
      }
      return "Unknown";
    })(),
    gpuVendor: (function () {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        return debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
          : "Unknown";
      }
      return "Unknown";
    })(),
    gpuVersion: "WebGL 1.0", // This is typically constant
    pointerMethod: matchMedia("(pointer: fine)").matches ? "Mouse" : "Touchscreen",
    touchscreen: matchMedia("(pointer: coarse)").matches ? "Yes" : "No",
    maxTouchPoints: navigator.maxTouchPoints || 0,
    screenOrientation: window.screen.orientation?.type || "Unknown",
    aspectRatio: (window.innerWidth / window.innerHeight).toFixed(2),
    pixelRatio: window.devicePixelRatio || 1,
    screenColorDepth: `${window.screen.colorDepth}-bit`,
    invertedColors: window.matchMedia("(inverted-colors: inverted)").matches
      ? "Yes"
      : "No",
    audioOutput: matchMedia("(prefers-reduced-motion: no-preference)").matches
      ? "Connected"
      : "Disconnected",
  };
};

const DeviceDetailsComponent = () => {
  const [fullDeviceInfo, setFullDeviceInfo] = useState({});

  // Set device info in state on mount
  useEffect(() => {
    setFullDeviceInfo(getDeviceInfo());
  }, []);

  return (
    <div className="info-card detailsbox">
      <h3>Device Details</h3>
      {/* Dynamically render p elements */}
      {Object.entries(fullDeviceInfo).map(([key, value]) => (
        <p key={key}>
          <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

export default DeviceDetailsComponent;
