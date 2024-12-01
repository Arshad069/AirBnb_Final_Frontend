import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Profile.css';  // Importing the CSS file

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    dob: '',
    contact: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setFormData({ dob: res.data.dob, contact: res.data.contact, bio: res.data.bio });
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put('http://localhost:5000/api/profile', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Profile updated successfully');
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <div className="profile-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="profile-form">
        <label className="form-label">Date of Birth</label>
        <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className="form-input" />
        
        <label className="form-label">Contact</label>
        <input type="text" name="contact" value={formData.contact || ''} onChange={handleChange} className="form-input" />

        <label className="form-label">Bio</label>
        <textarea name="bio" value={formData.bio || ''} onChange={handleChange} className="form-textarea" />
        
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
