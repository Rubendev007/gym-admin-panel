import React from 'react';

const StatsCard = ({ title, value, icon, color = 'blue', onClick }) => {
  const colorSchemes = {
    blue: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
    },
    green: {
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
    },
    orange: {
      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
    },
    red: {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(244, 63, 94, 0.1) 100%)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)'
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  const cardStyle = {
    background: scheme.background,
    border: scheme.border,
    borderRadius: '16px',
    padding: 'clamp(16px, 3vw, 20px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: onClick ? 'pointer' : 'default',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const hoverStyle = onClick ? {
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)'
    }
  } : {};

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  };

  const titleStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    color: '#64748b',
    fontWeight: '600',
    margin: '0'
  };

  const iconStyle = {
    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
    opacity: '0.8'
  };

  const valueStyle = {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '800',
    background: scheme.gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0',
    lineHeight: '1.2'
  };

  return (
    <div 
      style={{...cardStyle, ...hoverStyle}}
      onClick={onClick}
    >
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        {icon && <span style={iconStyle}>{icon}</span>}
      </div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
};

export default StatsCard;