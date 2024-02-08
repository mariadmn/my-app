import React, { useEffect, useState } from 'react';
import { useSettings } from '../Settings/settingsState';
import { useTheme } from 'styled-components';

const Clock: React.FC = () => {
  const { timeFormat } = useSettings();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [loading, setLoading] = useState(true); 
  const theme = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime =
        timeFormat === '24h'
          ? `${hours}:${minutes.toString().padStart(2, '0')}`
          : `${(hours % 12) || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

      setCurrentTime(formattedTime);
      setLoading(false); // Marks the clock as loaded
    };

    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval
    return () => clearInterval(intervalId);
  }, [timeFormat]);

  return (
    <div style={{ fontSize: 12, color: theme.theme.text}}>
      {loading ? (
        <p>Loading Clock...</p>
      ) : (
        <h1>{currentTime}</h1>
      )}
    </div>
  );
};

export default Clock;
