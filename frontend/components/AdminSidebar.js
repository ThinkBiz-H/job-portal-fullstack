"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Jobs", href: "/admin/jobs", icon: BriefcaseIcon },
  { name: "Employers", href: "/admin/employers", icon: BuildingOfficeIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="p-4">
        <h2 className="text-2xl font-bold">JobPortal Admin</h2>
        <p className="text-gray-400 text-sm">Super Admin Panel</p>
      </div>

      <nav className="mt-8">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 mb-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
}
