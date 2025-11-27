import React from 'react';

const BulkActions = ({ selectedMembers, onBulkUpdate, onBulkDelete, onClearSelection, loading }) => {
  if (selectedMembers.length === 0) return null;

  const containerStyle = {
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    border: '1px solid #bae6fd',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px'
  };

  const selectionTextStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#0369a1'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const updateButtonStyle = {
    ...buttonStyle,
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    border: '1px solid rgba(59, 130, 246, 0.2)'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.2)'
  };

  const clearButtonStyle = {
    ...buttonStyle,
    background: 'rgba(100, 116, 139, 0.1)',
    color: '#64748b',
    border: '1px solid rgba(100, 116, 139, 0.2)'
  };

  const handleBulkStatusUpdate = (newStatus) => {
    if (onBulkUpdate) {
      onBulkUpdate(selectedMembers, { status: newStatus });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={selectionTextStyle}>
        {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
      </div>
      
      <div style={buttonGroupStyle}>
        <select 
          onChange={(e) => handleBulkStatusUpdate(e.target.value)}
          style={{ ...updateButtonStyle, padding: '8px 12px' }}
          disabled={loading}
        >
          <option value="">Update Status</option>
          <option value="Active">Mark as Active</option>
          <option value="Pending">Mark as Pending</option>
          <option value="Expired">Mark as Expired</option>
        </select>
        
        <button 
          style={deleteButtonStyle}
          onClick={() => onBulkDelete && onBulkDelete(selectedMembers)}
          disabled={loading}
        >
          Delete Selected
        </button>
        
        <button 
          style={clearButtonStyle}
          onClick={onClearSelection}
          disabled={loading}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export default BulkActions;