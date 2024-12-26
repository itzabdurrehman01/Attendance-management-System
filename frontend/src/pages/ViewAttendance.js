import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewAttendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const userId = 'your_user_id';
                const { data } = await axios.get(`http://localhost:5000/api/attendance/view/${userId}`);
                setAttendanceRecords(data);
            } catch (error) {
                console.error('Error fetching attendance records:', error);
            }
        };

        fetchAttendance();
    }, []);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            <h2>Your Attendance Records</h2>
            <ul className="list-group mt-3" style={{ width: '300px' }}>
                {attendanceRecords.map((record, index) => (
                    <li className="list-group-item" key={index}>
                        {record.date}: {record.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewAttendance;
