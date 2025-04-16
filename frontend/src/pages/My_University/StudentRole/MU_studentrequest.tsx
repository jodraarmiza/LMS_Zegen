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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Grid,
  GridItem,
  FormHelperText,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { 
  AddIcon, 
  DownloadIcon, 
  SearchIcon, 
  ViewIcon, 
  CheckIcon, 
  CloseIcon, 
  InfoIcon, 
  TimeIcon,
  AttachmentIcon 
} from "@chakra-ui/icons";

interface RequestData {
  id: string;
  type: string;
  purpose: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected" | "completed";
  additionalNotes?: string;
  documents?: string[];
  startDate?: string;
  endDate?: string;
  details?: any;
}

interface RequestType {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiresDates: boolean;
  requiresDocuments: boolean;
  popular?: boolean;
}

const MU_studentrequest: React.FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isDetailOpen, 
    onOpen: onDetailOpen, 
    onClose: onDetailClose 
  } = useDisclosure();
  
  const [activeTab, setActiveTab] = useState(0);
  const [letterType, setLetterType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const [bioChangeDetails, setBioChangeDetails] = useState({
    field: "",
    currentValue: "",
    newValue: "",
    reason: ""
  });

  // Available request types
  const requestTypes: RequestType[] = [
    {
      id: "academic-transcript",
      name: "Academic Transcript",
      description: "Official record of your grades and courses",
      icon: "📄",
      requiresDates: false,
      requiresDocuments: false,
      popular: true
    },
    {
      id: "active-student",
      name: "Active Student Statement",
      description: "Confirms your enrollment status",
      icon: "📝",
      requiresDates: false,
      requiresDocuments: false
    },
    {
      id: "recommendation-letter",
      name: "Recommendation Letter",
      description: "Academic recommendation from faculty",
      icon: "👨‍🏫",
      requiresDates: false,
      requiresDocuments: false
    },
    {
      id: "academic-leave",
      name: "Surat Cuti Akademik",
      description: "Request for academic leave/break",
      icon: "🗓️",
      requiresDates: true,
      requiresDocuments: true
    },
    {
      id: "biodata-change",
      name: "Surat Pengajuan Ubah Biodata",
      description: "Request to update your personal information",
      icon: "📋",
      requiresDates: false,
      requiresDocuments: true
    },
    {
      id: "leave-request",
      name: "Leave Request",
      description: "Request for leave of absence",
      icon: "⏱️",
      requiresDates: true,
      requiresDocuments: true
    },
    {
      id: "graduation-cert",
      name: "Graduation Certificate",
      description: "Copy of your graduation certificate",
      icon: "🎓",
      requiresDates: false,
      requiresDocuments: false
    },
    {
      id: "english-translation",
      name: "English Translation",
      description: "English translation of official documents",
      icon: "🔤",
      requiresDates: false,
      requiresDocuments: true
    }
  ];

  // Sample request history
  const [requestHistory, setRequestHistory] = useState<RequestData[]>([
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
    {
      id: "REQ-2025-004",
      type: "Surat Cuti Akademik",
      purpose: "Medical Reasons",
      requestDate: "Feb 15, 2025",
      status: "approved",
      startDate: "Mar 1, 2025",
      endDate: "Aug 31, 2025",
      documents: ["medical_certificate.pdf"]
    },
    {
      id: "REQ-2025-005",
      type: "Surat Pengajuan Ubah Biodata",
      purpose: "Correction",
      requestDate: "Feb 10, 2025",
      status: "completed",
      details: {
        field: "Name",
        currentValue: "John Doe",
        newValue: "John Michael Doe",
        reason: "Adding middle name to match official documents"
      },
      documents: ["birth_certificate.pdf", "national_id.pdf"]
    },
    {
      id: "REQ-2025-006",
      type: "Leave Request",
      purpose: "Family Event",
      requestDate: "Jan 25, 2025",
      status: "rejected",
      startDate: "Feb 10, 2025",
      endDate: "Feb 15, 2025",
      documents: ["family_invitation.pdf"]
    },
  ]);

  // Filter request history based on search query
  const filteredHistory = searchQuery 
    ? requestHistory.filter(req => 
        req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : requestHistory;

  // Get the selected request type details
  const getSelectedRequestType = () => {
    return requestTypes.find(type => type.name === letterType);
  };

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

  // Handle view request details
  const handleViewDetails = (request: RequestData) => {
    setSelectedRequest(request);
    onDetailOpen();
  };

  // Handle submit new request
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

    const selectedType = getSelectedRequestType();
    
    // Validate dates if required
    if (selectedType?.requiresDates && (!startDate || !endDate)) {
      toast({
        title: "Date fields required",
        description: "Please select both start and end dates",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate files if required
    if (selectedType?.requiresDocuments && uploadedFiles.length === 0) {
      toast({
        title: "Supporting documents required",
        description: "Please upload at least one supporting document",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Create a new request
    const newRequest: RequestData = {
      id: `REQ-2025-${String(requestHistory.length + 1).padStart(3, "0")}`,
      type: letterType,
      purpose: purpose,
      requestDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "pending",
      additionalNotes: additionalNotes,
      documents: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
    };

    // Add dates if applicable
    if (selectedType?.requiresDates) {
      newRequest.startDate = startDate;
      newRequest.endDate = endDate;
    }

    // Add biodata change details if applicable
    if (letterType === "Surat Pengajuan Ubah Biodata") {
      newRequest.details = { ...bioChangeDetails };
    }

    setRequestHistory([newRequest, ...requestHistory]);
    
    toast({
      title: "Request Submitted",
      description: `Your ${letterType} request has been submitted successfully.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    resetForm();
    onClose();
  };

  // Reset form fields
  const resetForm = () => {
    setLetterType("");
    setPurpose("");
    setAdditionalNotes("");
    setUploadedFiles([]);
    setStartDate("");
    setEndDate("");
    setBioChangeDetails({
      field: "",
      currentValue: "",
      newValue: "",
      reason: ""
    });
  };

  // Get status badge color
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

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <TimeIcon />;
      case "approved":
        return <CheckIcon />;
      case "completed":
        return <CheckIcon />;
      case "rejected":
        return <CloseIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Student Request Center
        </Heading>
        <Text color="gray.600">
          Submit and track official requests to the university administration
        </Text>
      </Box>

      <Tabs 
        colorScheme="blue" 
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
          <Tab _selected={{ color: 'blue.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>Available Requests</Tab>
          <Tab _selected={{ color: 'blue.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>Request History</Tab>
        </TabList>

        <TabPanels>
          {/* Available Requests Tab */}
          <TabPanel p={5}>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={5}>
              {requestTypes.map((type) => (
                <GridItem key={type.id}>
                  <Flex 
                    p={4} 
                    borderRadius="md" 
                    borderWidth="1px" 
                    borderColor="gray.200" 
                    bg={type.popular ? "blue.50" : "white"}
                    _hover={{ borderColor: "blue.400", bg: type.popular ? "blue.50" : "gray.50" }}
                    direction="column"
                    h="full"
                  >
                    <Flex align="center" mb={3}>
                      <Box as="span" fontSize="xl" mr={3}>{type.icon}</Box>
                      <Box flex={1}>
                        <Text fontWeight="medium">{type.name}</Text>
                      </Box>
                      {type.popular && <Badge colorScheme="blue">Popular</Badge>}
                    </Flex>
                    <Text fontSize="sm" color="gray.600" mb={4}>
                      {type.description}
                    </Text>
                    <Button 
                      colorScheme="blue" 
                      variant="outline" 
                      size="sm" 
                      mt="auto"
                      onClick={() => {
                        setLetterType(type.name);
                        onOpen();
                      }}
                      leftIcon={<AddIcon />}
                    >
                      Create Request
                    </Button>
                  </Flex>
                </GridItem>
              ))}
            </Grid>
          </TabPanel>

          {/* Request History Tab */}
          <TabPanel p={5}>
            <Flex mb={5} justifyContent="space-between" wrap="wrap">
              <Heading size="md" mb={{ base: 3, md: 0 }}>
                Request History
              </Heading>
              <HStack spacing={2}>
                <Box width={{ base: "full", md: "250px" }} position="relative">
                  <Input 
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg="white"
                    paddingLeft="36px"
                  />
                  <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)">
                    <SearchIcon color="gray.400" />
                  </Box>
                </Box>
                <Button 
                  colorScheme="blue" 
                  leftIcon={<AddIcon />}
                  onClick={onOpen}
                >
                  New Request
                </Button>
              </HStack>
            </Flex>
            
            <Box overflowX="auto">
              <Table variant="simple">
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
                  {filteredHistory.map((request) => (
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
                          <IconButton
                            aria-label="View details"
                            icon={<ViewIcon />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => handleViewDetails(request)}
                          />
                          {request.status === "completed" && (
                            <IconButton
                              aria-label="Download"
                              icon={<DownloadIcon />}
                              size="sm"
                              colorScheme="green"
                              variant="ghost"
                              onClick={() => {
                                toast({
                                  title: "Document Downloaded",
                                  description: `${request.type} has been downloaded successfully.`,
                                  status: "success",
                                  duration: 3000,
                                  isClosable: true,
                                });
                              }}
                            />
                          )}
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            
            {filteredHistory.length === 0 && (
              <Box textAlign="center" py={8} color="gray.500">
                {searchQuery ? "No matching requests found" : "No request history available"}
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* New Request Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit New Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Document Type</FormLabel>
                <Select 
                  placeholder="Select document type" 
                  value={letterType}
                  onChange={(e) => setLetterType(e.target.value)}
                >
                  {requestTypes.map(type => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                  ))}
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
                  <option value="Medical Reasons">Medical Reasons</option>
                  <option value="Family Event">Family Event</option>
                  <option value="Correction">Correction</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              
              {/* Date fields for leave requests */}
              {getSelectedRequestType()?.requiresDates && (
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>Start Date</FormLabel>
                      <Input 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired>
                      <FormLabel>End Date</FormLabel>
                      <Input 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              )}
              
              {/* Biodata change fields */}
              {letterType === "Surat Pengajuan Ubah Biodata" && (
                <Box>
                  <FormControl isRequired mb={3}>
                    <FormLabel>Field to Change</FormLabel>
                    <Select 
                      placeholder="Select field" 
                      value={bioChangeDetails.field}
                      onChange={(e) => setBioChangeDetails({...bioChangeDetails, field: e.target.value})}
                    >
                      <option value="Name">Name</option>
                      <option value="Birth Date">Birth Date</option>
                      <option value="Birth Place">Birth Place</option>
                      <option value="Address">Address</option>
                      <option value="Contact Information">Contact Information</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>
                  
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={3}>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>Current Value</FormLabel>
                        <Input 
                          placeholder="Current value" 
                          value={bioChangeDetails.currentValue}
                          onChange={(e) => setBioChangeDetails({...bioChangeDetails, currentValue: e.target.value})}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl isRequired>
                        <FormLabel>New Value</FormLabel>
                        <Input 
                          placeholder="New value" 
                          value={bioChangeDetails.newValue}
                          onChange={(e) => setBioChangeDetails({...bioChangeDetails, newValue: e.target.value})}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  
                  <FormControl isRequired>
                    <FormLabel>Reason for Change</FormLabel>
                    <Textarea 
                      placeholder="Explain why this change is needed..." 
                      value={bioChangeDetails.reason}
                      onChange={(e) => setBioChangeDetails({...bioChangeDetails, reason: e.target.value})}
                    />
                  </FormControl>
                </Box>
              )}
              
              {/* Document upload */}
              {getSelectedRequestType()?.requiresDocuments && (
                <FormControl isRequired>
                  <FormLabel>Supporting Documents</FormLabel>
                  <Input 
                    type="file" 
                    p={1} 
                    height="auto" 
                    multiple
                    onChange={handleFileUpload}
                  />
                  <FormHelperText>
                    Please upload all relevant supporting documents (PDF, JPG, PNG)
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
              )}
              
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

      {/* Request Details Drawer */}
      <Drawer
        isOpen={isDetailOpen}
        placement="right"
        onClose={onDetailClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Request Details
          </DrawerHeader>

          <DrawerBody>
            {selectedRequest && (
              <VStack spacing={5} align="stretch" pt={3}>
                <Box>
                  <Text fontSize="sm" color="gray.500">Request ID</Text>
                  <Text fontWeight="bold">{selectedRequest.id}</Text>
                </Box>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                  <GridItem>
                    <Text fontSize="sm" color="gray.500">Document Type</Text>
                    <Text fontWeight="medium">{selectedRequest.type}</Text>
                  </GridItem>
                  <GridItem>
                    <Text fontSize="sm" color="gray.500">Status</Text>
                    <Badge colorScheme={getStatusColor(selectedRequest.status)}>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </Badge>
                  </GridItem>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                  <GridItem>
                    <Text fontSize="sm" color="gray.500">Purpose</Text>
                    <Text>{selectedRequest.purpose}</Text>
                  </GridItem>
                  <GridItem>
                    <Text fontSize="sm" color="gray.500">Requested On</Text>
                    <Text>{selectedRequest.requestDate}</Text>
                  </GridItem>
                </Grid>

                {/* Date fields for leave requests */}
                {(selectedRequest.startDate && selectedRequest.endDate) && (
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    <GridItem>
                      <Text fontSize="sm" color="gray.500">Start Date</Text>
                      <Text>{selectedRequest.startDate}</Text>
                    </GridItem>
                    <GridItem>
                      <Text fontSize="sm" color="gray.500">End Date</Text>
                      <Text>{selectedRequest.endDate}</Text>
                    </GridItem>
                  </Grid>
                )}

                {/* Biodata change details */}
                {selectedRequest.type === "Surat Pengajuan Ubah Biodata" && selectedRequest.details && (
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={2}>Biodata Change Details</Text>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} pl={3} borderLeftWidth="2px" borderLeftColor="blue.200">
                      <GridItem>
                        <Text fontSize="sm" color="gray.500">Field</Text>
                        <Text>{selectedRequest.details.field}</Text>
                      </GridItem>
                      <GridItem>
                        <Text fontSize="sm" color="gray.500">Current Value</Text>
                        <Text>{selectedRequest.details.currentValue}</Text>
                      </GridItem>
                      <GridItem>
                        <Text fontSize="sm" color="gray.500">New Value</Text>
                        <Text>{selectedRequest.details.newValue}</Text>
                      </GridItem>
                      <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Text fontSize="sm" color="gray.500">Reason</Text>
                        <Text>{selectedRequest.details.reason}</Text>
                      </GridItem>
                    </Grid>
                  </Box>
                )}

                {/* Additional Notes */}
                {selectedRequest.additionalNotes && (
                  <Box>
                    <Text fontSize="sm" color="gray.500">Additional Notes</Text>
                    <Text>{selectedRequest.additionalNotes}</Text>
                  </Box>
                )}

                {/* Supporting Documents */}
                {selectedRequest.documents && selectedRequest.documents.length > 0 && (
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={2}>Supporting Documents</Text>
                    <VStack align="stretch" spacing={2} pl={3} borderLeftWidth="2px" borderLeftColor="blue.200">
                      {selectedRequest.documents.map((doc, index) => (
                        <Flex key={index} justify="space-between" align="center">
                          <HStack>
                            <AttachmentIcon />
                            <Text fontSize="sm">{doc}</Text>
                          </HStack>
                          <Button
                            size="xs"
                            colorScheme="blue"
                            variant="ghost"
                            leftIcon={<DownloadIcon />}
                          >
                            Download
                          </Button>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                )}

                {/* Request Timeline */}
                <Box mt={4}>
                  <Text fontSize="sm" color="gray.500" mb={3}>Request Timeline</Text>
                  <VStack align="stretch" spacing={0}>
                    <HStack spacing={4}>
                      <Flex 
                        direction="column" 
                        align="center" 
                        minW="40px"
                      >
                        <Box 
                          w="10px" 
                          h="10px" 
                          borderRadius="full" 
                          bg="green.500"
                        />
                        <Box 
                          w="1px" 
                          h="45px" 
                          bg="gray.200" 
                        />
                      </Flex>
                      <Box flex="1" pb={3}>
                        <Text fontWeight="medium">Request Submitted</Text>
                        <Text fontSize="sm" color="gray.500">{selectedRequest.requestDate}</Text>
                      </Box>
                    </HStack>

                    <HStack spacing={4}>
                      <Flex 
                        direction="column" 
                        align="center" 
                        minW="40px"
                      >
                        <Box 
                          w="10px" 
                          h="10px" 
                          borderRadius="full" 
                          bg={selectedRequest.status !== "pending" ? "blue.500" : "gray.300"}
                        />
                        <Box 
                          w="1px" 
                          h="45px" 
                          bg="gray.200" 
                        />
                      </Flex>
                      <Box flex="1" pb={3}>
                        <Text fontWeight="medium">Under Review</Text>
                        <Text fontSize="sm" color="gray.500">
                          {selectedRequest.status !== "pending" 
                            ? new Date(new Date(selectedRequest.requestDate).getTime() + 86400000).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Pending"}
                        </Text>
                      </Box>
                    </HStack>

                    <HStack spacing={4}>
                      <Flex 
                        direction="column" 
                        align="center" 
                        minW="40px"
                      >
                        <Box 
                          w="10px" 
                          h="10px" 
                          borderRadius="full" 
                          bg={selectedRequest.status === "approved" || selectedRequest.status === "completed" || selectedRequest.status === "rejected" ? 
                            (selectedRequest.status === "rejected" ? "red.500" : "blue.500") : "gray.300"}
                        />
                        <Box 
                          w="1px" 
                          h="45px" 
                          bg="gray.200" 
                          display={selectedRequest.status === "completed" ? "block" : "none"}
                        />
                      </Flex>
                      <Box flex="1" pb={3}>
                        <Text fontWeight="medium">
                          {selectedRequest.status === "rejected" ? "Request Rejected" : "Request Approved"}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {selectedRequest.status === "approved" || selectedRequest.status === "completed" || selectedRequest.status === "rejected" ? 
                            new Date(new Date(selectedRequest.requestDate).getTime() + 172800000).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }) 
                            : "Pending"}
                        </Text>
                      </Box>
                    </HStack>

                    {selectedRequest.status === "completed" && (
                      <HStack spacing={4}>
                        <Flex 
                          direction="column" 
                          align="center" 
                          minW="40px"
                        >
                          <Box 
                            w="10px" 
                            h="10px" 
                            borderRadius="full" 
                            bg="green.500"
                          />
                        </Flex>
                        <Box flex="1">
                          <Text fontWeight="medium">Document Ready</Text>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(new Date(selectedRequest.requestDate).getTime() + 259200000).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </Text>
                        </Box>
                      </HStack>
                    )}
                  </VStack>
                </Box>

                {/* Processing Notes for admin/staff */}
                {(selectedRequest.status === "approved" || selectedRequest.status === "completed") && (
                  <Box mt={4} p={4} bg="green.50" borderRadius="md">
                    <Text fontSize="sm" fontWeight="medium" color="green.700">Processing Notes</Text>
                    <Text fontSize="sm" color="green.700">
                      Your request has been processed successfully. 
                      {selectedRequest.status === "completed" 
                        ? " The requested document is ready for download or collection." 
                        : " You will be notified when the document is ready."}
                    </Text>
                  </Box>
                )}

                {selectedRequest.status === "rejected" && (
                  <Box mt={4} p={4} bg="red.50" borderRadius="md">
                    <Text fontSize="sm" fontWeight="medium" color="red.700">Rejection Reason</Text>
                    <Text fontSize="sm" color="red.700">
                      Your request could not be approved due to insufficient supporting documentation. Please resubmit with complete documentation.
                    </Text>
                  </Box>
                )}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onDetailClose}>
              Close
            </Button>
            {selectedRequest && selectedRequest.status === "completed" && (
              <Button colorScheme="green" leftIcon={<DownloadIcon />}>
                Download Document
              </Button>
            )}
            {selectedRequest && selectedRequest.status === "rejected" && (
              <Button 
                colorScheme="blue" 
                onClick={() => {
                  onDetailClose();
                  setLetterType(selectedRequest.type);
                  setPurpose(selectedRequest.purpose);
                  if (selectedRequest.additionalNotes) {
                    setAdditionalNotes(selectedRequest.additionalNotes);
                  }
                  if (selectedRequest.startDate && selectedRequest.endDate) {
                    setStartDate(selectedRequest.startDate);
                    setEndDate(selectedRequest.endDate);
                  }
                  if (selectedRequest.documents) {
                    setUploadedFiles([...selectedRequest.documents]);
                  }
                  onOpen();
                }}
              >
                Resubmit Request
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Help & Guidelines Accordion */}
      <Accordion allowToggle mt={6}>
        <AccordionItem border="1px" borderColor="gray.200" borderRadius="md">
          <h2>
            <AccordionButton _expanded={{ bg: "blue.50", color: "blue.700" }}>
              <Box as="span" flex='1' textAlign='left' fontWeight="medium">
                Request Guidelines & Information
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <Box>
                <Text fontWeight="medium" mb={2}>Document Processing Times</Text>
                <VStack align="start" spacing={1}>
                  <HStack>
                    <Text fontSize="sm" color="gray.600" width="200px">Academic Transcript:</Text>
                    <Text fontSize="sm">3-5 working days</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" color="gray.600" width="200px">Active Student Statement:</Text>
                    <Text fontSize="sm">1-2 working days</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" color="gray.600" width="200px">Recommendation Letter:</Text>
                    <Text fontSize="sm">5-7 working days</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" color="gray.600" width="200px">Leave Requests:</Text>
                    <Text fontSize="sm">3-5 working days</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="sm" color="gray.600" width="200px">Biodata Change:</Text>
                    <Text fontSize="sm">3-5 working days</Text>
                  </HStack>
                </VStack>
              </Box>
              
              <Box>
                <Text fontWeight="medium" mb={2}>Important Notes</Text>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm">
                    • All supporting documents must be uploaded in PDF, JPG, or PNG format.
                  </Text>
                  <Text fontSize="sm">
                    • Academic leave requests require approval from your academic advisor.
                  </Text>
                  <Text fontSize="sm">
                    • For recommendation letters, please contact the professor before submitting your request.
                  </Text>
                  <Text fontSize="sm">
                    • Processed documents can be downloaded or collected from the administration office.
                  </Text>
                </VStack>
              </Box>
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default MU_studentrequest;