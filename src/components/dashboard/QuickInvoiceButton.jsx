import React from 'react';

const QuickInvoiceButton = ({ onClick }) => {
  const buttonStyle = {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
    border: 'none',
    borderRadius: '16px',
    padding: 'clamp(16px, 3vw, 20px)',
    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    textAlign: 'center',
    width: '100%'
  };

  const hoverStyle = {
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)',
      background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)'
    },
    ':active': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
    }
  };

  const iconStyle = {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
  };

  const textStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    color: 'white',
    fontWeight: '600',
    margin: '0',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  };

  const subTextStyle = {
    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    margin: '0',
    opacity: '0.9'
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior - you can replace this with actual functionality
      console.log('Quick Invoice button clicked!');
      alert('Quick Invoice feature would open here!');
    }
  };

  return (
    <button 
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-4px)';
        e.target.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.3)';
      }}
      onMouseDown={(e) => {
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseUp={(e) => {
        e.target.style.transform = 'translateY(-4px)';
      }}
    >
      <div style={iconStyle}>🧾</div>
      <div style={textStyle}>Quick Invoice</div>
      <div style={subTextStyle}>Create New Bill</div>
    </button>
  );
};

export default QuickInvoiceButton;