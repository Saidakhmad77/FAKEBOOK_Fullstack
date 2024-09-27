import { useState, useEffect } from 'react';
import axios from 'axios';
import UserToken from './UserToken';
import './Profile.css';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const { token, removeToken } = UserToken();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    setAlertMessage('Failed to fetch user data.');
                }
            } catch (error) {
                setAlertMessage('An error occurred while fetching profile data.');
                console.error(error);
            }
        };

        if (token) {
            fetchProfile();
        } else {
            setAlertMessage('No user is logged in.');
        }
    }, [token]);
    return (
        <div className="profile-container">
            {alertMessage && <div className="alert">{alertMessage}</div>}
            {userData ? (
                <>
                    <h2>User Profile</h2>
                    <div className="profile-details">
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Bio:</strong> {userData.bio}</p>
                    </div>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}

export default Profile;
