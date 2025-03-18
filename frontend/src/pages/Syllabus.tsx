import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  Tab,
  Avatar,
  Progress,
  HStack
} from '@chakra-ui/react';
import { ChevronRightIcon, ArrowBackIcon } from '@chakra-ui/icons';

// Define interfaces for type safety
interface LearningOutcome {
  id: string;
  code: string;
  knowledge: string;
  application: string;
}

interface TeachingStrategy {
  id: string;
  name: string;
}

interface Textbook {
  id: string;
  title: string;
  authors: string[];
  year: number;
  publisher: string;
  link?: string;
}

interface CourseDescription {
  id: string;
  description: string;
  learningOutcomes: LearningOutcome[];
  teachingStrategies: TeachingStrategy[];
  textbooks: Textbook[];
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  instructors: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  distribution: {
    passed: number;
    inProgress: number;
    overdue: number;
    failed: number;
    notStarted: number;
  };
}

const Syllabus: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  
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
  
  // Mock course description data
  const courseDescription: CourseDescription = {
    id: '1',
    description: 'After completing this course, students will be able to evaluate AIS topics, business processes, and their impact on organizational decisions while also enabling them to recognize internal controls in both manual and computerized systems and design risk assessment and control techniques.',
    learningOutcomes: [
      {
        id: 'LO1',
        code: 'LO1',
        knowledge: 'Able to identify the basic of AIS Concepts',
        application: 'Able to identify the controls in AIS Concepts'
      },
      {
        id: 'LO2',
        code: 'LO2',
        knowledge: 'Able to explain the controls in AIS Concepts',
        application: 'Able to explain the controls in AIS Concepts'
      },
      {
        id: 'LO3',
        code: 'LO3',
        knowledge: 'Able to show basic thing related to accounting information systems',
        application: 'Able to show and tell something related to accounting information systems'
      }
    ],
    teachingStrategies: [
      {
        id: 'TS1',
        name: 'Class discussion'
      },
      {
        id: 'TS2',
        name: 'Group Discussion/Presentation'
      },
      {
        id: 'TS3',
        name: 'Case Study'
      }
    ],
    textbooks: [
      {
        id: 'TB1',
        title: 'Using AIS',
        authors: ['James A. Hall'],
        year: 2019,
        publisher: 'Cengage Learning'
      },
      {
        id: 'TB2',
        title: 'Accounting Information Systems: Controls and Processes',
        authors: ['Leslie Turner', 'Andrea Weickgenannt', 'Mary Kay Copeland'],
        year: 2020,
        publisher: 'Wiley & Sons, Inc.'
      }
    ]
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
                to={'/courses'}
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
                <Tabs variant="unstyled" defaultIndex={1}>
                  <TabList>
                    <Tab 
                      _selected={{ color: 'blue.500', borderBottomWidth: '3px', borderBottomColor: 'blue.500' }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                      as={Link}
                      to={`/course/${courseId}/session/1`}
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
                      color="blue.500"
                      borderBottomWidth="3px"
                      borderBottomColor="blue.500"
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
                      as={Link}
                      to={`/course/${courseId}/forum`}
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
                      as={Link}
                      to={`/course/${courseId}/assessment`}
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
                      as={Link}
                      to={`/course/${courseId}/gradebook`}
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
                      as={Link}
                      to={`/course/${courseId}/rubric`}
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
                      as={Link}
                      to={`/course/${courseId}/people`}
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
                      as={Link}
                      to={`/course/${courseId}/attendance`}
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
          
          {/* Syllabus Content */}
          <Box p={6}>
            {/* Course Description */}
            <Box mb={8}>
              <Heading as="h2" size="md" mb={4}>Course Description</Heading>
              <Text>{courseDescription.description}</Text>
            </Box>
            
            {/* Learning Outcomes */}
            <Box mb={8}>
              <Heading as="h2" size="md" mb={4}>Learning Outcomes</Heading>
              <VStack align="stretch" spacing={4}>
                {courseDescription.learningOutcomes.map(outcome => (
                  <Box key={outcome.id} p={4} bg="white" borderRadius="md" boxShadow="sm">
                    <Heading size="sm" mb={2}>
                      {outcome.code}: {outcome.knowledge}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      <Text as="span" fontWeight="medium">Application:</Text> {outcome.application}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
            
            {/* Teaching & Learning Strategies */}
            <Box mb={8}>
              <Heading as="h2" size="md" mb={4}>Teaching & Learning Strategies</Heading>
              <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
                <VStack align="stretch" spacing={2}>
                  {courseDescription.teachingStrategies.map(strategy => (
                    <Flex key={strategy.id} align="center">
                      <Text as="span" color="blue.500" mr={2}>•</Text>
                      <Text>{strategy.name}</Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </Box>
            
            {/* Textbooks */}
            <Box mb={8}>
              <Heading as="h2" size="md" mb={4}>Textbooks</Heading>
              <VStack align="stretch" spacing={4}>
                {courseDescription.textbooks.map(book => (
                  <Box key={book.id} p={4} bg="white" borderRadius="md" boxShadow="sm">
                    <Heading size="sm" mb={2}>{book.title}</Heading>
                    <Text fontSize="sm" color="gray.700" mb={1}>
                      {book.authors.join(', ')} ({book.year})
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {book.publisher}
                    </Text>
                    {book.link && (
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        mt={2}
                        as="a"
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Access E-BOOK
                      </Button>
                    )}
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

export default Syllabus;