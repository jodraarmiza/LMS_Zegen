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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  SimpleGrid,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
  GridItem,
  useToast,
  Progress,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Alert,
  AlertIcon,
  Checkbox,
} from "@chakra-ui/react";
import {

  WarningIcon,
  InfoIcon,
  CalendarIcon,
  ChevronRightIcon,
  AddIcon,
  AttachmentIcon,
  DownloadIcon,
  EmailIcon,
} from "@chakra-ui/icons";
import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaChalkboardTeacher, FaVideo } from "react-icons/fa";

// Interface for defense request
interface DefenseRequest {
  id: string;
  title: string;
  student: string;
  requestDate: string;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "scheduled" | "completed" | "rejected";
  location?: string;
  committee?: string[];
  documents?: DefenseDocument[];
  feedback?: string;
}

// Interface for defense documents
interface DefenseDocument {
  id: string;
  name: string;
  type: "thesis" | "presentation" | "approval" | "other";
  status: "required" | "submitted" | "approved" | "rejected";
  uploadDate?: string;
  fileSize?: string;
  feedback?: string;
}

// Interface for defense checklist item
interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  deadline?: string;
}

// Committee member interface
interface CommitteeMember {
  id: string;
  name: string;
  title: string;
  department: string;
  role: "chair" | "internal" | "external";
  confirmed: boolean;
  email: string;
}

const ThesisDefense: React.FC = () => {
  const toast = useToast();
  const { isOpen: isRequestOpen, onOpen: onRequestOpen, onClose: onRequestClose } = useDisclosure();
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();
  const { isOpen: isChecklistOpen, onOpen: onChecklistOpen, onClose: onChecklistClose } = useDisclosure();
  const { isOpen: isCommitteeOpen, onOpen: onCommitteeOpen, onClose: onCommitteeClose } = useDisclosure();
  
  // Form states
  const [title, setTitle] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [defenseNotes, setDefenseNotes] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DefenseDocument | null>(null);
  
  // Committee form states
  const [memberName, setMemberName] = useState("");
  const [memberTitle, setMemberTitle] = useState("");
  const [memberDepartment, setMemberDepartment] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState("");
  
  // Current active defense status (null if no active defense)
  const [activeDefenseStep, setActiveDefenseStep] = useState<number | null>(1);
  
  // Sample data
  const [defenseRequest, setDefenseRequest] = useState<DefenseRequest | null>({
    id: "DEF-2025-001",
    title: "Analysis of Machine Learning Algorithms for Predictive Analytics in Healthcare",
    student: "Alex Johnson",
    requestDate: "April 1, 2025",
    preferredDate: "May 15, 2025",
    preferredTime: "10:00 AM - 12:00 PM",
    status: "scheduled",
    location: "Computer Science Building, Room 305",
    committee: [
      "Dr. Robert Johnson (Advisor)",
      "Dr. Emily Chen",
      "Dr. Michael Smith"
    ],
    documents: [
      {
        id: "doc1",
        name: "Complete Thesis Draft.pdf",
        type: "thesis",
        status: "submitted",
        uploadDate: "March 28, 2025",
        fileSize: "4.8 MB"
      },
      {
        id: "doc2",
        name: "Defense Presentation Draft.pptx",
        type: "presentation",
        status: "required"
      },
      {
        id: "doc3",
        name: "Thesis Approval Form.pdf",
        type: "approval",
        status: "required"
      }
    ]
  });
  
  // Defense checklist items
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: "check1",
      title: "Complete Thesis Draft",
      description: "Submit final draft of thesis document approved by your advisor",
      completed: true,
      required: true,
      deadline: "4 weeks before defense"
    },
    {
      id: "check2",
      title: "Committee Formation",
      description: "Confirm all committee members for your defense",
      completed: true,
      required: true,
      deadline: "6 weeks before defense"
    },
    {
      id: "check3",
      title: "Defense Presentation",
      description: "Prepare defense presentation slides",
      completed: false,
      required: true,
      deadline: "1 week before defense"
    },
    {
      id: "check4",
      title: "Room Reservation",
      description: "Confirm room reservation for defense date",
      completed: true,
      required: true,
      deadline: "2 weeks before defense"
    },
    {
      id: "check5",
      title: "Defense Announcement",
      description: "Submit public announcement of defense date and topic",
      completed: false,
      required: true,
      deadline: "2 weeks before defense"
    },
    {
      id: "check6",
      title: "Format Review",
      description: "Complete thesis format review with graduate office",
      completed: false,
      required: true,
      deadline: "3 weeks before defense"
    },
    {
      id: "check7",
      title: "Practice Session",
      description: "Schedule and complete practice defense presentation",
      completed: false,
      required: false,
      deadline: "1 week before defense"
    }
  ]);
  
  // Committee members
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([
    {
      id: "cm1",
      name: "Dr. Robert Johnson",
      title: "Professor",
      department: "Computer Science",
      role: "chair",
      confirmed: true,
      email: "r.johnson@university.edu"
    },
    {
      id: "cm2",
      name: "Dr. Emily Chen",
      title: "Associate Professor",
      department: "Computer Science",
      role: "internal",
      confirmed: true,
      email: "e.chen@university.edu"
    },
    {
      id: "cm3",
      name: "Dr. Michael Smith",
      title: "Professor",
      department: "Information Systems",
      role: "internal",
      confirmed: true,
      email: "m.smith@university.edu"
    },
    {
      id: "cm4",
      name: "Dr. Sarah Williams",
      title: "Associate Professor",
      department: "Healthcare Informatics",
      role: "external",
      confirmed: false,
      email: "s.williams@meduniversity.edu"
    }
  ]);
  
  // Evaluation rubrics
  const evaluationCriteria = [
    {
      category: "Research Quality",
      weight: "30%",
      aspects: [
        "Originality and significance of research",
        "Quality of literature review",
        "Appropriateness of methodology",
        "Data collection and analysis",
        "Interpretation of results"
      ]
    },
    {
      category: "Written Thesis",
      weight: "30%",
      aspects: [
        "Organization and structure",
        "Clarity of writing",
        "Proper citation and referencing",
        "Quality of figures and tables",
        "Adherence to formatting guidelines"
      ]
    },
    {
      category: "Oral Presentation",
      weight: "25%",
      aspects: [
        "Organization and clarity",
        "Quality of visual aids",
        "Presentation skills",
        "Time management",
        "Handling of questions"
      ]
    },
    {
      category: "Defense Discussion",
      weight: "15%",
      aspects: [
        "Understanding of the subject matter",
        "Ability to answer questions",
        "Critical thinking",
        "Demonstrated knowledge of limitations",
        "Articulation of future work"
      ]
    }
  ];

  // Handle toggle checklist item
  const toggleChecklistItem = (id: string) => {
    setChecklistItems(
      checklistItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    toast({
      title: "Checklist Updated",
      status: "success",
      duration: 2000,
      isClosable: true
    });
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles([...uploadedFiles, ...fileNames]);
    }
  };
  
  // Submit defense request
  const handleSubmitRequest = () => {
    if (!title || !preferredDate || !preferredTime) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    
    // Create new defense request
    const newRequest: DefenseRequest = {
      id: "DEF-2025-002",
      title: title,
      student: "Alex Johnson",
      requestDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }),
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      status: "pending",
      location: preferredLocation,
      documents: []
    };
    
    setDefenseRequest(newRequest);
    setActiveDefenseStep(0);
    
    toast({
      title: "Request Submitted",
      description: "Your defense request has been submitted successfully",
      status: "success",
      duration: 3000,
      isClosable: true
    });
    
    // Reset form
    setTitle("");
    setPreferredDate("");
    setPreferredTime("");
    setPreferredLocation("");
    setDefenseNotes("");
    onRequestClose();
  };
  
  // Upload document
  const handleUploadDocument = () => {
    if (!selectedDocument || uploadedFiles.length === 0) {
      toast({
        title: "Missing information",
        description: "Please select a document type and upload a file",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    
    if (defenseRequest && defenseRequest.documents) {
      // Update the document status with type assertion
      const updatedDocuments = defenseRequest.documents.map(doc => 
        doc.id === selectedDocument.id 
          ? { 
              ...doc, 
              status: "submitted" as "required" | "submitted" | "approved" | "rejected",
              name: uploadedFiles[0],
              uploadDate: new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              }),
              fileSize: "2.4 MB" // Mock file size
            } 
          : doc
      );
      
      setDefenseRequest({
        ...defenseRequest,
        documents: updatedDocuments
      });
      
      toast({
        title: "Document Uploaded",
        description: "Your document has been uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      
      // Reset form
      setSelectedDocument(null);
      setUploadedFiles([]);
      onUploadClose();
    }
  };
  
  // Add committee member
  const handleAddCommitteeMember = () => {
    if (!memberName || !memberTitle || !memberDepartment || !memberEmail || !memberRole) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    
    const newMember: CommitteeMember = {
      id: `cm${committeeMembers.length + 1}`,
      name: memberName,
      title: memberTitle,
      department: memberDepartment,
      role: memberRole as "chair" | "internal" | "external",
      confirmed: false,
      email: memberEmail
    };
    
    setCommitteeMembers([...committeeMembers, newMember]);
    
    toast({
      title: "Committee Member Added",
      description: `${memberName} has been added to your committee`,
      status: "success",
      duration: 3000,
      isClosable: true
    });
    
    // Reset form
    setMemberName("");
    setMemberTitle("");
    setMemberDepartment("");
    setMemberEmail("");
    setMemberRole("");
    onCommitteeClose();
  };
  
  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge colorScheme="yellow">Pending</Badge>;
      case "scheduled":
        return <Badge colorScheme="blue">Scheduled</Badge>;
      case "completed":
        return <Badge colorScheme="green">Completed</Badge>;
      case "rejected":
        return <Badge colorScheme="red">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  // Render document status badge
  const renderDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "required":
        return <Badge colorScheme="red">Required</Badge>;
      case "submitted":
        return <Badge colorScheme="yellow">Submitted</Badge>;
      case "approved":
        return <Badge colorScheme="green">Approved</Badge>;
      case "rejected":
        return <Badge colorScheme="red">Rejected</Badge>;
      default:
        return null;
    }
  };
  
  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "thesis":
        return <Icon as={FaFilePdf} color="red.500" />;
      case "presentation":
        return <Icon as={FaFilePowerpoint} color="orange.500" />;
      case "approval":
        return <Icon as={FaFileWord} color="blue.500" />;
      default:
        return <AttachmentIcon color="gray.500" />;
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
      case 'ppt':
      case 'pptx':
        return <Icon as={FaFilePowerpoint} color="orange.500" />;
      default:
        return <AttachmentIcon color="gray.500" />;
    }
  };
  
  // Calculate checklist progress
  const checklistProgress = () => {
    const requiredItems = checklistItems.filter(item => item.required);
    const completedRequiredItems = requiredItems.filter(item => item.completed);
    return (completedRequiredItems.length / requiredItems.length) * 100;
  };
  
  // Get defense steps
  const defenseSteps = [
    { title: 'Request', description: 'Submitted' },
    { title: 'Approval', description: 'Scheduled' },
    { title: 'Preparation', description: 'In Progress' },
    { title: 'Defense', description: 'Upcoming' },
    { title: 'Final', description: 'Submission' }
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading size="lg" mb={2}>
          Thesis Defense
        </Heading>
        <Text color="gray.600">
          Request, prepare, and track your thesis defense
        </Text>
      </Box>

      {defenseRequest ? (
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          {/* Left Column */}
          <GridItem>
            <Card mb={6}>
              <CardHeader bg="blue.50" py={4}>
                <Heading size="md" color="blue.700">
                  Defense Status & Information
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={6}>
                  <Box>
                    <Text fontSize="sm" color="gray.500">Thesis Title</Text>
                    <Heading size="md">{defenseRequest.title}</Heading>
                  </Box>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Student</Text>
                      <Text fontWeight="medium">{defenseRequest.student}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">Status</Text>
                      <HStack>{renderStatusBadge(defenseRequest.status)}</HStack>
                    </Box>
                  </SimpleGrid>
                  
                  {defenseRequest.status === "scheduled" && (
                    <>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <Box>
                          <Text fontSize="sm" color="gray.500">Defense Date</Text>
                          <Text fontWeight="medium">{defenseRequest.preferredDate}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm" color="gray.500">Time</Text>
                          <Text fontWeight="medium">{defenseRequest.preferredTime}</Text>
                        </Box>
                      </SimpleGrid>
                      
                      <Box>
                        <Text fontSize="sm" color="gray.500">Location</Text>
                        <Text fontWeight="medium">{defenseRequest.location}</Text>
                      </Box>
                    </>
                  )}
                  
                  {activeDefenseStep !== null && (
                    <Box>
                      <Text fontSize="sm" color="gray.500" mb={2}>Progress</Text>
                      <Stepper index={activeDefenseStep} size="sm" colorScheme="blue">
                        {defenseSteps.map((step, index) => (
                          <Step key={index}>
                            <StepIndicator>
                              <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                              />
                            </StepIndicator>
                            <Box flexShrink={0}>
                              <StepTitle fontSize="xs">{step.title}</StepTitle>
                              <StepDescription fontSize="xs">{step.description}</StepDescription>
                            </Box>
                            <StepSeparator />
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  )}
                  
                  {defenseRequest.status === "scheduled" && (
                    <SimpleGrid columns={2} spacing={4} mt={2}>
                      <Button
                        colorScheme="blue"
                        leftIcon={<CalendarIcon />}
                        size="sm"
                      >
                        Add to Calendar
                      </Button>
                      <Button
                        colorScheme="purple"
                        leftIcon={<Icon as={FaChalkboardTeacher} />}
                        size="sm"
                      >
                        Preparation Resources
                      </Button>
                    </SimpleGrid>
                  )}
                  
                  {defenseRequest.status === "pending" && (
                    <Alert status="info" borderRadius="md">
                      <AlertIcon />
                      Your defense request is waiting for approval from the department. You'll be notified once it's approved.
                    </Alert>
                  )}
                </VStack>
              </CardBody>
            </Card>

            <Card mb={6}>
              <CardHeader bg="green.50" py={4}>
                <Heading size="md" color="green.700">
                  Required Documents
                </Heading>
              </CardHeader>
              <CardBody>
                {defenseRequest.documents && defenseRequest.documents.length > 0 ? (
                  <VStack align="stretch" spacing={4}>
                    {defenseRequest.documents.map((doc, index) => (
                      <Flex
                        key={index}
                        p={3}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={
                          doc.status === "approved" ? "green.200" :
                          doc.status === "submitted" ? "yellow.200" :
                          doc.status === "rejected" ? "red.200" : "red.100"
                        }
                        bg={
                          doc.status === "approved" ? "green.50" :
                          doc.status === "submitted" ? "yellow.50" :
                          doc.status === "rejected" ? "red.50" : "gray.50"
                        }
                        justify="space-between"
                        align="center"
                      >
                        <HStack>
                          {getDocumentIcon(doc.type)}
                          <Box>
                            <Text fontWeight="medium">{doc.name || `${doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} Document`}</Text>
                            <HStack fontSize="xs" color="gray.500" mt={1}>
                              {doc.uploadDate && <Text>Uploaded: {doc.uploadDate}</Text>}
                              {doc.fileSize && <Text>Size: {doc.fileSize}</Text>}
                            </HStack>
                          </Box>
                          {renderDocumentStatusBadge(doc.status)}
                        </HStack>
                        
                        <HStack>
                          {doc.status === "required" ? (
                            <Button
                              size="xs"
                              colorScheme="blue"
                              leftIcon={<AddIcon />}
                              onClick={() => {
                                setSelectedDocument(doc);
                                onUploadOpen();
                              }}
                            >
                              Upload
                            </Button>
                          ) : (
                            <>
                              <Button
                                size="xs"
                                colorScheme="blue"
                                variant="ghost"
                                leftIcon={<DownloadIcon />}
                              >
                                Download
                              </Button>
                              
                              {doc.status === "submitted" && (
                                <Button
                                  size="xs"
                                  colorScheme="blue"
                                  leftIcon={<AddIcon />}
                                  onClick={() => {
                                    setSelectedDocument(doc);
                                    onUploadOpen();
                                  }}
                                >
                                  Update
                                </Button>
                              )}
                            </>
                          )}
                        </HStack>
                      </Flex>
                    ))}
                    
                    {defenseRequest.documents.some(doc => doc.status === "required") && (
                      <Alert status="warning" borderRadius="md">
                        <AlertIcon />
                        Please upload all required documents before your defense date.
                      </Alert>
                    )}
                  </VStack>
                ) : (
                  <Box textAlign="center" py={6}>
                    <Text color="gray.500">No documents required yet</Text>
                  </Box>
                )}
              </CardBody>
            </Card>

            <Card mb={6}>
              <CardHeader bg="purple.50" py={4}>
                <Flex justify="space-between" align="center">
                  <Heading size="md" color="purple.700">
                    Defense Preparation Checklist
                  </Heading>
                  <Button
                    size="xs"
                    colorScheme="purple"
                    variant="outline"
                    onClick={onChecklistOpen}
                  >
                    View All
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <Box mb={4}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="medium">Required Items Progress</Text>
                    <Text fontWeight="medium" color={checklistProgress() === 100 ? "green.500" : "blue.500"}>
                      {Math.round(checklistProgress())}%
                    </Text>
                  </Flex>
                  <Progress
                    value={checklistProgress()}
                    size="sm"
                    colorScheme={checklistProgress() === 100 ? "green" : "blue"}
                    borderRadius="full"
                  />
                </Box>
                
                <VStack align="stretch" spacing={3}>
                  {checklistItems
                    .filter(item => item.required)
                    .slice(0, 4)
                    .map((item, index) => (
                      <Flex
                        key={index}
                        justify="space-between"
                        align="center"
                        p={2}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={item.completed ? "green.200" : "gray.200"}
                        bg={item.completed ? "green.50" : "white"}
                      >
                        <HStack>
                          <Checkbox
                            isChecked={item.completed}
                            onChange={() => toggleChecklistItem(item.id)}
                            colorScheme="green"
                          />
                          <Text
                            fontWeight="medium"
                            textDecoration={item.completed ? "line-through" : "none"}
                            color={item.completed ? "gray.500" : "black"}
                          >
                            {item.title}
                          </Text>
                        </HStack>
                        {item.deadline && (
                          <Badge colorScheme={item.completed ? "green" : "blue"} fontSize="xs">
                            {item.deadline}
                          </Badge>
                        )}
                      </Flex>
                    ))}
                </VStack>
                
                {checklistItems.filter(item => item.required).length > 4 && (
                  <Button
                    mt={4}
                    width="full"
                    size="sm"
                    colorScheme="purple"
                    variant="outline"
                    onClick={onChecklistOpen}
                  >
                    Show All Checklist Items
                  </Button>
                )}
              </CardBody>
            </Card>
          </GridItem>

          {/* Right Column */}
          <GridItem>
            <Card mb={6}>
              <CardHeader bg="orange.50" py={4}>
                <Flex justify="space-between" align="center">
                  <Heading size="md" color="orange.700">
                    Defense Committee
                  </Heading>
                  <Button
                    size="xs"
                    colorScheme="orange"
                    leftIcon={<AddIcon />}
                    variant="outline"
                    onClick={onCommitteeOpen}
                  >
                    Add Member
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  {committeeMembers.map((member, index) => (
                    <Box
                      key={index}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor={member.confirmed ? "green.200" : "gray.200"}
                    >
                      <Flex justify="space-between" mb={1}>
                        <Heading size="sm">{member.name}</Heading>
                        <Badge colorScheme={member.confirmed ? "green" : "yellow"}>
                          {member.confirmed ? "Confirmed" : "Pending"}
                        </Badge>
                      </Flex>
                      <Text fontSize="sm" color="gray.600">{member.title}</Text>
                      <Text fontSize="sm" color="gray.600">{member.department}</Text>
                      <HStack mt={2} justify="space-between">
                        <Badge colorScheme={
                          member.role === "chair" ? "purple" :
                          member.role === "internal" ? "blue" : "orange"
                        }>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </Badge>
                        <Button
                          size="xs"
                          leftIcon={<EmailIcon />}
                          colorScheme="blue"
                          variant="ghost"
                        >
                          Contact
                        </Button>
                      </HStack>
                    </Box>
                  ))}
                  
                  {!committeeMembers.every(member => member.confirmed) && (
                    <Alert status="info" borderRadius="md">
                      <AlertIcon />
                      All committee members must confirm their participation before the defense date.
                    </Alert>
                  )}
                </VStack>
              </CardBody>
            </Card>

            <Card mb={6}>
              <CardHeader bg="red.50" py={4}>
                <Heading size="md" color="red.700">
                  Important Dates
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  <Flex
                    p={3}
                    borderRadius="md"
                    bg="red.50"
                    borderWidth="1px"
                    borderColor="red.200"
                    align="center"
                  >
                    <WarningIcon color="red.500" mr={3} />
                    <Box>
                      <Text fontWeight="medium">Document Submission Deadline</Text>
                      <Text fontSize="sm">May 1, 2025 (2 weeks before defense)</Text>
                    </Box>
                  </Flex>
                  
                  <Flex
                    p={3}
                    borderRadius="md"
                    bg="blue.50"
                    borderWidth="1px"
                    borderColor="blue.200"
                    align="center"
                  >
                    <CalendarIcon color="blue.500" mr={3} />
                    <Box>
                      <Text fontWeight="medium">Defense Date</Text>
                      <Text fontSize="sm">May 15, 2025 (10:00 AM - 12:00 PM)</Text>
                    </Box>
                  </Flex>
                  
                  <Flex
                    p={3}
                    borderRadius="md"
                    bg="green.50"
                    borderWidth="1px"
                    borderColor="green.200"
                    align="center"
                  >
                    <InfoIcon color="green.500" mr={3} />
                    <Box>
                      <Text fontWeight="medium">Final Thesis Submission</Text>
                      <Text fontSize="sm">June 1, 2025 (After defense revisions)</Text>
                    </Box>
                  </Flex>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardHeader bg="gray.50" py={4}>
                <Heading size="md">Defense Resources</Heading>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <Flex
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                    _hover={{ bg: "gray.50" }}
                    align="center"
                    justify="space-between"
                  >
                    <HStack>
                      <Icon as={FaFilePowerpoint} color="orange.500" />
                      <Text fontWeight="medium">Presentation Templates</Text>
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
                  
                  <Flex
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                    _hover={{ bg: "gray.50" }}
                    align="center"
                    justify="space-between"
                  >
                    <HStack>
                      <Icon as={FaFilePdf} color="red.500" />
                      <Text fontWeight="medium">Defense Guidelines</Text>
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
                  
                  <Flex
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                    _hover={{ bg: "gray.50" }}
                    align="center"
                    justify="space-between"
                  >
                    <HStack>
                      <Icon as={FaVideo} color="purple.500" />
                      <Text fontWeight="medium">Sample Defense Videos</Text>
                    </HStack>
                    <Button
                      size="xs"
                      rightIcon={<ChevronRightIcon />}
                      colorScheme="blue"
                      variant="ghost"
                    >
                      View
                    </Button>
                  </Flex>
                  
                  <Flex
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="gray.200"
                    _hover={{ bg: "gray.50" }}
                    align="center"
                    justify="space-between"
                  >
                    <HStack>
                      <Icon as={FaFileWord} color="blue.500" />
                      <Text fontWeight="medium">Post-Defense Forms</Text>
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
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      ) : (
        <Card>
          <CardHeader bg="blue.50" py={4}>
            <Heading size="md" color="blue.700">
              Request Thesis Defense
            </Heading>
          </CardHeader>
          <CardBody>
            <Text mb={6}>
              You don't have an active defense request. Submit a request when your thesis is ready for defense.
            </Text>
            <Button
              colorScheme="blue"
              leftIcon={<AddIcon />}
              onClick={onRequestOpen}
            >
              Request Defense
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Defense Request Modal */}
      <Modal isOpen={isRequestOpen} onClose={onRequestClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Thesis Defense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Thesis Title</FormLabel>
                <Input 
                  placeholder="Enter your thesis title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Preferred Defense Date</FormLabel>
                <Input 
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                />
                <FormHelperText>
                  Must be at least 4 weeks from submission date
                </FormHelperText>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Preferred Time</FormLabel>
                <Select 
                  placeholder="Select preferred time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                >
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                  <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                </Select>
              </FormControl>
              
              <FormControl>
                <FormLabel>Preferred Location (Optional)</FormLabel>
                <Input 
                  placeholder="Enter preferred location if any"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                />
                <FormHelperText>
                  If left blank, the department will assign a room
                </FormHelperText>
              </FormControl>
              
              <FormControl>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <Textarea 
                  placeholder="Any special considerations or requests"
                  value={defenseNotes}
                  onChange={(e) => setDefenseNotes(e.target.value)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onRequestClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmitRequest}>
              Submit Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Upload Document Modal */}
      <Modal isOpen={isUploadOpen} onClose={onUploadClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Document Type</FormLabel>
                <Text fontWeight="medium">
                    {selectedDocument && selectedDocument.type 
                         ? `${selectedDocument.type.charAt(0).toUpperCase()}${selectedDocument.type.slice(1)}` 
                        : "Document"
                    }
                </Text>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Upload File</FormLabel>
                <Input 
                  type="file"
                  p={1}
                  height="auto"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <FormHelperText>
                  {selectedDocument?.type === "thesis" ? "PDF format only (max 25MB)" :
                   selectedDocument?.type === "presentation" ? "PowerPoint format (max 15MB)" :
                   "PDF or Word format (max 5MB)"}
                </FormHelperText>
              </FormControl>
              
              {uploadedFiles.length > 0 && (
                <Box p={3} borderWidth="1px" borderRadius="md">
                  <Text fontSize="sm" fontWeight="medium" mb={2}>Selected File:</Text>
                  <HStack>
                    {getFileIcon(uploadedFiles[0])}
                    <Text>{uploadedFiles[0]}</Text>
                  </HStack>
                </Box>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onUploadClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleUploadDocument}
              isDisabled={uploadedFiles.length === 0}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Checklist Modal */}
      <Modal isOpen={isChecklistOpen} onClose={onChecklistClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Defense Preparation Checklist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="medium">Required Items Progress</Text>
                <Text fontWeight="medium" color={checklistProgress() === 100 ? "green.500" : "blue.500"}>
                  {Math.round(checklistProgress())}%
                </Text>
              </Flex>
              <Progress
                value={checklistProgress()}
                size="sm"
                colorScheme={checklistProgress() === 100 ? "green" : "blue"}
                borderRadius="full"
              />
            </Box>
            
            <Tabs colorScheme="blue" variant="enclosed" mb={4}>
              <TabList>
                <Tab>Required</Tab>
                <Tab>Optional</Tab>
                <Tab>All</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack align="stretch" spacing={3}>
                    {checklistItems
                      .filter(item => item.required)
                      .map((item, index) => (
                        <Flex
                          key={index}
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          borderColor={item.completed ? "green.200" : "gray.200"}
                          bg={item.completed ? "green.50" : "white"}
                        >
                          <Checkbox
                            isChecked={item.completed}
                            onChange={() => toggleChecklistItem(item.id)}
                            colorScheme="green"
                            mr={3}
                            mt={1}
                          />
                          <Box flex={1}>
                            <Text
                              fontWeight="medium"
                              textDecoration={item.completed ? "line-through" : "none"}
                              color={item.completed ? "gray.500" : "black"}
                            >
                              {item.title}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {item.description}
                            </Text>
                            {item.deadline && (
                              <Badge colorScheme={item.completed ? "green" : "blue"} mt={1}>
                                Deadline: {item.deadline}
                              </Badge>
                            )}
                          </Box>
                        </Flex>
                      ))}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="stretch" spacing={3}>
                    {checklistItems
                      .filter(item => !item.required)
                      .map((item, index) => (
                        <Flex
                          key={index}
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          borderColor={item.completed ? "green.200" : "gray.200"}
                          bg={item.completed ? "green.50" : "white"}
                        >
                          <Checkbox
                            isChecked={item.completed}
                            onChange={() => toggleChecklistItem(item.id)}
                            colorScheme="green"
                            mr={3}
                            mt={1}
                          />
                          <Box flex={1}>
                            <Text
                              fontWeight="medium"
                              textDecoration={item.completed ? "line-through" : "none"}
                              color={item.completed ? "gray.500" : "black"}
                            >
                              {item.title}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {item.description}
                            </Text>
                            {item.deadline && (
                              <Badge colorScheme={item.completed ? "green" : "blue"} mt={1}>
                                Recommended: {item.deadline}
                              </Badge>
                            )}
                          </Box>
                        </Flex>
                      ))}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align="stretch" spacing={3}>
                    {checklistItems.map((item, index) => (
                      <Flex
                        key={index}
                        p={3}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={item.completed ? "green.200" : "gray.200"}
                        bg={item.completed ? "green.50" : "white"}
                      >
                        <Checkbox
                          isChecked={item.completed}
                          onChange={() => toggleChecklistItem(item.id)}
                          colorScheme="green"
                          mr={3}
                          mt={1}
                        />
                        <Box flex={1}>
                          <HStack>
                            <Text
                              fontWeight="medium"
                              textDecoration={item.completed ? "line-through" : "none"}
                              color={item.completed ? "gray.500" : "black"}
                            >
                              {item.title}
                            </Text>
                            {item.required ? (
                              <Badge colorScheme="red">Required</Badge>
                            ) : (
                              <Badge colorScheme="blue">Optional</Badge>
                            )}
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            {item.description}
                          </Text>
                          {item.deadline && (
                            <Badge colorScheme={item.completed ? "green" : "blue"} mt={1}>
                              {item.required ? "Deadline" : "Recommended"}: {item.deadline}
                            </Badge>
                          )}
                        </Box>
                      </Flex>
                    ))}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
            
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Box>
                <Text fontWeight="medium">Checklist Information</Text>
                <Text fontSize="sm">Complete all required items before your defense date. Optional items are recommended for better preparation.</Text>
              </Box>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onChecklistClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Committee Modal */}
      <Modal isOpen={isCommitteeOpen} onClose={onCommitteeClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Committee Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                  placeholder="Enter faculty name" 
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Select 
                  placeholder="Select title"
                  value={memberTitle}
                  onChange={(e) => setMemberTitle(e.target.value)}
                >
                  <option>Professor</option>
                  <option>Associate Professor</option>
                  <option>Assistant Professor</option>
                  <option>Adjunct Professor</option>
                </Select>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Department</FormLabel>
                <Input 
                  placeholder="Enter department"
                  value={memberDepartment}
                  onChange={(e) => setMemberDepartment(e.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  placeholder="Enter email address" 
                  type="email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select 
                  placeholder="Select role"
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                >
                  <option value="chair">Chair</option>
                  <option value="internal">Internal Member</option>
                  <option value="external">External Member</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCommitteeClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddCommitteeMember}>
              Add Member
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ThesisDefense;