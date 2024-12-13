import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import '../Styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-section">
                <div>
                    <h5>Airbnb</h5>
                    <ul>
                        <li><a href="#!">About Us</a></li>
                        <li><a href="#!">Become a Host</a></li>
                        <li><a href="#!">Host your home</a></li>
                        <li><a href="#!">Host an Online Experience</a></li>
                        <li><a href="#!">Resource Center</a></li>
                        <li><a href="#!">Careers</a></li>
                        <li><a href="#!">Privacy</a></li>
                        <li><a href="#!">Terms</a></li>
                        <li><a href="#!">Help</a></li>
                    </ul>
                </div>

                <div>
                    <h5>Support</h5>
                    <ul>
                        <li><a href="#!">Help Center</a></li>
                        <li><a href="#!">Cancellation Options</a></li>
                        <li><a href="#!">Trust & Safety</a></li>
                        <li><a href="#!">Accessibility</a></li>
                    </ul>
                </div>

                <div>
                    <h5>Community</h5>
                    <ul>
                        <li><a href="#!">Diversity & Belonging</a></li>
                        <li><a href="#!">Airbnb.org</a></li>
                        <li><a href="#!">Community Center</a></li>
                        <li><a href="#!">Neighborhood Support</a></li>
                    </ul>
                </div>
            </div>

            <div className="divider"></div>

            <div className="footer-bottom">
                <div>
                    <p>© 2024 Airbnb, Inc.</p>
                    <div className="footer-links">
                        <p><span></span>Term</p>
                        <p><span></span>Sitemap</p>
                        <p><span></span>Privacy</p>
                        <p><span></span>Your Privacy Choices</p>
                    </div>
                </div>

                <div className="social-icons">
                    <a href="https://www.facebook.com/profile.php?id=100069413407558" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                    <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://www.instagram.com/arshadali2156/?hl=en" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a href="https://www.linkedin.com/in/arshad-ali-93b2ba304/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                </div>

            </div>

        </footer>
    );
};

export default Footer;



