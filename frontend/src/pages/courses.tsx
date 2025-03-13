import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  Button,
  Circle,
  useColorMode,
  Progress,
  Avatar,
  AvatarGroup,
  Divider
} from '@chakra-ui/react';
import {
  ChevronDownIcon
} from '@chakra-ui/icons';

// Define interfaces for type safety
interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
}

interface CourseSession {
  total: number;
  completed: number;
  lastUpdated: string;
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  progress: number;
  session: CourseSession;
  instructors: Instructor[];
  participants?: Instructor[];
}

const Courses: React.FC = () => {
  // State for active tab in sidebar
  const [currentTab, setCurrentTab] = useState('Course');
  const navigate = useNavigate();
  
  // Use colorMode for theme colors
  const { colorMode } = useColorMode();
  
  // Define colors based on colorMode
  const cardBg = colorMode === 'light' ? 'white' : 'gray.700';

  // Courses data
  const courses: Course[] = [
    {
      id: '1',
      code: 'LB2123',
      title: 'IT Service & Risk Management',
      category: 'IT',
      progress: 65,
      session: {
        total: 12,
        completed: 8,
        lastUpdated: '2d ago'
      },
      instructors: [
        {
          id: '101',
          name: 'Devon Lane',
          avatarUrl: 'https://placehold.co/32x32?text=DL'
        }
      ],
      participants: [
        {
          id: '201',
          name: 'Jacob Jones',
          avatarUrl: 'https://placehold.co/32x32?text=JJ'
        }
      ]
    },
    {
      id: '2',
      code: 'LB2123',
      title: 'Digital Banking',
      category: 'Banking',
      progress: 45,
      session: {
        total: 15,
        completed: 7,
        lastUpdated: '3d ago'
      },
      instructors: [
        {
          id: '102',
          name: 'Wade Warren',
          avatarUrl: 'https://placehold.co/32x32?text=WW'
        },
        {
          id: '103',
          name: 'Jane Cooper',
          avatarUrl: 'https://placehold.co/32x32?text=JC'
        }
      ]
    },
    {
      id: '3',
      code: 'LB2123',
      title: 'User Experience Research & Design',
      category: 'Design',
      progress: 75,
      session: {
        total: 20,
        completed: 15,
        lastUpdated: '5d ago'
      },
      instructors: [
        {
          id: '104',
          name: 'Jane Cooper',
          avatarUrl: 'https://placehold.co/32x32?text=JC'
        }
      ],
      participants: [
        {
          id: '202',
          name: 'Esther Howard',
          avatarUrl: 'https://placehold.co/32x32?text=EH'
        },
        {
          id: '203',
          name: 'Robert Fox',
          avatarUrl: 'https://placehold.co/32x32?text=RF'
        }
      ]
    },
    {
      id: '4',
      code: 'LB2123',
      title: 'Introduction to Database System',
      category: 'IT',
      progress: 30,
      session: {
        total: 12,
        completed: 4,
        lastUpdated: '6d ago'
      },
      instructors: [
        {
          id: '105',
          name: 'Cody Fisher',
          avatarUrl: 'https://placehold.co/32x32?text=CF'
        }
      ],
      participants: [
        {
          id: '204',
          name: 'Leslie Alexander',
          avatarUrl: 'https://placehold.co/32x32?text=LA'
        },
        {
          id: '205',
          name: 'Dianne Russell',
          avatarUrl: 'https://placehold.co/32x32?text=DR'
        },
        {
          id: '206',
          name: 'Jacob Jones',
          avatarUrl: 'https://placehold.co/32x32?text=JJ'
        }
      ]
    }
  ];

  // Function to handle course click
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <Box minH="100vh" bg="gray.50" w="full">
      {/* Main content area */}
      <Flex h="calc(100vh - 57px)" w="full">
        {/* Content wrapper - takes full width after sidebar */}
        <Box flex="1" position="relative">
          {/* Main courses list - fill all available space */}
          <Box p={6} w="100%" overflowY="auto" h="100%">
            {/* Header with title and semester */}
            <Flex justifyContent="space-between" mb={6} w="100%">
              <Box>
                <Heading as="h1" size="lg" color="gray.800">
                  My Courses
                </Heading>
              </Box>
              <Flex alignItems="center" bg="white" p={2} borderRadius="md" boxShadow="sm">
                <Text fontSize="sm" color="gray.600" mr={2}>
                  2025 Even Semester
                </Text>
                <Circle size="24px" bg="blue.500" color="white">
                  <ChevronDownIcon boxSize={4} />
                </Circle>
              </Flex>
            </Flex>

            {/* Course list - stretch to full width */}
            <VStack spacing={4} align="stretch" w="100%">
              {courses.map((course) => (
                <Box
                  key={course.id}
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  boxShadow="sm"
                  borderWidth="1px"
                  borderColor="gray.200"
                  cursor="pointer"
                  onClick={() => handleCourseClick(course.id)}
                  transition="all 0.2s"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "md"
                  }}
                  width="100%"
                >
                  <Flex mb={3} justify="space-between">
                    <Flex align="center">
                      <Box
                        bg="blue.500"
                        color="white"
                        h="24px"
                        w="24px"
                        borderRadius="md"
                        fontSize="xs"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mr={2}
                      >
                        C
                      </Box>
                      <Text fontSize="xs" mr={2}>Course</Text>
                      <Text fontSize="xs" color="gray.500">{course.code}</Text>
                    </Flex>
                    
                    <Flex>
                      <AvatarGroup size="sm" max={3} spacing="-0.75rem">
                        {course.instructors?.map((instructor) => (
                          <Avatar 
                            key={instructor.id} 
                            name={instructor.name} 
                            src={instructor.avatarUrl}
                          />
                        ))}
                        {course.participants?.map((participant) => (
                          <Avatar 
                            key={participant.id} 
                            name={participant.name} 
                            src={participant.avatarUrl} 
                          />
                        ))}
                      </AvatarGroup>
                    </Flex>
                  </Flex>

                  <Text fontWeight="medium" mb={3}>{course.title}</Text>
                  
                  <Box position="relative" mb={3}>
                    <Progress
                      value={course.progress}
                      size="sm"
                      colorScheme="green"
                      borderRadius="full"
                    />
                    <Text 
                      position="absolute" 
                      top="50%" 
                      right="0" 
                      transform="translateY(-50%)" 
                      fontSize="xs" 
                      fontWeight="bold"
                      color="white"
                      px={2}
                    >
                      {course.progress}%
                    </Text>
                  </Box>
                  
                  <Flex fontSize="xs" color="gray.500" align="center">
                    <Box
                      borderWidth="1px"
                      borderColor="blue.200"
                      bg="blue.50"
                      color="blue.700"
                      borderRadius="full"
                      px={2}
                      py={0.5}
                      mr={2}
                    >
                      <Flex align="center">
                        <Text>Total Session: {course.session.total}/{course.session.completed}</Text>
                      </Flex>
                    </Box>
                    <Text ml="auto">Updated: {course.session.lastUpdated}</Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Courses; 