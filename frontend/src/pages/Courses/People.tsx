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
  IconButton,
  Grid,
  Center,
  SimpleGrid,
  VStack
} from '@chakra-ui/react';
import { ChevronRightIcon, ArrowBackIcon } from '@chakra-ui/icons';
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

const IconPersonWorkspace = BsPersonWorkspace as React.FC;
const IconLightning = BsLightningCharge as React.FC;
const IconFillJournalBookmark = BsFillJournalBookmarkFill as React.FC;
const IconBulb = HiOutlineLightBulb as React.FC;
const People: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
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
        avatarUrl: 'https://placehold.co/100x100?text=MM',
        studentId: '23340',
        department: 'Information Systems',
        email: 'marvin.m@student.edu'
      },
      {
        id: 's2',
        name: 'Jacob Jones',
        avatarUrl: 'https://placehold.co/100x100?text=JJ',
        studentId: '20079',
        department: 'Information Systems',
        email: 'jacob.j@student.edu'
      },
      {
        id: 's3',
        name: 'Guy Hawkins',
        avatarUrl: 'https://placehold.co/100x100?text=GH',
        studentId: '16627',
        department: 'Information Systems',
        email: 'guy.h@student.edu'
      },
      {
        id: 's4',
        name: 'Courtney Henry',
        avatarUrl: 'https://placehold.co/100x100?text=CH',
        studentId: '20706',
        department: 'Information Systems',
        email: 'courtney.h@student.edu'
      },
      {
        id: 's5',
        name: 'Albert Flores',
        avatarUrl: 'https://placehold.co/100x100?text=AF',
        studentId: '93046',
        department: 'Information Systems',
        email: 'albert.f@student.edu'
      },
      {
        id: 's6',
        name: 'Robert Fox',
        avatarUrl: 'https://placehold.co/100x100?text=RF',
        studentId: '13671',
        department: 'Information Systems',
        email: 'robert.f@student.edu'
      },
      {
        id: 's7',
        name: 'Kristin Watson',
        avatarUrl: 'https://placehold.co/100x100?text=KW',
        studentId: '92771',
        department: 'Information Systems',
        email: 'kristin.w@student.edu'
      },
      {
        id: 's8',
        name: 'Jerome Bell',
        avatarUrl: 'https://placehold.co/100x100?text=JB',
        studentId: '45904',
        department: 'Information Systems',
        email: 'jerome.b@student.edu'
      },
      {
        id: 's9',
        name: 'Wade Warren',
        avatarUrl: 'https://placehold.co/100x100?text=WW',
        studentId: '39235',
        department: 'Information Systems',
        email: 'wade.w@student.edu'
      },
      {
        id: 's10',
        name: 'Annette Black',
        avatarUrl: 'https://placehold.co/100x100?text=AB',
        studentId: '43359',
        department: 'Information Systems',
        email: 'annette.b@student.edu'
      },
      {
        id: 's11',
        name: 'Darrell Steward',
        avatarUrl: 'https://placehold.co/100x100?text=DS',
        studentId: '50364',
        department: 'Information Systems',
        email: 'darrell.s@student.edu'
      },
      {
        id: 's12',
        name: 'Jane Cooper',
        avatarUrl: 'https://placehold.co/100x100?text=JC',
        studentId: '70443',
        department: 'Information Systems',
        email: 'jane.c@student.edu'
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
          
          {/* People Content - Students Grid */}
          <Box p={6}>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
              {course.students.slice(0, 12).map(student => (
                <Box key={student.id} bg="white" borderRadius="md" p={4} textAlign="center">
                  <Center mb={3}>
                    <Avatar 
                      size="lg" 
                      name={student.name} 
                      src={student.avatarUrl}
                    />
                  </Center>
                  <VStack spacing={1} align="center">
                    <Text fontWeight="medium">{student.name}</Text>
                    <Text fontSize="sm" fontWeight="medium">{student.studentId}</Text>
                    <Text fontSize="xs" color="gray.500">{student.department}</Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default People;