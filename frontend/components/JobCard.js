export default function JobCard({ job }) {
  return (
    <div className="bg-white p-5 rounded shadow hover:shadow-lg">

      <h3 className="font-bold text-lg">
        {job.title}
      </h3>

      <p className="text-gray-600">
        {job.company}
      </p>

      <p className="text-sm mt-2">
        📍 {job.location}
      </p>

      <p className="text-sm">
        💰 {job.salary}
      </p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
        Apply
      </button>

    </div>
  );
}
