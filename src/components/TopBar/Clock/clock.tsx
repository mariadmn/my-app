import React, { useEffect, useState } from 'react';
import { useSettings } from '../Settings/settingsState';

const Clock: React.FC = () => {
  const { timeFormat } = useSettings();
  const [currentTime, setCurrentTime] = useState<string>('');

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
    };

    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval
    return () => clearInterval(intervalId);
  }, [timeFormat]);

  return (
    <div>
      <h1>{currentTime}</h1>
    </div>
  );
};

export default Clock;
