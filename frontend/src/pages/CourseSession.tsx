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
  Badge,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorMode,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  CalendarIcon,
  TimeIcon,
  ChevronDownIcon,
  ArrowBackIcon
} from '@chakra-ui/icons';

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

const CourseSession: React.FC = () => {
  const { courseId, sessionId = '1' } = useParams<{ courseId: string; sessionId?: string }>();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  
  // Current course and session info
  const [course, setCourse] = useState<Course | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  
  // Define colors based on colorMode
  const cardBg = colorMode === 'light' ? 'white' : 'gray.700';
  
  // Mock data for the session
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const mockCourse: Course = {
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
      code: 'LB2123',
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
    navigate(`/course/${courseId}`);
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
      case 4: // Gradebook tab
        navigate(`/course/${courseId}/gradebook`);
        break;
      case 5: // Assessment Rubric tab
        navigate(`/course/${courseId}/rubric`);
        break;
      case 6: // People tab
        navigate(`/course/${courseId}/people`);
        break;
      case 7: // Attendance tab
        navigate(`/course/${courseId}/attendance`);
        break;
      default:
        navigate(`/course/${courseId}/session/1`);
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
            <Box px={6} py={2}>
              <Breadcrumb separator={<ChevronRightIcon color="gray.500" />} fontSize="sm">
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to="/courses">Course</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to={`/courses`}>IT Service & Risk Management</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            
            {/* Back button */}
            <Box px={6} py={2}>
              <Button 
                variant="ghost" 
                size="sm" 
                leftIcon={<ArrowBackIcon />} 
                onClick={handleBackToCourse}
              >
                IT Service & Risk Management
              </Button>
            </Box>
            
            {/* Course title and code */}
            <Box px={6} py={2}>
              <Flex alignItems="center">
                <Box 
                  bg="blue.500" 
                  color="white" 
                  borderRadius="md" 
                  p={2} 
                  fontSize="sm" 
                  fontWeight="bold"
                  mr={2}
                >
                  C
                </Box>
                <Text fontWeight="medium" mr={2}>Course</Text>
                <Text color="gray.500">{course.code}</Text>
              </Flex>
              <Heading as="h1" size="lg" mt={2} mb={3}>
                IT Service & Risk Management
              </Heading>

              {/* Instructors */}
              <Flex align="center" mb={3}>
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
              
              {/* Session progress bar */}
              <Box position="relative" mb={1}>
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
                  <Box width={`${course.distribution.passed}%`} bg="green.600" borderLeftRadius="full" />
                  <Box width={`${course.distribution.inProgress}%`} bg="blue.500" />
                  <Box width={`${course.distribution.overdue}%`} bg="red.500" />
                  <Box width={`${course.distribution.failed}%`} bg="yellow.400" />
                  <Box width={`${course.distribution.notStarted}%`} bg="gray.400" borderRightRadius="full" />
                </Flex>
              </Box>
              
              {/* Legend */}
              <Flex
                justifyContent="flex-start"
                fontSize="xs"
                color="gray.600"
                mb={2}
                flexWrap="wrap"
              >
                <HStack mr={4} mb={1}>
                  <Box w="2" h="2" bg="green.600" borderRadius="full" />
                  <Text>Passed</Text>
                </HStack>
                <HStack mr={4} mb={1}>
                  <Box w="2" h="2" bg="blue.500" borderRadius="full" />
                  <Text>In Progress</Text>
                </HStack>
                <HStack mr={4} mb={1}>
                  <Box w="2" h="2" bg="red.500" borderRadius="full" />
                  <Text>Overdue</Text>
                </HStack>
                <HStack mr={4} mb={1}>
                  <Box w="2" h="2" bg="yellow.400" borderRadius="full" />
                  <Text>Failed</Text>
                </HStack>
                <HStack mb={1}>
                  <Box w="2" h="2" bg="gray.400" borderRadius="full" />
                  <Text>Not Started</Text>
                </HStack>
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
          
          {/* Session content and list - flex layout */}
          {activeTab === 0 && (
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
                </Box>
                
                {/* Delivery Mode */}
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
              
              {/* Session list - right side */}
              <Box w="350px" bg={cardBg} p={4} overflowY="auto" maxH="calc(100vh - 370px)">
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Text fontWeight="medium">Session List</Text>
                  <Badge borderRadius="full" px={2} bg="gray.200">{course.sessions}</Badge>
                </Flex>
                
                <VStack spacing={2} align="stretch">
                  {course.sessionList.map((sessionItem) => (
                    <Flex
                      key={sessionItem.id}
                      py={2}
                      px={3}
                      alignItems="center"
                      borderRadius="md"
                      cursor="pointer"
                      bg={sessionItem.id === sessionId ? 'gray.100' : 'transparent'}
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => navigateToSession(sessionItem.number)}
                    >
                      <Box mr={2}>
                        <Text fontWeight={sessionItem.id === sessionId ? "medium" : "normal"}>
                          Session {sessionItem.number}
                        </Text>
                      </Box>
                      <Text 
                        color={getStatusColor(sessionItem.status)} 
                        ml="auto" 
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {getStatusIcon(sessionItem.status)}
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CourseSession;