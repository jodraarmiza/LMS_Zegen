import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';
import Course from './pages/courses';
import Courses from './pages/courses';
import Login from './pages/login';
import HomeSelection from './pages/HomeSelection';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeSelection />} />
        
        {/* Protected Routes with Layout */}
        <Route 
          path="/" 
          element={
            <Layout>
              <Dashboard />
            </Layout>
          } 
        />
        <Route 
          path="/courses" 
          element={
            <Layout>
              <Courses />
            </Layout>
          } 
        />
        <Route 
          path="/course/:courseId" 
          element={
            <Layout>
              <Course />
            </Layout>
          } 
        />
        
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;