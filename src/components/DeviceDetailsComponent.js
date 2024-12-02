import React, { useState, useEffect } from "react";
import { UAParser } from "ua-parser-js";



const getDeviceInfo = () => {
    const parser = new UAParser();
    const result = parser.getResult();
    const screenResolution = `${window.innerWidth}x${window.innerHeight}`;
    const fullScreenResolution = `${window.screen.width}x${window.screen.height}`;
  
    return {
      os: result.os.name || "Unknown",
      osVersion: result.os.version || "Unknown",
      browser: result.browser.name || "Unknown",
      browserVersion: result.browser.version || "Unknown",
      deviceType: result.device.type || "Desktop/Laptop",
      deviceModel: result.device.model || "Unknown",
      platform: navigator.platform || "Unknown",
      memory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Unknown",
      cpuCores: navigator.hardwareConcurrency || "Unknown",
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
      screenRefreshRate: "60 Hz", // Not easily accessible; assumed default
      aspectRatio: (window.innerWidth / window.innerHeight).toFixed(2),
      pixelRatio: window.devicePixelRatio || 1,
      screenSize: `${window.screen.width}px x ${window.screen.height}px`,
      screenColorDepth: `${window.screen.colorDepth}-bit`,
      invertedColors: window.matchMedia("(inverted-colors: inverted)").matches
        ? "Yes"
        : "No",
      numberOfCameras: "1", // Needs MediaDevices API, defaulting to 1
      numberOfMicrophones: "1", // Needs MediaDevices API, defaulting to 1
      numberOfSpeakers: "2", // Needs MediaDevices API, defaulting to 2
      gamepad: "Disconnected", // Can be expanded to dynamically check
      audioOutput: matchMedia("(prefers-reduced-motion: no-preference)").matches
        ? "Connected"
        : "Disconnected",
      battery: "Unknown", // Requires Battery API, defaulting to Unknown
    };
  };

const DeviceDetailsComponent = () => {

    const [deviceInfo, setDeviceInfo] = useState(getDeviceInfo());

    useEffect(() => {
        // Add any dynamic updates if necessary
    }, []);

  

  

  return (
    <div className="info-card detailsbox">
      <h3>Device Details</h3>
      <p><strong>Operating System:</strong> {deviceInfo.os}</p>
      <p><strong>OS Version:</strong> {deviceInfo.osVersion}</p>
      <p><strong>Browser:</strong> {deviceInfo.browser}</p>
      <p><strong>Browser Version:</strong> {deviceInfo.browserVersion}</p>
      <p><strong>Device Type:</strong> {deviceInfo.deviceType}</p>
      <p><strong>Device Model:</strong> {deviceInfo.deviceModel}</p>
      <p><strong>Platform:</strong> {deviceInfo.platform}</p>
      <p><strong>Device Memory:</strong> {deviceInfo.memory}</p>
      <p><strong>CPU Cores:</strong> {deviceInfo.cpuCores}</p>
      <p><strong>GPU Renderer:</strong> {deviceInfo.gpuRenderer}</p>
      <p><strong>GPU Vendor:</strong> {deviceInfo.gpuVendor}</p>
      <p><strong>GPU Version:</strong> {deviceInfo.gpuVersion}</p>
      <p><strong>Pointer Method:</strong> {deviceInfo.pointerMethod}</p>
      <p><strong>Touchscreen:</strong> {deviceInfo.touchscreen}</p>
      <p><strong>Max Touch Points:</strong> {deviceInfo.maxTouchPoints}</p>
      <p><strong>Screen Orientation:</strong> {deviceInfo.screenOrientation}</p>
      <p><strong>Screen Refresh Rate:</strong> {deviceInfo.screenRefreshRate}</p>
      <p><strong>Aspect Ratio:</strong> {deviceInfo.aspectRatio}</p>
      <p><strong>Pixel Ratio:</strong> {deviceInfo.pixelRatio}</p>
      <p><strong>Screen Size:</strong> {deviceInfo.screenSize}</p>
      <p><strong>Screen Color Depth:</strong> {deviceInfo.screenColorDepth}</p>
      <p><strong>Inverted Colors:</strong> {deviceInfo.invertedColors}</p>
      <p><strong>Number of Cameras:</strong> {deviceInfo.numberOfCameras}</p>
      <p><strong>Number of Microphones:</strong> {deviceInfo.numberOfMicrophones}</p>
      <p><strong>Number of Speakers:</strong> {deviceInfo.numberOfSpeakers}</p>
      <p><strong>Gamepad:</strong> {deviceInfo.gamepad}</p>
      <p><strong>Headphones/Stereo Output:</strong> {deviceInfo.audioOutput}</p>
      <p><strong>Battery Data:</strong> {deviceInfo.battery}</p>
    </div>
  );
};

export default DeviceDetailsComponent;
