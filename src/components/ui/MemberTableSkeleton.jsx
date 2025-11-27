function MemberTableSkeleton() {
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
      width: '500px',
      height: '20px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      margin: '0 auto',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    content: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '20px',
      gap: '12px'
    },
    button: {
      width: '150px',
      height: '44px',
      backgroundColor: '#e0e0e0',
      borderRadius: '8px',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    searchFilter: {
      display: 'flex',
      gap: '16px',
      marginBottom: '20px',
      alignItems: 'center'
    },
    search: {
      width: '300px',
      height: '40px',
      backgroundColor: '#e0e0e0',
      borderRadius: '6px',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    filter: {
      width: '150px',
      height: '40px',
      backgroundColor: '#e0e0e0',
      borderRadius: '6px',
      animation: 'pulse 1.5s ease-in-out infinite'
    },
    table: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
    },
    tableHeader: {
      display: 'grid',
      gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
      gap: '16px',
      padding: '16px 24px',
      backgroundColor: '#f8fafc',
      borderBottom: '1px solid #e2e8f0'
    },
    tableRow: {
      display: 'grid',
      gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
      gap: '16px',
      padding: '16px 24px',
      borderBottom: '1px solid #f1f5f9'
    },
    tableCell: {
      height: '20px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      animation: 'pulse 1.5s ease-in-out infinite'
    }
  };

  // Create 6 skeleton rows
  const skeletonRows = Array.from({ length: 6 }, (_, index) => (
    <div key={index} style={styles.tableRow}>
      <div style={styles.tableCell}></div>
      <div style={styles.tableCell}></div>
      <div style={styles.tableCell}></div>
      <div style={styles.tableCell}></div>
      <div style={styles.tableCell}></div>
    </div>
  ));

  return (
    <div style={styles.container}>
      {/* Header Skeleton */}
      <div style={styles.header}>
        <div style={styles.title}></div>
        <div style={styles.subtitle}></div>
      </div>
      
      <div style={styles.content}>
        {/* Button Container Skeleton */}
        <div style={styles.buttonContainer}>
          <div style={styles.button}></div>
          <div style={styles.button}></div>
        </div>

        {/* Search and Filter Skeleton */}
        <div style={styles.searchFilter}>
          <div style={styles.search}></div>
          <div style={styles.filter}></div>
          <div style={styles.filter}></div>
          <div style={styles.filter}></div>
        </div>

        {/* Table Skeleton */}
        <div style={styles.table}>
          {/* Table Header */}
          <div style={styles.tableHeader}>
            <div style={styles.tableCell}></div>
            <div style={styles.tableCell}></div>
            <div style={styles.tableCell}></div>
            <div style={styles.tableCell}></div>
            <div style={styles.tableCell}></div>
          </div>
          
          {/* Table Rows */}
          {skeletonRows}
        </div>
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

export default MemberTableSkeleton;