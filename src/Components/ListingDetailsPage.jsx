import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/ListingDetailsPg.css';
import { FaMedal, FaHome, FaDoorOpen, FaToilet } from 'react-icons/fa';

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

      <div className="details-header">
        <h2 className="listing-title">{listing.title}</h2>
        <p className="listing-type">1 bedroom · Shared bathroom</p>
      </div>

      <div className="listing-meta">
        <div className="listing-meta-item">
          <span className="icon">🏆</span>
          <p>Highly preferred by guests</p>
        </div>
        <div className="listing-meta-item">
          <span className="icon">🏋️</span>
          <p>Among the most recommended stays on Airbnb</p>
        </div>
        <div className="listing-meta-item">
          <p className="rating">4.85 <span className="star">⭐</span></p>
          <p className="reviews">(98 Reviews)</p>
        </div>
      </div>

      <div className="host-info">
        <div className="host-image"></div>
        <div className="host-details">
          <p className="host-name">Your Host</p>
          <p className="host-status">Superhost · Over 2 years of hosting experience</p>
        </div>
      </div>

      <div className="listing-features">
        <div className="feature">
          <FaMedal className="icon" />
          <div className="feature-text">
            <p className="feature-title">Exceptional Property</p>
            <p className="feature-description">Rated highly for cleanliness, comfort, and service quality.</p>
          </div>
        </div>

        <div className="feature">
          <FaHome className="icon" />
          <div className="feature-text">
            <p className="feature-title">Private Accommodation</p>
            <p className="feature-description">Enjoy a private bedroom with access to shared spaces.</p>
          </div>
        </div>

        <div className="feature">
          <FaDoorOpen className="icon" />
          <div className="feature-text">
            <p className="feature-title">Shared Common Areas</p>
            <p className="feature-description">Communal spaces like the living room and kitchen are shared.</p>
          </div>
        </div>

        <div className="feature">
          <FaToilet className="icon" />
          <div className="feature-text">
            <p className="feature-title">Shared Washroom</p>
            <p className="feature-description">Bathroom facilities are shared with other guests.</p>
          </div>
        </div>
      </div>

      <div className="about-place">
        <h3 className="about-title">Details about the Property</h3>
        <p className="about-description">
          Located in the city center, this cozy private room offers a comfortable stay with easy access to public transportation and major attractions. Guests can enjoy shared areas such as the kitchen and living space. Ideal for solo travelers or couples looking for an affordable yet stylish stay.
        </p>
      </div>

      {isGuest && (
        <Link to={`/book/${listing._id}`}>
          <button className="book-now-button">Book Now</button>
        </Link>
      )}
    </div>
  );
};

export default ListingDetailsPage;
