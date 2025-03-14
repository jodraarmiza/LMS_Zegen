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
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
  useColorMode,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ArrowBackIcon,
  CheckCircleIcon,
  CalendarIcon,
  TimeIcon
} from '@chakra-ui/icons';

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface AttendanceSession {
  id: string;
  number: number;
  title: string;
  date: string;
  time: string;
  mode: 'Online' | 'Onsite F2F';
  attended: boolean;
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  instructors: Instructor[];
  attendanceStats: {
    completedPercentage: number;
    totalSessions: number;
    totalAttendance: number;
    minimalAttendance: number;
  };
  sessions: AttendanceSession[];
  distribution: {
    passed: number;
    inProgress: number;
    overdue: number;
    failed: number;
    notStarted: number;
  };
}

const CourseAttendance: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  
  // Current course info
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState(7); // Attendance tab (8th tab, index 7)
  
  // Define colors based on colorMode
  const cardBg = colorMode === 'light' ? 'white' : 'gray.700';
  
  // Mock data for the course and attendance
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
      attendanceStats: {
        completedPercentage: 90,
        totalSessions: 13,
        totalAttendance: 11,
        minimalAttendance: 11
      },
      distribution: {
        passed: 20,
        inProgress: 15,
        overdue: 5,
        failed: 10,
        notStarted: 30
      },
      sessions: [
        {
          id: '1',
          number: 1,
          title: 'Introduction to AIS',
          date: '11 March 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Online',
          attended: true
        },
        {
          id: '2',
          number: 2,
          title: 'Foundational Concepts of the AIS',
          date: '18 March 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Onsite F2F',
          attended: true
        },
        {
          id: '3',
          number: 3,
          title: 'Fraud, Ethics, and Internal Control',
          date: '25 March 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Onsite F2F',
          attended: true
        },
        {
          id: '4',
          number: 4,
          title: 'Database Management and Modeling',
          date: '1 April 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Online',
          attended: true
        },
        {
          id: '5',
          number: 5,
          title: 'Data Analytics in Accounting',
          date: '8 April 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Onsite F2F',
          attended: true
        },
        {
          id: '6',
          number: 6,
          title: 'Enterprise Resource Planning (ERP)',
          date: '15 April 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Online',
          attended: true
        },
        {
          id: '7',
          number: 7,
          title: 'Business Intelligence and Reporting',
          date: '22 April 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Onsite F2F',
          attended: true
        },
        {
          id: '8',
          number: 8,
          title: 'Cybersecurity in Accounting',
          date: '29 April 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Online',
          attended: true
        },
        {
          id: '9',
          number: 9,
          title: 'Cloud Accounting and Remote Access',
          date: '6 May 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Onsite F2F',
          attended: true
        },
        {
          id: '10',
          number: 10,
          title: 'Blockchain Technology in Accounting',
          date: '13 May 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Online',
          attended: true
        },
        {
          id: '11',
          number: 11,
          title: 'Big Data and Accounting',
          date: '20 May 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Onsite F2F',
          attended: true
        },
        {
          id: '12',
          number: 12,
          title: 'Artificial Intelligence in Accounting',
          date: '27 May 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Online',
          attended: false
        },
        {
          id: '13',
          number: 13,
          title: 'Future Trends in AIS',
          date: '3 June 2025',
          time: '07:00 A.M - 09:00 A.M',
          mode: 'Onsite F2F',
          attended: false
        }
      ]
    };
    
    setCourse(mockCourse);
  }, [courseId]);
  
  // Go back to course session page
  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };
  
  // Navigate to session
  const navigateToSession = (sessionId: string) => {
    navigate(`/course/${courseId}/session/${sessionId}`);
  };
  
  if (!course) {
    return (
      <Box p={6}>
        <Text>Loading course information...</Text>
      </Box>
    );
  }
  
  return (
    <Box bg="gray.50" w="full" overflowX="hidden">
      {/* Main layout */}
      <Flex maxH="calc(100vh - 57px)" w="full">
        {/* Content wrapper - takes full width */}
        <Box flex="1" position="relative" overflowY="auto" overflowX="hidden">
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
                {course.instructors.map((instructor, index) => (
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
              
              {/* Tabs for session navigation */}
              <Box borderBottomWidth="1px" borderBottomColor="gray.200">
                <Tabs index={activeTab} onChange={setActiveTab} variant="unstyled">
                <TabList>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      onClick={() => navigate(`/course/${courseId}/session/1`)}
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
                      onClick={() => navigate(`/course/${courseId}/attendance`)}
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
          
          {/* Attendance Content */}
          <Box p={6}>
            {/* Attendance Stats Cards */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
              {/* Completed Attendance */}
              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text mb={2} color="gray.600" fontSize="sm">Completed Attend</Text>
                <Flex align="center">
                  <Text fontSize="2xl" fontWeight="bold" mr={3}>
                    {course.attendanceStats.completedPercentage}%
                  </Text>
                  <CircularProgress 
                    value={course.attendanceStats.completedPercentage} 
                    color="blue.400" 
                    size="50px"
                    thickness="8px"
                  />
                </Flex>
              </Box>
              
              {/* Total Sessions */}
              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text mb={2} color="gray.600" fontSize="sm">Total Session</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {course.attendanceStats.totalSessions}
                </Text>
              </Box>
              
              {/* Total Attendance */}
              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text mb={2} color="gray.600" fontSize="sm">Total Attendance</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {course.attendanceStats.totalAttendance}
                </Text>
              </Box>
              
              {/* Minimal Attendance */}
              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text mb={2} color="gray.600" fontSize="sm">Minimal Attendance</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {course.attendanceStats.minimalAttendance}
                </Text>
              </Box>
            </SimpleGrid>
            
            {/* Attendance List */}
            <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
              <VStack spacing={4} align="stretch">
                {course.sessions.map((session) => (
                  <Box key={session.id} borderBottomWidth="1px" borderBottomColor="gray.200" pb={4}>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Flex align="center">
                        <Text fontWeight="medium" mr={2}>Session {session.number}</Text>
                        {session.attended && (
                          <Badge colorScheme="green" display="flex" alignItems="center">
                            <CheckCircleIcon mr={1} />
                            <Text>Attend</Text>
                          </Badge>
                        )}
                        {!session.attended && (
                          <Badge colorScheme="red" display="flex" alignItems="center">
                            <Text>Absent</Text>
                          </Badge>
                        )}
                      </Flex>
                      <Box>
                        <Badge colorScheme={session.mode === 'Online' ? 'blue' : 'purple'} mr={2}>
                          {session.mode}
                        </Badge>
                      </Box>
                    </Flex>
                    <Text 
                      fontSize="md"
                      mb={2}
                      cursor="pointer"
                      _hover={{ color: 'blue.500' }}
                      onClick={() => navigateToSession(session.id)}
                    >
                      {session.title}
                    </Text>
                    <Flex fontSize="sm" color="gray.500" align="center">
                      <Box mr={4}>
                        <CalendarIcon mr={1} />
                        <Text as="span">{session.date}</Text>
                      </Box>
                      <Box>
                        <Text as="span">{session.time}</Text>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CourseAttendance;