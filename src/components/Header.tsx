import { Watch } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Watch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">NEXUS</h1>
              <p className="text-xs text-cyan-400 tracking-widest">HAUTE HORLOGERIE</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Limited Edition</p>
            <p className="text-xs text-cyan-400">1 of 18</p>
          </div>
        </div>
      </div>
    </header>
  );
}
