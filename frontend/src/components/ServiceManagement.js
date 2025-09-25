import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ensure services is always an array
  const safeServices = Array.isArray(services) ? services : [];
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [pricingData, setPricingData] = useState([]);
  const [editingPricing, setEditingPricing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    service_type: 'individual',
    duration_hours: 1,
    duration_minutes: 0,
    max_participants: 1
  });
  const [pricingFormData, setPricingFormData] = useState({
    pricing_type: 'per_session',
    price: '',
    currency: 'INR',
    description: '',
    min_sessions: 1,
    max_sessions: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/providers/services/');
      console.log('Services API response:', response.data);
      // Ensure we always set an array
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setServices([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await axios.put(`/api/providers/services/${editingService.id}/`, formData);
      } else {
        await axios.post('/api/providers/services/', formData);
      }
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      service_type: service.service_type,
      duration_hours: service.duration_hours,
      duration_minutes: service.duration_minutes,
      max_participants: service.max_participants
    });
    setShowAddService(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/providers/services/${serviceId}/`);
        fetchServices();
      } catch (error) {
        console.error('Failed to delete service:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      service_type: 'individual',
      duration_hours: 1,
      duration_minutes: 0,
      max_participants: 1
    });
    setEditingService(null);
    setShowAddService(false);
  };

  const fetchPricing = async (serviceId) => {
    try {
      const response = await axios.get(`/api/providers/services/${serviceId}/pricing/`);
      console.log('Pricing API response:', response.data);
      // Ensure we always set an array
      setPricingData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
      setPricingData([]); // Set empty array on error
    }
  };

  const handlePricingInputChange = (e) => {
    const { name, value } = e.target;
    setPricingFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleManagePricing = (service) => {
    setSelectedService(service);
    fetchPricing(service.id);
    setShowPricingModal(true);
  };

  const handleAddPricing = () => {
    setEditingPricing(null);
    setPricingFormData({
      pricing_type: 'per_session',
      price: '',
      currency: 'INR',
      description: '',
      min_sessions: 1,
      max_sessions: ''
    });
  };

  const handleEditPricing = (pricing) => {
    setEditingPricing(pricing);
    setPricingFormData({
      pricing_type: pricing.pricing_type,
      price: pricing.price,
      currency: pricing.currency,
      description: pricing.description || '',
      min_sessions: pricing.min_sessions || 1,
      max_sessions: pricing.max_sessions || ''
    });
  };

  const handlePricingSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPricing) {
        await axios.put(`/api/providers/pricing/${editingPricing.id}/`, pricingFormData);
      } else {
        await axios.post(`/api/providers/services/${selectedService.id}/pricing/`, pricingFormData);
      }
      fetchPricing(selectedService.id);
      setEditingPricing(null);
      setPricingFormData({
        pricing_type: 'per_session',
        price: '',
        currency: 'INR',
        description: '',
        min_sessions: 1,
        max_sessions: ''
      });
    } catch (error) {
      console.error('Failed to save pricing:', error);
    }
  };

  const handleDeletePricing = async (pricingId) => {
    if (window.confirm('Are you sure you want to delete this pricing option?')) {
      try {
        await axios.delete(`/api/providers/pricing/${pricingId}/`);
        fetchPricing(selectedService.id);
      } catch (error) {
        console.error('Failed to delete pricing:', error);
      }
    }
  };

  const resetPricingForm = () => {
    setEditingPricing(null);
    setPricingFormData({
      pricing_type: 'per_session',
      price: '',
      currency: 'INR',
      description: '',
      min_sessions: 1,
      max_sessions: ''
    });
  };

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">My Services</h5>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddService(!showAddService)}
          >
            {showAddService ? 'Cancel' : 'Add Service'}
          </button>
        </div>
        <div className="card-body">
          {showAddService && (
            <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
              <h6>{editingService ? 'Edit Service' : 'Add New Service'}</h6>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Service Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Service Type</label>
                  <select
                    className="form-select"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleInputChange}
                  >
                    <option value="individual">Individual Session</option>
                    <option value="group">Group Session</option>
                    <option value="package">Package Deal</option>
                    <option value="consultation">Consultation</option>
                    <option value="assessment">Assessment</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Duration (Hours)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="duration_hours"
                    value={formData.duration_hours}
                    onChange={handleInputChange}
                    min="0"
                    max="24"
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Duration (Minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleInputChange}
                    min="0"
                    max="59"
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Max Participants</label>
                  <input
                    type="number"
                    className="form-control"
                    name="max_participants"
                    value={formData.max_participants}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
                <div className="col-md-3 mb-3 d-flex align-items-end">
                  <button type="submit" className="btn btn-success me-2">
                    {editingService ? 'Update' : 'Add'} Service
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {safeServices.length === 0 ? (
            <p className="text-muted">No services added yet. Click "Add Service" to get started.</p>
          ) : (
            <div className="row">
              {safeServices.map(service => (
                <div key={service.id} className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="card-title">{service.name}</h6>
                          <p className="card-text small text-muted mb-2">
                            {service.service_type.replace('_', ' ').toUpperCase()} •
                            Duration: {service.duration_display} •
                            Max: {service.max_participants} participant{service.max_participants > 1 ? 's' : ''}
                          </p>
                          {service.description && (
                            <p className="card-text small">{service.description}</p>
                          )}
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleManagePricing(service)}
                          >
                            Manage Pricing
                          </button>
                          <div className="dropdown">
                            <button
                              className="btn btn-sm btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              Actions
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleEdit(service)}
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDelete(service.id)}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent">
                        <small className="text-muted">
                          Status: {service.is_active ? 'Active' : 'Inactive'}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing Management Modal */}
      {showPricingModal && selectedService && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Manage Pricing - {selectedService.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowPricingModal(false);
                    setSelectedService(null);
                    setPricingData([]);
                    resetPricingForm();
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {/* Add/Edit Pricing Form */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h6 className="mb-0">{editingPricing ? 'Edit Pricing' : 'Add New Pricing'}</h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handlePricingSubmit}>
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <label className="form-label">Pricing Type *</label>
                          <select
                            className="form-select"
                            name="pricing_type"
                            value={pricingFormData.pricing_type}
                            onChange={handlePricingInputChange}
                            required
                          >
                            <option value="per_session">Per Session</option>
                            <option value="per_hour">Per Hour</option>
                            <option value="per_participant">Per Participant</option>
                            <option value="fixed">Fixed Price</option>
                            <option value="package">Package Price</option>
                          </select>
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="form-label">Price *</label>
                          <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={pricingFormData.price}
                            onChange={handlePricingInputChange}
                            step="0.01"
                            min="0"
                            required
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="form-label">Currency</label>
                          <select
                            className="form-select"
                            name="currency"
                            value={pricingFormData.currency}
                            onChange={handlePricingInputChange}
                          >
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          value={pricingFormData.description}
                          onChange={handlePricingInputChange}
                          placeholder="e.g., Introductory rate, Group discount"
                        />
                      </div>
                      {pricingFormData.pricing_type === 'package' && (
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Min Sessions</label>
                            <input
                              type="number"
                              className="form-control"
                              name="min_sessions"
                              value={pricingFormData.min_sessions}
                              onChange={handlePricingInputChange}
                              min="1"
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Max Sessions</label>
                            <input
                              type="number"
                              className="form-control"
                              name="max_sessions"
                              value={pricingFormData.max_sessions}
                              onChange={handlePricingInputChange}
                              min="1"
                            />
                          </div>
                        </div>
                      )}
                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success">
                          {editingPricing ? 'Update' : 'Add'} Pricing
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={resetPricingForm}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Existing Pricing List */}
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Current Pricing Options</h6>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={handleAddPricing}
                    >
                      Add Pricing
                    </button>
                  </div>
                  <div className="card-body">
                    {pricingData.length === 0 ? (
                      <p className="text-muted">No pricing options set up yet.</p>
                    ) : (
                      <div className="row">
                        {(Array.isArray(pricingData) ? pricingData : []).map(pricing => (
                          <div key={pricing.id} className="col-md-6 mb-3">
                            <div className="card border">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <h6 className="card-title">
                                      {pricing.price} {pricing.currency}
                                    </h6>
                                    <p className="card-text small text-muted mb-1">
                                      {pricing.pricing_type.replace('_', ' ').toUpperCase()}
                                    </p>
                                    {pricing.description && (
                                      <p className="card-text small">{pricing.description}</p>
                                    )}
                                    {pricing.pricing_type === 'package' && (
                                      <p className="card-text small">
                                        Sessions: {pricing.min_sessions}
                                        {pricing.max_sessions && ` - ${pricing.max_sessions}`}
                                      </p>
                                    )}
                                  </div>
                                  <div className="dropdown">
                                    <button
                                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                    >
                                      Actions
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li>
                                        <button
                                          className="dropdown-item"
                                          onClick={() => handleEditPricing(pricing)}
                                        >
                                          Edit
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          className="dropdown-item text-danger"
                                          onClick={() => handleDeletePricing(pricing.id)}
                                        >
                                          Delete
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <small className={`badge ${pricing.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                    {pricing.is_active ? 'Active' : 'Inactive'}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowPricingModal(false);
                    setSelectedService(null);
                    setPricingData([]);
                    resetPricingForm();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
