import React from 'react';
import { authAPI } from '../../api/auth.api';

const TokenTester = () => {
  const [tokenInfo, setTokenInfo] = React.useState(null);

  const updateTokenInfo = () => {
    setTokenInfo(authAPI.getTokenInfo());
  };

  React.useEffect(() => {
    updateTokenInfo();
    
    // Update token info every 5 seconds
    const interval = setInterval(updateTokenInfo, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateExpiry = () => {
    authAPI.simulateTokenExpiry();
    updateTokenInfo();
    alert('Token expiry simulated! Try loading members to see auto-refresh.');
  };

  const handleRefreshToken = async () => {
    try {
      const newToken = await authAPI.refreshToken();
      updateTokenInfo();
      alert(`Token refreshed successfully! New token: ${newToken}`);
    } catch (error) {
      alert(`Token refresh failed: ${error.message}`);
    }
  };

  if (!tokenInfo) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#1e293b',
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 1000,
      maxWidth: '300px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <h4 style={{ margin: '0 0 12px 0', color: '#fbbf24' }}>🔐 Token Tester</h4>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Status:</strong> {tokenInfo.isExpired ? '❌ EXPIRED' : '✅ VALID'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Expires:</strong> {tokenInfo.expiresAt}
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <strong>Time Left:</strong> {Math.max(0, Math.round(tokenInfo.timeUntilExpiry / 1000))} seconds
      </div>
      
      <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <button 
          onClick={handleSimulateExpiry}
          style={{
            padding: '6px 12px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          Simulate Token Expiry
        </button>
        
        <button 
          onClick={handleRefreshToken}
          style={{
            padding: '6px 12px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          Manual Refresh Token
        </button>
        
        <button 
          onClick={updateTokenInfo}
          style={{
            padding: '6px 12px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          Refresh Info
        </button>
      </div>
    </div>
  );
};

export default TokenTester;