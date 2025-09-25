import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(formData)).unwrap();
      console.log('Login successful:', result);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      // The error is already handled by the authSlice and displayed in the UI
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Sign In</h2>

              {error && (
                <div className="modern-error-message">
                  <div className="error-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div className="error-content">
                    <h6 className="error-title">Login Failed</h6>
                    <p className="error-text">
                      {typeof error === 'string'
                        ? error
                        : error?.error || error?.message || 'Please check your credentials and try again.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="error-close"
                    onClick={() => dispatch({ type: 'auth/clearError' })}
                    aria-label="Close error message"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="remember" />
                  <label className="form-check-label" htmlFor="remember">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link to="/password-reset" className="text-decoration-none">
                  Forgot your password?
                </Link>
              </div>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-2">Don't have an account?</p>
                <Link to="/register" className="btn btn-outline-primary">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
