import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import UniversitySidebar from "./UniversitySidebar";

interface LayoutProps {
  children: React.ReactNode;
  userName?: string;
  currentDate?: string;
  currentTime?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  userName = "Admin LMS",
  currentDate = "11 March 2025",
  currentTime = "09:15",
}) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const location = useLocation();

  // Check if the current path is under my-university
  const isUniversityPath = location.pathname.includes('/my-university');

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box h="100vh" bg="gray.50" overflow="hidden" position="relative">
      {/* Navbar Component */}
      <Navbar
        userName={userName}
        currentDate={currentDate}
        currentTime={currentTime}
      />

      {/* Main content area */}
      <Flex h="calc(100vh - 70px)" overflow="hidden">
        {/* Show appropriate Sidebar based on path */}
        {isUniversityPath ? (
          <UniversitySidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />
        ) : (
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <Box
          flex="1"
          transition="margin-left 0.3s ease"
          overflowY="auto"
          overflowX="hidden"
          h="100%"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;