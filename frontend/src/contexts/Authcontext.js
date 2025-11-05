import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication for now - replace with real auth later
  useEffect(() => {
    // For demo purposes, start with no user logged in
    // Comment out the auto-login logic
    /*
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentUser({ name: 'Demo User', email: 'demo@example.com' });
    }
    */
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser({ name: 'Demo User', email });
        localStorage.setItem('token', 'demo-token');
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.email,
          email: userData.email,
          password: userData.password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser({ name: userData.name, email: userData.email });
        localStorage.setItem('token', 'demo-token');
        return { success: true };
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};