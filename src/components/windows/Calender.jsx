import React, { useState } from 'react';
import MacWindow from './MacWindow';

const Calendar = ({ onClose, onMinimize, onMaximize, isMaximized, zIndex, onFocus }) => {
  const [date, setDate] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const days = [];
  // Fill empty slots for the first week
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  // Fill actual days
  for (let d = 1; d <= daysInMonth(date.getFullYear(), date.getMonth()); d++) {
    const isToday = d === new Date().getDate() && date.getMonth() === new Date().getMonth();
    days.push(
      <div key={d} className={`calendar-day ${isToday ? 'today' : ''}`}>
        {d}
      </div>
    );
  }

  return (
    <MacWindow 
      title="Calendar" 
      onClose={onClose} 
      onMinimize={onMinimize} 
      onMaximize={onMaximize}
      onFocus={onFocus}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="calendar-container" style={{ height: '100%', backgroundColor: '#fff', color: '#333', padding: '20px', fontFamily: 'sans-serif' }}>
        <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{monthNames[date.getMonth()]} {date.getFullYear()}</h2>
          <div>
            <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>‹</button>
            <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px', marginLeft: '10px' }}>›</button>
          </div>
        </div>

        <div className="calendar-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          textAlign: 'center',
          fontSize: '14px' 
        }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ fontWeight: 'bold', paddingBottom: '10px', color: '#999' }}>{d}</div>
          ))}
          {days}
        </div>
      </div>

      <style>{`
        .calendar-day { padding: 10px; border-radius: 50%; cursor: default; }
        .calendar-day.today { background-color: #ff3b30; color: white; font-weight: bold; }
        .calendar-day:not(.empty):hover { background-color: #f0f0f0; }
      `}</style>
    </MacWindow>
  );
};

export default Calendar;