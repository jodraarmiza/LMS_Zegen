import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Divider,
  Button,
  Icon,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  SearchIcon,
  BellIcon,
  TimeIcon,
  ChevronDownIcon,
  SettingsIcon,
  InfoIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import logo from "../assets/zsm-logo.png";

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
  type: "assignment" | "announcement" | "grade" | "message";
}

const Navbar: React.FC<NavbarProps> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Assignment",
      description: "IT Service & Risk Management: Case Study 1",
      time: "10 min ago",
      isRead: false,
      type: "assignment",
    },
    {
      id: "2",
      title: "Grade Posted",
      description: 'Your grade for "UX Research Methods" has been posted',
      time: "2 hours ago",
      isRead: false,
      type: "grade",
    },
    {
      id: "3",
      title: "Class Announcement",
      description: "Digital Banking class is rescheduled to March 15",
      time: "Yesterday",
      isRead: false,
      type: "announcement",
    },
  ]);

  const handleSignOut = () => {
    navigate("/login");
  };
  
  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return "📝";
      case "announcement":
        return "📢";
      case "grade":
        return "🏆";
      case "message":
        return "✉️";
      default:
        return "🔔";
    }
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      location.pathname === "/courses" ||
      location.pathname.includes("/course/")
    ) {
      const searchEvent = new CustomEvent("globalSearch", {
        detail: { query: searchQuery },
      });
      window.dispatchEvent(searchEvent);
    } else {
      navigate("/courses");

      setTimeout(() => {
        const searchEvent = new CustomEvent("globalSearch", {
          detail: { query: searchQuery },
        });
        window.dispatchEvent(searchEvent);
      }, 500);
    }
  };
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      py={3}
      px={{ base: 3, md: 6 }}
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      height="70px"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
{/* Left Section: Back Button, Logo and Search */}
<Flex alignItems="center" flex={{ base: 1, lg: "none" }}>
  <IconButton
    aria-label="Go back"
    icon={<ChevronLeftIcon boxSize={6} />}
    variant="ghost"
    mr={4}
    onClick={() => navigate("/home")}
  />

  <Image 
    src={logo} 
    alt="ZSM Logo" 
    h="8" 
    mr={{ base: 4, md: 6 }} 
    display={{ base: "none", sm: "block" }}
  />

  <Box 
    position="relative" 
    maxW={{ base: "200px", sm: "250px", md: "320px", lg: "350px" }}
    w="100%"
  >
    <form onSubmit={handleSearch}>
      <InputGroup size="md">
        <Input
          placeholder="Quick Search"
          borderRadius="full"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          color="gray.600"
          h="38px"
          _placeholder={{ color: "gray.400" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          boxShadow="none"
          lineHeight="38px"
          py="0"
          px="16px"
        />
        <InputRightElement h="38px" w="38px">
          <IconButton
            aria-label="Search"
            icon={<SearchIcon color="white" boxSize="14px" />}
            colorScheme="blue"
            borderRadius="full"
            size="sm"
            h="30px"
            w="30px"
            minW="30px"
            type="submit"
            onClick={handleSearch}
          />
        </InputRightElement>
      </InputGroup>
    </form>
  </Box>
</Flex>

{/* Right Section: Date, Time, Notifications and Profile */}
<HStack spacing={4} justify="flex-end">
  {/* Date & Time */}
  <Flex 
    display={{ base: "none", md: "flex" }} 
    alignItems="center"
    bg="white"
    borderRadius="full"
    px={4}
    py={1.5}
    border="1px solid"
    borderColor="gray.200"
    boxShadow="none"
    h="40px"
  >
    <HStack spacing={6}>
      <Flex alignItems="center">
        <Box as="span" mr={2} display="flex" alignItems="center">
          <Icon as={CalendarIcon} boxSize={4} color="gray.500" />
        </Box>
        <Text fontSize="md" fontWeight="medium" color="gray.700">{formattedDate}</Text>
      </Flex>
      
      <Flex alignItems="center">
        <Box as="span" mr={2} display="flex" alignItems="center">
          <Icon as={TimeIcon} boxSize={4} color="gray.500" />
        </Box>
        <Text fontSize="md" fontWeight="medium" color="gray.700">{formattedTime}</Text>
      </Flex>
    </HStack>
  </Flex>

  {/* Notifications */}
  <Box position="relative">
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon boxSize="20px" />}
          variant="ghost"
          color="gray.500"
        />
      </PopoverTrigger>
      <PopoverContent width="350px">
      <PopoverArrow />
              <PopoverCloseButton my={1}/>
              <PopoverHeader fontWeight="bold">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Notifications</Text>
                  {unreadCount > 0 && (
                    <Button
                      size="xs"
                      variant="link"
                      colorScheme="blue"
                      onClick={markAllAsRead}
                      marginRight="25px"
                    >
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
                        bg={notification.isRead ? "white" : "blue.50"}
                        _hover={{ bg: "gray.50" }}
                        cursor="pointer"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Box mr={3} fontSize="xl">
                          {getNotificationIcon(notification.type)}
                        </Box>
                        <Box flex="1">
                          <Text fontWeight="medium" fontSize="sm">
                            {notification.title}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            {notification.description}
                          </Text>
                          <Text fontSize="xs" color="gray.500" mt={1}>
                            {notification.time}
                          </Text>
                        </Box>
                        {!notification.isRead && (
                          <Box
                            width="8px"
                            height="8px"
                            borderRadius="full"
                            bg="blue.500"
                            mt={1}
                          />
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

    {unreadCount > 0 && (
  <Box
  position="absolute"
  top="-2px"
  right="-2px"
  bg="red.500"
  color="white"
  fontSize="12px"
  fontWeight="bold"
  borderRadius="full"
  w="16px"
  h="16px"
  display="flex"
  alignItems="center"
  justifyContent="center"
  lineHeight="16px"
>
        {unreadCount}
      </Box>
    )}
  </Box>

  {/* User profile dropdown menu */}
  <Menu>
    <MenuButton ml={1}>
      <Flex alignItems="center" cursor="pointer">
        <Avatar
          size="sm"
          src="https://placehold.co/32x32?text=AS"
          mr={2}
        />
        <Text color="gray.600" mr={1} display={{ base: "none", md: "block" }}>
          {userName}
        </Text>
        <ChevronDownIcon color="gray.500" display={{ base: "none", md: "block" }} />
      </Flex>
    </MenuButton>
    <MenuList zIndex={1000}>
    <MenuItem icon={<Box as="span">👤</Box>} onClick={handleGoToProfile}>My Profile</MenuItem>
            <MenuItem icon={<SettingsIcon />}>Account Settings</MenuItem>
            <MenuItem icon={<InfoIcon />}>Help Center</MenuItem>
            <MenuDivider />
            <MenuItem color="red.500" onClick={handleSignOut}>
              Sign Out
            </MenuItem>
    </MenuList>
  </Menu>
</HStack>
    </Flex>
  );
};

export default Navbar;