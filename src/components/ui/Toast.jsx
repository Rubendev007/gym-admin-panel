import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Professional Toast Notification System
export const showToast = {
  success: (message) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        border: 'none',
        maxWidth: '400px',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#10b981',
      },
    });
  },

  error: (message) => {
    toast.error(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        border: 'none',
        maxWidth: '400px',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#ef4444',
      },
    });
  },

  loading: (message) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
        border: 'none',
        maxWidth: '400px',
      },
    });
  },

  info: (message) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      icon: 'ℹ️',
      style: {
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(14, 165, 233, 0.3)',
        border: 'none',
        maxWidth: '400px',
      },
    });
  },

  warning: (message) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      icon: '⚠️',
      style: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
        border: 'none',
        maxWidth: '400px',
      },
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Processing...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong',
    }, {
      position: 'top-right',
      style: {
        padding: '16px 20px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '400px',
      },
      success: {
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        },
      },
      error: {
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        },
      },
      loading: {
        style: {
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
        },
      },
    });
  }
};

// Toast Container Component with responsive design
const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{
        top: 20,
        right: 20,
        zIndex: 9999,
      }}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'white',
          color: '#374151',
          padding: '16px 20px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          maxWidth: '400px',
          wordBreak: 'break-word',
        },
        success: {
          duration: 4000,
          iconTheme: {
            primary: '#10b981',
            secondary: 'white',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#ef4444',
            secondary: 'white',
          },
        },
        loading: {
          iconTheme: {
            primary: '#3b82f6',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export default ToastContainer;