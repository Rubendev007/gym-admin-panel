import React from 'react';
import AuthProvider from './context/AuthProvider';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Dashboard />
      </div>
    </AuthProvider>
  );
}

export default App;