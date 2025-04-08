import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  userName?: string;
  currentDate?: string;
  currentTime?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  userName = "Anggara Swaradarma",
  currentDate = "11 March 2025",
  currentTime = "09:15",
}) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

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
      <Flex h="calc(100vh - 57px)" overflow="hidden">
        {/* Sidebar Component */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

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
