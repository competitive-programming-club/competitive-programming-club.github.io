import { Link, useLocation } from "react-router-dom";

// =============================================
// SIDEBAR NAVIGATION — Edit the array below
// =============================================
// Only pages that exist as routes are listed.
// To add a new page: 1) create src/pages/YourPage.tsx
//                     2) add route in src/App.tsx
//                     3) add entry here

const navigation = [
  { label: "Home", path: "/" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Contest Calendar", path: "/contests" },
  { label: "Editorials", path: "/editorials" },
];

interface AppSidebarProps {
  open: boolean;
}

const AppSidebar = ({ open }: AppSidebarProps) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-[var(--nav-height)] left-0 bottom-0 w-60 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-200 z-40 ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <nav className="py-3 px-2 text-[0.7rem]">
        {navigation.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-3 py-1.5 rounded-sm transition-colors no-underline hover:no-underline font-medium ${
              location.pathname === item.path
                ? "text-sidebar-accent-foreground bg-sidebar-accent"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
