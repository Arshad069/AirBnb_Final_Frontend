import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/ListingDetailsPg.css'

const ListingDetailsPage = () => {
  const [listing, setListing] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
      setListing(res.data);
    };

    const role = localStorage.getItem('role');
    setIsGuest(role === 'Guest');

    fetchListing();
  }, [id]);

  if (!listing) return <div className="loading">Loading...</div>;

  return (
    <div className="listing-details-container">
      <h1 className="listing-title">{listing.title}</h1>
      <img 
        src={`http://localhost:5000/${listing.images[0]}`} 
        className="listing-image" 
        alt={listing.title} 
      />
      <p className="listing-description">{listing.description}</p>
      <p className="listing-location">Location: {listing.location}</p>
      <p className="listing-price">Price: {listing.price} per night</p>

      {isGuest && (
        <Link to={`/book/${listing._id}`}>
          <button className="book-now-button">Book Now</button>
        </Link>
      )}
    </div>
  );
};

export default ListingDetailsPage;
