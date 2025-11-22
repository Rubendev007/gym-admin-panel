import React from 'react';
import RevenueChart from '../components/dashboard/RevenueChart';
import MembershipChart from '../components/dashboard/MembershipChart';

const ChartTest = () => {
  const testPageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    color: 'white',
    marginBottom: '30px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  // Different data to prove they're reusable
  const testRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [5000, 7000, 6500, 8000, 9000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const testMembershipData = {
    labels: ['Gold Members', 'Silver Members', 'Bronze Members'],
    datasets: [
      {
        data: [50, 80, 120],
        backgroundColor: [
          'rgba(255, 215, 0, 0.8)',     // Gold
          'rgba(192, 192, 192, 0.8)',   // Silver
          'rgba(205, 127, 50, 0.8)',    // Bronze
        ],
        borderColor: [
          'rgba(255, 215, 0, 1)',
          'rgba(192, 192, 192, 1)',
          'rgba(205, 127, 50, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };

  return (
    <div style={testPageStyle}>
      <div style={headerStyle}>
        <h1>🧪 Chart Reusability Test</h1>
        <p>Same chart components, completely different page and data!</p>
      </div>
      
      <div style={gridStyle}>
        <div>
          <RevenueChart data={testRevenueData} />
        </div>
        
        <div>
          <MembershipChart data={testMembershipData} />
        </div>
      </div>
    </div>
  );
};

export default ChartTest;