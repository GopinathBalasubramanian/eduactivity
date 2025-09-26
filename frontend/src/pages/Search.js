import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProviders } from '../features/providersSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { providers, loading, error } = useSelector(state => state.providers);

  const [localFilters, setLocalFilters] = useState({
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    location: searchParams.get('location') || '',
    min_rating: searchParams.get('min_rating') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'relevance',
  });

  useEffect(() => {
    // Load initial results
    dispatch(fetchProviders());
  }, [dispatch]);

  useEffect(() => {
    // Trigger search when filters change
    const filters = {
      q: localFilters.q,
      category: localFilters.category,
      subcategory: localFilters.subcategory,
      location: localFilters.location,
      min_rating: localFilters.min_rating,
      maxPrice: localFilters.maxPrice,
      sort: localFilters.sort,
    };
    dispatch(fetchProviders(filters));
  }, [localFilters, dispatch]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      q: '',
      category: '',
      subcategory: '',
      location: '',
      min_rating: '',
      maxPrice: '',
      sort: 'relevance',
    };
    setLocalFilters(clearedFilters);
    setSearchParams({});
    // Trigger search with cleared filters
    dispatch(fetchProviders(clearedFilters));
  };

  return (
    <div className="search-page container-fluid">
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 col-md-4">
          <div className="filters-sidebar bg-light p-4 rounded">
            <h5 className="mb-4">Filters</h5>

            {/* Search Query */}
            <div className="mb-3">
              <label className="form-label">Search</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search providers..."
                  value={localFilters.q}
                  onChange={(e) => handleFilterChange('q', e.target.value)}
                />
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => dispatch(fetchProviders(localFilters))}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="education">Education</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="arts">Arts</option>
              </select>
            </div>

            {/* Subcategory */}
            <div className="mb-3">
              <label className="form-label">Subcategory</label>
              <select
                className="form-select"
                value={localFilters.subcategory}
                onChange={(e) => handleFilterChange('subcategory', e.target.value)}
              >
                <option value="">All Subcategories</option>
                <option value="NEET">NEET</option>
                <option value="JEE">JEE</option>
                <option value="swimming">Swimming</option>
                <option value="badminton">Badminton</option>
                <option value="piano">Piano</option>
                <option value="drawing">Drawing</option>
              </select>
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="City, State"
                value={localFilters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>

            {/* Rating Filter */}
            <div className="mb-3">
              <label className="form-label">
                <i className="fas fa-star text-warning me-1"></i>Rating
              </label>
              <select
                className="form-select"
                value={localFilters.min_rating || ''}
                onChange={(e) => handleFilterChange('min_rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value="4">⭐⭐⭐⭐ 4+ Stars</option>
                <option value="3">⭐⭐⭐ 3+ Stars</option>
                <option value="2">⭐⭐ 2+ Stars</option>
                <option value="1">⭐ 1+ Stars</option>
              </select>
              <div className="form-text">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Filter by minimum star rating
                </small>
              </div>
            </div>

            {/* Sort */}
            <div className="mb-3">
              <label className="form-label">Sort By</label>
              <select
                className="form-select"
                value={localFilters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="d-grid gap-2">
              <button className="btn btn-outline-secondary" onClick={handleClearFilters}>
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-lg-9 col-md-8">
          <div className="results-section">
            {/* Results Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>
                {loading ? 'Searching...' : `${providers.length} Results Found`}
              </h4>
              <div className="view-toggle">
                <button className="btn btn-outline-primary me-2">
                  <i className="fas fa-list"></i> List
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fas fa-map"></i> Map
                </button>
              </div>
            </div>



            {/* Loading */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {!loading && providers.length > 0 && (
              <div className="row">
                {providers.map((provider) => (
                  <div key={provider.id} className="col-lg-6 mb-4">
                    <div className="card h-100">
                      {/* Provider Image */}
                      <div className="card-img-top bg-light d-flex align-items-center justify-content-center"
                           style={{ height: '120px' }}>
                        {provider.photos && provider.photos.length > 0 ? (
                          <img
                            src={provider.photos.find(p => p.is_primary)?.photo_url || provider.photos[0].photo_url}
                            alt={provider.name}
                            className="img-fluid"
                            style={{ maxHeight: '100%', maxWidth: '100%' }}
                          />
                        ) : (
                          <div className="text-muted">
                            <i className="fas fa-image fa-2x"></i>
                            <p className="small mb-0">No Image</p>
                          </div>
                        )}
                      </div>

                      <div className="card-body p-2">
                        <h6 className="card-title mb-1">{provider.name}</h6>
                        <p className="card-text text-muted small mb-1">
                          {provider.category} • {provider.subcategory || 'General'}
                        </p>
                        <p className="card-text small mb-1">
                          <i className="fas fa-map-marker-alt text-muted me-1"></i>
                          <small>{provider.address}</small>
                        </p>

                        {/* Rating */}
                        <div className="mb-2">
                          <span className="badge bg-warning text-dark me-2">
                            <i className="fas fa-star"></i> {provider.average_rating || 'N/A'}
                          </span>
                          <small className="text-muted">
                            ({provider.review_count || 0} reviews)
                          </small>
                        </div>

                        {/* Services */}
                        {provider.services && provider.services.length > 0 && (
                          <div className="mb-2">
                            <small className="text-muted fw-bold">Services:</small>
                            <div className="mt-1">
                              {provider.services.slice(0, 2).map(service => (
                                <span key={service.id} className="badge bg-light text-dark me-1 mb-1">
                                  {service.name}
                                </span>
                              ))}
                              {provider.services.length > 2 && (
                                <span className="badge bg-light text-dark">
                                  +{provider.services.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Pricing */}
                        {provider.pricing_info && (
                          <p className="text-primary fw-bold mb-2">
                            {provider.pricing_info}
                          </p>
                        )}
                      </div>

                      <div className="card-footer bg-transparent p-2">
                        <div className="d-flex justify-content-between gap-1">
                          <button className="btn btn-outline-primary btn-sm px-2 py-1">
                            Details
                          </button>
                          <button className="btn btn-primary btn-sm px-2 py-1">
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && providers.length === 0 && !error && (
              <div className="text-center py-5">
                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                <h5>No providers found</h5>
                <p className="text-muted">Try adjusting your search criteria</p>
              </div>
            )}

            {/* Pagination */}
            {providers.length > 0 ? (
              <nav aria-label="Search results pagination" className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className="page-item active">
                    <span className="page-link">1</span>
                  </li>
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
