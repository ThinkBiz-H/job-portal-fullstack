"use client";
import EmployerHeader from "@/components/EmployerHeader";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Users,
  FileText,
  PlusCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  Calendar,
  Building,
  MapPin,
  ChevronRight,
  BarChart3,
  Sparkles,
  DollarSign,
  Target,
  Download,
  MoreVertical,
  Settings,
  Bell,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  X,
  AlertCircle,
  UserPlus,
  MessageSquare,
  Shield,
  Star,
  Award,
  Rocket,
  Zap,
  TrendingDown,
  RefreshCw,
} from "lucide-react";

export default function EmployerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");
  const [activeView, setActiveView] = useState("overview");
  const [companyName, setCompanyName] = useState("TechCorp Solutions");

  // const API_BASE_URL =
  //   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Demo data - baad me backend se aayega
  const [stats, setStats] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const quickStats = [
    {
      icon: <Briefcase size={22} />,
      label: "Active Jobs",
      value: stats?.activeJobs || 0,
      change: "+3 this month",
      changeType: "positive",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: <Users size={22} />,
      label: "Total Applicants",
      value: stats?.applications || 0,
      change: "+42 this week",
      changeType: "positive",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: <FileText size={22} />,
      label: "Pending Reviews",
      value: stats?.pendingReviews || 0,
      change: "Requires attention",
      changeType: "warning",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: <TrendingUp size={22} />,
      label: "Conversion Rate",
      value: stats?.conversionRate || "0%",
      change: "+8% from last month",
      changeType: "positive",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const performanceMetrics = [
    { label: "Job Views", value: "2,890", change: "+12.5%", trend: "up" },
    { label: "Applications", value: "532", change: "+8.3%", trend: "up" },
    {
      label: "Avg. Response Time",
      value: "2.4 days",
      change: "-0.8 days",
      trend: "up",
    },
    { label: "Interview Rate", value: "8.8%", change: "+2.1%", trend: "up" },
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // 🔥 All APIs together
        const [meRes, statsRes, jobsRes, actRes] = await Promise.all([
          fetch(`${API_BASE_URL}/auth/me`, { headers }),
          fetch(`${API_BASE_URL}/employer/stats`, { headers }),
          fetch(`${API_BASE_URL}/employer/jobs?limit=5`, {
            headers,
          }),
          fetch(`${API_BASE_URL}/employer/activities?limit=5`, {
            headers,
          }),
        ]);

        const meData = await meRes.json();
        const statsData = await statsRes.json();
        const jobsData = await jobsRes.json();
        const actData = await actRes.json();

        /* Company Name */
        if (meData.success) {
          const profile =
            meData.data?.profile || meData.data?.employerProfile || {};

          setCompanyName(profile.companyName || meData.data?.name || "Company");
        }

        /* Stats */
        if (statsData.success) {
          setStats(statsData.data);
        }

        /* Jobs */
        if (jobsData.success) {
          setRecentJobs(jobsData.data.jobs || []);
        }

        /* Activities */
        if (actData.success) {
          setRecentActivities(actData.data.activities || []);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <h2 className="mt-6 text-xl font-semibold text-gray-800">
            Loading Dashboard
          </h2>
          <p className="mt-2 text-gray-600">Preparing your insights...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <EmployerHeader />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Main Content */}
        <div className="p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header with Breadcrumb */}
            <div className="mb-6">
              <nav className="flex text-sm text-gray-600 mb-4">
                <Link href="/employer" className="hover:text-green-600">
                  Employer
                </Link>
                <ChevronRight size={16} className="mx-2" />
                <span className="text-gray-900 font-medium">Dashboard</span>
              </nav>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-sm">
                      <Building className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Welcome back,{" "}
                        <span className="text-green-600">{companyName}</span>
                      </h1>
                      <p className="text-gray-600 mt-1">
                        Here's your recruitment overview for{" "}
                        {new Date().toLocaleDateString("en-IN", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search jobs, applicants..."
                      className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-full sm:w-64"
                    />
                  </div>
                  <Link
                    href="/employer/post-job"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <PlusCircle size={20} />
                    <span>Post New Job</span>
                    <Sparkles
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Date and Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  Last updated:{" "}
                  {new Date().toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {["day", "week", "month", "quarter"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                        timeRange === range
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Filter size={18} />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <Download size={18} />
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                        <div className={stat.iconColor}>{stat.icon}</div>
                      </div>
                      <div
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          stat.changeType === "positive"
                            ? "bg-green-50 text-green-700"
                            : stat.changeType === "warning"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {stat.label}
                        </p>
                      </div>
                      <div
                        className={`w-12 h-1 rounded-full bg-gradient-to-r ${stat.color}`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Recent Jobs & Performance */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Jobs Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Recent Job Posts
                      </h2>
                      <p className="text-sm text-gray-500">
                        Manage and track your job listings
                      </p>
                    </div>
                    <Link
                      href="/employer/my-jobs"
                      className="text-green-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View all <ChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left p-4 text-sm font-medium text-gray-700">
                            Job Title
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-700">
                            Applicants
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-700">
                            Status
                          </th>
                          <th className="text-left p-4 text-sm font-medium text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentJobs.map((job) => (
                          <tr
                            key={job._id}
                            className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                          >
                            <td className="p-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900">
                                    {job.title}
                                  </h3>
                                  {job.urgent && (
                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                      Urgent
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {job.location}
                                  </span>
                                  <span>•</span>
                                  <span>
                                    ₹{job.salary?.min || 0} -{" "}
                                    {job.salary?.max || 0} LPA
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Users size={16} className="text-gray-400" />
                                <span className="font-medium">
                                  {job.applicants}
                                </span>
                                <span className="text-sm text-gray-500">
                                  applicants
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  job.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {job.status === "active" ? "Active" : "Closed"}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                                  <Eye size={18} />
                                </button>
                                <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                  <Users size={18} />
                                </button>
                                <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                                  <MoreVertical size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-5 text-white">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold">Performance Metrics</h2>
                      <p className="text-gray-300 text-sm mt-1">
                        Track your recruitment performance
                      </p>
                    </div>
                    <RefreshCw size={18} className="text-gray-400" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {performanceMetrics.map((metric, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">
                            {metric.label}
                          </span>
                          <div
                            className={`flex items-center gap-1 text-xs ${
                              metric.trend === "up"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {metric.trend === "up" ? (
                              <ArrowUpRight size={14} />
                            ) : (
                              <ArrowDownRight size={14} />
                            )}
                            {metric.change}
                          </div>
                        </div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Activity & Quick Actions */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Recent Activity
                      </h2>
                      <p className="text-sm text-gray-500">
                        Latest updates on your account
                      </p>
                    </div>
                    <Bell size={20} className="text-gray-500" />
                  </div>

                  <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity._id}
                        className={`p-3 rounded-lg transition ${!activity.read ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"}`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`p-2 rounded-full ${activity.type === "application" ? "bg-blue-100 text-blue-600" : activity.type === "interview" ? "bg-purple-100 text-purple-600" : activity.type === "verification" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                          >
                            {activity.type === "application" ? (
                              <UserPlus size={16} />
                            ) : activity.type === "interview" ? (
                              <MessageSquare size={16} />
                            ) : activity.type === "verification" ? (
                              <Shield size={16} />
                            ) : (
                              <Briefcase size={16} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800">
                              {activity.text}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">
                                  {activity.time}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">
                                  {activity.user}
                                </span>
                              </div>
                              {!activity.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <Link
                      href="/employer/notifications"
                      className="text-center block text-green-600 font-medium text-sm hover:text-green-700 transition"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/employer/applicants"
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Review Applicants
                          </h3>
                          <p className="text-xs text-gray-500">
                            Manage applications
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-green-600 transition-colors" />
                    </Link>

                    <Link
                      href="/employer/analytics"
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            View Analytics
                          </h3>
                          <p className="text-xs text-gray-500">
                            Performance insights
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </Link>

                    <Link
                      href="/employer/profile"
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Settings className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Settings
                          </h3>
                          <p className="text-xs text-gray-500">
                            Account settings
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </Link>

                    <Link
                      href="/employer/support"
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Support</h3>
                          <p className="text-xs text-gray-500">Get help</p>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-amber-600 transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <Link
          href="/employer/post-job"
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
        >
          <PlusCircle size={24} />
        </Link>
      </div>
    </>
  );
}
