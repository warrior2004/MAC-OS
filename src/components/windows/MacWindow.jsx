import React from 'react';
import { Rnd } from 'react-rnd';
import { motion } from 'framer-motion';
import './window.scss';

const MacWindow = ({ 
  children, 
  title = "Harshit Chauhan — zsh", 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, // New prop for z-index management
  isMaximized,
  zIndex // New prop passed from App.jsx
}) => {

  // The "Genie" Animation Variants
  const genieVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, 
      y: 500, // Starts from the Dock area
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.3, 
      y: 500, // Sucks back down into the Dock
      filter: "blur(10px)",
      transition: { duration: 0.3 } 
    }
  };

  return (
    <Rnd
      dragHandleClassName="nav"
      bounds="parent"
      minWidth={320}
      minHeight={200}
      enableUserSelectHack={true}
      
      // Handle active window stacking
      style={{ zIndex: zIndex }}
      onMouseDown={onFocus} 

      // Maximize Logic
      size={isMaximized ? { width: '100%', height: '100%' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}

      default={{
        x: 100,
        y: 50,
        width: 600,
        height: 400,
      }}
    >
      {/* Framer Motion Wrapper for Genie Effect */}
      <motion.div
        variants={genieVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="window-motion-wrapper"
        style={{ height: '100%', width: '100%' }}
      >
        <div className={`window ${isMaximized ? 'maximized' : ''}`}>
          <div className="nav">
            <div className="dots">
              <div className="dot red" onClick={(e) => { e.stopPropagation(); onClose(); }}></div>
              <div className="dot yellow" onClick={(e) => { e.stopPropagation(); onMinimize(); }}></div>
              <div className="dot green" onClick={(e) => { e.stopPropagation(); onMaximize(); }}></div>
            </div>
            <div className="title">
              <p>{title}</p>
            </div>
          </div>
          <div className="main-content">
            {children}
          </div>
        </div>
      </motion.div>
    </Rnd>
  );
};

export default MacWindow;