import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProviders } from '../features/providersSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const { providers, loading } = useSelector(state => state.providers);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    dispatch(fetchProviders());
  }, [dispatch]);

  // Group providers by category
  const groupProvidersByCategory = (providers) => {
    const grouped = {
      education: [],
      sports: [],
      music: [],
      arts: [],
      other: []
    };

    providers.forEach(provider => {
      const category = provider.category?.toLowerCase() || 'other';
      if (grouped[category]) {
        grouped[category].push(provider);
      } else {
        grouped.other.push(provider);
      }
    });

    return grouped;
  };

  const groupedProviders = groupProvidersByCategory(providers);
  const categories = [
    { key: 'all', name: 'All Categories', icon: 'fas fa-th-large', color: 'primary', count: providers.length },
    { key: 'education', name: 'Education', icon: 'fas fa-graduation-cap', color: 'primary', count: groupedProviders.education.length },
    { key: 'sports', name: 'Sports', icon: 'fas fa-running', color: 'success', count: groupedProviders.sports.length },
    { key: 'music', name: 'Music', icon: 'fas fa-music', color: 'warning', count: groupedProviders.music.length },
    { key: 'arts', name: 'Arts', icon: 'fas fa-palette', color: 'danger', count: groupedProviders.arts.length },
  ];

  const getFilteredProviders = () => {
    if (selectedCategory === 'all') return providers;
    return groupedProviders[selectedCategory] || [];
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      education: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      sports: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      music: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      arts: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      other: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    };
    return gradients[category] || gradients.other;
  };

  const renderProviderCard = (provider, index) => (
    <div key={provider.id} className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 border-0 shadow-sm hover-lift">
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
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold mb-0">{provider.name}</h5>
            <span className={`badge bg-${provider.category === 'education' ? 'primary' : provider.category === 'sports' ? 'success' : provider.category === 'music' ? 'warning' : 'danger'}`}>
              {provider.category}
            </span>
          </div>
          {provider.subcategory && (
            <p className="text-muted small mb-2">
              <i className="fas fa-tag me-1"></i>{provider.subcategory}
            </p>
          )}
          <p className="card-text text-muted mb-3" style={{minHeight: '3rem'}}>
            {provider.description ? provider.description.substring(0, 100) + '...' : 'Professional educational services'}
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
  );

  return (
    <div className="categories-page">
      {/* Header Section */}
      <section className="page-header bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="mb-3">Browse Categories</h1>
              <p className="lead mb-0">
                Discover educational providers organized by categories. Find the perfect match for your learning needs.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="stats">
                <div className="stat-item mb-2">
                  <span className="badge bg-white text-primary px-3 py-2 fs-6">
                    <i className="fas fa-users me-2"></i>{providers.length} Providers
                  </span>
                </div>
                <div className="stat-item">
                  <span className="badge bg-white bg-opacity-25 text-white px-3 py-2 fs-6">
                    <i className="fas fa-th-large me-2"></i>{categories.length - 1} Categories
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="category-filters py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    className={`btn ${selectedCategory === category.key ? `btn-${category.color}` : 'btn-outline-secondary'} px-4 py-2`}
                    onClick={() => setSelectedCategory(category.key)}
                  >
                    <i className={`${category.icon} me-2`}></i>
                    {category.name}
                    <span className="badge bg-white bg-opacity-25 ms-2">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content py-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="loading mb-3"></div>
              <p className="text-muted">Loading providers...</p>
            </div>
          ) : (
            <>
              {/* Category Sections */}
              {selectedCategory === 'all' ? (
                // Show all categories with their providers
                categories.slice(1).map((category) => {
                  const categoryProviders = groupedProviders[category.key];
                  if (categoryProviders.length === 0) return null;

                  return (
                    <div key={category.key} className="category-section mb-5">
                      <div className="category-header mb-4">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div
                              className="category-icon me-3"
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: getCategoryGradient(category.key),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <i className={`${category.icon} text-white fs-5`}></i>
                            </div>
                            <div>
                              <h3 className="mb-1">{category.name}</h3>
                              <p className="text-muted mb-0">{category.count} providers available</p>
                            </div>
                          </div>
                          <Link to={`/search?category=${category.key}`} className={`btn btn-outline-${category.color}`}>
                            View All <i className="fas fa-arrow-right ms-2"></i>
                          </Link>
                        </div>
                      </div>

                      <div className="row g-4">
                        {categoryProviders.slice(0, 3).map((provider, index) =>
                          renderProviderCard(provider, index)
                        )}
                      </div>

                      {categoryProviders.length > 3 && (
                        <div className="text-center mt-4">
                          <Link to={`/search?category=${category.key}`} className={`btn btn-${category.color}`}>
                            View All {category.count} {category.name} Providers
                            <i className="fas fa-arrow-right ms-2"></i>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                // Show providers for selected category
                <div className="selected-category-section">
                  <div className="category-header mb-4">
                    <div className="d-flex align-items-center">
                      <div
                        className="category-icon me-3"
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: getCategoryGradient(selectedCategory),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <i className={`${categories.find(c => c.key === selectedCategory)?.icon} text-white fs-5`}></i>
                      </div>
                      <div>
                        <h3 className="mb-1">
                          {categories.find(c => c.key === selectedCategory)?.name}
                        </h3>
                        <p className="text-muted mb-0">
                          {getFilteredProviders().length} providers available
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row g-4">
                    {getFilteredProviders().map((provider, index) =>
                      renderProviderCard(provider, index)
                    )}
                  </div>
                </div>
              )}
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
            <Link to="/search" className="btn btn-outline-light btn-lg">
              Browse All Providers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
