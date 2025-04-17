import React from "react";
import {
  Box,
  VStack,
  Link,
  Icon,
  Text,
  Flex,
  Image,
  Divider
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { 
  FiHome, 
  FiCalendar, 
  FiBookOpen, 
  FiCheckSquare,
  FiAward,
  FiBarChart2,
  FiSettings
} from "react-icons/fi";
import logo from "../../../assets/zsm-logo.png";

interface SidebarAdminOfficeProps {
  onToggleSidebar?: () => void;
}

const SidebarAdminOffice: React.FC<SidebarAdminOfficeProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define sidebar menu items
  const menuItems = [
    {
      name: "Dashboard",
      icon: FiHome,
      path: "/E-Campus/Adminoffice/dashboard",
    },
    {
      name: "Courses",
      icon: FiBookOpen,
      path: "/E-Campus/Adminoffice/courses",
    },
    {
      name: "Events",
      icon: FiCalendar,
      path: "/E-Campus/Adminoffice/events",
    },
    {
      name: "Approvals",
      icon: FiCheckSquare,
      path: "/E-Campus/Adminoffice/approvals",
    },
    {
      name: "SKPI",
      icon: FiAward,
      path: "/E-Campus/Adminoffice/skpi",
    },
    {
      name: "Gradebook",
      icon: FiBarChart2,
      path: "/E-Campus/Adminoffice/gradebook",
    },
    {
      name: "Settings",
      icon: FiSettings,
      path: "/E-Campus/Adminoffice/settings",
    },
  ];

  // Check if a menu item is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <Box
      position="fixed"
      left={0}
      h="full"
      w="240px"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      zIndex={10}
    >
      <Flex
        h="70px"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <Flex align="center">
          <Image src={logo} alt="ZSM Logo" h="8" />
          <Text ml={2} fontWeight="bold" fontSize="lg" color="gray.700">Admin Office</Text>
        </Flex>
      </Flex>
      
      <VStack align="stretch" spacing={0} mt={2}>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            px={4}
            py={3}
            fontSize="md"
            fontWeight={isActive(item.path) ? "bold" : "normal"}
            color={isActive(item.path) ? "teal.500" : "gray.700"}
            bg={isActive(item.path) ? "teal.50" : "transparent"}
            borderLeftWidth={isActive(item.path) ? "4px" : "0"}
            borderLeftColor="teal.500"
            _hover={{ textDecoration: "none", bg: "gray.100" }}
            onClick={() => navigate(item.path)}
          >
            <Flex align="center">
              <Icon as={item.icon} mr={3} />
              <Text>{item.name}</Text>
            </Flex>
          </Link>
        ))}
        
        <Box flex={1} minH="20px" /> {/* Spacer */}
        
        <Divider my={2} />
        
        {/* Back to home at bottom */}
        <Link
          px={4}
          py={3}
          fontSize="sm"
          color="gray.500"
          _hover={{ textDecoration: "none", bg: "gray.100" }}
          onClick={handleGoToHome}
        >
          <Flex align="center">
            <Icon as={ChevronLeftIcon} mr={2} />
            <Text>Back to Home</Text>
          </Flex>
        </Link>
      </VStack>
    </Box>
  );
};

export default SidebarAdminOffice;