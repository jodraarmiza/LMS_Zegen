import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  Box,
  Flex,
  Text,
  Heading,
  Avatar,
  Progress,
  Tabs,
  TabList,
  Tab,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Badge,
  Input,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Alert,
  AlertIcon,
  VStack,
  HStack,
  Divider,
  BoxProps,
} from "@chakra-ui/react";
import { ArrowBackIcon, InfoIcon, CheckCircleIcon, AttachmentIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  BsLightningCharge,
  BsFillJournalBookmarkFill,
  BsPersonWorkspace,
  BsFileEarmarkText,
  BsCalendarDate,
  BsClockHistory,
} from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface AssessmentItem {
  id: string;
  title: string;
  type: "Assignment" | "Mid Exam" | "Final Exam";
  count?: number; // Number of assignments (for Assignment type)
  percentage: number;
  dueDate?: string;
  score?: number;
  status: "Up Coming" | "In Progress" | "Completed";
  details?: AssignmentDetail[];
}

interface AssignmentDetail {
  id: string;
  title: string;
  dueDate: string;
  status: "Submitted" | "Not Submitted" | "Graded";
  score?: number;
  totalPoints: number;
  description: string;
  files?: FileItem[];
}

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate?: string;
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  instructors: Instructor[];
  distribution: {
    passed: number;
    inProgress: number;
    failed: number;
    notStarted: number;
  };
}

const Assessment: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(3); // Assessment tab (index 3)
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentItem | null>(null);
  const [isAssignmentDetailsOpen, setIsAssignmentDetailsOpen] = useState(false);
  const [showAssignmentDetails, setShowAssignmentDetails] = useState(false);
  const [selectedAssignmentDetail, setSelectedAssignmentDetail] = useState<AssignmentDetail | null>(null);
  
  const { 
    isOpen: isMidExamModalOpen, 
    onOpen: onMidExamModalOpen, 
    onClose: onMidExamModalClose 
  } = useDisclosure();
  
  const { 
    isOpen: isFinalExamModalOpen, 
    onOpen: onFinalExamModalOpen, 
    onClose: onFinalExamModalClose 
  } = useDisclosure();
  
  const { 
    isOpen: isFileUploadSuccess, 
    onOpen: onFileUploadSuccess, 
    onClose: onFileUploadSuccessClose 
  } = useDisclosure();

  // Setup Effect to initialize activeTab based on URL
  useEffect(() => {
    // Initialize active tab based on URL
    const path = window.location.pathname;
    if (path.includes("/session")) {
      setActiveTab(0);
    } else if (path.includes("/syllabus")) {
      setActiveTab(1);
    } else if (path.includes("/forum")) {
      setActiveTab(2);
    } else if (path.includes("/assessment")) {
      setActiveTab(3);
    } else if (path.includes("/exam")) {
      setActiveTab(4);
    } else if (path.includes("/gradebook")) {
      setActiveTab(5);
    } else if (path.includes("/rubric")) {
      setActiveTab(6);
    } else if (path.includes("/people")) {
      setActiveTab(7);
    } else if (path.includes("/attendance")) {
      setActiveTab(8);
    }
  }, []);

  // Mock data for the course
  const course: Course = {
    id: "1",
    code: "LB2123",
    title: "IT Service & Risk Management",
    category: "IT",
    instructors: [
      {
        id: "101",
        name: "Joni Zimbatima",
        avatarUrl: "https://placehold.co/32x32?text=JZ",
      },
      {
        id: "102",
        name: "Alan Russ",
        avatarUrl: "https://placehold.co/32x32?text=AR",
      },
    ],
    distribution: {
      passed: 30,
      inProgress: 15,
      failed: 30,
      notStarted: 25,
    },
  };

  // Mock data for assignment details
  const assignmentDetails: AssignmentDetail[] = [
    {
      id: "a1",
      title: "Assignment 1: IT Risk Assessment",
      dueDate: "March 15, 2025",
      status: "Graded",
      score: 95,
      totalPoints: 100,
      description: "Complete a risk assessment for a fictional company following the NIST framework. Identify at least 10 potential risks and provide mitigation strategies.",
      files: [
        {
          id: "f1",
          name: "Risk_Assessment_Guidelines.pdf",
          type: "PDF",
          size: "2.4 MB"
        }
      ]
    },
    {
      id: "a2",
      title: "Assignment 2: Service Level Agreement",
      dueDate: "April 10, 2025",
      status: "Graded",
      score: 88,
      totalPoints: 100,
      description: "Create a comprehensive SLA for an IT service provider that includes response times, uptime guarantees, and penalties for non-compliance.",
      files: [
        {
          id: "f2",
          name: "SLA_Template.docx",
          type: "DOCX",
          size: "1.2 MB"
        }
      ]
    },
    {
      id: "a3",
      title: "Assignment 3: ITIL Implementation Plan",
      dueDate: "May 5, 2025",
      status: "Submitted",
      totalPoints: 100,
      description: "Develop an ITIL implementation plan for a medium-sized enterprise focusing on incident management, problem management, and change management processes.",
      files: [
        {
          id: "f3",
          name: "ITIL_Framework_Overview.pdf",
          type: "PDF",
          size: "3.5 MB"
        }
      ]
    }
  ];

  // Mock data for assessments to match the screenshot
  const assessments: AssessmentItem[] = [
    {
      id: "1",
      title: "Assignment",
      type: "Assignment",
      count: 3,
      percentage: 30,
      status: "Completed",
      score: 90,
      details: assignmentDetails
    },
    {
      id: "2",
      title: "Mid Exam",
      type: "Mid Exam",
      percentage: 35,
      status: "Completed",
      score: 85,
      dueDate: "April 10, 2025",
    },
    {
      id: "3",
      title: "Final Exam",
      type: "Final Exam",
      percentage: 35,
      dueDate: "June 10, 2025",
      status: "Up Coming",
    },
  ];

  // Go back to courses page
  const handleBackToCourse = () => {
    navigate(`/courses`);
  };

  // Handle tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);

    // Navigate to the appropriate route based on tab selection
    switch (index) {
      case 0: // Session tab
        navigate(`/course/${courseId}/session/1`);
        break;
      case 1: // Syllabus tab
        navigate(`/course/${courseId}/syllabus`);
        break;
      case 2: // Forum tab
        navigate(`/course/${courseId}/forum`);
        break;
      case 3: // Assessment tab
        navigate(`/course/${courseId}/assessment`);
        break;
      case 4: // Exam tab
        navigate(`/course/${courseId}/exam`);
        break;
      case 5: // Gradebook tab
        navigate(`/course/${courseId}/gradebook`);
        break;
      case 6: // Assessment Rubric tab
        navigate(`/course/${courseId}/rubric`);
        break;
      case 7: // People tab
        navigate(`/course/${courseId}/people`);
        break;
      case 8: // Attendance tab
        navigate(`/course/${courseId}/attendance`);
        break;
      default:
        // Default case - stay on current page
        break;
    }
  };

  // Handle card click for assignment details
  const handleAssignmentClick = () => {
    setShowAssignmentDetails(true);
  };

  // Handle back to assessments
  const handleBackToAssessments = () => {
    setShowAssignmentDetails(false);
  };

  // Handle assignment detail click
  const handleAssignmentDetailClick = (detail: AssignmentDetail) => {
    setSelectedAssignmentDetail(detail);
    setIsAssignmentDetailsOpen(true);
  };

  // Handle mid exam click
  const handleMidExamClick = () => {
    onMidExamModalOpen();
  };

  // Handle final exam click
  const handleFinalExamClick = () => {
    onFinalExamModalOpen();
  };

  // Handle file upload
  const handleFileUpload = () => {
    onFinalExamModalClose();
    onFileUploadSuccess();
  };

  return (
    <Box bg="gray.50" w="full" minH="100vh" overflowX="hidden">
      {/* Main layout */}
      <Flex w="full" direction="column">
        {/* Content wrapper - takes full width */}
        <Box flex="1" position="relative" overflowX="hidden">
          {/* Course breadcrumb and header */}
          <Box bg="white" borderBottomWidth="1px" borderBottomColor="gray.200">
            <Box px={6} py={4}>
              {/* Custom breadcrumb section */}
              <Box>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  <ChakraLink
                    as={RouterLink}
                    to="/courses"
                    color="gray.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Course
                  </ChakraLink>
                  {" / "}
                  <Text as="span" fontWeight="medium" color={"gray.900"}>
                    {course.title}
                  </Text>
                </Text>

                {/* Title with back button */}
                <Flex alignItems="center" mb={4}>
                  <IconButton
                    aria-label="Back"
                    icon={<ArrowBackIcon />}
                    variant="ghost"
                    mr={2}
                    onClick={handleBackToCourse}
                  />
                  <Heading as="h1" size="md" fontWeight="semibold">
                    {course.title}
                  </Heading>
                </Flex>
              </Box>
            </Box>

            {/* Course title and code */}
            <Box px={2} py={2}>
              {/* Main content row with course info and progress bar */}
              <Flex direction="row" justify="space-between" align="flex-end">
                {/* Left side - Course info */}
                <Box flex="0.8" marginLeft={10} mb={4}>
                  <Flex alignItems="center">
                    <Box
                      bg="blue.500"
                      color="white"
                      p={3}
                      borderRadius="md"
                      mr={2}
                      mb={{ base: 2, md: 0 }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="20px"
                    >
                      <Icon as={BsFillJournalBookmarkFill} />
                    </Box>
                    <Text fontWeight="medium" mr={4}>
                      Course
                    </Text>
                    <Box fontSize="20px" color="gray" marginRight={1}>
                      <Icon as={BsLightningCharge} />
                    </Box>
                    <Text color="gray.500" marginRight={5}>
                      {course.code}
                    </Text>
                    <Box fontSize="20px" color="gray" marginRight={1}>
                      <Icon as={HiOutlineLightBulb} />
                    </Box>
                    <Text color="gray.500">{course.code}</Text>
                  </Flex>

                  <Heading as="h1" size="lg" mt={2} mb={3}>
                    {course.title}
                  </Heading>

                  {/* Instructors */}
                  <Flex align="center" mb={3}>
                    <Box fontSize="18px" color="gray" mr={4}>
                      <Icon as={BsPersonWorkspace} />
                    </Box>
                    {course.instructors.map((instructor) => (
                      <Flex key={instructor.id} align="center" mr={4}>
                        <Avatar
                          size="xs"
                          name={instructor.name}
                          src={instructor.avatarUrl}
                          mr={1}
                        />
                        <Text fontSize="sm">{instructor.name}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </Box>

                {/* Right side - Progress bar */}
                <Box flex="0.8" ml={6} mr={10} mb={10}>
                  {/* Session count */}
                  <Flex alignItems="center" mb={2}>
                    <Text fontSize="2xl" fontWeight="bold" mr={2}>
                      13
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Sessions
                    </Text>
                  </Flex>

                  {/* Progress percentages */}
                  <Flex justifyContent="space-between" mb={1} width="100%">
                    <Text fontSize="xs" color="gray.600">
                      30%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      15%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      30%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      25%
                    </Text>
                  </Flex>

                  {/* Session progress bar */}
                  <Box position="relative" mb={2}>
                    <Progress
                      value={100}
                      size="sm"
                      bg="gray.200"
                      borderRadius="full"
                      h="8px"
                    />
                    <Flex
                      position="absolute"
                      top="0"
                      left="0"
                      height="100%"
                      width="100%"
                    >
                      <Box
                        width={`${course.distribution.passed}%`}
                        bg="green.600"
                        borderLeftRadius="full"
                      />
                      <Box
                        width={`${course.distribution.inProgress}%`}
                        bg="blue.500"
                      />
                      <Box
                        width={`${course.distribution.failed}%`}
                        bg="red.500"
                      />
                      <Box
                        width={`${course.distribution.notStarted}%`}
                        bg="gray.400"
                        borderRightRadius="full"
                      />
                    </Flex>
                  </Box>

                  {/* Legend */}
                  <Flex
                    width="100%"
                    justifyContent="space-between"
                    fontSize="xs"
                    color="gray.600"
                  >
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="green.600"
                        display="inline-block"
                        mr="1"
                      />
                      <Text>Passed</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="blue.500"
                        display="inline-block"
                        mr="1"
                      />
                      <Text>In Progress</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="red.500"
                        display="inline-block"
                        mr="1"
                      />
                      <Text>Failed</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="gray.400"
                        display="inline-block"
                        mr="1"
                      />
                      <Text>Up Coming</Text>
                    </Flex>
                  </Flex>
                </Box>
              </Flex>

              {/* Tabs for course navigation */}
              <Box borderBottomWidth="1px" borderBottomColor="gray.200">
                <Tabs
                  index={activeTab}
                  onChange={handleTabChange}
                  variant="unstyled"
                >
                  <TabList>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📄
                        </Box>
                      </Box>
                      Session
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📘
                        </Box>
                      </Box>
                      Syllabus
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          💬
                        </Box>
                      </Box>
                      Forum
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📝
                        </Box>
                      </Box>
                      Assessment
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📝
                        </Box>
                      </Box>
                      Exam
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📊
                        </Box>
                      </Box>
                      Gradebook
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📋
                        </Box>
                      </Box>
                      Assessment Rubric
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          👥
                        </Box>
                      </Box>
                      People
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📅
                        </Box>
                      </Box>
                      Attendance
                    </Tab>
                  </TabList>
                </Tabs>
              </Box>
            </Box>
          </Box>

          {/* Assessment Content */}
          <Box>
            {!showAssignmentDetails ? (
              /* Assessment Cards in Row */
              <Flex px={6} py={6} gap={6}>
                {/* Assignment Card */}
                <Box 
                  bg="white" 
                  p={6} 
                  borderRadius="md" 
                  flex="1" 
                  cursor="pointer" 
                  _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  onClick={handleAssignmentClick}
                >
                  <Box mb={3}>
                    <Text color="gray.500" fontSize="sm">
                      Theory
                    </Text>
                    <Heading size="md">Assignment</Heading>
                  </Box>

                  <Flex justify="space-between" align="center" mt={8}>
                    <Box>
                      <Text fontSize="xl" fontWeight="bold">
                        3
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Assignment
                      </Text>
                    </Box>

                    <Flex
                      align="center"
                      bg="blue.50"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      <Box
                        as="span"
                        fontSize="sm"
                        color="blue.500"
                        fontWeight="medium"
                      >
                        30%
                      </Box>
                      <Icon as={InfoIcon} color="blue.500" ml={1} boxSize={3} />
                    </Flex>
                  </Flex>
                </Box>

                {/* Mid Exam Card */}
                <Box 
                  bg="white" 
                  p={6} 
                  borderRadius="md" 
                  flex="1"
                  cursor="pointer" 
                  _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  onClick={handleMidExamClick}
                >
                  <Box mb={3}>
                    <Text color="gray.500" fontSize="sm">
                      Theory
                    </Text>
                    <Heading size="md">Mid Exam</Heading>
                  </Box>

                  <Flex justify="space-between" align="center" mt={8}>
                    <Box>
                      <Text fontSize="xl" fontWeight="bold">
                        1
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Assignment
                      </Text>
                    </Box>

                    <Flex
                      align="center"
                      bg="blue.50"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      <Box
                        as="span"
                        fontSize="sm"
                        color="blue.500"
                        fontWeight="medium"
                      >
                        35%
                      </Box>
                      <Icon as={InfoIcon} color="blue.500" ml={1} boxSize={3} />
                    </Flex>
                  </Flex>
                </Box>

                {/* Final Exam Card */}
                <Box 
                  bg="white" 
                  p={6} 
                  borderRadius="md" 
                  flex="1"
                  cursor="pointer" 
                  _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  onClick={handleFinalExamClick}
                >
                  <Box mb={3}>
                    <Text color="gray.500" fontSize="sm">
                      Theory
                    </Text>
                    <Heading size="md">Final Exam</Heading>
                  </Box>

                  <Flex justify="space-between" align="center" mt={8}>
                    <Box>
                      <Text fontSize="xl" fontWeight="bold">
                        1
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Assignment
                      </Text>
                    </Box>

                    <Flex
                      align="center"
                      bg="blue.50"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      <Box
                        as="span"
                        fontSize="sm"
                        color="blue.500"
                        fontWeight="medium"
                      >
                        35%
                      </Box>
                      <Icon as={InfoIcon} color="blue.500" ml={1} boxSize={3} />
                    </Flex>
                  </Flex>
                </Box>
              </Flex>
            ) : (
              /* Assignment Details View */
              <Box px={6} py={6}>
                <Flex mb={4} align="center">
                  <IconButton
                    icon={<ArrowBackIcon />}
                    aria-label="Back to assessments"
                    variant="ghost"
                    onClick={handleBackToAssessments}
                    mr={2}
                  />
                  <Heading size="md">Theory Assignments</Heading>
                </Flex>

                <Box bg="white" borderRadius="md" overflow="hidden">
                  <Table variant="simple">
                    <Thead bg="gray.50">
                      <Tr>
                        <Th>Assignment</Th>
                        <Th>Due Date</Th>
                        <Th>Status</Th>
                        <Th>Score</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {assignmentDetails.map((detail) => (
                        <Tr 
                          key={detail.id} 
                          _hover={{ bg: "gray.50" }}
                          cursor="pointer"
                          onClick={() => handleAssignmentDetailClick(detail)}
                        >
                          <Td fontWeight="medium">{detail.title}</Td>
                          <Td>
                            <Flex align="center">
                              <Icon as={BsCalendarDate} mr={2} color="gray.500" />
                              {detail.dueDate}
                            </Flex>
                          </Td>
                          <Td>
                            {detail.status === "Graded" && (
                              <Badge colorScheme="green" variant="subtle" px={2} py={1}>
                                <Flex align="center">
                                  <CheckCircleIcon mr={1} />
                                  Graded
                                </Flex>
                              </Badge>
                            )}
                            {detail.status === "Submitted" && (
                              <Badge colorScheme="blue" variant="subtle" px={2} py={1}>
                                <Flex align="center">
                                  <CheckCircleIcon mr={1} />
                                  Submitted
                                </Flex>
                              </Badge>
                            )}
                            {detail.status === "Not Submitted" && (
                              <Badge colorScheme="orange" variant="subtle" px={2} py={1}>
                                <Flex align="center">
                                  <Icon as={BsClockHistory} mr={1} />
                                  Not Submitted
                                </Flex>
                              </Badge>
                            )}
                          </Td>
                          <Td>
                            {detail.score !== undefined ? (
                              <Text fontWeight="medium">
                                {detail.score}/{detail.totalPoints}
                              </Text>
                            ) : (
                              <Text color="gray.500">-</Text>
                            )}
                          </Td>
                          <Td>
                            <Button size="sm" variant="outline" colorScheme="blue" rightIcon={<Icon as={InfoIcon} />}>
                              View
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>

      {/* Assignment Detail Modal */}
      <Modal isOpen={isAssignmentDetailsOpen} onClose={() => setIsAssignmentDetailsOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedAssignmentDetail?.title || "Assignment Details"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedAssignmentDetail && (
              <VStack align="stretch" spacing={4}>
                {/* Status and Score */}
                <Flex justify="space-between" align="center">
                  <Badge colorScheme={
                    selectedAssignmentDetail && selectedAssignmentDetail.status === "Graded" ? "green" : 
                    selectedAssignmentDetail && selectedAssignmentDetail.status === "Submitted" ? "blue" : "orange"
                  } px={2} py={1} fontSize="sm">
                    {selectedAssignmentDetail?.status || "Not Submitted"}
                  </Badge>
                  {selectedAssignmentDetail.score !== undefined && (
                    <Text fontWeight="medium">
                      Score: <Text as="span" color="green.500" fontWeight="bold">{selectedAssignmentDetail.score}/{selectedAssignmentDetail.totalPoints}</Text>
                    </Text>
                  )}
                </Flex>

                {/* Due Date */}
                <Box>
                  <Text color="gray.500" fontSize="sm">Due Date</Text>
                  <Flex align="center">
                    <Icon as={BsCalendarDate} mr={2} color="gray.600" />
                    <Text fontWeight="medium">{selectedAssignmentDetail?.dueDate || "N/A"}</Text>
                  </Flex>
                </Box>

                {/* Description */}
                <Box>
                  <Text color="gray.500" fontSize="sm">Description</Text>
                  <Text mt={1}>{selectedAssignmentDetail?.description || "No description available"}</Text>
                </Box>

                <Divider />

                {/* Attached Files */}
                <Box>
                  <Text color="gray.500" fontSize="sm" mb={2}>Attached Files</Text>
                  {selectedAssignmentDetail.files?.map(file => (
                    <Flex 
                      key={file.id}
                      p={3}
                      bg="gray.50"
                      borderRadius="md"
                      align="center"
                      justify="space-between"
                      mb={2}
                    >
                      <Flex align="center">
                        <Icon as={BsFileEarmarkText} mr={3} />
                        <Box>
                          <Text fontWeight="medium">{file.name}</Text>
                          <Text fontSize="xs" color="gray.500">{file.type} • {file.size}</Text>
                        </Box>
                      </Flex>
                      <IconButton
                        icon={<DownloadIcon />}
                        aria-label="Download file"
                        variant="ghost"
                        size="sm"
                      />
                    </Flex>
                  ))}
                </Box>

                <Divider />

                {/* Submission Section */}
                {selectedAssignmentDetail && selectedAssignmentDetail.status !== "Graded" && (
                  <Box>
                    <Text fontWeight="medium" mb={2}>Your Submission</Text>
                    {selectedAssignmentDetail && selectedAssignmentDetail.status === "Submitted" ? (
                      <Alert status="success" borderRadius="md">
                        <AlertIcon />
                        Submitted successfully on April 15, 2025 at 2:45 PM
                      </Alert>
                    ) : (
                      <FormControl>
                        <FormLabel>Upload your file</FormLabel>
                        <Input type="file" p={1} />
                      </FormControl>
                    )}
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setIsAssignmentDetailsOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Mid Exam Modal */}
      <Modal isOpen={isMidExamModalOpen} onClose={onMidExamModalClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mid Exam Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                <Box>
                  <Text fontWeight="bold">Exam Completed</Text>
                  <Text fontSize="sm">Submitted on April 10, 2025</Text>
                </Box>
              </Alert>
              
              <Box bg="gray.50" p={4} borderRadius="md">
                <Text color="gray.600" fontSize="sm" mb={1}>Exam Score</Text>
                <Text fontSize="3xl" fontWeight="bold" color="green.500">85/100</Text>
              </Box>
              
              <Box>
                <Text fontWeight="medium" mb={2}>Grade Breakdown</Text>
                <VStack spacing={2} align="stretch">
                  <Flex justify="space-between">
                    <Text>Multiple Choice Questions</Text>
                    <Text fontWeight="medium">42/50</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text>Essay Questions</Text>
                    <Text fontWeight="medium">43/50</Text>
                  </Flex>
                </VStack>
              </Box>
              
              <Box>
                <Text fontWeight="medium" mb={2}>Instructor Feedback</Text>
                <Box p={3} borderLeft="4px solid" borderColor="blue.400" bg="blue.50">
                  <Text fontSize="sm">
                    Good understanding of core concepts. Your analysis of risk mitigation strategies was particularly strong. 
                    Work on providing more specific examples in your essay responses.
                  </Text>
                </Box>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>View Full Exam</Button>
            <Button onClick={onMidExamModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Final Exam Modal */}
      <Modal isOpen={isFinalExamModalOpen} onClose={onFinalExamModalClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Final Exam Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Box>
                  <Text fontWeight="bold">Exam Due Soon</Text>
                  <Text fontSize="sm">Due on June 10, 2025</Text>
                </Box>
              </Alert>
              
              <Box bg="gray.50" p={4} borderRadius="md">
                <Text color="gray.600" fontSize="sm" mb={1}>Exam Weight</Text>
                <Text fontSize="xl" fontWeight="bold" color="blue.500">35% of Final Grade</Text>
              </Box>
              
              <Box>
                <Text fontWeight="medium" mb={2}>Exam Instructions</Text>
                <Text fontSize="sm">
                  Please complete the Final Exam for IT Service & Risk Management. Download the exam paper, 
                  complete all required sections, and upload your completed file below. 
                  Make sure to include your name and student ID in the document.
                </Text>
              </Box>
              
              <Flex 
                p={3}
                bg="gray.50"
                borderRadius="md"
                align="center"
                justify="space-between"
                mb={2}
              >
                <Flex align="center">
                  <Icon as={BsFileEarmarkText} mr={3} />
                  <Box>
                    <Text fontWeight="medium">Final_Exam_ITSRM_2025.pdf</Text>
                    <Text fontSize="xs" color="gray.500">PDF • 1.8 MB</Text>
                  </Box>
                </Flex>
                <IconButton
                  icon={<DownloadIcon />}
                  aria-label="Download file"
                  variant="ghost"
                  size="sm"
                />
              </Flex>
              
              <FormControl>
                <FormLabel>Upload your completed exam</FormLabel>
                <Input type="file" p={1} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFileUpload}>
              Submit Exam
            </Button>
            <Button onClick={onFinalExamModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Upload Modal */}
      <Modal isOpen={isFileUploadSuccess} onClose={onFileUploadSuccessClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={6}>
            <VStack spacing={4}>
              <Box 
                bg="green.100" 
                color="green.600" 
                p={3} 
                borderRadius="full"
                boxSize="16"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="5xl"
              >
                <CheckCircleIcon boxSize={10} />
              </Box>
              <Heading size="md">Exam Submitted Successfully!</Heading>
              <Text align="center" color="gray.600">
                Your final exam has been uploaded and submitted. You will receive your grade once it has been reviewed.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="blue" onClick={onFileUploadSuccessClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Assessment;