import { useState, useEffect } from 'react';
import WatchFace from './components/WatchFace';

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
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-amber-950 to-red-950 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.1; }
          50% { transform: translateY(-20px); opacity: 0.05; }
        }
        .floating-ornament {
          position: absolute;
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Floating decorative elements */}
      <div className="floating-ornament top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-600/10 to-amber-600/10 rounded-full blur-2xl" style={{ animationDelay: '0s' }}></div>
      <div className="floating-ornament top-1/3 -right-10 w-48 h-48 bg-gradient-to-br from-red-600/10 to-yellow-600/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
      <div className="floating-ornament -bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-amber-600/10 to-red-600/10 rounded-full blur-3xl" style={{ animationDelay: '4s' }}></div>

      <WatchFace time={time} />
    </div>
  );
}

export default App;
