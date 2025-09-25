import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="text-primary mb-3">EduActivity Finder</h5>
            <p>
              Connecting students and parents with the best educational institutions,
              tuition centers, teachers, and activity providers in their area.
            </p>
            <div className="social-links">
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
            <h6 className="mb-3">For Students</h6>
            <ul className="list-unstyled">
              <li><Link to="/search" className="text-light text-decoration-none">Find Providers</Link></li>
              <li><Link to="/categories" className="text-light text-decoration-none">Browse Categories</Link></li>
              <li><Link to="/reviews" className="text-light text-decoration-none">Read Reviews</Link></li>
              <li><Link to="/register" className="text-light text-decoration-none">Join Free</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
            <h6 className="mb-3">For Providers</h6>
            <ul className="list-unstyled">
              <li><Link to="/register" className="text-light text-decoration-none">List Your Business</Link></li>
              <li><Link to="/pricing" className="text-light text-decoration-none">Pricing</Link></li>
              <li><Link to="/dashboard" className="text-light text-decoration-none">Provider Dashboard</Link></li>
              <li><Link to="/support" className="text-light text-decoration-none">Support</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
            <h6 className="mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
              <li><Link to="/careers" className="text-light text-decoration-none">Careers</Link></li>
              <li><Link to="/press" className="text-light text-decoration-none">Press</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4 mb-4">
            <h6 className="mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><Link to="/help" className="text-light text-decoration-none">Help Center</Link></li>
              <li><Link to="/privacy" className="text-light text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-light text-decoration-none">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-light text-decoration-none">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">&copy; 2025 EduActivity Finder. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <small className="text-muted">
              Made with ❤️ for better education
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
