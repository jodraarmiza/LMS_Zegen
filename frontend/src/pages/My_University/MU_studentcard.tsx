import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Image,
  Divider,
  Button,
  useToast,
  Badge,
} from "@chakra-ui/react";

const MU_studentcard: React.FC = () => {
  const toast = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your student card is being downloaded",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description: "Preparing your student card for printing",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Student Card
        </Heading>
        <Text color="gray.600">
          Access your digital student ID card and manage related services
        </Text>
      </Box>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        align="stretch"
      >
        {/* Digital Student Card */}
        <Box
          flex={1}
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="md"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Heading size="md" mb={4}>
            Digital Student Card
          </Heading>
          <Box
            borderRadius="lg"
            overflow="hidden"
            bg="blue.600"
            color="white"
            p={6}
            position="relative"
          >
            <Flex justifyContent="space-between">
              <VStack align="flex-start" spacing={1}>
                <Text fontSize="sm" opacity={0.8}>
                  Student ID
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  12345678
                </Text>
              </VStack>
              <Image
                src="https://placehold.co/60x60?text=ZSM"
                alt="University Logo"
                boxSize="60px"
              />
            </Flex>
            
            <Box mt={4}>
              <Text fontSize="sm" opacity={0.8}>
                Student Name
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                Admin LMS
              </Text>
            </Box>
            
            <HStack mt={3} spacing={6}>
              <Box>
                <Text fontSize="xs" opacity={0.8}>
                  Faculty
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  Information Technology
                </Text>
              </Box>
              <Box>
                <Text fontSize="xs" opacity={0.8}>
                  Program
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  Informatics Engineering
                </Text>
              </Box>
            </HStack>
            
            <Box mt={4}>
              <Text fontSize="xs" opacity={0.8}>
                Valid Until
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                March 2026
              </Text>
            </Box>
            
            <Badge 
              position="absolute" 
              bottom="16px" 
              right="16px"
              colorScheme="green"
              variant="solid"
              px={2}
              py={1}
              borderRadius="md"
            >
              Active
            </Badge>
          </Box>
          
          <HStack mt={4} spacing={4}>
            <Button 
              colorScheme="blue" 
              size="sm" 
              flex={1}
              leftIcon={<Box as="span">📲</Box>}
              onClick={handleDownload}
            >
              Download
            </Button>
            <Button 
              variant="outline" 
              colorScheme="blue" 
              size="sm" 
              flex={1}
              leftIcon={<Box as="span">🖨️</Box>}
              onClick={handlePrint}
            >
              Print
            </Button>
          </HStack>
        </Box>
        
        {/* Card Status & Services */}
        <Box
          flex={1}
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="md"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Heading size="md" mb={4}>
            Card Status & Services
          </Heading>
          
          <VStack spacing={4} align="stretch">
            <Flex 
              justify="space-between" 
              align="center" 
              p={3} 
              bg="green.50" 
              borderRadius="md"
            >
              <Box>
                <Text fontWeight="medium">Card Status</Text>
                <Text fontSize="sm" color="gray.600">Your card is active and valid</Text>
              </Box>
              <Badge colorScheme="green">Active</Badge>
            </Flex>
            
            <Divider />
            
            <Box>
              <Text fontWeight="medium" mb={2}>Card Services</Text>
              <VStack spacing={3} align="stretch">
                <Flex 
                  p={3} 
                  borderRadius="md" 
                  borderWidth="1px" 
                  borderColor="gray.200"
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                >
                  <Box as="span" fontSize="xl" mr={3}>🔄</Box>
                  <Box>
                    <Text fontWeight="medium">Replace Lost Card</Text>
                    <Text fontSize="sm" color="gray.600">Request a replacement for lost or damaged card</Text>
                  </Box>
                </Flex>
                
                <Flex 
                  p={3} 
                  borderRadius="md" 
                  borderWidth="1px" 
                  borderColor="gray.200"
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                >
                  <Box as="span" fontSize="xl" mr={3}>📱</Box>
                  <Box>
                    <Text fontWeight="medium">Virtual Card Access</Text>
                    <Text fontSize="sm" color="gray.600">Add your student card to Apple Wallet or Google Pay</Text>
                  </Box>
                </Flex>
                
                <Flex 
                  p={3} 
                  borderRadius="md" 
                  borderWidth="1px" 
                  borderColor="gray.200"
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                >
                  <Box as="span" fontSize="xl" mr={3}>❓</Box>
                  <Box>
                    <Text fontWeight="medium">Card Support</Text>
                    <Text fontSize="sm" color="gray.600">Get help with card-related issues</Text>
                  </Box>
                </Flex>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default MU_studentcard;