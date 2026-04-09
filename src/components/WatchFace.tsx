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

  const cx = 200;
  const cy = 200;
  const numeralRadius = 158;
  const dotRadius = 178;

  return (
    <div className="relative flex items-center justify-center">
      <style>{`
        @keyframes templeGlow {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 20px rgba(217, 119, 6, 0.8)); }
          50% { opacity: 0.9; filter: drop-shadow(0 0 40px rgba(217, 119, 6, 1)); }
        }
        .temple-glow { animation: templeGlow 3s ease-in-out infinite; }

        .watch-svg text {
          font-family: 'Moulpali', cursive;
          dominant-baseline: central;
          text-anchor: middle;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/20 via-transparent to-transparent blur-3xl w-full h-full"></div>

      <div className="relative group">
        <div className="absolute -inset-8 bg-gradient-to-r from-red-700 via-amber-600 to-red-700 rounded-full opacity-50 blur-3xl group-hover:opacity-80 transition-opacity duration-500"></div>

        <div className="relative w-72 h-72 xs:w-80 xs:h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-800 via-amber-900 to-red-900 shadow-2xl border-[6px] sm:border-8 border-yellow-600 overflow-hidden">
            <div className="absolute inset-3 rounded-full border-4 border-red-800/60"></div>

            <svg
              className="watch-svg absolute inset-0 w-full h-full"
              viewBox="0 0 400 400"
              preserveAspectRatio="xMidYMid meet"
            >
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
                <filter id="textGlow">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <circle cx={cx} cy={cy} r="200" fill="url(#templeGrad)"/>
              <circle cx={cx} cy={cy} r="195" fill="url(#khmerPattern)"/>

              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = cx + 185 * Math.cos(rad);
                const y1 = cy + 185 * Math.sin(rad);
                const x2 = cx + 170 * Math.cos(rad);
                const y2 = cy + 170 * Math.sin(rad);
                return (
                  <line key={`ray-${angle}`} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#fbbf24" strokeWidth="2" opacity="0.4"/>
                );
              })}

              <circle cx={cx} cy={cy} r="145" fill="none" stroke="#eab308" strokeWidth="2" opacity="0.4"/>
              <circle cx={cx} cy={cy} r="130" fill="none" stroke="#991b1b" strokeWidth="1.5" opacity="0.5"/>

              {khmerNumerals.map((numeral, i) => {
                if (i === 0) return null;
                const angle = ((i % 12) * 30 - 90) * (Math.PI / 180);
                const nx = cx + numeralRadius * Math.cos(angle);
                const ny = cy + numeralRadius * Math.sin(angle);
                const dx = cx + dotRadius * Math.cos(angle);
                const dy = cy + dotRadius * Math.sin(angle);
                return (
                  <g key={i}>
                    <circle cx={dx} cy={dy} r="4" fill="#facc15" opacity="0.9"/>
                    <text
                      x={nx} y={ny}
                      fill="#fde68a"
                      fontSize="20"
                      fontWeight="bold"
                      filter="url(#textGlow)"
                    >
                      {numeral}
                    </text>
                  </g>
                );
              })}

              <g transform={`rotate(${hoursRotation}, ${cx}, ${cy})`}>
                <rect x={cx - 5} y={cy - 90} width="10" height="90" rx="5"
                  fill="url(#hourGrad)" opacity="0.95"/>
                <circle cx={cx} cy={cy - 90} r="5" fill="#fef08a"/>
                <defs>
                  <linearGradient id="hourGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fef08a"/>
                    <stop offset="60%" stopColor="#eab308"/>
                    <stop offset="100%" stopColor="transparent"/>
                  </linearGradient>
                </defs>
              </g>

              <g transform={`rotate(${minutesRotation}, ${cx}, ${cy})`}>
                <rect x={cx - 3.5} y={cy - 115} width="7" height="115" rx="3.5"
                  fill="url(#minGrad)" opacity="0.95"/>
                <circle cx={cx} cy={cy - 115} r="4" fill="#fef9c3"/>
                <defs>
                  <linearGradient id="minGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fef9c3"/>
                    <stop offset="60%" stopColor="#fde047"/>
                    <stop offset="100%" stopColor="transparent"/>
                  </linearGradient>
                </defs>
              </g>

              <g transform={`rotate(${secondsRotation}, ${cx}, ${cy})`}>
                <rect x={cx - 2} y={cy - 128} width="4" height="128" rx="2"
                  fill="url(#secGrad)" opacity="0.95"/>
                <defs>
                  <linearGradient id="secGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171"/>
                    <stop offset="60%" stopColor="#ef4444"/>
                    <stop offset="100%" stopColor="#dc2626"/>
                  </linearGradient>
                </defs>
              </g>

              <rect x={cx - 38} y={cy - 95} width="76" height="52" rx="6"
                fill="#422006" stroke="#ca8a04" strokeWidth="1.5" opacity="0.9"/>
              <text x={cx} y={cy - 76} fill="#fde68a" fontSize="11" fontWeight="bold" letterSpacing="3">
                {time.month}
              </text>
              <text x={cx} y={cy - 56} fill="#fef3c7" fontSize="28" fontWeight="bold">
                {time.date}
              </text>

              <text x={cx} y={cy + 70} fill="#fef3c7" fontSize="26" letterSpacing="4" opacity="0.95">
                {digitalTime}
              </text>
              <text x={cx} y={cy + 92} fill="#fde68a" fontSize="11" fontWeight="bold" letterSpacing="3">
                ស្វយ័ត្ត
              </text>

              <circle cx={cx} cy={cy} r="10" fill="url(#jewelGrad)"/>
              <circle cx={cx} cy={cy} r="5" fill="rgba(255,255,255,0.4)"/>
              <defs>
                <radialGradient id="jewelGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fef08a"/>
                  <stop offset="50%" stopColor="#eab308"/>
                  <stop offset="100%" stopColor="#d97706"/>
                </radialGradient>
              </defs>

              <circle cx={cx} cy={cy} r="199" fill="none"
                stroke="url(#rimGrad)" strokeWidth="3" opacity="0.6"/>
              <defs>
                <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
                  <stop offset="50%" stopColor="transparent"/>
                  <stop offset="100%" stopColor="rgba(0,0,0,0.4)"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-9 sm:w-12 sm:h-10 bg-gradient-to-b from-yellow-600 to-yellow-700 border-2 border-yellow-500 shadow-xl rounded-b-lg">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
          </div>

          <div className="absolute -right-2 top-1/4 w-5 h-9 sm:w-6 sm:h-11 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r-lg">
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-r"></div>
          </div>
          <div className="absolute -right-2 top-1/2 w-5 h-10 sm:w-6 sm:h-12 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r-lg">
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-r"></div>
          </div>
          <div className="absolute -right-2 bottom-1/4 w-5 h-9 sm:w-6 sm:h-11 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r-lg">
            <div className="absolute inset-1 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-r"></div>
          </div>

          <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 w-32 sm:w-36 h-6 sm:h-7 bg-gradient-to-b from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-sm">
            <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50"></div>
            <div className="absolute inset-0.5 bg-yellow-900 rounded-sm flex items-center justify-center gap-2">
              <div className="text-xs font-bold text-yellow-300 tracking-widest">ANGKOR</div>
              <div className="text-xs font-light text-yellow-400 tracking-widest">អង្គរ</div>
            </div>
          </div>
        </div>

        <div className="temple-glow absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-yellow-600/20 to-red-600/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
