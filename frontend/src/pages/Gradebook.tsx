import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { ChevronRightIcon, ArrowBackIcon } from '@chakra-ui/icons';

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface GradeItem {
  id: string;
  title: string;
  category: string;
  weight: number;
  score: number;
  maxScore: number;
  dueDate?: string;
  submittedDate?: string;
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

const Gradebook: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(5); // Gradebook tab (index 5)
  
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
  
  // Mock data for grades
  const grades: GradeItem[] = [
    {
      id: '1',
      title: 'Assignment 1',
      category: 'Assignment',
      weight: 30,
      score: 90,
      maxScore: 100,
      dueDate: '20 March 2025',
      submittedDate: '18 March 2025'
    },
    {
      id: '2',
      title: 'Mid Exam',
      category: 'Exam',
      weight: 35,
      score: 85,
      maxScore: 100,
      dueDate: '15 April 2025',
      submittedDate: '15 April 2025'
    },
    {
      id: '3',
      title: 'Final Exam',
      category: 'Exam',
      weight: 35,
      score: 88,
      maxScore: 100,
      dueDate: '10 June 2025',
      submittedDate: '10 June 2025'
    }
  ];
  
  // Calculate final grade
  const calculateFinalGrade = () => {
    let weightedScore = 0;
    let totalWeight = 0;
    
    grades.forEach(grade => {
      const percentage = (grade.score / grade.maxScore) * 100;
      weightedScore += percentage * (grade.weight / 100);
      totalWeight += grade.weight;
    });
    
    // Scale to account for total weight
    const finalScore = (weightedScore / totalWeight) * 100;
    return {
      score: Math.round(finalScore),
      letterGrade: getLetterGrade(finalScore)
    };
  };
  
  // Get letter grade
  const getLetterGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  // Handle tab change - FIXED VERSION
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
  
  const finalGrade = calculateFinalGrade();
  
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
          
          {/* Gradebook Content */}
          <Box p={6}>
            <Grid templateColumns="1fr 2fr" gap={6}>
              {/* Final Grade Card */}
              <GridItem>
                <Box bg="white" p={6} borderRadius="md" boxShadow="sm" mb={6}>
                  <Heading size="md" mb={4}>Final Score</Heading>
                  <Flex justify="space-between" align="center">
                    <Stat>
                      <StatLabel>Total Score</StatLabel>
                      <StatNumber fontSize="4xl">{finalGrade.score}</StatNumber>
                      <StatHelpText>Last update: 20 days ago</StatHelpText>
                    </Stat>
                    <Box 
                      bg={
                        finalGrade.letterGrade === 'A' ? 'green.100' :
                        finalGrade.letterGrade === 'B' ? 'blue.100' :
                        finalGrade.letterGrade === 'C' ? 'yellow.100' :
                        finalGrade.letterGrade === 'D' ? 'orange.100' : 'red.100'
                      } 
                      color={
                        finalGrade.letterGrade === 'A' ? 'green.800' :
                        finalGrade.letterGrade === 'B' ? 'blue.800' :
                        finalGrade.letterGrade === 'C' ? 'yellow.800' :
                        finalGrade.letterGrade === 'D' ? 'orange.800' : 'red.800'
                      }
                      borderRadius="md"
                      p={4}
                      fontSize="4xl"
                      fontWeight="bold"
                      h="80px"
                      w="80px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {finalGrade.letterGrade}
                    </Box>
                  </Flex>
                </Box>
                
                {/* Grade categories */}
                <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                  <Heading size="md" mb={4}>Grade Categories</Heading>
                  <VStack spacing={4} align="start">
                    <Flex w="100%" justify="space-between">
                      <Text>Assignments</Text>
                      <Text fontWeight="medium">30%</Text>
                    </Flex>
                    <Flex w="100%" justify="space-between">
                      <Text>Mid Exam</Text>
                      <Text fontWeight="medium">35%</Text>
                    </Flex>
                    <Flex w="100%" justify="space-between">
                      <Text>Final Exam</Text>
                      <Text fontWeight="medium">35%</Text>
                    </Flex>
                  </VStack>
                </Box>
              </GridItem>
              
              {/* Grades Table */}
              <GridItem>
                <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
                  <Heading size="md" mb={4}>Grade Details</Heading>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Assessment</Th>
                        <Th>Category</Th>
                        <Th>Weight</Th>
                        <Th>Score</Th>
                        <Th>Grade</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {grades.map(grade => (
                        <Tr key={grade.id}>
                          <Td>
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="medium">{grade.title}</Text>
                              <Text fontSize="xs" color="gray.500">
                                Due: {grade.dueDate}
                              </Text>
                            </VStack>
                          </Td>
                          <Td>{grade.category}</Td>
                          <Td>{grade.weight}%</Td>
                          <Td>{grade.score}/{grade.maxScore}</Td>
                          <Td>
                            <Badge 
                              colorScheme={
                                getLetterGrade((grade.score / grade.maxScore) * 100) === 'A' ? 'green' :
                                getLetterGrade((grade.score / grade.maxScore) * 100) === 'B' ? 'blue' :
                                getLetterGrade((grade.score / grade.maxScore) * 100) === 'C' ? 'yellow' :
                                getLetterGrade((grade.score / grade.maxScore) * 100) === 'D' ? 'orange' : 'red'
                              }
                              fontSize="sm"
                              px={2}
                              py={1}
                            >
                              {getLetterGrade((grade.score / grade.maxScore) * 100)}
                            </Badge>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Gradebook;