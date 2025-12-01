
import { useState, useEffect } from 'react';
import { authAPI } from '../api/auth.api';

// This is a compatibility layer - eventually we can remove this
// and use only the AuthContext
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = authAPI.getToken();
      if (token && !authAPI.isTokenExpired()) {
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Use our new token-based login
      const result = await authAPI.login({ email, password });
      if (result.success) {
        setUser(result.data.user);
        localStorage.setItem('userData', JSON.stringify(result.data.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    localStorage.removeItem('userData');
  };

  const isAdmin = () => user?.role === 'admin';
  const isStaff = () => user?.role === 'staff' || user?.role === 'admin';

  return {
    user,
    login,
    logout,
    loading,
    isAdmin,
    isStaff,
    userRole: user?.role
  };
};
















// import { useState, useEffect } from 'react';

// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState('admin'); // Default to admin for demo

//   // Check if user is logged in on app start
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = () => {
//     // In a real app, this would check localStorage/tokens for existing session
//     // For demo, we'll just use the default role from useState
//     setIsAuthenticated(true);
//     setLoading(false);
    
//     // Set basic user info without overriding role
//     setUser({
//       id: 1,
//       name: 'Demo User',
//       email: 'user@gym.com'
//       // Note: role is already set by useState default
//     });
//   };

//   const login = async (email, password, role = 'admin') => {
//     // Demo login - in real app, this would call your API
//     const userData = {
//       id: 1,
//       name: 'Demo User',
//       email: email,
//       role: role
//     };
    
//     setUser(userData);
//     setUserRole(role);
//     setIsAuthenticated(true);
//     return { success: true, user: userData };
//   };

//   const logout = () => {
//     setUser(null);
//     setUserRole('admin'); // Reset to default role
//     setIsAuthenticated(false);
//   };

//   // Role checking utilities
//   const isAdmin = () => userRole === 'admin';
//   const isStaff = () => userRole === 'staff';
//   const hasPermission = (requiredRole) => {
//     const roleHierarchy = { staff: 1, admin: 2 };
//     return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
//   };

//   return {
//     isAuthenticated,
//     loading,
//     user,
//     userRole,
//     login,
//     logout,
//     isAdmin,
//     isStaff,
//     hasPermission
//   };
// };