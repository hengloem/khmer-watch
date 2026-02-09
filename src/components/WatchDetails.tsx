import { Gem, Zap, Clock, Shield } from 'lucide-react';

export default function WatchDetails() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
          <span className="text-cyan-400 text-sm font-medium tracking-wide">TWIN TURBO NEXUS</span>
        </div>
        <h2 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
          Furious<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Baguette CR7
          </span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          A masterpiece of haute horlogerie featuring dual independent turbos,
          456 baguette-cut diamonds, and a skeletonized movement inspired by championship excellence.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
          <Gem className="w-8 h-8 text-cyan-400 mb-3" />
          <h3 className="text-white font-semibold mb-1">456 Diamonds</h3>
          <p className="text-slate-400 text-sm">Baguette-cut perfection</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
          <Zap className="w-8 h-8 text-cyan-400 mb-3" />
          <h3 className="text-white font-semibold mb-1">Twin Turbo</h3>
          <p className="text-slate-400 text-sm">Dual rotating systems</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
          <Clock className="w-8 h-8 text-cyan-400 mb-3" />
          <h3 className="text-white font-semibold mb-1">45mm Case</h3>
          <p className="text-slate-400 text-sm">Titanium & carbon fiber</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
          <Shield className="w-8 h-8 text-cyan-400 mb-3" />
          <h3 className="text-white font-semibold mb-1">100m Water</h3>
          <p className="text-slate-400 text-sm">Resistant luxury</p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-slate-400">Movement</span>
          <span className="text-white font-medium">Manual JCFM05</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-slate-400">Power Reserve</span>
          <span className="text-white font-medium">60 Hours</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-slate-400">Limited Edition</span>
          <span className="text-cyan-400 font-medium">18 Pieces</span>
        </div>
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-slate-400 text-sm">Estimated Value</span>
          </div>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            $1.43M
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105">
        Request Private Viewing
      </button>
    </div>
  );
}
