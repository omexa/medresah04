import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Calendar,
  User,
  Image,
  Menu,
  ChevronLeft,
  User2Icon,
} from "lucide-react";
// import { FaMosque } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Start closed on mobile
  const pathname = usePathname();

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <div
        className={`h-screen fixed top-0 left-0 z-50 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } bg-green-900 text-white `}
      >
        {/* Close/Open Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Sidebar"
          className="p-4 focus:outline-none self-end md:self-start"
        >
          {isOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
        </button>
        {/* Navigation Links */}
        <nav className="mt-4  flex-1 gap-2">
          <ul>
            {[
              {
                href: "/dashboard/",
                label: "Dashboard",
                icon: <Home size={20} />,
              },
              {
                href: "/form/niyaIftar/",
                label: "Iftar Sponsorship",
                icon: <User2Icon size={20} />,
              },
              {
                href: "/form/activities/",
                label: "Activities",
                icon: <Calendar size={20} />,
              },
              {
                href: "/form/event/",
                label: "Short Events",
                icon: <Calendar size={20} />,
              },
              // {
              //   href: "/form/programs/",
              //   label: "Programs",
              //   icon: <Calendar size={20} />,
              // },
              // {
              //   href: "/form/mosque/",
              //   label: "Mosque Program",
              //   icon: <FaMosque size={20} />,
              // },
              {
                href: "/form/members/",
                label: "Members",
                icon: <User size={20} />,
              },
              {
                href: "/form/slider/",
                label: "Sliders",
                icon: <Image size={20} />,
              },
              {
                href: "/form/events/",
                label: "Sliders",
                icon: <Image size={20} />,
              },
            ].map(({ href, label, icon }) => (
              <li
                key={href}
                className={`p-3 hover:bg-white hover:text-green-900 ${
                  pathname === href ? "bg-white text-green-900" : ""
                }`}
              >
                <Link href={href} className="flex items-center gap-3 h-full">
                  {icon} {isOpen && label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`ml-20 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        } flex-1`}
      ></div>
    </div>
  );
};

export default Sidebar;
