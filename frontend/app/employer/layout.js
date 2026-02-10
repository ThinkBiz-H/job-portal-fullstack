"use client";

export default function EmployerLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Employer Top Menu */}

      {/* Page Content */}
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}
