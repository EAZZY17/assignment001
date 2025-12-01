import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    // Load token from localStorage on initialization
    return localStorage.getItem('authToken') || null;
  });
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initialization
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('authToken');
  });

  // Sign in function
  const signIn = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', tokenData);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  // Sign out function
  const signOut = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  // Get token for API requests
  const getToken = () => {
    return token || localStorage.getItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        signIn,
        signOut,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

