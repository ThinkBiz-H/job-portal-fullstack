"use client";

import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  UsersIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalEmployers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Fetch admin stats
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: UsersIcon,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: BriefcaseIcon,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      title: "Total Employers",
      value: stats.totalEmployers,
      icon: UsersIcon,
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue}`,
      icon: CurrencyDollarIcon,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-8 w-8 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">New user registered</p>
              <p className="text-gray-500 text-sm">2 minutes ago</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              User
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">New job posted</p>
              <p className="text-gray-500 text-sm">15 minutes ago</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Job
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
