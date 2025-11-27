import React, { useState } from 'react';

const MemberTable = ({ members, onEdit, onDelete, canEdit, loading, selectedMembers, onSelectionChange }) => {
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

  // Selection Styles
  const checkboxStyle = {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  };

  const selectionCellStyle = {
    width: '40px',
    textAlign: 'center',
    padding: '16px 8px',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '0.875rem'
  };

  const selectionHeaderStyle = {
    ...selectionCellStyle,
    borderBottom: '1px solid #e2e8f0',
    fontWeight: '600',
    color: '#475569'
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

  const memberNameStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 4px 0'
  };

  const memberEmailStyle = {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '0'
  };

  const detailGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
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

  const statusStyle = (status) => {
    const styles = {
      Active: { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      Pending: { background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
      Expired: { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
    };
    return styles[status] || styles.Pending;
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

  // Sample data - will be replaced with props later
  const sampleMembers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      plan: 'Premium',
      expiryDate: '2024-03-15',
      dueAmount: 0,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      plan: 'Basic',
      expiryDate: '2024-02-28',
      dueAmount: 50,
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      plan: 'Premium',
      expiryDate: '2024-01-20',
      dueAmount: 0,
      status: 'Expired'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      plan: 'Standard',
      expiryDate: '2024-04-10',
      dueAmount: 25,
      status: 'Active'
    }
  ];

  const displayMembers = members || sampleMembers;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return amount === 0 ? 'Paid' : `$${amount}`;
  };

  // Selection handler
  const handleSelectMember = (member, isSelected) => {
    if (onSelectionChange) {
      onSelectionChange(member, isSelected);
    }
  };

  // Mobile Card View
  const renderMobileView = () => {
    return (
      <div style={{ padding: '16px' }}>
        {displayMembers.map((member) => {
          const statusStyles = statusStyle(member.status);
          const isSelected = selectedMembers?.some(selected => selected.id === member.id);
          
          return (
            <div key={member.id} style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input 
                    type="checkbox"
                    style={checkboxStyle}
                    checked={isSelected || false}
                    onChange={(e) => handleSelectMember(member, e.target.checked)}
                  />
                  <div>
                    <h4 style={memberNameStyle}>{member.name}</h4>
                    <p style={memberEmailStyle}>{member.email}</p>
                  </div>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  ...statusStyles
                }}>
                  {member.status}
                </span>
              </div>
              
              <div style={detailGridStyle}>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Plan</span>
                  <span style={detailValueStyle}>{member.plan}</span>
                </div>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Expires</span>
                  <span style={detailValueStyle}>{formatDate(member.expiryDate)}</span>
                </div>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Due</span>
                  <span style={detailValueStyle}>{formatCurrency(member.dueAmount)}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  style={editButtonStyle}
                  onClick={() => onEdit && onEdit(member)}
                >
                  Edit
                </button>
                <button 
                  style={deleteButtonStyle}
                  onClick={() => onDelete && onDelete(member)}
                >
                  Delete
                </button>
              </div>
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
            <th style={selectionHeaderStyle}>
              <input 
                type="checkbox"
                style={checkboxStyle}
                checked={selectedMembers?.length === members.length && members.length > 0}
                onChange={(e) => {
                  // Select all/deselect all logic
                  if (onSelectionChange) {
                    members.forEach(member => {
                      onSelectionChange(member, e.target.checked);
                    });
                  }
                }}
              />
            </th>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>Plan</th>
            <th style={headerCellStyle}>Expiry Date</th>
            <th style={headerCellStyle}>Due Amount</th>
            <th style={headerCellStyle}>Status</th>
            <th style={headerCellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayMembers.map((member) => {
            const statusStyles = statusStyle(member.status);
            const isSelected = selectedMembers?.some(selected => selected.id === member.id);
            
            return (
              <tr 
                key={member.id} 
                style={rowStyle}
                onMouseEnter={(e) => {
                  e.target.parentNode.style.backgroundColor = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.target.parentNode.style.backgroundColor = 'transparent';
                }}
              >
                <td style={selectionCellStyle}>
                  <input 
                    type="checkbox"
                    style={checkboxStyle}
                    checked={isSelected || false}
                    onChange={(e) => handleSelectMember(member, e.target.checked)}
                  />
                </td>
                <td style={cellStyle}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {member.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {member.email}
                    </div>
                  </div>
                </td>
                <td style={cellStyle}>{member.plan}</td>
                <td style={cellStyle}>{formatDate(member.expiryDate)}</td>
                <td style={cellStyle}>{formatCurrency(member.dueAmount)}</td>
                <td style={cellStyle}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    ...statusStyles
                  }}>
                    {member.status}
                  </span>
                </td>
                <td style={actionCellStyle}>
                  <button 
                    style={editButtonStyle}
                    onClick={() => onEdit && onEdit(member)}
                  >
                    Edit
                  </button>
                  <button 
                    style={deleteButtonStyle}
                    onClick={() => onDelete && onDelete(member)}
                  >
                    Delete
                  </button>
                </td>
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
        <h3 style={titleStyle}>Members List</h3>
      </div>
      
      {isMobile ? renderMobileView() : renderDesktopView()}
    </div>
  );
};

export default MemberTable;