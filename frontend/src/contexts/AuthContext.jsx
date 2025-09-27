import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check authentication status on app start
  const checkAuth = async () => {
    try {
      setIsLoading(true);
      await api.get('/verify_token');
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      setIsAuthenticated(true);
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message };
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      const response = await api.post('/register', { email, password });
      setIsAuthenticated(true);
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};