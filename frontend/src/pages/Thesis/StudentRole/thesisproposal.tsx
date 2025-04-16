import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  VStack,
  HStack,
  Badge,
  Flex,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Progress,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  WarningIcon,
  InfoIcon,
  AttachmentIcon,
  DownloadIcon,
  AddIcon,
  ChevronRightIcon,
  CloseIcon,
  TimeIcon,
  IconButton,
} from "@chakra-ui/icons";
import { FaFilePdf, FaFileWord, FaUser } from "react-icons/fa";

interface ProposalSubmission {
  id: string;
  title: string;
  submissionDate: string;
  status: "draft" | "submitted" | "reviewed" | "approved" | "rejected";
  feedback?: string;
  version: number;
  advisor: string;
  file?: string;
}

interface Advisor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  available: boolean;
}

const ThesisProposal: React.FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);
  
  // Form state
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [background, setBackground] = useState("");
  const [objectives, setObjectives] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  
  // Sample data
  const [proposals, setProposals] = useState<ProposalSubmission[]>([
    {
      id: "PROP-2025-001",
      title: "Analysis of Machine Learning Algorithms for Predictive Analytics in Healthcare",
      submissionDate: "Mar 15, 2025",
      status: "approved",
      feedback: "Excellent proposal. Clear objectives and methodology. Approved to proceed.",
      version: 2,
      advisor: "Dr. Robert Johnson"
    },
    {
      id: "PROP-2025-002",
      title: "Prototype Proposal: Healthcare Data Mining Approach",
      submissionDate: "Feb 10, 2025",
      status: "reviewed",
      feedback: "Good start, but needs more detailed methodology section. Please revise and resubmit.",
      version: 1,
      advisor: "Dr. Robert Johnson"
    }
  ]);
  
  const advisors: Advisor[] = [
    {
      id: "adv1",
      name: "Dr. Robert Johnson",
      department: "Computer Science",
      specialization: "Machine Learning, Data Mining",
      available: true
    },
    {
      id: "adv2",
      name: "Dr. Emily Chen",
      department: "Computer Science",
      specialization: "Artificial Intelligence, Natural Language Processing",
      available: true
    },
    {
      id: "adv3",
      name: "Dr. Michael Smith",
      department: "Information Systems",
      specialization: "Cybersecurity, Network Analysis",
      available: true
    },
    {
      id: "adv4",
      name: "Dr. Sarah Williams",
      department: "Information Systems",
      specialization: "Database Systems, Big Data",
      available: false
    }
  ];

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles([...uploadedFiles, ...fileNames]);
    }
  };

  // Handle file removal
  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileName));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!title || !area || !background || !objectives || !selectedAdvisor || uploadedFiles.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields and upload your proposal document",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Create new proposal submission
    const newProposal: ProposalSubmission = {
      id: `PROP-2025-${String(proposals.length + 3).padStart(3, "0")}`,
      title: title,
      submissionDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "submitted",
      version: 1,
      advisor: advisors.find(adv => adv.id === selectedAdvisor)?.name || "",
      file: uploadedFiles[0]
    };
    
    setProposals([newProposal, ...proposals]);
    
    toast({
      title: "Proposal Submitted",
      description: "Your thesis proposal has been submitted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    // Reset form
    setTitle("");
    setArea("");
    setBackground("");
    setObjectives("");
    setSelectedAdvisor("");
    setUploadedFiles([]);
    onClose();
    
    // Switch to history tab
    setActiveTab(1);
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge colorScheme="gray">Draft</Badge>;
      case "submitted":
        return <Badge colorScheme="blue">Submitted</Badge>;
      case "reviewed":
        return <Badge colorScheme="yellow">Reviewed</Badge>;
      case "approved":
        return <Badge colorScheme="green">Approved</Badge>;
      case "rejected":
        return <Badge colorScheme="red">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Thesis Proposal Hub
        </Heading>
        <Text color="gray.600">
          Submit and track your thesis proposal
        </Text>
      </Box>

      <Tabs 
        colorScheme="green" 
        variant="enclosed" 
        index={activeTab} 
        onChange={setActiveTab}
        bg="white" 
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="gray.200" 
        mb={6}
      >
        <TabList px={4} pt={4}>
          <Tab _selected={{ color: 'green.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>Submit Proposal</Tab>
          <Tab _selected={{ color: 'green.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>Submission History</Tab>
        </TabList>

        <TabPanels>
          {/* Submit Proposal Tab */}
          <TabPanel p={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              <Box>
                <Card mb={6}>
                  <CardHeader bg="green.50" py={4}>
                    <Heading size="md" color="green.700">
                      Proposal Requirements
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <Text>
                        Your thesis proposal should include the following elements:
                      </Text>
                      <List spacing={3}>
                        <ListItem>
                          <HStack align="start">
                            <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                            <Box>
                              <Text fontWeight="medium">Clear Research Title</Text>
                              <Text fontSize="sm" color="gray.600">
                                Concise title that accurately reflects your research focus
                              </Text>
                            </Box>
                          </HStack>
                        </ListItem>
                        <ListItem>
                          <HStack align="start">
                            <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                            <Box>
                              <Text fontWeight="medium">Background & Context</Text>
                              <Text fontSize="sm" color="gray.600">
                                Brief overview of the research area and existing literature
                              </Text>
                            </Box>
                          </HStack>
                        </ListItem>
                        <ListItem>
                          <HStack align="start">
                            <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                            <Box>
                              <Text fontWeight="medium">Research Questions/Objectives</Text>
                              <Text fontSize="sm" color="gray.600">
                                Specific questions your research aims to answer
                              </Text>
                            </Box>
                          </HStack>
                        </ListItem>
                        <ListItem>
                          <HStack align="start">
                            <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                            <Box>
                              <Text fontWeight="medium">Methodology</Text>
                              <Text fontSize="sm" color="gray.600">
                                Research approach, methods, and data collection techniques
                              </Text>
                            </Box>
                          </HStack>
                        </ListItem>
                        <ListItem>
                          <HStack align="start">
                            <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                            <Box>
                              <Text fontWeight="medium">Timeline</Text>
                              <Text fontSize="sm" color="gray.600">
                                Proposed schedule for thesis completion
                              </Text>
                            </Box>
                          </HStack>
                        </ListItem>
                        <ListItem>
                          <HStack align="start">
                            <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                            <Box>
                              <Text fontWeight="medium">References</Text>
                              <Text fontSize="sm" color="gray.600">
                                Preliminary list of key references
                              </Text>
                            </Box>
                          </HStack>
                        </ListItem>
                      </List>

                      <Divider />

                      <Text>
                        Download the official proposal template and guidelines:
                      </Text>
                      
                      <HStack spacing={4}>
                        <Button
                          leftIcon={<Icon as={FaFileWord} />}
                          colorScheme="blue"
                          variant="outline"
                          size="sm"
                        >
                          Proposal Template
                        </Button>
                        <Button
                          leftIcon={<Icon as={FaFilePdf} />}
                          colorScheme="red"
                          variant="outline"
                          size="sm"
                        >
                          Guidelines
                        </Button>
                      </HStack>

                      <Box bg="orange.50" p={3} borderRadius="md">
                        <Flex>
                          <Icon as={WarningIcon} color="orange.500" mt={1} mr={2} />
                          <Text fontSize="sm" color="orange.700">
                            <strong>Important:</strong> Complete all required sections and submit your proposal before the deadline (April 25, 2025) to ensure timely review.
                          </Text>
                        </Flex>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader bg="blue.50" py={4}>
                    <Heading size="md" color="blue.700">
                      Thesis Advisor Selection
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text mb={4}>
                      Choose an advisor whose expertise aligns with your research area:
                    </Text>
                    <VStack align="stretch" spacing={3}>
                      {advisors.map((advisor) => (
                        <Flex
                          key={advisor.id}
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          borderColor={selectedAdvisor === advisor.id ? "green.300" : "gray.200"}
                          bg={selectedAdvisor === advisor.id ? "green.50" : "white"}
                          _hover={{ borderColor: "green.300", bg: "green.50" }}
                          cursor={advisor.available ? "pointer" : "not-allowed"}
                          opacity={advisor.available ? 1 : 0.6}
                          onClick={() => {
                            if (advisor.available) {
                              setSelectedAdvisor(advisor.id);
                            }
                          }}
                        >
                          <Box mr={3} mt={1}>
                            <Icon as={FaUser} color={selectedAdvisor === advisor.id ? "green.500" : "gray.400"} />
                          </Box>
                          <Box flex={1}>
                            <Flex justifyContent="space-between" mb={1}>
                              <Text fontWeight="medium">{advisor.name}</Text>
                              {!advisor.available && (
                                <Badge colorScheme="red" fontSize="xs">Not Available</Badge>
                              )}
                            </Flex>
                            <Text fontSize="sm" color="gray.700">{advisor.department}</Text>
                            <Text fontSize="xs" color="gray.500">Specialization: {advisor.specialization}</Text>
                          </Box>
                        </Flex>
                      ))}
                    </VStack>

                    <Box bg="blue.50" p={3} borderRadius="md" mt={4}>
                      <Flex>
                        <Icon as={InfoIcon} color="blue.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="blue.700">
                          <strong>Tip:</strong> Choose an advisor whose research expertise closely aligns with your topic for the best guidance.
                        </Text>
                      </Flex>
                    </Box>
                  </CardBody>
                </Card>
              </Box>
              
              <Box>
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="green"
                  size="md"
                  mb={6}
                  onClick={onOpen}
                >
                  Submit New Proposal
                </Button>
                
                <Card>
                  <CardHeader bg="gray.50" py={4}>
                    <Heading size="md">Proposal Status & Timeline</Heading>
                  </CardHeader>
                  <CardBody>
                    <Box mb={6}>
                      <Text mb={2} fontWeight="medium">Overall Progress</Text>
                      <Progress
                        value={proposals.some(p => p.status === "approved") ? 100 : 30}
                        size="md"
                        colorScheme="green"
                        borderRadius="full"
                      />
                    </Box>
                    
                    <VStack align="stretch" spacing={4}>
                      <Flex
                        p={3}
                        borderRadius="md"
                        bg={proposals.length > 0 ? "green.50" : "gray.50"}
                        borderWidth="1px"
                        borderColor={proposals.length > 0 ? "green.200" : "gray.200"}
                        align="center"
                      >
                        <Box
                          w="30px"
                          h="30px"
                          borderRadius="full"
                          bg={proposals.length > 0 ? "green.500" : "gray.300"}
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          1
                        </Box>
                        <Box flex={1}>
                          <Text fontWeight="medium">Proposal Submission</Text>
                          <Text fontSize="sm" color="gray.600">
                            {proposals.length > 0 ? "Completed" : "Not started"}
                          </Text>
                        </Box>
                        {proposals.length > 0 && <CheckCircleIcon color="green.500" />}
                      </Flex>
                      
                      <Flex
                        p={3}
                        borderRadius="md"
                        bg={proposals.some(p => p.status === "reviewed" || p.status === "approved") ? "green.50" : "gray.50"}
                        borderWidth="1px"
                        borderColor={proposals.some(p => p.status === "reviewed" || p.status === "approved") ? "green.200" : "gray.200"}
                        align="center"
                      >
                        <Box
                          w="30px"
                          h="30px"
                          borderRadius="full"
                          bg={proposals.some(p => p.status === "reviewed" || p.status === "approved") ? "green.500" : "gray.300"}
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          2
                        </Box>
                        <Box flex={1}>
                          <Text fontWeight="medium">Faculty Review</Text>
                          <Text fontSize="sm" color="gray.600">
                            {proposals.some(p => p.status === "reviewed" || p.status === "approved") 
                              ? "Completed" 
                              : proposals.some(p => p.status === "submitted") 
                                ? "In progress" 
                                : "Not started"}
                          </Text>
                        </Box>
                        {proposals.some(p => p.status === "reviewed" || p.status === "approved") && <CheckCircleIcon color="green.500" />}
                        {proposals.some(p => p.status === "submitted") && <TimeIcon color="blue.500" />}
                      </Flex>
                      
                      <Flex
                        p={3}
                        borderRadius="md"
                        bg={proposals.some(p => p.status === "approved") ? "green.50" : "gray.50"}
                        borderWidth="1px"
                        borderColor={proposals.some(p => p.status === "approved") ? "green.200" : "gray.200"}
                        align="center"
                      >
                        <Box
                          w="30px"
                          h="30px"
                          borderRadius="full"
                          bg={proposals.some(p => p.status === "approved") ? "green.500" : "gray.300"}
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          3
                        </Box>
                        <Box flex={1}>
                          <Text fontWeight="medium">Proposal Approval</Text>
                          <Text fontSize="sm" color="gray.600">
                            {proposals.some(p => p.status === "approved") 
                              ? "Completed" 
                              : proposals.some(p => p.status === "reviewed") 
                                ? "Waiting for revisions" 
                                : "Not started"}
                          </Text>
                        </Box>
                        {proposals.some(p => p.status === "approved") && <CheckCircleIcon color="green.500" />}
                      </Flex>
                      
                      <Flex
                        p={3}
                        borderRadius="md"
                        bg="gray.50"
                        borderWidth="1px"
                        borderColor="gray.200"
                        align="center"
                      >
                        <Box
                          w="30px"
                          h="30px"
                          borderRadius="full"
                          bg="gray.300"
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mr={3}
                        >
                          4
                        </Box>
                        <Box flex={1}>
                          <Text fontWeight="medium">Defense Scheduling</Text>
                          <Text fontSize="sm" color="gray.600">
                            Not started (requires approved proposal)
                          </Text>
                        </Box>
                      </Flex>
                    </VStack>
                    
                    <Box bg="blue.50" p={3} borderRadius="md" mt={6}>
                      <Flex>
                        <Icon as={InfoIcon} color="blue.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="blue.700">
                          <strong>Next Step:</strong> {proposals.some(p => p.status === "approved") 
                            ? "Schedule your proposal defense" 
                            : proposals.some(p => p.status === "reviewed") 
                              ? "Submit revised proposal" 
                              : proposals.some(p => p.status === "submitted") 
                                ? "Wait for faculty review" 
                                : "Submit your thesis proposal"}
                        </Text>
                      </Flex>
                    </Box>
                  </CardBody>
                </Card>
              </Box>
            </SimpleGrid>
          </TabPanel>

          {/* Submission History Tab */}
          <TabPanel p={5}>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Submission Date</Th>
                    <Th>Advisor</Th>
                    <Th>Version</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {proposals.length > 0 ? (
                    proposals.map((proposal) => (
                      <Tr key={proposal.id}>
                        <Td fontWeight="medium">{proposal.id}</Td>
                        <Td>{proposal.title}</Td>
                        <Td>{proposal.submissionDate}</Td>
                        <Td>{proposal.advisor}</Td>
                        <Td>v{proposal.version}</Td>
                        <Td>{renderStatusBadge(proposal.status)}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="xs"
                              colorScheme="blue"
                              variant="ghost"
                              leftIcon={<DownloadIcon />}
                            >
                              Download
                            </Button>
                            {proposal.status === "reviewed" && (
                              <Button
                                size="xs"
                                colorScheme="green"
                                variant="ghost"
                              >
                                Revise
                              </Button>
                            )}
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={7} textAlign="center" py={6}>
                        <Text color="gray.500">No proposal submissions yet</Text>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>

            {proposals.length > 0 && proposals.some(p => p.status === "reviewed" || p.status === "rejected") && (
              <Card mt={6}>
                <CardHeader bg="yellow.50" py={4}>
                  <Heading size="md" color="yellow.700">
                    Feedback & Revisions
                  </Heading>
                </CardHeader>
                <CardBody>
                  {proposals.filter(p => p.status === "reviewed" || p.status === "rejected").map((proposal, index) => (
                    <Box 
                      key={index} 
                      p={4} 
                      borderWidth="1px" 
                      borderRadius="md" 
                      borderColor={proposal.status === "reviewed" ? "yellow.200" : "red.200"}
                      bg={proposal.status === "reviewed" ? "yellow.50" : "red.50"}
                      mb={index < proposals.filter(p => p.status === "reviewed" || p.status === "rejected").length - 1 ? 4 : 0}
                    >
                      <Flex justifyContent="space-between" mb={2}>
                        <Text fontWeight="medium">Feedback for: {proposal.title}</Text>
                        {renderStatusBadge(proposal.status)}
                      </Flex>
                      <Text fontSize="sm" color={proposal.status === "reviewed" ? "yellow.700" : "red.700"} mb={3}>
                        {proposal.feedback}
                      </Text>
                      <Text fontSize="xs" color="gray.500">Received: {proposal.submissionDate}</Text>
                      
                      {proposal.status === "reviewed" && (
                        <Button
                          mt={3}
                          size="sm"
                          colorScheme="yellow"
                          rightIcon={<ChevronRightIcon />}
                        >
                          Submit Revision
                        </Button>
                      )}
                    </Box>
                  ))}
                </CardBody>
              </Card>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* New Proposal Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit New Thesis Proposal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Thesis Title</FormLabel>
                <Input 
                  placeholder="Enter a descriptive title for your thesis" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormHelperText>
                  Be specific and concise (recommended 10-15 words)
                </FormHelperText>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Research Area</FormLabel>
                <Select 
                  placeholder="Select research area" 
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Mining">Data Mining</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Database Systems">Database Systems</option>
                  <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                  <option value="Computer Networks">Computer Networks</option>
                  <option value="Software Engineering">Software Engineering</option>
                </Select>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Research Background</FormLabel>
                <Textarea 
                  placeholder="Provide a brief background of your research area and the problem you aim to address" 
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  minHeight="120px"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Research Objectives</FormLabel>
                <Textarea 
                  placeholder="List the specific objectives or research questions your thesis aims to address" 
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  minHeight="120px"
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Preferred Advisor</FormLabel>
                <Select 
                  placeholder="Select preferred advisor" 
                  value={selectedAdvisor}
                  onChange={(e) => setSelectedAdvisor(e.target.value)}
                >
                  {advisors
                    .filter(adv => adv.available)
                    .map(advisor => (
                      <option key={advisor.id} value={advisor.id}>
                        {advisor.name} - {advisor.department}
                      </option>
                    ))}
                </Select>
                <FormHelperText>
                  The department will consider your preference but may assign a different advisor based on availability
                </FormHelperText>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Upload Proposal Document</FormLabel>
                <Input 
                  type="file" 
                  p={1} 
                  height="auto" 
                  onChange={handleFileUpload}
                  accept=".doc,.docx,.pdf"
                />
                <FormHelperText>
                  Upload your complete proposal document (DOC, DOCX, or PDF format)
                </FormHelperText>
                
                {uploadedFiles.length > 0 && (
                  <Box mt={3} p={3} borderWidth="1px" borderRadius="md">
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Uploaded Files:</Text>
                    <VStack align="stretch" spacing={2}>
                      {uploadedFiles.map((file, index) => (
                        <Flex key={index} justify="space-between" align="center">
                          <HStack>
                            <AttachmentIcon />
                            <Text fontSize="sm">{file}</Text>
                          </HStack>
                          <IconButton
                            aria-label="Remove file"
                            icon={<CloseIcon />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleRemoveFile(file)}
                          />
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                )}
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              Submit Proposal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ThesisProposal;