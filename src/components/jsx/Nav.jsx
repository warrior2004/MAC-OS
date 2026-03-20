import React, { useState, useEffect } from 'react';
import "../nav.scss"
import apple from "../../assets/navbar-icons/apple.svg"
import wifi from "../../assets/navbar-icons/wifi.svg"
import DateTime from './DateTime'
import controlIcon from '../../assets/navbar-icons/Setting.svg'
import ControlCenter from './ControlCenter';

const Nav = () => {
    const [isControlOpen, setIsControlOpen] = useState(false);
    return (
        <nav>
            <div className='left'>
                <div className="apple-icon">
                    <img src={apple} alt="apple logo" />
                </div>
                <div className="nav-item">
                    <p>Harshit Chauhan</p>
                </div>
                <div className="nav-item">
                    <p>File</p>
                </div>
                <div className="nav-item">
                    <p>Window</p>
                </div>
                <div className="nav-item">
                    <p>Terminal</p>
                </div>
            </div>
            <div className='right'>
                <div className="nav-icon">
                    <img src={wifi} alt="wifi logo" />
                </div>
                <div className="nav-item">
                    <DateTime />
                </div>
                <div className="nav-icon" onClick={() => setIsControlOpen(!isControlOpen)}>
                    <img src={controlIcon} alt="control center" />
                </div>
                <ControlCenter isOpen={isControlOpen} />
            </div>
        </nav>
    )
}

export default Nav