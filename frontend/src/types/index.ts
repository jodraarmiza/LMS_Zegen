// User related types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
    avatarUrl?: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  // Dashboard related types
  export interface ProgressData {
    total: number;
    passed: number;
    inProgress: number;
    overdue: number;
    failed: number;
    notStarted: number;
  }
  
  export interface UserStats {
    points: number;
    certificates: number;
    gpa: string;
  }
  
  export interface CalendarDay {
    day: string;
    date: number;
    isActive?: boolean;
  }
  
  export interface Activity {
    id: string;
    time: string;
    category: string;
    title: string;
  }
  
  export interface Session {
    id: string;
    category: string;
    instructor: {
      id: string;
      name: string;
      avatarUrl?: string;
    };
    title: string;
    date: string;
    time: string;
    duration?: string;
  }
  
  export interface CourseView {
    id: string;
    type: 'Course' | 'Session';
    sessionNumber: string;
    title: string;
    progress: number;
  }
  
  // API response types
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }