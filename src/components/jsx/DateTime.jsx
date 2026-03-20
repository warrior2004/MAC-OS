import React, { useState, useEffect } from 'react';

const DateTime = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // Update the clock every second
        const timer = setInterval(() => setDate(new Date()), 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timer);
    }, []);

    const formatOptions = {
        weekday: 'short', // "Thu"
        day: 'numeric',   // "19"
        month: 'short',   // "Mar"
        hour: 'numeric',  // "12"
        minute: '2-digit',// "56"
        hour12: true      // "PM"
    };

    // Formats the date to look like: Thu 19 Mar 12:56 PM
    const formattedDate = date.toLocaleString('en-US', formatOptions).replace(/,/g, '');

    return (
        <p className="datetime-display">
            {formattedDate}
        </p>
    );
};

export default DateTime;