import React from 'react';
import { useAuthContext } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access this page</div>;
  }

  return children;
};

export default ProtectedRoute;