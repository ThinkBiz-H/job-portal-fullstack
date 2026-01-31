// "use client";

// import { useRouter } from "next/navigation";

// /* DUMMY EMPLOYER JOBS */
// const myJobs = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     location: "Delhi",
//     applicants: 45,
//     status: "Active",
//   },
//   {
//     id: 2,
//     title: "React Developer",
//     location: "Noida",
//     applicants: 28,
//     status: "Active",
//   },
//   {
//     id: 3,
//     title: "Backend Developer",
//     location: "Bangalore",
//     applicants: 12,
//     status: "Closed",
//   },
// ];

// export default function MyJobsPage() {
//   const router = useRouter();

//   return (
//     <section className="bg-gray-100 min-h-screen p-6 text-black">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-5">
//           <h1 className="text-2xl font-bold">My Jobs</h1>

//           <button
//             onClick={() => router.push("/employer/post-job")}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg"
//           >
//             + Post New Job
//           </button>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full border text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 border">Job Title</th>
//                 <th className="p-3 border">Location</th>
//                 <th className="p-3 border">Applicants</th>
//                 <th className="p-3 border">Status</th>
//                 <th className="p-3 border">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {myJobs.map((job) => (
//                 <tr key={job.id} className="text-center">
//                   <td className="p-3 border font-medium">{job.title}</td>

//                   <td className="p-3 border">{job.location}</td>

//                   <td className="p-3 border">{job.applicants}</td>

//                   <td className="p-3 border">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs ${
//                         job.status === "Active"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {job.status}
//                     </span>
//                   </td>

//                   <td className="p-3 border space-x-2">
//                     <button
//                       onClick={() =>
//                         router.push(`/employer/applicants/${job.id}`)
//                       }
//                       className="text-blue-600 hover:underline"
//                     >
//                       View
//                     </button>

//                     <button className="text-orange-600 hover:underline">
//                       Edit
//                     </button>

//                     <button className="text-red-600 hover:underline">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  Archive,
  RefreshCw,
  Download,
  Plus,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  MessageSquare,
  Share2,
  Zap,
  Star,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  Building,
  Briefcase,
  FileText,
  Tag,
  Globe,
  Home,
  Target,
  Award,
  Shield,
  Sparkles,
} from "lucide-react";

export default function MyJobsPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    draft: 0,
    closed: 0,
    expired: 0,
    totalApplications: 0,
    avgApplicants: 0,
  });

  const jobsPerPage = 8;

  // Sample job data
  const sampleJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer (React)",
      company: "TechCorp Solutions",
      location: "Remote",
      salary: "₹12-18 LPA",
      type: "Full-time",
      workMode: "Remote",
      status: "active",
      applicants: 56,
      views: 345,
      date: "2024-01-15",
      expiry: "2024-03-15",
      category: "Engineering",
      tags: ["React", "TypeScript", "Next.js"],
      isUrgent: true,
      isFeatured: true,
      description:
        "Looking for an experienced frontend developer with React expertise.",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "TechCorp Solutions",
      location: "Bangalore",
      salary: "₹15-22 LPA",
      type: "Full-time",
      workMode: "Hybrid",
      status: "active",
      applicants: 42,
      views: 289,
      date: "2024-01-10",
      expiry: "2024-03-10",
      category: "Engineering",
      tags: ["Node.js", "React", "MongoDB"],
      isUrgent: false,
      isFeatured: true,
      description: "Full stack developer with Node.js and React experience.",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "TechCorp Solutions",
      location: "Mumbai",
      salary: "₹10-16 LPA",
      type: "Full-time",
      workMode: "On-site",
      status: "closed",
      applicants: 28,
      views: 198,
      date: "2024-01-05",
      expiry: "2024-02-05",
      category: "Engineering",
      tags: ["AWS", "Docker", "Kubernetes"],
      isUrgent: false,
      isFeatured: false,
      description: "DevOps engineer with cloud infrastructure experience.",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "TechCorp Solutions",
      location: "Delhi",
      salary: "₹18-25 LPA",
      type: "Full-time",
      workMode: "Hybrid",
      status: "active",
      applicants: 34,
      views: 256,
      date: "2024-01-03",
      expiry: "2024-03-03",
      category: "Product",
      tags: ["Product Strategy", "Agile", "User Research"],
      isUrgent: true,
      isFeatured: false,
      description: "Product manager with 3+ years of experience.",
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "TechCorp Solutions",
      location: "Remote",
      salary: "₹8-12 LPA",
      type: "Full-time",
      workMode: "Remote",
      status: "active",
      applicants: 38,
      views: 210,
      date: "2024-01-20",
      expiry: "2024-03-20",
      category: "Design",
      tags: ["Figma", "UI Design", "User Research"],
      isUrgent: false,
      isFeatured: true,
      description: "Creative UI/UX designer for product team.",
    },
    {
      id: 6,
      title: "Backend Developer (Node.js)",
      company: "TechCorp Solutions",
      location: "Bangalore",
      salary: "₹14-20 LPA",
      type: "Contract",
      workMode: "Hybrid",
      status: "draft",
      applicants: 0,
      views: 45,
      date: "2024-01-18",
      expiry: "2024-04-18",
      category: "Engineering",
      tags: ["Node.js", "Express", "PostgreSQL"],
      isUrgent: false,
      isFeatured: false,
      description: "Backend developer for API development.",
    },
    {
      id: 7,
      title: "Data Scientist",
      company: "TechCorp Solutions",
      location: "Remote",
      salary: "₹20-30 LPA",
      type: "Full-time",
      workMode: "Remote",
      status: "active",
      applicants: 25,
      views: 178,
      date: "2024-01-12",
      expiry: "2024-03-12",
      category: "Data Science",
      tags: ["Python", "Machine Learning", "TensorFlow"],
      isUrgent: true,
      isFeatured: true,
      description: "Data scientist for AI/ML projects.",
    },
    {
      id: 8,
      title: "Marketing Manager",
      company: "TechCorp Solutions",
      location: "Mumbai",
      salary: "₹12-18 LPA",
      type: "Full-time",
      workMode: "On-site",
      status: "expired",
      applicants: 19,
      views: 156,
      date: "2023-12-15",
      expiry: "2024-01-15",
      category: "Marketing",
      tags: ["Digital Marketing", "SEO", "Content Strategy"],
      isUrgent: false,
      isFeatured: false,
      description: "Marketing manager for digital campaigns.",
    },
    {
      id: 9,
      title: "Mobile Developer (Flutter)",
      company: "TechCorp Solutions",
      location: "Remote",
      salary: "₹10-16 LPA",
      type: "Full-time",
      workMode: "Remote",
      status: "active",
      applicants: 31,
      views: 201,
      date: "2024-01-08",
      expiry: "2024-03-08",
      category: "Engineering",
      tags: ["Flutter", "Dart", "Mobile"],
      isUrgent: false,
      isFeatured: false,
      description: "Flutter developer for cross-platform apps.",
    },
    {
      id: 10,
      title: "Sales Executive",
      company: "TechCorp Solutions",
      location: "Delhi",
      salary: "₹6-10 LPA + Commission",
      type: "Full-time",
      workMode: "On-site",
      status: "active",
      applicants: 47,
      views: 234,
      date: "2024-01-22",
      expiry: "2024-03-22",
      category: "Sales",
      tags: ["Sales", "B2B", "Negotiation"],
      isUrgent: true,
      isFeatured: false,
      description: "Sales executive for enterprise clients.",
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Jobs", color: "gray" },
    { value: "active", label: "Active", color: "green" },
    { value: "draft", label: "Draft", color: "blue" },
    { value: "closed", label: "Closed", color: "red" },
    { value: "expired", label: "Expired", color: "orange" },
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "applicants-high", label: "Most Applicants" },
    { value: "applicants-low", label: "Least Applicants" },
    { value: "salary-high", label: "Highest Salary" },
    { value: "salary-low", label: "Lowest Salary" },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(sampleJobs);
      setFilteredJobs(sampleJobs);

      // Calculate stats
      const total = sampleJobs.length;
      const active = sampleJobs.filter((j) => j.status === "active").length;
      const draft = sampleJobs.filter((j) => j.status === "draft").length;
      const closed = sampleJobs.filter((j) => j.status === "closed").length;
      const expired = sampleJobs.filter((j) => j.status === "expired").length;
      const totalApplications = sampleJobs.reduce(
        (sum, job) => sum + job.applicants,
        0,
      );
      const avgApplicants = Math.round(totalApplications / active || 0);

      setStats({
        total,
        active,
        draft,
        closed,
        expired,
        totalApplications,
        avgApplicants,
      });

      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((job) => job.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (job) => job.type.toLowerCase() === typeFilter,
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "applicants-high":
          return b.applicants - a.applicants;
        case "applicants-low":
          return a.applicants - b.applicants;
        case "salary-high":
          return (
            parseFloat(b.salary.split("-")[0].replace("₹", "")) -
            parseFloat(a.salary.split("-")[0].replace("₹", ""))
          );
        case "salary-low":
          return (
            parseFloat(a.salary.split("-")[0].replace("₹", "")) -
            parseFloat(b.salary.split("-")[0].replace("₹", ""))
          );
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter, sortBy, jobs]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "closed":
        return "bg-red-100 text-red-800 border-red-200";
      case "expired":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle size={14} />;
      case "draft":
        return <FileText size={14} />;
      case "closed":
        return <XCircle size={14} />;
      case "expired":
        return <AlertCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const handleDeleteJob = (jobId) => {
    setJobToDelete(jobId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setJobs(jobs.filter((job) => job.id !== jobToDelete));
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const handleSelectJob = (jobId) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === currentJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(currentJobs.map((job) => job.id));
    }
  };

  const handleBulkAction = (action) => {
    // Implement bulk actions
    alert(`Bulk ${action} for ${selectedJobs.length} jobs`);
    setSelectedJobs([]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                My Job Listings
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and track all your job postings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/employer/post-job"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2"
              >
                <Plus size={20} />
                Post New Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Jobs</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {stats.draft}
            </div>
            <div className="text-sm text-gray-600">Draft</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {stats.closed}
            </div>
            <div className="text-sm text-gray-600">Closed</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-orange-600">
              {stats.expired}
            </div>
            <div className="text-sm text-gray-600">Expired</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalApplications}
            </div>
            <div className="text-sm text-gray-600">Total Applicants</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-2xl font-bold text-indigo-600">
              {stats.avgApplicants}
            </div>
            <div className="text-sm text-gray-600">Avg. per Job</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search jobs by title, location, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedJobs.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {selectedJobs.length}
                  </span>
                </div>
                <span className="text-sm text-gray-700">
                  {selectedJobs.length} job(s) selected
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction("archive")}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Archive
                </button>
                <button
                  onClick={() => handleBulkAction("close")}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close Jobs
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="px-3 py-1.5 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedJobs.length === currentJobs.length &&
                        currentJobs.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Job Title
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Applicants
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Posted
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Expires
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => handleSelectJob(job.id)}
                          className="w-4 h-4 text-green-600 rounded"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            {job.isUrgent && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                                Urgent
                              </span>
                            )}
                            {job.isFeatured && (
                              <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {job.location}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <DollarSign size={12} />
                              {job.salary}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {job.type}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {job.tags.length > 2 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                +{job.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}
                        >
                          {getStatusIcon(job.status)}
                          {job.status.charAt(0).toUpperCase() +
                            job.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-gray-500" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {job.applicants}
                            </div>
                            <div className="text-xs text-gray-500">
                              {job.views} views
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">
                          {formatDate(job.date)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">
                          {formatDate(job.expiry)}
                        </div>
                        {job.status === "active" &&
                          new Date(job.expiry) < new Date() && (
                            <div className="text-xs text-red-600 mt-1">
                              Expired
                            </div>
                          )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/employer/jobs/${job.id}`}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/employer/jobs/${job.id}/applicants`}
                            className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="View Applicants"
                          >
                            <Users size={18} />
                          </Link>
                          <Link
                            href={`/employer/jobs/${job.id}/edit`}
                            className="p-1.5 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                            title="Edit Job"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Job"
                          >
                            <Trash2 size={18} />
                          </button>
                          <div className="relative group">
                            <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition">
                              <MoreVertical size={18} />
                            </button>
                            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                                <Copy size={14} />
                                Duplicate Job
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                                <Archive size={14} />
                                Archive
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                                <Share2 size={14} />
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-12 px-4 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No jobs found
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Try adjusting your search or filter criteria
                        </p>
                        <Link
                          href="/employer/post-job"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Post Your First Job
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstJob + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastJob, filteredJobs.length)}
                </span>{" "}
                of <span className="font-medium">{filteredJobs.length}</span>{" "}
                jobs
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft size={18} />
                </button>
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
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium ${currentPage === pageNum ? "bg-green-600 text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-2">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No jobs posted yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start posting jobs to find the perfect candidates for your
              company.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/employer/post-job"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition"
              >
                <Plus className="inline mr-2" size={20} />
                Create Your First Job
              </Link>
              <Link
                href="/employer/learn"
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Learn Best Practices
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Job
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this job posting? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
