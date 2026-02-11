"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function EmployerHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;

  const menu = [
    { name: "Dashboard", path: "/employer/dashboard" },
    { name: "Post Job", path: "/employer/post-job" },
    { name: "My Jobs", path: "/employer/my-jobs" },
    { name: "Applicants", path: "/employer/applicants" },
    { name: "Profile", path: "/employer/profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <nav className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT MENU */}
        <div className="flex gap-6 items-center">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`font-medium transition ${
                  isActive
                    ? "text-[#0F2A44] text-base font-semibold border-b-2 border-orange-500 pb-1"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
