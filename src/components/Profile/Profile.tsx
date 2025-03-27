import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

interface Trip {
  _id: string;
  location: string;
  duration: string;
}

const UserProfile: React.FC = () => {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({ username: '', email: '' });
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]); // Store trips list
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('http://35.184.227.186:3006/api/profile', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUserData({ username: data.username, email: data.email });
       
      })
      .catch(err => console.error(err));
  }, [token]);

  const handleWatchTrip = (tripId: string) => {
    navigate(`/trip/${tripId}`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    if (token) {
      fetch('http://35.184.227.186:3006/api/trips', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
        .then(response => response.json())
        .then(data => {
          setTrips(data); // Set the fetched trips
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch trips.');
          setLoading(false);
        });
    }
  }, []); // Run this effect once when the component mounts

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='general'>
      <NavBar/>
    <div className="user-profile">
        
      <h2>User Profile</h2>

      <div className="profile-details">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>

      <h2>Your Trips</h2>
      <button className="add-trip" onClick={()=>navigate("/addTrip")}>Add A Trip</button>
      <div className="trips-list">
        {trips.length === 0 ? (
          <p>No trips found.</p>
        ) : (
            <ul>
            {trips.map((trip: any) => (
              <li key={trip.trip_id}>
                <p>Location: {trip.destination}</p>
                <p>Info: {trip.notes}</p>
                <p>Trip Id:{trip._id}</p>
                <button onClick={()=>handleWatchTrip(trip._id)}>Watch Trip</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default UserProfile;
