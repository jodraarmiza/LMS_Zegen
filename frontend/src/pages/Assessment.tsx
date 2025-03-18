import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  VStack,
  Badge,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import { ChevronRightIcon, ArrowBackIcon, CalendarIcon } from '@chakra-ui/icons';

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface AssessmentItem {
  id: string;
  title: string;
  type: 'Assignment' | 'Mid Exam' | 'Final Exam';
  percentage: number;
  dueDate?: string;
  score?: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
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

const Assessment: React.FC = () => {
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
  
  // Mock data for assessments
  const assessments: AssessmentItem[] = [
    {
      id: '1',
      title: 'Assignment',
      type: 'Assignment',
      percentage: 30,
      status: 'Completed',
      score: 90
    },
    {
      id: '2',
      title: 'Mid Exam',
      type: 'Mid Exam',
      percentage: 35,
      status: 'Completed',
      score: 85
    },
    {
      id: '3',
      title: 'Final Exam',
      type: 'Final Exam',
      percentage: 35,
      dueDate: '10 June 2025',
      status: 'Not Started'
    }
  ];
  
  // Calculate total grade
  const calculateGrade = () => {
    let totalScore = 0;
    let totalPercentageCompleted = 0;
    
    assessments.forEach(assessment => {
      if (assessment.score !== undefined) {
        totalScore += (assessment.score * assessment.percentage) / 100;
        totalPercentageCompleted += assessment.percentage;
      }
    });
    
    return {
      score: totalScore,
      totalPercentageCompleted,
      letterGrade: getLetterGrade(totalScore)
    };
  };
  
  // Get letter grade based on score
  const getLetterGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };
  
  // Calculate current grade
  const gradeInfo = calculateGrade();
  
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
                <Tabs defaultIndex={3} variant="unstyled">
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
                      as={Link}
                      to={`/course/${courseId}/syllabus`}
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
                      color="blue.500"
                      borderBottomWidth="3px"
                      borderBottomColor="blue.500"
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
          
          {/* Assessment Content */}
          <Box p={6}>
            {/* Assessment overview with grade */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
              <Card bg="white">
                <CardHeader>
                  <Heading size="md">Current Grade</Heading>
                </CardHeader>
                <CardBody>
                  <Flex align="center">
                    <CircularProgress 
                      value={gradeInfo.score} 
                      size="120px" 
                      thickness="8px" 
                      color={
                        gradeInfo.score >= 80 ? "green.400" : 
                        gradeInfo.score >= 70 ? "blue.400" : 
                        gradeInfo.score >= 60 ? "yellow.400" : "red.400"
                      }
                    >
                      <CircularProgressLabel>
                        <Text fontSize="2xl" fontWeight="bold">{Math.round(gradeInfo.score)}</Text>
                      </CircularProgressLabel>
                    </CircularProgress>
                    
                    <Box ml={6}>
                      <Stat>
                        <StatLabel color="gray.500">Final Score</StatLabel>
                        <StatNumber fontSize="4xl">{gradeInfo.letterGrade}</StatNumber>
                        <StatHelpText>
                          Based on {gradeInfo.totalPercentageCompleted}% of total grade
                        </StatHelpText>
                      </Stat>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
              
              <Card bg="white">
                <CardHeader>
                  <Heading size="md">Assessment Breakdown</Heading>
                </CardHeader>
                <CardBody></CardBody>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    {assessments.map(assessment => (
                      <Flex key={assessment.id} justify="space-between" align="center">
                        <Text fontWeight="medium">{assessment.type}</Text>
                        <Text>{assessment.percentage}%</Text>
                      </Flex>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
            
            {/* Individual Assessments */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {assessments.map(assessment => (
                <Card key={assessment.id} bg="white">
                  <CardHeader pb={1}>
                    <Heading size="sm" color="gray.600">Theory</Heading>
                    <Heading size="md" mt={1}>{assessment.title}</Heading>
                  </CardHeader>
                  <CardBody pt={1}>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                      {assessment.type === 'Assignment' ? (
                        'Last updated: 8+ days'
                      ) : assessment.dueDate ? (
                        <>Due date: {assessment.dueDate}</>
                      ) : (
                        'Completed'
                      )}
                    </Text>
                    {assessment.status === 'Completed' && assessment.score !== undefined && (
                      <Flex align="center" justify="space-between">
                        <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                          {assessment.percentage}%
                        </Badge>
                        <Text fontWeight="bold" fontSize="xl">{assessment.score}</Text>
                      </Flex>
                    )}
                    {assessment.status === 'Not Started' && (
                      <Button colorScheme="blue" size="sm" width="full" mt={2}>
                        Start Assessment
                      </Button>
                    )}
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
            
            {/* Additional Assessment Details (could be added in a real application) */}
            <Box mt={8}>
              <Heading size="md" mb={4}>Assessment Guidelines</Heading>
              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <VStack align="stretch" spacing={4}>
                  <Text>
                    <Text as="span" fontWeight="bold">Submissions:</Text> All assignments must be submitted through the LMS platform. Late submissions may incur penalties.
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="bold">Grading:</Text> Each assessment component contributes to your final grade as shown in the breakdown above.
                  </Text>
                  <Text>
                    <Text as="span" fontWeight="bold">Academic Integrity:</Text> Please ensure that all submitted work is your own. Plagiarism and academic dishonesty will not be tolerated.
                  </Text>
                </VStack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Assessment;