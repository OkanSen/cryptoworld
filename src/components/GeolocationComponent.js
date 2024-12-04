import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Set up the default icon marker to show up on map
const defaultIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],  // Size of the marker
    iconAnchor: [12, 41], // Point of the icon that will correspond to marker's position
    popupAnchor: [1, -34], // Point from which the popup should open relative to the icon
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],  // Size of the shadow
    shadowAnchor: [12, 41], // Anchor of the shadow
});


const GeolocationComponent = () => {

    // State for device information
    const [deviceInfo, setDeviceInfo] = useState({
        location: "Unknown",
        latitude: null,
        longitude: null,
    });

    // Geolocation 
    useEffect(() => {
        if (navigator.geolocation) {
        const geoWatch = navigator.geolocation.watchPosition(
            (position) => {
            console.log("Updated GPS Accuracy:", position.coords.accuracy); // Log accuracy on each update
            setDeviceInfo((prev) => ({
                ...prev,
                location: `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
            }));
            },
            (error) => {
            setDeviceInfo((prev) => ({
                ...prev,
                location: "Location access denied or unavailable",
            }));
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 } // Fine-tuned parameters
        );
    
        // Cleanup to stop watching when the component unmounts
        return () => {
            navigator.geolocation.clearWatch(geoWatch);
        };
        }
    }, []);

    return(
        <div className="geolocation-container">
            <div className="info-card geolocation-card">
            <h3>Geolocation</h3>
            <p><strong>Location:</strong> {deviceInfo.location}</p>
            <p>Can have less accuracy at start, it will get a better accuracy in short time. Current Accuracy: {deviceInfo.accuracy} meters</p>

            {/* Render the map only if latitude and longitude are available */}
            {deviceInfo.latitude && deviceInfo.longitude && (
                <MapContainer center={[deviceInfo.latitude, deviceInfo.longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[deviceInfo.latitude, deviceInfo.longitude]} icon={defaultIcon}>
                    <Popup>
                    {`Latitude: ${deviceInfo.latitude}, Longitude: ${deviceInfo.longitude}`}
                    </Popup>
                </Marker>
                </MapContainer>
            )}
            </div>
        </div>
    );
}

export default GeolocationComponent;