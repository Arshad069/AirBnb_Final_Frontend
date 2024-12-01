import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/BookingPg.css'; // Import the CSS file for styling

const BookingPage = () => {
  const [formData, setFormData] = useState({ checkIn: '', checkOut: '', numGuests: 1 });
  const [message, setMessage] = useState('');
  const { id: listingId } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/bookings',
        { ...formData, listingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Booking successful!');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Booking failed. Please try again.');
    }
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">Book Your Stay</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>Check-in Date:</label>
        <input type="date" name="checkIn" onChange={handleChange} required />

        <label>Check-out Date:</label>
        <input type="date" name="checkOut" onChange={handleChange} required />

        <label>Number of Guests:</label>
        <input type="number" name="numGuests" onChange={handleChange} min="1" required />

        <button type="submit" className="booking-button">Book Now</button>
      </form>
      {message && <p className="booking-message">{message}</p>}
    </div>
  );
};

export default BookingPage;
