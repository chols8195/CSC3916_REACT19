import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { BsGear, BsArrowLeft, BsPersonCircle, BsBell, BsShieldLock, BsPalette, BsGlobe, BsCreditCard, BsQuestionCircle, BsBoxArrowRight, BsCheck } from 'react-icons/bs';

function Settings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.auth.username);
    
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [language, setLanguage] = useState('en');
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = () => {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="page-container">
            <Link to="/movielist" className="btn-back">
                <BsArrowLeft /> Back to Movies
            </Link>
            
            <div className="page-header">
                <BsGear className="page-icon" />
                <h1>Settings</h1>
            </div>
            
            <div className="settings-content">
                {/* Profile Section */}
                <div className="settings-section">
                    <h2 className="settings-section-title">
                        <BsPersonCircle /> Profile
                    </h2>
                    <div className="settings-card">
                        <div className="profile-info">
                            <div className="profile-avatar-large">
                                <BsPersonCircle />
                            </div>
                            <div className="profile-details">
                                <div className="profile-name">{username || 'User'}</div>
                                <div className="profile-member">Cinema Seats Member</div>
                                <button className="btn-edit-profile">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="settings-section">
                    <h2 className="settings-section-title">
                        <BsBell /> Notifications
                    </h2>
                    <div className="settings-card">
                        <div className="settings-item">
                            <div className="settings-item-info">
                                <span className="settings-item-title">Push Notifications</span>
                                <span className="settings-item-desc">Get notified about new releases and offers</span>
                            </div>
                            <label className="toggle">
                                <input 
                                    type="checkbox" 
                                    checked={notifications}
                                    onChange={() => setNotifications(!notifications)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-item">
                            <div className="settings-item-info">
                                <span className="settings-item-title">Email Updates</span>
                                <span className="settings-item-desc">Receive weekly movie recommendations</span>
                            </div>
                            <label className="toggle">
                                <input 
                                    type="checkbox" 
                                    checked={emailUpdates}
                                    onChange={() => setEmailUpdates(!emailUpdates)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <div className="settings-section">
                    <h2 className="settings-section-title">
                        <BsPalette /> Appearance
                    </h2>
                    <div className="settings-card">
                        <div className="settings-item">
                            <div className="settings-item-info">
                                <span className="settings-item-title">Dark Mode</span>
                                <span className="settings-item-desc">Use dark theme throughout the app</span>
                            </div>
                            <label className="toggle">
                                <input 
                                    type="checkbox" 
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-item">
                            <div className="settings-item-info">
                                <BsGlobe />
                                <span className="settings-item-title">Language</span>
                            </div>
                            <select 
                                className="settings-select"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="ja">日本語</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="settings-section">
                    <h2 className="settings-section-title">
                        <BsCreditCard /> Payment Methods
                    </h2>
                    <div className="settings-card">
                        <div className="payment-method">
                            <div className="payment-icon visa">VISA</div>
                            <div className="payment-details">
                                <span>•••• •••• •••• 4242</span>
                                <span className="payment-exp">Expires 12/27</span>
                            </div>
                            <span className="payment-default">Default</span>
                        </div>
                        <button className="btn-add-payment">+ Add Payment Method</button>
                    </div>
                </div>

                {/* Security Section */}
                <div className="settings-section">
                    <h2 className="settings-section-title">
                        <BsShieldLock /> Security
                    </h2>
                    <div className="settings-card">
                        <button className="settings-btn">
                            <BsShieldLock /> Change Password
                        </button>
                        <button className="settings-btn">
                            <BsQuestionCircle /> Help & Support
                        </button>
                        <button className="settings-btn logout-btn" onClick={handleLogout}>
                            <BsBoxArrowRight /> Logout
                        </button>
                        <button className="settings-btn danger">
                            Delete Account
                        </button>
                    </div>
                </div>

                {/* Save Button */}
                <button className="btn-save-settings" onClick={handleSave}>
                    {showSaved ? <><BsCheck /> Saved!</> : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}

export default Settings;