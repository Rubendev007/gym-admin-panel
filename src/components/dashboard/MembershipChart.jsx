import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartContainer from '../ui/ChartContainer';


ChartJS.register(ArcElement, Tooltip, Legend);

const MembershipChart = ({ data: propData, className = '' }) => {
  const chartRef = useRef();
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample data - can be replaced with props
  const defaultData = {
    labels: ['Active Memberships', 'Expired Memberships', 'Pending Memberships'],
    datasets: [
      {
        data: [245, 32, 18],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 3,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(239, 68, 68, 0.9)',
          'rgba(245, 158, 11, 0.9)',
        ],
        hoverBorderWidth: 4,
      },
    ],
  };

  const chartData = propData || defaultData;
  const total = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: isMobile ? '50%' : '60%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#f1f5f9',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        titleFont: {
          size: isMobile ? 12 : 14,
          weight: '600',
        },
        bodyFont: {
          size: isMobile ? 11 : 13,
        },
        padding: 12,
        callbacks: {
          label: (context) => {
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    onHover: (event, elements) => {
      if (elements.length > 0) {
        setHoveredSegment(elements[0].index);
      } else {
        setHoveredSegment(null);
      }
    },
  };

  const legendItems = chartData.labels.map((label, index) => {
    const value = chartData.datasets[0].data[index];
    const percentage = ((value / total) * 100).toFixed(1);
    const color = chartData.datasets[0].backgroundColor[index];
    
    return {
      label,
      value,
      percentage,
      color,
      index,
    };
  });



  const overviewStyle = {
    marginBottom: '20px'
  };

  const totalMembersStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
    borderRadius: '12px',
    border: '1px solid rgba(16, 185, 129, 0.1)',
    transition: 'all 0.3s ease'
  };

  const totalLabelStyle = {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
    marginBottom: '4px'
  };

  const totalValueStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const contentWrapperStyle = {
    display: 'flex',
    gap: 'clamp(16px, 4vw, 32px)',
    alignItems: 'center',
    flexDirection: 'row',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  };

  const chartWrapperStyle = {
    position: 'relative',
    height: 'clamp(200px, 30vw, 280px)',
    width: 'clamp(200px, 30vw, 280px)',
    flexShrink: 0
  };

  const chartCenterStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    pointerEvents: 'none'
  };

  const centerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const centerLabelStyle = {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
    marginBottom: '4px'
  };

  const centerValueStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const legendWrapperStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(12px, 2vw, 16px)',
    minWidth: '250px'
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(8px, 2vw, 12px)',
    padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
    borderRadius: '12px',
    background: 'rgba(248, 250, 252, 0.5)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer'
  };

  const legendColorStyle = {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    flexShrink: 0,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const legendContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  };

  const legendLabelStyle = {
    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
    fontWeight: '600',
    color: '#1e293b'
  };

  const legendStatsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(6px, 1.5vw, 8px)',
    flexWrap: 'wrap'
  };

  const legendValueStyle = {
    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
    fontWeight: '700',
    color: '#3b82f6'
  };

  const legendPercentageStyle = {
    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
    color: '#64748b',
    fontWeight: '500'
  };

  return (
    <ChartContainer 
      title="Membership Status Distribution" 
      className={className}
    >
      <div style={overviewStyle}>
        <div style={totalMembersStyle}>
          <span style={totalLabelStyle}>Total Members</span>
          <span style={totalValueStyle}>{total.toLocaleString()}</span>
        </div>
      </div>
      
      <div style={{
        ...contentWrapperStyle,
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <div style={chartWrapperStyle}>
          <Doughnut ref={chartRef} data={chartData} options={options} />
          <div style={chartCenterStyle}>
            <div style={centerContentStyle}>
              <span style={centerLabelStyle}>Members</span>
              <span style={centerValueStyle}>{total}</span>
            </div>
          </div>
        </div>
        
        <div style={legendWrapperStyle}>
          {legendItems.map((item) => (
            <div 
              key={item.index}
              style={legendItemStyle}
            >
              <div 
                style={{...legendColorStyle, backgroundColor: item.color}}
              ></div>
              <div style={legendContentStyle}>
                <span style={legendLabelStyle}>{item.label}</span>
                <div style={legendStatsStyle}>
                  <span style={legendValueStyle}>{item.value}</span>
                  <span style={legendPercentageStyle}>({item.percentage}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  );
};

export default MembershipChart;