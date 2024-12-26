import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Dashboard() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    const handleUpload = () => {
        if (profilePicture) {
            
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            
            console.log('Uploading:', profilePicture);
        } else {
            alert('Please select an image to upload.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Dashboard</h2>
            <div className="text-center mb-4">
                <h5>Profile Picture</h5>
                {imagePreview ? (
                    <img 
                        src={imagePreview} 
                        alt="Profile Preview" 
                        className="rounded-circle" 
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                    />
                ) : (
                    <div className="rounded-circle" style={{ width: '150px', height: '150px', backgroundColor: '#eaeaea' }} />
                )}
                <div className="mt-2">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="d-none" 
                        id="profile-pic-upload" 
                    />
                    <label htmlFor="profile-pic-upload" className="btn btn-primary mt-2">
                        Choose File
                    </label>
                    <button onClick={handleUpload} className="btn btn-success mt-2">
                        Upload
                    </button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="dashboard-card">
                        <h5>Attendance Management</h5>
                        <button 
                            onClick={() => navigate('/attendance')} 
                            className="btn btn-primary w-100 mt-2">
                            Mark Attendance
                        </button>
                        <button 
                            onClick={() => navigate('/mark-leave')} 
                            className="btn btn-secondary w-100 mt-2">
                            Mark Leave
                        </button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dashboard-card">
                        <h5>View Records</h5>
                        <button 
                            onClick={() => navigate('/view-attendance')} 
                            className="btn btn-info w-100 mt-2">
                            View Attendance
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
