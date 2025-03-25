import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  VStack,
  IconButton,
  Tooltip,
  useToast
} from '@chakra-ui/react';
import { MdMenu as HamburgerIcon } from 'react-icons/md';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  isImplemented: boolean;
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
  const toast = useToast();
  
  // Define menu items for sidebar with implementation status
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/dashboard',
      isImplemented: true
    },
    {
      id: 'course',
      label: 'Course',
      icon: '📚',
      path: '/courses',
      isImplemented: true
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: '📋',
      path: '/attendance-general',
      isImplemented: true
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: '🗓️',
      path: '/schedule',
      isImplemented: false
    },
    {
      id: 'gradebook',
      label: 'GradeBook',
      icon: '📝',
      path: '/gradebook',
      isImplemented: true
    },
    {
      id: 'assessment',
      label: 'Assessment',
      icon: '📄',
      path: '/assessment',
      isImplemented: true // Now implemented
    },
    {
      id: 'forum',
      label: 'Forum',
      icon: '💬',
      path: '/forum',
      isImplemented: false
    },
  ];

  // Determine active tab based on current path
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    
    if (path === '/dashboard') return 'Dashboard';
    if (path.includes('/courses')) return 'Course';
    if (path.includes('/course/')) return 'Course';
    if (path.includes('/gradebook')) return 'GradeBook';
    if (path.includes('/attendance')) return 'Attendance';
    if (path.includes('/attendance-general')) return 'Attendance';
    if (path.includes('/assessment')) return 'Assessment';
    if (path.includes('/skpi')) return 'SKPI';
    if (path.includes('/student-request')) return 'Student Request';
    if (path.includes('/event')) return 'Event';
    if (path.includes('/profile')) return 'Profile';
    
    return activeTab;
  };

  const currentActiveTab = getActiveTabFromPath();

  const handleTabClick = (tabName: string, path: string, isImplemented: boolean) => {
    // Update active tab state
    if (onTabChange) {
      onTabChange(tabName);
    }
    
    // If the menu item is implemented, navigate to its path
    if (isImplemented) {
      console.log(`Navigating to: ${path}`); // Debugging
      navigate(path);
    } else {
      // If not implemented, show a toast message and stay on the current page
      toast({
        title: "Coming Soon",
        description: `The ${tabName} module is currently under development.`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
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
      h="100vh"
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
    >
      {/* Toggle button */}
      <IconButton
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        icon={<HamburgerIcon />}
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
              <Tooltip label={`${item.label}${!item.isImplemented ? ' (Coming Soon)' : ''}`} placement="right" hasArrow>
                <Flex
                  p={2}
                  borderRadius="md"
                  bg={currentActiveTab === item.label ? 'blue.50' : 'transparent'}
                  color={currentActiveTab === item.label ? 'blue.600' : item.isImplemented ? 'gray.600' : 'gray.400'}
                  cursor="pointer"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => handleTabClick(item.label, item.path, item.isImplemented)}
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
                color={currentActiveTab === item.label ? 'blue.600' : item.isImplemented ? 'gray.600' : 'gray.400'}
                cursor="pointer"
                alignItems="center"
                onClick={() => handleTabClick(item.label, item.path, item.isImplemented)}
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
                  {!item.isImplemented && (
                    <Text as="span" fontSize="xs" color="gray.400" ml={1}>
                      (Coming Soon)
                    </Text>
                  )}
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