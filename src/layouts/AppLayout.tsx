import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import AppSidebar from "@/components/AppSidebar";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <AppSidebar open={sidebarOpen} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <main className="pt-[var(--nav-height)] lg:pl-60">
        <div className="px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
