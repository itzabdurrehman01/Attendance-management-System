import React from 'react';

function AdminDashboard() {
    return (
        <div className="container mt-5">
            <h2 className="text-center">Admin Dashboard</h2>
            <div className="mt-4">
                <h5>Manage Attendance</h5>
                {}
                <button className="btn btn-primary">View Attendance Records</button>
                <button className="btn btn-secondary">Approve Leaves</button>
                <button className="btn btn-info">Generate Reports</button>
            </div>
        </div>
    );
}

export default AdminDashboard;
