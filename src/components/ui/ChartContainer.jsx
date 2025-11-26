import React from 'react';

const ChartContainer = ({ title, children, className = '' }) => {
  const containerStyle = {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: 'clamp(12px, 2vw, 16px)',
    padding: 'clamp(16px, 4vw, 24px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box'
  };

  const headerStyle = {
    marginBottom: 'clamp(16px, 3vw, 20px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px'
  };

  const titleStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0',
    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2'
  };

  const contentStyle = {
    position: 'relative',
    minHeight: 'clamp(250px, 35vw, 300px)'
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{title}</h3>
      </div>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;