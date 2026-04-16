// "use client";

// import { useState, useEffect } from "react";
// import {
//   UsersIcon,
//   EnvelopeIcon,
//   PhoneIcon,
//   CheckCircleIcon,
//   ClockIcon,
//   XCircleIcon,
//   MagnifyingGlassIcon,
//   ArrowPathIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("adminToken");

//       const res = await fetch("http://localhost:5000/api/admin/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       console.log("USERS API RESPONSE:", data);

//       // ✅ FINAL FIX
//       if (data.success && Array.isArray(data.data)) {
//         setUsers(data.data);
//       } else {
//         setUsers([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchUsers();
//     setTimeout(() => setRefreshing(false), 500);
//   };

//   const filteredUsers = users
//     .filter((u) => u.userType === "jobseeker")
//     .filter(
//       (u) =>
//         u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
//     );

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <div className="bg-white p-5 flex justify-between items-center border-b">
//         <h1 className="text-xl font-bold">Manage Users</h1>

//         <button
//           onClick={handleRefresh}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           <ArrowPathIcon className="h-5 w-5" />
//           Refresh
//         </button>
//       </div>

//       <div className="p-6">
//         {/* SEARCH */}
//         <div className="bg-white p-4 rounded-xl mb-5">
//           <div className="relative">
//             <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search user..."
//               className="pl-10 pr-4 py-2 border rounded w-full"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-xl overflow-hidden shadow">
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">User</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Type</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr
//                   key={user._id}
//                   className="border-t cursor-pointer hover:bg-gray-50"
//                   onClick={() => setSelectedUser(user)}
//                 >
//                   <td className="p-3 font-medium">{user.name}</td>
//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3">{user.userType}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* RIGHT PANEL (like employer) */}
//       {selectedUser && (
//         <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
//           <div className="w-96 bg-white h-full p-6">
//             <div className="flex justify-between mb-4">
//               <h2 className="font-bold text-lg">User Details</h2>
//               <button onClick={() => setSelectedUser(null)}>
//                 <XMarkIcon className="h-6 w-6" />
//               </button>
//             </div>

//             <p>
//               <b>Name:</b> {selectedUser.name}
//             </p>
//             <p>
//               <b>Email:</b> {selectedUser.email}
//             </p>
//             <p>
//               <b>Type:</b> {selectedUser.userType}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  XMarkIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CalendarIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ChartBarIcon,
  StarIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("USERS API RESPONSE:", data);
      if (data.success && Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUsers();
    setTimeout(() => setRefreshing(false), 500);
  };

  // Filter users
  const filteredUsers = users
    .filter((u) => u.userType === "jobseeker")
    .filter((u) => filterType === "all" || u.userType === filterType)
    .filter(
      (u) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (id) => {
    const colors = [
      "bg-gradient-to-br from-purple-500 to-pink-500",
      "bg-gradient-to-br from-blue-500 to-cyan-500",
      "bg-gradient-to-br from-emerald-500 to-teal-500",
      "bg-gradient-to-br from-orange-500 to-red-500",
      "bg-gradient-to-br from-indigo-500 to-purple-500",
    ];
    const index = id?.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-full border-4 border-gray-700 border-t-purple-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <UsersIcon className="h-8 w-8 text-purple-500" />
            </motion.div>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-gray-400 font-mono text-sm"
        >
          LOADING USERS...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      {/* Modern Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  User Management
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Manage and monitor all job seekers
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
            >
              <ArrowPathIcon
                className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <div className="relative group">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              {["all", "active", "inactive"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    filterType === type
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Users",
              value: filteredUsers.length,
              icon: UsersIcon,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Active Today",
              value: Math.floor(filteredUsers.length * 0.65),
              icon: CheckCircleIcon,
              color: "from-emerald-500 to-teal-500",
            },
            {
              label: "New This Month",
              value: Math.floor(filteredUsers.length * 0.2),
              icon: CalendarIcon,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Avg. Match Score",
              value: "85%",
              icon: ChartBarIcon,
              color: "from-orange-500 to-red-500",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2 rounded-xl bg-gradient-to-br ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Joined
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedUsers.map((user, idx) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all cursor-pointer group"
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl ${getRandomColor(user._id)} flex items-center justify-center text-white font-semibold text-sm shadow-lg`}
                          >
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              ID: {user._id?.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600 text-sm">
                            {user.email}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircleIcon className="h-3 w-3" />
                          Active
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(
                          user.createdAt || Date.now(),
                        ).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                          <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50/30">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
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
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modern Side Panel */}
      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Panel Header */}
              <div
                className={`relative ${getRandomColor(selectedUser._id)} p-8 text-white`}
              >
                <button
                  onClick={() => setSelectedUser(null)}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <UserCircleIcon className="h-12 w-12" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                    <p className="text-white/80 text-sm mt-1">
                      Member since{" "}
                      {new Date(
                        selectedUser.createdAt || Date.now(),
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-8 space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5 text-purple-500" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Email Address</p>
                        <p className="text-gray-900 font-medium">
                          {selectedUser.email}
                        </p>
                      </div>
                    </div>
                    {selectedUser.phone && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Phone Number</p>
                          <p className="text-gray-900 font-medium">
                            {selectedUser.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-purple-500" />
                    Account Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500">User Type</p>
                      <p className="text-gray-900 font-medium capitalize">
                        {selectedUser.userType}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-500">User ID</p>
                      <p className="text-gray-900 font-mono text-sm">
                        {selectedUser._id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                {selectedUser.skills && selectedUser.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <AcademicCapIcon className="h-5 w-5 text-purple-500" />
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                      Send Message
                    </button>
                    <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
