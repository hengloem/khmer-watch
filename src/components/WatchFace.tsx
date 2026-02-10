interface WatchFaceProps {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
    date: number;
    month: string;
  };
}

const khmerNumerals = ['', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩', '១០', '១១', '១២'];

export default function WatchFace({ time }: WatchFaceProps) {
  const secondsRotation = (time.seconds * 6) % 360;
  const minutesRotation = (time.minutes * 6 + time.seconds * 0.1) % 360;
  const hoursRotation = ((time.hours % 12) * 30 + time.minutes * 0.5) % 360;

  const digitalTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;

  return (
    <div className="relative flex items-center justify-center">
      <style>{`
        @keyframes templeGlow {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 20px rgba(217, 119, 6, 0.8)); }
          50% { opacity: 0.9; filter: drop-shadow(0 0 40px rgba(217, 119, 6, 1)); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .temple-glow { animation: templeGlow 3s ease-in-out infinite; }
        .rotate-slow { animation: rotateSlow 120s linear infinite; }
      `}</style>

      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/20 via-transparent to-transparent blur-3xl w-full h-full"></div>

      <div className="relative group">
        <div className="absolute -inset-8 bg-gradient-to-r from-red-700 via-amber-600 via-yellow-600 to-red-700 rounded-full opacity-50 blur-3xl group-hover:opacity-80 transition-opacity duration-500"></div>

        <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem]">
          {/* Outer Temple Rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-800 via-amber-900 to-red-900 shadow-2xl border-8 border-yellow-600 overflow-hidden">
            {/* Ornamental outer ring */}
            <div className="absolute inset-0 rounded-full border-12 border-double border-yellow-700/80"></div>
            <div className="absolute inset-3 rounded-full border-4 border-red-800/60"></div>

            {/* Temple spire decorations */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="templeGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{ stopColor: '#b45309', stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: '#8b3a0f', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#6d2817', stopOpacity: 1 }} />
                </radialGradient>
                <pattern id="khmerPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="3" fill="#fbbf24" opacity="0.6"/>
                  <circle cx="8" cy="8" r="1.5" fill="#fcd34d" opacity="0.4"/>
                  <circle cx="32" cy="32" r="1.5" fill="#fcd34d" opacity="0.4"/>
                </pattern>
              </defs>

              <circle cx="200" cy="200" r="200" fill="url(#templeGrad)"/>
              <circle cx="200" cy="200" r="195" fill="url(#khmerPattern)"/>

              {/* Temple spire rays */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 200 + 180 * Math.cos(rad);
                const y1 = 200 + 180 * Math.sin(rad);
                const x2 = 200 + 165 * Math.cos(rad);
                const y2 = 200 + 165 * Math.sin(rad);
                return (
                  <line
                    key={`ray-${angle}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#fbbf24"
                    strokeWidth="2"
                    opacity="0.4"
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              {/* Hour markers with ornaments */}
              {khmerNumerals.map((numeral, i) => {
                if (i === 0) return null;
                const angle = ((i % 12) * 30) * (Math.PI / 180);
                const x = Math.sin(angle) * 118;
                const y = -Math.cos(angle) * 118;
                return (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center justify-center"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mb-1 shadow-lg shadow-yellow-500/50"></div>
                    <div className="text-yellow-300 font-bold text-xl drop-shadow-lg" style={{ textShadow: '0 3px 6px rgba(0,0,0,0.8), 0 0 12px rgba(217, 119, 6, 0.5)' }}>
                      {numeral}
                    </div>
                  </div>
                );
              })}

              {/* Inner decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-48 h-48 rounded-full border-4 border-yellow-500/40 shadow-inner"></div>
                <div className="absolute w-40 h-40 rounded-full border-2 border-red-700/50"></div>
              </div>

              {/* Hour hand with ornament */}
              <div
                className="absolute top-1/2 left-1/2 origin-bottom -translate-x-1/2 -translate-y-full"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${hoursRotation}deg)` }}
              >
                <div className="w-3 h-24 bg-gradient-to-b from-yellow-300 via-yellow-400 to-transparent rounded-full shadow-lg shadow-yellow-600/80"></div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full shadow-md shadow-yellow-500/70"></div>
              </div>

              {/* Minute hand with ornament */}
              <div
                className="absolute top-1/2 left-1/2 origin-bottom -translate-x-1/2 -translate-y-full"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${minutesRotation}deg)` }}
              >
                <div className="w-2.5 h-28 bg-gradient-to-b from-yellow-200 via-yellow-300 to-transparent rounded-full shadow-lg shadow-yellow-500/70"></div>
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-200 rounded-full shadow-md shadow-yellow-500/60"></div>
              </div>

              {/* Second hand with accent */}
              <div
                className="absolute top-1/2 left-1/2 origin-bottom -translate-x-1/2 -translate-y-full"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${secondsRotation}deg)` }}
              >
                <div className="w-1.5 h-32 bg-gradient-to-b from-red-400 via-red-500 to-red-600 rounded-full shadow-lg shadow-red-700/80"></div>
              </div>

              {/* Date display with decorative frame */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-b from-yellow-700/40 to-red-700/40 rounded-lg blur-sm"></div>
                  <div className="relative bg-gradient-to-br from-yellow-900 to-red-900 px-4 py-2 rounded border-2 border-yellow-600/60">
                    <div className="text-xs font-bold text-yellow-300 tracking-widest">{time.month}</div>
                    <div className="text-3xl font-bold text-yellow-200" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.9)' }}>{time.date}</div>
                  </div>
                </div>
              </div>

              {/* Digital time display */}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-b from-yellow-700/30 to-transparent rounded-lg blur-sm"></div>
                  <div className="relative">
                    <div className="text-3xl font-light text-yellow-200 tracking-widest font-mono" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.9), 0 0 16px rgba(217, 119, 6, 0.4)' }}>{digitalTime}</div>
                    <div className="text-xs text-yellow-300/90 tracking-widest mt-1 font-bold">ស្វយ័ត្ត</div>
                  </div>
                </div>
              </div>

              {/* Center jewel */}
              <div className="absolute top-1/2 left-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/90 border-3 border-red-900/80"></div>
                <div className="absolute inset-1 bg-gradient-radial from-white/60 to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Glass overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 via-transparent to-black/40 pointer-events-none shadow-inner"></div>
          </div>

          {/* Crown with temple inspiration */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-10 bg-gradient-to-b from-yellow-600 to-yellow-700 border-3 border-yellow-500 shadow-xl rounded-b-lg">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
          </div>

          {/* Pushers with ornamental design */}
          <div className="absolute -right-2 top-1/4 w-6 h-11 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r-lg hover:shadow-yellow-600/50 transition-shadow">
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-r"></div>
          </div>
          <div className="absolute -right-2 top-1/2 w-6 h-13 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r-lg hover:shadow-yellow-600/50 transition-shadow">
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-r"></div>
          </div>
          <div className="absolute -right-2 bottom-1/4 w-6 h-11 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r-lg hover:shadow-yellow-600/50 transition-shadow">
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-r"></div>
          </div>

          {/* Brand plate with temple motif */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-36 h-7 bg-gradient-to-b from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-sm">
            <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
            <div className="absolute inset-0.5 bg-yellow-900 rounded-sm flex items-center justify-center">
              <div className="text-xs font-bold text-yellow-300 tracking-widest">ANGKOR</div>
              <div className="text-xs font-light text-yellow-400 tracking-widest ml-2">អង្គរ</div>
            </div>
          </div>
        </div>

        {/* Outer glow effect */}
        <div className="temple-glow absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-yellow-600/20 to-red-600/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
