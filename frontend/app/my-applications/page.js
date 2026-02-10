"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Building,
  MapPin,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  AlertCircle,
  ArrowLeft,
  Briefcase,
  DollarSign,
  ExternalLink,
} from "lucide-react";

export default function MyApplicationsPage() {
  const router = useRouter();
  // const API = "http://localhost:5000/api";
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  /* ================= FETCH MY APPLICATIONS ================= */
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await axios.get(`${API}/applications/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setApplications(res.data.data || []);
      setFilteredApplications(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Load Applications Error:", err);
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* ================= FILTER & SORT APPLICATIONS ================= */
  useEffect(() => {
    let result = [...applications];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (app) =>
          app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.job?.company?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.appliedAt) - new Date(b.appliedAt));
        break;
      case "title":
        result.sort((a, b) => a.job?.title?.localeCompare(b.job?.title));
        break;
      default:
        break;
    }

    setFilteredApplications(result);
  }, [searchTerm, statusFilter, sortBy, applications]);

  /* ================= STATUS CONFIG ================= */
  const statusConfig = {
    pending: {
      label: "Under Review",
      icon: Clock,
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      iconColor: "text-yellow-500",
      dotColor: "bg-yellow-500",
    },
    shortlisted: {
      label: "Shortlisted",
      icon: FileText,
      color: "bg-purple-50 border-purple-200 text-purple-700",
      iconColor: "text-purple-500",
      dotColor: "bg-purple-500",
    },
    accepted: {
      label: "Accepted",
      icon: CheckCircle,
      color: "bg-green-50 border-green-200 text-green-700",
      iconColor: "text-green-500",
      dotColor: "bg-green-500",
    },
    rejected: {
      label: "Not Selected",
      icon: XCircle,
      color: "bg-red-50 border-red-200 text-red-700",
      iconColor: "text-red-500",
      dotColor: "bg-red-500",
    },
  };

  /* ================= LOADING SKELETON ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="h-6 w-64 bg-gray-200 rounded"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Applications
                </h1>
                <p className="text-gray-600 mt-1">
                  Track all your job applications in one place
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {filteredApplications.length} application
              {filteredApplications.length !== 1 ? "s" : ""}
            </span>
            <div className="h-4 w-px bg-gray-300"></div>
            <button
              onClick={fetchApplications}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* FILTERS & SEARCH BAR */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* SEARCH */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* STATUS FILTER */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="all">All Status</option>
                {Object.keys(statusConfig).map((status) => (
                  <option key={status} value={status}>
                    {statusConfig[status].label}
                  </option>
                ))}
              </select>
            </div>

            {/* SORT */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* NO APPLICATIONS */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No applications found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters to see more results"
                : "Start applying to jobs and track your progress here"}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => router.push("/jobs")}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Jobs
              </button>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="px-6 py-3 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* MAIN CONTENT */}
            <div className="lg:col-span-2 space-y-4">
              {filteredApplications.map((app) => {
                const StatusIcon = statusConfig[app.status]?.icon || Clock;
                const config = statusConfig[app.status] || statusConfig.pending;

                return (
                  <div
                    key={app._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Building className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {app.job?.title || "Untitled Position"}
                              </h3>
                              <p className="text-gray-700 font-medium">
                                {app.job?.company || "Company not specified"}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{app.job?.location || "Remote"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DollarSign className="w-4 h-4" />
                              <span>
                                {app.job?.salary?.isDisclosed ? (
                                  <>
                                    ₹{app.job.salary.min} - ₹
                                    {app.job.salary.max}{" "}
                                    {app.job.salary.currency}
                                  </>
                                ) : (
                                  "Salary not specified"
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Applied{" "}
                                {new Date(app.appliedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.color}`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${config.dotColor}`}
                            ></div>
                            <StatusIcon
                              className={`w-4 h-4 ${config.iconColor}`}
                            />
                            <span className="text-sm font-medium">
                              {config.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Last updated:{" "}
                            {new Date(
                              app.updatedAt || app.appliedAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Application ID:{" "}
                          <span className="font-mono">
                            {app._id?.substring(0, 8)}...
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => router.push(`/jobs/${app.job?._id}`)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            View Job Details
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STATISTICS SIDEBAR */}
            <div className="space-y-6">
              {/* STATS CARD */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Application Stats
                </h3>
                <div className="space-y-4">
                  {Object.entries(statusConfig).map(([status, config]) => {
                    const count = applications.filter(
                      (app) => app.status === status,
                    ).length;
                    const percentage =
                      applications.length > 0
                        ? Math.round((count / applications.length) * 100)
                        : 0;

                    return (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${config.dotColor}`}
                          ></div>
                          <span className="text-sm font-medium text-gray-700">
                            {config.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {count}
                          </div>
                          <div className="text-xs text-gray-500">
                            {percentage}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Total Applications
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {applications.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* TIPS CARD */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">
                    Application Tips
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="text-sm text-gray-600 flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Follow up after 7-10 days if status is "Under Review"
                  </li>
                  <li className="text-sm text-gray-600 flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Keep your resume and portfolio updated
                  </li>
                  <li className="text-sm text-gray-600 flex gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    Prepare for interviews even before shortlisting
                  </li>
                </ul>
              </div>

              {/* QUICK ACTIONS */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push("/jobs")}
                    className="w-full px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors text-left"
                  >
                    Browse New Jobs
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full px-4 py-3 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    Export Applications
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER NOTE */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team or visit our help center
          </p>
        </div>
      </div>
    </div>
  );
}
