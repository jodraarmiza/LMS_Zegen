import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
  Progress,
  Avatar,
  AvatarGroup,
  Badge,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode,
  useToast
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  CalendarIcon,
  TimeIcon,
  ChevronDownIcon,
  ArrowBackIcon
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

interface SessionItem {
  id: string;
  number: number;
  title: string;
  status: 'Passed' | 'In Progress' | 'Failed' | 'Overdue' | 'Not Started';
}

interface SessionContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
}

interface Session {
  id: string;
  code: string;
  number: number;
  title: string;
  description: string;
  status: 'Passed' | 'In Progress' | 'Failed' | 'Overdue' | 'Not Started';
  date: string;
  time: string;
  duration: string;
  instructor: Instructor;
  secondaryInstructor?: Instructor;
  delivery: 'Online' | 'Offline';
  zoomLink?: string;
  location?: string;
  contents: SessionContent[];
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  sessions: number;
  sessionList: SessionItem[];
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

const CourseSession: React.FC = () => {
  const { courseId, sessionId = '1' } = useParams<{ courseId: string; sessionId?: string }>();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const toast = useToast();
  
  // Current course and session info
  const [course, setCourse] = useState<Course | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  
  // Define colors based on colorMode
  const cardBg = colorMode === 'light' ? 'white' : 'gray.700';
  
  // Mock data for available courses
  const allCourses = [
    { id: "1", code: "LB2123", title: "IT Service & Risk Management" },
    { id: "2", code: "LB2123", title: "Digital Banking" },
    { id: "3", code: "LB2123", title: "User Experience Research & Design" },
    { id: "4", code: "LB2123", title: "Introduction to Database System" },
  ];

  // Mock data for the session
  useEffect(() => {
    // Find the current course based on courseId
    const currentCourseData = allCourses.find(c => c.id === courseId) || allCourses[0];
    
    // In a real app, you would fetch this data from an API
    const mockCourse: Course = {
      id: currentCourseData.id,
      code: currentCourseData.code,
      title: currentCourseData.title,
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
      sessions: 13,
      distribution: {
        passed: 20,
        inProgress: 15,
        overdue: 5,
        failed: 10,
        notStarted: 30
      },
      sessionList: [
        {
          id: '1',
          number: 1,
          title: 'Introduction to IT Service Management (ITSM): Basic concepts, ITSM frameworks (ITIL, COBIT, ISO 20000)',
          status: 'Passed'
        },
        {
          id: '2',
          number: 2,
          title: 'Service Strategy: Principles and processes',
          status: 'Passed'
        },
        {
          id: '3',
          number: 3,
          title: 'Service Design: Key concepts and processes',
          status: 'Passed'
        },
        {
          id: '4',
          number: 4,
          title: 'Service Transition: Change management, asset management',
          status: 'Passed'
        },
        {
          id: '5',
          number: 5,
          title: 'Service Operation: Incident management, problem management',
          status: 'Overdue'
        },
        {
          id: '6',
          number: 6,
          title: 'Continual Service Improvement: Key principles and methods',
          status: 'Failed'
        },
        {
          id: '7',
          number: 7,
          title: 'IT Risk Management Fundamentals',
          status: 'Failed'
        },
        {
          id: '8',
          number: 8,
          title: 'Risk Assessment and Analysis',
          status: 'In Progress'
        },
        {
          id: '9',
          number: 9,
          title: 'Risk Mitigation Strategies',
          status: 'Not Started'
        },
        {
          id: '10',
          number: 10,
          title: 'IT Compliance and Governance',
          status: 'Not Started'
        },
        {
          id: '11',
          number: 11,
          title: 'Information Security Management',
          status: 'Not Started'
        },
        {
          id: '12',
          number: 12,
          title: 'Business Continuity Planning',
          status: 'Not Started'
        },
        {
          id: '13',
          number: 13,
          title: 'Case Studies and Best Practices',
          status: 'Not Started'
        },
      ]
    };
    
    const mockSession: Session = {
      id: '1',
      code: currentCourseData.code,
      number: 1,
      title: 'Introduction to IT Service Management (ITSM)',
      description: 'Basic concepts, ITSM frameworks (ITIL, COBIT, ISO 20000).',
      status: 'Passed',
      date: '11 March 2025',
      time: '07:00 - 09:00',
      duration: '2h',
      instructor: {
        id: '101',
        name: 'Joni Zimbatima',
        avatarUrl: 'https://placehold.co/32x32?text=JZ'
      },
      secondaryInstructor: {
        id: '102',
        name: 'Alan Russ',
        avatarUrl: 'https://placehold.co/32x32?text=AR'
      },
      delivery: 'Online',
      zoomLink: 'https://us05web.zoom.us/j/85360480#?pwd=ZGdFUE0JMHRpSTUyUTllRzVlNML2.JCQTo9',
      contents: [
        {
          id: 'c1',
          title: 'Basic Concepts of ITSM',
          description: 'ITSM (IT Service Management) adalah pendekatan strategis untuk merancang, mengelola, dan meningkatkan layanan TI agar selaras dengan kebutuhan bisnis.',
          duration: '30m',
          status: 'Completed',
          progress: 100
        },
        {
          id: 'c2',
          title: 'ITIL - Framework',
          description: 'ITIL - Framework berbasis praktik terbaik untuk manajemen layanan TI dalam lima tahap: Strategy, Design, Transition, Operation, dan Improvement.',
          duration: '30m',
          status: 'Completed',
          progress: 100
        },
        {
          id: 'c3',
          title: 'COBIT - Framework',
          description: 'COBIT - Framework untuk tata kelola dan manajemen TI, berfokus pada kontrol, risiko, dan kepatuhan.',
          duration: '30m',
          status: 'Completed',
          progress: 100
        },
        {
          id: 'c4',
          title: 'ISO 20000',
          description: 'ISO 20000 - Standar internasional untuk ITSM yang membantu organisasi menerapkan layanan TI yang terstruktur dan efisien.',
          duration: '30m',
          status: 'Completed',
          progress: 100
        }
      ]
    };
    
    // Try to find a session matching the requested sessionId
    const targetSessionItem = mockCourse.sessionList.find(s => s.id === sessionId);
    
    if (targetSessionItem) {
      // If we found a matching session, update the mock session with that data
      mockSession.id = targetSessionItem.id;
      mockSession.number = targetSessionItem.number;
      mockSession.title = targetSessionItem.title.split(':')[0]; // Just use the first part of the title
      mockSession.status = targetSessionItem.status;
    }
    
    setCourse(mockCourse);
    setSession(mockSession);
    
    // Initialize active tab based on URL
    const path = window.location.pathname;
    if (path.includes('/syllabus')) {
      setActiveTab(1);
    } else if (path.includes('/forum')) {
      setActiveTab(2);
    } else if (path.includes('/assessment')) {
      setActiveTab(3);
    } else if (path.includes('/exam')) {
      setActiveTab(4);
    } else if (path.includes('/gradebook')) {
      setActiveTab(5);
    } else if (path.includes('/rubric')) {
      setActiveTab(6);
    } else if (path.includes('/people')) {
      setActiveTab(7);
    } else if (path.includes('/attendance')) {
      setActiveTab(8);
    } else {
      // Default to Session tab
      setActiveTab(0);
    }
  }, [courseId, sessionId]);
  
  // Navigate to different sessions
  const navigateToSession = (sessionNumber: number) => {
    if (!course) return;
    const targetSession = course.sessionList.find(s => s.number === sessionNumber);
    if (targetSession) {
      navigate(`/course/${courseId}/session/${targetSession.id}`);
    }
  };
  
  // Navigate to content section
  const navigateToContent = (index: number) => {
    if (!session || index < 0 || index >= session.contents.length) return;
    setCurrentContentIndex(index);
  };
  
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
        navigate(`/course/${courseId}/session/${sessionId}`);
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
  
  if (!course || !session) {
    return (
      <Box p={6}>
        <Text>Loading session information...</Text>
      </Box>
    );
  }
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed':
      case 'Completed': return 'green';
      case 'In Progress': return 'blue';
      case 'Overdue': return 'red';
      case 'Failed': return 'yellow';
      default: return 'gray';
    }
  };
  
  // Get status icon (filled circle or empty circle)
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Passed':
      case 'In Progress': 
      case 'Failed':
      case 'Overdue': 
        return "●";
      default: 
        return "○";
    }
  };
  
  return (
    <Box bg="gray.50" w="full" overflowX="hidden" overflowY="hidden">
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
                  <Text as="span" fontWeight="medium" color={'gray.900'}>
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
                  
                  <TabPanels>
                    {/* Session Tab Panel */}
                    <TabPanel padding={0}>
                      <Flex overflowY="hidden">
                        {/* Session details - left side */}
                        <Box flex="1" p={6} borderRightWidth="1px" borderRightColor="gray.200" overflowY="auto" maxH="calc(100vh - 370px)">
                          {/* Session header */}
                          <Flex alignItems="center" mb={2}>
                            <Badge 
                              colorScheme={getStatusColor(session.status)} 
                              borderRadius="full" 
                              px={2} 
                              py={0.5}
                              mr={2}
                            >
                              {session.status}
                            </Badge>
                            <IconButton
                              aria-label="Expand description"
                              icon={<ChevronDownIcon />}
                              size="sm"
                              variant="ghost"
                              ml="auto"
                            />
                          </Flex>
                          
                          <Heading as="h2" size="md" mb={4}>
                            Session {session.number}
                          </Heading>
                          
                          <Heading as="h3" size="md" fontWeight="medium" mb={4}>
                            {session.title}: {session.description}
                          </Heading>
                          
                          {/* Description section */}
                          <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>Description</Text>
                            <Text mb={2}>Basic Concepts of ITSM</Text>
                            <Text mb={2}>ITSM (IT Service Management) adalah pendekatan strategis untuk merancang, mengelola, dan meningkatkan layanan TI agar selaras dengan kebutuhan bisnis.</Text>
                            <Text fontWeight="medium" mt={4} mb={2}>ITIL Framework:</Text>
                            <Box pl={4}>
                              <Text mb={1}>• ITIL - Framework berbasis praktik terbaik untuk manajemen layanan TI dalam lima tahap: Strategy, Design, Transition, Operation, dan Improvement.</Text>
                            </Box>
                            <Text fontWeight="medium" mt={4} mb={2}>COBIT Framework:</Text>
                            <Box pl={4}>
                              <Text mb={1}>• COBIT - Framework untuk tata kelola dan manajemen TI, berfokus pada kontrol, risiko, dan kepatuhan.</Text>
                            </Box>
                            <Text fontWeight="medium" mt={4} mb={2}>ISO 20000:</Text>
                            <Box pl={4}>
                              <Text mb={1}>• ISO 20000 - Standar internasional untuk ITSM yang membantu organisasi menerapkan layanan TI yang terstruktur dan efisien.</Text>
                            </Box>
                          </Box>
                          
                          {/* Time & Date */}
                          <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>Time & Date</Text>
                            <Flex alignItems="center" mb={1}>
                              <CalendarIcon mr={2} color="blue.500" />
                              <Text>{session.date}</Text>
                            </Flex>
                            <Flex alignItems="center">
                              <TimeIcon mr={2} color="blue.500" />
                              <Text>{session.time}</Text>
                            </Flex>
                          </Box>
                          
                          {/* Facilitator */}
                          <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>Facilitator</Text>
                            <Flex alignItems="center">
                              <Avatar size="sm" name={session.instructor.name} src={session.instructor.avatarUrl} mr={2} />
                              <Text>{session.instructor.name}</Text>
                              {session.secondaryInstructor && (
                                <Badge ml={2} colorScheme="green">+1</Badge>
                              )}
                            </Flex>
                          </Box>{/* Delivery Mode */}
                          <Box mb={6}>
                            <Text fontWeight="medium" mb={2}>Delivery Mode</Text>
                            <Text mb={2}>{session.delivery}</Text>
                            {session.delivery === 'Online' && session.zoomLink && (
                              <Button 
                                as="a" 
                                href={session.zoomLink}
                                target="_blank"
                                size="sm"
                                colorScheme="blue"
                                variant="outline"
                              >
                                {session.zoomLink}
                              </Button>
                            )}
                          </Box>
                        </Box>
                        
                        {/* Session list - right side - UPDATED TO MATCH SCREENSHOTS */}
                        <Box w="300px" bg="white" p={4} overflowY="auto" maxH="calc(100vh - 370px)" borderLeftWidth="1px" borderLeftColor="gray.200">
                          <Flex justifyContent="space-between" alignItems="center" mb={4} pb={2} borderBottomWidth="1px" borderBottomColor="gray.200">
                            <Text fontWeight="medium" fontSize="md">Session List</Text>
                            <Badge borderRadius="full" px={2} py={1} bg="gray.200" color="gray.700">
                              {course.sessions}
                            </Badge>
                          </Flex>
                          
                          <VStack spacing={0} align="stretch">
                            {course.sessionList.map((sessionItem) => (
                              <Box
                                key={sessionItem.id}
                                bg={sessionItem.id === sessionId ? 'gray.100' : 'transparent'}
                                borderRadius="md"
                                mb={1}
                                onClick={() => navigateToSession(sessionItem.number)}
                                cursor="pointer"
                                _hover={{ bg: 'gray.50' }}
                              >
                                <Flex 
                                  py={3}
                                  px={4}
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Text 
                                    fontWeight={sessionItem.id === sessionId ? "semibold" : "normal"}
                                    color={sessionItem.id === sessionId ? "gray.900" : "gray.500"}
                                  >
                                    Session {sessionItem.number}
                                  </Text>
                                  <Flex align="center">
                                    <Box 
                                      as="span" 
                                      h={2} 
                                      w={2} 
                                      borderRadius="full" 
                                      bg={getStatusColor(sessionItem.status) + '.500'} 
                                      mr={2}
                                    />
                                    <Text fontSize="sm" color={getStatusColor(sessionItem.status) + '.600'}>
                                      {sessionItem.status}
                                    </Text>
                                  </Flex>
                                </Flex>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      </Flex>
                    </TabPanel>
                    
                    {/* Syllabus Tab Panel */}
                    <TabPanel>
                      <Box p={6}>
                        <Heading size="md" mb={4}>Syllabus Content</Heading>
                        <Text>Syllabus content will be displayed here.</Text>
                      </Box>
                    </TabPanel>
                    
                    {/* Forum Tab Panel */}
                    <TabPanel>
                      <Box p={6}>
                        <Heading size="md" mb={4}>Forum Content</Heading>
                        <Text>Forum content will be displayed here.</Text>
                      </Box>
                    </TabPanel>
                    
                    {/* Assessment Tab Panel */}
                    <TabPanel>
                      <Box p={6}>
                        <Heading size="md" mb={4}>Assessment Content</Heading>
                        <Text>Assessment content will be displayed here.</Text>
                      </Box>
                    </TabPanel>
                    
                    {/* Exam Tab Panel - This should load the separate Exam component */}
                    <TabPanel>
                      <Box p={6}>
                        <Heading size="md" mb={4}>Exam Content</Heading>
                        <Text>This tab will load the Exam component.</Text>
                      </Box>
                    </TabPanel>
                    
                    {/* Gradebook Tab Panel */}
                    <TabPanel>
                      <Box p={6}>
                        <Heading size="md" mb={4}>Gradebook Content</Heading>
                        <Text>Gradebook content will be displayed here.</Text>
                      </Box>
                    </TabPanel>
                    
                    {/* Assessment Rubric Tab Panel */}
                    <TabPanel>
                      <Box p={6}>
                        <Heading size="md" mb={4}>Assessment Rubric Content</Heading>
                        <Text>Assessment rubric content will be displayed here.</Text>
                      </Box>
                    </TabPanel>
                    
                    {/* People Tab Panel */}
                    <TabPanel>
                      <Box p={6}>
                        <Heading size="md" mb={4}>People Content</Heading>
                        <Text>People content will be displayed here.</Text>
                      </Box>
                    </TabPanel>
                    
                    {/* Attendance Tab Panel */}
                    <TabPanel>
                      <Box p={6}>
                        <Heading size="md" mb={4}>Attendance Content</Heading>
                        <Text>Attendance content will be displayed here.</Text>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CourseSession;