import { useState } from "react";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopNav onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <MainContent />
    </div>
  );
};

export default Index;
