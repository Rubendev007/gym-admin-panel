import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import ToastContainer from './components/ui/Toast';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// export default App;

// import React from 'react';
// import AuthProvider from './context/AuthProvider';
// import Dashboard from './pages/Dashboard';
// import './App.css';

// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <Dashboard />
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

