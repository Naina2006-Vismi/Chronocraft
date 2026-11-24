import WatchCustomizer from '@/components/WatchCustomizer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-brand selection:text-black">
      {/* Navigation Header */}
      <nav className="w-full h-20 border-b border-surface-border flex items-center px-8 justify-between z-10 relative bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-brand flex items-center justify-center">
            <div className="w-4 h-4 bg-brand rounded-full"></div>
          </div>
          <span className="text-xl font-light tracking-widest text-white">CHRONO<span className="font-bold">CRAFT</span></span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-neutral-400">
          <a href="#" className="text-white hover:text-brand transition-colors">Design</a>
          <a href="#" className="hover:text-brand transition-colors">Discover</a>
          <a href="#" className="hover:text-brand transition-colors">Collection</a>
        </div>
      </nav>

      <WatchCustomizer />
    </main>
  );
}
