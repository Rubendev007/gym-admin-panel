import React from 'react';
import AuthProvider from './context/AuthProvider';
import { routes } from './routes.config';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>Gym Admin Panel</h1>
        <p>Authentication system is ready!</p>
        <p>Available routes:</p>
        <ul>
          {Object.values(routes).map(route => (
            <li key={route}>{route}</li>
          ))}
        </ul>
      </div>
    </AuthProvider>
  );
}

export default App;