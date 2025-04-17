import React, { useState, ReactNode } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Image,
  VStack,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { 
  HamburgerIcon, 
  ChevronRightIcon, 
  CalendarIcon, 
  TimeIcon, 
  ChevronDownIcon,
  InfoIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/zsm-logo.png";
import SidebarAdminOffice from "./SidebarAdminOffice";
import { FiLogOut } from "react-icons/fi";

interface AdminOfficeLayoutProps {
  children: ReactNode;
}

const AdminOfficeLayout: React.FC<AdminOfficeLayoutProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState(new Date());

  // Update time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format time and date for Jakarta timezone
  const formattedTime = time.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(time);

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    let breadcrumbs = [];
    let path = '';
    
    breadcrumbs.push({
      name: 'Home',
      path: '/'
    });
    
    for (let i = 0; i < pathnames.length; i++) {
      path += `/${pathnames[i]}`;
      
      // Skip internal paths like E-Campus
      if (pathnames[i] === 'E-Campus') continue;
      
      const name = pathnames[i].charAt(0).toUpperCase() + pathnames[i].slice(1);
      breadcrumbs.push({
        name,
        path
      });
    }
    
    return breadcrumbs;
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  const handleGoToProfile = () => {
    navigate("/E-Campus/Adminoffice/profile");
  };

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Sidebar Drawer for Mobile */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center">
              <Image src={logo} alt="ZSM Logo" h="8" />
              <Text ml={2} fontWeight="bold">Admin Office</Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack align="stretch" spacing={0}>
              <SidebarAdminOffice onToggleSidebar={onClose} />
              
              {/* Sign out option in mobile menu */}
              <Box w="100%" px={4} py={3} mt={2}>
                <Flex align="center" color="red.500" onClick={handleSignOut} cursor="pointer">
                  <Icon as={FiLogOut} mr={3} />
                  <Text>Sign Out</Text>
                </Flex>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Fixed Sidebar for Desktop */}
      <Box display={{ base: "none", md: "block" }}>
        <SidebarAdminOffice />
      </Box>

      {/* Main content */}
      <Box ml={{ base: 0, md: "240px" }} transition=".3s ease">
        {/* Navbar */}
        <Flex
          as="header"
          alignItems="center"
          justifyContent="space-between"
          py={3}
          px={6}
          bg="white"
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          height="70px"
          position="sticky"
          top="0"
          zIndex="sticky"
          boxShadow="sm"
        >
          <Flex alignItems="center">
            <IconButton
              aria-label="Menu"
              icon={<HamburgerIcon />}
              size="md"
              variant="ghost"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              mr={2}
            />
            <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
              {getBreadcrumbs().map((breadcrumb, index) => (
                <BreadcrumbItem key={index} isCurrentPage={index === getBreadcrumbs().length - 1}>
                  <BreadcrumbLink 
                    onClick={() => navigate(breadcrumb.path)}
                    fontWeight={index === getBreadcrumbs().length - 1 ? "bold" : "normal"}
                    color={index === getBreadcrumbs().length - 1 ? "teal.500" : "gray.500"}
                    _hover={{ textDecoration: "none", color: "teal.600" }}
                  >
                    {breadcrumb.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </Flex>

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
                  <Text fontSize="md" fontWeight="medium" color="gray.700">
                    {formattedDate}
                  </Text>
                </Flex>

                <Flex alignItems="center">
                  <Box as="span" mr={2} display="flex" alignItems="center">
                    <Icon as={TimeIcon} boxSize={4} color="gray.500" />
                  </Box>
                  <Text fontSize="md" fontWeight="medium" color="gray.700">
                    {formattedTime}
                  </Text>
                </Flex>
              </HStack>
            </Flex>

            {/* User profile dropdown menu */}
            <Menu>
              <MenuButton>
                <Flex alignItems="center" cursor="pointer">
                  <Avatar
                    size="sm"
                    src="https://placehold.co/32x32?text=AO"
                    mr={2}
                  />
                  <Text
                    color="gray.600"
                    mr={1}
                    display={{ base: "none", md: "block" }}
                  >
                    Admin Office
                  </Text>
                  <ChevronDownIcon
                    color="gray.500"
                    display={{ base: "none", md: "block" }}
                  />
                </Flex>
              </MenuButton>
              <MenuList zIndex={1000}>
                <MenuItem
                  icon={<Box as="span">👤</Box>}
                  onClick={handleGoToProfile}
                >
                  My Profile
                </MenuItem>
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

        {/* Page content */}
        <Box p={4}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminOfficeLayout;