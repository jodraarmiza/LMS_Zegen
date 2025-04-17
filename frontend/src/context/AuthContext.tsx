// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { API_BASE_URL } from '@/config'; // ⬅️ Tambahan ini

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
        const userStr = localStorage.getItem('user');
        const accessToken = localStorage.getItem('accessToken');
        
        if (userStr && accessToken) {
          const userData = JSON.parse(userStr);
          setUser(userData);

          try {
            await validateToken();
          } catch (error) {
            handleLogout(false);
          }
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
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

    const response = await fetch(`${API_BASE_URL}auth/validate`, { // ⬅️ pakai API_BASE_URL
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
      const response = await fetch(`${API_BASE_URL}auth/login`, { // ⬅️ pakai API_BASE_URL
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

  const navigateAfterLogin = (role: string) => {
    switch (role) {
      case 'admin':
        navigate('/E-Campus/Adminoffice');      // folder E-Campus/Adminoffice/index.tsx
        break;
      case 'instructor':
        navigate('/E-Campus/Adminkaprodi');     // folder E-Campus/Adminkaprodi/index.tsx
        break;
      case 'student':
        navigate('/homeSelection');
        break;
      default:
        navigate('/login');
    }
  };
  



  // Logout function
  const handleLogout = async (showToast: boolean = true): Promise<void> => {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      if (refreshToken) {
        const accessToken = localStorage.getItem('accessToken');
        await fetch(`${API_BASE_URL}auth/logout`, { // ⬅️ pakai API_BASE_URL
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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      setUser(null);

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

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isInstructor = user?.role === 'instructor';
  const isStudent = user?.role === 'student';

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
