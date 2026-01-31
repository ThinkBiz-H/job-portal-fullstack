"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building,
  Briefcase,
  Users,
  User,
  LogOut,
  PlusCircle,
} from "lucide-react";

export default function EmployerNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Dashboard",
      href: "/employer/dashboard",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Post Job",
      href: "/employer/post-job",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "My Jobs",
      href: "/employer/my-jobs",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Applicants",
      href: "/employer/applicants",
      icon: <Users size={20} />,
    },
    { name: "Profile", href: "/employer/profile", icon: <User size={20} /> },
  ];

  const handleLogout = () => {
    alert("Logged out successfully!");
    router.push("/employer/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/employer/dashboard" className="flex items-center gap-2">
            <Building className="text-green-600" size={24} />
            <span className="font-bold text-xl">Employer Portal</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  pathname === item.href
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
