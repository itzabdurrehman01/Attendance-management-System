import React, { useState } from 'react';
import axios from 'axios';
import './MarkLeave.css';

function MarkLeave() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [leaveDays, setLeaveDays] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const calculateLeaveDays = (start, end) => {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const timeDifference = endDate - startDate;
            const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
            setLeaveDays(daysDifference > 0 ? daysDifference : 0);
        } else {
            setLeaveDays(0);
        }
    };

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        setStartDate(selectedStartDate);
        calculateLeaveDays(selectedStartDate, endDate);
    };

    const handleEndDateChange = (e) => {
        const selectedEndDate = e.target.value;
        setEndDate(selectedEndDate);
        calculateLeaveDays(startDate, selectedEndDate);
    };

    const submitLeaveRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const userId = 'your_user_id'; 
            await axios.post('http://localhost:5000/api/leave/request', {
                userId,
                reason,
                startDate,
                endDate,
                leaveDays,
            });
            setSuccessMessage('Leave request submitted successfully!');
            setReason('');
            setStartDate('');
            setEndDate('');
            setLeaveDays(0);
        } catch (error) {
            setErrorMessage('Error submitting leave request.');
            console.error('Error submitting leave request:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card p-4 shadow-lg leave-card">
                <h3 className="mb-4">Request Leave</h3>
                <p className="text-muted mb-4">Specify your leave period and reason.</p>

                <form onSubmit={submitLeaveRequest}>
                    <div className="form-group mb-3">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={handleStartDateChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={handleEndDateChange}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Reason for Leave</label>
                        <input
                            type="text"
                            className="form-control"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                            placeholder="Enter your reason"
                        />
                    </div>
                    <div className="mb-3">
                        <strong>Total Leave Days: </strong> {leaveDays}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading || leaveDays <= 0}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            "Submit Leave Request"
                        )}
                    </button>
                </form>

                {successMessage && (
                    <div className="alert alert-success mt-4">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="alert alert-danger mt-4">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MarkLeave;
