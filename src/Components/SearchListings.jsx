import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/SearchListings.css'; // Importing the CSS file

const SearchListings = () => {
    const [listings, setListings] = useState([]);
    const [searchParams, setSearchParams] = useState({ location: '', title: '' });

    const fetchListings = async () => {
        try {
            const query = new URLSearchParams(searchParams).toString();
            const res = await axios.get(`http://localhost:5000/api/filter-listings?${query}`);
            setListings(res.data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const handleSearch = () => {
        fetchListings();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="search-listings-container">
            <h1 className="search-listings-title">All Listings</h1>

            {/* Search Bar */}
            <div className="search-listings-bar">
                <input
                    type="text"
                    name="location"
                    placeholder="Search by location"
                    value={searchParams.location}
                    onChange={handleChange}
                    className="search-listings-input"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Search by title"
                    value={searchParams.title}
                    onChange={handleChange}
                    className="search-listings-input"
                />
                <button onClick={handleSearch} className="search-listings-button">Search</button>
            </div>

            {/* Listings */}
            <div className="search-listings-grid">
                {listings.map((listing) => (
                    <div key={listing._id} className="search-listings-card">
                        <img
                            src={`http://localhost:5000/${listing.images[0]}`}
                            className="search-listings-image"
                            alt="Listing"
                        />
                        <h3 className="search-listings-card-title">{listing.title}</h3>
                        <p className="search-listings-card-location">{listing.location}</p>
                        <p className="search-listings-card-price">{listing.price} per night</p>
                        <Link to={`/listing/${listing._id}`} className="search-listings-details-link">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchListings;
