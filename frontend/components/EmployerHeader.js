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
                    ? "text-green-600 border-b-2 border-green-600 pb-1"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT USER INFO */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">{user?.email || user?.phone}</span>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
