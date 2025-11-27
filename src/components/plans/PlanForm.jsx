import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Yup validation schema
const planSchema = yup.object({
  name: yup
    .string()
    .required('Plan name is required')
    .min(2, 'Plan name must be at least 2 characters')
    .max(50, 'Plan name must be less than 50 characters'),
  
  duration: yup
    .number()
    .required('Duration is required')
    .oneOf([1, 3, 6, 12], 'Please select a valid duration'),
  
  price: yup
    .number()
    .required('Price is required')
    .typeError('Price must be a number')
    .min(1, 'Price must be at least $1')
    .max(1000, 'Price cannot exceed $1000'),
  
  tax: yup
    .number()
    .typeError('Tax must be a number')
    .min(0, 'Tax cannot be negative')
    .max(100, 'Tax cannot exceed 100%')
    .nullable()
    .transform((value) => (isNaN(value) || value === '' ? 0 : value)),
  
  description: yup
    .string()
    .max(200, 'Description must be less than 200 characters')
    .nullable()
});

const PlanForm = ({ plan, onSubmit, onCancel, loading = false }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(planSchema),
    defaultValues: plan || {
      name: '',
      duration: 1,
      price: '',
      tax: 0,
      description: ''
    }
  });

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

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical'
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
      // Convert string numbers to actual numbers
      const processedData = {
        ...data,
        duration: parseInt(data.duration),
        price: parseFloat(data.price),
        tax: parseFloat(data.tax) || 0
      };
      onSubmit(processedData);
    }
  };

  // Calculate total price (price + tax)
  const price = watch('price');
  const tax = watch('tax');
  const totalPrice = (parseFloat(price) || 0) + (parseFloat(tax) || 0);

  return (
    <div style={formStyle}>
      <h3 style={titleStyle}>
        {plan ? 'Edit Plan' : 'Add New Plan'}
      </h3>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div style={gridStyle}>
          {/* Plan Name */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Plan Name *</label>
            <input
              type="text"
              style={errors.name ? errorInputStyle : inputStyle}
              {...register('name')}
              placeholder="e.g., Premium Membership"
              disabled={loading}
            />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
          </div>

          {/* Duration */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Duration (Months) *</label>
            <select
              style={errors.duration ? errorInputStyle : selectStyle}
              {...register('duration')}
              disabled={loading}
            >
              <option value={1}>1 Month</option>
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>12 Months</option>
            </select>
            {errors.duration && <p style={errorStyle}>{errors.duration.message}</p>}
          </div>

          {/* Price */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Price ($) *</label>
            <input
              type="number"
              step="0.01"
              style={errors.price ? errorInputStyle : inputStyle}
              {...register('price')}
              placeholder="0.00"
              disabled={loading}
            />
            {errors.price && <p style={errorStyle}>{errors.price.message}</p>}
          </div>

          {/* Tax */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Tax ($)</label>
            <input
              type="number"
              step="0.01"
              style={errors.tax ? errorInputStyle : inputStyle}
              {...register('tax')}
              placeholder="0.00"
              disabled={loading}
            />
            {errors.tax && <p style={errorStyle}>{errors.tax.message}</p>}
          </div>

          {/* Total Price Display */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Total Price</label>
            <div style={{
              ...inputStyle,
              background: '#f8fafc',
              color: '#64748b',
              fontWeight: '600'
            }}>
              ${totalPrice.toFixed(2)}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
              Price + Tax
            </p>
          </div>

          {/* Description */}
          <div style={{ ...inputGroupStyle, gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              style={errors.description ? { ...textareaStyle, borderColor: '#ef4444' } : textareaStyle}
              {...register('description')}
              placeholder="Describe the plan features and benefits..."
              disabled={loading}
            />
            {errors.description && <p style={errorStyle}>{errors.description.message}</p>}
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
            {loading ? 'Processing...' : (plan ? 'Update Plan' : 'Add Plan')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlanForm;