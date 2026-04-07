import { Search, Menu, Terminal, LogIn, LogOut, User, Trophy } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface TopNavProps {
  onToggleSidebar: () => void;
}

const TopNav = ({ onToggleSidebar }: TopNavProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] bg-card border-b border-border flex items-center px-4 gap-4">
      <button
        onClick={onToggleSidebar}
        className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu size={20} />
      </button>

      <Link to="/" className="flex items-center gap-2 text-primary font-bold shrink-0">
        <Terminal size={20} />
        <span className="font-mono text-sm tracking-tight">CP Club</span>
      </Link>

      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted border border-border rounded-md pl-9 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Link
          to="/leaderboard"
          className="hidden sm:flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
        >
          <Trophy size={15} />
          <span>Leaderboard</span>
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <Link
              to="/profile"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              <User size={15} />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <LogIn size={14} />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default TopNav;
