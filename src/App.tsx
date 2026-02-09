import { useState, useEffect } from 'react';
import WatchFace from './components/WatchFace';

function App() {
  const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number; date: number; month: string }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: 0,
    month: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        date: now.getDate(),
        month: months[now.getMonth()],
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-900 to-red-950 flex items-center justify-center p-4">
      <WatchFace time={time} />
    </div>
  );
}

export default App;
