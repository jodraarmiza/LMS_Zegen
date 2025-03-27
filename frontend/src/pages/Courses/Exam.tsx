import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  Tab,
  Avatar,
  Progress,
  HStack,
  IconButton,
  VStack,
  Badge,
  Divider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ArrowBackIcon,
  InfoIcon,
  CalendarIcon,
  TimeIcon,
  WarningIcon,
  LockIcon
} from '@chakra-ui/icons';
import {
  BsLightningCharge,
  BsFillJournalBookmarkFill,
  BsPersonWorkspace,
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

interface ExamDetails {
  id: string;
  title: string;
  description: string;
  duration: string;
  questionsCount: number;
  availableFrom: string;
  availableTo: string;
  status: 'Not Started' | 'Completed' | 'Expired' | 'Upcoming' | 'In Progress';
  score?: number;
  attempts: number;
  maxAttempts: number;
  examType: 'Quiz' | 'Midterm' | 'Final' | 'Practice';
  passingScore: number;
  randomizeQuestions: boolean;
  instructor: {
    name: string;
    avatarUrl: string;
  };
  prerequisites?: string[];
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
    overdue: number;
    failed: number;
    notStarted: number;
  };
}

const IconPersonWorkspace = BsPersonWorkspace as React.FC;
const IconLightning = BsLightningCharge as React.FC;
const IconFillJournalBookmark = BsFillJournalBookmarkFill as React.FC;
const IconBulb = HiOutlineLightBulb as React.FC;
const Exam: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [activeTab, setActiveTab] = useState(4); // Exam tab (index 4)
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamDetails | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  
  // Mock data for the course
  const course: Course = {
    id: '1',
    code: 'LB2123',
    title: 'IT Service & Risk Management',
    category: 'IT',
    instructors: [
      {
        id: '101',
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ'
      },
      {
        id: '102',
        name: 'Alan Russ',
        avatarUrl: 'https://placehold.co/32x32?text=AR'
      }
    ],
    distribution: {
      passed: 20,
      inProgress: 15,
      overdue: 5,
      failed: 10,
      notStarted: 30
    }
  };
  
  // Mock exams data
  const exams: ExamDetails[] = [
    {
      id: '1',
      title: 'IT Service Management Basic Concepts',
      description: 'This exam tests your understanding of the basic concepts of IT Service Management, including ITIL, COBIT, and ISO 20000 frameworks.',
      duration: '45 minutes',
      questionsCount: 25,
      availableFrom: 'March 10, 2025, 08:00',
      availableTo: 'March 25, 2025, 23:59',
      status: 'Not Started',
      attempts: 0,
      maxAttempts: 2,
      examType: 'Quiz',
      passingScore: 70,
      randomizeQuestions: true,
      instructor: {
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ'
      }
    },
    {
      id: '2',
      title: 'Risk Management Midterm Exam',
      description: 'Comprehensive assessment covering risk management concepts, methodologies, and best practices discussed in the first half of the course.',
      duration: '90 minutes',
      questionsCount: 40,
      availableFrom: 'March 15, 2025, 09:00',
      availableTo: 'March 15, 2025, 18:00',
      status: 'Completed',
      score: 85,
      attempts: 1,
      maxAttempts: 1,
      examType: 'Midterm',
      passingScore: 65,
      randomizeQuestions: true,
      instructor: {
        name: 'Alan Russ',
        avatarUrl: 'https://placehold.co/32x32?text=AR'
      }
    },
    {
      id: '3',
      title: 'ITIL Framework Practice Quiz',
      description: 'Practice quiz to help you prepare for the final exam. Covers ITIL framework concepts and implementation strategies.',
      duration: '30 minutes',
      questionsCount: 15,
      availableFrom: 'March 5, 2025, 00:00',
      availableTo: 'April 5, 2025, 23:59',
      status: 'Completed',
      score: 73,
      attempts: 2,
      maxAttempts: 3,
      examType: 'Practice',
      passingScore: 60,
      randomizeQuestions: true,
      instructor: {
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ'
      }
    },
    {
      id: '4',
      title: 'IT Service & Risk Management Final Exam',
      description: 'Final comprehensive assessment covering all aspects of IT Service Management and Risk Management discussed throughout the course.',
      duration: '120 minutes',
      questionsCount: 60,
      availableFrom: 'April 20, 2025, 09:00',
      availableTo: 'April 20, 2025, 12:00',
      status: 'Upcoming',
      attempts: 0,
      maxAttempts: 1,
      examType: 'Final',
      passingScore: 70,
      randomizeQuestions: true,
      instructor: {
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ'
      },
      prerequisites: ['Complete all quizzes', 'Submit all assignments', 'Attend at least 80% of sessions']
    }
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
  
  // Exam-related functions
  const handleOpenStartDialog = (exam: ExamDetails) => {
    setSelectedExam(exam);
    setIsStartDialogOpen(true);
  };

  const handleStartExam = () => {
    setIsStartDialogOpen(false);
    // In a real app, this would navigate to the exam taking page
    toast({
      title: "Exam started",
      description: "You have started the exam. Good luck!",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const getStatusBadge = (status: string, score?: number, passingScore?: number) => {
    switch (status) {
      case 'Completed':
        if (score !== undefined && passingScore !== undefined) {
          return (
            <Badge colorScheme={score >= passingScore ? "green" : "red"} borderRadius="full">
              {score >= passingScore ? "Passed" : "Failed"} ({score}%)
            </Badge>
          );
        }
        return <Badge colorScheme="green" borderRadius="full">Completed</Badge>;
      case 'Not Started':
        return <Badge colorScheme="blue" borderRadius="full">Not Started</Badge>;
      case 'In Progress':
        return <Badge colorScheme="orange" borderRadius="full">In Progress</Badge>;
      case 'Expired':
        return <Badge colorScheme="red" borderRadius="full">Expired</Badge>;
      case 'Upcoming':
        return <Badge colorScheme="purple" borderRadius="full">Upcoming</Badge>;
      default:
        return <Badge borderRadius="full">{status}</Badge>;
    }
  };

  const getExamTypeColor = (examType: string) => {
    switch (examType) {
      case 'Quiz':
        return "blue";
      case 'Midterm':
        return "purple";
      case 'Final':
        return "red";
      case 'Practice':
        return "green";
      default:
        return "gray";
    }
  };

  const getActionButton = (exam: ExamDetails) => {
    switch (exam.status) {
      case 'Not Started':
        return (
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => handleOpenStartDialog(exam)}
          >
            Start Exam
          </Button>
        );
      case 'Completed':
        return (
          <Button
            colorScheme="gray"
            variant="outline"
            size="sm"
            onClick={() => toast({
              title: "Exam Results",
              description: `You scored ${exam.score}% on this exam.`,
              status: "info",
              duration: 3000,
              isClosable: true,
            })}
          >
            View Results
          </Button>
        );
      case 'In Progress':
        return (
          <Button
            colorScheme="orange"
            size="sm"
            onClick={() => toast({
              title: "Continue Exam",
              description: "Continuing your in-progress exam.",
              status: "info",
              duration: 3000,
              isClosable: true,
            })}
          >
            Continue Exam
          </Button>
        );
      case 'Upcoming':
        return (
          <Button
            isDisabled
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            Not Available Yet
          </Button>
        );
      case 'Expired':
        return (
          <Button
            isDisabled
            colorScheme="red"
            variant="outline"
            size="sm"
          >
            Expired
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Box bg="gray.50" w="full" overflowX="hidden">
      {/* Main layout */}
      <Flex maxH="calc(100vh - 57px)" w="full">
        {/* Content wrapper - takes full width */}
        <Box flex="1" position="relative" overflowY="auto" overflowX="hidden">
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
                      <IconFillJournalBookmark />
                    </Box>
                    <Text fontWeight="medium" mr={4}>
                      Course
                    </Text>
                    <Box fontSize="20px" color="gray" marginRight={1}>
                      <IconLightning />
                    </Box>
                    <Text color="gray.500" marginRight={5}>
                      {course.code}
                    </Text>
                    <Box fontSize="20px" color="gray" marginRight={1}>
                      <IconBulb />
                    </Box>
                    <Text color="gray.500">{course.code}</Text>
                  </Flex>

                  <Heading as="h1" size="lg" mt={2} mb={3}>
                    {course.title}
                  </Heading>

                  {/* Instructors */}
                  <Flex align="center" mb={3}>
                    <Box fontSize="18px" color="gray" mr={4}>
                      <IconPersonWorkspace />
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
                      20%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      15%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      5%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      10%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      30%
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
                        width={`${course.distribution.overdue}%`}
                        bg="red.500"
                      />
                      <Box
                        width={`${course.distribution.failed}%`}
                        bg="yellow.400"
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
                      <Text>Overdue</Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Box
                        as="span"
                        w="2"
                        h="2"
                        borderRadius="full"
                        bg="yellow.400"
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
                      <Text>Not Started</Text>
                    </Flex>
                  </Flex>
                </Box>
              </Flex> 
              
              {/* Tabs for course navigation */}
              <Box borderBottomWidth="1px" borderBottomColor="gray.200">
                <Tabs index={activeTab} onChange={handleTabChange} variant="unstyled">
                  <TabList>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📄</Box>
                      </Box>
                      Session
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📘</Box>
                      </Box>
                      Syllabus
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">💬</Box>
                      </Box>
                      Forum
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📝</Box>
                      </Box>
                      Assessment
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📝</Box>
                      </Box>
                      Exam
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📊</Box>
                      </Box>
                      Gradebook
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📋</Box>
                      </Box>
                      Assessment Rubric
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">👥</Box>
                      </Box>
                      People
                    </Tab>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">📅</Box>
                      </Box>
                      Attendance
                    </Tab>
                  </TabList>
                </Tabs>
              </Box>
            </Box>
          </Box>
          
          {/* Exam Content */}
          <Box p={6}>
            <Heading size="md" mb={4}>Exams & Quizzes</Heading>
            
            {/* Exams List */}
            <VStack spacing={4} align="stretch">
              {exams.map((exam) => (
                <Box
                  key={exam.id}
                  bg="white"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="gray.200"
                  p={5}
                  shadow="sm"
                >
                  <Flex justifyContent="space-between" alignItems="center" mb={3}>
                    <HStack>
                      <Badge colorScheme={getExamTypeColor(exam.examType)} variant="solid">
                        {exam.examType}
                      </Badge>
                      {getStatusBadge(exam.status, exam.score, exam.passingScore)}
                    </HStack>
                    <HStack>
                      <Text fontSize="sm" color="gray.500">
                        {exam.attempts}/{exam.maxAttempts} attempts
                      </Text>
                    </HStack>
                  </Flex>

                  <Heading size="md" mb={2}>
                    {exam.title}
                  </Heading>

                  <Text color="gray.600" mb={4}>
                    {exam.description}
                  </Text>

                  <Divider mb={4} />

                  <VStack align="stretch" spacing={3} mb={4}>
                    <HStack>
                      <InfoIcon color="blue.500" />
                      <Text fontSize="sm">{exam.questionsCount} questions • {exam.duration}</Text>
                    </HStack>
                    <HStack>
                      <CalendarIcon color="blue.500" />
                      <Text fontSize="sm">Available from: {exam.availableFrom}</Text>
                    </HStack>
                    <HStack>
                      <TimeIcon color="blue.500" />
                      <Text fontSize="sm">Available until: {exam.availableTo}</Text>
                    </HStack>
                    <HStack>
                      <Avatar size="xs" src={exam.instructor.avatarUrl} name={exam.instructor.name} />
                      <Text fontSize="sm">Instructor: {exam.instructor.name}</Text>
                    </HStack>
                  </VStack>

                  {exam.prerequisites && (
                    <Box mb={4} p={3} bg="yellow.50" borderRadius="md">
                      <HStack mb={2}>
                        <WarningIcon color="yellow.500" />
                        <Text fontWeight="medium">Prerequisites:</Text>
                      </HStack>
                      <VStack align="start" pl={6}>
                        {exam.prerequisites.map((prereq, index) => (
                          <HStack key={index}>
                            <Text fontSize="sm">•</Text>
                            <Text fontSize="sm">{prereq}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  )}

                  <Flex justifyContent="flex-end">
                    {getActionButton(exam)}
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      </Flex>
      
      {/* Exam Start Dialog */}
      <AlertDialog
        isOpen={isStartDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsStartDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Start Exam
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack align="stretch" spacing={4}>
                <Text>You are about to start "{selectedExam?.title}".</Text>
                <Box bg="blue.50" p={3} borderRadius="md">
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <TimeIcon color="blue.500" />
                      <Text fontSize="sm" fontWeight="medium">Duration: {selectedExam?.duration}</Text>
                    </HStack>
                    <HStack>
                      <InfoIcon color="blue.500" />
                      <Text fontSize="sm">{selectedExam?.questionsCount} questions • {selectedExam?.passingScore}% passing score</Text>
                    </HStack>
                    <HStack>
                      <LockIcon color="blue.500" />
                      <Text fontSize="sm">You cannot pause once started</Text>
                    </HStack>
                  </VStack>
                </Box>
                <Text>Are you ready to begin? The timer will start immediately.</Text>
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsStartDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleStartExam} ml={3}>
                Start Exam
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Exam;