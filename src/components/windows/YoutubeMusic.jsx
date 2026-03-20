import React from 'react';
import MacWindow from './MacWindow';

const YouTubeMusic = ({ onClose, onMinimize, onMaximize, isMaximized, zIndex, onFocus }) => {
  return (
    <MacWindow 
      title="YouTube Music" 
      onClose={onClose} 
      onMinimize={onMinimize} 
      onMaximize={onMaximize}
      onFocus={onFocus}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div style={{ height: '100%', backgroundColor: '#000', overflow: 'hidden' }}>
        <iframe
          title="YouTube Music"
          width="100%"
          height="100%"
          // Replace the ID after /embed/ with your favorite playlist ID
          src="https://www.youtube.com/embed/playlist?list=OLAK5uy_mYIL7LZHOSq3_4DprJIVJudvS0F03kAbA" 
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </MacWindow>
  );
};

export default YouTubeMusic;