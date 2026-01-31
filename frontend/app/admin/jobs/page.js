"use client";

import { useState, useEffect } from "react";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // For now, using dummy data
      const dummyJobs = [
        {
          _id: "1",
          title: "Frontend Developer",
          company: "Tech Corp",
          location: "Remote",
          salary: "$80,000 - $100,000",
          type: "Full-time",
          postedDate: "2024-01-15",
          status: "active",
          applicants: 24,
        },
        {
          _id: "2",
          title: "Backend Engineer",
          company: "Data Systems",
          location: "New York, NY",
          salary: "$90,000 - $120,000",
          type: "Full-time",
          postedDate: "2024-01-14",
          status: "active",
          applicants: 18,
        },
        {
          _id: "3",
          title: "UI/UX Designer",
          company: "Creative Studio",
          location: "Los Angeles, CA",
          salary: "$70,000 - $90,000",
          type: "Contract",
          postedDate: "2024-01-10",
          status: "inactive",
          applicants: 12,
        },
      ];

      setJobs(dummyJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`/api/admin/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchJobs(); // Refresh list
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const toggleJobStatus = (jobId) => {
    setJobs(
      jobs.map((job) => {
        if (job._id === jobId) {
          return {
            ...job,
            status: job.status === "active" ? "inactive" : "active",
          };
        }
        return job;
      }),
    );
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <div className="text-center py-8">Loading jobs...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Manage Jobs</h2>
        <p className="text-gray-600">Total {jobs.length} jobs posted</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-3 text-gray-400">🔍</div>
            </div>
          </div>
          <div className="ml-4">
            <select className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="text-gray-500 text-sm">{job.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{job.company}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">{job.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-700">{job.salary}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {job.applicants} applicants
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleJobStatus(job._id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      View
                    </button>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="font-bold text-lg mb-2">Job Statistics</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Active Jobs:</span>
              <span className="font-bold">
                {jobs.filter((j) => j.status === "active").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Applicants:</span>
              <span className="font-bold">
                {jobs.reduce((sum, job) => sum + job.applicants, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Avg Salary:</span>
              <span className="font-bold">$85,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
