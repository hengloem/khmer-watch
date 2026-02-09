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
      <div className="absolute inset-0 bg-gradient-radial from-yellow-500/15 via-transparent to-transparent blur-3xl w-full h-full"></div>

      <div className="relative group">
        <div className="absolute -inset-6 bg-gradient-to-r from-red-700 via-yellow-600 to-red-700 rounded-full opacity-40 blur-3xl group-hover:opacity-60 transition-opacity duration-500"></div>

        <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-900 via-amber-900 to-yellow-900 shadow-2xl border-8 border-yellow-700 overflow-hidden">
            <div className="absolute inset-2 rounded-full border-4 border-yellow-500/60 shadow-inner"></div>
            <div className="absolute inset-6 rounded-full border-2 border-red-700/40"></div>

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="khmerDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="2" fill="#fde047" opacity="0.5"/>
                </pattern>
                <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{ stopColor: '#b45309', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#7c2d12', stopOpacity: 1 }} />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="200" fill="url(#dialGrad)"/>
              <circle cx="200" cy="200" r="195" fill="url(#khmerDots)"/>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              {khmerNumerals.map((numeral, i) => {
                if (i === 0) return null;
                const angle = ((i - 1) * 30) * (Math.PI / 180);
                const x = Math.sin(angle) * 125;
                const y = -Math.cos(angle) * 125;
                return (
                  <div
                    key={i}
                    className="absolute flex items-center justify-center text-yellow-300 font-bold text-lg"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                    }}
                  >
                    {numeral}
                  </div>
                );
              })}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-44 h-44 rounded-full border-4 border-yellow-500/30"></div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 w-2.5 h-24 bg-gradient-to-b from-yellow-300 via-yellow-400 to-transparent origin-bottom -translate-x-1/2 -translate-y-full rounded-full shadow-lg shadow-yellow-600/70"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${hoursRotation}deg)` }}
              ></div>

              <div
                className="absolute top-1/2 left-1/2 w-1.5 h-28 bg-gradient-to-b from-yellow-200 via-yellow-300 to-transparent origin-bottom -translate-x-1/2 -translate-y-full rounded-full shadow-lg shadow-yellow-500/60"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${minutesRotation}deg)` }}
              ></div>

              <div
                className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-b from-red-500 to-red-600 origin-bottom -translate-x-1/2 -translate-y-full rounded-full shadow-lg shadow-red-700/70"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${secondsRotation}deg)` }}
              ></div>

              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center">
                <div className="text-xs font-bold text-yellow-300 tracking-widest">{time.month}</div>
                <div className="text-2xl font-bold text-yellow-200" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{time.date}</div>
              </div>

              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
                <div className="text-2xl font-light text-yellow-200 tracking-widest font-mono" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)' }}>{digitalTime}</div>
                <div className="text-xs text-yellow-300/80 tracking-wider mt-1 font-semibold">ស្វយ័ត</div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-600/80 border-3 border-red-900"></div>
            </div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/4 via-transparent to-black/30 pointer-events-none"></div>
          </div>

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-8 bg-gradient-to-b from-yellow-600 to-yellow-700 border-2 border-yellow-500 shadow-xl rounded-b-lg"></div>

          <div className="absolute -right-1 top-1/4 w-5 h-10 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r"></div>
          <div className="absolute -right-1 top-1/2 w-5 h-12 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r"></div>
          <div className="absolute -right-1 bottom-1/4 w-5 h-10 bg-gradient-to-r from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-r"></div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-6 bg-gradient-to-b from-yellow-700 to-yellow-800 border-2 border-yellow-600 shadow-xl rounded-sm">
            <div className="absolute inset-0.5 bg-yellow-900 rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-yellow-300 tracking-widest">អង្គរ</span>
            </div>
          </div>
        </div>

        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gradient-to-br from-yellow-600/15 to-red-600/15 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
