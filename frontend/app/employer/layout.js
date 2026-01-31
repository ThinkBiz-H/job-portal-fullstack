// # Employer layout.js
// Set-Content -Path "app\employer\layout.js" -Value @'
export default function EmployerLayout({ children }) {
  return (
    <div>
      {/* <nav style={{ background: '#fff', padding: '20px', borderBottom: '1px solid #ddd' }}>
        <a href="/employer/dashboard" style={{ marginRight: '20px' }}>Dashboard</a>
        <a href="/employer/post-job" style={{ marginRight: '20px' }}>Post Job</a>
        <a href="/employer/my-jobs" style={{ marginRight: '20px' }}>My Jobs</a>
        <a href="/employer/applicants" style={{ marginRight: '20px' }}>Applicants</a>
        <a href="/employer/profile">Profile</a>
      </nav> */}
      <div style={{ padding: "0px" }}>{children}</div>
    </div>
  );
}
