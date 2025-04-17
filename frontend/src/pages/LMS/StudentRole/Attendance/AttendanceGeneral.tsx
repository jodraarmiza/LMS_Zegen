import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  Badge,
  VStack,
  HStack,
  Heading,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  BsLightningCharge,
  BsCalendar,
  BsClock,
  BsJournalBookmark,
  BsFillJournalBookmarkFill,
  BsPersonWorkspace,
} from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { MdArrowDropDownCircle } from "react-icons/md";

const Attendance: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "today", "thisWeek"

  const IconLightning = BsLightningCharge as React.FC;
  const IconCalender = BsCalendar as React.FC;
  const IconClock = BsClock as React.FC;
  const IconMapPin = FiMapPin as React.FC;
  const IconArrowDropDownCircle = MdArrowDropDownCircle as React.FC;
  const IconJournalBookmark = BsJournalBookmark as React.FC;
  const IconFillJournalBookmark = BsFillJournalBookmarkFill as React.FC;
  const IconPersonWorkspace = BsPersonWorkspace as React.FC;

  const availableSemesters = [
    "2025 Even Semester",
    "2024 Odd Semester",
    "2024 Even Semester",
    "2023 Odd Semester",
  ];

  // Updated available courses data to include all 4 courses
  const availableCourses = [
    {
      id: "1",
      title: "IT Service & Risk Management",
      code: "ISYWES574501",
      location: "LE2123",
      instructors: [
        { name: "Joni Zimbabwe", isMain: true },
        { name: "Alan Russ", isAssistant: true },
      ],
    },
    {
      id: "2",
      title: "User Experience Research & Design",
      code: "UERD384291",
      location: "LE1105",
      instructors: [
        { name: "Sarah Connor", isMain: true },
        { name: "John Smith", isAssistant: true },
      ],
    },
    {
      id: "3",
      title: "Digital Banking",
      code: "DIBN298432",
      location: "LE3210",
      instructors: [
        { name: "Mark Davis", isMain: true },
        { name: "Emma Wilson", isAssistant: true },
      ],
    },
    {
      id: "4",
      title: "Introduction to Database System",
      code: "DBSYS123456",
      location: "LE2123",
      instructors: [{ name: "Cody Fisher", isMain: true }],
    },
  ];

  // State for selected course and semester
  const [selectedSemester, setSelectedSemester] = useState(
    availableSemesters[0]
  );
  const [selectedCourse, setSelectedCourse] = useState(
    availableCourses[0].title
  );

  // Generate sessions for each course with varying dates
  const generateSessions = (courseId: string) => {
    // Get current date
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Create a date for today's session
    const todayDate = new Date(currentYear, currentMonth, currentDay);
    
    // Create dates for this week's sessions (next 2-3 days)
    const thisWeekDate1 = new Date(currentYear, currentMonth, currentDay + 1);
    const thisWeekDate2 = new Date(currentYear, currentMonth, currentDay + 2);
    
    // Create dates for future sessions
    const futureDate1 = new Date(currentYear, currentMonth, currentDay + 7);
    const futureDate2 = new Date(currentYear, currentMonth, currentDay + 14);

    // Format date as string
    const formatDate = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    // Base sessions for all courses
    const baseSessions = [
      {
        id: 1,
        title: "Introduction",
        type: "Online",
        date: formatDate(todayDate),
        time: "07:00 A.M - 09:00 A.M",
        attended: true,
        isToday: true,
        isThisWeek: true,
      },
      {
        id: 2,
        title: "Foundational Concepts",
        type: "Onsite F2F",
        date: formatDate(thisWeekDate1),
        time: "07:00 A.M - 09:00 A.M",
        attended: false,
        isToday: false,
        isThisWeek: true,
      },
      {
        id: 3,
        title: "Advanced Concepts",
        type: "Onsite F2F",
        date: formatDate(thisWeekDate2),
        time: "07:00 A.M - 09:00 A.M",
        attended: false,
        isToday: false,
        isThisWeek: true,
      },
      {
        id: 4,
        title: "Project Work",
        type: "Online",
        date: formatDate(futureDate1),
        time: "10:00 A.M - 12:00 P.M",
        attended: false,
        isToday: false,
        isThisWeek: false,
      },
      {
        id: 5,
        title: "Final Presentation",
        type: "Onsite F2F",
        date: formatDate(futureDate2),
        time: "13:00 P.M - 15:00 P.M",
        attended: false,
        isToday: false,
        isThisWeek: false,
      },
    ];

    // Customize session titles based on course
    switch (courseId) {
      case "1": // IT Service & Risk Management
        return baseSessions.map((session, index) => ({
          ...session,
          title: [
            "Introduction to AIS",
            "Foundational Concepts of the AIS",
            "Fraud, Ethics, and Internal Control",
            "Risk Assessment Strategies",
            "Service Management Framework",
          ][index],
        }));
      case "2": // UX Research & Design
        return baseSessions.map((session, index) => ({
          ...session,
          title: [
            "Introduction to UX Research",
            "User Testing Methodologies",
            "Wireframing and Prototyping",
            "Usability Testing",
            "Design System Implementation",
          ][index],
        }));
      case "3": // Digital Banking
        return baseSessions.map((session, index) => ({
          ...session,
          title: [
            "Introduction to Digital Banking",
            "Online Banking Security",
            "Mobile Payment Systems",
            "Fintech Innovations",
            "Blockchain in Banking",
          ][index],
        }));
      case "4": // Database System
        return baseSessions.map((session, index) => ({
          ...session,
          title: [
            "Introduction to Database Concepts",
            "SQL Fundamentals",
            "Database Design Principles",
            "Normalization and Optimization",
            "NoSQL Database Systems",
          ][index],
        }));
      default:
        return baseSessions;
    }
  };

  // Find the selected course details
  const findSelectedCourseDetails = () => {
    const course = availableCourses.find((c) => c.title === selectedCourse);

    if (!course) {
      return {
        code: "",
        location: "",
        instructors: [],
        attendance: {
          completionRate: 0,
          totalSessions: 0,
          attendedSessions: 0,
          minimalRequired: 0,
        },
        sessions: [],
      };
    }

    const sessions = generateSessions(course.id);

    return {
      code: course.code,
      location: course.location,
      instructors: course.instructors,
      attendance: {
        completionRate: 20, // 1 of 5 sessions attended
        totalSessions: sessions.length,
        attendedSessions: sessions.filter(s => s.attended).length,
        minimalRequired: Math.ceil(sessions.length * 0.8), // 80% attendance required
      },
      sessions: sessions,
    };
  };

  // Get course details based on selected course
  const courseDetails = findSelectedCourseDetails();

  // Filter sessions based on active filter
  const filterSessions = () => {
    switch (activeFilter) {
      case "today":
        return courseDetails.sessions.filter(session => session.isToday);
      case "thisWeek":
        return courseDetails.sessions.filter(session => session.isThisWeek);
      default:
        return courseDetails.sessions;
    }
  };

  const filteredSessions = filterSessions();

  return (
    <>
      {/* Main content with Sidebar */}
      <Flex>
        {/* Attendance Dashboard Content */}
        <Box
          bg="#f8f9fa"
          minH="100vh"
          p={0}
          flex="1"
          ml={isCollapsed ? "80px" : "5px"}
          transition="margin-left 0.3s"
        >
          <Box p={6}>
            {/* Header with title, semester and search */}
            <Flex
              justifyContent="space-between"
              mb={6}
              w="100%"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box p={2}>
                <Box mb={6}>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    Attendance
                  </Text>
                  <Heading as="h1" size="lg" fontWeight="semibold" mb={10}>
                    My Attendance
                  </Heading>
                </Box>
              </Box>

              {/* Dropdown menu di sebelah kanan */}
              <Box ml="auto" p={6}>
                <Menu>
                  <MenuButton
                    as={Box}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={2}
                    bg="white"
                    width={{ base: "100%", md: "220px" }}
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    position="relative"
                  >
                    <Text>{selectedSemester}</Text>
                    <Box
                      position="absolute"
                      right="8px"
                      top="50%"
                      transform="translateY(-50%)"
                      ml="auto"
                    >
                      <IconButton
                        aria-label="Dropdown"
                        icon={<IconArrowDropDownCircle />}
                        variant="unstyled"
                        color="blue.500"
                        fontSize="xl"
                        padding={0}
                        minW="auto"
                        h="auto"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      />
                    </Box>
                  </MenuButton>
                  <MenuList zIndex={10}>
                    {availableSemesters.map((semester, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => setSelectedSemester(semester)}
                      >
                        {semester}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            </Flex>

            {/* Course Selector */}
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              mb={6}
            >
              <Box mb={{ base: 4, md: 0 }}>
                <Text mb={2} fontWeight="semibold">
                  Select Course{" "}
                  <Text as="span" color="red">
                    *
                  </Text>
                </Text>
                <Menu>
                  <MenuButton
                    as={Box}
                    position="relative"
                    width={{ base: "100%", md: "350px" }}
                    cursor="pointer"
                  >
                    <Box
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="2xl"
                      p={2}
                      bg="white"
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                    >
                      <Box
                        as="span"
                        p={1}
                        borderRadius="md"
                        mr={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconButton
                          aria-label="Course icon"
                          icon={<IconFillJournalBookmark />}
                          size="xs"
                          variant="unstyled"
                          fontSize="md"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        />
                      </Box>
                      <Text>{selectedCourse}</Text>
                      <Box ml="auto">
                        <IconButton
                          aria-label="Dropdown"
                          icon={<IconArrowDropDownCircle />}
                          size="xs"
                          variant="unstyled"
                          color="blue.500"
                          fontSize="2xl"
                        />
                      </Box>
                    </Box>
                  </MenuButton>
                  <MenuList zIndex={10}>
                    {availableCourses.map((course) => (
                      <MenuItem
                        key={course.id}
                        onClick={() => setSelectedCourse(course.title)}
                      >
                        <Flex align="center">
                          <Box fontSize="md" color="blue.500" mr={2}>
                            <IconFillJournalBookmark />
                          </Box>
                          <Text>{course.title}</Text>
                        </Flex>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
            </Flex>

            {/* Time Filter Tabs */}
            <Tabs variant="soft-rounded" colorScheme="blue" mb={6}>
              <TabList>
                <Tab 
                  onClick={() => setActiveFilter("all")}
                  bg={activeFilter === "all" ? "blue.500" : "gray.100"}
                  color={activeFilter === "all" ? "white" : "gray.600"}
                  _hover={{ bg: activeFilter === "all" ? "blue.600" : "gray.200" }}
                  mr={2}
                >
                  All Sessions
                </Tab>
                <Tab 
                  onClick={() => setActiveFilter("today")}
                  bg={activeFilter === "today" ? "blue.500" : "gray.100"}
                  color={activeFilter === "today" ? "white" : "gray.600"}
                  _hover={{ bg: activeFilter === "today" ? "blue.600" : "gray.200" }}
                  mr={2}
                >
                  Today
                </Tab>
                <Tab 
                  onClick={() => setActiveFilter("thisWeek")}
                  bg={activeFilter === "thisWeek" ? "blue.500" : "gray.100"}
                  color={activeFilter === "thisWeek" ? "white" : "gray.600"}
                  _hover={{ bg: activeFilter === "thisWeek" ? "blue.600" : "gray.200" }}
                >
                  This Week
                </Tab>
              </TabList>
            </Tabs>

            {/* Course Information */}
            <Box mb={6} bg="white" borderRadius="md" p={4} boxShadow="sm">
              <Flex
                direction={{ base: "column", md: "row" }}
                align={{ base: "flex-start", md: "center" }}
                mb={4}
              >
                <Box
                  bg="blue.500"
                  color="white"
                  p={3}
                  borderRadius="md"
                  mr={4}
                  mb={{ base: 2, md: 0 }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="20px"
                >
                  <IconFillJournalBookmark />
                </Box>
                <Box flex="1">
                  <Text color="gray.500" fontSize="sm">
                    Course
                  </Text>
                  <Text fontWeight="bold" fontSize="xl">
                    {selectedCourse}
                  </Text>
                </Box>
              </Flex>

              <Flex wrap="wrap" gap={6} mb={4}>
                <HStack spacing={2}>
                  <Box fontSize="16px" color="gray">
                    <IconLightning />
                  </Box>
                  <Text fontSize="sm">{courseDetails.code}</Text>
                </HStack>
                <HStack spacing={2}>
                  <Box fontSize="16px" color="gray">
                    <IconMapPin />
                  </Box>
                  <Text fontSize="sm">{courseDetails.location}</Text>
                </HStack>
              </Flex>

              <Flex align="center" mb={4}>
                <Box fontSize="18px" color="gray" mr={4}>
                  <IconPersonWorkspace />
                </Box>
                {courseDetails.instructors.map((instructor, idx) => (
                  <Flex key={idx} align="center" mr={4}>
                    <Box
                      w="25px"
                      h="25px"
                      borderRadius="full"
                      bg={instructor.isMain ? "gray.700" : "green.500"}
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="sm"
                      mr={2}
                    >
                      {instructor.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </Box>
                    <Text fontSize="sm">{instructor.name}</Text>
                  </Flex>
                ))}
              </Flex>
            </Box>

            {/* Attendance Statistics */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              gap={4}
              mb={6}
            >
              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text color="gray.600" mb={2}>
                  Completed Attend
                </Text>
                <Flex align="center">
                  <Text fontWeight="semibold" fontSize="3xl" mr={4}>
                    {courseDetails.attendance.completionRate}%
                  </Text>
                  <Box flex="1" position="relative" h="60px" w="60px">
                    <CircularProgress
                      value={courseDetails.attendance.completionRate}
                      color="blue.500"
                      size="45px"
                      thickness="15px"
                      marginTop={3}
                    >
                      <CircularProgressLabel fontWeight="bold"></CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                </Flex>
              </Box>

              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text color="gray.600" mb={2}>
                  Total Session
                </Text>
                <Text fontWeight="bold" fontSize="2xl">
                  {courseDetails.attendance.totalSessions}
                </Text>
              </Box>

              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text color="gray.600" mb={2}>
                  Total Attendance
                </Text>
                <Text fontWeight="bold" fontSize="2xl">
                  {courseDetails.attendance.attendedSessions}
                </Text>
              </Box>

              <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
                <Text color="gray.600" mb={2}>
                  Minimal Attendance
                </Text>
                <Text fontWeight="bold" fontSize="2xl">
                  {courseDetails.attendance.minimalRequired}
                </Text>
              </Box>
            </Grid>

            {/* Sessions Header with counter */}
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h3" size="md">
                Sessions
              </Heading>
              <Badge colorScheme="blue" fontSize="sm" py={1} px={2} borderRadius="md">
                {filteredSessions.length} {filteredSessions.length === 1 ? 'Session' : 'Sessions'}
              </Badge>
            </Flex>

            {/* Conditional rendering for empty state */}
            {filteredSessions.length === 0 ? (
              <Box bg="white" p={6} borderRadius="md" textAlign="center" boxShadow="sm">
                <Text fontSize="lg" color="gray.500">
                  No sessions {activeFilter === 'today' ? 'today' : 'this week'}.
                </Text>
              </Box>
            ) : (
              /* Session List */
              <VStack spacing={4} align="stretch">
                {filteredSessions.map((session) => (
                  <Box
                    key={session.id}
                    bg="white"
                    borderRadius="md"
                    p={4}
                    boxShadow="sm"
                  >
                    <Flex justify="space-between" mb={2}>
                      <Text fontWeight="semibold">Session {session.id}</Text>
                      {session.isToday && (
                        <Badge
                          colorScheme="red"
                          variant="subtle"
                          px={2}
                          py={1}
                          borderRadius="full"
                          mr={2}
                        >
                          Today
                        </Badge>
                      )}
                      {session.attended ? (
                        <Badge
                          colorScheme="green"
                          variant="subtle"
                          px={2}
                          py={1}
                          borderRadius="full"
                        >
                          Attend
                        </Badge>
                      ) : (
                        <Badge
                          colorScheme="yellow"
                          variant="subtle"
                          px={2}
                          py={1}
                          borderRadius="full"
                        >
                          Upcoming
                        </Badge>
                      )}
                    </Flex>
                    <Text fontWeight="bold" fontSize="lg" mb={2}>
                      {session.title}
                    </Text>
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Box fontSize="16px" color="gray">
                          <IconJournalBookmark />
                        </Box>
                        <Text fontSize="sm">{session.type}</Text>
                      </HStack>
                      <HStack>
                        <Box fontSize="16px" color="gray">
                          <IconCalender />
                        </Box>
                        <Text fontSize="sm">{session.date}</Text>
                      </HStack>
                      <HStack>
                        <Box fontSize="16px" color="gray">
                          <IconClock />
                        </Box>
                        <Text fontSize="sm">{session.time}</Text>
                      </HStack>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Attendance;