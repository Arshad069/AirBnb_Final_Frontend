import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/HomeListing.css'; // Importing the CSS file

const ListingsPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/listings');
        setListings(res.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="listings-container">
      <h1 className="listings-title">All Listings</h1>
      <div className="listing-grid">
        {listings.map((listing) => (
          <div key={listing._id} className="listing-card">
            <img 
              src={`http://localhost:5000/${listing.images[0]}`} 
              className="image-listing" 
              alt={listing.title} 
            />
            <h3 className="listing-title">{listing.title}</h3>
            <p className="listing-location">{listing.location}</p>
            <p className="listing-price">{listing.price} per night</p>
            <Link to={`/listing/${listing._id}`} className="details-link">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
