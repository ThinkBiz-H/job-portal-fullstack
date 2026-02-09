"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Mail,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Briefcase,
  MapPin,
  Filter,
  User,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function ApplicantsPage() {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedJob, setSelectedJob] = useState("all");
  const [jobsList, setJobsList] = useState([]);
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/applications/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchApplicants();
    } catch (err) {
      console.log("Status Update Error:", err);
      alert("Failed to update status");
    }
  };

  const perPage = 8;

  /* ================= FETCH APPLICANTS ================= */
  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await axios.get(
        "http://localhost:5000/api/applications/my-applicants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      /* ================= CONVERT BACKEND DATA ================= */
      // const formatted = res.data.data.map((app) => ({
      //   id: app._id,
      //   name: app.applicant?.name || "N/A",
      //   email: app.applicant?.email || "N/A",
      //   appliedFor: app.job?.title || "N/A",
      //   status: app.status || "pending",
      //   appliedDate: app.appliedAt,
      //   experience: "N/A",
      //   location: "India",
      //   skills:
      //     app.applicant?.jobseekerProfile?.skills?.map((s) => s.name) || [],

      //   phone: app.applicant?.phone || "N/A",

      //   rating: 0,
      //   resumeUrl: app.resume?.url || "#",
      // }));
      const formatted = res.data.data.map((app) => ({
        id: app._id,

        // 👇 Job info (IMPORTANT)
        jobId: app.job?._id,
        jobTitle: app.job?.title || "N/A",

        name: app.applicant?.name || "N/A",
        email: app.applicant?.email || "N/A",

        appliedFor: app.job?.title || "N/A",
        status: app.status || "pending",
        appliedDate: app.appliedAt,

        experience: "N/A",
        location: "India",

        skills:
          app.applicant?.jobseekerProfile?.skills?.map((s) => s.name) || [],

        phone: app.applicant?.phone || "N/A",

        rating: 0,
        resumeUrl: app.resume?.url || "#",
      }));
      // Unique Jobs for Dropdown
      const uniqueJobs = [
        ...new Map(
          formatted.map((item) => [
            item.jobId,
            { id: item.jobId, title: item.jobTitle },
          ]),
        ).values(),
      ];

      setJobsList(uniqueJobs);
      setApplicants(formatted);
      setFilteredApplicants(formatted);
      setLoading(false);
    } catch (err) {
      console.log("Applicants Error:", err);

      alert("Session expired");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  /* ================= FILTER AND SORT ================= */
  // useEffect(() => {
  //   let filtered = [...applicants];

  //   // Search filter
  //   if (searchQuery) {
  //     filtered = filtered.filter(
  //       (a) =>
  //         a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         a.appliedFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         a.email.toLowerCase().includes(searchQuery.toLowerCase()),
  //     );
  //   }

  //   // Status filter
  //   if (statusFilter !== "all") {
  //     filtered = filtered.filter((a) => a.status === statusFilter);
  //   }

  //   // Sort
  //   if (sortBy === "newest") {
  //     filtered.sort(
  //       (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
  //     );
  //   } else if (sortBy === "oldest") {
  //     filtered.sort(
  //       (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate),
  //     );
  //   } else if (sortBy === "name") {
  //     filtered.sort((a, b) => a.name.localeCompare(b.name));
  //   }

  //   setFilteredApplicants(filtered);
  //   setCurrentPage(1);
  // }, [searchQuery, applicants, statusFilter, sortBy]);
  useEffect(() => {
    let filtered = [...applicants];

    // 🔍 Search
    if (searchQuery) {
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.appliedFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.email.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // 📌 Job Filter
    if (selectedJob !== "all") {
      filtered = filtered.filter((a) => a.jobId === selectedJob);
    }

    // 📊 Status Filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    // 🔃 Sort
    if (sortBy === "newest") {
      filtered.sort(
        (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
      );
    } else if (sortBy === "oldest") {
      filtered.sort(
        (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate),
      );
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredApplicants(filtered);
    setCurrentPage(1);
  }, [searchQuery, applicants, statusFilter, sortBy, selectedJob]);

  /* ================= PAGINATION ================= */
  const last = currentPage * perPage;
  const first = last - perPage;
  const current = filteredApplicants.slice(first, last);

  const totalPages = Math.ceil(filteredApplicants.length / perPage);

  /* ================= STATUS BADGE STYLING ================= */
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: <Clock size={12} />,
      },
      reviewed: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: <Eye size={12} />,
      },
      shortlisted: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: <Users size={12} />,
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: <XCircle size={12} />,
      },
      accepted: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: <CheckCircle size={12} />,
      },
    };

    const style = statusStyles[status] || statusStyles.pending;

    return (
      <div
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${style.bg} ${style.border} ${style.text} capitalize text-xs font-medium`}
      >
        {style.icon}
        {status}
      </div>
    );
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading applicants...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Users className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Applicants
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage all job applications in one place
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchApplicants}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={18} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                <Download size={18} />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filteredApplicants.length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {applicants.filter((a) => a.status === "pending").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Reviewed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {applicants.filter((a) => a.status === "reviewed").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Shortlisted</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {applicants.filter((a) => a.status === "shortlisted").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <p className="text-sm text-gray-500">Accepted</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {applicants.filter((a) => a.status === "accepted").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* FILTER BAR */}
        <div className="bg-white rounded-xl border shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* SEARCH */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  placeholder="Search by name, email, or job title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3">
              {/* JOB FILTER */}
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <select
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                >
                  <option value="all">All Jobs</option>

                  {jobsList.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>

              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* APPLICANTS GRID/CARDS */}
        {current.length === 0 ? (
          <div className="bg-white rounded-xl border shadow-sm p-12 text-center">
            <Users className="mx-auto text-gray-300" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mt-4">
              No applicants found
            </h3>
            <p className="text-gray-500 mt-2">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No applications have been submitted yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {current.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  {/* HEADER */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="text-emerald-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{app.name}</h3>
                        <p className="text-sm text-gray-500">{app.email}</p>
                        <p className="text-sm text-gray-500">📞 {app.phone}</p>
                      </div>
                    </div>
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="text-xs border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="accepted">Accepted</option>
                    </select>
                  </div>

                  {/* JOB INFO */}
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Briefcase size={16} />
                      <span className="font-medium">Applied for:</span>
                      <span className="ml-1">{app.appliedFor}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin size={16} />
                      <span>{app.location}</span>
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {app.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* DATE & ACTIONS */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Applied on{" "}
                      {new Date(app.appliedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/employer/applicants/${app.id}`}>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                          <Eye size={16} />
                          View Details
                        </button>
                      </Link>
                      <a
                        href={`mailto:${app.email}`}
                        className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        title="Send Email"
                      >
                        <Mail size={16} />
                      </a>
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border rounded-lg hover:bg-gray-50 transition-colors"
                        title="View Resume"
                      >
                        <FileText size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Showing {first + 1} to {Math.min(last, filteredApplicants.length)}{" "}
              of {filteredApplicants.length} applicants
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={18} />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === pageNum
                          ? "bg-emerald-600 text-white"
                          : "border hover:bg-gray-50"
                      } transition-colors`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
