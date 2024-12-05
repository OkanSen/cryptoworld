import "./Dashboard.css";
import GeolocationComponent from "./GeolocationComponent";
import DeviceDetailsComponent from "./DeviceDetailsComponent";
import BrowserDetailsComponent from "./BrowserDetailsComponent";
import NetworkDetailsComponent from "./NetworkDetailsComponent";
import CookiesComponent from "./CookiesComponent";
import FingerprintComponent from "./FingerprintComponent";

// Gather all components on dashboard component for a better structure
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="info-board"> 
        <DeviceDetailsComponent />
        <BrowserDetailsComponent />
        <NetworkDetailsComponent /> 
      </div>
      <GeolocationComponent />
      <div className="info-board">
        <CookiesComponent />
        <FingerprintComponent />
      </div>
    </div>
  );
};

export default Dashboard;
