// // # Employer layout.js
// // Set-Content -Path "app\employer\layout.js" -Value @'
// export default function EmployerLayout({ children }) {
//   return (
//     <div>

//       <div style={{ padding: "0px" }}>{children}</div>
//     </div>
//   );
// }
"use client";

import EmployerHeader from "@/components/EmployerHeader";
// Agar error aaye to path change kar dena:
// import EmployerHeader from "../../components/EmployerHeader";

export default function EmployerLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Employer Top Menu */}
      <EmployerHeader />

      {/* Page Content */}
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}
