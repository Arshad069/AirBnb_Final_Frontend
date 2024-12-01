import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/HostBookings.css'; // Importing CSS for styling

const HostBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  
  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/admin-bookings/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (error) {
        setError('Failed to load bookings. Please try again later.');
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="host-bookings-container">
      <h1>Your Bookings</h1>
      
      {error && <p className="error-message">{error}</p>}
      
      {bookings.length > 0 ? (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Listing</th>
              <th>Location</th>
              <th>Guest Name</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Guests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.listingId?.title || 'N/A'}</td>
                <td>{booking.listingId?.location || 'N/A'}</td>
                <td>{booking.guestName || 'N/A'}</td>
                <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                <td>{booking.numGuests || 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found for your listings.</p>
      )}
    </div>
  );
};

export default HostBookings;
 