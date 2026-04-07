import { Menu, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const location = useLocation();
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] bg-primary">
      <div className="h-full flex items-center px-4 gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-primary-foreground/80 hover:text-primary-foreground transition-colors"
        >
          <Menu size={20} />
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 text-primary-foreground font-bold text-sm tracking-tight shrink-0 no-underline hover:no-underline"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          {/* CHANGE CLUB NAME HERE */}
          <span>CP Club</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {[
            { label: "Home", path: "/" },
            { label: "Leaderboard", path: "/leaderboard" },
            { label: "Contests", path: "/contests" },
            { label: "Editorials", path: "/editorials" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm no-underline hover:no-underline transition-colors ${
                location.pathname === item.path
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="text-primary-foreground/70 hover:text-primary-foreground transition-colors p-1.5 rounded-sm hover:bg-primary-foreground/10"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
