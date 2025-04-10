// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

// Define User type
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  gender?: string;
  religion?: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  department?: string;
  profilePhotoURL?: string;
  studentInfo?: StudentInfo;
  instructorInfo?: InstructorInfo;
}

export interface StudentInfo {
  studentId: string;
  degree?: string;
  major?: string;
  stream?: string;
  currentSemester?: string;
  gpa?: number;
  skills?: string;
}

export interface InstructorInfo {
  position?: string;
  department?: string;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isInstructor: boolean;
  isStudent: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isInstructor: false,
  isStudent: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => false,
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const toast = useToast();

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        // Get user data from localStorage
        const userStr = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        
        if (userStr && accessToken) {
          const userData = JSON.parse(userStr);
          setUser(userData);
          
          // Optionally validate the token with the backend
          try {
            await validateToken();
          } catch (error) {
            // If validation fails, clear auth data
            handleLogout(false);
          }
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
        // Clear any invalid auth state
        handleLogout(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Validate token with the backend
  const validateToken = async (): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token');
    }
    
    const response = await fetch('http://localhost:8080/api/v1/auth/validate', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Invalid token');
    }
    
    const userData = await response.json();
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Check authentication status
  const checkAuth = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setUser(null);
      return false;
    }

    try {
      await validateToken();
      return true;
    } catch (error) {
      console.error('Authentication check failed:', error);
      setUser(null);
      return false;
    }
  };

  // Login function
  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid username or password');
      }
      
      const data = await response.json();
      
      // Store auth data
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      
      // Show success toast
      toast({
        title: 'Login successful',
        description: `Welcome back, ${data.user.name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Redirect based on user role
      navigateAfterLogin(data.user.role);
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate after login based on user role
  const navigateAfterLogin = (role: string) => {
    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'instructor':
        navigate('/instructor/dashboard');
        break;
      case 'student':
        navigate('/student/dashboard');
        break;
      default:
        navigate('/home');
    }
  };

  // Logout function
  const handleLogout = async (showToast: boolean = true): Promise<void> => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    try {
      if (refreshToken) {
        const accessToken = localStorage.getItem('accessToken');
        await fetch('http://localhost:8080/api/v1/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Clear state
      setUser(null);
      
      // Show toast if needed
      if (showToast) {
        toast({
          title: 'Logout successful',
          description: 'You have been logged out successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // Public logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await handleLogout(true);
    setIsLoading(false);
    navigate('/login');
  };

  // Computed properties
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isInstructor = user?.role === 'instructor';
  const isStudent = user?.role === 'student';

  // Context value
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isAdmin,
    isInstructor,
    isStudent,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;