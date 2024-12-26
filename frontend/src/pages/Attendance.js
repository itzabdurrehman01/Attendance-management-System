import React, { useState } from 'react';
import axios from 'axios';
import './Attendance.css';

function Attendance() {
    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const markAttendance = async (status) => {
        setLoading(true);
        try {
            const userId = 'your_user_id'; // Replace with actual userId
            await axios.post('http://localhost:5000/api/attendance/mark', { userId, status });
            setAttendanceStatus(status);
        } catch (error) {
            console.error('Error marking attendance:', error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card p-4 shadow-lg text-center attendance-card">
                <h3 className="mb-4">Mark Attendance</h3>
                <p className="text-muted mb-4">Choose your attendance status for today.</p>
                
                <div className="d-flex gap-3">
                    <button
                        className="btn btn-success btn-lg w-100"
                        onClick={() => markAttendance('present')}
                        disabled={attendanceStatus === 'present' || loading}
                    >
                        {loading && attendanceStatus === 'present' ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            "Mark as Present"
                        )}
                    </button>
                    
                    <button
                        className="btn btn-danger btn-lg w-100"
                        onClick={() => markAttendance('absent')}
                        disabled={attendanceStatus === 'absent' || loading}
                    >
                        {loading && attendanceStatus === 'absent' ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            "Mark as Absent"
                        )}
                    </button>
                </div>

                {attendanceStatus && (
                    <div className={`alert mt-4 ${attendanceStatus === 'present' ? 'alert-success' : 'alert-danger'}`}>
                        {attendanceStatus === 'present'
                            ? "You have been marked as Present!"
                            : "You have been marked as Absent!"}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Attendance;
