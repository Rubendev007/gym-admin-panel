import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('admin'); // Default to admin for demo

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // In a real app, this would check localStorage/tokens for existing session
    // For demo, we'll just use the default role from useState
    setIsAuthenticated(true);
    setLoading(false);
    
    // Set basic user info without overriding role
    setUser({
      id: 1,
      name: 'Demo User',
      email: 'user@gym.com'
      // Note: role is already set by useState default
    });
  };

  const login = async (email, password, role = 'admin') => {
    // Demo login - in real app, this would call your API
    const userData = {
      id: 1,
      name: 'Demo User',
      email: email,
      role: role
    };
    
    setUser(userData);
    setUserRole(role);
    setIsAuthenticated(true);
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    setUserRole('admin'); // Reset to default role
    setIsAuthenticated(false);
  };

  // Role checking utilities
  const isAdmin = () => userRole === 'admin';
  const isStaff = () => userRole === 'staff';
  const hasPermission = (requiredRole) => {
    const roleHierarchy = { staff: 1, admin: 2 };
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };

  return {
    isAuthenticated,
    loading,
    user,
    userRole,
    login,
    logout,
    isAdmin,
    isStaff,
    hasPermission
  };
};