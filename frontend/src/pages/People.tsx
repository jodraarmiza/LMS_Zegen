import React, { useState, useEffect } from 'react';
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
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Badge
} from '@chakra-ui/react';
import { ChevronRightIcon, ArrowBackIcon, SearchIcon } from '@chakra-ui/icons';

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  department?: string;
  email?: string;
}

interface Student {
  id: string;
  name: string;
  avatarUrl: string;
  studentId: string;
  department?: string;
  email?: string;
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  instructors: Instructor[];
  students: Student[];
  distribution: {
    passed: number;
    inProgress: number;
    overdue: number;
    failed: number;
    notStarted: number;
  };
}

const People: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(7); // People tab (index 7)
  const navigate = useNavigate();
  
  // Setup Effect to initialize activeTab based on URL
  useEffect(() => {
    // Initialize active tab based on URL
    const path = window.location.pathname;
    if (path.includes('/session')) {
      setActiveTab(0);
    } else if (path.includes('/syllabus')) {
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
    }
  }, []);
  
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
        avatarUrl: 'https://placehold.co/32x32?text=JZ',
        role: 'Lecturer',
        department: 'Information Systems',
        email: 'joni.zimbatima@university.edu'
      },
      {
        id: '102',
        name: 'Alan Russ',
        avatarUrl: 'https://placehold.co/32x32?text=AR',
        role: 'Teaching Assistant',
        department: 'Information Systems',
        email: 'alan.russ@university.edu'
      }
    ],
    students: [
      {
        id: 's1',
        name: 'Marvin McKinney',
        avatarUrl: 'https://placehold.co/32x32?text=MM',
        studentId: '23340',
        department: 'Information Systems',
        email: 'marvin.m@student.edu'
      },
      {
        id: 's2',
        name: 'Jacob Jones',
        avatarUrl: 'https://placehold.co/32x32?text=JJ',
        studentId: '20070',
        department: 'Information Systems',
        email: 'jacob.j@student.edu'
      },
      {
        id: 's3',
        name: 'Guy Hawkins',
        avatarUrl: 'https://placehold.co/32x32?text=GH',
        studentId: '16627',
        department: 'Information Systems',
        email: 'guy.h@student.edu'
      },
      {
        id: 's4',
        name: 'Courtney Henry',
        avatarUrl: 'https://placehold.co/32x32?text=CH',
        studentId: '20706',
        department: 'Information Systems',
        email: 'courtney.h@student.edu'
      },
      {
        id: 's5',
        name: 'Albert Flores',
        avatarUrl: 'https://placehold.co/32x32?text=AF',
        studentId: '93046',
        department: 'Information Systems',
        email: 'albert.f@student.edu'
      },
      {
        id: 's6',
        name: 'Robert Fox',
        avatarUrl: 'https://placehold.co/32x32?text=RF',
        studentId: '13671',
        department: 'Information Systems',
        email: 'robert.f@student.edu'
      },
      {
        id: 's7',
        name: 'Kristin Watson',
        avatarUrl: 'https://placehold.co/32x32?text=KW',
        studentId: '82771',
        department: 'Information Systems',
        email: 'kristin.w@student.edu'
      },
      {
        id: 's8',
        name: 'Jerome Bell',
        avatarUrl: 'https://placehold.co/32x32?text=JB',
        studentId: '45904',
        department: 'Information Systems',
        email: 'jerome.b@student.edu'
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
  
  // Filter people based on search query
  const filteredInstructors = course.instructors.filter(instructor => 
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (instructor.department && instructor.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredStudents = course.students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.includes(searchQuery) ||
    (student.department && student.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                as={Link}
                to={`/course/${courseId}/session/1`}
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
          
          {/* People Content */}
          <Box p={6}>
            {/* Search */}
            <Box mb={6}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input 
                  placeholder="Search people" 
                  bg="white" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </Box>
            
            {/* Instructors */}
            <Box mb={8}>
              <Heading size="md" mb={4}>Instructors</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
                {filteredInstructors.map(instructor => (
                  <Box 
                    key={instructor.id}
                    bg="white"
                    p={4}
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <Flex mb={4}>
                      <Avatar 
                        size="lg" 
                        name={instructor.name} 
                        src={instructor.avatarUrl}
                        mr={4}
                      />
                      <Box>
                        <Heading size="sm">{instructor.name}</Heading>
                        <Badge colorScheme="purple" mt={1}>{instructor.role}</Badge>
                        <Text fontSize="sm" color="gray.500" mt={1}>{instructor.department}</Text>
                      </Box>
                    </Flex>
                    <Text fontSize="sm" color="gray.600">{instructor.email}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            
            {/* Students */}
            <Box>
              <Heading size="md" mb={4}>Students ({filteredStudents.length})</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
                {filteredStudents.map(student => (
                  <Box 
                    key={student.id}
                    bg="white"
                    p={4}
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <Flex mb={4}>
                      <Avatar 
                        size="lg" 
                        name={student.name} 
                        src={student.avatarUrl}
                        mr={4}
                      />
                      <Box>
                        <Heading size="sm">{student.name}</Heading>
                        <Text fontSize="sm" mt={1}>{student.studentId}</Text>
                        <Text fontSize="sm" color="gray.500" mt={1}>{student.department}</Text>
                      </Box>
                    </Flex>
                    <Text fontSize="sm" color="gray.600">{student.email}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default People;