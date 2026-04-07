import { Search, Menu, Terminal } from "lucide-react";
import { useState } from "react";

interface TopNavProps {
  onToggleSidebar: () => void;
}

const TopNav = ({ onToggleSidebar }: TopNavProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] bg-card/95 backdrop-blur-sm border-b border-border flex items-center px-4 gap-4">
      <button
        onClick={onToggleSidebar}
        className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2 text-primary font-bold shrink-0">
        <Terminal size={20} />
        <span className="font-mono text-sm tracking-tight">CP Club</span>
      </div>

      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md pl-9 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
            /
          </kbd>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-3 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">About</a>
        <a href="#" className="hover:text-foreground transition-colors">Contribute</a>
      </div>
    </header>
  );
};

export default TopNav;
