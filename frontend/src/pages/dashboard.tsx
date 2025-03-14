import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  InfoIcon,
  AddIcon,
  CalendarIcon,
  TimeIcon,
  ChevronDownIcon
} from '@chakra-ui/icons';

// Component interfaces
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
  month: number;
  year: number;
}

interface Activity {
  id: string;
  time: string;
  category: string;
  title: string;
  date: string;
}

interface Instructor {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Session {
  id: string;
  courseId: string;
  category: string;
  instructor: Instructor;
  title: string;
  date: string;
  time: string;
  duration?: string;
  icon?: string;
}

interface CourseView {
  id: string;
  type: 'Course' | 'Session';
  sessionNumber: string;
  title: string;
  progress: number;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

const Dashboard: React.FC = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  
  // State for news carousel
  const [newsCarouselPage, setNewsCarouselPage] = useState(0);
  
  // For Add Activity modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newActivity, setNewActivity] = useState({
    title: '',
    category: '',
    time: ''
  });
  
  // For calendar dates
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // For semester selection
  const [selectedSemester, setSelectedSemester] = useState('2025 Even Semester');
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
  
  // Activities data for the day
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      time: '09:00',
      category: 'Digital Banking',
      title: 'History and Evolution of Digital Banking',
      date: '11 March 2025'
    },
    {
      id: '2',
      time: '11:00',
      category: 'IT Service & Risk Management',
      title: 'Introduction to IT Service Management (ITSM): Basic concepts...',
      date: '11 March 2025'
    },
    {
      id: '3',
      time: '13:45',
      category: 'User Experience Research & Design',
      title: 'UX Research Methods: User interviews, usability testing...',
      date: '11 March 2025'
    },
    {
      id: '4',
      time: '15:30',
      category: 'Introduction to Database Systems',
      title: 'Basic Database Concepts: Differences between relational...',
      date: '11 March 2025'
    }
  ]);

  // Upcoming sessions data
  const upcomingSessions: Session[] = [
    {
      id: '1',
      courseId: '2',
      category: 'IT Service & Risk Management',
      instructor: {
        id: '101',
        name: 'Wade Warren',
        avatarUrl: 'https://placehold.co/24x24?text=WW'
      },
      title: 'Auditing Information Technology-Based Processes',
      date: '11 March 2025',
      time: '09:00 - 10:45',
      icon: 'IT'
    },
    {
      id: '2',
      courseId: '1',
      category: 'IT Service & Risk Management',
      instructor: {
        id: '102',
        name: 'Devon Lane',
        avatarUrl: 'https://placehold.co/24x24?text=DL'
      },
      title: 'Introduction to IT Service Management (ITSM): Basic concepts, ITSM frameworks (ITIL, COBIT, ISO 20000).',
      date: '11 March 2025',
      time: '11:00 - 12:45',
      duration: '01 : 44 : 12',
      icon: 'IT'
    },
    {
      id: '3',
      courseId: '3',
      category: 'User Experience Research & Design',
      instructor: {
        id: '103',
        name: 'Jacob Jones',
        avatarUrl: 'https://placehold.co/24x24?text=JJ'
      },
      title: 'UX Research Methods: User interviews, usability testing, eye-tracking, A/B testing',
      date: '11 March 2025',
      time: '13:45 - 15:30',
      duration: '03 : 29 : 12',
      icon: 'IT'
    }
  ];

  // Last viewed courses - just show 3 static items
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
      title: 'Digital Banking',
      progress: 75
    },
    {
      id: '3',
      type: 'Course',
      sessionNumber: '13',
      title: 'Introduction to Database Systems',
      progress: 30
    }
  ];
  
  // News banner items
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Campus Event',
      description: 'Upcoming Career Fair on March 20th. Meet representatives from top tech companies.',
      date: '5 March 2025',
      imageUrl: 'https://placehold.co/600x400?text=Career+Fair'
    },
    {
      id: '2',
      title: 'New Course Available',
      description: 'Introducing AI for Beginners course starting next month.',
      date: '2 March 2025',
      imageUrl: 'https://placehold.co/600x400?text=AI+Course'
    },
    {
      id: '3',
      title: 'Library Update',
      description: 'Extended library hours now available during exam week.',
      date: '1 March 2025',
      imageUrl: 'https://placehold.co/600x400?text=Library+Hours'
    }
  ];
  
  // Initialize calendar days
  React.useEffect(() => {
    generateCalendarDays(selectedDate);
  }, [selectedDate]);
  
  // Generate calendar days based on selected date
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDate = date.getDate();
    
    // Get the first day of the week of the current date
    const tempDate = new Date(year, month, currentDate);
    const day = tempDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Create an array of 7 days (1 week) centered around the current date as much as possible
    const days: CalendarDay[] = [];
    
    // If the current day is not Sunday, add days before
    for (let i = day; i > 0; i--) {
      const prevDate = new Date(year, month, currentDate - i);
      days.push({
        day: getDayAbbreviation(prevDate.getDay()),
        date: prevDate.getDate(),
        month: prevDate.getMonth(),
        year: prevDate.getFullYear(),
        isActive: false
      });
    }
    
    // Add current day
    days.push({
      day: getDayAbbreviation(tempDate.getDay()),
      date: tempDate.getDate(),
      month: tempDate.getMonth(),
      year: tempDate.getFullYear(),
      isActive: true
    });
    
    // Add days after current day to complete the week
    for (let i = 1; i < 7 - day; i++) {
      const nextDate = new Date(year, month, currentDate + i);
      days.push({
        day: getDayAbbreviation(nextDate.getDay()),
        date: nextDate.getDate(),
        month: nextDate.getMonth(),
        year: nextDate.getFullYear(),
        isActive: false
      });
    }
    
    setCalendarDays(days);
  };
  
  // Get day abbreviation from day number
  const getDayAbbreviation = (day: number): string => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return days[day];
  };
  
  // Format date for display
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Change date
  const changeDate = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + delta);
    setSelectedDate(newDate);
  };
  
  // Select a specific date
  const selectDate = (day: CalendarDay) => {
    const newDate = new Date(day.year, day.month, day.date);
    setSelectedDate(newDate);
  };
  
  // Handle adding a new activity
  const handleAddActivity = () => {
    if (newActivity.title && newActivity.category && newActivity.time) {
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      const newActivityItem: Activity = {
        id: (activities.length + 1).toString(),
        time: newActivity.time,
        category: newActivity.category,
        title: newActivity.title,
        date: formattedDate
      };
      
      setActivities([...activities, newActivityItem]);
      setNewActivity({ title: '', category: '', time: '' });
      onClose();
    }
  };
  
  // Handle news carousel navigation
  const totalNewsPages = newsItems.length;
  
  const nextNewsPage = () => {
    setNewsCarouselPage((prev) => (prev + 1) % totalNewsPages);
  };
  
  const prevNewsPage = () => {
    setNewsCarouselPage((prev) => (prev - 1 + totalNewsPages) % totalNewsPages);
  };
  
  // New function to handle session join
  const handleJoinSession = (session: Session) => {
    // Navigate to the course session page
    navigate(`/course/${session.courseId}/session/${session.id}`);
  };
  
  // Auto advance news carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextNewsPage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Generate full monthly calendar for date picker
  const generateMonthCalendar = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Last day of month
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    // Previous month's last date
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    
    const calendarRows: CalendarDay[][] = [];
    let calendarDaysInRow: CalendarDay[] = [];
    
    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthLastDate - firstDay + i + 1;
      calendarDaysInRow.push({
        day: '',
        date: day,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isActive: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDate; i++) {
      const isCurrentDate = i === selectedDate.getDate() && 
                           month === selectedDate.getMonth() && 
                           year === selectedDate.getFullYear();
      
      calendarDaysInRow.push({
        day: '',
        date: i,
        month: month,
        year: year,
        isActive: isCurrentDate
      });
      
      if (calendarDaysInRow.length === 7) {
        calendarRows.push([...calendarDaysInRow]);
        calendarDaysInRow = [];
      }
    }
    
    // Next month days
    if (calendarDaysInRow.length > 0) {
      const remainingDays = 7 - calendarDaysInRow.length;
      for (let i = 1; i <= remainingDays; i++) {
        calendarDaysInRow.push({
          day: '',
          date: i,
          month: month + 1,
          year: month === 11 ? year + 1 : year,
          isActive: false
        });
      }
      calendarRows.push([...calendarDaysInRow]);
    }
    
    return calendarRows;
  };
  
  // Get month name
  const getMonthName = (month: number): string => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  };
  
  // Change month in calendar
  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  return (
    <Box maxW="100vw" overflowX="hidden">
      {/* Header section */}
      <Box bg="white" pt={4} pb={4} px={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={4} maxW="100%">
          <Box>
            <Heading as="h1" size="lg" color="gray.800">
              Good Morning, Anggara <Text as="span">👋</Text>
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Welcome to LMS, check your priority learning.
            </Text>
          </Box>
          
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

        {/* Learning progress and calendar */}
        <Flex mb={6} flexDirection={{ base: 'column', md: 'row' }} maxW="100%">
          <Box
            flex="1"
            bg={cardBg}
            p={4}
            borderRadius="lg"
            boxShadow="sm"
            mr={{ base: 0, md: 4 }}
            mb={{ base: 4, md: 0 }}
          >
            <Flex justifyContent="space-between" flexWrap="wrap" mb={4}>
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
                <Stat textAlign="center" mx={2}>
                  <StatNumber color="yellow.500">{userStats.points}</StatNumber>
                  <StatLabel fontSize="xs" color="gray.500">Point</StatLabel>
                </Stat>
                <Stat textAlign="center" mx={2}>
                  <StatNumber color="orange.400">{userStats.certificates}</StatNumber>
                  <StatLabel fontSize="xs" color="gray.500">Certificates</StatLabel>
                </Stat>
                <Stat textAlign="center" mx={2}>
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
              flexWrap="wrap"
            >
              <HStack mb={{ base: 1, md: 0 }}>
                <Box w="2" h="2" bg="green.600" borderRadius="full" />
                <Text>Passed</Text>
              </HStack>
              <HStack mb={{ base: 1, md: 0 }}>
                <Box w="2" h="2" bg="green.400" borderRadius="full" />
                <Text>In Progress</Text>
              </HStack>
              <HStack mb={{ base: 1, md: 0 }}>
                <Box w="2" h="2" bg="red.500" borderRadius="full" />
                <Text>Overdue</Text>
              </HStack>
              <HStack mb={{ base: 1, md: 0 }}>
                <Box w="2" h="2" bg="yellow.400" borderRadius="full" />
                <Text>Failed</Text>
              </HStack>
              <HStack mb={{ base: 1, md: 0 }}>
                <Box w="2" h="2" bg="gray.400" borderRadius="full" />
                <Text>Not Started</Text>
              </HStack>
            </Flex>
          </Box>

          {/* Calendar panel */}
          <Box width={{ base: "100%", md: "300px" }} bg={cardBg} borderRadius="lg" boxShadow="sm" p={4}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Flex alignItems="center">
                <Text color="gray.600">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                
                {/* Calendar icon for full month view */}
                <Popover
                  isOpen={isCalendarOpen}
                  onClose={() => setIsCalendarOpen(false)}
                  placement="bottom-start"
                >
                  <PopoverTrigger>
                    <IconButton
                      aria-label="Open calendar"
                      icon={<CalendarIcon />}
                      size="sm"
                      variant="ghost"
                      ml={2}
                      onClick={() => setIsCalendarOpen(true)}
                    />
                  </PopoverTrigger>
                  <PopoverContent width="280px">
                    <PopoverHeader fontWeight="semibold">
                      <Flex justifyContent="space-between" alignItems="center">
                        <IconButton
                          aria-label="Previous month"
                          icon={<ChevronLeftIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={() => changeMonth(-1)}
                        />
                        <Text>
                          {getMonthName(selectedDate.getMonth())} {selectedDate.getFullYear()}
                        </Text>
                        <IconButton
                          aria-label="Next month"
                          icon={<ChevronRightIcon />}
                          size="sm"
                          variant="ghost"
                          onClick={() => changeMonth(1)}
                        />
                      </Flex>
                    </PopoverHeader>
                    <PopoverBody p={2}>
                      <Grid templateColumns="repeat(7, 1fr)" mb={2}>
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                          <GridItem key={day} textAlign="center" py={1}>
                            <Text fontSize="xs" fontWeight="bold" color="gray.500">
                              {day}
                            </Text>
                          </GridItem>
                        ))}
                      </Grid>
                      
                      {generateMonthCalendar(selectedDate).map((week, weekIndex) => (
                        <Grid key={weekIndex} templateColumns="repeat(7, 1fr)">
                          {week.map((day, dayIndex) => (
                            <GridItem key={`${weekIndex}-${dayIndex}`} textAlign="center" py={1}>
                              <Circle
                                size="30px"
                                bg={day.isActive ? 'blue.500' : 'transparent'}
                                color={
                                  day.isActive ? 'white' : 
                                  day.month !== selectedDate.getMonth() ? 'gray.400' : 'gray.700'
                                }
                                cursor="pointer"
                                _hover={{
                                  bg: day.isActive ? 'blue.500' : 'blue.100'
                                }}
                                onClick={() => {
                                  selectDate(day);
                                  setIsCalendarOpen(false);
                                }}
                              >
                                {day.date}
                              </Circle>
                            </GridItem>
                          ))}
                        </Grid>
                      ))}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
              
              <HStack>
                <IconButton
                  aria-label="Previous day"
                  icon={<ChevronLeftIcon />}
                  size="xs"
                  variant="ghost"
                  onClick={() => changeDate(-1)}
                />
                <IconButton
                  aria-label="Next day"
                  icon={<ChevronRightIcon />}
                  size="xs"
                  variant="ghost"
                  onClick={() => changeDate(1)}
                />
              </HStack>
            </Flex>

            {/* Days of week */}
            <Grid templateColumns="repeat(7, 1fr)" mb={2}>
              {calendarDays.map((day, index) => (
                <GridItem key={index} textAlign="center">
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    {day.day}
                  </Text>
                  <Circle
                    size="24px"
                    bg={day.isActive ? 'blue.500' : 'transparent'}
                    color={day.isActive ? 'white' : 'gray.700'}
                    mx="auto"
                    cursor="pointer"
                    onClick={() => selectDate(day)}
                    _hover={{
                      bg: day.isActive ? 'blue.500' : 'blue.100'
                    }}
                  >
                    {day.date}
                  </Circle>
                </GridItem>
              ))}
            </Grid>

            {/* Today's activities with heading */}
            <Box mt={6}>
              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Flex alignItems="center">
                  <Text fontWeight="medium" color="gray.700">Activities</Text>
                  <Text ml={2} color="gray.500" fontSize="sm">
                    {formatDate(selectedDate)}
                  </Text>
                </Flex>
                <Button
                  leftIcon={<AddIcon />}
                  variant="ghost"
                  size="xs"
                  colorScheme="blue"
                  onClick={onOpen}
                >
                  Add Activity
                </Button>
              </Flex>

              {/* Fixed height activity list without nested scrollbar */}
              <Box maxH="180px">
                {activities
                  .filter(activity => activity.date === selectedDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }))
                  .map((activity) => (
                    <Flex key={activity.id} mb={4}>
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
                
                {activities.filter(activity => activity.date === selectedDate.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })).length === 0 && (
                  <Box textAlign="center" py={4} color="gray.400">
                    <Text>No activities for this day</Text>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* Upcoming sessions section */}
      <Box px={4} pb={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading as="h2" size="md" fontWeight="medium" color="gray.700">
            Upcoming session
          </Heading>
          <Button size="sm" variant="outline" colorScheme="gray">
            Today
          </Button>
        </Flex>

        {/* Session cards without nesting */}
        <VStack spacing={4} align="stretch" mb={6} maxW="100%">
          {upcomingSessions.map((session) => (
            <Box
              key={session.id}
              bg={cardBg}
              p={4}
              borderRadius="lg"
              boxShadow="sm"
            >
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
                  flexShrink={0}
                >
                  {session.icon}
                </Flex>
                
                <Box flex="1" pr={4} minW={0}>
                  <Text fontSize="xs" color="gray.500" mb={1}>
                    {session.category}
                  </Text>
                  <Flex alignItems="center" mb={2}>
                    <Avatar
                      size="xs"
                      src={session.instructor.avatarUrl}
                      mr={2}
                      name={session.instructor.name}
                    />
                    <Text fontSize="sm" color="gray.600" noOfLines={1}>
                      
                      {session.instructor.name}
                      </Text>
                    </Flex>
                    <Heading as="h3" size="sm" fontWeight="medium" color="gray.800" noOfLines={2}>
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
                  
                  {/* Right side with duration and join button */}
                  <Flex flexDirection="column" justifyContent="flex-end" alignItems="flex-end" minW="110px" flexShrink={0}>
                    {session.duration && (
                      <Text fontSize="sm" color="gray.500" mb={2}>
                        {session.duration}
                      </Text>
                    )}
                    <Button 
                      size="sm" 
                      colorScheme="blue" 
                      borderRadius="full"
                      onClick={() => handleJoinSession(session)}
                    >
                      Join
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </VStack>
  
          {/* Last viewed and News Banner section - side by side */}
          <Flex mb={6} flexDirection={{ base: "column", lg: "row" }} gap={6} maxW="100%">
            {/* Last viewed cards */}
            <Box flex={{ base: "1", lg: "7" }}>
              <Heading as="h2" size="md" fontWeight="medium" color="gray.700" mb={4}>
                Last Viewed
              </Heading>
              
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
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
                        flexShrink={0}
                      >
                        {item.type === 'Course' ? 'C' : 'S'}
                      </Flex>
                      <Text fontSize="xs" color="gray.500">
                        {item.type}
                      </Text>
                      {item.sessionNumber && (
                        <Badge ml="auto" bg="yellow.100" color="yellow.600" fontSize="xs">
                          {item.sessionNumber} SESSION
                        </Badge>
                      )}
                    </Flex>
                    <Text color="gray.800" fontSize="sm" mb={3} noOfLines={2}>
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
            
            {/* News Banner with Carousel */}
            <Box flex={{ base: "1", lg: "5" }} maxW="100%">
              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Heading as="h2" size="md" fontWeight="medium" color="gray.700">
                  Announcements
                </Heading>
                <HStack>
                  <IconButton
                    aria-label="Previous news"
                    icon={<ChevronLeftIcon />}
                    size="sm"
                    variant="ghost"
                    onClick={prevNewsPage}
                  />
                  <IconButton
                    aria-label="Next news"
                    icon={<ChevronRightIcon />}
                    size="sm"
                    variant="ghost"
                    onClick={nextNewsPage}
                  />
                </HStack>
              </Flex>
              
              {/* Simple fade-transition news carousel */}
              <Box 
                position="relative" 
                height={{ base: "250px", md: "280px" }}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
              >
                {newsItems.map((news, index) => (
                  <Box
                    key={news.id}
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    opacity={newsCarouselPage === index ? 1 : 0}
                    zIndex={newsCarouselPage === index ? 1 : 0}
                    transition="opacity 0.5s ease-in-out"
                    bg="white"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Box 
                      bgImage={`url(${news.imageUrl})`}
                      bgSize="cover"
                      bgPosition="center"
                      h="60%"
                      position="relative"
                    >
                      {/* Gradient overlay for better text readability */}
                      <Box 
                        position="absolute" 
                        bottom="0" 
                        left="0" 
                        right="0" 
                        h="50%" 
                        bgGradient="linear(to-t, rgba(0,0,0,0.7), rgba(0,0,0,0))"
                      />
                    </Box>
                    
                    <Box p={4}>
                      <Heading size="md" mb={2}>{news.title}</Heading>
                      <Text fontSize="sm" color="gray.600" mb={2} noOfLines={1}>
                        {news.description}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {news.date}
                      </Text>
                    </Box>
                    
                    <Button 
                      position="absolute" 
                      bottom="4" 
                      right="4" 
                      size="sm" 
                      colorScheme="blue"
                    >
                      Read More
                    </Button>
                  </Box>
                ))}
                
                {/* Carousel dots */}
                <HStack 
                  position="absolute" 
                  bottom="4" 
                  left="0" 
                  right="0" 
                  justify="center" 
                  spacing={1}
                  zIndex={2}
                >
                  {newsItems.map((_, index) => (
                    <Circle 
                      key={index} 
                      size="8px" 
                      bg={newsCarouselPage === index ? 'blue.500' : 'white'} 
                      cursor="pointer"
                      onClick={() => setNewsCarouselPage(index)}
                      boxShadow="md"
                    />
                  ))}
                </HStack>
              </Box>
            </Box>
          </Flex>
        </Box>
        
        {/* Add Activity Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Activity</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input 
                  placeholder="Activity title" 
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                />
              </FormControl>
              
              <FormControl mb={4}>
                <FormLabel>Category</FormLabel>
                <Select 
                  placeholder="Select category" 
                  value={newActivity.category}
                  onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
                >
                  <option value="Digital Banking">Digital Banking</option>
                  <option value="IT Service & Risk Management">IT Service & Risk Management</option>
                  <option value="User Experience Research & Design">User Experience Research & Design</option>
                  <option value="Introduction to Database Systems">Introduction to Database Systems</option>
                </Select>
              </FormControl>
              
              <FormControl mb={4}>
                <FormLabel>Time</FormLabel>
                <Input 
                  type="time" 
                  value={newActivity.time}
                  onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                />
              </FormControl>
              
              <FormControl mb={4}>
                <FormLabel>Date</FormLabel>
                <Input 
                  value={formatDate(selectedDate)} 
                  isReadOnly 
                  bg="gray.50"
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  To change the date, select a different date from the calendar
                </Text>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleAddActivity}>
                Add Activity
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  };
  
  export default Dashboard;