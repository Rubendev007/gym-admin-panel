import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Yup validation schema with fixed date validation
const memberSchema = yup.object({
  name: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  phone: yup
    .string()
    .matches(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number')
    .nullable(),
  
  plan: yup
    .string()
    .required('Membership plan is required')
    .oneOf(['Basic', 'Standard', 'Premium'], 'Please select a valid plan'),
  
  startDate: yup
    .string()
    .required('Start date is required')
    .test('is-future-or-today', 'Start date cannot be in the past', function(value) {
      if (!value) return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of day
      const selectedDate = new Date(value);
      return selectedDate >= today;
    }),
  
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .test('is-after-start', 'Expiry date must be after start date', function(value) {
      if (!value) return true;
      const startDate = this.parent.startDate;
      if (!startDate) return true;
      return new Date(value) > new Date(startDate);
    }),
  
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .min(0, 'Amount cannot be negative')
    .nullable()
    .transform((value) => (isNaN(value) || value === '' ? undefined : value))
});

const MemberForm = ({ member, onSubmit, onCancel, isAdmin = true, loading = false }) => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(memberSchema),
    defaultValues: member || {
      name: '',
      email: '',
      phone: '',
      plan: 'Basic',
      startDate: new Date().toISOString().split('T')[0], // Today's date as default
      expiryDate: '',
      amount: '0'
    }
  });

  // Watch startDate to auto-calculate expiry date
  const startDate = watch('startDate');

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
    background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: loading ? 0.7 : 1
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
    if (onSubmit && !loading) {
      onSubmit(data);
    }
  };

  // Calculate default expiry date (30 days from start)
  const calculateExpiryDate = (startDate) => {
    if (!startDate) return '';
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  // Auto-set expiry date when start date changes
  React.useEffect(() => {
    if (startDate && !member?.expiryDate) {
      const expiryDate = calculateExpiryDate(startDate);
      setValue('expiryDate', expiryDate);
    }
  }, [startDate, member, setValue]);

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
              style={errors.name ? errorInputStyle : (isFieldDisabled('name') ? disabledInputStyle : inputStyle)}
              {...register('name')}
              placeholder="Enter full name"
              disabled={isFieldDisabled('name') || loading}
            />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address *</label>
            <input
              type="email"
              style={errors.email ? errorInputStyle : (isFieldDisabled('email') ? disabledInputStyle : inputStyle)}
              {...register('email')}
              placeholder="Enter email address"
              disabled={isFieldDisabled('email') || loading}
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
              disabled={isFieldDisabled('phone') || loading}
            />
            {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
          </div>

          {/* Plan Selection */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Membership Plan *</label>
            <select
              style={isFieldDisabled('plan') ? disabledSelectStyle : selectStyle}
              {...register('plan')}
              disabled={isFieldDisabled('plan') || loading}
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
              {...register('startDate')}
              disabled={isFieldDisabled('startDate') || loading}
            />
            {errors.startDate && <p style={errorStyle}>{errors.startDate.message}</p>}
          </div>

          {/* Expiry Date */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Expiry Date *</label>
            <input
              type="date"
              style={errors.expiryDate ? errorInputStyle : (isFieldDisabled('expiryDate') ? disabledInputStyle : inputStyle)}
              {...register('expiryDate')}
              disabled={isFieldDisabled('expiryDate') || loading}
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
              disabled={isFieldDisabled('amount') || loading}
            />
            {errors.amount && <p style={errorStyle}>{errors.amount.message}</p>}
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
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={submitButtonStyle}
            disabled={loading}
          >
            {loading ? 'Processing...' : (member ? 'Update Member' : 'Add Member')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;