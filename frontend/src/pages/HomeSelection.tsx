import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Image,
  SimpleGrid,
  Button,
  Heading,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { CalendarIcon, TimeIcon, ChevronDownIcon, InfoIcon, SettingsIcon } from '@chakra-ui/icons';
import logo from '../assets/zsm-logo.png';
import thesis from '../assets/Young woman celebrating university graduation.png';
import lms from '../assets/stack of books.png';
import university from '../assets/Graduation from university.png';


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
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  const formattedTimeBox = time.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  const formattedDate = `${time.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
  })} 
${time.toLocaleDateString("en-US", { month: "long" })} 
${time.toLocaleDateString("id-ID", { year: "numeric" })}`;

  const handleSystemSelect = (system: SystemType): void => {
    switch (system) {
      case "learning":
        navigate("/dashboard");
        break;
      case "university":
        window.alert("University system coming soon");
        break;
      case "thesis":
        window.alert("Thesis system coming soon");
        break;
      default:
        navigate("/dashboard");
    }
  };
  const handleSignOut = () => {
    navigate("/login");
  };

  const exploreButtonProps = {
    colorScheme: "blue",
    borderRadius: "full",
    width: "200px", // Fixed width for consistency
  };

  return (
    <Box minH="100vh" bg="white">
      <Flex
        as="header"
        align="center"
        justify="space-between"
        p="4"
        bg="white"
        borderBottomWidth="1px"
        borderColor="pink.200"
      >
        <Flex align="center">
          <Image
            src={logo}
            alt="ZSM Logo"
            height="32px"
            marginLeft={5}
            marginRight={10}
          />
        </Flex>
        <Flex align="center">
          <HStack spacing={6} mr={4} display={{ base: "none", md: "flex" }}>
            <HStack>
              <CalendarIcon color="gray.500" />
              <Text color="gray.500">{formattedDate}</Text>
            </HStack>
            <HStack>
              <TimeIcon color="gray.500" />
              <Text color="gray.500">{formattedTime}</Text>
            </HStack>
          </HStack>
          <Menu>
            <MenuButton>
              <Flex alignItems="center" cursor="pointer">
                <Avatar
                  size="sm"
                  src="https://placehold.co/32x32?text=AB"
                  mr={2}
                />
                <Text color="gray.600" mr={1} display={{ base: "none", sm: "block" }}>
                  Anggara Swaradarma
                </Text>
                <ChevronDownIcon color="gray.500" />
              </Flex>
            </MenuButton>
            <MenuList zIndex={1000}>
              <MenuItem icon={<InfoIcon />}>My Profile</MenuItem>
              <MenuItem icon={<SettingsIcon />}>Account Settings</MenuItem>
              <MenuDivider />
              <MenuItem color="red.500" onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Main Content with Gradient Background */}
      <Box
        p={{ base: 4, md: 8 }}
        minH="calc(100vh - 73px)"
        maxH={{ base: "auto", md: "calc(100vh - 73px)" }}
        overflow="auto"
        bg="radial-gradient(circle at 10% 50%, rgb(238, 229, 171), transparent 50%),
            radial-gradient(circle at 50% 50%, rgb(213, 229, 233), transparent 50%),
            radial-gradient(circle at 90% 50%, rgb(144, 189, 161), transparent 50%)"
        position="relative"
      >
        <Box maxW="1200px" mx="auto">
          {/* Welcome message */}
          <Box mb={{ base: 6, md: 12 }} mt={{ base: 4, md: 8 }}>
            <Heading as="h1" size="xl" color="gray.800">
              Welcome To Your University Account,
            </Heading>
            <Text fontSize="lg" color="gray.500" mt={2}>
              Please pick your preferred module
            </Text>
          </Box>

          {/* Time/Date display */}
          <Box
            position={{ base: "static", md: "absolute" }}
            top={{ md: "55px" }}
            right={{ md: "40px", lg: "120px", xl: "357px" }}
            
            p={4}
            width="220px"
            textAlign="center"
            mb={{ base: 6, md: 0 }}
            mx={{ base: "auto", md: 0 }}
            display={{ base: "block", md: "block" }}
          >
            <Heading size="lg">{formattedTimeBox}</Heading>
            <Text color="gray.500">{formattedDate}</Text>
          </Box>

          {/* System selection grid */}
          <Box position="relative" mt={{ base: 4, md: 0 }} top={{ md: "75px" }}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 8 }}>
              {/* Learning Management System */}
              <Box
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="lg"
                p={{ base: 4, md: 6, lg: 8 }}
                boxShadow="sm"
                textAlign="center"
                minHeight={{ base: "250px", md: "280px", lg: "320px" }}
                height="auto"
                border="2px solid"
                borderColor="gray.100"
              >
                <Flex
                  direction="column"
                  align="center"
                  justify="space-between"
                  h="100%"
                >
                  <Box
                    flex="1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/api/placeholder/120/120"
                      alt="Learning Management System"
                      fallback={
                        <Box
                          width="150px"
                          height="120px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Image src={lms} alt="LMS Books" />
                        </Box>
                      }
                    />
                  </Box>
                  <Box mt="auto">
                    <Text fontWeight="medium" mb={{ base: 3, md: 6 }} color="blue.500">
                      Learning Management System
                    </Text>
                    <Button
                      {...exploreButtonProps}
                      onClick={() => handleSystemSelect("learning")}
                    >
                      Explore
                    </Button>
                  </Box>
                </Flex>
              </Box>

              {/* University System */}
              <Box
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="lg"
                p={{ base: 4, md: 6, lg: 8 }}
                boxShadow="sm"
                textAlign="center"
                minHeight={{ base: "250px", md: "280px", lg: "320px" }}
                height="auto"
                border="2px solid"
                borderColor="gray.100"
              >
                <Flex
                  direction="column"
                  align="center"
                  justify="space-between"
                  h="100%"
                >
                  <Box
                    flex="1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/api/placeholder/120/120"
                      alt="My University"
                      fallback={
                        <Box
                          width="150px"
                          height="120px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Image src={university} alt="University" />
                        </Box>
                      }
                    />
                  </Box>
                  <Box mt="auto">
                    <Text fontWeight="medium" mb={{ base: 3, md: 6 }} color="blue.500">
                      My University
                    </Text>
                    <Button
                      {...exploreButtonProps}
                      onClick={() => handleSystemSelect("university")}
                    >
                      Explore
                    </Button>
                  </Box>
                </Flex>
              </Box>

              {/* Thesis System */}
              <Box
                bg="rgba(255, 255, 255, 0.3)"
                borderRadius="lg"
                p={{ base: 4, md: 6, lg: 8 }}
                boxShadow="sm"
                textAlign="center"
                minHeight={{ base: "250px", md: "280px", lg: "320px" }}
                height="auto"
                border="2px solid"
                borderColor="gray.100"
              >
                <Flex
                  direction="column"
                  align="center"
                  justify="space-between"
                  h="100%"
                >
                  <Box
                    flex="1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/api/placeholder/120/120"
                      alt="Thesis"
                      fallback={
                        <Box
                          width="150px"
                          height="120px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Image src={thesis} alt="Thesis" />
                        </Box>
                      }
                    />
                  </Box>
                  <Box mt="auto">
                    <Text fontWeight="medium" mb={{ base: 3, md: 6 }} color="blue.500">
                      Thesis
                    </Text>
                    <Button
                      {...exploreButtonProps}
                      onClick={() => handleSystemSelect("thesis")}
                    >
                      Explore
                    </Button>
                  </Box>
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