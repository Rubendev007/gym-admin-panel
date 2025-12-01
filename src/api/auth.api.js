// Simulated token management that matches real backend patterns

// Token storage keys
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  TOKEN_EXPIRY: 'tokenExpiry'
};

// Simulated token expiry time (1 hour)
const TOKEN_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export const authAPI = {
  // Simulate login and get tokens
  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, this would call your backend
    // For simulation, we'll create mock tokens
    const accessToken = `mock_access_token_${Date.now()}`;
    const refreshToken = `mock_refresh_token_${Date.now()}`;
    const tokenExpiry = Date.now() + TOKEN_EXPIRY_TIME;
    
    // Store tokens in localStorage (simulating what backend would do)
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, tokenExpiry.toString());
    
    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        expiresIn: TOKEN_EXPIRY_TIME,
        user: {
          id: 1,
          email: credentials.email,
          role: credentials.email.includes('admin') ? 'admin' : 'staff',
          name: credentials.email.split('@')[0]
        }
      }
    };
  },

  // Simulate token refresh
  refreshToken: async () => {
    console.log('Refreshing token...');
    
    const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In real app, this would call your refresh token endpoint
    // For simulation, we'll create a new access token
    const newAccessToken = `mock_access_token_${Date.now()}_refreshed`;
    const newTokenExpiry = Date.now() + TOKEN_EXPIRY_TIME;
    
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, newAccessToken);
    localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, newTokenExpiry.toString());
    
    return newAccessToken;
  },

  // Check if token is expired
  isTokenExpired: () => {
    const expiry = localStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
    if (!expiry) return true;
    
    return Date.now() > parseInt(expiry);
  },

  // Get current token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  // Logout - clear tokens
  logout: () => {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.TOKEN_EXPIRY);
    console.log('User logged out');
  },

  // Validate token (simulated)
  validateToken: async () => {
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    
    if (!token) {
      return { valid: false, reason: 'No token' };
    }
    
    if (authAPI.isTokenExpired()) {
      return { valid: false, reason: 'Token expired' };
    }
    
    // Simulate API call to validate token
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return { valid: true };
  },

  // NEW: Simulate token expiry for testing auto-refresh
  simulateTokenExpiry: () => {
    // Set token expiry to 1 second ago to simulate expired token
    const expiredTime = Date.now() - 1000;
    localStorage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiredTime.toString());
    console.log('Token expiry simulated - token will be refreshed on next API call');
  },

  // NEW: Get token info for debugging
  getTokenInfo: () => {
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
    const expiry = localStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
    const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    
    return {
      hasToken: !!token,
      hasRefreshToken: !!refreshToken,
      isExpired: authAPI.isTokenExpired(),
      expiresAt: expiry ? new Date(parseInt(expiry)).toLocaleTimeString() : 'No expiry',
      timeUntilExpiry: expiry ? parseInt(expiry) - Date.now() : 0
    };
  }
};