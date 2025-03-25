import { useState } from "react";
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
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Attendance: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  // Available courses data
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
  ];
  // State for selected course and semester
  const [selectedSemester, setSelectedSemester] = useState(
    availableSemesters[0]
  );
  const [selectedCourse, setSelectedCourse] = useState(
    availableCourses[0].title
  );
  // Mock data
  const courseDetails = {
    code: "ISYWES574501",
    location: "LE2123",
    instructors: [
      { name: "Joni Zimbabwe", isMain: true },
      { name: "Alan Russ", isAssistant: true },
    ],
    attendance: {
      completionRate: 90,
      totalSessions: 13,
      attendedSessions: 11,
      minimalRequired: 11,
    },
    sessions: [
      {
        id: 1,
        title: "Introduction to AIS",
        type: "Online",
        date: "11 March 2025",
        time: "07:00 A.M - 09:00 A.M",
        attended: true,
      },
      {
        id: 2,
        title: "Foundational Concepts of the AIS",
        type: "Onsite F2F",
        date: "18 March 2025",
        time: "07:00 A.M - 09:00 A.M",
        attended: true,
      },
      {
        id: 3,
        title: "Fraud, Ethics, and Internal Control",
        type: "Onsite F2F",
        date: "25 March 2025",
        time: "07:00 A.M - 09:00 A.M",
        attended: true,
      },
    ],
  };

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
                      value={90}
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

            {/* Session List */}
            <VStack spacing={4} align="stretch">
              {courseDetails.sessions.map((session) => (
                <Box
                  key={session.id}
                  bg="white"
                  borderRadius="md"
                  p={4}
                  boxShadow="sm"
                >
                  <Flex justify="space-between" mb={2}>
                    <Text fontWeight="semibold">Session {session.id}</Text>
                    {session.attended && (
                      <Badge
                        colorScheme="green"
                        variant="subtle"
                        px={2}
                        py={1}
                        borderRadius="full"
                      >
                        Attend
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
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Attendance;
