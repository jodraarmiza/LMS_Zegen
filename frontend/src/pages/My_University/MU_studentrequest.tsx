import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface RequestLetterData {
  id: string;
  type: string;
  purpose: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected" | "completed";
}

const MU_studentrequest: React.FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [letterType, setLetterType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Sample request history
  const [requestHistory, setRequestHistory] = useState<RequestLetterData[]>([
    {
      id: "REQ-2025-001",
      type: "Academic Transcript",
      purpose: "Job Application",
      requestDate: "Apr 1, 2025",
      status: "completed",
    },
    {
      id: "REQ-2025-002",
      type: "Active Student Statement",
      purpose: "Visa Application",
      requestDate: "Mar 15, 2025",
      status: "approved",
    },
    {
      id: "REQ-2025-003",
      type: "Recommendation Letter",
      purpose: "Scholarship Application",
      requestDate: "Mar 10, 2025",
      status: "pending",
    },
  ]);

  const handleSubmit = () => {
    if (!letterType || !purpose) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Create a new request
    const newRequest: RequestLetterData = {
      id: `REQ-2025-${String(requestHistory.length + 1).padStart(3, "0")}`,
      type: letterType,
      purpose: purpose,
      requestDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "pending",
    };

    setRequestHistory([newRequest, ...requestHistory]);
    
    toast({
      title: "Request Submitted",
      description: `Your ${letterType} request has been submitted successfully.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    setLetterType("");
    setPurpose("");
    setAdditionalNotes("");
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "approved":
        return "blue";
      case "completed":
        return "green";
      case "rejected":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Request Letter
        </Heading>
        <Text color="gray.600">
          Request official letters and documents from the university
        </Text>
      </Box>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        align="stretch"
      >
        {/* Request Types */}
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
            Available Document Types
          </Heading>
          
          <VStack spacing={4} align="stretch">
            <Flex p={3} borderRadius="md" bg="blue.50" align="center">
              <Box as="span" fontSize="xl" mr={3}>📄</Box>
              <Box flex={1}>
                <Text fontWeight="medium">Academic Transcript</Text>
                <Text fontSize="sm" color="gray.600">Official record of your grades and courses</Text>
              </Box>
              <Badge colorScheme="blue">Popular</Badge>
            </Flex>
            
            <Flex p={3} borderRadius="md" borderWidth="1px" borderColor="gray.200" align="center">
              <Box as="span" fontSize="xl" mr={3}>📝</Box>
              <Box flex={1}>
                <Text fontWeight="medium">Active Student Statement</Text>
                <Text fontSize="sm" color="gray.600">Confirms your enrollment status</Text>
              </Box>
            </Flex>
            
            <Flex p={3} borderRadius="md" borderWidth="1px" borderColor="gray.200" align="center">
              <Box as="span" fontSize="xl" mr={3}>👨‍🏫</Box>
              <Box flex={1}>
                <Text fontWeight="medium">Recommendation Letter</Text>
                <Text fontSize="sm" color="gray.600">Academic recommendation from faculty</Text>
              </Box>
            </Flex>
            
            <Flex p={3} borderRadius="md" borderWidth="1px" borderColor="gray.200" align="center">
              <Box as="span" fontSize="xl" mr={3}>🎓</Box>
              <Box flex={1}>
                <Text fontWeight="medium">Graduation Certificate</Text>
                <Text fontSize="sm" color="gray.600">Copy of your graduation certificate</Text>
              </Box>
            </Flex>
            
            <Flex p={3} borderRadius="md" borderWidth="1px" borderColor="gray.200" align="center">
              <Box as="span" fontSize="xl" mr={3}>🔤</Box>
              <Box flex={1}>
                <Text fontWeight="medium">English Translation</Text>
                <Text fontSize="sm" color="gray.600">English translation of official documents</Text>
              </Box>
            </Flex>
            
            <Button 
              colorScheme="blue" 
              size="md" 
              leftIcon={<Box as="span">➕</Box>}
              onClick={onOpen}
              mt={2}
            >
              Submit New Request
            </Button>
          </VStack>
        </Box>
        
        {/* Request History */}
        <Box
          flex={1.5}
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="md"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Heading size="md" mb={4}>
            Request History
          </Heading>
          
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Request ID</Th>
                  <Th>Document Type</Th>
                  <Th>Purpose</Th>
                  <Th>Request Date</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {requestHistory.map((request) => (
                  <Tr key={request.id}>
                    <Td fontWeight="medium">{request.id}</Td>
                    <Td>{request.type}</Td>
                    <Td>{request.purpose}</Td>
                    <Td>{request.requestDate}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button size="xs" colorScheme="blue" variant="outline">
                          Details
                        </Button>
                        {request.status === "completed" && (
                          <Button size="xs" colorScheme="green">
                            Download
                          </Button>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          
          {requestHistory.length === 0 && (
            <Box textAlign="center" py={8} color="gray.500">
              No request history available
            </Box>
          )}
        </Box>
      </Flex>

      {/* New Request Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit New Document Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Document Type</FormLabel>
                <Select 
                  placeholder="Select document type" 
                  value={letterType}
                  onChange={(e) => setLetterType(e.target.value)}
                >
                  <option value="Academic Transcript">Academic Transcript</option>
                  <option value="Active Student Statement">Active Student Statement</option>
                  <option value="Recommendation Letter">Recommendation Letter</option>
                  <option value="Graduation Certificate">Graduation Certificate</option>
                  <option value="English Translation">English Translation</option>
                </Select>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Purpose</FormLabel>
                <Select 
                  placeholder="Select purpose" 
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option value="Job Application">Job Application</option>
                  <option value="Scholarship Application">Scholarship Application</option>
                  <option value="Further Study">Further Study</option>
                  <option value="Visa Application">Visa Application</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Additional Notes</FormLabel>
                <Textarea 
                  placeholder="Any specific requirements or details..." 
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MU_studentrequest;