import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);
  const [showServices, setShowServices] = useState(false);

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

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Left Side - Branding */}
          <div className="col-lg-6 d-none d-lg-flex bg-primary align-items-center justify-content-center">
            <div className="text-center text-white p-5">
              <h1 className="display-4 fw-bold mb-4">School & Coaching Connect</h1>
              <p className="lead">Connecting students with the best educational opportunities</p>
              <div className="mt-5">
                <i className="fas fa-graduation-cap fs-1 mb-3"></i>
                <p className="mt-3">Join thousands of students finding their perfect educational partners</p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center py-5">
            <div className="w-100" style={{maxWidth: '400px'}}>
              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary mb-2">Welcome to School and Coaching Connect</h2>
                <p className="text-muted small">Sign in or create an account to manage your academic journey</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  <div>
                    <strong>Login Failed</strong>
                    <br />
                    <small>
                      {typeof error === 'string'
                        ? error
                        : error?.error || error?.message || 'Please check your credentials and try again.'}
                    </small>
                  </div>
                  <button
                    type="button"
                    className="btn-close ms-auto"
                    onClick={() => dispatch({ type: 'auth/clearError' })}
                    aria-label="Close error message"
                  ></button>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <Link to="/password-reset" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Social Login Buttons */}
              <div className="text-center mb-4">
                <p className="text-muted mb-3">Or continue with</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleSocialLogin('facebook')}
                  >
                    <i className="fab fa-facebook-f me-2"></i>Facebook
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleSocialLogin('google')}
                  >
                    <i className="fab fa-google me-2"></i>Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => handleSocialLogin('instagram')}
                  >
                    <i className="fab fa-instagram me-2"></i>Instagram
                  </button>
                </div>
              </div>

              {/* Service Provider Section */}
              <div className="text-center mb-4">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0"
                  onClick={() => setShowServices(!showServices)}
                >
                  Are you a service provider? Subscribe here
                </button>

                {showServices && (
                  <div className="mt-3 p-3 border rounded bg-light">
                    <h6 className="fw-bold mb-3">Our Services</h6>
                    <div className="row g-2 text-start">
                      <div className="col-6">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="schools" />
                          <label className="form-check-label" htmlFor="schools">
                            Schools
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="coaching" />
                          <label className="form-check-label" htmlFor="coaching">
                            Coaching Centers
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="sports" />
                          <label className="form-check-label" htmlFor="sports">
                            Sports Academics
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="art-music" />
                          <label className="form-check-label" htmlFor="art-music">
                            Art & Music
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="home-tuition" />
                          <label className="form-check-label" htmlFor="home-tuition">
                            Home Tuitions
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="online-courses" />
                          <label className="form-check-label" htmlFor="online-courses">
                            Online Courses
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary mt-2"
                      onClick={() => setShowServices(false)}
                    >
                      Subscribe to Selected Services
                    </button>
                  </div>
                )}
              </div>

              <hr className="my-4" />

              {/* Sign Up Link */}
              <div className="text-center mb-4">
                <p className="mb-2">Don't have an account?</p>
                <Link to="/register" className="btn btn-outline-primary btn-lg">
                  Create Account
                </Link>
              </div>

              {/* Back to Home */}
              <div className="text-center">
                <Link to="/" className="btn btn-link text-decoration-none">
                  <i className="fas fa-arrow-left me-2"></i>Back to Home
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
