import React, { useState, useEffect, useRef } from 'react';
import MemberTable from '../components/members/MemberTable';
import MemberForm from '../components/members/MemberForm';
import SearchAndFilter from '../components/members/SearchAndFilter';
import BulkActions from '../components/members/BulkActions';
import { useAuthContext } from '../context/AuthProvider';
import { membersAPI } from '../api/members.api';
import { showToast } from '../components/ui/Toast';

const Members = () => {
  const { userRole, isAdmin, isStaff } = useAuthContext();
  const hasLoadedInitially = useRef(false);

  // State management
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    plan: '',
    dateRange: ''
  });

  // Bulk actions state
  const [selectedMembers, setSelectedMembers] = useState([]);

  const pageStyle = {
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

  const contentStyle = {
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
    gap: '12px'
  };

  const addButtonStyle = {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    opacity: actionLoading ? 0.6 : 1,
    pointerEvents: actionLoading ? 'none' : 'auto'
  };

  const loadingButtonStyle = {
    ...addButtonStyle,
    background: '#9ca3af'
  };

  const resetButtonStyle = {
    padding: '12px 16px',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const staffNoticeStyle = {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fef7cd 100%)',
    border: '1px solid #fcd34d',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    textAlign: 'center'
  };

  const errorStyle = {
    background: 'linear-gradient(135deg, #fecaca 0%, #fef2f2 100%)',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    color: '#dc2626'
  };

  const loadingStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalContentStyle = {
    background: 'white',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto'
  };

  // Filter members function
  const filterMembers = (members) => {
    return members.filter(member => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.phone && member.phone.includes(searchTerm));

      // Status filter
      const matchesStatus = !filters.status || member.status === filters.status;
      
      // Plan filter
      const matchesPlan = !filters.plan || member.plan === filters.plan;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  };

  // Get filtered members
  const filteredMembers = filterMembers(members);

  // Search and filter handlers
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({ status: '', plan: '', dateRange: '' });
  };

  // Bulk action handlers
  const handleSelectionChange = (member, isSelected) => {
    setSelectedMembers(prev => {
      if (isSelected) {
        return [...prev, member];
      } else {
        return prev.filter(m => m.id !== member.id);
      }
    });
  };

  const handleBulkUpdate = async (members, updateData) => {
    try {
      setActionLoading(true);
      
      // Update each member
      for (const member of members) {
        await membersAPI.updateMember(member.id, {
          ...member,
          ...updateData
        });
      }
      
      // Reload members
      await loadMembers();
      setSelectedMembers([]);
      alert(`Updated ${members.length} members successfully`);
    } catch (err) {
      alert(`Error updating members: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBulkDelete = async (membersToDelete) => {
    if (!isAdmin()) {
      alert('Only administrators can delete members');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${membersToDelete.length} members?`)) {
      try {
        setActionLoading(true);
        
        for (const member of membersToDelete) {
          await membersAPI.deleteMember(member.id);
        }
        
        await loadMembers();
        setSelectedMembers([]);
        alert(`Deleted ${membersToDelete.length} members successfully`);
      } catch (err) {
        alert(`Error deleting members: ${err.message}`);
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleClearSelection = () => {
    setSelectedMembers([]);
  };

  // Load members on component mount
  useEffect(() => {
    if (hasLoadedInitially.current) return;
    hasLoadedInitially.current = true;
    loadMembers(false); // Don't show toasts on initial load
  }, []);

  // Load members from API
  const loadMembers = async (showToasts = true) => {
    let loadingToast;
    if (showToasts) {
      loadingToast = showToast.loading('Loading members...');
    }
    try {
      setLoading(true);
      setError(null);
      const response = await membersAPI.getMembers();
      setMembers(response.data.data);
      if (showToasts) {
        showToast.dismiss(loadingToast);
        showToast.success(`Loaded ${response.data.data.length} members successfully`);
      }
    } catch (err) {
      setError(err.message);
      if (showToasts) {
        showToast.dismiss(loadingToast);
        showToast.error(`Failed to load members: ${err.message}`);
      }
      console.error('Failed to load members:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new member - Only Admin
  const handleAddMember = async (formData) => {
    if (!isAdmin()) {
      showToast.error('Only administrators can add new members');
      return;
    }

    const loadingToast = showToast.loading('Adding new member...');
    try {
      setActionLoading(true);
      const response = await membersAPI.addMember(formData);
      setMembers(prev => [...prev, response.data.data]);
      setShowForm(false);
      showToast.dismiss(loadingToast);
      showToast.success(`Successfully added ${formData.name}!`);
    } catch (err) {
      showToast.dismiss(loadingToast);
      showToast.error(`Failed to add member: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Update existing member
  const handleUpdateMember = async (formData) => {
    const loadingToast = showToast.loading('Updating member...');
    try {
      setActionLoading(true);
      
      if (!isAdmin()) {
        // Staff can only update basic info
        const staffAllowedFields = ['name', 'email', 'phone', 'plan', 'startDate', 'expiryDate'];
        const staffFormData = {};
        staffAllowedFields.forEach(field => {
          staffFormData[field] = formData[field];
        });
        
        formData = { ...editingMember, ...staffFormData };
        showToast.info('Staff update: Basic information only');
      }

      const response = await membersAPI.updateMember(editingMember.id, formData);
      setMembers(prev => 
        prev.map(member => 
          member.id === editingMember.id ? response.data.data : member
        )
      );
      setShowForm(false);
      setEditingMember(null);
      showToast.dismiss(loadingToast);
      showToast.success(`Successfully updated ${formData.name}!`);
    } catch (err) {
      showToast.dismiss(loadingToast);
      showToast.error(`Failed to update member: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete member - Only Admin
  const handleDeleteMember = async (memberToDelete) => {
    if (!isAdmin()) {
      showToast.error('Only administrators can delete members');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${memberToDelete.name}?`)) {
      const loadingToast = showToast.loading('Deleting member...');
      try {
        setActionLoading(true);
        await membersAPI.deleteMember(memberToDelete.id);
        setMembers(prev => prev.filter(member => member.id !== memberToDelete.id));
        showToast.dismiss(loadingToast);
        showToast.success(`Successfully deleted ${memberToDelete.name}`);
      } catch (err) {
        showToast.dismiss(loadingToast);
        showToast.error(`Failed to delete member: ${err.message}`);
      } finally {
        setActionLoading(false);
      }
    }
  };

  // Edit member
  const handleEditMember = (member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  // Form submission handler
  const handleFormSubmit = async (formData) => {
    if (editingMember) {
      await handleUpdateMember(formData);
    } else {
      await handleAddMember(formData);
    }
  };

  // Form cancel handler
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  // Open form for adding new member - Only Admin
  const handleAddNewMember = () => {
    if (!isAdmin()) {
      showToast.error('Only administrators can add new members');
      return;
    }
    showToast.info('Opening member registration form');
    setEditingMember(null);
    setShowForm(true);
  };

  // Retry loading members
  const handleRetry = () => {
    loadMembers(true); // Show toasts on manual retry
  };

  // Reset data to default
  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      const loadingToast = showToast.loading('Resetting data...');
      try {
        setActionLoading(true);
        await membersAPI.clearData();
        await loadMembers(false); // Don't show load toasts during reset
        showToast.dismiss(loadingToast);
        showToast.success('Data has been reset to default values');
      } catch (err) {
        showToast.dismiss(loadingToast);
        showToast.error(`Failed to reset data: ${err.message}`);
      } finally {
        setActionLoading(false);
      }
    }
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          {isAdmin() ? 'Member Management' : 'Member Directory'}
        </h1>
        <p style={subtitleStyle}>
          {isAdmin() 
            ? 'Manage all gym members and their membership details' 
            : 'View member information and contact details'
          }
        </p>
      </div>
      
      <div style={contentStyle}>
        {/* Staff Notice */}
        {isStaff() && (
          <div style={staffNoticeStyle}>
            <strong>Staff Access:</strong> You can view member details and update basic information. 
            Financial operations and member deletion require administrator privileges.
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div style={errorStyle}>
            <strong>Error:</strong> {error}
            <button 
              onClick={handleRetry}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Bulk Actions Component */}
        {selectedMembers.length > 0 && (
          <BulkActions 
            selectedMembers={selectedMembers}
            onBulkUpdate={handleBulkUpdate}
            onBulkDelete={handleBulkDelete}
            onClearSelection={handleClearSelection}
            loading={actionLoading}
          />
        )}

        {/* Add Member Button - Only for Admin */}
        {isAdmin() && (
          <div style={buttonContainerStyle}>
            <button 
              style={actionLoading ? loadingButtonStyle : addButtonStyle}
              onClick={handleAddNewMember}
              disabled={actionLoading}
              onMouseEnter={(e) => {
                if (!actionLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {actionLoading ? 'Loading...' : '+ Add New Member'}
            </button>

            {/* Reset Data Button */}
            <button 
              onClick={handleResetData}
              style={resetButtonStyle}
              disabled={actionLoading}
              onMouseEnter={(e) => {
                if (!actionLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Reset Data
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={loadingStyle}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
            <h3 style={{ color: '#64748b', margin: '0 0 8px 0' }}>Loading Members...</h3>
            <p style={{ color: '#94a3b8', margin: 0 }}>Please wait while we fetch member data</p>
          </div>
        )}

        {/* Search and Filter Component */}
        {!loading && !error && (
          <SearchAndFilter 
            onSearch={handleSearch}
            onFilter={handleFilter}
            onClear={handleClearFilters}
            loading={actionLoading}
          />
        )}

        {/* Member Table */}
        {!loading && !error && (
          <MemberTable 
            members={filteredMembers}  // Use filteredMembers instead of members
            onEdit={handleEditMember}
            onDelete={isAdmin() ? handleDeleteMember : undefined}
            canEdit={true}
            loading={actionLoading}
            selectedMembers={selectedMembers}
            onSelectionChange={handleSelectionChange}
          />
        )}

        {/* Member Form Modal */}
        {showForm && (
          <div style={modalOverlayStyle} onClick={handleFormCancel}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <MemberForm 
                member={editingMember}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isAdmin={isAdmin()}
                loading={actionLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;