import React, { useEffect, useRef } from 'react';
import RevenueChart from '../components/dashboard/RevenueChart';
import MembershipChart from '../components/dashboard/MembershipChart';
import StatsCard from '../components/dashboard/StatsCard';
import QuickInvoiceButton from '../components/dashboard/QuickInvoiceButton';
import { useAuthContext } from '../context/AuthProvider';
import { showToast } from '../components/ui/Toast';

const Dashboard = () => {
  const { userRole, isAdmin, isStaff } = useAuthContext();
  const hasShownToasts = useRef(false);

  // Simulate data loading with toast notifications
  useEffect(() => {
    if (hasShownToasts.current) return;
    hasShownToasts.current = true;
    
    const loadingToast = showToast.loading('Loading dashboard data...');
    
    // Simulate API call
    setTimeout(() => {
      showToast.dismiss(loadingToast);
      showToast.success('Dashboard loaded successfully!');
    }, 1500);

    // Simulate checking for expiring memberships
    setTimeout(() => {
      showToast.warning('23 memberships expiring this month');
    }, 3000);
  }, []);

  // ALL STYLE DEFINITIONS (keep your existing styles)
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

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
    gap: 'clamp(16px, 3vw, 20px)',
    marginBottom: 'clamp(24px, 5vw, 40px)',
    maxWidth: '1400px',
    margin: '0 auto 40px auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
    gap: 'clamp(16px, 4vw, 32px)',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  // ADD THIS TEMPORARY ROLE SWITCHER STYLE
  const roleSwitcherStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'white',
    padding: '10px 15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
    border: '1px solid #e2e8f0'
  };

  const roleButtonStyle = {
    padding: '5px 10px',
    margin: '0 2px',
    border: '1px solid #3b82f6',
    borderRadius: '4px',
    background: 'white',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '12px'
  };

  const currentRoleStyle = {
    fontSize: '12px',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#1e293b'
  };

  return (
    <div style={dashboardStyle}>
      {/* ADD THIS TEMPORARY ROLE SWITCHER */}
      <div style={roleSwitcherStyle}>
        <div style={currentRoleStyle}>Role: {userRole}</div>
        <button 
          onClick={() => window.location.reload()} // Simple refresh to reset
          style={roleButtonStyle}
        >
          Refresh
        </button>
      </div>

      <div style={headerStyle}>
        <h1 style={titleStyle}>
          {isAdmin() ? 'Admin Dashboard' : 'Staff Dashboard'} {/* DYNAMIC TITLE */}
        </h1>
        <p style={subtitleStyle}>
          {isAdmin() 
            ? 'Monitor your gym performance and member statistics' 
            : 'View member information and daily tasks'
          } {/* DYNAMIC SUBTITLE */}
        </p>
      </div>
      
      {/* Stats Cards Section - CONDITIONAL BASED ON ROLE */}
      <div style={statsGridStyle}>
        {/* Admin sees financial data, Staff sees basic stats */}
        {isAdmin() && (
          <div onClick={() => showToast.info('Revenue updated in real-time')}>
            <StatsCard 
              title="Today's Income" 
              value="$2,840" 
              icon="💰"
              color="blue"
            />
          </div>
        )}
        
        <div onClick={() => showToast.success('Member count: 156 active members')}>
          <StatsCard 
            title="Active Members" 
            value="156" 
            icon="👥"
            color="green"
          />
        </div>
        
        <div onClick={() => showToast.warning('23 memberships need renewal attention')}>
          <StatsCard 
            title="Expiring Memberships" 
            value="23" 
            icon="⚠️"
            color="orange"
          />
        </div>
        
        {/* Only Admin can create invoices */}
        {isAdmin() && (
          <QuickInvoiceButton />
        )}
      </div>
      
      {/* Charts Section - CONDITIONAL BASED ON ROLE */}
      <div style={gridStyle}>
        {/* Admin sees revenue chart, Staff sees basic info */}
        {isAdmin() ? (
          <RevenueChart />
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ fontSize: '3rem' }}>👥</div>
            <h3 style={{ margin: 0, color: '#1e293b' }}>Member Overview</h3>
            <p style={{ margin: 0, color: '#64748b', textAlign: 'center' }}>
              Focus on member management and daily operations
            </p>
          </div>
        )}
        
        <MembershipChart />
      </div>
    </div>
  );
};

export default Dashboard;