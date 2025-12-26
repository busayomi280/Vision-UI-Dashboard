import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import ProtectedRoute from './protectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;