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
  IconButton,
  InputGroup,
  Input,
  InputRightElement
} from '@chakra-ui/react';
import { CalendarIcon, TimeIcon, SearchIcon } from '@chakra-ui/icons';
import logo from '../assets/zsm-logo.png';

const HomeSelection: React.FC = () => {
  const navigate = useNavigate();
  
  // Get current date and time
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const formattedTime = today.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const handleSystemSelect = (system: string) => {
    switch(system) {
      case 'learning':
        // Navigate to the LMS dashboard
        navigate('/');
        break;
      case 'university':
        // Navigate to university system (placeholder)
        window.alert('University system coming soon');
        break;
      case 'thesis':
        // Navigate to thesis system (placeholder)
        window.alert('Thesis system coming soon');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header/Navbar */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        padding="4"
        bg="white"
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <Flex align="center">
          <Image src={logo} alt="ZSM Logo" height="10" />
          <InputGroup w="200px" ml={8}>
            <Input placeholder="Quick Search" size="sm" />
            <InputRightElement>
              <SearchIcon color="blue.500" />
            </InputRightElement>
          </InputGroup>
        </Flex>
        
        <Flex align="center">
          <HStack spacing={6} mr={4}>
            <HStack>
              <CalendarIcon color="gray.500" />
              <Text color="gray.500">{formattedDate}</Text>
            </HStack>
            <HStack>
              <TimeIcon color="gray.500" />
              <Text color="gray.500">{formattedTime}</Text>
            </HStack>
          </HStack>
          
          <Avatar size="sm" name="Anggara Swaradarma" src="https://placehold.co/32x32?text=AS" />
          <Text ml={2} color="gray.700">Anggara Swaradarma</Text>
        </Flex>
      </Flex>

      {/* Main Content */}
      <Box 
        p={8} 
        backgroundImage="linear-gradient(to right, rgba(255,192,128,0.2), rgba(128,192,255,0.2))"
        h="calc(100vh - 73px)"
      >
        <Box maxW="1200px" mx="auto">
          {/* Time/Date display */}
          <Box 
            bg="white" 
            borderRadius="lg" 
            boxShadow="sm" 
            p={4} 
            maxW="200px" 
            ml="auto"
            textAlign="center"
            mb={4}
          >
            <Heading size="lg">15.30</Heading>
            <Text color="gray.500">Wednesday, March 5</Text>
          </Box>
          
          {/* Welcome message */}
          <Box mb={12} mt={8}>
            <Heading as="h1" size="xl">Welcome To Your University Account,</Heading>
            <Text fontSize="lg" color="gray.600" mt={2}>
              Please pick your preferred module
            </Text>
          </Box>
          
          {/* System selection grid */}
          <SimpleGrid columns={3} spacing={8}>
            {/* Learning Management System */}
            <Box 
              bg="white" 
              borderRadius="lg" 
              p={8} 
              boxShadow="sm"
              textAlign="center"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
            >
              <Flex direction="column" align="center" justify="center" h="100%">
                <Box mb={4}>
                  <Box as="span" fontSize="5xl" role="img" aria-label="Learning Management System">
                    📚
                  </Box>
                </Box>
                <Text fontWeight="medium" mb={6}>Learning Management System</Text>
                <Button 
                  colorScheme="blue" 
                  width="full"
                  onClick={() => handleSystemSelect('learning')}
                >
                  Explore
                </Button>
              </Flex>
            </Box>
            
            {/* University System */}
            <Box 
              bg="white" 
              borderRadius="lg" 
              p={8} 
              boxShadow="sm"
              textAlign="center"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
            >
              <Flex direction="column" align="center" justify="center" h="100%">
                <Box mb={4}>
                  <Box as="span" fontSize="5xl" role="img" aria-label="My University">
                    🎓
                  </Box>
                </Box>
                <Text fontWeight="medium" mb={6}>My University</Text>
                <Button 
                  colorScheme="blue" 
                  width="full"
                  onClick={() => handleSystemSelect('university')}
                >
                  Explore
                </Button>
              </Flex>
            </Box>
            
            {/* Thesis System */}
            <Box 
              bg="white" 
              borderRadius="lg" 
              p={8} 
              boxShadow="sm"
              textAlign="center"
              transition="all 0.3s ease"
              _hover={{ transform: 'translateY(-5px)', boxShadow: 'md' }}
            >
              <Flex direction="column" align="center" justify="center" h="100%">
                <Box mb={4}>
                  <Box as="span" fontSize="5xl" role="img" aria-label="Thesis">
                    📝
                  </Box>
                </Box>
                <Text fontWeight="medium" mb={6}>Thesis</Text>
                <Button 
                  colorScheme="blue" 
                  width="full"
                  onClick={() => handleSystemSelect('thesis')}
                >
                  Explore
                </Button>
              </Flex>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeSelection;