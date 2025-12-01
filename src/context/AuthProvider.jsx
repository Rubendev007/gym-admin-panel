import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/auth.api';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = authAPI.getToken();
        
        if (token && !authAPI.isTokenExpired()) {
          // Token is valid, set user from localStorage or validate with backend
          const userData = localStorage.getItem('userData');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        } else if (token && authAPI.isTokenExpired()) {
          // Token expired, try to refresh
          try {
            await authAPI.refreshToken();
            const userData = localStorage.getItem('userData');
            if (userData) {
              setUser(JSON.parse(userData));
            }
          } catch (refreshError) {
            // Refresh failed, logout
            authAPI.logout();
            setUser(null);
          }
        } else {
          // No token, ensure clean state
          authAPI.logout();
          setUser(null);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err.message);
        authAPI.logout();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        setUser(response.data.user);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        return { success: true };
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setError(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isStaff = () => {
    return user?.role === 'staff' || user?.role === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error,
    isAdmin,
    isStaff,
    userRole: user?.role
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

























// import React, { createContext, useContext } from 'react';
// import { useAuth } from '../auth/useAuth';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const auth = useAuth();

//   return (
//     <AuthContext.Provider value={auth}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuthContext must be used within an AuthProvider');
//   }
//   return context;
// };

// export default AuthProvider;