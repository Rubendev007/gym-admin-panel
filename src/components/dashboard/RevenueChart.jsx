import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartContainer from '../ui/ChartContainer';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data: propData, className = '' }) => {
  const chartRef = useRef();
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
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Daily Revenue',
        data: [2400, 1800, 3200, 2800, 3600, 4200, 3800],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartData = propData || defaultData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        displayColors: false,
        titleFont: {
          size: isMobile ? 12 : 14,
          weight: '600',
        },
        bodyFont: {
          size: isMobile ? 11 : 13,
        },
        padding: 12,
        callbacks: {
          title: (context) => {
            return context[0].label;
          },
          label: (context) => {
            return `Revenue: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: isMobile ? 10 : 12,
            weight: '500',
          },
          maxRotation: isMobile ? 45 : 0,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: isMobile ? 10 : 12,
          },
          callback: (value) => isMobile ? `$${(value/1000).toFixed(0)}k` : `$${value.toLocaleString()}`,
        },
        border: {
          display: false,
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },

  };



  const statsStyle = {
    display: 'flex',
    gap: 'clamp(12px, 3vw, 24px)',
    marginBottom: 'clamp(16px, 3vw, 20px)',
    flexWrap: 'wrap'
  };

  const statItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
    borderRadius: '12px',
    border: '1px solid rgba(59, 130, 246, 0.1)',
    transition: 'all 0.3s ease',
    flex: '1',
    minWidth: '120px'
  };

  const statLabelStyle = {
    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
    color: '#64748b',
    fontWeight: '500'
  };

  const statValueStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const chartWrapperStyle = {
    position: 'relative',
    height: 'clamp(250px, 40vw, 350px)',
    width: '100%'
  };

  return (
    <ChartContainer 
      title="Revenue Overview (Last 7 Days)" 
      className={className}
    >
      <div style={statsStyle}>
        <div style={statItemStyle}>
          <span style={statLabelStyle}>Total Revenue</span>
          <span style={statValueStyle}>
            ${chartData.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}
          </span>
        </div>
        <div style={statItemStyle}>
          <span style={statLabelStyle}>Average Daily</span>
          <span style={statValueStyle}>
            ${Math.round(chartData.datasets[0].data.reduce((a, b) => a + b, 0) / 7).toLocaleString()}
          </span>
        </div>
      </div>
      <div style={chartWrapperStyle}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </ChartContainer>
  );
};

export default RevenueChart;