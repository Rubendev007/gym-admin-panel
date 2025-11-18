import React from 'react';
import RevenueChart from './RevenueChart';
import MembershipChart from './MembershipChart';

const Dashboard = () => {
  const dashboardStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    padding: 'clamp(16px, 4vw, 24px)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: 'clamp(24px, 5vw, 40px)'
  };

  const titleStyle = {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    fontWeight: '800',
    margin: '0 0 8px 0',
    background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.025em'
  };

  const subtitleStyle = {
    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
    color: '#64748b',
    margin: '0',
    fontWeight: '500'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
    gap: 'clamp(16px, 4vw, 32px)',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  return (
    <div style={dashboardStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Gym Admin Dashboard</h1>
        <p style={subtitleStyle}>Monitor your gym performance and member statistics</p>
      </div>
      
      <div style={gridStyle}>
        <div>
          <RevenueChart />
        </div>
        
        <div>
          <MembershipChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;