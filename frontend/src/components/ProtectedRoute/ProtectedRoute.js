import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Authcontext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;