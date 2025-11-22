import React from 'react';
import { useForm } from 'react-hook-form';

const MemberForm = ({ member, onSubmit, onCancel, isAdmin = true }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: member || {
      name: '',
      email: '',
      phone: '',
      plan: 'Basic',
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      amount: '0'
    }
  });

  // Check if field should be disabled for staff
  const isFieldDisabled = (fieldName) => {
    if (isAdmin) return false;
    
    // Staff can only edit these fields
    const staffEditableFields = ['name', 'email', 'phone', 'plan', 'startDate', 'expiryDate'];
    return !staffEditableFields.includes(fieldName);
  };

  const formStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(226, 232, 240, 0.8)'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 20px 0'
  };

  const permissionNoticeStyle = {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fef7cd 100%)',
    border: '1px solid #fcd34d',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '20px',
    fontSize: '0.875rem',
    color: '#92400e'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  };

  const inputStyle = {
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
    background: 'white'
  };

  const disabledInputStyle = {
    ...inputStyle,
    background: '#f9fafb',
    color: '#6b7280',
    borderColor: '#e5e7eb',
    cursor: 'not-allowed'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#ef4444'
  };

  const errorStyle = {
    fontSize: '0.75rem',
    color: '#ef4444',
    margin: '0'
  };

  const selectStyle = {
    ...inputStyle,
    background: 'white'
  };

  const disabledSelectStyle = {
    ...selectStyle,
    background: '#f9fafb',
    color: '#6b7280',
    cursor: 'not-allowed'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px'
  };

  const submitButtonStyle = {
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const cancelButtonStyle = {
    padding: '10px 20px',
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log('Form data:', data);
      alert('Form submitted with: ' + JSON.stringify(data, null, 2));
    }
  };

  // Calculate default expiry date (30 days from start)
  const calculateExpiryDate = (startDate) => {
    if (!startDate) return '';
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  return (
    <div style={formStyle}>
      <h3 style={titleStyle}>
        {member ? 'Edit Member' : 'Add New Member'}
        {!isAdmin && <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '8px' }}>(Limited Access)</span>}
      </h3>
      
      {/* Permission Notice for Staff */}
      {!isAdmin && (
        <div style={permissionNoticeStyle}>
          <strong>Staff Access:</strong> You can update basic member information. 
          Financial fields are restricted to administrators.
        </div>
      )}
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div style={gridStyle}>
          {/* Name Field */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Full Name *</label>
            <input
              type="text"
              style={errors.name ? errorInputStyle : inputStyle}
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter full name"
              disabled={isFieldDisabled('name')}
            />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address *</label>
            <input
              type="email"
              style={errors.email ? errorInputStyle : inputStyle}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="Enter email address"
              disabled={isFieldDisabled('email')}
            />
            {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
          </div>

          {/* Phone Field */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              style={isFieldDisabled('phone') ? disabledInputStyle : inputStyle}
              {...register('phone')}
              placeholder="Enter phone number"
              disabled={isFieldDisabled('phone')}
            />
          </div>

          {/* Plan Selection */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Membership Plan *</label>
            <select
              style={isFieldDisabled('plan') ? disabledSelectStyle : selectStyle}
              {...register('plan', { required: 'Plan is required' })}
              disabled={isFieldDisabled('plan')}
            >
              <option value="Basic">Basic ($30/month)</option>
              <option value="Standard">Standard ($50/month)</option>
              <option value="Premium">Premium ($80/month)</option>
            </select>
            {errors.plan && <p style={errorStyle}>{errors.plan.message}</p>}
          </div>

          {/* Start Date */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Start Date *</label>
            <input
              type="date"
              style={errors.startDate ? errorInputStyle : (isFieldDisabled('startDate') ? disabledInputStyle : inputStyle)}
              {...register('startDate', { 
                required: 'Start date is required'
              })}
              disabled={isFieldDisabled('startDate')}
              onChange={(e) => {
                if (!isFieldDisabled('expiryDate')) {
                  const expiryDate = calculateExpiryDate(e.target.value);
                  if (!member?.expiryDate) {
                    const expiryInput = document.querySelector('input[name="expiryDate"]');
                    if (expiryInput) expiryInput.value = expiryDate;
                  }
                }
              }}
            />
            {errors.startDate && <p style={errorStyle}>{errors.startDate.message}</p>}
          </div>

          {/* Expiry Date */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Expiry Date *</label>
            <input
              type="date"
              style={errors.expiryDate ? errorInputStyle : (isFieldDisabled('expiryDate') ? disabledInputStyle : inputStyle)}
              {...register('expiryDate', { 
                required: 'Expiry date is required'
              })}
              disabled={isFieldDisabled('expiryDate')}
            />
            {errors.expiryDate && <p style={errorStyle}>{errors.expiryDate.message}</p>}
          </div>

          {/* Amount - Disabled for Staff */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>
              Amount Due
              {!isAdmin && <span style={{ color: '#6b7280', fontSize: '0.75rem', marginLeft: '4px' }}>(Admin Only)</span>}
            </label>
            <input
              type="number"
              step="0.01"
              style={isFieldDisabled('amount') ? disabledInputStyle : inputStyle}
              {...register('amount')}
              placeholder="0.00"
              disabled={isFieldDisabled('amount')}
            />
            {!isAdmin && (
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0 0' }}>
                Only administrators can update financial information
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div style={buttonGroupStyle}>
          <button 
            type="button" 
            style={cancelButtonStyle}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={submitButtonStyle}
          >
            {member ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;