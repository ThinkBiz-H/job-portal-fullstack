"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("USERS API RESPONSE:", data);

      // ✅ FIX (MOST IMPORTANT)
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]); // fallback
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Type</th>
          </tr>
        </thead>

        <tbody>
          {(users || []).map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found</p>
      )}
    </div>
  );
}
