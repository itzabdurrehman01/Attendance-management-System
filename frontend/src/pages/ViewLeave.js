import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewLeave() {
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/leave/view'); 
        setLeaveRecords(data);
      } catch (error) {
        setError('Error fetching leave records: ' + error.response.data.message);
      }
    };

    fetchLeave();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h2>Your Leave Records</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group mt-3" style={{ width: '300px' }}>
        {leaveRecords.map((record, index) => (
          <li className="list-group-item" key={index}>
            {record.reason} - Requested on: {new Date(record.dateRequested).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewLeave;
