import React, { useEffect, useRef } from 'react';

const MatrixRain = ({ onFinished }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      // Black background with slight opacity for trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Matrix Green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Click or Press any key to exit Matrix mode
    const handleExit = () => onFinished();
    window.addEventListener('keydown', handleExit);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleExit);
    };
  }, [onFinished]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }} 
    />
  );
};

export default MatrixRain;