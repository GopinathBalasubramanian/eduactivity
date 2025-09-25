import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light container py-3">
        <Link className="navbar-brand fw-bold" to="/" onClick={() => setIsMenuOpen(false)}>
          EduActivity Finder
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav w-100 justify-content-center">
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-4 py-2" to="/" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-home me-2"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-4 py-2" to="/search" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-search me-2"></i>Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-4 py-2" to="/categories" onClick={() => setIsMenuOpen(false)}>
                <i className="fas fa-th-large me-2"></i>Categories
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-4 py-2" to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-user-circle me-2"></i>Profile
                  </Link>
                </li>
                {user?.user_type === 'provider' && (
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold px-4 py-2" to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                    </Link>
                  </li>
                )}
                {user?.user_type === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold px-4 py-2" to="/admin" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-cog me-2"></i>Admin Panel
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="nav-link fw-semibold px-4 py-2 border-0 bg-transparent text-danger" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-4 py-2" to="/login" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-4 py-2" to="/register" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-user-plus me-2"></i>Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
