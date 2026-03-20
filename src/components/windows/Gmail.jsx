import React, { useState } from 'react';
import MacWindow from './MacWindow';

const Gmail = ({ onClose, onMinimize, onMaximize, isMaximized, zIndex, onFocus }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const myEmail = "harshit.honey003@gmail.com";

  const handleSend = (e) => {
    e.preventDefault();
    // This opens the user's actual Gmail/Email client with your details pre-filled
    const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <MacWindow 
      title="Gmail — Compose" 
      onClose={onClose} 
      onMinimize={onMinimize} 
      onMaximize={onMaximize}
      onFocus={onFocus}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div style={{ height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', color: '#000' }}>
        <div style={{ padding: '15px', borderBottom: '1px solid #eee', fontWeight: '500' }}>
          Contact Me
        </div>
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 15px' }}>
          <input 
            type="text" 
            placeholder="To: yourname@gmail.com" 
            style={{ padding: '10px 0', border: 'none', borderBottom: '1px solid #eee', outline: 'none' }}
          />
          <input 
            type="text" 
            placeholder="Subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ padding: '10px 0', border: 'none', borderBottom: '1px solid #eee', outline: 'none' }}
          />
          <textarea 
            placeholder="Write your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ flex: 1, padding: '15px 0', border: 'none', outline: 'none', resize: 'none', fontFamily: 'inherit' }}
          />
          <div style={{ padding: '15px 0', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-start' }}>
            <button 
              type="submit"
              style={{ 
                backgroundColor: '#0b57d0', 
                color: 'white', 
                padding: '8px 24px', 
                borderRadius: '20px', 
                border: 'none', 
                cursor: 'pointer',
                fontWeight: '500' 
              }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </MacWindow>
  );
};

export default Gmail;