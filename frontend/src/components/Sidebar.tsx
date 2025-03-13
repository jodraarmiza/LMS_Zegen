import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  VStack,
  IconButton,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody
} from '@chakra-ui/react';
import { MdMenu as HamburgerIcon } from 'react-icons/md';


interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  activeTab: string;
  onTabChange?: (tabName: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange,
  isCollapsed,
  onToggleCollapse 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Define menu items for sidebar
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/'
    },
    {
      id: 'course',
      label: 'Course',
      icon: '📚',
      path: '/courses' 
    },
    {
      id: 'gradebook',
      label: 'GradeBook',
      icon: '📝',
      path: '/gradebook'
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: '💰',
      path: '/finance'
    },
    {
      id: 'skpi',
      label: 'SKPI',
      icon: '📄',
      path: '/skpi'
    },
    {
      id: 'studentRequest',
      label: 'Student Request',
      icon: '📋',
      path: '/student-request'
    },
    {
      id: 'event',
      label: 'Event',
      icon: '🗓️',
      path: '/event'
    }
  ];

  // Determine active tab based on current path
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path.includes('/courses')) return 'Course';
    if (path.includes('/course/')) return 'Course';
    if (path.includes('/gradebook')) return 'GradeBook';
    // ... other path checks
    
    return activeTab;
  };

  const currentActiveTab = getActiveTabFromPath();

  const handleTabClick = (tabName: string, path: string) => {
    // Update active tab state
    if (onTabChange) {
      onTabChange(tabName);
    }
    
    // Navigate to the corresponding path
    navigate(path);
  };

  return (
    <Box
      width={isCollapsed ? "60px" : "200px"}
      minW={isCollapsed ? "60px" : "200px"}
      bg="white"
      borderRightWidth="1px"
      borderRightColor="gray.200"
      py={6}
      px={isCollapsed ? 2 : 4}
      h="100%"
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
    >
      {/* Toggle button */}
      <IconButton
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        icon={isCollapsed ? <HamburgerIcon /> : <HamburgerIcon />}
        position="absolute"
        right={isCollapsed ? "10px" : "10px"}
        top="10px"
        size="sm"
        variant="ghost"
        onClick={onToggleCollapse}
        zIndex={2}
      />
      
      {/* Menu items */}
      <VStack
        spacing={4}
        align="stretch"
        mt={isCollapsed ? 12 : 6}
      >
        {menuItems.map((item) => (
          <Box key={item.id} position="relative">
            {isCollapsed ? (
              // Collapsed view with tooltip
              <Tooltip label={item.label} placement="right" hasArrow>
                <Flex
                  p={2}
                  borderRadius="md"
                  bg={currentActiveTab === item.label ? 'blue.50' : 'transparent'}
                  color={currentActiveTab === item.label ? 'blue.600' : 'gray.600'}
                  cursor="pointer"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => handleTabClick(item.label, item.path)}
                  _hover={{
                    bg: currentActiveTab === item.label ? 'blue.50' : 'gray.50'
                  }}
                >
                  <Box
                    width="20px"
                    height="20px"
                    borderWidth="1px"
                    borderColor={currentActiveTab === item.label ? 'blue.600' : 'gray.400'}
                    borderRadius="sm"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                  >
                    {item.icon}
                  </Box>
                </Flex>
              </Tooltip>
            ) : (
              // Expanded view
              <Flex
                p={2}
                borderRadius="md"
                bg={currentActiveTab === item.label ? 'blue.50' : 'transparent'}
                color={currentActiveTab === item.label ? 'blue.600' : 'gray.600'}
                cursor="pointer"
                alignItems="center"
                onClick={() => handleTabClick(item.label, item.path)}
                _hover={{
                  bg: currentActiveTab === item.label ? 'blue.50' : 'gray.50'
                }}
              >
                <Box
                  width="20px"
                  height="20px"
                  mr={3}
                  borderWidth="1px"
                  borderColor={currentActiveTab === item.label ? 'blue.600' : 'gray.400'}
                  borderRadius="sm"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                >
                  {item.icon}
                </Box>
                <Text fontWeight={currentActiveTab === item.label ? 'medium' : 'normal'}>
                  {item.label}
                </Text>
              </Flex>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;