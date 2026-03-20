import React, { useState } from 'react';
import '../ControlCenter.scss';

// Import your SVG assets
import wifiIcon from "../../assets/navbar-icons/wifi.svg";
import bluetoothIcon from "../../assets/navbar-icons/bluetooth.svg";
import airdropIcon from "../../assets/navbar-icons/airdrop.svg";
import displayIcon from "../../assets/navbar-icons/display.svg";
import volumeIcon from "../../assets/navbar-icons/volume.svg";

const ControlCenter = ({ isOpen }) => {
  // State for toggles
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isBluetoothOn, setIsBluetoothOn] = useState(true);
  const[isAirDropOn, setIsAirDropOn] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="control-center-panel">
      <div className="top-row">
        {/* Connectivity Platter */}
        <div className="platter connectivity">
          {/* Wi-Fi Item */}
          <div className="item" onClick={() => setIsWifiOn(!isWifiOn)}>
            <div className={`icon ${isWifiOn ? 'active' : ''}`}>
                <img src={wifiIcon} alt="WiFi" />
            </div>
            <div className="text">
              <span className="title">Wi-Fi</span>
            </div>
          </div>

          {/* Bluetooth Item */}
          <div className="item" onClick={() => setIsBluetoothOn(!isBluetoothOn)}>
            <div className={`icon ${isBluetoothOn ? 'active' : ''}`}>
                <img src={bluetoothIcon} alt="Bluetooth" />
            </div>
            <div className="text">
              <span className="title">Bluetooth</span>
            </div>
          </div>
        </div>

        {/* AirDrop Platter */}
        <div className="platter small-grid" onClick={() => setIsAirDropOn(!isAirDropOn)}>
          <div className="item-square">
            <div className={`icon ${isAirDropOn ? 'active' : ''}`}>
                <img src={airdropIcon} alt="AirDrop" />
            </div>
            <span>AirDrop</span>
          </div>
        </div>
      </div>

      {/* Sliders Platter */}
      <div className="platter sliders">
        <div className="slider-group">
          <div className="slider-header">
             <img src={displayIcon} alt="Display" className="slider-icon" />
             <span className="label">Display</span>
          </div>
          <input type="range" className="mac-slider" min="0" max="100" defaultValue="80" />
        </div>
        <div className="slider-group">
          <div className="slider-header">
             <img src={volumeIcon} alt="Sound" className="slider-icon" />
             <span className="label">Sound</span>
          </div>
          <input type="range" className="mac-slider" min="0" max="100" defaultValue="50" />
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;