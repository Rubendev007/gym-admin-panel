import React, { useState } from 'react';

const PlanTable = ({ plans, onEdit, onDelete, loading }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Listen for window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tableStyle = {
    width: '100%',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    border: '1px solid rgba(226, 232, 240, 0.8)'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0'
  };

  const titleStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0'
  };

  // Mobile Card Styles
  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(226, 232, 240, 0.8)'
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const planNameStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 4px 0'
  };

  const planDescriptionStyle = {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '0'
  };

  const detailGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
    marginBottom: '16px'
  };

  const detailItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const detailLabelStyle = {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const detailValueStyle = {
    fontSize: '0.875rem',
    color: '#334155',
    fontWeight: '500'
  };

  const priceStyle = {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#10b981'
  };

  const actionButtonStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: '1'
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    border: '1px solid rgba(59, 130, 246, 0.2)'
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.2)'
  };

  // Desktop Table Styles
  const tableHeaderStyle = {
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  };

  const headerCellStyle = {
    padding: '16px 20px',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#475569',
    borderBottom: '1px solid #e2e8f0'
  };

  const cellStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.875rem',
    color: '#334155'
  };

  const rowStyle = {
    transition: 'background-color 0.2s ease',
    cursor: 'pointer'
  };

  const actionCellStyle = {
    ...cellStyle,
    display: 'flex',
    gap: '8px'
  };

  const statusStyle = (status) => {
    const styles = {
      Active: { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      Inactive: { background: 'rgba(100, 116, 139, 0.1)', color: '#64748b' }
    };
    return styles[status] || styles.Active;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  // Get duration label
  const getDurationLabel = (months) => {
    const durations = {
      1: '1 Month',
      3: '3 Months',
      6: '6 Months',
      12: '12 Months'
    };
    return durations[months] || `${months} Months`;
  };

  // Sample data - will be replaced with props
  const samplePlans = [
    {
      id: 1,
      name: 'Basic Plan',
      duration: 1,
      price: 30,
      tax: 5,
      total: 35,
      description: 'Perfect for beginners with access to basic equipment',
      status: 'Active'
    }
  ];

  const displayPlans = plans || samplePlans;

  // Mobile Card View
  const renderMobileView = () => {
    return (
      <div style={{ padding: '16px' }}>
        {displayPlans.map((plan) => {
          const statusStyles = statusStyle(plan.status);
          const totalPrice = plan.price + (plan.tax || 0);
          
          return (
            <div key={plan.id} style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div>
                  <h4 style={planNameStyle}>{plan.name}</h4>
                  <p style={planDescriptionStyle}>{plan.description}</p>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  ...statusStyles
                }}>
                  {plan.status}
                </span>
              </div>
              
              <div style={detailGridStyle}>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Duration</span>
                  <span style={detailValueStyle}>{getDurationLabel(plan.duration)}</span>
                </div>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Price</span>
                  <span style={detailValueStyle}>{formatCurrency(plan.price)}</span>
                </div>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Tax</span>
                  <span style={detailValueStyle}>{formatCurrency(plan.tax || 0)}</span>
                </div>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Total</span>
                  <span style={priceStyle}>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              
              {onEdit && onDelete && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    style={editButtonStyle}
                    onClick={() => onEdit && onEdit(plan)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button 
                    style={deleteButtonStyle}
                    onClick={() => onDelete && onDelete(plan)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Desktop Table View
  const renderDesktopView = () => {
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={tableHeaderStyle}>
          <tr>
            <th style={headerCellStyle}>Plan Name</th>
            <th style={headerCellStyle}>Duration</th>
            <th style={headerCellStyle}>Price</th>
            <th style={headerCellStyle}>Tax</th>
            <th style={headerCellStyle}>Total</th>
            <th style={headerCellStyle}>Status</th>
            {onEdit && onDelete && <th style={headerCellStyle}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {displayPlans.map((plan) => {
            const statusStyles = statusStyle(plan.status);
            const totalPrice = plan.price + (plan.tax || 0);
            
            return (
              <tr 
                key={plan.id} 
                style={rowStyle}
                onMouseEnter={(e) => {
                  e.target.parentNode.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.target.parentNode.style.backgroundColor = 'transparent';
                }}
              >
                <td style={cellStyle}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {plan.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {plan.description}
                    </div>
                  </div>
                </td>
                <td style={cellStyle}>{getDurationLabel(plan.duration)}</td>
                <td style={cellStyle}>{formatCurrency(plan.price)}</td>
                <td style={cellStyle}>{formatCurrency(plan.tax || 0)}</td>
                <td style={cellStyle}>
                  <span style={priceStyle}>{formatCurrency(totalPrice)}</span>
                </td>
                <td style={cellStyle}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    ...statusStyles
                  }}>
                    {plan.status}
                  </span>
                </td>
                {onEdit && onDelete && (
                  <td style={actionCellStyle}>
                    <button 
                      style={editButtonStyle}
                      onClick={() => onEdit(plan)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      style={deleteButtonStyle}
                      onClick={() => onDelete(plan)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div style={tableStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Membership Plans</h3>
      </div>
      
      {isMobile ? renderMobileView() : renderDesktopView()}
    </div>
  );
};

export default PlanTable;