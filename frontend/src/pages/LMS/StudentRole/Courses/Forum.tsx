import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Tabs,
  TabList,
  Tab,
  Avatar,
  Progress,
  HStack,
  VStack,
  Badge,
  Input,
  InputGroup,
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ChatIcon,
  ChevronUpIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
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
}

interface Student {
  id: string;
  name: string;
  avatarUrl: string;
  studentId: string;
}

interface SessionStatus {
  id: string;
  number: number;
  title: string;
  status: "Passed" | "Overdue" | "Failed" | "In Progress" | "Not Started";
}

interface ForumThread {
  id: string;
  title: string;
  author: Instructor;
  date: string;
  replies: number;
  views: number;
  sessionNumber: number;
  status: "Passed" | "Not Passed";
}

interface ForumReply {
  id: string;
  author: Instructor | Student;
  content: string;
  date: string;
  time: string;
  isPassed?: boolean;
  isPresent?: boolean;
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
    failed: number;
    notStarted: number;
  };
}

const IconPersonWorkspace = BsPersonWorkspace as React.FC;
const IconLightning = BsLightningCharge as React.FC;
const IconFillJournalBookmark = BsFillJournalBookmarkFill as React.FC;
const IconBulb = HiOutlineLightBulb as React.FC;
const Forum: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(2); // Forum tab (index 2)
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [viewFilter, setViewFilter] = useState("class");

  // Mock data for the course
  const course: Course = {
    id: "1",
    code: "LB2123",
    title: "IT Service & Risk Management",
    category: "IT",
    instructors: [
      {
        id: "101",
        name: "Joni Zimbatima",
        avatarUrl: "https://placehold.co/32x32?text=JZ",
        role: "Lecturer",
      },
      {
        id: "102",
        name: "Alan Russ",
        avatarUrl: "https://placehold.co/32x32?text=AR",
        role: "Lecturer",
      },
    ],
    distribution: {
      passed: 30,
      inProgress: 15,
      failed: 30,
      notStarted: 25,
    },
  };

  // Mock data for forum threads
  const forumThreads: ForumThread[] = [
    {
      id: "1",
      title: "Session 1 Attendance Absence",
      author: {
        id: "101",
        name: "Joni Zimbatima",
        avatarUrl: "https://placehold.co/32x32?text=JZ",
        role: "Lecturer",
      },
      date: "11 March 2025",
      replies: 24,
      views: 48,
      sessionNumber: 1,
      status: "Passed",
    },
    {
      id: "2",
      title: "Session 2 Attendance Absence",
      author: {
        id: "101",
        name: "Joni Zimbatima",
        avatarUrl: "https://placehold.co/32x32?text=JZ",
        role: "Lecturer",
      },
      date: "18 March 2025",
      replies: 18,
      views: 36,
      sessionNumber: 2,
      status: "Passed",
    },
    {
      id: "3",
      title: "Session 3 Attendance Absence",
      author: {
        id: "101",
        name: "Joni Zimbatima",
        avatarUrl: "https://placehold.co/32x32?text=JZ",
        role: "Lecturer",
      },
      date: "25 March 2025",
      replies: 15,
      views: 30,
      sessionNumber: 3,
      status: "Passed",
    },
  ];

  // Mock data for forum replies (detail view)
  const forumReplies: Record<string, ForumReply[]> = {
    "1": [
      {
        id: "r1",
        author: {
          id: "101",
          name: "Joni Zimbatima",
          avatarUrl: "https://placehold.co/32x32?text=JZ",
          role: "Lecturer",
        },
        content: "Session 1 Attendance Absence",
        date: "11 March 2025",
        time: "09:24",
        isPassed: true,
      },
      {
        id: "r2",
        author: {
          id: "s1",
          name: "Devon Lane",
          avatarUrl: "https://placehold.co/32x32?text=DL",
          studentId: "1354",
        },
        content: "Present",
        date: "11 March 2025",
        time: "09:24",
        isPresent: true,
      },
      {
        id: "r3",
        author: {
          id: "s2",
          name: "Jacob Jones",
          avatarUrl: "https://placehold.co/32x32?text=JJ",
          studentId: "2142",
        },
        content: "Present",
        date: "11 March 2025",
        time: "09:24",
        isPresent: true,
      },
      {
        id: "r4",
        author: {
          id: "s3",
          name: "Jerome Bell",
          avatarUrl: "https://placehold.co/32x32?text=JB",
          studentId: "4564",
        },
        content: "Present",
        date: "11 March 2025",
        time: "09:24",
        isPresent: true,
      },
      {
        id: "r5",
        author: {
          id: "s4",
          name: "Esther Howard",
          avatarUrl: "https://placehold.co/32x32?text=EH",
          studentId: "7845",
        },
        content: "Present",
        date: "11 March 2025",
        time: "09:24",
        isPresent: true,
      },
      {
        id: "r6",
        author: {
          id: "s5",
          name: "Jane Cooper",
          avatarUrl: "https://placehold.co/32x32?text=JC",
          studentId: "7656",
        },
        content: "Present",
        date: "11 March 2025",
        time: "09:24",
        isPresent: true,
      },
      {
        id: "r7",
        author: {
          id: "s6",
          name: "Marvin McKinney",
          avatarUrl: "https://placehold.co/32x32?text=MM",
          studentId: "4544",
        },
        content: "Present",
        date: "11 March 2025",
        time: "09:24",
        isPresent: true,
      },
    ],
  };

  // Mock sessions list for sidebar
  const sessionsList: SessionStatus[] = [
    { id: "1", number: 1, title: "Session 1", status: "Passed" },
    { id: "2", number: 2, title: "Session 2", status: "Passed" },
    { id: "3", number: 3, title: "Session 3", status: "Passed" },
    { id: "4", number: 4, title: "Session 4", status: "Passed" },
    { id: "5", number: 5, title: "Session 5", status: "Failed" },
    { id: "6", number: 6, title: "Session 6", status: "Failed" },
    { id: "7", number: 7, title: "Session 7", status: "Failed" },
    { id: "8", number: 8, title: "Session 8", status: "In Progress" },
    { id: "9", number: 9, title: "Session 9", status: "Not Started" },
    { id: "10", number: 10, title: "Session 10", status: "Not Started" },
    { id: "11", number: 11, title: "Session 11", status: "Not Started" },
    { id: "12", number: 12, title: "Session 12", status: "Not Started" },
    { id: "13", number: 13, title: "Session 13", status: "Not Started" },
  ];

  // Go back to courses page
  const handleBackToCourse = () => {
    navigate(`/courses`);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send this to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Passed":
        return "green";
      case "In Progress":
        return "blue";
      case "Overdue":
        return "red";
      case "Failed":
        return "yellow";
      default:
        return "gray";
    }
  };

  // Get thread detail
  const selectedThread = selectedThreadId
    ? forumThreads.find((thread) => thread.id === selectedThreadId)
    : null;

  // Get replies for the selected thread
  const threadReplies =
    selectedThreadId && forumReplies[selectedThreadId]
      ? forumReplies[selectedThreadId]
      : [];

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
                      <Text>Up Coming</Text>
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

          {/* Forum Content */}
          {!selectedThreadId ? (
            // Forum threads list view with filter buttons
            <Box>
              {/* Forum filters and thread create button */}
              <Flex
                justify="space-between"
                px={6}
                py={4}
                borderBottomWidth="1px"
                borderBottomColor="gray.200"
              >
                <HStack>
                  <Box
                    as="button"
                    bg={viewFilter === "class" ? "blue.500" : "white"}
                    color={viewFilter === "class" ? "white" : "gray.700"}
                    borderWidth="1px"
                    borderColor={
                      viewFilter === "class" ? "blue.500" : "gray.200"
                    }
                    borderRadius="md"
                    px={4}
                    py={2}
                    fontWeight="medium"
                    onClick={() => setViewFilter("class")}
                    _hover={{
                      bg: viewFilter === "class" ? "blue.600" : "gray.50",
                    }}
                    transition="all 0.2s"
                  >
                    Class
                  </Box>
                  <Box
                    as="button"
                    bg={viewFilter === "group" ? "blue.500" : "white"}
                    color={viewFilter === "group" ? "white" : "gray.700"}
                    borderWidth="1px"
                    borderColor={
                      viewFilter === "group" ? "blue.500" : "gray.200"
                    }
                    borderRadius="md"
                    px={4}
                    py={2}
                    fontWeight="medium"
                    onClick={() => setViewFilter("group")}
                    _hover={{
                      bg: viewFilter === "group" ? "blue.600" : "gray.50",
                    }}
                    transition="all 0.2s"
                  >
                    Group
                  </Box>
                </HStack>

                <Button colorScheme="blue" size="md">
                  Create Thread
                </Button>
              </Flex>

              {/* Forum threads list */}
              <Flex>
                <Box flex="1" p={6}>
                  <VStack spacing={4} align="stretch">
                    {forumThreads.map((thread) => (
                      <Box
                        key={thread.id}
                        p={4}
                        bg="white"
                        borderRadius="md"
                        boxShadow="sm"
                        cursor="pointer"
                        _hover={{ bg: "gray.50" }}
                        onClick={() => setSelectedThreadId(thread.id)}
                      >
                        <Flex mb={3} align="center">
                          <Avatar
                            size="sm"
                            name={thread.author.name}
                            src={thread.author.avatarUrl}
                            mr={2}
                          />
                          <Box>
                            <Text fontWeight="medium">{thread.title}</Text>
                            <Text fontSize="xs" color="gray.500">
                              {thread.author.name} • {thread.author.role} •{" "}
                              {thread.date}
                            </Text>
                          </Box>
                          <Badge
                            colorScheme={
                              thread.status === "Passed" ? "green" : "gray"
                            }
                            borderRadius="full"
                            ml="auto"
                            display="flex"
                            alignItems="center"
                          >
                            <Box as="span" mr={1}>
                              {thread.status === "Passed" ? "•" : "○"}
                            </Box>
                            <Text>{thread.status}</Text>
                          </Badge>
                        </Flex>

                        <Flex fontSize="xs" color="gray.500">
                          <HStack>
                            <ChatIcon boxSize={3} />
                            <Text>{thread.replies} replies</Text>
                          </HStack>
                          <HStack ml={4}>
                            <ChevronUpIcon boxSize={3} />
                            <Text>{thread.views} views</Text>
                          </HStack>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                {/* Session list sidebar - STYLED LIKE COURSESESSION */}
                <Box
                  w="300px"
                  bg="white"
                  p={4}
                  borderLeftWidth="1px"
                  borderLeftColor="gray.200"
                >
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                    pb={2}
                    borderBottomWidth="1px"
                    borderBottomColor="gray.200"
                  >
                    <Text fontWeight="medium" fontSize="md">
                      Session List
                    </Text>
                    <Badge
                      borderRadius="full"
                      px={2}
                      py={1}
                      bg="gray.200"
                      color="gray.700"
                    >
                      {sessionsList.length}
                    </Badge>
                  </Flex>

                  <VStack spacing={0} align="stretch">
                    {sessionsList.map((session) => (
                      <Box
                        key={session.id}
                        bg={
                          selectedThread &&
                          selectedThread.sessionNumber === session.number
                            ? "gray.100"
                            : "transparent"
                        }
                        borderRadius="md"
                        mb={1}
                        cursor="pointer"
                        _hover={{ bg: "gray.50" }}
                      >
                        <Flex
                          py={3}
                          px={4}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text
                            fontWeight={
                              selectedThread &&
                              selectedThread.sessionNumber === session.number
                                ? "semibold"
                                : "normal"
                            }
                            color={
                              selectedThread &&
                              selectedThread.sessionNumber === session.number
                                ? "gray.900"
                                : "gray.500"
                            }
                          >
                            Session {session.number}
                          </Text>
                          <Flex align="center">
                            <Box
                              as="span"
                              h={2}
                              w={2}
                              borderRadius="full"
                              bg={getStatusColor(session.status) + ".500"}
                              mr={2}
                            />
                            <Text
                              fontSize="sm"
                              color={getStatusColor(session.status) + ".600"}
                            >
                              {session.status}
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Flex>
            </Box>
          ) : (
            // Forum thread detail view
            <Flex>
              <Box
                flex="1"
                p={6}
                borderRightWidth="1px"
                borderRightColor="gray.200"
              >
                {/* Thread detail header and back button */}
                <Flex align="center" mb={6}>
                  <Button
                    variant="ghost"
                    leftIcon={<ArrowBackIcon />}
                    size="sm"
                    onClick={() => setSelectedThreadId(null)}
                  >
                    Back to forum
                  </Button>
                  {selectedThread && (
                    <Badge
                      colorScheme={
                        selectedThread.status === "Passed" ? "green" : "gray"
                      }
                      borderRadius="full"
                      ml="auto"
                      display="flex"
                      alignItems="center"
                      px={2}
                      py={1}
                    >
                      <Box as="span" mr={1}>
                        {selectedThread.status === "Passed" ? "•" : "○"}
                      </Box>
                      <Text>{selectedThread.status}</Text>
                    </Badge>
                  )}
                </Flex>

                {/* Thread replies */}
                <VStack spacing={4} align="stretch">
                  {threadReplies.map((reply) => (
                    <Box
                      key={reply.id}
                      p={4}
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <Flex align="center" mb={3}>
                        <Avatar
                          size="sm"
                          name={reply.author.name}
                          src={reply.author.avatarUrl}
                          mr={2}
                        />
                        <Box>
                          <Flex align="center">
                            <Text fontWeight="medium">{reply.author.name}</Text>
                            {"role" in reply.author && (
                              <Badge ml={2} colorScheme="orange">
                                {reply.author.role}
                              </Badge>
                            )}
                          </Flex>
                          <Text fontSize="xs" color="gray.500">
                            {reply.date}, {reply.time}
                          </Text>
                        </Box>
                        {reply.isPassed && (
                          <Badge colorScheme="green" ml="auto" px={2}>
                            Passed
                          </Badge>
                        )}
                      </Flex>

                      {/* Reply content */}
                      <Text>
                        {reply.content}
                        {"studentId" in reply.author && reply.isPresent && (
                          <Text as="span" fontWeight="medium" ml={2}>
                            - {reply.author.studentId} {reply.author.name}
                          </Text>
                        )}
                      </Text>
                    </Box>
                  ))}
                </VStack>

                {/* Message input */}
                <Box mt={6}>
                  <InputGroup size="md">
                    <Input
                      placeholder="Click to type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      pr="4.5rem"
                    />
                    <InputRightAddon p={0}>
                      <Button
                        h="100%"
                        borderLeftRadius={0}
                        colorScheme="blue"
                        onClick={handleSendMessage}
                        rightIcon={<ArrowForwardIcon />}
                      >
                        Send
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                </Box>
              </Box>

              {/* Session list sidebar - STYLED LIKE COURSESESSION */}
              <Box
                w="300px"
                bg="white"
                p={4}
                borderLeftWidth="1px"
                borderLeftColor="gray.200"
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                  pb={2}
                  borderBottomWidth="1px"
                  borderBottomColor="gray.200"
                >
                  <Text fontWeight="medium" fontSize="md">
                    Session List
                  </Text>
                  <Badge
                    borderRadius="full"
                    px={2}
                    py={1}
                    bg="gray.200"
                    color="gray.700"
                  >
                    {sessionsList.length}
                  </Badge>
                </Flex>

                <VStack spacing={0} align="stretch">
                  {sessionsList.map((session) => (
                    <Box
                      key={session.id}
                      bg={
                        selectedThread &&
                        selectedThread.sessionNumber === session.number
                          ? "gray.100"
                          : "transparent"
                      }
                      borderRadius="md"
                      mb={1}
                      cursor="pointer"
                      _hover={{ bg: "gray.50" }}
                    >
                      <Flex
                        py={3}
                        px={4}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text
                          fontWeight={
                            selectedThread &&
                            selectedThread.sessionNumber === session.number
                              ? "semibold"
                              : "normal"
                          }
                          color={
                            selectedThread &&
                            selectedThread.sessionNumber === session.number
                              ? "gray.900"
                              : "gray.500"
                          }
                        >
                          Session {session.number}
                        </Text>
                        <Flex align="center">
                          <Box
                            as="span"
                            h={2}
                            w={2}
                            borderRadius="full"
                            bg={getStatusColor(session.status) + ".500"}
                            mr={2}
                          />
                          <Text
                            fontSize="sm"
                            color={getStatusColor(session.status) + ".600"}
                          >
                            {session.status}
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Forum;
