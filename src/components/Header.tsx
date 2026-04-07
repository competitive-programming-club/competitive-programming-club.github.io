import { Search, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)]"
      style={{ backgroundColor: "hsl(231 56% 47%)" }}
    >
      <div className="h-full flex items-center px-4 gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-white/80 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Logo / Site title */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-sm tracking-tight shrink-0 no-underline hover:no-underline"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>CP Club</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {[
            { label: "Home", path: "/" },
            { label: "Leaderboard", path: "/leaderboard" },
            { label: "Contest Calendar", path: "/contests" },
            { label: "Editorials", path: "/editorials" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm no-underline hover:no-underline transition-colors ${
                location.pathname === item.path
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="hidden sm:block w-56">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/50"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border-0 rounded-sm pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-colors"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
