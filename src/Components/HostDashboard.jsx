import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/HostDashboard.css';  // Add this import

const HostDashboard = () => {
  const [listings, setListings] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    images: []
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/admin/listings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setListings(res.data);
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (editId) {
      const listingToEdit = listings.find(listing => listing._id === editId);
      if (listingToEdit) {
        setFormData({
          title: listingToEdit.title,
          description: listingToEdit.description,
          price: listingToEdit.price,
          location: listingToEdit.location,
          images: []
        });
      }
    }
  }, [editId, listings]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const form = new FormData();

    for (let key in formData) form.append(key, formData[key]);
    if (formData.images.length > 0) {
      Array.from(formData.images).forEach(file => form.append('images', file));
    }

    if (editId) {
      await axios.put(`http://localhost:5000/api/admin/listings/${editId}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post('http://localhost:5000/api/admin/listings', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    setEditId(null);
    setFormData({ title: '', description: '', price: '', location: '', images: [] });
    const res = await axios.get('http://localhost:5000/api/admin/listings', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setListings(res.data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/admin/listings/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setListings(listings.filter(listing => listing._id !== id));
  };

  return (
    <div className="host-dashboard">
      <h1>Your Listings</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="file" name="images" multiple onChange={handleFileChange} />
        <button type="submit">{editId ? 'Update Listing' : 'Add Listing'}</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr key={listing._id}>
                <td>{listing.title}</td>
                <td>{listing.location}</td>
                <td>{listing.price}</td>
                <td>
                  <button onClick={() => setEditId(listing._id)}>Edit</button>
                  <button onClick={() => handleDelete(listing._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostDashboard;
