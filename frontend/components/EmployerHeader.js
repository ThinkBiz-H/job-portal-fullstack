"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EmployerHeader() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/employer/dashboard" },
    { name: "Post Job", path: "/employer/post-job" },
    { name: "My Jobs", path: "/employer/my-jobs" },
    { name: "Applicants", path: "/employer/applicants" },
    { name: "Profile", path: "/employer/profile" },
  ];

  return (
    <nav className="bg-white px-6 py-4 border-b border-gray-200 text-black text-lg shadow-sm">
      <div className="max-w-7xl mx-auto flex gap-6 items-center">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`font-medium transition ${
                isActive
                  ? "text-green-600 border-b-2 border-green-600 pb-1"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
