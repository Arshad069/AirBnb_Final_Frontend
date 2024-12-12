import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HorizontalScrollList from './HorizontalScrolList';
import '../Styles/HomeListing.css'; // Import the CSS for styling

const HomeListing = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/listings');
        setListings(res.data);
        setFilteredListings(res.data); // Initialize filtered listings
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  // Filter listings when the category changes
  useEffect(() => {
    if (category === '' || category === 'All') {
      setFilteredListings(listings); // Show all listings for the default category
    } else {
      const filtered = listings.filter((listing) =>
        listing.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredListings(filtered);
    }
  }, [category, listings]);

  return (
    <div className="home-listing-container">
      {/* Horizontal Scroll List */}
      <HorizontalScrollList setCategory={setCategory} />

      {/* Listings */}
      <div className="listings-container">
        <h1 className="listings-title">{category || 'All Listings'}</h1>
        <div className="listing-grid">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div key={listing._id} className="listing-card">
                <img
                  src={`http://localhost:5000/${listing.images[0]}`}
                  className="image-listing"
                  alt={listing.title}
                />
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-location">{listing.location}</p>
                <p className="listing-price">{listing.price} per night</p>
                <Link to={`/listing/${listing._id}`} className="details-link">
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>No listings found for the selected category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeListing;
