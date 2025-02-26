"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.replace("/login"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  // Show a loading screen while authentication status is being determined
  if (isAuthenticated === null)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex  min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        {/* Main Content Area */}
        <div className="flex flex-col  sticky top-0 z-50 bg-white shadow-md">
          {/* Sticky Navbar */}
          <Navbar />
          {/* Scrollable Main Content */}
        </div>
        <main className="flex flex-col flex-1 overflow-y-auto">{children}</main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
