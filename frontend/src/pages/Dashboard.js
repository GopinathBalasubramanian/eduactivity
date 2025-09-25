import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ServiceManagement from '../components/ServiceManagement';
import BookingManagement from '../components/BookingManagement';
import ProviderProfileForm from '../components/ProviderProfileForm';
import ProviderProfileEdit from '../components/ProviderProfileEdit';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (user?.user_type === 'provider') {
      fetchProviderData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchProviderData = async () => {
    try {
      const response = await axios.get('/api/providers/my/');
      setProviderData(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        // Provider profile not found - this is expected for new providers
        setProviderData(null);
      } else {
        setError('Failed to load provider data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdated = (updatedData) => {
    setProviderData(updatedData);
    setError(null);
  };



  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {user?.user_type === 'provider' ? (
        <div className="row">
          <div className="col-12">
            <h1>Provider Dashboard</h1>
            <p className="text-muted">Manage your courses and services</p>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            {providerData ? (
              <div className="row">
                <div className="col-lg-8">
                  {showEditProfile ? (
                    <ProviderProfileEdit
                      providerData={providerData}
                      onProfileUpdated={handleProfileUpdated}
                      onCancel={() => setShowEditProfile(false)}
                    />
                  ) : (
                    <div className="card mb-4">
                      <div className="card-header">
                        <h5 className="mb-0">Profile Information</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <p><strong>Name:</strong> {providerData.name}</p>
                            <p><strong>Category:</strong> {providerData.category}</p>
                            <p><strong>Subcategory:</strong> {providerData.subcategory || 'N/A'}</p>
                          </div>
                          <div className="col-md-6">
                            <p><strong>Status:</strong>
                              <span className={`badge ms-2 ${
                                providerData.is_approved ? 'bg-success' : 'bg-warning'
                              }`}>
                                {providerData.is_approved ? 'Approved' : 'Pending Approval'}
                              </span>
                            </p>
                            <p><strong>Subscription:</strong>
                              <span className={`badge ms-2 ${
                                providerData.subscription_status === 'active' ? 'bg-success' :
                                providerData.subscription_status === 'expired' ? 'bg-danger' : 'bg-secondary'
                              }`}>
                                {providerData.subscription_status}
                              </span>
                            </p>
                            <p><strong>Profile Views:</strong> {providerData.profile_views}</p>
                          </div>
                        </div>
                        <p><strong>Description:</strong> {providerData.description || 'No description provided'}</p>
                        <p><strong>Address:</strong> {providerData.address}</p>
                        {providerData.website && (
                          <p><strong>Website:</strong> <a href={providerData.website} target="_blank" rel="noopener noreferrer">{providerData.website}</a></p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-header">
                      <h5 className="mb-0">Quick Actions</h5>
                    </div>
                    <div className="card-body">
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => setShowEditProfile(true)}
                        >
                          Edit Profile
                        </button>
                        <button className="btn btn-outline-primary">Manage Photos</button>
                        <button className="btn btn-outline-primary">View Reviews</button>
                        <button className="btn btn-outline-primary">Subscription</button>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Statistics</h5>
                    </div>
                    <div className="card-body">
                      <div className="row text-center">
                        <div className="col-6">
                          <h3 className="text-primary">{providerData.profile_views}</h3>
                          <small className="text-muted">Views</small>
                        </div>
                        <div className="col-6">
                          <h3 className="text-success">0</h3>
                          <small className="text-muted">Reviews</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Management Section */}
                  <ServiceManagement />
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h5 className="text-center mb-4">Create Provider Profile</h5>
                  <p className="text-muted text-center mb-4">Set up your provider profile to start managing courses and services.</p>

                  <ProviderProfileForm onProfileCreated={fetchProviderData} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <h1>Student/Parent Dashboard</h1>
            <p className="text-muted">Manage your account and activities</p>

            <div className="row">
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">Recent Activity</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">No recent activity</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">Quick Actions</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <a href="/search" className="btn btn-primary">Find Providers</a>
                      <button className="btn btn-outline-primary">View History</button>
                      <button className="btn btn-outline-primary">My Reviews</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Management Section */}
            <BookingManagement />
          </div>
        </div>
      )}


    </div>
  );
};

export default Dashboard;
