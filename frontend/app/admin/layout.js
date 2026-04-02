// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Sidebar from "@/components/AdminSidebar";

// export default function AdminLayout({ children }) {
//   const router = useRouter();
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is admin
//     const checkAdmin = async () => {
//       const token = localStorage.getItem("adminToken");
//       const userRole = localStorage.getItem("userRole");

//       if (!token || userRole !== "admin") {
//         router.push("/login");
//       } else {
//         setIsAdmin(true);
//       }
//       setLoading(false);
//     };

//     checkAdmin();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl">Loading Admin Panel...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
//           <p className="text-gray-600">Welcome to the admin panel</p>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Employers", path: "/admin/employers" },
    { name: "Jobs", path: "/admin/jobs" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`block px-4 py-2 rounded-lg transition ${
                  pathname === item.path ? "bg-blue-600" : "hover:bg-gray-800"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
