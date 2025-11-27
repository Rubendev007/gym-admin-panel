import React, { useState } from 'react';

const SearchAndFilter = ({ onSearch, onFilter, onClear, loading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    plan: '',
    dateRange: ''
  });

  const containerStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(226, 232, 240, 0.8)'
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 16px 0'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    alignItems: 'end'
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
    background: 'white',
    width: '100%'
  };

  const selectStyle = {
    ...inputStyle
  };

  const buttonStyle = {
    padding: '10px 16px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const clearButtonStyle = {
    ...buttonStyle,
    background: '#6b7280'
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilters({ status: '', plan: '', dateRange: '' });
    onClear();
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Search & Filter Members</h3>
      
      <div style={gridStyle}>
        {/* Search Input */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Search Members</label>
          <input
            type="text"
            style={inputStyle}
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={handleSearchChange}
            disabled={loading}
          />
        </div>

        {/* Status Filter */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Status</label>
          <select
            style={selectStyle}
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            disabled={loading}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* Plan Filter */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Plan</label>
          <select
            style={selectStyle}
            value={filters.plan}
            onChange={(e) => handleFilterChange('plan', e.target.value)}
            disabled={loading}
          >
            <option value="">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'end' }}>
          <button 
            style={clearButtonStyle}
            onClick={handleClear}
            disabled={loading}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;