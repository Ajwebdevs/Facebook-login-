import React from 'react';

const UserProfile = ({ user }) => {
    if (!user) return null;
    
    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <img src={user.picture} alt="User Profile" />
        </div>
    );
};

export default UserProfile;
