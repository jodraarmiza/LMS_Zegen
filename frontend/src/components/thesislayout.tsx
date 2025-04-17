import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import ThesisSidebar from "./thesissidebar";

const ThesisLayout: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box h="100vh" bg="gray.50" overflow="hidden" position="relative">
      {/* Navbar Component */}
      <Navbar
        userName="Micheline Unviana"
        currentDate="15 April 2025"
        currentTime="09:54"
      />

      {/* Main content area */}
      <Flex h="calc(100vh - 70px)" overflow="hidden">
        {/* Thesis Sidebar */}
        <ThesisSidebar
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
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default ThesisLayout;