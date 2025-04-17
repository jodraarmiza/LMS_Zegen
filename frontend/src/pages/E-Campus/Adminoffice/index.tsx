import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminOfficeLayout from './AdminOfficeLayout';
import AdminOfficeDashboard from './AdminOfficeDashboard';
import ProfileAdminOffice from './ProfileAdminOffice';

const AdminOfficeRoutes: React.FC = () => {
  return (
    <AdminOfficeLayout>
      <Routes>
        <Route path="dashboard" element={<AdminOfficeDashboard />} />
        <Route path="profile" element={<ProfileAdminOffice />} />
        {/* Redirect root path to dashboard */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        {/* Redirect any other path to dashboard */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminOfficeLayout>
  );
};

export default AdminOfficeRoutes;