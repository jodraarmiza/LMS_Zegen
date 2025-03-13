import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Circle,
  useColorMode,
  Progress,
  Avatar,
  Badge,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  InfoIcon,
  AddIcon,
  CalendarIcon,
  TimeIcon,
  ChevronDownIcon
} from '@chakra-ui/icons';

// Define interfaces for type safety
interface ProgressData {
  total: number;
  passed: number;
  inProgress: number;
  overdue: number;
  failed: number;
  notStarted: number;
}

interface UserStats {
  points: number;
  certificates: number;
  gpa: string;
}

interface CalendarDay {
  day: string;
  date: number;
  isActive?: boolean;
}

interface Activity {
  id: string;
  time: string;
  category: string;
  title: string;
}

interface Instructor {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Session {
  id: string;
  category: string;
  instructor: Instructor;
  title: string;
  date: string;
  time: string;
  duration?: string;
}

interface CourseView {
  id: string;
  type: 'Course' | 'Session';
  sessionNumber: string;
  title: string;
  progress: number;
}

const Dashboard: React.FC = () => {
  // Use colorMode for theme colors
  const { colorMode } = useColorMode();
  
  // State for semester selector
  const [selectedSemester, setSelectedSemester] = useState('2025 Even Semester');
  
  // Available semesters
  const semesters = [
    '2025 Even Semester',
    '2024 Odd Semester',
    '2024 Even Semester',
    '2023 Odd Semester'
  ];
  
  // Define colors based on colorMode
  const cardBg = colorMode === 'light' ? 'white' : 'gray.700';
  const progressTrackColor = colorMode === 'light' ? 'gray.200' : 'gray.600';

  // Dashboard data
  const progressData: ProgressData = {
    total: 140,
    passed: 20,
    inProgress: 15,
    overdue: 5,
    failed: 10,
    notStarted: 30
  };
  
  const userStats: UserStats = {
    points: 100,
    certificates: 12,
    gpa: '3,72'
  };
  
  // Calendar data for March 2025
  const calendarDays: CalendarDay[] = [
    { day: 'Su', date: 9 },
    { day: 'Mo', date: 10 },
    { day: 'Tu', date: 11, isActive: true },
    { day: 'We', date: 12 },
    { day: 'Th', date: 13 },
    { day: 'Fr', date: 14 },
    { day: 'Sa', date: 15 }
  ];

  // Activities data for the day
  const activities: Activity[] = [
    {
      id: '1',
      time: '09:00',
      category: 'Digital Banking',
      title: 'History and Evolution of Digital Banking'
    },
    {
      id: '2',
      time: '11:00',
      category: 'IT Service & Risk Management',
      title: 'Introduction to IT Service Management (ITSM): Basic concepts...'
    },
    {
      id: '3',
      time: '13:45',
      category: 'User Experience Research & Design',
      title: 'UX Research Methods: User interviews, usability testing...'
    },
    {
      id: '4',
      time: '15:30',
      category: 'Introduction to Database Systems',
      title: 'Basic Database Concepts: Differences between relational...'
    }
  ];

  // Upcoming sessions data
  const upcomingSessions: Session[] = [
    {
      id: '1',
      category: 'IT Service & Risk Management',
      instructor: {
        id: '101',
        name: 'Wade Warren',
        avatarUrl: 'https://placehold.co/24x24?text=WW'
      },
      title: 'Auditing Information Technology-Based Processes',
      date: '11 March 2025',
      time: '09:00 - 10:45'
    },
    {
      id: '2',
      category: 'IT Service & Risk Management',
      instructor: {
        id: '102',
        name: 'Devon Lane',
        avatarUrl: 'https://placehold.co/24x24?text=DL'
      },
      title: 'Introduction to IT Service Management (ITSM): Basic concepts, ITSM frameworks (ITIL, COBIT, ISO 20000).',
      date: '11 March 2025',
      time: '11:00 - 12:45',
      duration: '01 : 44 : 12'
    },
    {
      id: '3',
      category: 'User Experience Research & Design',
      instructor: {
        id: '103',
        name: 'Jacob Jones',
        avatarUrl: 'https://placehold.co/24x24?text=JJ'
      },
      title: 'UX Research Methods: User interviews, usability testing, eye-tracking, A/B testing',
      date: '11 March 2025',
      time: '13:45 - 15:30',
      duration: '03 : 29 : 12'
    }
  ];

  // Last viewed courses
  const lastViewed: CourseView[] = [
    {
      id: '1',
      type: 'Course',
      sessionNumber: '13',
      title: 'User Experience Research & Design',
      progress: 50
    },
    {
      id: '2',
      type: 'Course',
      sessionNumber: '13',
      title: 'User Experience Research & Design',
      progress: 50
    },
    {
      id: '3',
      type: 'Course',
      sessionNumber: '13',
      title: 'User Experience Research & Design',
      progress: 50
    }
  ];

  return (
    <Box minH="100vh" bg="gray.50" width="100%">
      {/* Main Dashboard Content - Full Width */}
      <Box p={6} width="100%">
        {/* Welcome section with semester selector */}
        <Flex justifyContent="space-between" mb={6} alignItems="center" width="100%">
          <Box>
            <Heading as="h1" size="lg" color="gray.800">
              Good Morning, Anggara <Text as="span">👋</Text>
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Welcome to LMS, check your priority learning.
            </Text>
          </Box>
          
          {/* Semester selector dropdown */}
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDownIcon />}
              size="sm"
              variant="outline"
              bg="white"
              boxShadow="sm"
            >
              <Text fontSize="sm" color="gray.600">
                {selectedSemester}
              </Text>
            </MenuButton>
            <MenuList zIndex={1000}>
              {semesters.map((semester, index) => (
                <MenuItem 
                  key={index}
                  onClick={() => setSelectedSemester(semester)}
                >
                  {semester}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        {/* Learning progress */}
        <Flex mb={6} width="100%">
          <Box
            flex="1"
            bg={cardBg}
            p={6}
            borderRadius="lg"
            boxShadow="sm"
            mr={4}
          >
            <Flex justifyContent="space-between" mb={4}>
              <Box>
                <Heading as="h2" size="lg" fontWeight="semibold">
                  {progressData.total}
                </Heading>
                <Flex alignItems="center" color="gray.500" fontSize="sm">
                  <Text>Learning Contents</Text>
                  <Circle
                    size="16px"
                    borderWidth="1px"
                    borderColor="gray.300"
                    ml={1}
                    color="gray.400"
                  >
                    <InfoIcon boxSize={2} />
                  </Circle>
                </Flex>
              </Box>

              <StatGroup>
                <Stat textAlign="center" mx={3}>
                  <StatNumber color="yellow.500">{userStats.points}</StatNumber>
                  <StatLabel fontSize="xs" color="gray.500">Point</StatLabel>
                </Stat>
                <Stat textAlign="center" mx={3}>
                  <StatNumber color="orange.400">{userStats.certificates}</StatNumber>
                  <StatLabel fontSize="xs" color="gray.500">Certificates</StatLabel>
                </Stat>
                <Stat textAlign="center" mx={3}>
                  <StatNumber color="orange.500">{userStats.gpa}</StatNumber>
                  <StatLabel fontSize="xs" color="gray.500">GPA</StatLabel>
                </Stat>
              </StatGroup>
            </Flex>

            {/* Progress bar */}
            <Box position="relative" height="8px" mb={3}>
              <Progress
                value={100}
                size="sm"
                bg={progressTrackColor}
                borderRadius="full"
              />
              <Flex
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width="100%"
              >
                <Box width={`${progressData.passed}%`} bg="green.600" borderLeftRadius="full" />
                <Box width={`${progressData.inProgress}%`} bg="green.400" />
                <Box width={`${progressData.overdue}%`} bg="red.500" />
                <Box width={`${progressData.failed}%`} bg="yellow.400" />
                <Box width={`${progressData.notStarted}%`} bg="gray.400" borderRightRadius="full" />
              </Flex>
            </Box>

            {/* Legend */}
            <Flex
              justifyContent="space-between"
              fontSize="xs"
              color="gray.600"
            >
              <HStack>
                <Box w="2" h="2" bg="green.600" borderRadius="full" />
                <Text>Passed</Text>
              </HStack>
              <HStack>
                <Box w="2" h="2" bg="green.400" borderRadius="full" />
                <Text>In Progress</Text>
              </HStack>
              <HStack>
                <Box w="2" h="2" bg="red.500" borderRadius="full" />
                <Text>Overdue</Text>
              </HStack>
              <HStack>
                <Box w="2" h="2" bg="yellow.400" borderRadius="full" />
                <Text>Failed</Text>
              </HStack>
              <HStack>
                <Box w="2" h="2" bg="gray.400" borderRadius="full" />
                <Text>Not Started</Text>
              </HStack>
            </Flex>
          </Box>

          {/* Calendar panel */}
          <Box width="320px" bg={cardBg} borderRadius="lg" boxShadow="sm" p={4}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Text color="gray.600">March 2025</Text>
              <HStack>
                <IconButton
                  aria-label="Previous month"
                  icon={<ChevronRightIcon transform="rotate(180deg)" />}
                  size="xs"
                  variant="ghost"
                />
                <IconButton
                  aria-label="Next month"
                  icon={<ChevronRightIcon />}
                  size="xs"
                  variant="ghost"
                />
              </HStack>
            </Flex>

            {/* Days of week */}
            <Grid templateColumns="repeat(7, 1fr)" mb={2}>
              {calendarDays.map((day) => (
                <GridItem key={day.day} textAlign="center">
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    {day.day}
                  </Text>
                  <Circle
                    size="24px"
                    bg={day.isActive ? 'blue.500' : 'transparent'}
                    color={day.isActive ? 'white' : 'gray.700'}
                    mx="auto"
                  >
                    {day.date}
                  </Circle>
                </GridItem>
              ))}
            </Grid>

            {/* Today's activities */}
            <Box mt={6}>
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text color="gray.600">Activities</Text>
                <Button
                  leftIcon={<AddIcon />}
                  variant="ghost"
                  size="xs"
                  colorScheme="gray"
                >
                  Add Activity
                </Button>
              </Flex>

              <VStack spacing={4} mt={4} align="stretch">
                {activities.map((activity) => (
                  <Flex key={activity.id}>
                    <Text width="50px" color="gray.500" fontSize="sm">
                      {activity.time}
                    </Text>
                    <Box
                      ml={4}
                      pl={4}
                      borderLeftWidth="2px"
                      borderLeftColor="blue.500"
                    >
                      <Text fontSize="xs" color="gray.500">
                        {activity.category}
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        {activity.title}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </Box>
        </Flex>

        {/* Upcoming sessions */}
        <Box mb={6} width="100%">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h2" size="md" fontWeight="medium" color="gray.700">
              Upcoming session
            </Heading>
            <Button size="sm" variant="outline" colorScheme="gray">
              Today
            </Button>
          </Flex>

          <VStack spacing={4} align="stretch">
            {upcomingSessions.map((session) => (
              <Box
                key={session.id}
                bg={cardBg}
                p={4}
                borderRadius="lg"
                boxShadow="sm"
              >
                <Flex justifyContent="space-between">
                  <Flex>
                    <Flex
                      bg="yellow.100"
                      color="yellow.600"
                      h="40px"
                      w="40px"
                      borderRadius="md"
                      fontSize="sm"
                      alignItems="center"
                      justifyContent="center"
                      mr={3}
                    >
                      IT
                    </Flex>
                    <Box>
                      <Text fontSize="xs" color="gray.500" mb={1}>
                        {session.category}
                      </Text>
                      <Flex alignItems="center" mb={2}>
                        <Avatar
                          size="xs"
                          src={session.instructor.avatarUrl}
                          mr={2}
                        />
                        <Text fontSize="sm" color="gray.600">
                          {session.instructor.name}
                        </Text>
                      </Flex>
                      <Heading as="h3" size="sm" fontWeight="medium" color="gray.800">
                        {session.title}
                      </Heading>
                      <HStack mt={2} fontSize="xs" color="gray.500">
                        <HStack>
                          <CalendarIcon boxSize={3} />
                          <Text>{session.date}</Text>
                        </HStack>
                        <HStack ml={4}>
                          <TimeIcon boxSize={3} />
                          <Text>{session.time}</Text>
                        </HStack>
                      </HStack>
                    </Box>
                  </Flex>
                  <Flex flexDirection="column" alignItems="flex-end" justifyContent="space-between">
                    {session.duration && (
                      <Text fontSize="sm" color="gray.500">
                        {session.duration}
                      </Text>
                    )}
                    <Button size="sm" colorScheme="blue" borderRadius="full">
                      Join
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Last viewed */}
        <Box width="100%">
          <Heading as="h2" size="md" fontWeight="medium" color="gray.700" mb={4}>
            Last Viewed
          </Heading>
          <SimpleGrid columns={3} spacing={4}>
            {lastViewed.map((item) => (
              <Box 
                key={item.id} 
                bg={cardBg} 
                p={4} 
                borderRadius="lg" 
                boxShadow="sm"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "md"
                }}
              >
                <Flex mb={3}>
                  <Flex
                    bg="blue.500"
                    color="white"
                    h="24px"
                    w="24px"
                    borderRadius="md"
                    fontSize="xs"
                    alignItems="center"
                    justifyContent="center"
                    mr={2}
                  >
                    {item.type === 'Course' ? 'C' : 'S'}
                  </Flex>
                  <Text fontSize="xs" color="gray.500">
                    {item.type}
                  </Text>
                  {item.sessionNumber && (
                    <Badge ml="auto" bg="yellow.100" color="yellow.600" fontSize="xs">
                      {item.sessionNumber} Session
                    </Badge>
                  )}
                </Flex>
                <Text color="gray.800" fontSize="sm" mb={3}>
                  {item.title}
                </Text>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="xs" color="gray.500">
                    Class Progress : {item.progress}%
                  </Text>
                  <Link to={`/course/${item.id}`}>
                    <Button size="sm" variant="outline" colorScheme="gray">
                      Check
                    </Button>
                  </Link>
                </Flex>
                <Progress
                  value={item.progress}
                  size="xs"
                  mt={2}
                  colorScheme="green"
                  borderRadius="full"
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Carousel dots */}
        <HStack justify="center" mt={6} spacing={1}>
          <Circle size="8px" bg="blue.500" />
          <Circle size="8px" bg="gray.300" />
          <Circle size="8px" bg="gray.300" />
        </HStack>
      </Box>
    </Box>
  );
};

export default Dashboard;