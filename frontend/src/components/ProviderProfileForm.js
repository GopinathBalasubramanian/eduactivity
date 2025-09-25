import React, { useState } from 'react';
import axios from 'axios';

const ProviderProfileForm = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'education',
    subcategory: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    pricing_info: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/providers/my/', formData);
      onProfileCreated();
    } catch (error) {
      if (error.response?.data) {
        // Handle validation errors
        const errors = Object.values(error.response.data).flat();
        setError(errors.join(', '));
      } else {
        setError('Failed to create provider profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Provider Name *</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., John Doe Education Services"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Category *</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="education">Education</option>
            <option value="tutoring">Tutoring</option>
            <option value="coaching">Coaching</option>
            <option value="training">Training</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Subcategory</label>
        <input
          type="text"
          className="form-control"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleInputChange}
          placeholder="e.g., Mathematics, Science, Languages"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description *</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          placeholder="Describe your services and what makes you unique..."
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address *</label>
        <textarea
          className="form-control"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows="2"
          placeholder="Your business address"
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Contact Email</label>
          <input
            type="email"
            className="form-control"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleInputChange}
            placeholder="contact@example.com"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Contact Phone</label>
          <input
            type="tel"
            className="form-control"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Website</label>
        <input
          type="url"
          className="form-control"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          placeholder="https://www.example.com"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Pricing Information</label>
        <textarea
          className="form-control"
          name="pricing_info"
          value={formData.pricing_info}
          onChange={handleInputChange}
          rows="2"
          placeholder="General pricing information (optional)"
        />
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Creating Profile...
            </>
          ) : (
            'Create Provider Profile'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProviderProfileForm;
