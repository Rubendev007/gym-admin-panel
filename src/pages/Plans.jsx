import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthProvider';
import { plansAPI } from '../api/plans.api';
import PlanTable from '../components/plans/PlanTable';
import PlanForm from '../components/plans/PlanForm';

const Plans = () => {
  const { isAdmin } = useAuthContext();

  // State management
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  // Load plans on component mount
  useEffect(() => {
    loadPlans();
  }, []);

  // Load plans from API
  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await plansAPI.getPlans();
      setPlans(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load plans:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new plan
  const handleAddPlan = async (formData) => {
    try {
      setActionLoading(true);
      const response = await plansAPI.addPlan(formData);
      setPlans(prev => [...prev, response.data.data]);
      setShowForm(false);
      alert(`Added new plan: ${formData.name}`);
    } catch (err) {
      alert(`Error adding plan: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Update existing plan
  const handleUpdatePlan = async (formData) => {
    try {
      setActionLoading(true);
      const response = await plansAPI.updatePlan(editingPlan.id, formData);
      setPlans(prev => 
        prev.map(plan => 
          plan.id === editingPlan.id ? response.data.data : plan
        )
      );
      setShowForm(false);
      setEditingPlan(null);
      alert(`Updated plan: ${formData.name}`);
    } catch (err) {
      alert(`Error updating plan: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete plan
  const handleDeletePlan = async (planToDelete) => {
    if (window.confirm(`Are you sure you want to delete "${planToDelete.name}"? This will affect members using this plan.`)) {
      try {
        setActionLoading(true);
        await plansAPI.deletePlan(planToDelete.id);
        setPlans(prev => prev.filter(plan => plan.id !== planToDelete.id));
        alert(`Deleted plan: ${planToDelete.name}`);
      } catch (err) {
        alert(`Error deleting plan: ${err.message}`);
      } finally {
        setActionLoading(false);
      }
    }
  };

  // Edit plan
  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  // Form submission handler
  const handleFormSubmit = async (formData) => {
    if (editingPlan) {
      await handleUpdatePlan(formData);
    } else {
      await handleAddPlan(formData);
    }
  };

  // Form cancel handler
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPlan(null);
  };

  // Open form for adding new plan
  const handleAddNewPlan = () => {
    setEditingPlan(null);
    setShowForm(true);
  };

  // Retry loading plans
  const handleRetry = () => {
    loadPlans();
  };

  // Reset data to default
  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to reset all plans to default? This cannot be undone.')) {
      try {
        setActionLoading(true);
        await plansAPI.clearData();
        await loadPlans();
        alert('Plans data has been reset to default values');
      } catch (err) {
        alert(`Error resetting data: ${err.message}`);
      } finally {
        setActionLoading(false);
      }
    }
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Plans Management</h1>
        <p style={subtitleStyle}>Manage gym membership plans and pricing</p>
      </div>
      
      <div style={contentStyle}>
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

        {/* Add Plan Button - Only for Admin */}
        {isAdmin() && (
          <div style={buttonContainerStyle}>
            <button 
              style={actionLoading ? loadingButtonStyle : addButtonStyle}
              onClick={handleAddNewPlan}
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
              {actionLoading ? 'Loading...' : '+ Add New Plan'}
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
            <h3 style={{ color: '#64748b', margin: '0 0 8px 0' }}>Loading Plans...</h3>
            <p style={{ color: '#94a3b8', margin: 0 }}>Please wait while we fetch membership plans</p>
          </div>
        )}

        {/* Plan Table */}
        {!loading && !error && (
          <PlanTable 
            plans={plans}
            onEdit={isAdmin() ? handleEditPlan : undefined}
            onDelete={isAdmin() ? handleDeletePlan : undefined}
            loading={actionLoading}
          />
        )}

        {/* Plan Form Modal */}
        {showForm && (
          <div style={modalOverlayStyle} onClick={handleFormCancel}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
              <PlanForm 
                plan={editingPlan}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                loading={actionLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;