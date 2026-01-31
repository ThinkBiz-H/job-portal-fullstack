// app/employer/applicants/[id]/page.js
export default function ApplicantDetailsPage({ params }) {
  const { id } = params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Applicant Details</h1>
      <p className="mb-2">Applicant ID: {id}</p>
      <div className="bg-white p-4 rounded-lg shadow">
        {/* Add applicant details here */}
        <p>Applicant information will be displayed here</p>
        <p>You can fetch applicant data using this ID: {id}</p>
      </div>
    </div>
  );
}
