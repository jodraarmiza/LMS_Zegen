import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
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
} from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  InfoIcon,
  AddIcon,
  CalendarIcon,
  TimeIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import {
  BsAwardFill,
  BsJournalBookmark,
  BsBook,
  BsLaptop,
  BsBank,
  BsShieldLock,
} from "react-icons/bs";
import Calendar from "../../components/Calendar";
import { ReactNode } from "react";

// Component interfaces
interface ProgressData {
  total: number;
  passed: number;
  inProgress: number;
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
  icon?: ReactNode;
  mode: "Online" | "Offline";
}

interface CourseView {
  id: string;
  type: "Course" | "Session";
  sessionNumber: string;
  title: string;
  progress: number;
  mode: "Online" | "Offline"; 
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}
const IconGPA = AiFillSafetyCertificate as React.FC;
const IconCertificate = BsAwardFill as React.FC;
const IconBook1 = BsJournalBookmark as React.FC;
const IconBook2 = BsBook as React.FC;
const IconBook3 = BsLaptop as React.FC;
const IconBook4 = BsBank as React.FC;
const IconBook5 = BsShieldLock as React.FC;
const IconPoint = FaCoins as React.FC;
const Dashboard: React.FC = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const handleCalendarDoubleClick = () => {
    navigate("/schedule");
  };

  // State for news carousel
  const [newsCarouselPage, setNewsCarouselPage] = useState(0);

  // For Add Activity modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newActivity, setNewActivity] = useState({
    title: "",
    category: "",
    time: "",
  });

  // For calendar dates
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const onDoubleClick = () => {
    navigate("/schedule");
  };
  // For semester selection
  const [selectedSemester, setSelectedSemester] =
    useState("2025 Even Semester");
  const semesters = [
    "2025 Even Semester",
    "2024 Odd Semester",
    "2024 Even Semester",
    "2023 Odd Semester",
  ];

  // Define colors based on colorMode
  const cardBg = colorMode === "light" ? "white" : "  .700";
  const progressTrackColor = colorMode === "light" ? "gray.200" : "gray.600";

  // Dashboard data
  const progressData: ProgressData = {
    total: 100,
    passed: 30,
    inProgress: 15,
    failed: 30,
    notStarted: 25,
  };

  const userStats: UserStats = {
    points: 100,
    certificates: 12,
    gpa: "3,72",
  };

  // Activities data for the day
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      time: "09:00",
      category: "Digital Banking",
      title: "History and Evolution of Digital Banking",
      date: "11 March 2025",
    },
    {
      id: "2",
      time: "11:00",
      category: "IT Service & Risk Management",
      title: "Introduction to IT Service Management (ITSM): Basic concepts...",
      date: "11 March 2025",
    },
    {
      id: "3",
      time: "13:45",
      category: "User Experience Research & Design",
      title: "UX Research Methods: User interviews, usability testing...",
      date: "11 March 2025",
    },
    {
      id: "4",
      time: "15:30",
      category: "Introduction to Database Systems",
      title: "Basic Database Concepts: Differences between relational...",
      date: "11 March 2025",
    },
    {
      id: "5",
      time: "15:30",
      category: "Introduction to Database Systems",
      title: "Basic Database Concepts: Differences between relational...",
      date: "11 March 2025",
    },
    {
      id: "6",
      time: "15:30",
      category: "Introduction to Database Systems",
      title: "Basic Database Concepts: Differences between relational...",
      date: "11 March 2025",
    },
    {
      id: "7",
      time: "15:30",
      category: "Introduction to Database Systems",
      title: "Basic Database Concepts: Differences between relational...",
      date: "11 March 2025",
    },
  ]);

  // Upcoming sessions data
  // Modified upcomingSessions array with some sessions happening now
  const upcomingSessions: Session[] = [
    {
      id: "1",
      courseId: "2",
      category: "IT Service & Risk Management",
      instructor: {
        id: "101",
        name: "Wade Warren",
        avatarUrl: "https://placehold.co/24x24?text=WW",
      },
      title: "Auditing Information Technology-Based Processes",
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }), // Today's date
      time: `${new Date().getHours()}:00 - ${new Date().getHours() + 1}:45`, // Current hour to make it active
      icon: <IconBook1 />,
      mode: "Offline",
    },
    {
      id: "2",
      courseId: "1",
      category: "IT Service & Risk Management",
      instructor: {
        id: "102",
        name: "Devon Lane",
        avatarUrl: "https://placehold.co/24x24?text=DL",
      },
      title:
        "Introduction to IT Service Management (ITSM): Basic concepts, ITSM frameworks (ITIL, COBIT, ISO 20000).",
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }), // Today's date
      time: `${new Date().getHours() + 1}:00 - ${new Date().getHours() + 2}:45`, // Next hour for upcoming
      icon: <IconBook2 />,
      mode: "Online",
    },
    {
      id: "3",
      courseId: "3",
      category: "User Experience Research & Design",
      instructor: {
        id: "103",
        name: "Jacob Jones",
        avatarUrl: "https://placehold.co/24x24?text=JJ",
      },
      title:
        "UX Research Methods: User interviews, usability testing, eye-tracking, A/B testing",
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }), // Today's date
      time: `${new Date().getHours() + 2}:00 - ${new Date().getHours() + 3}:45`, // 2 hours later for upcoming
      icon: <IconBook3 />,
      mode: "Offline",
    },
    {
      id: "4",
      courseId: "4",
      category: "Digital Banking",
      instructor: {
        id: "104",
        name: "Esther Howard",
        avatarUrl: "https://placehold.co/24x24?text=EH",
      },
      title: "Introduction to Digital Banking Technologies",
      date: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }), // Tomorrow's date
      time: "10:00 - 11:45",
      icon: <IconBook4 />,
      mode: "Online",
    },
    {
      id: "5",
      courseId: "5",
      category: "Cybersecurity Fundamentals",
      instructor: {
        id: "105",
        name: "Cameron Williamson",
        avatarUrl: "https://placehold.co/24x24?text=CW",
      },
      title: "Network Security and Threat Modeling",
      date: new Date(
        new Date().setDate(new Date().getDate() + 2)
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }), // Day after tomorrow
      time: "13:00 - 14:45",
      icon: <IconBook5 />,
      mode: "Offline",
    },
  ];
  

  // Last viewed courses - just show 3 static items
  const lastViewed: CourseView[] = [
    {
      id: "1",
      type: "Course",
      sessionNumber: "13",
      title: "User Experience Research & Design",
      progress: 50,
      mode: "Online",
    },
    {
      id: "2",
      type: "Course",
      sessionNumber: "13",
      title: "Digital Banking",
      progress: 75,
      mode: "Offline",
    },
    {
      id: "3",
      type: "Course",
      sessionNumber: "13",
      title: "Introduction to Database Systems",
      progress: 30,
      mode: "Online",
    },
  ];

  // News banner items
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "Campus Event",
      description:
        "Upcoming Career Fair on March 20th. Meet representatives from top tech companies.",
      date: "5 March 2025",
      imageUrl: "https://placehold.co/600x400?text=Career+Fair",
    },
    {
      id: "2",
      title: "New Course Available",
      description: "Introducing AI for Beginners course starting next month.",
      date: "2 March 2025",
      imageUrl: "https://placehold.co/600x400?text=AI+Course",
    },
    {
      id: "3",
      title: "Library Update",
      description: "Extended library hours now available during exam week.",
      date: "1 March 2025",
      imageUrl: "https://placehold.co/600x400?text=Library+Hours",
    },
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
        isActive: false,
      });
    }

    // Add current day
    days.push({
      day: getDayAbbreviation(tempDate.getDay()),
      date: tempDate.getDate(),
      month: tempDate.getMonth(),
      year: tempDate.getFullYear(),
      isActive: true,
    });

    // Add days after current day to complete the week
    for (let i = 1; i < 7 - day; i++) {
      const nextDate = new Date(year, month, currentDate + i);
      days.push({
        day: getDayAbbreviation(nextDate.getDay()),
        date: nextDate.getDate(),
        month: nextDate.getMonth(),
        year: nextDate.getFullYear(),
        isActive: false,
      });
    }

    setCalendarDays(days);
  };

  // Get day abbreviation from day number
  const getDayAbbreviation = (day: number): string => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return days[day];
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
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
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const newActivityItem: Activity = {
        id: (activities.length + 1).toString(),
        time: newActivity.time,
        category: newActivity.category,
        title: newActivity.title,
        date: formattedDate,
      };

      setActivities([...activities, newActivityItem]);
      setNewActivity({ title: "", category: "", time: "" });
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

  const [currentTime, setCurrentTime] = useState(new Date());
  // Add this effect for the live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const isSessionActive = (session: Session): boolean => {
    const currentDate = currentTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Check if the session is today
    if (session.date !== currentDate) {
      return false;
    }

    // Parse session time (assuming format like "09:00 - 10:45")
    const [startTime, endTime] = session.time.split(" - ");
    const [startHour, startMinute] = startTime
      .split(":")
      .map((num: string) => parseInt(num));
    const [endHour, endMinute] = endTime
      .split(":")
      .map((num: string) => parseInt(num));

    // Create Date objects for start and end times
    const sessionStart = new Date(currentTime);
    sessionStart.setHours(startHour, startMinute, 0, 0);

    const sessionEnd = new Date(currentTime);
    sessionEnd.setHours(endHour, endMinute, 0, 0);

    // Check if current time is between start and end
    return currentTime >= sessionStart && currentTime <= sessionEnd;
  };
  const getTimeUntilSession = (session: Session): string => {
    const currentDate = currentTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // If session is today
    if (session.date === currentDate) {
      // Parse session start time
      const [startTime] = session.time.split(" - ");
      const [startHour, startMinute] = startTime
        .split(":")
        .map((num: string) => parseInt(num));

      // Create Date object for start time
      const sessionStart = new Date(currentTime);
      sessionStart.setHours(startHour, startMinute, 0, 0);

      // If session is in the future today
      if (sessionStart > currentTime) {
        const diffMs = sessionStart.getTime() - currentTime.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;

        if (hours > 0) {
          return `Starts in ${hours}h ${mins}m`;
        } else {
          return `Starts in ${mins}m`;
        }
      } else {
        return "Ended";
      }
    }

    // If session is on a different day
    return "Upcoming";
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
        day: "",
        date: day,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isActive: false,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDate; i++) {
      const isCurrentDate =
        i === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      calendarDaysInRow.push({
        day: "",
        date: i,
        month: month,
        year: year,
        isActive: isCurrentDate,
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
          day: "",
          date: i,
          month: month + 1,
          year: month === 11 ? year + 1 : year,
          isActive: false,
        });
      }
      calendarRows.push([...calendarDaysInRow]);
    }

    return calendarRows;
  };

  // Get month name
  const getMonthName = (month: number): string => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  };

  // Change month in calendar
  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box maxW="100vw" overflowX="hidden">
      {/* Main content with Sidebar */}
      <Flex>
        {/* Main content area */}
        <Box flex="1" overflow="auto" bg="gray.50" minH="calc(100vh - 64px)">
          {/* Header section */}
          <Box bg="white" pt={4} pb={2} px={6}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              maxW="100%"
            >
              <Box>
                <Heading as="h1" size="lg" color="gray.800">
                  Good Morning, Student <Text as="span">👋</Text>
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
            <Flex
              mb={6}
              flexDirection={{ base: "column", md: "row" }}
              maxW="100%"
              gap={4}
            >
              <Box
                flex="1"
                bg={cardBg}
                p={4}
                borderRadius="lg"
                boxShadow="sm"
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
                </Flex>

                {/* Progress bar */}
                <Box position="relative" height="8px" mb={2}>
                  <Progress
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
                    <Box width={`${progressData.passed}%`} bg="green.600"borderLeftRadius="full"/>
                    <Box width={`${progressData.inProgress}%`} bg="blue.500" />
                    <Box width={`${progressData.failed}%`} bg="red.500" />
                    <Box width={`${progressData.notStarted}%`} bg="gray.400"
                      borderRightRadius="full"
                    />
                  </Flex>
                </Box>

                {/* Percentages below bar */}
                <Flex
                  justifyContent="space-between"
                  mb={3}
                  fontSize="xs"
                  fontWeight="bold"
                >
                  <Box width={`${progressData.passed}%`} display="flex">
                    <Text>{progressData.passed}%</Text>
                  </Box>
                  <Box
                    width={`${progressData.inProgress}%`}
                    display="flex"
                    justifyContent="flex"
                  >
                    <Text>{progressData.inProgress}%</Text>
                  </Box>
                  <Box
                    width={`${progressData.failed}%`}
                    display="flex"
                    justifyContent="flex"
                  >
                    <Text>{progressData.failed}%</Text>
                  </Box>
                  <Box
                    width={`${progressData.notStarted}%`}
                    display="flex"
                    justifyContent="flex"
                  >
                    <Text>{progressData.notStarted}%</Text>
                  </Box>
                </Flex>

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
                    <Box w="2" h="2" bg="blue.500" borderRadius="full" />
                    <Text>In Progress</Text>
                  </HStack>
                  <HStack mb={{ base: 1, md: 0 }}>
                    <Box w="2" h="2" bg="red.400" borderRadius="full" />
                    <Text>Failed</Text>
                  </HStack>
                  <HStack mb={{ base: 1, md: 0 }}>
                    <Box w="2" h="2" bg="gray.400" borderRadius="full" />
                    <Text>Up Coming</Text>
                  </HStack>
                </Flex>
              </Box>

              <Flex direction="column" width={{ base: "100%", md: "500px" }}>
                <Box bg={cardBg} borderRadius="lg" boxShadow="sm" p={2} mb={4}>
                  <StatGroup>
                    <Stat textAlign="center" mx={1}>
                      <Flex justify="center" align="center">
                        <Box fontSize="2xl" color="orange.400" mr={2}>
                          <IconPoint />
                        </Box>
                        <StatNumber color="black.400">
                          {userStats.points}
                        </StatNumber>
                      </Flex>
                      <StatLabel fontSize="xs" color="gray.500">
                        Point
                      </StatLabel>
                    </Stat>
                    <Stat textAlign="center" mx={2}>
                      <Flex justify="center" align="center">
                        <Box fontSize="2xl" color="orange.400" mr={1}>
                          <IconCertificate />
                        </Box>
                        <StatNumber color="black.400">
                          {userStats.certificates}
                        </StatNumber>
                      </Flex>
                      <StatLabel fontSize="xs" color="  gray.500">
                        Certificates
                      </StatLabel>
                    </Stat>
                    <Stat textAlign="center" mx={2}>
                      <Flex justify="center" align="center">
                        <Box fontSize="2xl" color="orange.400" mr={1}>
                          <IconGPA />
                        </Box>
                        <StatNumber color="black.400">
                          {userStats.gpa}
                        </StatNumber>
                      </Flex>
                      <StatLabel fontSize="xs" color="gray.500">
                        GPA
                      </StatLabel>
                    </Stat>
                  </StatGroup>
                </Box>
                {/* Calendar panel */}
                
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  cardBg={cardBg}
                  onDoubleClick={handleCalendarDoubleClick}
                />
              </Flex>
            </Flex>
          </Box>

          {/* Upcoming sessions and Activities section - side by side */}
          <Box px={6} pb={6}>
            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              gap={8}
              maxW="100%"
              mt={4}
            >
              {/* Upcoming sessions section */}
              <Box flex={{ base: "1", lg: "8" }}>
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Heading
                    as="h2"
                    size="md"
                    fontWeight="medium"
                    color="gray.700"
                  >
                    Upcoming session
                  </Heading>
                  <Button size="sm" variant="outline" colorScheme="gray">
                    Today
                  </Button>
                </Flex>

                {/* Session cards with custom scrollbar */}
                <Box
                  maxH="400px"
                  overflowY={upcomingSessions.length > 3 ? "auto" : "visible"}
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                      borderRadius: "8px",
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: `blue.500`,
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: `blue.600`,
                    },
                  }}
                >
                  <VStack spacing={4} align="stretch" maxW="100%">
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
                            bg="yellow.500"
                            color="gray.200"
                            h="40px"
                            w="40px"
                            borderRadius="md"
                            fontSize="2xl"
                            alignItems="center"
                            justifyContent="center"
                            mr={3}
                            flexShrink={0}
                          >
                            {session.icon}
                          </Flex>

                          <Box flex="1" pr={4} minW={0}>
                          <Flex alignItems="center" mb={1} flexWrap="wrap">
                            <Text fontSize="xs" color="gray.500" mr={2}>
                              {session.category}
                            </Text>
                            <Badge
                              colorScheme={session.mode === "Online" ? "blue" : "green"}
                              variant="solid"
                              fontSize="xs"
                            >
                              {session.mode === "Online" ? "🌐 Online" : "🏫 Offline"}
                            </Badge>
                          </Flex>
                            <Flex alignItems="center" mb={2}>
                              <Avatar
                                size="xs"
                                src={session.instructor.avatarUrl}
                                mr={2}
                                name={session.instructor.name}
                              />
                              <Text
                                fontSize="sm"
                                color="gray.600"
                                noOfLines={1}
                              >
                                {session.instructor.name}
                              </Text>
                            </Flex>
                            <Heading
                              as="h3"
                              size="sm"
                              fontWeight="medium"
                              color="gray.800"
                              noOfLines={2}
                            >
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
                          <Flex
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="flex-end"
                            minW="110px"
                            flexShrink={0}
                          >
                            {session.duration ? (
                              <Text fontSize="sm" color="gray.500">
                                {session.duration}
                              </Text>
                            ) : (
                              <>
                                {isSessionActive(session) ? (
                                  <Button
                                    size="sm"
                                    colorScheme="blue"
                                    borderRadius="full"
                                    onClick={() => handleJoinSession(session)}
                                  >
                                    Join
                                  </Button>
                                ) : (
                                  <Text fontSize="sm" color="gray.500">
                                    {getTimeUntilSession(session)}
                                  </Text>
                                )}
                              </>
                            )}
                          </Flex>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Box>

              {/* Activities section */}
              <Box
                width={{ base: "100%", lg: "500px" }}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="sm"
                p={4}
                alignSelf="flex-start"
              >
                <Flex justifyContent="space-between" alignItems="center" mb={3}>
                  <Heading
                    as="h2"
                    size="md"
                    fontWeight="medium"
                    color="gray.700"
                  >
                    Activities
                  </Heading>
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

                {/* Activity list */}
                <Box
                  maxH="350px"
                  overflowY="auto"
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                      borderRadius: "8px",
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: `blue.500`,
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: `blue.600`,
                    },
                  }}
                >
                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        09:00
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          Digital Banking
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          History and Evolution of Digital Banking
                        </Text>
                      </Box>
                    </Flex>
                  </Box>

                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        11:00
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          IT Service & Risk Management
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          Introduction to IT Service Management (ITSM): Basic...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>

                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        13:45
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          User Experience Research & Design
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          UX Research Methods: User interviews, usability
                          test...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        13:45
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          User Experience Research & Design
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          UX Research Methods: User interviews, usability
                          test...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        13:45
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          User Experience Research & Design
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          UX Research Methods: User interviews, usability
                          test...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        13:45
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          User Experience Research & Design
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          UX Research Methods: User interviews, usability
                          test...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        13:45
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          User Experience Research & Design
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          UX Research Methods: User interviews, usability
                          test...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        13:45
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          User Experience Research & Design
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          UX Research Methods: User interviews, usability
                          test...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box mb={4}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        13:45
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          User Experience Research & Design
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          UX Research Methods: User interviews, usability
                          test...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>

                  <Box mb={2}>
                    <Flex>
                      <Text width="50px" color="gray.500" fontSize="sm">
                        15:30
                      </Text>
                      <Box
                        ml={2}
                        pl={3}
                        borderLeftWidth="2px"
                        borderLeftColor="blue.500"
                      >
                        <Text fontSize="xs" color="gray.500">
                          Introduction to Database Systems
                        </Text>
                        <Text fontSize="sm" color="gray.700">
                          Basic Database Concepts: Differences between
                          relational...
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Flex>

            {/* Last viewed and News Banner section - side by side */}
            <Box px={6} pb={6}>
              <Flex
                flexDirection={{ base: "column", lg: "row" }}
                gap={6}
                maxW="100%"
                mt={4}
              >
                {/* Last viewed section */}
                <Box flex={{ base: "1", lg: "8" }}>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                  >
                    <Heading
                      as="h2"
                      size="md"
                      fontWeight="medium"
                      color="gray.700"
                    >
                      Last Viewed
                    </Heading>
                    <Button size="sm" variant="outline" colorScheme="gray">
                      View All
                    </Button>
                  </Flex>

                  {/* Last viewed cards with custom scrollbar */}
                  <Box
                    maxH="450px"
                    overflowY={lastViewed.length > 3 ? "auto" : "visible"}
                    sx={{
                      "&::-webkit-scrollbar": {
                        width: "8px",
                        borderRadius: "8px",
                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: `blue.500`,
                        borderRadius: "8px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: `blue.600`,
                      },
                    }}
                  >
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
                            boxShadow: "md",
                          }}
                        >
                          <Flex mb={3}>
                            <Flex
                              bg="blue.500"
                              color="white"
                              h="28px"
                              w="28px"
                              borderRadius="md"
                              fontSize="md"
                              alignItems="center"
                              justifyContent="center"
                              mr={2}
                              flexShrink={0}
                            >
                              {item.type === "Course" ? (
                                <IconBook1 />
                              ) : (
                                <IconBook1 />
                              )}
                            </Flex>
                            <Flex align="center" ml="auto">
                              <Badge
                                bg="yellow.100"
                                color="yellow.600"
                                fontSize="xl"
                                p={1}
                                mr={1}
                              >
                                <IconBook1 />
                              </Badge>
                              <Text fontSize="xs" color="gray.600">
                                {item.sessionNumber} SESSION
                              </Text>
                            </Flex>
                          </Flex>
                          <Text
                            color="gray.800"
                            fontSize="sm"
                            mb={3}
                            noOfLines={2}
                          >
                            {item.title}
                          </Text>
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text fontSize="xs" color="gray.500">
                              Class Progress : {item.progress}%
                            </Text>
                            <Badge
                              colorScheme={item.mode === "Online" ? "blue" : "green"}
                              variant="subtle"
                              fontSize="0.65rem"
                              mt={1}
                            >
                              {item.mode}
                            </Badge>
                            <Link to={`/course/${item.id}/session/${item.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                colorScheme="gray"
                              >
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
                </Box>

                {/* Announcements section */}
                <Box
                  width={{ base: "100%", lg: "480px" }}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="sm"
                  p={4}
                  alignSelf="flex-start"
                >
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <Heading
                      as="h2"
                      size="md"
                      fontWeight="medium"
                      color="gray.700"
                    >
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

                  {/* News carousel */}
                  <Box
                    position="relative"
                    height="350px"
                    borderRadius="lg"
                    overflow="hidden"
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
                          <Heading size="md" mb={2}>
                            {news.title}
                          </Heading>
                          <Text
                            fontSize="sm"
                            color="gray.600"
                            mb={2}
                            noOfLines={2}
                          >
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
                              bg={
                                newsCarouselPage === index
                                  ? "blue.500"
                                  : "white"
                              }
                              cursor="pointer"
                              onClick={() => setNewsCarouselPage(index)}
                              boxShadow="md"
                            />
                          ))}
                        </HStack>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>

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
                onChange={(e) =>
                  setNewActivity({ ...newActivity, title: e.target.value })
                }
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                value={newActivity.category}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, category: e.target.value })
                }
              >
                <option value="Digital Banking">Digital Banking</option>
                <option value="IT Service & Risk Management">
                  IT Service & Risk Management
                </option>
                <option value="User Experience Research & Design">
                  User Experience Research & Design
                </option>
                <option value="Introduction to Database Systems">
                  Introduction to Database Systems
                </option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Time</FormLabel>
              <Input
                type="time"
                value={newActivity.time}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, time: e.target.value })
                }
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Date</FormLabel>
              <Input value={formatDate(selectedDate)} isReadOnly bg="gray.50" />
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
