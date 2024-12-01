import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/BookingList.css';
const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const res = await axios.get('http://localhost:5000/api/bookings/get-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        setError('Failed to fetch bookings');
      }
    };

    fetchBookings();
  }, []);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="booking-container">
      <h2 className="booking-title">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings found.</p>
      ) : (
        <div className="booking-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-item">
              <h3 className="booking-item-title">{booking.listingId.title}</h3>
              <img 
                src={`http://localhost:5000/${booking.listingId.images[0]}`} 
                className="image-listing" 
                alt={booking.listingId.title} 
              />
              <p className="booking-location">Location: {booking.listingId.location}</p>
              <p className="booking-price">Price: {booking.listingId.price} per night</p>
              <p className="booking-dates">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
              <p className="booking-dates">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
              <p className="booking-total">Total Price: {booking.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
