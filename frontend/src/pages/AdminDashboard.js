import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1>Admin Dashboard</h1>
          <p>Manage the platform, users, and providers.</p>
          <div className="alert alert-info">
            <strong>Coming Soon:</strong> User management, provider approvals, analytics, reports.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
