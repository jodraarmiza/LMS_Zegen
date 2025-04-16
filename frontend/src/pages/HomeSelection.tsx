import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Heading,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  TimeIcon,
  ChevronDownIcon,
  InfoIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import logo from "../assets/zsm-logo.png";
import thesis from "../assets/graduation-celebration.png";
import lms from "../assets/stack-of-books.png";
import university from "../assets/graduation-cap.png";

// Define a type for the system parameter
type SystemType = "learning" | "university" | "thesis";

const HomeSelection: React.FC = () => {
  const navigate = useNavigate();
  const [time, setTime] = React.useState(new Date());

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

  const handleSystemSelect = (system: SystemType): void => {
    switch (system) {
      case "learning":
        navigate("/dashboard");
        break;
      case "university":
        navigate("/my-university/dashboard");
        break;
      case "thesis":
        // Update to navigate to thesis dashboard
        navigate("/thesis/dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  return (
    <Box minH="100vh" bg="white">
      {/* Navbar styled similar to Layout navbar */}
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
      >
        <Flex alignItems="center">
          <Image src={logo} alt="ZSM Logo" h="8" marginRight={2} />
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
                  src="https://placehold.co/32x32?text=AS"
                  mr={2}
                />
                <Text
                  color="gray.600"
                  mr={1}
                  display={{ base: "none", md: "block" }}
                >
                  Admin LMS
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

      {/* Main Content with Gradient Background */}
      <Box
        p={8}
        py={16}
        minH="calc(100vh - 70px)"
        maxH="calc(100vh - 70px)"
        overflow="auto"
        bg="radial-gradient(circle at 10% 50%, rgb(238, 229, 171), transparent 50%),
            radial-gradient(circle at 50% 50%, rgb(213, 229, 233), transparent 50%),
            radial-gradient(circle at 90% 50%, rgb(144, 189, 161), transparent 50%)"
        position="relative"
      >
        <Box maxW="1200px" mx="auto" position="relative">
          {/* Header Section */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb={8}
            position="relative"
          >
            <Box>
              <Heading
                as="h1"
                size="xl"
                color="gray.800"
                fontWeight="medium"
                mb={2}
              >
                Welcome To Your University Account,
              </Heading>
              <Text fontSize="lg" color="gray.500" fontWeight="medium">
                Please pick your preferred module
              </Text>
            </Box>

            {/* Time Display */}
            <Box
              bg="white"
              borderRadius="lg"
              p={4}
              width="330px"
              textAlign="center"
            >
              <Heading
                size="xl"
                color="gray.800"
                fontSize="2xl"
                fontWeight="bold"
                mb={1}
              >
                {formattedTime}
              </Heading>
              <Text color="gray.500" fontSize="md" fontWeight="medium">
                {formattedDate}
              </Text>
            </Box>
          </Flex>

          {/* System selection grid */}
          <Box position="relative" mt={100}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
              {/* Learning Management System */}
              <Box
                as="button"
                onClick={() => handleSystemSelect("learning")}
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="lg"
                p={6}
                boxShadow="sm"
                textAlign="center"
                minHeight="320px"
                border="4px solid"
                borderColor="gray.50"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition="transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "md",
                  borderColor: "blue.100"
                }}
                _active={{
                  transform: "translateY(0)",
                  boxShadow: "inner",
                }}
                width="100%"
              >
                <Flex 
                  direction="column" 
                  h="100%" 
                  w="100%" 
                  alignItems="center" 
                  justifyContent="center"
                  gap={6}
                >
                  <Image
                    src={lms}
                    alt="Learning Management System"
                    maxHeight="150px"
                    mb={4}
                  />
                  <Text fontWeight="semibold" color="blue.500" fontSize="xl">
                    Learning Management System
                  </Text>
                </Flex>
              </Box>

              {/* University System */}
              <Box
                as="button"
                onClick={() => handleSystemSelect("university")}
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="lg"
                p={6}
                boxShadow="sm"
                textAlign="center"
                minHeight="320px"
                border="4px solid"
                borderColor="gray.50"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition="transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "md",
                  borderColor: "purple.100"
                }}
                _active={{
                  transform: "translateY(0)",
                  boxShadow: "inner",
                }}
                width="100%"
              >
                <Flex 
                  direction="column" 
                  h="100%" 
                  w="100%" 
                  alignItems="center" 
                  justifyContent="center"
                  gap={6}
                >
                  <Image
                    src={university}
                    alt="My University"
                    maxHeight="150px"
                    mb={4}
                  />
                  <Text fontWeight="semibold" color="purple.500" fontSize="xl">
                    My University
                  </Text>
                </Flex>
              </Box>

              {/* Thesis System */}
              <Box
                as="button"
                onClick={() => handleSystemSelect("thesis")}
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="lg"
                p={6}
                boxShadow="sm"
                textAlign="center"
                minHeight="320px"
                border="4px solid"
                borderColor="gray.50"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                transition="transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "md",
                  borderColor: "green.100"
                }}
                _active={{
                  transform: "translateY(0)",
                  boxShadow: "inner",
                }}
                width="100%"
              >
                <Flex 
                  direction="column" 
                  h="100%" 
                  w="100%" 
                  alignItems="center" 
                  justifyContent="center"
                  gap={6}
                >
                  <Image
                    src={thesis}
                    alt="Thesis"
                    maxHeight="150px"
                    mb={4}
                  />
                  <Text fontWeight="semibold" color="green.500" fontSize="xl">
                    Thesis
                  </Text>
                </Flex>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeSelection;