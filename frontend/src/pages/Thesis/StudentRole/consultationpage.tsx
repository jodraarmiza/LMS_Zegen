import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  FormHelperText,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  TimeIcon,
  WarningIcon,
  InfoIcon,
  CalendarIcon,
  ChevronRightIcon,
  AddIcon,
  AttachmentIcon,
  DownloadIcon,
  ChatIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage } from "react-icons/fa";

// Interface for consultation history
interface ConsultationSession {
  id: string;
  date: string;
  time: string;
  type: "in-person" | "online" | "email";
  topic: string;
  advisor: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  feedback?: string;
  attachments?: string[];
}

// Interface for consultation request
interface ConsultationRequest {
  id: string;
  requestDate: string;
  preferredDate: string;
  preferredTime: string;
  type: "in-person" | "online" | "email";
  topic: string;
  description: string;
  advisor: string;
  status: "pending" | "approved" | "rejected" | "completed";
  attachments?: string[];
}

// Sample advisor availability data
interface AdvisorAvailability {
  day: string;
  times: string[];
}

const ThesisConsultation: React.FC = () => {
  const toast = useToast();
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationSession | null>(null);
  
  // Form states
  const [consultationType, setConsultationType] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [consultationTopic, setConsultationTopic] = useState<string>("");
  const [consultationDescription, setConsultationDescription] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  
  // Sample data
  const [consultationHistory, setConsultationHistory] = useState<ConsultationSession[]>([
    {
      id: "CONS-2025-001",
      date: "April 10, 2025",
      time: "14:00 - 15:00",
      type: "in-person",
      topic: "Research Methodology Discussion",
      advisor: "Dr. Robert Johnson",
      status: "completed",
      notes: "Discussed appropriate research methods for healthcare data analysis.",
      feedback: "Good progress on methodology selection. Focus more on data preprocessing techniques.",
      attachments: ["methodology_notes.pdf", "sample_analysis.xlsx"]
    },
    {
      id: "CONS-2025-002",
      date: "March 25, 2025",
      time: "10:30 - 11:30",
      type: "online",
      topic: "Literature Review Feedback",
      advisor: "Dr. Robert Johnson",
      status: "completed",
      notes: "Reviewed current literature sources and identified gaps.",
      feedback: "Need more recent papers (2022-2025). Good analysis of current limitations.",
      attachments: ["literature_review_draft.docx"]
    },
    {
      id: "CONS-2025-003",
      date: "April 22, 2025",
      time: "13:00 - 14:00",
      type: "in-person",
      topic: "Data Collection Strategy",
      advisor: "Dr. Robert Johnson",
      status: "scheduled",
      notes: "Planning to discuss data sources and collection methods."
    }
  ]);
  
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([
    {
      id: "REQ-2025-001",
      requestDate: "April 14, 2025",
      preferredDate: "April 22, 2025",
      preferredTime: "13:00 - 14:00",
      type: "in-person",
      topic: "Data Collection Strategy",
      description: "Need to discuss potential data sources for healthcare analytics and appropriate collection methods.",
      advisor: "Dr. Robert Johnson",
      status: "approved",
      attachments: ["data_sources_draft.docx"]
    },
    {
      id: "REQ-2025-002",
      requestDate: "April 15, 2025",
      preferredDate: "April 28, 2025",
      preferredTime: "10:00 - 11:00",
      type: "online",
      topic: "Algorithm Selection for Data Analysis",
      description: "Need guidance on selecting appropriate ML algorithms for healthcare prediction tasks.",
      advisor: "Dr. Robert Johnson",
      status: "pending"
    }
  ]);
  
  // Sample advisor availability
  const advisorAvailability: AdvisorAvailability[] = [
    { day: "Monday", times: ["10:00 - 12:00", "14:00 - 16:00"] },
    { day: "Tuesday", times: ["11:00 - 13:00"] },
    { day: "Wednesday", times: ["09:00 - 11:00", "15:00 - 17:00"] },
    { day: "Thursday", times: ["13:00 - 15:00"] },
    { day: "Friday", times: ["10:00 - 12:00"] }
  ];
  
  // Consultation tips
  const consultationTips = [
    "Prepare a clear agenda for each consultation session",
    "Send materials to your advisor at least 48 hours before the meeting",
    "Take notes during your consultation sessions",
    "Follow up with a summary email after each meeting",
    "Come prepared with specific questions or challenges",
    "Be receptive to feedback and suggestions",
    "Keep track of action items after each consultation"
  ];

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles([...uploadedFiles, ...fileNames]);
    }
  };

  // Open consultation detail modal
  const handleViewDetail = (consultation: ConsultationSession) => {
    setSelectedConsultation(consultation);
    onDetailOpen();
  };

  // Submit consultation request
  const handleSubmitRequest = () => {
    if (!consultationType || !preferredDate || !preferredTime || !consultationTopic || !consultationDescription) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Create new consultation request
    const newRequest: ConsultationRequest = {
      id: `REQ-2025-${String(consultationRequests.length + 3).padStart(3, "0")}`,
      requestDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      type: consultationType as "in-person" | "online" | "email",
      topic: consultationTopic,
      description: consultationDescription,
      advisor: "Dr. Robert Johnson",
      status: "pending",
      attachments: uploadedFiles.length > 0 ? uploadedFiles : undefined
    };
    
    setConsultationRequests([newRequest, ...consultationRequests]);
    
    toast({
      title: "Request Submitted",
      description: "Your consultation request has been submitted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    // Reset form
    setConsultationType("");
    setPreferredDate("");
    setPreferredTime("");
    setConsultationTopic("");
    setConsultationDescription("");
    setUploadedFiles([]);
    onFormClose();
    
    // Switch to requests tab
    setActiveTab(1);
  };

  // Render status badge for history
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge colorScheme="blue">Scheduled</Badge>;
      case "completed":
        return <Badge colorScheme="green">Completed</Badge>;
      case "cancelled":
        return <Badge colorScheme="red">Cancelled</Badge>;
      default:
        return null;
    }
  };

  // Render status badge for requests
  const renderRequestStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge colorScheme="yellow">Pending</Badge>;
      case "approved":
        return <Badge colorScheme="green">Approved</Badge>;
      case "rejected":
        return <Badge colorScheme="red">Rejected</Badge>;
      case "completed":
        return <Badge colorScheme="blue">Completed</Badge>;
      default:
        return null;
    }
  };

  // Render consultation type badge
  const renderTypeBadge = (type: string) => {
    switch (type) {
      case "in-person":
        return <Badge colorScheme="purple">In-Person</Badge>;
      case "online":
        return <Badge colorScheme="teal">Online</Badge>;
      case "email":
        return <Badge colorScheme="orange">Email</Badge>;
      default:
        return null;
    }
  };

  // Get file icon based on file extension
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <Icon as={FaFilePdf} color="red.500" />;
      case 'doc':
      case 'docx':
        return <Icon as={FaFileWord} color="blue.500" />;
      case 'xls':
      case 'xlsx':
        return <Icon as={FaFileExcel} color="green.500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Icon as={FaFileImage} color="purple.500" />;
      default:
        return <AttachmentIcon color="gray.500" />;
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Thesis Consultation
        </Heading>
        <Text color="gray.600">
          Schedule and manage consultations with your thesis advisor
        </Text>
      </Box>

      <Tabs 
        colorScheme="purple" 
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
          <Tab _selected={{ color: 'purple.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>Consultation History</Tab>
          <Tab _selected={{ color: 'purple.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>Consultation Requests</Tab>
          <Tab _selected={{ color: 'purple.600', borderColor: 'currentColor', borderBottomColor: 'white' }}>Advisor Schedule</Tab>
        </TabList>

        <TabPanels>
          {/* Consultation History Tab */}
          <TabPanel p={5}>
            <Flex justifyContent="space-between" mb={6}>
              <Heading size="md">Past & Upcoming Consultations</Heading>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="purple"
                onClick={onFormOpen}
              >
                Request Consultation
              </Button>
            </Flex>
            
            {consultationHistory.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {consultationHistory.map((session) => (
                  <Card key={session.id} variant="outline" borderColor="purple.100">
                    <CardBody>
                      <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between">
                        <Box mb={{ base: 4, md: 0 }}>
                          <Flex align="center" mb={2}>
                            <Heading size="sm" mr={2}>{session.topic}</Heading>
                            {renderStatusBadge(session.status)}
                            {renderTypeBadge(session.type)}
                          </Flex>
                          
                          <HStack mb={2} color="gray.500" fontSize="sm">
                            <CalendarIcon />
                            <Text>{session.date}</Text>
                            <TimeIcon />
                            <Text>{session.time}</Text>
                          </HStack>
                          
                          <Text fontSize="sm" color="gray.600">
                            Advisor: {session.advisor}
                          </Text>
                          
                          {session.notes && (
                            <Text fontSize="sm" mt={2} noOfLines={2}>
                              {session.notes}
                            </Text>
                          )}
                          
                          {session.attachments && session.attachments.length > 0 && (
                            <HStack mt={2} spacing={2} wrap="wrap">
                              {session.attachments.map((file, index) => (
                                <Button 
                                  key={index} 
                                  size="xs" 
                                  leftIcon={getFileIcon(file)}
                                  variant="outline"
                                  colorScheme="gray"
                                >
                                  {file}
                                </Button>
                              ))}
                            </HStack>
                          )}
                        </Box>
                        
                        <VStack align="flex-end" spacing={2}>
                          {session.status === "completed" ? (
                            <Button
                              size="sm"
                              colorScheme="purple"
                              variant="outline"
                              rightIcon={<ChevronRightIcon />}
                              onClick={() => handleViewDetail(session)}
                            >
                              View Details
                            </Button>
                          ) : session.status === "scheduled" ? (
                            <>
                              <Button
                                size="sm"
                                colorScheme="blue"
                                variant="outline"
                                leftIcon={<ChatIcon />}
                              >
                                Join Meeting
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="red"
                                variant="ghost"
                              >
                                Reschedule
                              </Button>
                            </>
                          ) : null}
                        </VStack>
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            ) : (
              <Box textAlign="center" py={8}>
                <Text color="gray.500" mb={4}>No consultation sessions yet</Text>
                <Button colorScheme="purple" onClick={onFormOpen}>
                  Schedule Your First Consultation
                </Button>
              </Box>
            )}
          </TabPanel>

          {/* Consultation Requests Tab */}
          <TabPanel p={5}>
            <Flex justifyContent="space-between" mb={6}>
              <Heading size="md">Your Consultation Requests</Heading>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="purple"
                onClick={onFormOpen}
              >
                New Request
              </Button>
            </Flex>

            {consultationRequests.length > 0 ? (
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead bg="gray.50">
                    <Tr>
                      <Th>Request ID</Th>
                      <Th>Topic</Th>
                      <Th>Preferred Date</Th>
                      <Th>Type</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {consultationRequests.map((request) => (
                      <Tr key={request.id}>
                        <Td fontWeight="medium">{request.id}</Td>
                        <Td>{request.topic}</Td>
                        <Td>{`${request.preferredDate} (${request.preferredTime})`}</Td>
                        <Td>{renderTypeBadge(request.type)}</Td>
                        <Td>{renderRequestStatusBadge(request.status)}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="xs"
                              colorScheme="purple"
                              variant="outline"
                            >
                              View
                            </Button>
                            {request.status === "pending" && (
                              <Button
                                size="xs"
                                colorScheme="red"
                                variant="ghost"
                              >
                                Cancel
                              </Button>
                            )}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            ) : (
              <Box textAlign="center" py={8}>
                <Text color="gray.500" mb={4}>No consultation requests yet</Text>
                <Button colorScheme="purple" onClick={onFormOpen}>
                  Create Your First Request
                </Button>
              </Box>
            )}
            
            <Card mt={6} bg="purple.50">
              <CardHeader py={3}>
                <Heading size="sm" color="purple.700">Request Status Information</Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <HStack mb={2}>
                      <Badge colorScheme="yellow">Pending</Badge>
                      <Text fontSize="sm">Your request is waiting for advisor review</Text>
                    </HStack>
                    <HStack mb={2}>
                      <Badge colorScheme="green">Approved</Badge>
                      <Text fontSize="sm">Your request has been approved</Text>
                    </HStack>
                  </Box>
                  <Box>
                    <HStack mb={2}>
                      <Badge colorScheme="red">Rejected</Badge>
                      <Text fontSize="sm">Your request has been declined</Text>
                    </HStack>
                    <HStack>
                      <Badge colorScheme="blue">Completed</Badge>
                      <Text fontSize="sm">Consultation session has occurred</Text>
                    </HStack>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Advisor Schedule Tab */}
          <TabPanel p={5}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              <Box>
                <Card mb={6}>
                  <CardHeader bg="purple.50" py={4}>
                    <Heading size="md" color="purple.700">
                      Advisor Availability
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Flex mb={4} align="center">
                      <Avatar size="md" name="Dr. Robert Johnson" mr={4} />
                      <Box>
                        <Heading size="sm">Dr. Robert Johnson</Heading>
                        <Text fontSize="sm" color="gray.600">Computer Science Department</Text>
                        <Text fontSize="xs" color="gray.500">Specialization: Machine Learning, Data Mining</Text>
                      </Box>
                    </Flex>
                    
                    <Divider my={4} />
                    
                    <Text fontWeight="medium" mb={3}>Regular Office Hours</Text>
                    <SimpleGrid columns={2} spacing={4}>
                      {advisorAvailability.map((slot, index) => (
                        <Box 
                          key={index} 
                          p={3} 
                          borderWidth="1px" 
                          borderRadius="md"
                          borderColor="purple.200"
                          bg="purple.50"
                        >
                          <Text fontWeight="medium" color="purple.700">
                            {slot.day}
                          </Text>
                          {slot.times.map((time, idx) => (
                            <Text key={idx} fontSize="sm" ml={3}>
                              {time}
                            </Text>
                          ))}
                        </Box>
                      ))}
                    </SimpleGrid>
                    
                    <Box bg="orange.50" p={3} borderRadius="md" mt={6}>
                      <Flex>
                        <Icon as={WarningIcon} color="orange.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="orange.700">
                          <strong>Note:</strong> Advisor availability may change during exam periods and university holidays.
                        </Text>
                      </Flex>
                    </Box>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="blue.50" py={4}>
                    <Heading size="md" color="blue.700">
                      Contact Information
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Email Address
                        </Text>
                        <Text fontWeight="medium">r.johnson@university.edu</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Office Location
                        </Text>
                        <Text fontWeight="medium">Computer Science Building, Room 405</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Department Phone
                        </Text>
                        <Text fontWeight="medium">+1 (555) 123-4567</Text>
                      </Box>
                      <Box>
                        <Text fontSize="sm" color="gray.500">
                          Administrative Assistant
                        </Text>
                        <Text fontWeight="medium">Ms. Jennifer Davis (j.davis@university.edu)</Text>
                      </Box>
                      
                      <HStack spacing={4} mt={2}>
                        <Button
                          leftIcon={<EmailIcon />}
                          colorScheme="blue"
                          variant="solid"
                          size="sm"
                          flex={1}
                        >
                          Send Email
                        </Button>
                        <Button
                          leftIcon={<CalendarIcon />}
                          colorScheme="purple"
                          variant="outline"
                          size="sm"
                          flex={1}
                          onClick={onFormOpen}
                        >
                          Request Meeting
                        </Button>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              </Box>
              
              <Box>
                <Card mb={6}>
                  <CardHeader bg="green.50" py={4}>
                    <Heading size="md" color="green.700">
                      Effective Consultation Tips
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <List spacing={3}>
                    {consultationTips.map((tip: string, index: number) => (
                <ListItem key={index}>
                    <HStack align="start">
                        <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                            <Text fontSize="sm">{tip}</Text>
                    </HStack>
                </ListItem>
  ))}
                    </List>

                    
                    <Box bg="blue.50" p={3} borderRadius="md" mt={6}>
                      <Flex>
                        <Icon as={InfoIcon} color="blue.500" mt={1} mr={2} />
                        <Text fontSize="sm" color="blue.700">
                          <strong>Pro Tip:</strong> The quality of your consultation sessions greatly depends on your preparation. Always come with specific questions and be prepared to discuss your progress.
                        </Text>
                      </Flex>
                    </Box>
                  </CardBody>
                </Card>
                
                <Card>
                  <CardHeader bg="gray.50" py={4}>
                    <Heading size="md">Frequently Asked Questions</Heading>
                  </CardHeader>
                  <CardBody>
                    <Accordion allowMultiple>
                      <AccordionItem border="none" mb={2}>
                        <h2>
                          <AccordionButton
                            _expanded={{ bg: "purple.50", color: "purple.700" }}
                            borderRadius="md"
                          >
                            <Box flex="1" textAlign="left" fontWeight="medium" fontSize="sm">
                              How often should I schedule consultations?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pt={2} fontSize="sm">
                          Regular consultations are essential for thesis progress. For most students, bi-weekly or monthly meetings are recommended, but this can vary based on your thesis phase and advisor preferences.
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem border="none" mb={2}>
                        <h2>
                          <AccordionButton
                            _expanded={{ bg: "purple.50", color: "purple.700" }}
                            borderRadius="md"
                          >
                            <Box flex="1" textAlign="left" fontWeight="medium" fontSize="sm">
                              What should I bring to a consultation session?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pt={2} fontSize="sm">
                          Prepare an agenda, bring any relevant documents (e.g., drafts, research findings), a list of specific questions or challenges, and any materials requested by your advisor from previous meetings.
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem border="none" mb={2}>
                        <h2>
                          <AccordionButton
                            _expanded={{ bg: "purple.50", color: "purple.700" }}
                            borderRadius="md"
                          >
                            <Box flex="1" textAlign="left" fontWeight="medium" fontSize="sm">
                              How far in advance should I request a consultation?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pt={2} fontSize="sm">
                          It's best to request consultations at least 1-2 weeks in advance to ensure your advisor has availability. During busy periods (e.g., end of semester), consider requesting even earlier.
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem border="none" mb={2}>
                        <h2>
                          <AccordionButton
                            _expanded={{ bg: "purple.50", color: "purple.700" }}
                            borderRadius="md"
                          >
                            <Box flex="1" textAlign="left" fontWeight="medium" fontSize="sm">
                              What if I need to cancel or reschedule?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pt={2} fontSize="sm">
                          If you need to cancel or reschedule, notify your advisor as soon as possible (at least 24 hours in advance). You can use the "Reschedule" option for scheduled meetings or contact your advisor directly.
                        </AccordionPanel>
                      </AccordionItem>

                      <AccordionItem border="none">
                        <h2>
                          <AccordionButton
                            _expanded={{ bg: "purple.50", color: "purple.700" }}
                            borderRadius="md"
                          >
                            <Box flex="1" textAlign="left" fontWeight="medium" fontSize="sm">
                              How should I follow up after a consultation?
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pt={2} fontSize="sm">
                          After each consultation, send a follow-up email summarizing the key points discussed, action items, and any questions that may have arisen. This creates a record of your discussion and shows your advisor you're engaged.
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </CardBody>
                </Card>
              </Box>
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Consultation Request Modal */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Thesis Consultation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Consultation Type</FormLabel>
                <Select 
                  placeholder="Select consultation type" 
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                >
                  <option value="in-person">In-Person Meeting</option>
                  <option value="online">Online Video Meeting</option>
                  <option value="email">Email Consultation</option>
                </Select>
                <FormHelperText>
                  Select the type of consultation you're requesting
                </FormHelperText>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Preferred Date</FormLabel>
                <Input 
                  type="date" 
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Preferred Time</FormLabel>
                <Select 
                  placeholder="Select preferred time" 
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                >
                  <option value="09:00 - 10:00">09:00 - 10:00</option>
                  <option value="10:00 - 11:00">10:00 - 11:00</option>
                  <option value="11:00 - 12:00">11:00 - 12:00</option>
                  <option value="13:00 - 14:00">13:00 - 14:00</option>
                  <option value="14:00 - 15:00">14:00 - 15:00</option>
                  <option value="15:00 - 16:00">15:00 - 16:00</option>
                  <option value="16:00 - 17:00">16:00 - 17:00</option>
                </Select>
                <FormHelperText>
                  Check advisor availability before selecting a time
                </FormHelperText>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Consultation Topic</FormLabel>
                <Input 
                  placeholder="Brief title for the consultation topic" 
                  value={consultationTopic}
                  onChange={(e) => setConsultationTopic(e.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Description & Agenda</FormLabel>
                <Textarea 
                  placeholder="Describe what you'd like to discuss and specific questions you have" 
                  value={consultationDescription}
                  onChange={(e) => setConsultationDescription(e.target.value)}
                  minHeight="120px"
                />
                <FormHelperText>
                  Be specific about what you need help with to make the consultation more productive
                </FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>Upload Supporting Documents (Optional)</FormLabel>
                <Input 
                  type="file" 
                  p={1} 
                  height="auto" 
                  onChange={handleFileUpload}
                  multiple
                  accept=".doc,.docx,.pdf,.xlsx,.xls,.jpg,.jpeg,.png"
                />
                <FormHelperText>
                  You can upload drafts, data, or any other relevant documents
                </FormHelperText>
                
                {uploadedFiles.length > 0 && (
                  <Box mt={3} p={3} borderWidth="1px" borderRadius="md">
                    <Text fontSize="sm" fontWeight="medium" mb={2}>Uploaded Files:</Text>
                    <VStack align="stretch" spacing={2}>
                      {uploadedFiles.map((file, index) => (
                        <Flex key={index} justify="space-between" align="center">
                          <HStack>
                            {getFileIcon(file)}
                            <Text fontSize="sm">{file}</Text>
                          </HStack>
                          <Button
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => {
                              setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
                            }}
                          >
                            Remove
                          </Button>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onFormClose}>
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={handleSubmitRequest}>
              Submit Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Consultation Detail Modal */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Consultation Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedConsultation && (
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="sm" color="gray.500">Consultation Topic</Text>
                  <Heading size="md">{selectedConsultation.topic}</Heading>
                </Box>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Date & Time</Text>
                    <Text fontWeight="medium">
                      {selectedConsultation.date} ({selectedConsultation.time})
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Consultation Type</Text>
                    <HStack>
                      {renderTypeBadge(selectedConsultation.type)}
                    </HStack>
                  </Box>
                </SimpleGrid>
                
                <Box>
                  <Text fontSize="sm" color="gray.500">Advisor</Text>
                  <Text>{selectedConsultation.advisor}</Text>
                </Box>
                
                {selectedConsultation.notes && (
                  <Box>
                    <Text fontSize="sm" color="gray.500">Session Notes</Text>
                    <Box p={3} borderWidth="1px" borderRadius="md" borderColor="gray.200">
                      <Text fontSize="sm">{selectedConsultation.notes}</Text>
                    </Box>
                  </Box>
                )}
                
                {selectedConsultation.feedback && (
                  <Box>
                    <Text fontSize="sm" color="gray.500">Advisor Feedback</Text>
                    <Box p={3} borderWidth="1px" borderRadius="md" borderColor="green.200" bg="green.50">
                      <Text fontSize="sm" color="green.700">{selectedConsultation.feedback}</Text>
                    </Box>
                  </Box>
                )}
                
                {selectedConsultation.attachments && selectedConsultation.attachments.length > 0 && (
                  <Box>
                    <Text fontSize="sm" color="gray.500" mb={2}>Attachments</Text>
                    <VStack align="stretch" spacing={2}>
                      {selectedConsultation.attachments.map((file, index) => (
                        <Flex 
                          key={index} 
                          p={2} 
                          borderWidth="1px" 
                          borderRadius="md" 
                          borderColor="gray.200"
                          justify="space-between"
                          align="center"
                        >
                          <HStack>
                            {getFileIcon(file)}
                            <Text fontSize="sm">{file}</Text>
                          </HStack>
                          <Button
                            size="xs"
                            leftIcon={<DownloadIcon />}
                            colorScheme="blue"
                            variant="ghost"
                          >
                            Download
                          </Button>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                )}
                
                <Divider />
                
                <Box>
                  <Text fontSize="sm" color="gray.500">Action Items</Text>
                  <List spacing={2} mt={2}>
                    <ListItem>
                      <HStack align="start">
                        <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                        <Text fontSize="sm">Review literature on healthcare data mining techniques</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack align="start">
                        <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                        <Text fontSize="sm">Complete initial data preprocessing for sample dataset</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack align="start">
                        <ListIcon as={CheckCircleIcon} color="green.500" mt={1} />
                        <Text fontSize="sm">Prepare questions about algorithm selection for next meeting</Text>
                      </HStack>
                    </ListItem>
                  </List>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onDetailClose}>
              Close
            </Button>
            <Button leftIcon={<CalendarIcon />} colorScheme="green" variant="outline">
              Schedule Follow-up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ThesisConsultation;