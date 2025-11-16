import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // TODO: Check if token exists in cookies
    setLoading(false);
  };

  const login = async (email, password) => {
    // TODO: Make API call to login
    setIsAuthenticated(true);
  };

  const logout = () => {
    // TODO: Remove token from cookies
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout
  };
};