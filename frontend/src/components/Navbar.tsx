import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  HStack,
  Text,
  IconButton,
  Avatar,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  Divider,
  Button
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  SearchIcon,
  BellIcon,
  CalendarIcon,
  TimeIcon,
  ChevronDownIcon,
  SettingsIcon,
  InfoIcon
} from '@chakra-ui/icons';
import logo from '../assets/zsm-logo.png';

interface NavbarProps {
  userName: string;
  currentDate?: string;
  currentTime?: string;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: 'assignment' | 'announcement' | 'grade' | 'message';
}

const Navbar: React.FC<NavbarProps> = ({
  userName,
  currentDate = '11 March 2025',
  currentTime = '09:15'
}) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Assignment',
      description: 'IT Service & Risk Management: Case Study 1',
      time: '10 min ago',
      isRead: false,
      type: 'assignment'
    },
    {
      id: '2',
      title: 'Grade Posted',
      description: 'Your grade for "UX Research Methods" has been posted',
      time: '2 hours ago',
      isRead: false,
      type: 'grade'
    },
    {
      id: '3',
      title: 'Class Announcement',
      description: 'Digital Banking class is rescheduled to March 15',
      time: 'Yesterday',
      isRead: false,
      type: 'announcement'
    }
  ]);

  const handleSignOut = () => {
    // You can add any sign-out logic here (clearing tokens, etc.)
    // Then navigate to the login page
    navigate('/login');
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'assignment':
        return '📝';
      case 'announcement':
        return '📢';
      case 'grade':
        return '🏆';
      case 'message':
        return '✉️';
      default:
        return '🔔';
    }
  };

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      px={14}
      py={6}
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
    >
      <Flex alignItems="center">
        
        {/* Using the ZSM logo */}
        <Image 
          src={logo}
          alt="ZSM Logo" 
          h="10" 
          mr={20} 
        />
        <InputGroup w="200px">
          <Input placeholder="Quick Search" size="sm" />
          <InputRightElement>
            <SearchIcon color="blue.500" />
          </InputRightElement>
        </InputGroup>
      </Flex>

      <Flex alignItems="center">
        <HStack mr={6}>
          <CalendarIcon color="gray.500" />
          <Text color="gray.500">{currentDate}</Text>
        </HStack>
        <HStack mr={6}>
          <TimeIcon color="gray.500" />
          <Text color="gray.500">{currentTime}</Text>
        </HStack>
        
        {/* Notifications */}
        <Box position="relative" mr={6}>
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <IconButton
                aria-label="Notifications"
                icon={<BellIcon />}
                variant="ghost"
                color="gray.500"
              />
            </PopoverTrigger>
            <PopoverContent width="350px">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight="bold">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Notifications</Text>
                  {unreadCount > 0 && (
                    <Button size="xs" variant="link" colorScheme="blue" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </Flex>
              </PopoverHeader>
              <PopoverBody p={0} maxHeight="400px" overflowY="auto">
                {notifications.length === 0 ? (
                  <Box p={4} textAlign="center" color="gray.500">
                    No notifications
                  </Box>
                ) : (
                  notifications.map((notification, index) => (
                    <Box key={notification.id}>
                      <Flex 
                        p={3} 
                        alignItems="flex-start" 
                        bg={notification.isRead ? 'white' : 'blue.50'}
                        _hover={{ bg: 'gray.50' }}
                        cursor="pointer"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Box 
                          mr={3} 
                          fontSize="xl"
                        >
                          {getNotificationIcon(notification.type)}
                        </Box>
                        <Box flex="1">
                          <Text fontWeight="medium" fontSize="sm">{notification.title}</Text>
                          <Text fontSize="xs" color="gray.600">{notification.description}</Text>
                          <Text fontSize="xs" color="gray.500" mt={1}>{notification.time}</Text>
                        </Box>
                        {!notification.isRead && (
                          <Box width="8px" height="8px" borderRadius="full" bg="blue.500" mt={1} />
                        )}
                      </Flex>
                      {index < notifications.length - 1 && <Divider m={0} />}
                    </Box>
                  ))
                )}
              </PopoverBody>
              <PopoverFooter textAlign="center">
                <Button size="sm" variant="link" colorScheme="blue">
                  View all notifications
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
          
          {/* Notification badge */}
          {unreadCount > 0 && (
            <Box 
              position="absolute" 
              top="-2px" 
              right="-2px" 
              bg="red.500" 
              color="white" 
              fontSize="xs" 
              fontWeight="bold" 
              borderRadius="full" 
              w="14px" 
              h="14px" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
            >
              {unreadCount}
            </Box>
          )}
        </Box>
        
        {/* User profile dropdown menu */}
        <Menu>
          <MenuButton>
            <Flex alignItems="center" cursor="pointer">
              <Avatar size="sm" src="https://placehold.co/32x32?text=AS" mr={2} />
              <Text color="gray.600" mr={1}>
                {userName}
              </Text>
              <ChevronDownIcon color="gray.500" />
            </Flex>
          </MenuButton>
          <MenuList zIndex={1000}>
            <MenuItem icon={<Box as="span">👤</Box>}>My Profile</MenuItem>
            <MenuItem icon={<SettingsIcon />}>Account Settings</MenuItem>
            <MenuItem icon={<InfoIcon />}>Help Center</MenuItem>
            <MenuDivider />
            <MenuItem color="red.500" onClick={handleSignOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;