import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import Dashboard from './pages/dashboard';
import Course from './pages/courses';
import Courses from './pages/courses';
import CourseSession from './pages/CourseSession';
import CourseAttendance from './pages/CourseAttendance';
import Login from './pages/login';
import HomeSelection from './pages/HomeSelection';
import Forum from './pages/Forum';
import Syllabus from './pages/Syllabus';
import Assessment from './pages/Assessment';
import Gradebook from './pages/Gradebook';
import AssessmentRubric from './pages/AssessmentRubric';
import People from './pages/People';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Routes>
        {/* Set login as the entry point */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeSelection />} />
        
        {/* Protected Routes with Layout */}
        <Route 
          path="/dashboard" 
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
        <Route 
          path="/course/:courseId/session/:sessionId" 
          element={
            <Layout>
              <CourseSession />
            </Layout>
          } 
        />
        <Route 
          path="/course/:courseId/attendance" 
          element={
            <Layout>
              <CourseAttendance />
            </Layout>
          } 
        />
        <Route 
          path="/course/:courseId/forum" 
          element={
            <Layout>
              <Forum />
            </Layout>
          } 
        />
        <Route 
          path="/course/:courseId/syllabus" 
          element={
            <Layout>
              <Syllabus />
            </Layout>
          } 
        />
        <Route 
          path="/course/:courseId/assessment" 
          element={
            <Layout>
              <Assessment />
            </Layout>
          } 
        />
        <Route 
          path="/course/:courseId/gradebook" 
          element={
            <Layout>
              <Gradebook />
            </Layout>
          } 
        />
        <Route 
          path="/course/:courseId/rubric" 
          element={
            <Layout>
              <AssessmentRubric />
            </Layout>
          } 
        />
        <Route 
          path="/course/:courseId/people" 
          element={
            <Layout>
              <People />
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