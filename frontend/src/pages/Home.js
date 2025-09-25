import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProviders } from '../features/providersSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { providers, loading } = useSelector(state => state.providers);

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6 fade-in-up">
              <h2 className="mb-4">
                Find the Perfect
                <span className="d-block text-warning">Educational & Activity</span>
                Provider
              </h2>
              <p className="lead mb-4">
                Connect with schools, tuition centers, teachers, and sports coaches
                in your area. Read reviews, compare options, and book with confidence.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/search" className="btn btn-light btn-lg">
                  <i className="fas fa-search me-2"></i>
                  Start Searching
                </Link>
                <Link to="/register" className="btn btn-light btn-lg">
                  <i className="fas fa-user-plus me-2"></i>
                  Join as Provider
                </Link>
              </div>
              <div className="mt-4">
                <small className="text-light opacity-200">
                  <i className="fas fa-star text-warning me-1"></i>
                  Trusted by 10,000+ families • 500+ verified providers
                </small>
              </div>
            </div>
            <div className="col-lg-6 fade-in-up">
              <div className="hero-image position-relative">
                <img
                  src="/image/happy.webp"
                  alt="Happy students learning"
                  className="img-fluid"
                />
                <div className="position-absolute top-0 end-0 bg-white rounded-circle p-3 shadow">
                  <i className="fas fa-graduation-cap text-primary fs-4"></i>
                </div>
                <div className="position-absolute bottom-0 start-0 bg-primary text-white rounded-pill px-3 py-2 shadow">
                  <small><i className="fas fa-users me-1"></i>10K+ Students</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Popular Categories */}
      <section className="categories py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3 text-primary">Popular Categories</h2>
            <p className="text-muted">Discover providers in your favorite categories</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6 mb-4">
              <Link to="/search?category=education" className="text-decoration-none">
                <div className="category-card position-relative overflow-hidden rounded-3 shadow-sm" style={{minHeight: '280px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                  <div className="card-img-overlay d-flex flex-column justify-content-between p-4 text-white">
                    <div className="category-icon text-center mb-3">
                      <i className="fas fa-graduation-cap fs-1 mb-3"></i>
                      <h4 className="card-title fw-bold mb-2">Education</h4>
                    </div>
                    <div className="category-content">
                      <p className="card-text mb-3 opacity-75">Schools, tuition centers, NEET/JEE coaching</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge bg-white bg-opacity-25 px-3 py-2">
                          <i className="fas fa-arrow-right me-2"></i>Explore
                        </span>
                        <small className="opacity-75">500+ Providers</small>
                      </div>
                    </div>
                  </div>
                  <div className="position-absolute top-0 end-0 m-3">
                    <div className="bg-white bg-opacity-25 rounded-circle p-2">
                      <i className="fas fa-book text-white"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <Link to="/search?category=sports" className="text-decoration-none">
                <div className="category-card position-relative overflow-hidden rounded-3 shadow-sm" style={{minHeight: '280px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                  <div className="card-img-overlay d-flex flex-column justify-content-between p-4 text-white">
                    <div className="category-icon text-center mb-3">
                      <i className="fas fa-running fs-1 mb-3"></i>
                      <h4 className="card-title fw-bold mb-2">Sports</h4>
                    </div>
                    <div className="category-content">
                      <p className="card-text mb-3 opacity-75">Badminton, cricket, swimming, yoga</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge bg-white bg-opacity-25 px-3 py-2">
                          <i className="fas fa-arrow-right me-2"></i>Explore
                        </span>
                        <small className="opacity-75">300+ Providers</small>
                      </div>
                    </div>
                  </div>
                  <div className="position-absolute top-0 end-0 m-3">
                    <div className="bg-white bg-opacity-25 rounded-circle p-2">
                      <i className="fas fa-futbol text-white"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <Link to="/search?category=music" className="text-decoration-none">
                <div className="category-card position-relative overflow-hidden rounded-3 shadow-sm" style={{minHeight: '280px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
                  <div className="card-img-overlay d-flex flex-column justify-content-between p-4 text-white">
                    <div className="category-icon text-center mb-3">
                      <i className="fas fa-music fs-1 mb-3"></i>
                      <h4 className="card-title fw-bold mb-2">Music</h4>
                    </div>
                    <div className="category-content">
                      <p className="card-text mb-3 opacity-75">Piano, guitar, violin lessons</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge bg-white bg-opacity-25 px-3 py-2">
                          <i className="fas fa-arrow-right me-2"></i>Explore
                        </span>
                        <small className="opacity-75">200+ Providers</small>
                      </div>
                    </div>
                  </div>
                  <div className="position-absolute top-0 end-0 m-3">
                    <div className="bg-white bg-opacity-25 rounded-circle p-2">
                      <i className="fas fa-guitar text-white"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <Link to="/search?category=arts" className="text-decoration-none">
                <div className="category-card position-relative overflow-hidden rounded-3 shadow-sm" style={{minHeight: '280px', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}}>
                  <div className="card-img-overlay d-flex flex-column justify-content-between p-4 text-white">
                    <div className="category-icon text-center mb-3">
                      <i className="fas fa-palette fs-1 mb-3"></i>
                      <h4 className="card-title fw-bold mb-2">Arts</h4>
                    </div>
                    <div className="category-content">
                      <p className="card-text mb-3 opacity-75">Drawing, painting, dance classes</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="badge bg-white bg-opacity-25 px-3 py-2">
                          <i className="fas fa-arrow-right me-2"></i>Explore
                        </span>
                        <small className="opacity-75">150+ Providers</small>
                      </div>
                    </div>
                  </div>
                  <div className="position-absolute top-0 end-0 m-3">
                    <div className="bg-white bg-opacity-25 rounded-circle p-2">
                      <i className="fas fa-palette text-white"></i>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="featured-providers py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">Featured Providers</h2>
            <p className="text-muted">Meet some of our top-rated educational providers</p>
          </div>
          {loading ? (
            <div className="text-center py-5">
              <div className="loading mb-3"></div>
              <p className="text-muted">Loading featured providers...</p>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {providers.slice(0, 6).map((provider, index) => (
                  <div key={provider.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-img-container" style={{height: '200px', overflow: 'hidden', borderRadius: '0.375rem 0.375rem 0 0'}}>
                        <img
                          src={`/image/provider-${index + 1}.jpg`}
                          alt={`${provider.name} - ${provider.category}`}
                          className="card-img-top w-100 h-100"
                          style={{objectFit: 'cover'}}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = `
                              <div class="d-flex align-items-center justify-content-center h-100 bg-light">
                                <div class="text-center">
                                  <i class="fas fa-graduation-cap fs-1 text-primary mb-2"></i>
                                  <p class="text-muted small mb-0">${provider.category}</p>
                                </div>
                              </div>
                            `;
                          }}
                        />
                      </div>
                      <div className="card-body text-center p-4">
                        <h5 className="card-title fw-bold mb-2">{provider.name}</h5>
                        <div className="mb-2">
                          <span className="badge bg-primary me-2">{provider.category}</span>
                          {provider.subcategory && (
                            <span className="badge bg-light text-dark">{provider.subcategory}</span>
                          )}
                        </div>
                        <p className="card-text text-muted mb-3" style={{minHeight: '3rem'}}>
                          {provider.description ? provider.description.substring(0, 80) + '...' : 'Professional educational services'}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <small className="text-muted">
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {provider.address || 'Location not specified'}
                          </small>
                          <div className="rating">
                            <i className="fas fa-star text-warning"></i>
                            <small className="ms-1 text-muted">4.5</small>
                          </div>
                        </div>
                        <Link to={`/provider/${provider.id}`} className="btn btn-primary w-100">
                          <i className="fas fa-eye me-2"></i>View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-5">
                <Link to="/search" className="btn btn-primary btn-lg px-5 py-3">
                  <i className="fas fa-search me-2"></i>Browse All Providers
                  <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Join thousands of parents and students finding the perfect educational partners.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-light btn-lg">
              Sign Up Free
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
