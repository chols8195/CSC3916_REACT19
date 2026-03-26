import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsTicketPerforated, BsArrowLeft, BsCalendar, BsClock, BsGeoAlt, BsQrCode } from 'react-icons/bs';

function MyTickets() {
    const [activeTab, setActiveTab] = useState('upcoming');
    
    // Empty arrays - tickets would come from an API in a real app
    const [tickets] = useState([]);
    const [pastTickets] = useState([]);

    const displayTickets = activeTab === 'upcoming' ? tickets : pastTickets;

    return (
        <div className="page-container">
            <Link to="/movielist" className="btn-back">
                <BsArrowLeft /> Back to Movies
            </Link>
            
            <div className="page-header">
                <BsTicketPerforated className="page-icon" />
                <h1>My Tickets</h1>
            </div>

            {/* Tabs */}
            <div className="tickets-tabs">
                <button 
                    className={`tickets-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming ({tickets.length})
                </button>
                <button 
                    className={`tickets-tab ${activeTab === 'past' ? 'active' : ''}`}
                    onClick={() => setActiveTab('past')}
                >
                    Past ({pastTickets.length})
                </button>
            </div>
            
            {displayTickets.length > 0 ? (
                <div className="tickets-list">
                    {displayTickets.map((ticket) => (
                        <div key={ticket.id} className="ticket-card">
                            <div className="ticket-poster">
                                <img src={ticket.imageUrl} alt={ticket.movieTitle} />
                            </div>
                            <div className="ticket-details">
                                <h3 className="ticket-movie-title">{ticket.movieTitle}</h3>
                                <div className="ticket-info-grid">
                                    <div className="ticket-info-item">
                                        <BsCalendar />
                                        <span>{ticket.date}</span>
                                    </div>
                                    <div className="ticket-info-item">
                                        <BsClock />
                                        <span>{ticket.time}</span>
                                    </div>
                                    <div className="ticket-info-item">
                                        <BsGeoAlt />
                                        <span>{ticket.theater}</span>
                                    </div>
                                    <div className="ticket-info-item">
                                        <BsTicketPerforated />
                                        <span>Seats: {ticket.seats.join(", ")}</span>
                                    </div>
                                </div>
                                <div className="ticket-screen">{ticket.screen}</div>
                                <div className="ticket-footer">
                                    <div className="ticket-confirmation">
                                        <span className="confirmation-label">Confirmation:</span>
                                        <span className="confirmation-code">{ticket.confirmationCode}</span>
                                    </div>
                                    <button className="btn-qr">
                                        <BsQrCode /> View QR
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <BsTicketPerforated className="empty-icon" />
                    <h2>No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Tickets</h2>
                    <p>{activeTab === 'upcoming' ? 'Book tickets for a movie to see them here.' : 'Your ticket history will appear here after attending a show.'}</p>
                    <Link to="/movielist" className="btn-primary">
                        Browse Movies
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MyTickets;