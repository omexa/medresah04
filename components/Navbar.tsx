"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import user icon

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and store user info
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-green-700 text-white">
      <h1 className="text-lg font-bold">ALHUDA</h1>

      {user ? (
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-2xl" /> {/* Profile Icon */}
          <span className="font-semibold text-white">{user.name}</span>
          {/* Display Name */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
