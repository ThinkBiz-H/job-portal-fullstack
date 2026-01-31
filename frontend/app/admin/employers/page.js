"use client";

import { useState, useEffect } from "react";

export default function AdminEmployers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      // Dummy data - replace with actual API call
      const dummyEmployers = [
        {
          _id: "1",
          name: "Tech Innovations Inc.",
          email: "contact@techinnovations.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          industry: "Technology",
          jobsPosted: 12,
          memberSince: "2023-06-15",
          status: "verified",
          plan: "premium",
        },
        {
          _id: "2",
          name: "Creative Solutions Ltd.",
          email: "info@creativesolutions.com",
          phone: "+1 (555) 987-6543",
          location: "New York, NY",
          industry: "Marketing",
          jobsPosted: 8,
          memberSince: "2023-08-22",
          status: "pending",
          plan: "basic",
        },
        {
          _id: "3",
          name: "Global Finance Corp",
          email: "hr@globalfinance.com",
          phone: "+1 (555) 456-7890",
          location: "Chicago, IL",
          industry: "Finance",
          jobsPosted: 15,
          memberSince: "2023-03-10",
          status: "verified",
          plan: "enterprise",
        },
        {
          _id: "4",
          name: "HealthCare Plus",
          email: "careers@healthcareplus.com",
          phone: "+1 (555) 234-5678",
          location: "Boston, MA",
          industry: "Healthcare",
          jobsPosted: 6,
          memberSince: "2024-01-05",
          status: "suspended",
          plan: "basic",
        },
        {
          _id: "5",
          name: "EcoTech Solutions",
          email: "hello@ecotech.com",
          phone: "+1 (555) 876-5432",
          location: "Seattle, WA",
          industry: "Green Technology",
          jobsPosted: 3,
          memberSince: "2024-02-18",
          status: "verified",
          plan: "premium",
        },
      ];

      setEmployers(dummyEmployers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employers:", error);
      setLoading(false);
    }
  };

  const verifyEmployer = async (employerId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`/api/admin/employers/${employerId}/verify`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state
      setEmployers(
        employers.map((emp) =>
          emp._id === employerId ? { ...emp, status: "verified" } : emp,
        ),
      );
    } catch (error) {
      console.error("Error verifying employer:", error);
    }
  };

  const suspendEmployer = async (employerId) => {
    if (!confirm("Are you sure you want to suspend this employer?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`/api/admin/employers/${employerId}/suspend`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployers(
        employers.map((emp) =>
          emp._id === employerId ? { ...emp, status: "suspended" } : emp,
        ),
      );
    } catch (error) {
      console.error("Error suspending employer:", error);
    }
  };

  const deleteEmployer = async (employerId) => {
    if (
      !confirm(
        "Are you sure you want to delete this employer? All their jobs will also be deleted.",
      )
    )
      return;

    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`/api/admin/employers/${employerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployers(employers.filter((emp) => emp._id !== employerId));
    } catch (error) {
      console.error("Error deleting employer:", error);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPlanBadgeColor = (plan) => {
    switch (plan) {
      case "enterprise":
        return "bg-purple-100 text-purple-800";
      case "premium":
        return "bg-blue-100 text-blue-800";
      case "basic":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEmployers = employers.filter((employer) => {
    const matchesSearch =
      employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "verified" && employer.status === "verified") ||
      (filter === "pending" && employer.status === "pending") ||
      (filter === "suspended" && employer.status === "suspended");

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading employers...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Employers</h2>
          <p className="text-gray-600">
            Total {employers.length} employers registered
          </p>
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={fetchEmployers}
        >
          Refresh
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search employers by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-3 text-gray-400">🔍</div>
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employers Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jobs Posted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployers.map((employer) => (
                <tr key={employer._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {employer.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {employer.name}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {employer.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{employer.email}</div>
                    <div className="text-gray-500 text-sm">
                      {employer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {employer.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
                        {employer.jobsPosted} jobs
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(employer.status)}`}
                    >
                      {employer.status.charAt(0).toUpperCase() +
                        employer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanBadgeColor(employer.plan)}`}
                    >
                      {employer.plan.charAt(0).toUpperCase() +
                        employer.plan.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {employer.status === "pending" && (
                        <button
                          onClick={() => verifyEmployer(employer._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Verify
                        </button>
                      )}
                      {employer.status === "verified" && (
                        <button
                          onClick={() => suspendEmployer(employer._id)}
                          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                          Suspend
                        </button>
                      )}
                      {employer.status === "suspended" && (
                        <button
                          onClick={() => verifyEmployer(employer._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => deleteEmployer(employer._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredEmployers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏢</div>
            <p className="text-gray-600">No employers found</p>
            <p className="text-gray-500 text-sm mt-2">
              Try changing your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <h3 className="font-bold text-lg mb-2">Verified</h3>
          <p className="text-3xl font-bold">
            {employers.filter((e) => e.status === "verified").length}
          </p>
          <p className="text-green-100 text-sm mt-2">Verified employers</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-xl text-white">
          <h3 className="font-bold text-lg mb-2">Pending</h3>
          <p className="text-3xl font-bold">
            {employers.filter((e) => e.status === "pending").length}
          </p>
          <p className="text-yellow-100 text-sm mt-2">Awaiting verification</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <h3 className="font-bold text-lg mb-2">Total Jobs</h3>
          <p className="text-3xl font-bold">
            {employers.reduce((sum, emp) => sum + emp.jobsPosted, 0)}
          </p>
          <p className="text-blue-100 text-sm mt-2">Jobs posted</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <h3 className="font-bold text-lg mb-2">Premium</h3>
          <p className="text-3xl font-bold">
            {
              employers.filter(
                (e) => e.plan === "premium" || e.plan === "enterprise",
              ).length
            }
          </p>
          <p className="text-purple-100 text-sm mt-2">Premium plans</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => {
              const pendingEmps = employers.filter(
                (e) => e.status === "pending",
              );
              if (
                pendingEmps.length > 0 &&
                confirm(`Verify all ${pendingEmps.length} pending employers?`)
              ) {
                pendingEmps.forEach((emp) => verifyEmployer(emp._id));
              }
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Verify All Pending
          </button>
          <button
            onClick={() => {
              if (confirm("Send welcome email to all verified employers?")) {
                // Implement email sending logic
                alert("Welcome emails sent to verified employers!");
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Welcome Emails
          </button>
          <button
            onClick={() => {
              if (confirm("Export employers list to CSV?")) {
                // Implement export logic
                alert("Exporting employers data...");
              }
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}
