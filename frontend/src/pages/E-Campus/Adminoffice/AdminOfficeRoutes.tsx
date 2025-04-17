import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminOfficeLayout from './AdminOfficeLayout';
import AdminOfficeDashboard from './AdminOfficeDashboard';
import CourseManagement from './CourseManagement';
import EventManagement from './EventManagement';
import ApprovalManagement from './ApprovalManagement';
import SKPIManagement from './SKPIManagement';
import GradebookManagement from './GradebookManagement';
import SettingsPage from './SettingsPage';

const AdminOfficeRoutes: React.FC = () => {
  return (
    <AdminOfficeLayout>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminOfficeDashboard />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="events" element={<EventManagement />} />
        <Route path="approvals" element={<ApprovalManagement />} />
        <Route path="skpi" element={<SKPIManagement />} />
        <Route path="gradebook" element={<GradebookManagement />} />
        <Route path="settings" element={<SettingsPage />} />
        
        {/* Redirect any other paths to dashboard */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminOfficeLayout>
  );
};

export default AdminOfficeRoutes;