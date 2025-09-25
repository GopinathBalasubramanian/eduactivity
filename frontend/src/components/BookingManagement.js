import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/providers/bookings/');
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning',
      confirmed: 'bg-info',
      completed: 'bg-success',
      cancelled: 'bg-danger',
      no_show: 'bg-secondary'
    };
    return `badge ${statusClasses[status] || 'bg-secondary'}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filterBookings = (status) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (status) {
      case 'upcoming':
        return bookings.filter(booking => {
          const bookingDate = new Date(booking.booking_date);
          return bookingDate >= today && ['pending', 'confirmed'].includes(booking.status);
        });
      case 'past':
        return bookings.filter(booking => {
          const bookingDate = new Date(booking.booking_date);
          return bookingDate < today || ['completed', 'cancelled', 'no_show'].includes(booking.status);
        });
      case 'pending':
        return bookings.filter(booking => booking.status === 'pending');
      default:
        return bookings;
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.patch(`/api/providers/bookings/${bookingId}/`, {
          status: 'cancelled'
        });
        fetchBookings();
      } catch (error) {
        console.error('Failed to cancel booking:', error);
      }
    }
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

  const upcomingBookings = filterBookings('upcoming');
  const pastBookings = filterBookings('past');
  const pendingBookings = filterBookings('pending');

  return (
    <div className="mt-4">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">My Bookings</h5>
        </div>
        <div className="card-body">
          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming ({upcomingBookings.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Past ({pastBookings.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending ({pendingBookings.length})
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'upcoming' && (
              <div className="tab-pane active">
                {upcomingBookings.length === 0 ? (
                  <p className="text-muted">No upcoming bookings</p>
                ) : (
                  <div className="row">
                    {upcomingBookings.map(booking => (
                      <div key={booking.id} className="col-md-6 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title">{booking.service_name}</h6>
                              <span className={getStatusBadge(booking.status)}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="card-text small text-muted mb-2">
                              <strong>Provider:</strong> {booking.provider_name}
                            </p>
                            <p className="card-text small text-muted mb-2">
                              <strong>Date:</strong> {formatDate(booking.booking_date)} at {formatTime(booking.booking_time)}
                            </p>
                            <p className="card-text small text-muted mb-2">
                              <strong>Duration:</strong> {booking.duration_hours}h {booking.duration_minutes}m
                            </p>
                            {booking.total_amount && (
                              <p className="card-text small text-muted mb-2">
                                <strong>Total:</strong> ${booking.total_amount} {booking.currency}
                              </p>
                            )}
                            {booking.special_requests && (
                              <p className="card-text small">
                                <strong>Special Requests:</strong> {booking.special_requests}
                              </p>
                            )}
                            <div className="mt-3">
                              {booking.status === 'pending' && (
                                <button
                                  className="btn btn-sm btn-outline-danger me-2"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  Cancel
                                </button>
                              )}
                              <button className="btn btn-sm btn-outline-primary">
                                Contact Provider
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'past' && (
              <div className="tab-pane active">
                {pastBookings.length === 0 ? (
                  <p className="text-muted">No past bookings</p>
                ) : (
                  <div className="row">
                    {pastBookings.map(booking => (
                      <div key={booking.id} className="col-md-6 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title">{booking.service_name}</h6>
                              <span className={getStatusBadge(booking.status)}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="card-text small text-muted mb-2">
                              <strong>Provider:</strong> {booking.provider_name}
                            </p>
                            <p className="card-text small text-muted mb-2">
                              <strong>Date:</strong> {formatDate(booking.booking_date)} at {formatTime(booking.booking_time)}
                            </p>
                            {booking.total_amount && (
                              <p className="card-text small text-muted mb-2">
                                <strong>Total:</strong> ${booking.total_amount} {booking.currency}
                              </p>
                            )}
                            <div className="mt-3">
                              <button className="btn btn-sm btn-outline-primary me-2">
                                Book Again
                              </button>
                              <button className="btn btn-sm btn-outline-success">
                                Leave Review
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pending' && (
              <div className="tab-pane active">
                {pendingBookings.length === 0 ? (
                  <p className="text-muted">No pending bookings</p>
                ) : (
                  <div className="row">
                    {pendingBookings.map(booking => (
                      <div key={booking.id} className="col-md-6 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title">{booking.service_name}</h6>
                              <span className={getStatusBadge(booking.status)}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="card-text small text-muted mb-2">
                              <strong>Provider:</strong> {booking.provider_name}
                            </p>
                            <p className="card-text small text-muted mb-2">
                              <strong>Date:</strong> {formatDate(booking.booking_date)} at {formatTime(booking.booking_time)}
                            </p>
                            {booking.total_amount && (
                              <p className="card-text small text-muted mb-2">
                                <strong>Total:</strong> ${booking.total_amount} {booking.currency}
                              </p>
                            )}
                            <div className="mt-3">
                              <button
                                className="btn btn-sm btn-outline-danger me-2"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Cancel
                              </button>
                              <button className="btn btn-sm btn-outline-primary">
                                Contact Provider
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
