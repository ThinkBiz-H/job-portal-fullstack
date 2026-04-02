// "use client";

// import { useState, useEffect } from "react";
// import {
//   BriefcaseIcon,
//   MapPinIcon,
//   BuildingOfficeIcon,
//   UsersIcon,
//   ClockIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   EyeIcon,
//   TrashIcon,
//   MagnifyingGlassIcon,
//   ArrowPathIcon,
//   CurrencyDollarIcon,
// } from "@heroicons/react/24/outline";

// export default function AdminJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   // ✅ FIX: salary formatter
//   const formatSalary = (salary) => {
//     if (!salary) return "-";
//     if (typeof salary === "string") return salary;
//     if (typeof salary === "object") {
//       return `${salary.min || 0} - ${salary.max || 0} ${salary.currency || ""}`;
//     }
//     return "-";
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     setLoading(true);
//     try {
//       const token =
//         localStorage.getItem("adminToken") || localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/jobs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();

//       if (Array.isArray(data)) setJobs(data);
//       else if (Array.isArray(data.data)) setJobs(data.data);
//       else setJobs([]);
//     } catch (err) {
//       console.error(err);
//       setJobs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteJob = async (id) => {
//     if (!confirm("Delete this job?")) return;

//     const token =
//       localStorage.getItem("adminToken") || localStorage.getItem("token");

//     await fetch(`http://localhost:5000/api/jobs/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     fetchJobs();
//     if (selectedJob?._id === id) setSelectedJob(null);
//   };

//   const filteredJobs = jobs.filter((job) => {
//     const matchSearch =
//       job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (job.company || job.employer?.companyName || "")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());

//     const matchFilter = filterStatus === "all" || job.status === filterStatus;

//     return matchSearch && matchFilter;
//   });

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>

//       <input
//         type="text"
//         placeholder="Search..."
//         className="border p-2 mb-4 w-full"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3">Title</th>
//             <th className="p-3">Company</th>
//             <th className="p-3">Salary</th>
//             <th className="p-3">Applicants</th>
//             <th className="p-3">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {filteredJobs.map((job) => (
//             <tr
//               key={job._id}
//               className="border-t cursor-pointer"
//               onClick={() => setSelectedJob(job)}
//             >
//               <td className="p-3">{job.title}</td>
//               <td className="p-3">
//                 {job.company || job.employer?.companyName}
//               </td>

//               {/* ✅ FIX */}
//               <td className="p-3">{formatSalary(job.salary)}</td>

//               <td className="p-3">{job.applicants?.length || 0}</td>

//               <td className="p-3">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteJob(job._id);
//                   }}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ✅ MODAL FIX */}
//       {selectedJob && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded w-[400px]">
//             <h2 className="text-xl font-bold mb-3">{selectedJob.title}</h2>

//             <p>
//               <b>Company:</b>{" "}
//               {selectedJob.company || selectedJob.employer?.companyName}
//             </p>

//             {/* ✅ FIX */}
//             <p>
//               <b>Salary:</b> {formatSalary(selectedJob.salary)}
//             </p>

//             <p>
//               <b>Applicants:</b> {selectedJob.applicants?.length || 0}
//             </p>

//             <button
//               onClick={() => setSelectedJob(null)}
//               className="mt-4 bg-gray-300 px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // ✅ FIX: salary formatter (KEPT EXACTLY AS IS)
  const formatSalary = (salary) => {
    if (!salary) return "-";
    if (typeof salary === "string") return salary;
    if (typeof salary === "object") {
      return `${salary.min || 0} - ${salary.max || 0} ${salary.currency || ""}`;
    }
    return "-";
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token =
        localStorage.getItem("adminToken") || localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (Array.isArray(data)) setJobs(data);
      else if (Array.isArray(data.data)) setJobs(data.data);
      else setJobs([]);
    } catch (err) {
      console.error(err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setTimeout(() => setRefreshing(false), 500);
  };

  const deleteJob = async (id) => {
    if (!confirm("Delete this job?")) return;

    const token =
      localStorage.getItem("adminToken") || localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchJobs();
    if (selectedJob?._id === id) setSelectedJob(null);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.company || job.employer?.companyName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchFilter = filterStatus === "all" || job.status === filterStatus;

    return matchSearch && matchFilter;
  });

  // const getStatusBadge = (status) => {
  //   switch (status?.toLowerCase()) {
  //     case "active":
  //       return {
  //         color: "bg-green-100 text-green-700",
  //         icon: CheckCircleIcon,
  //         text: "Active",
  //       };
  //     case "pending":
  //       return {
  //         color: "bg-yellow-100 text-yellow-700",
  //         icon: ClockIcon,
  //         text: "Pending",
  //       };
  //     case "expired":
  //       return {
  //         color: "bg-red-100 text-red-700",
  //         icon: XCircleIcon,
  //         text: "Expired",
  //       };
  //     default:
  //       return {
  //         color: "bg-gray-100 text-gray-700",
  //         icon: ClockIcon,
  //         text: status || "Unknown",
  //       };
  //   }
  // };

  const getStatusBadge = (status) => {
    const s = (status || "active").toLowerCase(); // 🔥 default active

    switch (s) {
      case "active":
        return {
          color: "bg-green-100 text-green-700",
          icon: CheckCircleIcon,
          text: "Active",
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-700",
          icon: ClockIcon,
          text: "Pending",
        };
      case "expired":
        return {
          color: "bg-red-100 text-red-700",
          icon: XCircleIcon,
          text: "Expired",
        };
      default:
        return {
          color: "bg-green-100 text-green-700", // 🔥 force active
          icon: CheckCircleIcon,
          text: "Active",
        };
    }
  };
  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => (j.status || "active") === "active").length,
    pending: jobs.filter((j) => j.status === "pending").length,
    expired: jobs.filter((j) => j.status === "expired").length,
    totalApplicants: jobs.reduce(
      (sum, j) => sum + (j.applicants?.length || 0),
      0,
    ),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
              <p className="text-sm text-gray-500 mt-1">
                View and manage all job listings on the platform
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
              <ArrowPathIcon
                className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <BriefcaseIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Jobs</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {stats.active}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  {stats.pending}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Expired</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {stats.expired}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Applicants
                </p>
                <p className="text-2xl font-bold text-purple-600 mt-1">
                  {stats.totalApplicants}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <UsersIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Job Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applicants
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.map((job) => {
                  const statusInfo = getStatusBadge(job.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr
                      key={job._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {job.title?.charAt(0) || "J"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {job.title}
                            </p>
                            {job.location && (
                              <div className="flex items-center gap-1 mt-1">
                                <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {job.location}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {job.company || job.employer?.companyName || "-"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {formatSalary(job.salary)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-900">
                            {job.applicants?.length || 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="flex gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteJob(job._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Job"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <BriefcaseIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No jobs found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search or filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Job Details</h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Job Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {selectedJob.title?.charAt(0) || "J"}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">
                    {selectedJob.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {selectedJob.company ||
                        selectedJob.employer?.companyName ||
                        "-"}
                    </span>
                  </div>
                  {selectedJob.location && (
                    <div className="flex items-center gap-1 mt-1">
                      <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {selectedJob.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Salary</p>
                    <div className="flex items-center gap-1">
                      <CurrencyDollarIcon className="h-4 w-4 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-900">
                        {formatSalary(selectedJob.salary)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Applicants</p>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="h-4 w-4 text-gray-400" />
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedJob.applicants?.length || 0}
                      </p>
                    </div>
                  </div>
                  {selectedJob.status && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedJob.status).color}`}
                      >
                        {getStatusBadge(selectedJob.status).text}
                      </span>
                    </div>
                  )}
                  {selectedJob.type && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Job Type</p>
                      <p className="text-sm text-gray-700">
                        {selectedJob.type}
                      </p>
                    </div>
                  )}
                </div>

                {selectedJob.description && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Description
                    </h5>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {selectedJob.description}
                    </p>
                  </div>
                )}

                {selectedJob.requirements &&
                  selectedJob.requirements.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Requirements
                      </h5>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} className="text-gray-700 text-sm">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    deleteJob(selectedJob._id);
                    setSelectedJob(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <TrashIcon className="h-5 w-5" />
                  Delete Job
                </button>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
