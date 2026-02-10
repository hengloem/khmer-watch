import { useState, useEffect } from 'react';
import Header from './components/Header';
import WatchDisplay from './components/WatchDisplay';
import WatchDetails from './components/WatchDetails';

function App() {
  const getInitialTime = () => {
    const now = new Date();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      date: now.getDate(),
      month: months[now.getMonth()],
    };
  };

  const [time, setTime] = useState(getInitialTime());

  useEffect(() => {
    const updateTime = () => {
      setTime(getInitialTime());
    };

    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <WatchDisplay time={time} />
          </div>
          <div>
            <WatchDetails />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
