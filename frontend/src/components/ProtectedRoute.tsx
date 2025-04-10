// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Flex, Spinner, Text } from '@chakra-ui/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'instructor' | 'student')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['admin', 'instructor', 'student'] 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Flex 
        height="100vh" 
        width="100%" 
        justifyContent="center" 
        alignItems="center" 
        direction="column"
      >
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#0056A4"
          size="xl"
          mb={4}
        />
        <Text>Checking authentication...</Text>
      </Flex>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role as any)) {
    // Redirect to appropriate dashboard based on user role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'instructor':
        return <Navigate to="/instructor/dashboard" replace />;
      case 'student':
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/home" replace />;
    }
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute;