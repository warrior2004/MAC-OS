import React, { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const MouseFollower = () => {
  // We define 6 dots for the trail
  const numDots = 6;
  
  // Create an array of springs for X and Y coordinates
  // Each dot gets its own spring to create the "lag"
  const dots = Array.from({ length: numDots }).map((_, i) => ({
    x: useSpring(0, { stiffness: 150 - i * 20, damping: 25 + i * 2 }),
    y: useSpring(0, { stiffness: 150 - i * 20, damping: 25 + i * 2 }),
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Every dot follows the exact same mouse coordinates, 
      // but their individual spring settings make them move at different speeds
      dots.forEach((dot) => {
        dot.x.set(e.clientX);
        dot.y.set(e.clientY);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [dots]);

  return (
    <>
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          className="cursor-dot"
          style={{
            translateX: dot.x,
            translateY: dot.y,
            // Make trailing dots smaller and more transparent
            width: 20 - index * 2,
            height: 20 - index * 2,
            opacity: 1 - index * 0.15,
            zIndex: 9999 - index, // Ensure lead dot is on top
          }}
        />
      ))}
    </>
  );
};

export default MouseFollower;