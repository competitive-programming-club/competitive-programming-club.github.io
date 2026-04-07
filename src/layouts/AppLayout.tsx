import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[var(--nav-height)]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
