import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  Progress,
  Avatar,
  Badge,
  Tabs,
  TabList,
  Tab,
  CircularProgress,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { ArrowBackIcon, CalendarIcon } from "@chakra-ui/icons";
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
}

interface AttendanceSession {
  id: string;
  number: number;
  title: string;
  date: string;
  time: string;
  mode: "Online" | "Onsite F2F";
  attended: boolean;
}

interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  instructors: Instructor[];
  attendanceStats: {
    completedPercentage: number;
    totalSessions: number;
    totalAttendance: number;
    minimalAttendance: number;
  };
  sessions: AttendanceSession[];
  distribution: {
    passed: number;
    inProgress: number;
    failed: number;
    notStarted: number;
  };
}

const IconPersonWorkspace = BsPersonWorkspace as React.FC;
const IconLightning = BsLightningCharge as React.FC;
const IconFillJournalBookmark = BsFillJournalBookmarkFill as React.FC;
const IconBulb = HiOutlineLightBulb as React.FC;
const CourseAttendance: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  // Current course info
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState(8); // Attendance tab (index 8)

  // Setup Effect to initialize activeTab based on URL
  useEffect(() => {
    // Initialize active tab based on URL
    const path = window.location.pathname;
    if (path.includes("/session")) {
      setActiveTab(0);
    } else if (path.includes("/syllabus")) {
      setActiveTab(1);
    } else if (path.includes("/forum")) {
      setActiveTab(2);
    } else if (path.includes("/assessment")) {
      setActiveTab(3);
    } else if (path.includes("/exam")) {
      setActiveTab(4);
    } else if (path.includes("/gradebook")) {
      setActiveTab(5);
    } else if (path.includes("/rubric")) {
      setActiveTab(6);
    } else if (path.includes("/people")) {
      setActiveTab(7);
    } else if (path.includes("/attendance")) {
      setActiveTab(8);
    }
  }, []);

  // Define colors based on colorMode
  const cardBg = colorMode === "light" ? "white" : "gray.700";

  // Mock data for the course and attendance
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const mockCourse: Course = {
      id: "1",
      code: "LB2123",
      title: "IT Service & Risk Management",
      category: "IT",
      instructors: [
        {
          id: "101",
          name: "Joni Zimbatima",
          avatarUrl: "https://placehold.co/32x32?text=JZ",
        },
        {
          id: "102",
          name: "Alan Russ",
          avatarUrl: "https://placehold.co/32x32?text=AR",
        },
      ],
      attendanceStats: {
        completedPercentage: 90,
        totalSessions: 13,
        totalAttendance: 11,
        minimalAttendance: 11,
      },
      distribution: {
        passed: 30,
        inProgress: 15,
        failed: 30,
        notStarted: 25,
      },
      sessions: [
        {
          id: "1",
          number: 1,
          title: "Introduction to AIS",
          date: "11 March 2025",
          time: "07:00 A.M - 09:00 A.M",
          mode: "Online",
          attended: true,
        },
        {
          id: "2",
          number: 2,
          title: "Foundational Concepts of the AIS",
          date: "18 March 2025",
          time: "07:00 A.M - 09:00 A.M",
          mode: "Onsite F2F",
          attended: true,
        },
        {
          id: "3",
          number: 3,
          title: "Fraud, Ethics, and Internal Control",
          date: "25 March 2025",
          time: "07:00 A.M - 09:00 A.M",
          mode: "Onsite F2F",
          attended: true,
        },
        {
          id: "4",
          number: 4,
          title: "Database Management and Modeling",
          date: "1 April 2025",
          time: "07:00 A.M - 09:00 A.M",
          mode: "Online",
          attended: true,
        },
      ],
    };

    setCourse(mockCourse);
  }, [courseId]);

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

  // Go back to course session page
  const handleBackToCourse = () => {
    navigate(`/course/${courseId}`);
  };

  // Navigate to session
  const navigateToSession = (sessionId: string) => {
    navigate(`/course/${courseId}/session/${sessionId}`);
  };

  if (!course) {
    return (
      <Box p={6}>
        <Text>Loading course information...</Text>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" w="full" overflowX="hidden" overflowY="hidden">
      {/* Main layout */}
      <Flex w="full" direction="column">
        {/* Content wrapper - takes full width */}
        <Box flex="1" position="relative" overflowX="hidden">
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
                      30%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      15%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      30%
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      25%
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
                        width={`${course.distribution.failed}%`}
                        bg="red.500"
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
                <Tabs
                  index={activeTab}
                  onChange={handleTabChange}
                  variant="unstyled"
                >
                  <TabList>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📄
                        </Box>
                      </Box>
                      Session
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📘
                        </Box>
                      </Box>
                      Syllabus
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          💬
                        </Box>
                      </Box>
                      Forum
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📝
                        </Box>
                      </Box>
                      Assessment
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📝
                        </Box>
                      </Box>
                      Exam
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📊
                        </Box>
                      </Box>
                      Gradebook
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📋
                        </Box>
                      </Box>
                      Assessment Rubric
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          👥
                        </Box>
                      </Box>
                      People
                    </Tab>
                    <Tab
                      _selected={{
                        color: "blue.500",
                        borderBottomWidth: "3px",
                        borderBottomColor: "blue.500",
                      }}
                      fontWeight="medium"
                      px={4}
                      py={3}
                    >
                      <Box as="span" mr={2}>
                        <Box as="span" fontSize="md">
                          📅
                        </Box>
                      </Box>
                      Attendance
                    </Tab>
                  </TabList>
                </Tabs>
              </Box>
            </Box>
          </Box>

          {/* Attendance Content */}
          <Box p={6}>
            {/* Attendance Stats Cards */}
            <Flex justify="space-between" mb={8}>
              {/* Completed Attendance */}
              <Box
                bg="white"
                p={4}
                borderRadius="md"
                width="24%"
                textAlign="center"
              >
                <Text mb={2} color="gray.600" fontSize="sm">
                  Completed Attend
                </Text>
                <Flex direction="column" align="center">
                  <CircularProgress
                    value={course.attendanceStats.completedPercentage}
                    color="blue.400"
                    size="60px"
                    thickness="8px"
                    mb={1}
                  >
                    <Box position="absolute" fontSize="sm" fontWeight="bold">
                      90%
                    </Box>
                  </CircularProgress>
                </Flex>
              </Box>

              {/* Total Sessions */}
              <Box
                bg="white"
                p={4}
                borderRadius="md"
                width="24%"
                textAlign="center"
              >
                <Text mb={2} color="gray.600" fontSize="sm">
                  Total Session
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  13
                </Text>
              </Box>

              {/* Total Attendance */}
              <Box
                bg="white"
                p={4}
                borderRadius="md"
                width="24%"
                textAlign="center"
              >
                <Text mb={2} color="gray.600" fontSize="sm">
                  Total Attendance
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  11
                </Text>
              </Box>

              {/* Minimal Attendance */}
              <Box
                bg="white"
                p={4}
                borderRadius="md"
                width="24%"
                textAlign="center"
              >
                <Text mb={2} color="gray.600" fontSize="sm">
                  Minimal Attendance
                </Text>
                <Text fontSize="xl" fontWeight="bold">
                  11
                </Text>
              </Box>
            </Flex>

            {/* Attendance List */}
            <Box>
              {/* Session 1 */}
              <Box bg="white" p={4} borderRadius="md" mb={3}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="medium" fontSize="md">
                      Session 1
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      color="gray.700"
                      mb={1}
                    >
                      Introduction to AIS
                    </Text>
                    <Flex align="center" fontSize="sm" color="gray.500">
                      <Flex align="center" mr={4}>
                        <Text as="span" mr={1}>
                          Online
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <CalendarIcon mr={1} />
                        <Text as="span" mr={3}>
                          11 March 2025
                        </Text>
                        <Text as="span">07:00 A.M - 09:00 A.M</Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                    <Flex align="center">
                      <Box
                        w={2}
                        h={2}
                        bg="green.500"
                        borderRadius="full"
                        mr={1}
                      ></Box>
                      <Text fontSize="xs">Attend</Text>
                    </Flex>
                  </Badge>
                </Flex>
              </Box>

              {/* Session 2 */}
              <Box bg="white" p={4} borderRadius="md" mb={3}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="medium" fontSize="md">
                      Session 2
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      color="gray.700"
                      mb={1}
                    >
                      Foundational Concepts of the AIS
                    </Text>
                    <Flex align="center" fontSize="sm" color="gray.500">
                      <Flex align="center" mr={4}>
                        <Text as="span" mr={1}>
                          Onsite F2F
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <CalendarIcon mr={1} />
                        <Text as="span" mr={3}>
                          18 March 2025
                        </Text>
                        <Text as="span">07:00 A.M - 09:00 A.M</Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                    <Flex align="center">
                      <Box
                        w={2}
                        h={2}
                        bg="green.500"
                        borderRadius="full"
                        mr={1}
                      ></Box>
                      <Text fontSize="xs">Attend</Text>
                    </Flex>
                  </Badge>
                </Flex>
              </Box>

              {/* Session 3 */}
              <Box bg="white" p={4} borderRadius="md" mb={3}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="medium" fontSize="md">
                      Session 3
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      color="gray.700"
                      mb={1}
                    >
                      Fraud, Ethics, and Internal Control
                    </Text>
                    <Flex align="center" fontSize="sm" color="gray.500">
                      <Flex align="center" mr={4}>
                        <Text as="span" mr={1}>
                          Onsite F2F
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <CalendarIcon mr={1} />
                        <Text as="span" mr={3}>
                          25 March 2025
                        </Text>
                        <Text as="span">07:00 A.M - 09:00 A.M</Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                    <Flex align="center">
                      <Box
                        w={2}
                        h={2}
                        bg="green.500"
                        borderRadius="full"
                        mr={1}
                      ></Box>
                      <Text fontSize="xs">Attend</Text>
                    </Flex>
                  </Badge>
                </Flex>
              </Box>

              {/* Session 4 */}
              <Box bg="white" p={4} borderRadius="md">
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="medium" fontSize="md">
                      Session 4
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      color="gray.700"
                      mb={1}
                    >
                      Database Management and Modeling
                    </Text>
                    <Flex align="center" fontSize="sm" color="gray.500">
                      <Flex align="center" mr={4}>
                        <Text as="span" mr={1}>
                          Online
                        </Text>
                      </Flex>
                      <Flex align="center">
                        <CalendarIcon mr={1} />
                        <Text as="span" mr={3}>
                          1 April 2025
                        </Text>
                        <Text as="span">07:00 A.M - 09:00 A.M</Text>
                      </Flex>
                    </Flex>
                  </Box>
                  <Badge colorScheme="green" px={2} py={1} borderRadius="full">
                    <Flex align="center">
                      <Box
                        w={2}
                        h={2}
                        bg="green.500"
                        borderRadius="full"
                        mr={1}
                      ></Box>
                      <Text fontSize="xs">Attend</Text>
                    </Flex>
                  </Badge>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default CourseAttendance;
