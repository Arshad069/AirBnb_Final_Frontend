import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import HostDashboard from './Components/HostDashboard';
import ListingsPage from './Components/HomeListings';
import ListingDetailsPage from './Components/ListingDetailsPage';
import BookingPage from './Components/BookingPage';
import BookingList from './Components/BookingList';
import HostBookings from './Components/HostBookings';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/bookinglist" element={<BookingList />} />
        <Route path="/listing/:id" element={<ListingDetailsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/host/bookings" element={<HostBookings />} />
        <Route path="/hostdashboard" element={<HostDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
