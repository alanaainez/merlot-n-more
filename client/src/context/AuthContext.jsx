import React, { createContext, useContext, useState, useEffect } from 'react';
import Auth from '../utils/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is logged in on component mount
    if (Auth.loggedIn()) {
      try {
        const profile = Auth.getProfile();
        setUsername(profile.data?.username || '');
      } catch (error) {
        console.error('Error getting user profile:', error);
      }
    }

    // Set up event listener for auth changes
    const handleAuthChange = () => {
      setIsLoggedIn(Auth.loggedIn());
      if (Auth.loggedIn()) {
        try {
          const profile = Auth.getProfile();
          setUsername(profile.data?.username || '');
        } catch (error) {
          console.error('Error getting user profile:', error);
        }
      } else {
        setUsername('');
      }
    };

    // Subscribe to custom event for auth changes
    window.addEventListener('auth-change', handleAuthChange);

    // Clean up
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
