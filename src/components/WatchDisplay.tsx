interface WatchFaceProps {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
    date: number;
    month: string;
  };
}

export default function WatchFace({ time }: WatchFaceProps) {
  const secondsRotation = (time.seconds * 6) % 360;
  const minutesRotation = (time.minutes * 6 + time.seconds * 0.1) % 360;
  const hoursRotation = ((time.hours % 12) * 30 + time.minutes * 0.5) % 360;

  const digitalTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent blur-3xl w-full h-full"></div>

      <div className="relative group">
        <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full opacity-25 blur-3xl group-hover:opacity-40 transition-opacity duration-500"></div>

        <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-2xl border-8 border-slate-700 overflow-hidden">
            <div className="absolute inset-2 rounded-full border-2 border-cyan-500/40"></div>
            <div className="absolute inset-4 rounded-full border border-blue-500/30"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const x = Math.sin(angle) * 130;
                const y = -Math.cos(angle) * 130;
                return (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  ></div>
                );
              })}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-36 h-36 rounded-full border-2 border-cyan-500/20"></div>
              </div>

              <div
                className="absolute top-1/2 left-1/2 w-1.5 h-28 bg-gradient-to-b from-cyan-300 via-cyan-400 to-transparent origin-bottom -translate-x-1/2 -translate-y-full rounded-full shadow-lg shadow-cyan-500/50"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${hoursRotation}deg)` }}
              ></div>

              <div
                className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-b from-blue-300 via-blue-400 to-transparent origin-bottom -translate-x-1/2 -translate-y-full rounded-full shadow-lg shadow-blue-500/40"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${minutesRotation}deg)` }}
              ></div>

              <div
                className="absolute top-1/2 left-1/2 w-0.5 h-36 bg-gradient-to-b from-red-400 to-red-500 origin-bottom -translate-x-1/2 -translate-y-full rounded-full shadow-lg shadow-red-500/50"
                style={{ transform: `translateX(-50%) translateY(-100%) rotate(${secondsRotation}deg)` }}
              ></div>

              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center">
                <div className="text-xs font-bold text-cyan-400 tracking-wider">{time.month}</div>
                <div className="text-sm font-bold text-cyan-300">{time.date}</div>
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <div className="text-xl font-light text-cyan-300 tracking-widest font-mono">{digitalTime}</div>
                <div className="text-xs text-cyan-400/70 tracking-wider mt-1">AUTOMATIC</div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-lg shadow-cyan-500/70 border-2 border-slate-800"></div>
            </div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 via-transparent to-black/10 pointer-events-none"></div>
          </div>

          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 shadow-xl rounded-sm"></div>

          <div className="absolute -right-1 top-1/3 w-5 h-10 bg-gradient-to-r from-slate-700 to-slate-800 border-2 border-slate-600 shadow-xl rounded-r"></div>
          <div className="absolute -right-1 top-1/2 w-5 h-12 bg-gradient-to-r from-slate-700 to-slate-800 border-2 border-slate-600 shadow-xl rounded-r"></div>
          <div className="absolute -right-1 bottom-1/3 w-5 h-10 bg-gradient-to-r from-slate-700 to-slate-800 border-2 border-slate-600 shadow-xl rounded-r"></div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-28 h-5 bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 shadow-xl rounded-sm">
            <div className="absolute inset-0.5 bg-slate-950 rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-slate-600 tracking-widest">NEXUS</span>
            </div>
          </div>
        </div>

        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
