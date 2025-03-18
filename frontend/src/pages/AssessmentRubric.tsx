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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Divider
} from '@chakra-ui/react';
import { ChevronRightIcon, ArrowBackIcon } from '@chakra-ui/icons';

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface LearningOutcome {
  id: string;
  code: string;
  description: string;
}

interface RubricCriteria {
  id: string;
  learningOutcome: LearningOutcome;
  keyIndicator: string;
  proficiencyLevels: {
    excellent: string;
    good: string;
    average: string;
    poor: string;
  };
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

const AssessmentRubric: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
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
  
  // Mock data for learning outcomes
  const learningOutcomes: LearningOutcome[] = [
    {
      id: '1',
      code: 'LO1',
      description: 'Identify the foundation of AIS Concepts'
    },
    {
      id: '2',
      code: 'LO2',
      description: 'Explain the controls in AIS Concepts'
    },
    {
      id: '3',
      code: 'LO3',
      description: 'Apply the controls in AIS Concepts'
    }
  ];
  
  // Mock data for rubric criteria
  const rubricCriteria: RubricCriteria[] = [
    {
      id: '1',
      learningOutcome: learningOutcomes[0],
      keyIndicator: 'Students can define basic terms related to accounting information systems',
      proficiencyLevels: {
        excellent: 'Students can define more than 5 basic terms related to accounting information systems with complete explanation',
        good: 'Students can define 3 to 5 basic terms related to accounting information systems with good explanation',
        average: 'Students can define 2 to 3 basic things related to accounting information systems with minimal explanation',
        poor: 'Students cannot create define basic things related to accounting information systems'
      }
    },
    {
      id: '2',
      learningOutcome: learningOutcomes[1],
      keyIndicator: 'Students can list basic things related to system controls',
      proficiencyLevels: {
        excellent: 'Students can list more than 5 things related to accounting information systems controls',
        good: 'Students can list 3 to 5 things related to accounting information systems controls',
        average: 'Students can list 2 to 3 basic things related to accounting information systems controls',
        poor: 'Students cannot list basic things related to accounting information systems controls'
      }
    },
    {
      id: '3',
      learningOutcome: learningOutcomes[2],
      keyIndicator: 'Students can explain basic things related to accounting information systems',
      proficiencyLevels: {
        excellent: 'Students can explain more than 5 basic things related to accounting information systems',
        good: 'Students can explain 3 to 5 basic things related to accounting information systems',
        average: 'Students can explain 2 to 3 basic things related to accounting information systems',
        poor: 'Students cannot explain basic things related to accounting information systems'
      }
    },
    {
      id: '4',
      learningOutcome: learningOutcomes[2],
      keyIndicator: 'Students can show and tell something related to accounting information systems',
      proficiencyLevels: {
        excellent: 'Students can show and tell more than 5 things related to accounting information systems',
        good: 'Students can show and tell between 3 to 5 things related to accounting information systems',
        average: 'Students can show and tell 1 to 2 basic things related to accounting information systems',
        poor: 'Students cannot show and tell things related to accounting information systems'
      }
    }
  ];
  
  // State for selected assessment
  const [selectedAssessment, setSelectedAssessment] = useState('assignment1');
  const [activeTab, setActiveTab] = useState(5); // Assessment Rubric tab (index 5)
  
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
                        <Box as="span" fontSize="md">📊</Box>
                      </Box>
                      Gradebook
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
          
          {/* Assessment Rubric Content */}
          <Box p={6}>
            {/* Assessment selector */}
            <Box mb={6}>
              <Flex align="center" justify="space-between">
                <Heading size="md">Assessment Rubric</Heading>
                <Box width="300px">
                  <Select 
                    value={selectedAssessment}
                    onChange={(e) => setSelectedAssessment(e.target.value)}
                    bg="white"
                  >
                    <option value="assignment1">Assignment 1</option>
                    <option value="midexam">Mid Exam</option>
                    <option value="finalexam">Final Exam</option>
                  </Select>
                </Box>
              </Flex>
              <Divider my={4} />
            </Box>
            
            {/* Learning Outcomes */}
            <Box mb={6}>
              <Heading size="sm" mb={4}>Learning Outcomes</Heading>
              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Table variant="simple" size="sm">
                  <Thead bg="gray.50">
                    <Tr>
                      <Th>Code</Th>
                      <Th>Description</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {learningOutcomes.map(outcome => (
                      <Tr key={outcome.id}>
                        <Td fontWeight="medium">{outcome.code}</Td>
                        <Td>{outcome.description}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
            
            {/* Rubric Table */}
            <Box>
              <Heading size="sm" mb={4}>Criteria and Proficiency Levels</Heading>
              <Box bg="white" p={4} borderRadius="md" boxShadow="sm" overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead bg="gray.50">
                    <Tr>
                      <Th>Learning Outcomes</Th>
                      <Th>Key Indicator</Th>
                      <Th width="18%">
                        <Box textAlign="center">
                          <Text>Excellent</Text>
                          <Text fontSize="xs" color="gray.500">(85-100)</Text>
                        </Box>
                      </Th>
                      <Th width="18%">
                        <Box textAlign="center">
                          <Text>Good</Text>
                          <Text fontSize="xs" color="gray.500">(70-84)</Text>
                        </Box>
                      </Th>
                      <Th width="18%">
                        <Box textAlign="center">
                          <Text>Average</Text>
                          <Text fontSize="xs" color="gray.500">(60-69)</Text>
                        </Box>
                      </Th>
                      <Th width="18%">
                        <Box textAlign="center">
                          <Text>Poor</Text>
                          <Text fontSize="xs" color="gray.500">(0-59)</Text>
                        </Box>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rubricCriteria.map(criteria => (
                      <Tr key={criteria.id}>
                        <Td fontWeight="medium">{criteria.learningOutcome.code}</Td>
                        <Td>{criteria.keyIndicator}</Td>
                        <Td fontSize="sm">{criteria.proficiencyLevels.excellent}</Td>
                        <Td fontSize="sm">{criteria.proficiencyLevels.good}</Td>
                        <Td fontSize="sm">{criteria.proficiencyLevels.average}</Td>
                        <Td fontSize="sm">{criteria.proficiencyLevels.poor}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AssessmentRubric;