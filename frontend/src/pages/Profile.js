import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, changePassword, clearError } from '../features/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    fathers_name: '',
    date_of_birth: '',
    school_name: '',
    class_name: '',
    address: '',
  });
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirm: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        fathers_name: user.fathers_name || '',
        date_of_birth: user.date_of_birth || '',
        school_name: user.school_name || '',
        class_name: user.class_name || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    setSuccessMessage('');

    try {
      await dispatch(updateProfile(profileData)).unwrap();
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    setSuccessMessage('');

    if (passwordData.new_password !== passwordData.new_password_confirm) {
      return;
    }

    try {
      await dispatch(changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
        new_password_confirm: passwordData.new_password_confirm,
      })).unwrap();
      setSuccessMessage('Password changed successfully!');
      setPasswordData({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
      });
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header">
              <h2 className="mb-0">User Profile</h2>
            </div>
            <div className="card-body">
              {/* Tabs */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    Profile Information
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                    onClick={() => setActiveTab('password')}
                  >
                    Change Password
                  </button>
                </li>
              </ul>

              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger">
                  {typeof error === 'string' ? error : JSON.stringify(error)}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  {/* Display Information */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${user?.first_name || ''} ${user?.last_name || ''}`}
                        disabled
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={user?.phone || ''}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user?.email || ''}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">User Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user?.user_type === 'student' ? 'Student/Parent' : user?.user_type === 'provider' ? 'Provider' : user?.user_type}
                      disabled
                    />
                  </div>

                  {/* Student/Parent specific fields */}
                  {user?.user_type === 'student' && (
                    <>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Father's Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="fathers_name"
                            value={profileData.fathers_name}
                            onChange={handleProfileChange}
                            placeholder="Enter father's name"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            name="date_of_birth"
                            value={profileData.date_of_birth}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">School Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="school_name"
                            value={profileData.school_name}
                            onChange={handleProfileChange}
                            placeholder="Enter school name"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Class</label>
                          <select
                            className="form-control"
                            name="class_name"
                            value={profileData.class_name}
                            onChange={handleProfileChange}
                          >
                            <option value="">Select Class</option>
                            <option value="Nursery">Nursery</option>
                            <option value="LKG">LKG</option>
                            <option value="UKG">UKG</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                            <option value="3rd">3rd</option>
                            <option value="4th">4th</option>
                            <option value="5th">5th</option>
                            <option value="6th">6th</option>
                            <option value="7th">7th</option>
                            <option value="8th">8th</option>
                            <option value="9th">9th</option>
                            <option value="10th">10th</option>
                            <option value="11th">11th</option>
                            <option value="12th">12th</option>
                            <option value="B.Sc">B.Sc</option>
                            <option value="B.Com">B.Com</option>
                            <option value="B.A">B.A</option>
                            <option value="M.Sc">M.Sc</option>
                            <option value="M.Com">M.Com</option>
                            <option value="M.A">M.A</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <textarea
                          className="form-control"
                          name="address"
                          value={profileData.address}
                          onChange={handleProfileChange}
                          rows="3"
                          placeholder="Enter full address"
                        />
                      </div>
                    </>
                  )}

                  {/* Provider specific fields */}
                  {user?.user_type === 'provider' && (
                    <div className="alert alert-info">
                      <h6><i className="fas fa-info-circle me-2"></i>Provider Information</h6>
                      <p className="mb-0">As a provider, you can manage your profile through the Dashboard.</p>
                      <a href="/dashboard" className="btn btn-primary btn-sm mt-2">
                        Go to Dashboard
                      </a>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-3">
                    <label htmlFor="old_password" className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="old_password"
                      name="old_password"
                      value={passwordData.old_password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="new_password" className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="new_password"
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      required
                      minLength="5"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="new_password_confirm" className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="new_password_confirm"
                      name="new_password_confirm"
                      value={passwordData.new_password_confirm}
                      onChange={handlePasswordChange}
                      required
                      minLength="5"
                    />
                    {passwordData.new_password && passwordData.new_password_confirm &&
                     passwordData.new_password !== passwordData.new_password_confirm && (
                      <small className="text-danger">Passwords do not match</small>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || passwordData.new_password !== passwordData.new_password_confirm}
                  >
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
