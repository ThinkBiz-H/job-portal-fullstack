"use client";
import EmployerHeader from "@/components/EmployerHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Users,
  Clock,
  Edit2,
  Trash2,
  Eye,
  Plus,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  MoreVertical,
  Calendar,
  DollarSign,
  BarChart3,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  Download,
  Share2,
} from "lucide-react";

export default function MyJobsPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    closed: 0,
    totalApplicants: 0,
    avgApplicants: 0,
  });

  /* ================= FETCH MY JOBS ================= */
  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(res.data.data || []);
      setFilteredJobs(res.data.data || []);
      calculateStats(res.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error("My Jobs Error:", err.response?.data);
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  /* ================= CALCULATE STATISTICS ================= */
  const calculateStats = (jobsList) => {
    const total = jobsList.length;
    const active = jobsList.filter((job) => job.isActive).length;
    const closed = total - active;
    const totalApplicants = jobsList.reduce(
      (sum, job) => sum + (job.totalApplications || 0),
      0,
    );
    const avgApplicants = total > 0 ? (totalApplicants / total).toFixed(1) : 0;

    setStats({
      total,
      active,
      closed,
      totalApplicants,
      avgApplicants,
    });
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  /* ================= FILTER & SORT JOBS ================= */
  useEffect(() => {
    let result = [...jobs];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((job) =>
        statusFilter === "active" ? job.isActive : !job.isActive,
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "applicants_high":
        result.sort(
          (a, b) => (b.totalApplications || 0) - (a.totalApplications || 0),
        );
        break;
      case "applicants_low":
        result.sort(
          (a, b) => (a.totalApplications || 0) - (b.totalApplications || 0),
        );
        break;
      case "title":
        result.sort((a, b) => a.title?.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredJobs(result);
  }, [searchTerm, statusFilter, sortBy, jobs]);

  /* ================= DELETE JOB ================= */
  const deleteJob = async (id, title) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchMyJobs();
    } catch (err) {
      alert("Delete failed. Please try again.");
    }
  };

  /* ================= TOGGLE JOB STATUS ================= */
  const toggleJobStatus = async (id, currentStatus, title) => {
    const newStatus = !currentStatus;
    const action = newStatus ? "activate" : "close";

    if (!confirm(`Are you sure you want to ${action} "${title}"?`)) return;

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/jobs/${id}/status`,
        { isActive: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      fetchMyJobs();
    } catch (err) {
      alert("Failed to update job status.");
    }
  };

  /* ================= LOADING SKELETON ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 w-64 bg-gray-200 rounded"></div>
              </div>
              <div className="h-12 w-40 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                >
                  <div className="space-y-2">
                    <div className="h-5 w-48 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <EmployerHeader />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Briefcase className="w-6 h-6 text-orange-400" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  My Job Posts
                </h1>
              </div>
              <p className="text-gray-600">
                Manage and track all your posted job opportunities
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={fetchMyJobs}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-[#0F2A44] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={() => router.push("/employer/post-job")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F2A44] text-white font-medium rounded-lg hover:from-green-700  transition-all shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Post New Job
              </button>
            </div>
          </div>
          {/* STATISTICS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Total Jobs
                </span>
                <Briefcase className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
              <div className="text-xs text-gray-500 mt-1">All time posts</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Active
                </span>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {stats.active}
              </div>
              <div className="text-xs text-gray-500 mt-1">Currently hiring</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Closed
                </span>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {stats.closed}
              </div>
              <div className="text-xs text-gray-500 mt-1">No longer hiring</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Total Applicants
                </span>
                <Users className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalApplicants}
              </div>
              <div className="text-xs text-gray-500 mt-1">Across all jobs</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Avg. per Job
                </span>
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {stats.avgApplicants}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Average applicants
              </div>
            </div>
          </div>
          {/* FILTERS & SEARCH */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* SEARCH */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                  <input
                    type="text"
                    placeholder="Search jobs by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F2A44] focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* STATUS FILTER */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-black" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F2A44] focus:border-transparent outline-none transition bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="closed">Closed Only</option>
                </select>
              </div>

              {/* SORT */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F2A44] focus:border-transparent outline-none transition bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="applicants_high">Most Applicants</option>
                  <option value="applicants_low">Fewest Applicants</option>
                  <option value="title">Sort by Title</option>
                </select>
              </div>
            </div>
          </div>
          {/* NO JOBS */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || statusFilter !== "all"
                  ? "No jobs found"
                  : "No jobs posted yet"}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start posting jobs to find the perfect candidates for your team"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push("/employer/post-job")}
                  className="px-6 py-3 bg-[#0F2A44] text-white font-medium rounded-lg transition-all"
                >
                  Post Your First Job
                </button>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="px-6 py-3 bg-[#0F2A44] border border-gray-300 font-medium rounded-lg  transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              {/* TABLE HEADER */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900">
                      Posted Jobs ({filteredJobs.length})
                    </h3>
                    <p className="text-base text-gray-600">
                      Showing all your job posts
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* JOBS LIST */}
              <div className="divide-y divide-gray-100">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* JOB INFO */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <Briefcase className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold text-[#0F2A44]  transition-colors cursor-pointer">
                                {job.title}
                              </h3>
                              {job.isActive ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                  Closed
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-3">
                              <div className="flex items-center gap-2 text-base text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-base text-gray-600">
                                <DollarSign className="w-4 h-4" />
                                <span>
                                  {job.salary?.isDisclosed ? (
                                    <>
                                      ₹{job.salary.min} - ₹{job.salary.max}{" "}
                                      {job.salary.currency}
                                    </>
                                  ) : (
                                    "Salary not specified"
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-base text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Posted{" "}
                                  {new Date(job.createdAt).toLocaleDateString(
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
                        </div>
                      </div>

                      {/* APPLICANTS & ACTIONS */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* APPLICANTS COUNT */}
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                          <Users className="w-4 h-4 text-[#0F2A44]" />
                          <div className="text-right">
                            <div className="font-bold text-[#0F2A44]">
                              {job.totalApplications || 0}
                            </div>
                            <div className="text-xs text-[#0F2A44]">
                              Applicants
                            </div>
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              router.push(`/employer/jobs/${job._id}`)
                            }
                            className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              router.push(`/employer/jobs/${job._id}/edit`)
                            }
                            className="inline-flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                            title="Edit Job"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              toggleJobStatus(job._id, job.isActive, job.title)
                            }
                            className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                              job.isActive
                                ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                            title={job.isActive ? "Close Job" : "Activate Job"}
                          >
                            {job.isActive ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteJob(job._id, job.title)}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                            title="Delete Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* TABLE FOOTER */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-base text-gray-600">
                    Showing {filteredJobs.length} of {jobs.length} jobs
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => window.print()}
                      className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Export List
                    </button>
                    <button
                      onClick={() => router.push("/employer/dashboard")}
                      className="text-base font-medium text-orange-400 transition-colors inline-flex items-center gap-1"
                    >
                      View Dashboard
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*  */}
        </div>
      </div>
    </>
  );
}
