function DashboardSkeleton() {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      padding: 'clamp(16px, 4vw, 24px)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: 'clamp(24px, 5vw, 40px)'
    },
    title: {
      width: '300px',
      height: '40px',
      backgroundColor: '#e0e0e0',
      borderRadius: '8px',
      margin: '0 auto 16px auto',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    subtitle: {
      width: '400px',
      height: '20px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      margin: '0 auto',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
      gap: 'clamp(16px, 3vw, 20px)',
      marginBottom: 'clamp(24px, 5vw, 40px)',
      maxWidth: '1400px',
      margin: '0 auto 40px auto'
    },
    card: {
      height: '120px',
      backgroundColor: '#e0e0e0',
      borderRadius: '12px',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    gridStyle: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
      gap: 'clamp(16px, 4vw, 32px)',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    chartCard: {
      backgroundColor: '#e0e0e0',
      borderRadius: '12px',
      padding: '24px',
      height: '400px',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    roleSwitcher: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      padding: '10px 15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      border: '1px solid #e2e8f0'
    },
    roleButton: {
      padding: '5px 10px',
      margin: '0 2px',
      border: '1px solid #3b82f6',
      borderRadius: '4px',
      background: 'white',
      color: '#3b82f6',
      cursor: 'pointer',
      fontSize: '12px'
    },
    currentRole: {
      fontSize: '12px',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#1e293b'
    }
  };

  return (
    <div style={styles.container}>
      {/* Role Switcher Skeleton */}
      <div style={styles.roleSwitcher}>
        <div style={{...styles.currentRole, width: '80px', height: '14px', backgroundColor: '#e0e0e0', borderRadius: '4px', animation: 'pulse 1.5s ease-in-out infinite'}}></div>
        <div style={{width: '60px', height: '25px', backgroundColor: '#e0e0e0', borderRadius: '4px', animation: 'pulse 1.5s ease-in-out infinite'}}></div>
      </div>

      {/* Header Skeleton */}
      <div style={styles.header}>
        <div style={styles.title}></div>
        <div style={styles.subtitle}></div>
      </div>
      
      {/* Stats Cards Skeleton - 3 cards like your screenshot */}
      <div style={styles.statsGrid}>
        <div style={styles.card}></div>
        <div style={styles.card}></div>
        <div style={styles.card}></div>
      </div>
      
      {/* Charts Section Skeleton - 2 charts like your screenshot */}
      <div style={styles.gridStyle}>
        <div style={styles.chartCard}></div>
        <div style={styles.chartCard}></div>
      </div>

      {/* Add pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default DashboardSkeleton;