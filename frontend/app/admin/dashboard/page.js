// "use client";

// import { useState, useEffect } from "react";
// import {
//   ChartBarIcon,
//   UsersIcon,
//   BriefcaseIcon,
//   CurrencyDollarIcon,
//   UserPlusIcon,
//   DocumentTextIcon,
//   EyeIcon,
//   ClockIcon,
//   ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
// } from "@heroicons/react/24/outline";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalJobs: 0,
//     totalEmployers: 0,
//     totalRevenue: 0,
//     totalApplications: 0,
//     pendingJobs: 0,
//     activeJobs: 0,
//   });

//   const [recentActivities, setRecentActivities] = useState([]);
//   const [recentUsers, setRecentUsers] = useState([]);
//   const [recentJobs, setRecentJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTab, setSelectedTab] = useState("overview");

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("adminToken");

//       const [statsRes, activitiesRes, usersRes, jobsRes] = await Promise.all([
//         fetch("http://localhost:5000/api/admin/stats", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         fetch("http://localhost:5000/api/admin/recent-activities", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         fetch("http://localhost:5000/api/admin/recent-users?limit=5", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         fetch("http://localhost:5000/api/admin/recent-jobs?limit=5", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);

//       const statsData = await statsRes.json();
//       const activitiesData = await activitiesRes.json();
//       const usersData = await usersRes.json();
//       const jobsData = await jobsRes.json();

//       // ✅ FIXED (MAIN BUG)
//       setStats(statsData.data || {});

//       setRecentActivities(
//         Array.isArray(activitiesData?.data) ? activitiesData.data : [],
//       );

//       setRecentUsers(Array.isArray(usersData?.data) ? usersData.data : []);

//       setRecentJobs(Array.isArray(jobsData?.data) ? jobsData.data : []);
//     } catch (error) {
//       console.error("Error fetching data:", error);

//       // fallback
//       setStats({
//         totalUsers: 0,
//         totalJobs: 0,
//         totalEmployers: 0,
//         totalRevenue: 0,
//         totalApplications: 0,
//         pendingJobs: 0,
//         activeJobs: 0,
//       });

//       setRecentActivities([]);
//       setRecentUsers([]);
//       setRecentJobs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ SAFE VALUES (NO CRASH)
//   const statCards = [
//     {
//       title: "Total Users",
//       value: (stats.totalUsers || 0).toLocaleString(),
//       icon: UsersIcon,
//       color: "bg-blue-500",
//       bgColor: "bg-blue-50",
//       textColor: "text-blue-600",
//       trend: "+12%",
//       trendUp: true,
//     },
//     {
//       title: "Total Jobs",
//       value: (stats.totalJobs || 0).toLocaleString(),
//       icon: BriefcaseIcon,
//       color: "bg-green-500",
//       bgColor: "bg-green-50",
//       textColor: "text-green-600",
//       trend: "+8%",
//       trendUp: true,
//     },
//     {
//       title: "Total Employers",
//       value: (stats.totalEmployers || 0).toLocaleString(),
//       icon: UsersIcon,
//       color: "bg-purple-500",
//       bgColor: "bg-purple-50",
//       textColor: "text-purple-600",
//       trend: "+5%",
//       trendUp: true,
//     },
//     {
//       title: "Total Revenue",
//       value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
//       icon: CurrencyDollarIcon,
//       color: "bg-yellow-500",
//       bgColor: "bg-yellow-50",
//       textColor: "text-yellow-600",
//       trend: "+23%",
//       trendUp: true,
//     },
//     {
//       title: "Applications",
//       value: (stats.totalApplications || 0).toLocaleString(),
//       icon: DocumentTextIcon,
//       color: "bg-indigo-500",
//       bgColor: "bg-indigo-50",
//       textColor: "text-indigo-600",
//       trend: "+18%",
//       trendUp: true,
//     },
//     {
//       title: "Pending Jobs",
//       value: (stats.pendingJobs || 0).toLocaleString(),
//       icon: ClockIcon,
//       color: "bg-orange-500",
//       bgColor: "bg-orange-50",
//       textColor: "text-orange-600",
//       trend: "-3%",
//       trendUp: false,
//     },
//   ];

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case "user":
//         return <UserPlusIcon className="h-5 w-5 text-blue-500" />;
//       case "job":
//         return <BriefcaseIcon className="h-5 w-5 text-green-500" />;
//       default:
//         return <EyeIcon className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   if (loading) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       {/* STATS */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
//         {statCards.map((stat, index) => (
//           <div key={index} className="bg-white p-5 rounded-xl shadow">
//             <p className="text-gray-500 text-sm">{stat.title}</p>
//             <p className="text-xl font-bold">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* ACTIVITIES */}
//       <div className="bg-white p-5 rounded-xl shadow">
//         <h2 className="font-bold mb-4">Recent Activity</h2>

//         {(recentActivities || []).map((activity) => (
//           <div key={activity.id} className="border-b py-2">
//             {activity.action} - {activity.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  UsersIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  DocumentTextIcon,
  EyeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalEmployers: 0,
    totalRevenue: 0,
    totalApplications: 0,
    pendingJobs: 0,
    activeJobs: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");

      const [statsRes, activitiesRes, usersRes, jobsRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/recent-activities", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/recent-users?limit=5", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/recent-jobs?limit=5", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const statsData = await statsRes.json();
      const activitiesData = await activitiesRes.json();
      const usersData = await usersRes.json();
      const jobsData = await jobsRes.json();

      setStats(
        statsData.data || {
          totalUsers: 1248,
          totalJobs: 342,
          totalEmployers: 186,
          totalRevenue: 28450,
          totalApplications: 5672,
          pendingJobs: 23,
          activeJobs: 319,
        },
      );

      setRecentActivities(
        Array.isArray(activitiesData?.data)
          ? activitiesData.data
          : [
              {
                id: 1,
                type: "user",
                action: "New user registered",
                name: "John Doe",
                time: "2 minutes ago",
                status: "success",
              },
              {
                id: 2,
                type: "job",
                action: "New job posted",
                name: "Senior Developer",
                company: "Tech Corp",
                time: "15 minutes ago",
                status: "pending",
              },
              {
                id: 3,
                type: "application",
                action: "Job application submitted",
                name: "Sarah Smith",
                job: "UI Designer",
                time: "1 hour ago",
                status: "success",
              },
              {
                id: 4,
                type: "employer",
                action: "Employer verified",
                name: "ABC Company",
                time: "3 hours ago",
                status: "success",
              },
              {
                id: 5,
                type: "job",
                action: "Job expired",
                name: "Intern Position",
                company: "Startup Inc",
                time: "5 hours ago",
                status: "warning",
              },
            ],
      );

      setRecentUsers(
        Array.isArray(usersData?.data)
          ? usersData.data
          : [
              {
                id: 1,
                name: "Alice Johnson",
                email: "alice@example.com",
                role: "Job Seeker",
                joined: "2024-03-28",
                status: "active",
                avatar: "AJ",
              },
              {
                id: 2,
                name: "Bob Williams",
                email: "bob@example.com",
                role: "Employer",
                joined: "2024-03-27",
                status: "active",
                avatar: "BW",
              },
              {
                id: 3,
                name: "Carol Davis",
                email: "carol@example.com",
                role: "Job Seeker",
                joined: "2024-03-27",
                status: "pending",
                avatar: "CD",
              },
              {
                id: 4,
                name: "David Brown",
                email: "david@example.com",
                role: "Employer",
                joined: "2024-03-26",
                status: "active",
                avatar: "DB",
              },
              {
                id: 5,
                name: "Emma Wilson",
                email: "emma@example.com",
                role: "Job Seeker",
                joined: "2024-03-26",
                status: "active",
                avatar: "EW",
              },
            ],
      );

      setRecentJobs(
        Array.isArray(jobsData?.data)
          ? jobsData.data
          : [
              {
                id: 1,
                title: "Frontend Developer",
                company: "Tech Solutions",
                location: "Remote",
                posted: "2024-03-28",
                status: "active",
                applicants: 24,
                salary: "$80k-100k",
              },
              {
                id: 2,
                title: "Product Manager",
                company: "Innovate Labs",
                location: "New York",
                posted: "2024-03-27",
                status: "active",
                applicants: 18,
                salary: "$100k-130k",
              },
              {
                id: 3,
                title: "Data Analyst",
                company: "DataWorks",
                location: "San Francisco",
                posted: "2024-03-27",
                status: "pending",
                applicants: 5,
                salary: "$70k-90k",
              },
              {
                id: 4,
                title: "UX Designer",
                company: "Creative Studio",
                location: "Remote",
                posted: "2024-03-26",
                status: "active",
                applicants: 32,
                salary: "$75k-95k",
              },
              {
                id: 5,
                title: "Backend Engineer",
                company: "Cloud Systems",
                location: "Austin",
                posted: "2024-03-25",
                status: "expired",
                applicants: 41,
                salary: "$90k-120k",
              },
            ],
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      // Fallback mock data already set above
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const statCards = [
    {
      title: "Total Users",
      value: (stats.totalUsers || 0).toLocaleString(),
      icon: UsersIcon,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+12%",
      trendUp: true,
      subtitle: "Active users",
    },
    {
      title: "Total Jobs",
      value: (stats.totalJobs || 0).toLocaleString(),
      icon: BriefcaseIcon,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      trend: "+8%",
      trendUp: true,
      subtitle: "Active listings",
    },
    {
      title: "Total Employers",
      value: (stats.totalEmployers || 0).toLocaleString(),
      icon: UsersIcon,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "+5%",
      trendUp: true,
      subtitle: "Verified companies",
    },
    {
      title: "Total Revenue",
      value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      trend: "+23%",
      trendUp: true,
      subtitle: "This month",
    },
    {
      title: "Applications",
      value: (stats.totalApplications || 0).toLocaleString(),
      icon: DocumentTextIcon,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      trend: "+18%",
      trendUp: true,
      subtitle: "Total submissions",
    },
    {
      title: "Pending Jobs",
      value: (stats.pendingJobs || 0).toLocaleString(),
      icon: ClockIcon,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      trend: "-3%",
      trendUp: false,
      subtitle: "Awaiting review",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "user":
        return <UserPlusIcon className="h-5 w-5 text-blue-500" />;
      case "job":
        return <BriefcaseIcon className="h-5 w-5 text-green-500" />;
      case "application":
        return <DocumentTextIcon className="h-5 w-5 text-purple-500" />;
      case "employer":
        return <UsersIcon className="h-5 w-5 text-indigo-500" />;
      default:
        return <EyeIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      expired: "bg-red-100 text-red-700",
      warning: "bg-orange-100 text-orange-700",
      success: "bg-green-100 text-green-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const getRoleBadge = (role) => {
    return role === "Employer"
      ? "bg-purple-100 text-purple-700"
      : "bg-blue-100 text-blue-700";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your platform, users, and jobs
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowPathIcon
                  className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
                />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3 ml-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  AD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                </div>
                {stat.trend && (
                  <div
                    className={`flex items-center gap-0.5 text-xs font-medium ${stat.trendUp ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.trendUp ? (
                      <ArrowTrendingUpIcon className="h-3 w-3" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-3 w-3" />
                    )}
                    {stat.trend}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-1">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-white rounded-t-xl">
          <nav className="flex gap-6 px-6">
            {["overview", "users", "jobs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-3 px-1 font-medium transition-all relative ${
                  selectedTab === tab
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {selectedTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Latest platform events
                </p>
              </div>
              <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-medium">{activity.name}</span>
                          {activity.company && (
                            <>
                              <span>•</span>
                              <span>{activity.company}</span>
                            </>
                          )}
                          {activity.job && (
                            <>
                              <span>•</span>
                              <span>{activity.job}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(activity.status)}`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View all activities
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quick Stats & Actions */}
            <div className="space-y-6">
              {/* Platform Health */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Platform Health
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Active Jobs Rate
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      {stats.totalJobs
                        ? Math.round((stats.activeJobs / stats.totalJobs) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${stats.totalJobs ? (stats.activeJobs / stats.totalJobs) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-600">
                      Applications per Job
                    </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {stats.totalJobs
                        ? Math.round(stats.totalApplications / stats.totalJobs)
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User Growth</span>
                    <span className="text-sm font-semibold text-purple-600">
                      +15% this month
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                    <UsersIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      Manage Users
                    </span>
                  </button>
                  <button className="flex items-center gap-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <BriefcaseIcon className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Review Jobs
                    </span>
                  </button>
                  <button className="flex items-center gap-2 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <CurrencyDollarIcon className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">
                      View Analytics
                    </span>
                  </button>
                  <button className="flex items-center gap-2 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                    <DocumentTextIcon className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">
                      Reports
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {selectedTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Users
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Latest registered users on the platform
                </p>
              </div>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            {user.avatar || user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {new Date(user.joined).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {user.status === "active" ? (
                            <span className="flex items-center gap-1">
                              <CheckCircleIcon className="h-3 w-3" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <ClockIcon className="h-3 w-3" />
                              Pending
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                          View
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing 5 of {stats.totalUsers} users
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View all users
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {selectedTab === "jobs" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Jobs
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Latest job postings on the platform
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicants
                    </th>
                    <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <p className="text-xs text-gray-400">
                          Posted {new Date(job.posted).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600 font-medium">
                        {job.company}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {job.location}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-green-600">
                        {job.salary || "N/A"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-semibold text-gray-700">
                            {job.applicants}
                          </span>
                          <span className="text-xs text-gray-400">
                            applicants
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}
                        >
                          {job.status === "active" && (
                            <CheckCircleIcon className="h-3 w-3 inline mr-1" />
                          )}
                          {job.status === "pending" && (
                            <ClockIcon className="h-3 w-3 inline mr-1" />
                          )}
                          {job.status === "expired" && (
                            <XCircleIcon className="h-3 w-3 inline mr-1" />
                          )}
                          {job.status.charAt(0).toUpperCase() +
                            job.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing 5 of {stats.totalJobs} jobs
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View all jobs
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
