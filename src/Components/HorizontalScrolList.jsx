import React from 'react';
import { FaTree, FaStar, FaMoneyBillAlt, FaDog, FaCoffee, FaMountain, FaHeart, FaSwimmer, FaFire } from 'react-icons/fa';
import { MdOutlineBeachAccess, MdOutlineNature, MdOutlineStar, MdOutlineAttachMoney, MdOutlineGroup, MdOutlinePets, MdOutlineLocalCafe, MdOutlineHome, MdOutlinePool, MdOutlineSnowboarding, MdOutlineHiking, MdOutlineFlight, MdOutlineLocalDining, MdOutlineBusinessCenter, MdOutlineFitnessCenter } from 'react-icons/md';
import '../Styles/HorizontalScrolList.css';

const categories = [
    { name: 'All', category: '', icon: <MdOutlineHome className='icon' /> },
    { name: 'Beachfront', category: 'Beachfront', icon: <MdOutlineBeachAccess className='icon' /> },
    { name: 'Cabins', category: 'Cabins', icon: <FaTree className='icon' /> },
    { name: 'Trending', category: 'Trending', icon: <MdOutlineStar className='icon' /> },
    { name: 'Luxury', category: 'Luxury', icon: <FaMoneyBillAlt className='icon' /> },
    { name: 'Budget', category: 'Budget', icon: <MdOutlineAttachMoney className='icon' /> },
    { name: 'Family', category: 'Family-Friendly', icon: <MdOutlineGroup className='icon' /> },
    { name: 'Farms', category: 'Pet-Friendly', icon: <MdOutlinePets className='icon' /> },
    { name: 'Unique', category: 'Unique Stays', icon: <MdOutlineLocalCafe className='icon' /> },
    { name: 'Romantic', category: 'Romantic Getaways', icon: <MdOutlineNature className='icon' /> },
    { name: 'Adventure', category: 'Adventure', icon: <FaMountain className='icon' /> },
    { name: 'Swimming', category: 'Swimming', icon: <MdOutlinePool className='icon' /> },
    { name: 'Camping', category: 'Camping', icon: <FaFire className='icon' /> },
    { name: 'Skiing', category: 'Skiing', icon: <MdOutlineSnowboarding className='icon' /> },
    { name: 'Hiking', category: 'Hiking', icon: <MdOutlineHiking className='icon' /> },
    { name: 'Flights', category: 'Flights', icon: <MdOutlineFlight className='icon' /> },
    { name: 'Dining', category: 'Dining', icon: <MdOutlineLocalDining className='icon' /> },
    { name: 'Business', category: 'Business', icon: <MdOutlineBusinessCenter className='icon' /> },
    { name: 'Fitness', category: 'Fitness', icon: <MdOutlineFitnessCenter className='icon' /> },
    { name: 'Wildlife', category: 'Wildlife', icon: <FaDog className='icon' /> },
    { name: 'Relaxation', category: 'Relaxation', icon: <FaCoffee className='icon' /> },
    { name: 'Culture', category: 'Culture', icon: <FaStar className='icon' /> },
    { name: 'Wellness', category: 'Wellness', icon: <FaHeart className='icon' /> },
    { name: 'New', category: 'New', icon: <FaSwimmer className='icon' /> },
];

const HorizontalScrollList = ({ setCategory }) => {
    return (
        <div className="horizontal-scroll-container">
            <div className="scroll-wrapper">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setCategory(category.category)}
                        className="category-button"
                    >
                        {category.icon}
                        <p className="category-name">{category.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HorizontalScrollList;
