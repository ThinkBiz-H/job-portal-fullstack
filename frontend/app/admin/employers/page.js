// "use client";

// import { useState, useEffect } from "react";

// export default function AdminEmployers() {
//   const [employers, setEmployers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedEmployer, setSelectedEmployer] = useState(null);

//   useEffect(() => {
//     fetchEmployers();
//   }, []);

//   const fetchEmployers = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");

//       const res = await fetch("http://localhost:5000/api/admin/employers", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (data.success) {
//         setEmployers(data.data || []);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("Error:", error);
//       setLoading(false);
//     }
//   };

//   const verifyEmployer = async (id) => {
//     const token = localStorage.getItem("adminToken");

//     await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     fetchEmployers();
//   };

//   const rejectEmployer = async (id) => {
//     const token = localStorage.getItem("adminToken");

//     await fetch(`http://localhost:5000/api/admin/reject/${id}`, {
//       method: "PUT",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     fetchEmployers();
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Employers</h2>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl border mb-6 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Company</th>
//               <th className="p-3 text-left">Email</th>
//               <th className="p-3 text-left">GST</th>
//               <th className="p-3 text-left">CIN</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {(employers || []).map((emp) => {
//               const p = emp.employerProfile || {};

//               return (
//                 <tr key={emp._id} className="border-t">
//                   {/* ✅ CLICK HERE (NOT tr) */}
//                   <td
//                     className="p-3 cursor-pointer"
//                     onClick={() => {
//                       console.log("CLICKED:", emp);
//                       setSelectedEmployer(emp);
//                     }}
//                   >
//                     {p.companyName || "N/A"}
//                   </td>

//                   <td
//                     className="p-3 cursor-pointer"
//                     onClick={() => setSelectedEmployer(emp)}
//                   >
//                     {emp.email}
//                   </td>

//                   <td
//                     className="p-3 cursor-pointer"
//                     onClick={() => setSelectedEmployer(emp)}
//                   >
//                     {p.gstNumber || "-"}
//                   </td>

//                   <td
//                     className="p-3 cursor-pointer"
//                     onClick={() => setSelectedEmployer(emp)}
//                   >
//                     {p.cinNumber || "-"}
//                   </td>

//                   {/* BUTTONS (NO CLICK PROPAGATION ISSUE) */}
//                   <td className="p-3 flex gap-2">
//                     <button
//                       onClick={() => verifyEmployer(emp._id)}
//                       className="px-3 py-1 bg-green-600 text-white rounded"
//                     >
//                       Approve
//                     </button>

//                     <button
//                       onClick={() => rejectEmployer(emp._id)}
//                       className="px-3 py-1 bg-red-600 text-white rounded"
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ DETAILS PANEL */}
//       {selectedEmployer && (
//         <div className="fixed top-0 right-0 w-[400px] h-full bg-white shadow-xl border-l p-6 overflow-y-auto z-50">
//           <button
//             onClick={() => setSelectedEmployer(null)}
//             className="mb-4 px-3 py-1 bg-gray-200 rounded"
//           >
//             Close ❌
//           </button>

//           <h3 className="text-xl font-bold mb-4">Employer Details</h3>

//           <div className="space-y-2">
//             <p>
//               <b>Company:</b> {selectedEmployer.employerProfile?.companyName}
//             </p>
//             <p>
//               <b>Email:</b> {selectedEmployer.email}
//             </p>
//             <p>
//               <b>Phone:</b> {selectedEmployer.phone}
//             </p>
//             <p>
//               <b>GST:</b> {selectedEmployer.employerProfile?.gstNumber}
//             </p>
//             <p>
//               <b>CIN:</b> {selectedEmployer.employerProfile?.cinNumber}
//             </p>
//             <p>
//               <b>Industry:</b> {selectedEmployer.employerProfile?.industry}
//             </p>
//             <p>
//               <b>Type:</b> {selectedEmployer.employerProfile?.companyType}
//             </p>
//             <p>
//               <b>Size:</b> {selectedEmployer.employerProfile?.companySize}
//             </p>
//             <p>
//               <b>Team:</b> {selectedEmployer.employerProfile?.teamSize}
//             </p>
//             <p>
//               <b>Website:</b> {selectedEmployer.employerProfile?.website}
//             </p>
//             <p>
//               <b>Location:</b> {selectedEmployer.employerProfile?.headquarters}
//             </p>

//             <p>
//               <b>Description:</b>{" "}
//               {selectedEmployer.employerProfile?.description}
//             </p>

//             <p>
//               <b>Locations:</b>{" "}
//               {(selectedEmployer.employerProfile?.locations || []).join(", ")}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  BanknotesIcon,
  CalendarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function AdminEmployers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:5000/api/admin/employers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setEmployers(data.data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEmployers();
    setTimeout(() => setRefreshing(false), 500);
  };

  const verifyEmployer = async (id) => {
    const token = localStorage.getItem("adminToken");
    await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEmployers();
  };

  const rejectEmployer = async (id) => {
    const token = localStorage.getItem("adminToken");
    await fetch(`http://localhost:5000/api/admin/reject/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEmployers();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return {
          color: "bg-green-100 text-green-700",
          icon: CheckCircleIcon,
          text: "Verified",
          bg: "bg-green-50",
          border: "border-green-200",
        };
      case "pending":
        return {
          color: "bg-yellow-100 text-yellow-700",
          icon: ClockIcon,
          text: "Pending",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
        };
      case "rejected":
        return {
          color: "bg-red-100 text-red-700",
          icon: XCircleIcon,
          text: "Rejected",
          bg: "bg-red-50",
          border: "border-red-200",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700",
          icon: ClockIcon,
          text: "Unknown",
          bg: "bg-gray-50",
          border: "border-gray-200",
        };
    }
  };

  const filteredEmployers = (employers || []).filter((emp) => {
    const profile = emp.employerProfile || {};
    const name = profile.companyName || "";
    const email = emp.email || "";
    const status = profile.verificationStatus || "pending";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || filter === status;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: employers.length,
    approved: employers.filter(
      (e) => e.employerProfile?.verificationStatus === "approved",
    ).length,
    pending: employers.filter(
      (e) => e.employerProfile?.verificationStatus === "pending",
    ).length,
    rejected: employers.filter(
      (e) => e.employerProfile?.verificationStatus === "rejected",
    ).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading employers...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">
                Manage Employers
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                View and manage all registered companies
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Employers
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Verified</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {stats.approved}
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
                <p className="text-gray-500 text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {stats.rejected}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <XCircleIcon className="h-6 w-6 text-red-600" />
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
                placeholder="Search by company name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    GST Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    CIN Number
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
                {filteredEmployers.map((emp) => {
                  const profile = emp.employerProfile || {};
                  const status = profile.verificationStatus || "pending";
                  const statusInfo = getStatusBadge(status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr
                      key={emp._id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedEmployer(emp)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {profile.companyName?.charAt(0) || "C"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {profile.companyName || "N/A"}
                            </p>
                            {profile.industry && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {profile.industry}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {emp.email}
                          </span>
                        </div>
                        {emp.phone && (
                          <div className="flex items-center gap-2 mt-1">
                            <PhoneIcon className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {emp.phone}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-gray-600">
                          {profile.gstNumber || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-gray-600">
                          {profile.cinNumber || "-"}
                        </span>
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
                            onClick={() => verifyEmployer(emp._id)}
                            disabled={status === "approved"}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                              status === "approved"
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                            }`}
                          >
                            <CheckCircleIcon className="h-4 w-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => rejectEmployer(emp._id)}
                            disabled={status === "rejected"}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                              status === "rejected"
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-red-600 text-white hover:bg-red-700 shadow-sm"
                            }`}
                          >
                            <XCircleIcon className="h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredEmployers.length === 0 && (
            <div className="text-center py-12">
              <BuildingOfficeIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No employers found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Details Panel - Right Sidebar */}
      {selectedEmployer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Company Details
              </h3>
              <button
                onClick={() => setSelectedEmployer(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Company Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  {selectedEmployer.employerProfile?.companyName?.charAt(0) ||
                    "C"}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {selectedEmployer.employerProfile?.companyName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedEmployer.employerProfile?.verificationStatus && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          getStatusBadge(
                            selectedEmployer.employerProfile
                              ?.verificationStatus,
                          ).color
                        }`}
                      >
                        {
                          getStatusBadge(
                            selectedEmployer.employerProfile
                              ?.verificationStatus,
                          ).text
                        }
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Info Sections */}
              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Contact Information
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">
                          {selectedEmployer.email}
                        </p>
                      </div>
                    </div>
                    {selectedEmployer.phone && (
                      <div className="flex items-start gap-3">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-900">
                            {selectedEmployer.phone}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedEmployer.employerProfile?.website && (
                      <div className="flex items-start gap-3">
                        <GlobeAltIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Website</p>
                          <a
                            href={selectedEmployer.employerProfile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {selectedEmployer.employerProfile.website}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Business Details
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedEmployer.employerProfile?.gstNumber && (
                      <div>
                        <p className="text-xs text-gray-500">GST Number</p>
                        <p className="text-sm font-mono text-gray-900">
                          {selectedEmployer.employerProfile.gstNumber}
                        </p>
                      </div>
                    )}
                    {selectedEmployer.employerProfile?.cinNumber && (
                      <div>
                        <p className="text-xs text-gray-500">CIN Number</p>
                        <p className="text-sm font-mono text-gray-900">
                          {selectedEmployer.employerProfile.cinNumber}
                        </p>
                      </div>
                    )}
                    {selectedEmployer.employerProfile?.industry && (
                      <div>
                        <p className="text-xs text-gray-500">Industry</p>
                        <p className="text-sm text-gray-900">
                          {selectedEmployer.employerProfile.industry}
                        </p>
                      </div>
                    )}
                    {selectedEmployer.employerProfile?.companyType && (
                      <div>
                        <p className="text-xs text-gray-500">Company Type</p>
                        <p className="text-sm text-gray-900">
                          {selectedEmployer.employerProfile.companyType}
                        </p>
                      </div>
                    )}
                    {selectedEmployer.employerProfile?.companySize && (
                      <div>
                        <p className="text-xs text-gray-500">Company Size</p>
                        <p className="text-sm text-gray-900">
                          {selectedEmployer.employerProfile.companySize}
                        </p>
                      </div>
                    )}
                    {selectedEmployer.employerProfile?.teamSize && (
                      <div>
                        <p className="text-xs text-gray-500">Team Size</p>
                        <p className="text-sm text-gray-900">
                          {selectedEmployer.employerProfile.teamSize}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedEmployer.employerProfile?.headquarters && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Location
                    </h5>
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Headquarters</p>
                        <p className="text-sm text-gray-900">
                          {selectedEmployer.employerProfile.headquarters}
                        </p>
                      </div>
                    </div>
                    {selectedEmployer.employerProfile?.locations &&
                      selectedEmployer.employerProfile.locations.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-2">
                            Other Locations
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedEmployer.employerProfile.locations.map(
                              (loc, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600"
                                >
                                  {loc}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {selectedEmployer.employerProfile?.description && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      About Company
                    </h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedEmployer.employerProfile.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons in Sidebar */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    verifyEmployer(selectedEmployer._id);
                    setSelectedEmployer(null);
                  }}
                  disabled={
                    selectedEmployer.employerProfile?.verificationStatus ===
                    "approved"
                  }
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    selectedEmployer.employerProfile?.verificationStatus ===
                    "approved"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  Approve Company
                </button>
                <button
                  onClick={() => {
                    rejectEmployer(selectedEmployer._id);
                    setSelectedEmployer(null);
                  }}
                  disabled={
                    selectedEmployer.employerProfile?.verificationStatus ===
                    "rejected"
                  }
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    selectedEmployer.employerProfile?.verificationStatus ===
                    "rejected"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  <XCircleIcon className="h-5 w-5" />
                  Reject Company
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
